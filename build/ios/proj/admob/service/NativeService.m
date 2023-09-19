/****************************************************************************
 Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.
 
 http://www.cocos.com
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You
 shall not use Cocos Creator software for developing other software or tools
 that's used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.
 
 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to
 you.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

#import "NativeService.h"

#import <GoogleMobileAds/GoogleMobileAds.h>

#import "Route.h"
#import "DestroyNativeAdACK.h"
#import "DestroyNativeAdREQ.h"
#import "LoadNativeAdACK.h"
#import "LoadNativeAdREQ.h"
#import "NativeAdListenerNTF.h"
#import "NativeLoadedNTF.h"
#import "NativePaidEventNTF.h"

#import "GADTSmallTemplateView.h"
#import "GADTMediumTemplateView.h"
#import "GADTFullScreenTemplateView.h"
#import "GADTTemplateView.h"

#import "../AdServiceHub.h"

@interface NativeService()<GADNativeAdLoaderDelegate,
GADNativeAdDelegate>

@property(nonatomic, strong) GADAdLoader *adLoader;
@property(nonatomic, strong) GADNativeAd *nativeAd;
@property(nonatomic, strong) GADTTemplateView *templateView;
@property(nonatomic, strong) NSString *unitId;

@property (nonatomic, weak) Bridge *bridge;

@end

@implementation NativeService

- (instancetype)initWithBridge:(Bridge *)bridge {
    self = [super init];
    if (self) {
        self.bridge = bridge;
        
        __weak typeof(self) wself = self;
        // load
        [bridge.route on:[LoadNativeAdREQ class].description type:[LoadNativeAdREQ class] messageHandler:^(id arg) {
            LoadNativeAdREQ *req = (LoadNativeAdREQ *)arg;
            [wself loadAd:req.unitId size:req.size];
            LoadNativeAdACK *ack = [[LoadNativeAdACK alloc] initWithUnitId:req.unitId];
            [bridge sendToScript:[LoadNativeAdACK class].description src:ack];
        }];
        
        // destroy
        [bridge.route on:[DestroyNativeAdREQ class].description type:[DestroyNativeAdREQ class] messageHandler:^(id arg) {
            DestroyNativeAdREQ *req = (DestroyNativeAdREQ *)arg;
            [wself nativeAdDestroy];
            DestroyNativeAdACK *ack = [[DestroyNativeAdACK alloc] initWithUnitId:req.unitId];
            [bridge sendToScript:[DestroyNativeAdACK class].description src:ack];
        }];
    }
    return self;
}

- (void)loadAd:(NSString *)unitId size:(NSString *)size{
    self.unitId = unitId;
        
    NSSet<UIScene *> *connectedScenes = UIApplication.sharedApplication.connectedScenes;
    NSMutableArray<UIWindowScene *> *windowScenes = [NSMutableArray array];
    for (UIScene *scene in connectedScenes) {
        if ([scene isKindOfClass:[UIWindowScene class]]) {
            [windowScenes addObject:(UIWindowScene *)scene];
        }
    }
    UIViewController *viewController = nil;
    for (UIWindowScene *scene in windowScenes) {
        if (scene.activationState == UISceneActivationStateForegroundActive) {
            UIWindow *keyWindow = scene.windows.firstObject;
            UIViewController *rootViewController = keyWindow.rootViewController;
            if (!rootViewController) {
                return;
            }
            viewController = rootViewController;
            break;
        }
    }
    
    if(!viewController) {
        NSLog(@"banner service viewController search failure!");
        return;
    }
    
    GADTTemplateView *templateView = nil;
    if([size isEqualToString:@"medium"]) {
        templateView = [[NSBundle mainBundle]
                             loadNibNamed:@"GADTMediumTemplateView"
                             owner:nil
                             options:nil].firstObject;
    } else {
        templateView = [[NSBundle mainBundle]
                             loadNibNamed:@"GADTSmallTemplateView"
                             owner:nil
                             options:nil].firstObject;
    }
    if(self.templateView) {
        [self.templateView removeFromSuperview];
    }
    self.templateView = templateView;
    
    [viewController.view addSubview:self.templateView];
    [self.templateView addHorizontalConstraintsToSuperviewWidth];
    [self.templateView addVerticalCenterConstraintToSuperview];
    
    self.adLoader = [[GADAdLoader alloc] initWithAdUnitID:unitId
                                       rootViewController:viewController
                                                  adTypes:@[ GADAdLoaderAdTypeNative ]
                                                  options:nil];
    self.adLoader.delegate = self;
    GADRequest *request = [GADRequest request];
    request.requestAgent = [[AdServiceHub sharedInstance] extensionVersion];
    [self.adLoader loadRequest:request];
}

- (void)nativeAdDestroy {
    if(self.nativeAd != nil) {
        self.nativeAd = nil;
    }
    
    if(self.templateView != nil) {
        [self.templateView removeFromSuperview];
        self.templateView = nil;
    }
    
    if(self.adLoader != nil) {
        self.adLoader = nil;
    }
}

#pragma mark GADAdLoaderDelegate implementation
- (void)adLoader:(GADAdLoader *)adLoader didFailToReceiveAdWithError:(NSError *)error {
    NSLog(@"%@ failed with error: %@", adLoader, error);
    NativeAdListenerNTF *ntf = [[NativeAdListenerNTF alloc] initWithUnitId:self.unitId
                                                                    method:@"onAdFailedToLoad"
                                                                   adError:[error localizedDescription]];
    [self.bridge sendToScript:[NativeAdListenerNTF class].description src:ntf];
}

#pragma mark GADNativeAdLoaderDelegate implementation
- (void)adLoader:(GADAdLoader *)adLoader
didReceiveNativeAd:(GADNativeAd *)nativeAd {
    // A native ad has loaded, and can be displayed.
    self.nativeAd = nativeAd;
    self.nativeAd.delegate = self;
    
    __weak typeof(self) wself = self;
    __weak GADNativeAd *weakNativeAd = nativeAd;
    nativeAd.paidEventHandler = ^void(GADAdValue *_Nonnull adValue) {
        NativePaidEventNTF *ntf = [[NativePaidEventNTF alloc] initWithUnitId:wself.unitId];
        
        ntf.valueMicros = [[adValue value] longValue];
        ntf.currencyCode = adValue.currencyCode;
        ntf.precision = (int)adValue.precision;
        
        GADAdNetworkResponseInfo *loadedAdNetworkResponseInfo = weakNativeAd.responseInfo.loadedAdNetworkResponseInfo;
        ntf.adSourceName = loadedAdNetworkResponseInfo.adSourceName;
        ntf.adSourceId = loadedAdNetworkResponseInfo.adSourceID;
        ntf.adSourceInstanceName = loadedAdNetworkResponseInfo.adSourceInstanceName;
        ntf.adSourceInstanceId = loadedAdNetworkResponseInfo.adSourceInstanceID;
        
        NSDictionary<NSString *, id> *extras = weakNativeAd.responseInfo.extrasDictionary;
        ntf.mediationGroupName = extras[@"mediation_group_name"];
        ntf.mediationABTestName = extras[@"mediation_ab_test_name"];
        ntf.mediationABTestVariant = extras[@"mediation_ab_test_variant"];
        
        [wself.bridge sendToScript:[NativePaidEventNTF class].description src:ntf];
    };
    
    self.templateView.nativeAd = nativeAd;
    
    NativeLoadedNTF *ntf = [[NativeLoadedNTF alloc] initWithUnitId:self.unitId];
    [self.bridge sendToScript:[NativeLoadedNTF class].description src:ntf];
}

- (void)adLoaderDidFinishLoading:(GADAdLoader *) adLoader {
    // The adLoader has finished loading ads, and a new request can be sent.
    NativeAdListenerNTF *ntf = [[NativeAdListenerNTF alloc] initWithUnitId:self.unitId
                                                                    method:@"onAdLoaded"];
    [self.bridge sendToScript:[NativeAdListenerNTF class].description src:ntf];
}


#pragma mark GADNativeAdDelegate implementation
- (void)nativeAdDidRecordImpression:(nonnull GADNativeAd *)nativeAd {
    // The native ad was shown.
    NativeAdListenerNTF *ntf = [[NativeAdListenerNTF alloc] initWithUnitId:self.unitId
                                                                    method:@"onAdImpression"];
    [self.bridge sendToScript:[NativeAdListenerNTF class].description src:ntf];
}

- (void)nativeAdDidRecordClick:(nonnull GADNativeAd *)nativeAd {
    // The native ad was clicked on.
    NativeAdListenerNTF *ntf = [[NativeAdListenerNTF alloc] initWithUnitId:self.unitId
                                                                    method:@"onAdClicked"];
    [self.bridge sendToScript:[NativeAdListenerNTF class].description src:ntf];
}

- (void)nativeAdWillPresentScreen:(nonnull GADNativeAd *)nativeAd {
    // The native ad will present a full screen view.
    NativeAdListenerNTF *ntf = [[NativeAdListenerNTF alloc] initWithUnitId:self.unitId
                                                                    method:@"onAdOpened"];
    [self.bridge sendToScript:[NativeAdListenerNTF class].description src:ntf];
}

- (void)nativeAdWillDismissScreen:(nonnull GADNativeAd *)nativeAd {
    // The native ad will dismiss a full screen view.
}

- (void)nativeAdDidDismissScreen:(nonnull GADNativeAd *)nativeAd {
    // The native ad did dismiss a full screen view.
    NativeAdListenerNTF *ntf = [[NativeAdListenerNTF alloc] initWithUnitId:self.unitId
                                                                    method:@"onAdClosed"];
    [self.bridge sendToScript:[NativeAdListenerNTF class].description src:ntf];
}

/// Called when a swipe gesture click is recorded for an ad.
- (void)nativeAdDidRecordSwipeGestureClick:(nonnull GADNativeAd *)nativeAd {
    NativeAdListenerNTF *ntf = [[NativeAdListenerNTF alloc] initWithUnitId:self.unitId
                                                                    method:@"onAdSwipeGestureClicked"];
    [self.bridge sendToScript:[NativeAdListenerNTF class].description src:ntf];
    
}
@end



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
#import "BannerService.h"

#import <GoogleMobileAds/GoogleMobileAds.h>

#import "Route.h"
#import "BannerAdListenerNTF.h"
#import "BannerPaidEventNTF.h"
#import "DestroyBannerACK.h"
#import "DestroyBannerREQ.h"
#import "LoadBannerACK.h"
#import "LoadBannerREQ.h"
#import "ShowBannerREQ.h"

#import "../AdServiceHub.h"

@interface BannerService() <GADBannerViewDelegate>

@property (nonatomic, strong) NSMutableDictionary<NSString *, GADBannerView *> *bannerMap;

@property (nonatomic, weak) Bridge *bridge;

@end

@implementation BannerService

- (instancetype)initWithBridge:(Bridge *)bridge {
    self = [super init];
    if (self) {
        self.bridge = bridge;
        self.bannerMap = [NSMutableDictionary dictionary];
        
        __weak typeof(self) wself = self;
        [bridge.route on:[LoadBannerREQ class].description type:[LoadBannerREQ class] messageHandler:^(id arg) {
            LoadBannerREQ *req = (LoadBannerREQ *) arg;
            if(![wself.bannerMap objectForKey:req.unitId]) {
                [wself createBannerView:req];
            }
            LoadBannerACK *ack = [[LoadBannerACK alloc] initWithUnitId:req.unitId];
            [wself loadBannerAd:req.unitId];
            [bridge sendToScript:[LoadBannerACK class].description src:ack];
        }];
        
        [bridge.route on:[ShowBannerREQ class].description type:[ShowBannerREQ class] messageHandler:^(id arg) {
            ShowBannerREQ *sb = (ShowBannerREQ *) arg;
            [wself showBanner:sb.unitId visible:sb.visible];
        }];
        
        [bridge.route on:[DestroyBannerREQ class].description type:[DestroyBannerREQ class] messageHandler:^(id arg) {
            DestroyBannerREQ *sb = (DestroyBannerREQ *) arg;
            [wself destroyByUnitId:sb.unitId];
            DestroyBannerACK *ack = [[DestroyBannerACK alloc] initWithUnitId:sb.unitId];
            [bridge sendToScript:[DestroyBannerACK class].description src:ack];
        }];
    }
    return self;
}

- (void)createBannerView:(LoadBannerREQ *)req {
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
    UIView *rootView = viewController.view;
    CGRect frame = rootView.frame;
    if (@available(iOS 11.0, *)) {
        frame = UIEdgeInsetsInsetRect(rootView.frame, rootView.safeAreaInsets);
    }
    CGFloat viewWidth = frame.size.width;
    GADAdSize adSize = [self getAdSize:req.bannerSize bannerType:req.bannerSizeType viewWidth:viewWidth];
    GADBannerView *bannerView = [[GADBannerView alloc]initWithAdSize:adSize];
    bannerView.adUnitID = req.unitId;
    bannerView.rootViewController = viewController;
    [bannerView setTranslatesAutoresizingMaskIntoConstraints:NO];
    [rootView addSubview:bannerView];
    
    for (NSString *alignment in req.alignments) {
        NSLayoutConstraint *constraint = nil;
        
        if ([alignment isEqualToString:@"ALIGN_LEFT"]) {
            constraint = [bannerView.leadingAnchor constraintEqualToAnchor:rootView.safeAreaLayoutGuide.leadingAnchor];
        }
        else if ([alignment isEqualToString:@"ALIGN_TOP"]) {
            constraint = [bannerView.topAnchor constraintEqualToAnchor:rootView.safeAreaLayoutGuide.topAnchor];
        }
        else if ([alignment isEqualToString:@"ALIGN_RIGHT"]) {
            constraint = [bannerView.trailingAnchor constraintEqualToAnchor:rootView.safeAreaLayoutGuide.trailingAnchor];
        }
        else if ([alignment isEqualToString:@"ALIGN_BOTTOM"]) {
            constraint = [bannerView.bottomAnchor constraintEqualToAnchor:rootView.safeAreaLayoutGuide.bottomAnchor];
        }
        else if ([alignment isEqualToString:@"CENTER_HORIZONTAL"]) {
            constraint = [bannerView.centerXAnchor constraintEqualToAnchor:rootView.safeAreaLayoutGuide.centerXAnchor];
        }
        else if ([alignment isEqualToString:@"CENTER_VERTICAL"]) {
            constraint = [bannerView.centerYAnchor constraintEqualToAnchor:rootView.safeAreaLayoutGuide.centerYAnchor];
        }
        else if ([alignment isEqualToString:@"ALIGN_PARENT_BOTTOM"]) {
            constraint = [bannerView.bottomAnchor constraintEqualToAnchor:rootView.safeAreaLayoutGuide.bottomAnchor];
        } else {
            NSLog(@"bannerView unknown constraint: %@", alignment);
        }
        
        if (constraint) {
            [constraint setActive:YES];
        }
    }
    
    [self.bannerMap setObject:bannerView forKey:req.unitId];
}

- (GADAdSize)getAdSize:(NSString *)bannerSzie bannerType:(NSString *)bannerType viewWidth:(CGFloat)viewWidth {
    if([bannerType isEqualToString:@"Builtin"]) {
        return [self getStandardAdSize:bannerSzie viewWidth:viewWidth];
    } else if ([bannerType isEqualToString:@"Portrait"]) {
        return GADPortraitAnchoredAdaptiveBannerAdSizeWithWidth(viewWidth);
    } else if ([bannerType isEqualToString:@"Landscape"]) {
        return GADLandscapeAnchoredAdaptiveBannerAdSizeWithWidth(viewWidth);
    } else if ([bannerType isEqualToString:@"Current"]) {
        return GADCurrentOrientationAnchoredAdaptiveBannerAdSizeWithWidth(viewWidth);
    }
    return GADAdSizeBanner;
}

- (GADAdSize)getStandardAdSize:(NSString *)bannerSize viewWidth:(GLfloat)viewWidth {
    GADAdSize adSize = GADAdSizeBanner;
    if ([bannerSize isEqualToString:@"BANNER"]) {
        adSize = GADAdSizeBanner;
    } else if ([bannerSize isEqualToString:@"LARGE_BANNER"]) {
        adSize = GADAdSizeLargeBanner;
    } else if ([bannerSize isEqualToString:@"MEDIUM_RECTANGLE"]) {
        adSize = GADAdSizeMediumRectangle;
    } else if ([bannerSize isEqualToString:@"FULL_BANNER"]) {
        adSize = GADAdSizeFullBanner;
    } else if ([bannerSize isEqualToString:@"LEADERBOARD"]) {
        adSize = GADAdSizeLeaderboard;
    } else if ([bannerSize isEqualToString:@"SMART_BANNER"]) {
        adSize = GADPortraitAnchoredAdaptiveBannerAdSizeWithWidth(viewWidth);
    }
    return adSize;
}

- (void)loadBannerAd:(NSString *)unitId {
    GADBannerView *bannerView = [self.bannerMap objectForKey:unitId];
    if(!bannerView) {
        NSLog(@"banner service createBannerView no call");
        return;
    }
    GADRequest *request = [GADRequest request];
    bannerView.delegate = self;
    request.requestAgent = [[AdServiceHub sharedInstance] extensionVersion];
    [bannerView loadRequest:request];
}

- (void)showBanner:(NSString *)unitId visible:(BOOL) visible {
    GADBannerView *bannerView = [self.bannerMap objectForKey:unitId];
    if(!bannerView) {
        NSLog(@"banner service createBannerView no call");
        return;
    }
    bannerView.hidden = visible;
}

- (void)destroyByUnitId:(NSString *)unitId {
    GADBannerView *bannerView = [self.bannerMap objectForKey:unitId];
    if(!bannerView) {
        NSLog(@"banner service createBannerView no call");
        return;
    }
    [bannerView removeFromSuperview];
    [self.bannerMap removeObjectForKey:unitId];
}

#pragma mark GADBannerViewDelegate implementation

- (void)bannerViewDidReceiveAd:(GADBannerView *)bannerView {
    NSLog(@"bannerViewDidReceiveAd");
    BannerAdListenerNTF *ntf = [[BannerAdListenerNTF alloc] initWithUnitId:bannerView.adUnitID method:@"onAdLoaded"];
    [self.bridge sendToScript:[BannerAdListenerNTF class].description src:ntf];
    
    __weak typeof(self) wself = self;
    __weak GADBannerView *weakBannerView = bannerView;
    bannerView.paidEventHandler = ^void(GADAdValue *_Nonnull adValue) {
        BannerPaidEventNTF *ntf = [[BannerPaidEventNTF alloc] initWithUnitId:weakBannerView.adUnitID];
        
        ntf.valueMicros = [[adValue value] longValue];
        ntf.currencyCode = adValue.currencyCode;
        ntf.precision = (int)adValue.precision;
        
        GADAdNetworkResponseInfo *loadedAdNetworkResponseInfo = weakBannerView.responseInfo.loadedAdNetworkResponseInfo;
        ntf.adSourceName = loadedAdNetworkResponseInfo.adSourceName;
        ntf.adSourceId = loadedAdNetworkResponseInfo.adSourceID;
        ntf.adSourceInstanceName = loadedAdNetworkResponseInfo.adSourceInstanceName;
        ntf.adSourceInstanceId = loadedAdNetworkResponseInfo.adSourceInstanceID;
        
        NSDictionary<NSString *, id> *extras = weakBannerView.responseInfo.extrasDictionary;
        ntf.mediationGroupName = extras[@"mediation_group_name"];
        ntf.mediationABTestName = extras[@"mediation_ab_test_name"];
        ntf.mediationABTestVariant = extras[@"mediation_ab_test_variant"];
        
        [wself.bridge sendToScript:[BannerPaidEventNTF class].description src:ntf];
    };
}

- (void)bannerView:(GADBannerView *)bannerView didFailToReceiveAdWithError:(NSError *)error {
    NSLog(@"bannerView:didFailToReceiveAdWithError: %@", [error localizedDescription]);
    BannerAdListenerNTF *ntf = [[BannerAdListenerNTF alloc] initWithUnitId:bannerView.adUnitID
                                                                    method:@"onAdClosed"
                                                               loadAdError:[error localizedDescription]];
    [self.bridge sendToScript:[BannerAdListenerNTF class].description src:ntf];
}

- (void)bannerViewDidRecordImpression:(GADBannerView *)bannerView {
    NSLog(@"bannerViewDidRecordImpression");
    BannerAdListenerNTF *ntf = [[BannerAdListenerNTF alloc] initWithUnitId:bannerView.adUnitID method:@"onAdImpression"];
    [self.bridge sendToScript:[BannerAdListenerNTF class].description src:ntf];
}

- (void)bannerViewWillPresentScreen:(GADBannerView *)bannerView {
    NSLog(@"bannerViewWillPresentScreen");
    BannerAdListenerNTF *ntf = [[BannerAdListenerNTF alloc] initWithUnitId:bannerView.adUnitID method:@"onAdOpened"];
    [self.bridge sendToScript:[BannerAdListenerNTF class].description src:ntf];
}

- (void)bannerViewWillDismissScreen:(GADBannerView *)bannerView {
    NSLog(@"bannerViewWillDismissScreen");
    BannerAdListenerNTF *ntf = [[BannerAdListenerNTF alloc] initWithUnitId:bannerView.adUnitID method:@"onAdClosed"];
    [self.bridge sendToScript:[BannerAdListenerNTF class].description src:ntf];
}

- (void)bannerViewDidDismissScreen:(GADBannerView *)bannerView {
    NSLog(@"bannerViewDidDismissScreen");
}

- (void)bannerViewDidRecordClick:(nonnull GADBannerView *)bannerView {
    NSLog(@"bannerViewDidRecordClick");
    BannerAdListenerNTF *ntf = [[BannerAdListenerNTF alloc] initWithUnitId:bannerView.adUnitID method:@"onAdClicked"];
    [self.bridge sendToScript:[BannerAdListenerNTF class].description src:ntf];
}

@end



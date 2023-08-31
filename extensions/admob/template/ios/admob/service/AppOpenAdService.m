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
#import <GoogleMobileAds/GoogleMobileAds.h>

#import "AppOpenAdService.h"

@interface AppOpenAdService() <GADFullScreenContentDelegate>

@property(strong, nonatomic) GADAppOpenAd* appOpenAd;
@property(strong, nonatomic) NSDate *loadTime;

@property (nonatomic, assign) BOOL isLoading;
@property (nonatomic, assign) BOOL isShowing;
@property (nonatomic, assign) NSString *unitId;
@end

@implementation AppOpenAdService

- (void)loadAd: (NSString*)unitId {
    self.unitId = unitId;
    
    if(self.isLoading || [self isAdAvailable]) {
        return;
    }
    self.isLoading = true;
    self.appOpenAd = nil;
    
    [GADAppOpenAd loadWithAdUnitID:unitId
                           request:[GADRequest request]
                       orientation:UIInterfaceOrientationPortrait
                 completionHandler:^(GADAppOpenAd *_Nullable appOpenAd, NSError *_Nullable error) {
        self.isLoading = false;
        if (error) {
            NSLog(@"Failed to load app open ad: %@", error);
            return;
        }
        self.appOpenAd = appOpenAd;
        self.appOpenAd.fullScreenContentDelegate = self;
        self.loadTime = [NSDate date];
    }];
}

- (BOOL)wasLoadTimeLessThanNHoursAgo:(int)n {
    NSDate *now = [NSDate date];
    NSTimeInterval timeIntervalBetweenNowAndLoadTime = [now timeIntervalSinceDate:self.loadTime];
    double secondsPerHour = 3600.0;
    double intervalInHours = timeIntervalBetweenNowAndLoadTime / secondsPerHour;
    return intervalInHours < n;
}

- (BOOL)isAdAvailable {
    return self.appOpenAd != nil && [self wasLoadTimeLessThanNHoursAgo:4];
}

- (void)showAdIfAvailable:(nonnull UIViewController*)viewController {
    if(self.isShowing) {
        NSLog(@"App open ad is not ready yet.");
        return;
    }
    
    // If the app open ad is not available yet but it is supposed to show,
    // it is considered to be complete in this example. Call the adDidComplete method
    // and load a new ad.
    if (![self isAdAvailable]) {
      NSLog(@"App open ad is not ready yet.");
    //todo 监听返回
      return;
    }
    NSLog(@"App open ad will be displayed.");
    _isShowing = true;
    [_appOpenAd presentFromRootViewController:viewController];
}

#pragma mark - GADFullScreenContentDelegate

/// Tells the delegate that the ad failed to present full screen content.
- (void)ad:(nonnull id<GADFullScreenPresentingAd>)ad
didFailToPresentFullScreenContentWithError:(nonnull NSError *)error {
    NSLog(@"didFailToPresentFullScreenContentWithError");
    _isShowing = false;    
}

/// Tells the delegate that the ad will present full screen content.
- (void)adWillPresentFullScreenContent:(nonnull id<GADFullScreenPresentingAd>)ad {
    NSLog(@"adWillPresentFullScreenContent");
}

/// Tells the delegate that the ad dismissed full screen content.
- (void)adDidDismissFullScreenContent:(nonnull id<GADFullScreenPresentingAd>)ad {
    NSLog(@"adDidDismissFullScreenContent");
    _isShowing = false;
}

@end

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

#import "Bridge.h"
#import "Codec.h"
#import "Route.h"
#include "platform/apple/JsbBridge.h"

@interface Bridge ()

@property (nonatomic, strong) Codec *codec;
@property (nonatomic, strong) JsbBridge *jsbBridge;

@end

@implementation Bridge

static ICallback cb = nil;

- (instancetype)initWithCodec:(Codec *)codec {
    self = [super init];
    if (self) {
        _codec = codec;
        _route = [[Route alloc] initWithCodec:codec];
        _jsbBridge = [JsbBridge sharedInstance];
        [self initBridge];
    }
    return self;
}

- (void)initBridge {
    __weak typeof(self) wself = self;
    cb = ^void (NSString *arg0, NSString *arg1) {
        NSLog(@"onScript: %@ | %@", arg0, arg1);
        if(wself) {
            [wself.route dispatch:arg0 arg1:arg1];
        }
    };
    [self.jsbBridge setCallback:cb];
}

- (void)destroy {
    [self.route destroy];
}

- (void)sendToScript:(NSString *)arg0 src:(id)src {
    NSLog(@"sendToScript, message: method: %@", arg0);
    [self.jsbBridge sendToScript:arg0 arg1:[self.codec encode:src]];
}

@end

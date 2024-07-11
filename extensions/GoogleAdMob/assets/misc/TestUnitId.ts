/*
 Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 of the Software, and to permit persons to whom the Software is furnished to do so,
 subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

import { sys } from 'cc';

export enum AdFormat {
    AppOpen,
    Banner,
    Interstitial,
    Rewarded,
    RewardedInterstitial,
    Native,
}

export function getTestAdUnitId(format: AdFormat): string {
    switch (format) {
        case AdFormat.AppOpen:
            return isAndroid()
                ? "ca-app-pub-3940256099942544/9257395921"
                : "ca-app-pub-3940256099942544/5575463023";
        case AdFormat.Banner:
            return isAndroid()
                ? "ca-app-pub-3940256099942544/6300978111"
                : "ca-app-pub-3940256099942544/2934735716";
        case AdFormat.Interstitial:
            return isAndroid()
                ? "ca-app-pub-3940256099942544/1033173712"
                : "ca-app-pub-3940256099942544/4411468910";
        case AdFormat.Rewarded:
            return isAndroid()
                ? "ca-app-pub-3940256099942544/5224354917"
                : "ca-app-pub-3940256099942544/1712485313";
        case AdFormat.RewardedInterstitial:
            return isAndroid()
                ? "ca-app-pub-3940256099942544/5354046379"
                : "ca-app-pub-3940256099942544/6978759866";
        case AdFormat.Native:
            return isAndroid()
                ? "ca-app-pub-3940256099942544/2247696110"
                : "ca-app-pub-3940256099942544/3986624511";
        default:
            throw new Error(`Unexpected format: ${format}`);
    }
}

function isAndroid(): boolean {
    return sys.os === sys.OS.ANDROID;
}

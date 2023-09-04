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

/**
 * @zh
 * Banner 的大小类型 
 * @en
 * Banner Size Type 
 */
export enum BannerSizeType {
    /**
     * @zh
     * Builtin 表示是 BannerSize 这个类中的默认类型
     * @en
     * Builtin Banner size defined in {BannerSize}
     */
    Builtin = "Builtin",

    /**
     * @zh
     * 自适应 Banner，请参考 ：
     * https://developers.google.com/admob/android/banner/anchored-adaptive
     * 使用 AdSize.getLandscapeAnchoredAdaptiveBannerAdSize 来设置 Banner 的大小
     * @en
     * Anchored adaptive banners. Please refer to 
     * https://developers.google.com/admob/android/banner/anchored-adaptive
     * Use AdSize.getLandscapeAnchoredAdaptiveBannerAdSize to create the Banner Size.
     */
    Landscape = "Landscape",

    /**
     * @zh
     * 自适应 Banner，请参考 ：
     * https://developers.google.com/admob/android/banner/anchored-adaptive
     * 使用 AdSize.getPortraitAnchoredAdaptiveBannerAdSize 来设置 Banner 的大小
     * @en
     * Anchored adaptive banners. Please refer to 
     * https://developers.google.com/admob/android/banner/anchored-adaptive
     * Use AdSize.getPortraitAnchoredAdaptiveBannerAdSize to create the Banner Size.
     */
    Portrait = "Portrait",
    
    /**
     * @zh
     * 自适应 Banner，请参考 ：
     * https://developers.google.com/admob/android/banner/anchored-adaptive
     * 使用 AdSize.getCurrentOrientationAnchoredAdaptiveBannerAdSize 来设置 Banner 的大小
     * @en
     * Anchored adaptive banners. Please refer to 
     * https://developers.google.com/admob/android/banner/anchored-adaptive
     * Use AdSize.getCurrentOrientationAnchoredAdaptiveBannerAdSize to create the Banner Size.
     */
    Current = "Current",
}
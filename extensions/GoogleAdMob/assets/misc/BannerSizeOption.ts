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
import { BannerAlignment, BottomCenter } from "./BannerAlignment";
import { BannerSize } from "./BannerSize";
import { BannerSizeType } from "./BannerSizeType";

/**
 * @cn
 * banner size 的创建选项
 * 如果 type 为  BannerSizeType.Builtin，则会使用 size 属性来创建banner， 否则走自适应创建banner。
 * 详情参考： https://developers.google.com/admob/android/banner/anchored-adaptive
 * @en
 * options of the banner size.
 * if the type attribute equals to BannerSizeType.Builtin, the size attribute will be used to create the banner.
 * Otherwise if the type equals to BannerSizeType.AnchoredAdaptive, an Anchored adaptive banner will be created.
 * For more details, please refer to https://developers.google.com/admob/android/banner/anchored-adaptive
 */
export class BannerSizeOption {
    /**
     * @zh
     * banner size 的类型
     * @en
     * type of the banner size
     */
    type?: BannerSizeType = BannerSizeType.Builtin;
    /**
     * @zh
     * 谷歌 Admob 库内预定义的 AdSize， 中转定义在 {BannerSizeType} 类中
     * @en
     * a serial of builtin banner size define in google admob.
     */
    size?: BannerSize = BannerSize.BANNER
    /**
     * @zh
     * 预定义少量可用的对齐用于创建 banner 的容器
     * @en
     * Predefined alignments for the container of the banner ad.
     */
    alignments?: BannerAlignment[] = BottomCenter;
}
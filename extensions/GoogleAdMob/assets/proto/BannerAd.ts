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

import { LoadAdError } from "../ads/alias/TypeAlias";
import { BannerAlignment } from "../misc/BannerAlignment";
import { BannerSize } from "../misc/BannerSize";
import { BannerSizeType } from "../misc/BannerSizeType";
import { Base } from "./Base";
import { ILoadAdError } from "./ICallbackNTF";
import { _decorator  } from "cc";
const { ccclass, property } = _decorator;

@ccclass("LoadBannerREQ")
export class LoadBannerREQ extends Base {
    bannerSizeType: BannerSizeType;
    bannerSize: BannerSize;    
    alignments:BannerAlignment[];
}

@ccclass("LoadBannerACK")
export class LoadBannerACK extends Base {
}

@ccclass("ShowBannerREQ")
export class ShowBannerREQ extends Base {
    visible: boolean;
}

@ccclass("ShowBannerACK")
export class ShowBannerACK extends Base {
    visible: boolean;
}

@ccclass("DestroyBannerREQ")
export class DestroyBannerREQ extends Base {
}

@ccclass("DestroyBannerACK")
export class DestroyBannerACK extends Base {
}

@ccclass("BannerAdListenerNTF")
export class BannerAdListenerNTF extends Base implements ILoadAdError {
    method: string;
    loadAdError: LoadAdError;
}
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

import { _decorator } from "cc";
import { AdError, LoadAdError } from "../ads/alias/TypeAlias";
import { Base } from "./Base";
import { IAdError, ILoadAdError } from "./ICallbackNTF";
const { ccclass, property } = _decorator;

@ccclass("LoadAppOpenAdREQ")
export class LoadAppOpenAdREQ extends Base {

}

@ccclass("LoadAppOpenAdACK")
export class LoadAppOpenAdACK extends Base {

}

@ccclass("ShowAppOpenAdREQ")
export class ShowAppOpenAdREQ extends Base {

}

@ccclass("ShowAppOpenAdACK")
export class ShowAppOpenAdACK extends Base {

}

@ccclass("ShowAppOpenAdCompleteNTF")
export class ShowAppOpenAdCompleteNTF extends Base {

}

@ccclass("AppOpenAdFullScreenContentCallbackNTF")
export class AppOpenAdFullScreenContentCallbackNTF extends Base implements IAdError {
    method: string;
    adError: AdError;
}

@ccclass("AppOpenAdLoadCallbackNTF")
export class AppOpenAdLoadCallbackNTF extends Base implements ILoadAdError {
    method: string;
    loadAdError: LoadAdError;
}

@ccclass("IsAdAvailableREQ")
export class IsAdAvailableREQ extends Base {

}

@ccclass("IsAdAvailableACK")
export class IsAdAvailableACK extends Base {
    valid: boolean = false;
}

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
 * @en
 * Defines the RelativeLayout of Android in Typescript. 
 * See RelativeLayout.java for more details. 
 */
export enum BannerAlignment {
    /**
    * Rule that aligns a child's left edge with another child's left edge.
    */
    ALIGN_LEFT = "ALIGN_LEFT",
    /**
     * Rule that aligns a child's top edge with another child's top edge.
     */
    ALIGN_TOP = "ALIGN_TOP",
    /**
     * Rule that aligns a child's right edge with another child's right edge.
     */
    ALIGN_RIGHT = "ALIGN_RIGHT",
    /**
     * Rule that aligns a child's bottom edge with another child's bottom edge.
     */
    ALIGN_BOTTOM = "ALIGN_BOTTOM",
    /** 
     * Rule that centers the child horizontally with respect to the
     * bounds of its RelativeLayout parent.
     */
    CENTER_HORIZONTAL = "CENTER_HORIZONTAL",
    /**
     * Rule that centers the child vertically with respect to the
     * bounds of its RelativeLayout parent.
     */
    CENTER_VERTICAL = "CENTER_VERTICAL",
    /**
     * Rule that aligns the child's bottom edge with its RelativeLayout parent's bottom edge.
     */
    ALIGN_PARENT_BOTTOM = "ALIGN_PARENT_BOTTOM",
}

/**
 * @en
 * Put the banner at bottom-center of the screen
 */
export const BottomCenter = [BannerAlignment.ALIGN_PARENT_BOTTOM, BannerAlignment.CENTER_HORIZONTAL];

/**
 * @en
 * Put the banner at the top-center of the screen.
 */
export const TopCenter = [BannerAlignment.ALIGN_TOP, BannerAlignment.CENTER_HORIZONTAL];
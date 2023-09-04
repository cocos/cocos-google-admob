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
import * as fs from 'fs';
import * as fse from 'fs-extra';

const TAG = "[Util]";

export function deleteDestContentInSrcFile(srcPath: string, destPath: string) {
    let userGradle = fs.readFileSync(srcPath, { encoding: 'binary' });
    let template = fs.readFileSync(destPath, { encoding: 'binary' });

    const pos = userGradle.indexOf(template);
    if (pos >= 0) {
        userGradle = userGradle.replace(template, "");
        fs.writeFileSync(srcPath, userGradle);
    }
}

export function appendDestContentToSrcFileIfNo(srcPath: string, destPath: string) {
    let userGradle = fs.readFileSync(srcPath, { encoding: 'binary' });
    let template = fs.readFileSync(destPath, { encoding: 'binary' });

    const pos = userGradle.indexOf(template);
    if (pos < 0) {
        fs.writeFileSync(srcPath, userGradle + template);
    }
}

export function insertDestToSrcBehindKey(srcPath: string, destPath: string, keyPath: string) {
    const srcContent = fs.readFileSync(srcPath, { encoding: 'binary' });
    const keyCodeContent = fs.readFileSync(keyPath, { encoding: 'binary' });
    const destContent = fs.readFileSync(destPath, { encoding: 'binary' });

    console.log(TAG, "insertDestToSrcBehindKey", `srcPath: ${srcPath}, destPath: ${destPath}, keyPath: ${keyPath}`);

    const pos = srcContent.indexOf(destContent);
    if (pos < 0) {        
        let insertPos = srcContent.indexOf(keyCodeContent);
        if (insertPos < 0) {
            console.log(TAG, "insertDestToSrcBehindKey", `find key code in AppActivity failed! please check if the following content is in you AppActivity.java:`,
                `${keyCodeContent}`);
        } else {
            insertPos += keyCodeContent.length;

            const final = srcContent.slice(0, insertPos) + destContent + srcContent.slice(insertPos);
            fs.writeFileSync(srcPath, final);
        }
    }
}

/**
 * @en
 * delete content from destPath in the content of srcPath.
 * @param srcPath 
 * @param destPath 
 */
export function deleteDestToSrcBehindKey(srcPath: string, destPath: string) {
    const srcContent = fs.readFileSync(srcPath, { encoding: 'binary' });
    const destContent = fs.readFileSync(destPath, { encoding: 'binary' });

    const pos = srcContent.indexOf(destContent);
    if (pos >= 0) {
        const final = srcContent.replace(destContent, "");
        fs.writeFileSync(srcPath, final);
    }
}


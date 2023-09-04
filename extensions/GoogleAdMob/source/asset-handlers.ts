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
import { AssetHandlers } from '../@types';
import { outputFile } from 'fs-extra';

export const compressTextures: AssetHandlers.compressTextures = async (tasks) => {
    console.debug(`Execute compress task ${tasks}`);
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if (task.format !== 'jpg') {
            continue;
        }
        // task.dest should change suffix before compress
        task.dest = task.dest.replace('.png', '.jpg');
        await pngToJPG(task.src, task.dest, task.quality as number);
        // The compress task have done needs to be removed from the original tasks
        tasks.splice(i, 1);
        i--;
    }
};

async function pngToJPG(src: string, dest: string, quality: number) {
    const img = await getImage(src) as CanvasImageSource;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const imageData = canvas.toDataURL('image/jpeg', quality / 100);
    await outputFile(dest, imageData);
    console.debug('pngToJPG', dest);
}

function getImage(path: string) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function() {
            resolve(img);
        };
        img.onerror = function(err) {
            reject(err);
        };
        img.src = path.replace('#', '%23');
    });
}

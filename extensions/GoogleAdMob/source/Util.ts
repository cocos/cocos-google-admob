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


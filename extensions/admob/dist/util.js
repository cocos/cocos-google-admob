"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDestToSrcBehindKey = exports.insertDestToSrcBehindKey = exports.appendDestContentToSrcFileIfNo = exports.deleteDestContentInSrcFile = void 0;
const fs = __importStar(require("fs"));
const TAG = "[Util]";
function deleteDestContentInSrcFile(srcPath, destPath) {
    let userGradle = fs.readFileSync(srcPath, { encoding: 'binary' });
    let template = fs.readFileSync(destPath, { encoding: 'binary' });
    const pos = userGradle.indexOf(template);
    if (pos >= 0) {
        userGradle = userGradle.replace(template, "");
        fs.writeFileSync(srcPath, userGradle);
    }
}
exports.deleteDestContentInSrcFile = deleteDestContentInSrcFile;
function appendDestContentToSrcFileIfNo(srcPath, destPath) {
    let userGradle = fs.readFileSync(srcPath, { encoding: 'binary' });
    let template = fs.readFileSync(destPath, { encoding: 'binary' });
    const pos = userGradle.indexOf(template);
    if (pos < 0) {
        fs.writeFileSync(srcPath, userGradle + template);
    }
}
exports.appendDestContentToSrcFileIfNo = appendDestContentToSrcFileIfNo;
function insertDestToSrcBehindKey(srcPath, destPath, keyPath) {
    const srcContent = fs.readFileSync(srcPath, { encoding: 'binary' });
    const keyCodeContent = fs.readFileSync(keyPath, { encoding: 'binary' });
    const destContent = fs.readFileSync(destPath, { encoding: 'binary' });
    const pos = srcContent.indexOf(destContent);
    if (pos < 0) {
        let insertPos = srcContent.indexOf(keyCodeContent);
        if (insertPos < 0) {
            console.log(TAG, "insertDestToSrcBehindKey", `find key code in AppActivity failed! please check if the following content is in you AppActivity.java:`, `${keyCodeContent}`);
        }
        else {
            insertPos += keyCodeContent.length;
            const final = srcContent.slice(0, insertPos) + destContent + srcContent.slice(insertPos);
            fs.writeFileSync(srcPath, final);
        }
    }
}
exports.insertDestToSrcBehindKey = insertDestToSrcBehindKey;
/**
 * @en
 * delete content from destPath in the content of srcPath.
 * @param srcPath
 * @param destPath
 */
function deleteDestToSrcBehindKey(srcPath, destPath) {
    const srcContent = fs.readFileSync(srcPath, { encoding: 'binary' });
    const destContent = fs.readFileSync(destPath, { encoding: 'binary' });
    const pos = srcContent.indexOf(destContent);
    if (pos >= 0) {
        const final = srcContent.replace(destContent, "");
        fs.writeFileSync(srcPath, final);
    }
}
exports.deleteDestToSrcBehindKey = deleteDestToSrcBehindKey;

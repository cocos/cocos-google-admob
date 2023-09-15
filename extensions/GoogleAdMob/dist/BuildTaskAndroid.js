"use strict";
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
exports.buildTaskAndroid = exports.BuildTaskAndroid = void 0;
const builder_1 = require("./builder");
const fs = __importStar(require("fs"));
const fse = __importStar(require("fs-extra"));
const AndroidConstants_1 = require("./AndroidConstants");
const Util_1 = require("./Util");
const TAG = "[BuildTaskAndroid]";
class BuildTaskAndroid {
    /**
     * @en
     * Insert google mobile ad application ad to the AndroidManifest.xml as a meta-data.
     */
    insertApplicationIdToManifest(options, buildResult) {
        const adMobOption = options.packages[builder_1.PACKAGE_NAME];
        const { enableAdMob } = adMobOption;
        if (!enableAdMob) {
            console.log(TAG, "generateApplicationId", `exit because enableAdMob is false`);
            return;
        }
        console.log(TAG, "generateApplicationId", `Build path is: ${buildResult.dest}`);
        const manifestPath = `${buildResult.dest}/${AndroidConstants_1.AndroidConstants.AdmobDestManifestPath}`;
        console.log(TAG, "generateApplicationId", `AndroidManifest.xml path: ${manifestPath}`);
        const userGradle = fs.readFileSync(manifestPath, { encoding: 'binary' });
        console.log(TAG, "generateApplicationId", `read AndroidManifest.xml complete`);
        const parser = new DOMParser();
        const document = parser.parseFromString(userGradle, "text/xml");
        const metaNodes = document.getElementsByTagName("manifest")[0].getElementsByTagName("application")[0].getElementsByTagName("meta-data");
        const destMetaName = "com.google.android.gms.ads.APPLICATION_ID";
        for (let i = 0; i < metaNodes.length; i++) {
            const metaNode = metaNodes[i];
            const attr = metaNode.getAttribute("android:name");
            if (attr === destMetaName) {
                const { applicationId } = adMobOption;
                metaNodes[i].setAttribute("android:value", applicationId);
                console.log(TAG, "generateApplicationId", `change the meta-data attribute success.`);
                break;
            }
        }
        const serializer = new XMLSerializer();
        const content = serializer.serializeToString(document);
        fs.writeFileSync(manifestPath, content);
    }
    /**
     * @en
     * Handle the grale files.
     * In the admob extension, it will change 2 files including the build.gradle of the target android project,
     * and the Setting.gradle which refers to organize the android project.
     * when the option enableAdMob is true, the template file in the template directory which be copy and insert to
     * the files in destination project path, and when the option is false, all related content will be deleted precisely.
     *
     * Feel free to modify the files in the build project,
     * but be careful when modify the files in the template directory of the extension
     * @param buildResult
     */
    handleGradleFiles(options, buildResult) {
        console.log(TAG, "appendAppBuildGradle", `Build path is: ${buildResult.dest}`);
        console.log(TAG, "appendAppBuildGradle, settings: ", buildResult.settings);
        console.log(TAG, "appendAppBuildGradle, config: ", builder_1.configs);
        console.log(TAG, "appendAppBuildGradle, admob options: ", options.packages[builder_1.PACKAGE_NAME]);
        const adMobOption = options.packages[builder_1.PACKAGE_NAME];
        const enableAdMob = adMobOption.enableAdMob;
        const srcGradle = AndroidConstants_1.AndroidConstants.AppBuildGradle;
        const destGradle = AndroidConstants_1.AndroidConstants.AdmobTemplateGradlePath;
        const srcSetting = `${buildResult.dest}/proj/${AndroidConstants_1.AndroidConstants.SettingGradle}`;
        const destSetting = AndroidConstants_1.AndroidConstants.AdmobTemplateSettingGradle;
        if (enableAdMob) {
            (0, Util_1.appendDestContentToSrcFileIfNo)(srcGradle, destGradle);
            (0, Util_1.appendDestContentToSrcFileIfNo)(srcSetting, destSetting);
        }
        else {
            (0, Util_1.deleteDestContentInSrcFile)(srcGradle, destGradle);
            (0, Util_1.deleteDestContentInSrcFile)(srcSetting, destSetting);
        }
    }
    /**
     * @en
     * Copy libadmob to the dest build path.
     * After building, The liadmob stored in the extension's template directory will be copy to the target project's src dir.
     * @param options
     * @param buildResult
     */
    copyLibraryDirectory(options, buildResult) {
        console.log(TAG, "copyLibraryDirectory", `Build path is: ${buildResult.dest}`);
        console.log(TAG, "copyLibraryDirectory, settings: ", buildResult.settings);
        console.log(TAG, "copyLibraryDirectory, config: ", builder_1.configs);
        console.log(TAG, "copyLibraryDirectory, admob options: ", options.packages[builder_1.PACKAGE_NAME]);
        const adMobOption = options.packages[builder_1.PACKAGE_NAME];
        const { enableAdMob, overwriteLibrary } = adMobOption;
        if (enableAdMob) {
            const extLibPath = AndroidConstants_1.AndroidConstants.AdmobLibSrcPath;
            const destLibPath = `${buildResult.dest}${AndroidConstants_1.AndroidConstants.AdmobLibDestPath}`;
            console.log(TAG, "copyLibraryDirectory", `from ${extLibPath} to ${destLibPath}`);
            fse.copySync(extLibPath, destLibPath, { recursive: true, overwrite: overwriteLibrary });
            console.log(TAG, "copyLibraryDirectory", `from ${extLibPath} to ${destLibPath}`, "done");
            const nativeTemplatePath = `${buildResult.dest}${AndroidConstants_1.AndroidConstants.GoogleNativeTemplateLibPath}`;
            fse.copySync(AndroidConstants_1.AndroidConstants.GoogleNativeAdTemplatePath, nativeTemplatePath, { recursive: true, overwrite: overwriteLibrary });
            console.log(TAG, "copyLibraryDirectory", `from ${AndroidConstants_1.AndroidConstants.GoogleNativeAdTemplatePath} to ${nativeTemplatePath}`, "done");
        }
    }
    /**
     * @en
     * Handle changes in the AppActivity.java.
     * To insert an entry function in the AppActivity.java, I need to store some code templates in the extension's template directory.
     * After build, the templates in the ${extension/admob/template/android/java } will be insert into the AppActivity.java in ${YourProject/native/android/src/.../AppActivity.java},
     * if the flag enableAdMob is true.
     * But if the flag enableAdMob is false, the extension will delete all the inserted code if exist.
     * It relays on the ${..._keycode.java} files to locate where to insert.
     * @param options
     * @param buildResult
     */
    handleAppActivity(options, buildResult) {
        // console.log(TAG, "handleAppActivity");
        // const adMobOption = options.packages[PACKAGE_NAME] as AdmobOption;        
        // const appActivityPath = AndroidConstants.AppActivityPath;
        // const { enableAdMob, modifyAppActivity} = adMobOption;
        // if (!enableAdMob || !modifyAppActivity) {
        //     deleteDestContentInSrcFile(appActivityPath, AndroidConstants.AppActivityTemplateInitPath);
        //     deleteDestContentInSrcFile(appActivityPath, AndroidConstants.ImportTemplatePath);
        //     deleteDestContentInSrcFile(appActivityPath, AndroidConstants.AppActivityTemplateDestroyPath);            
        // } else {
        //     insertDestToSrcBehindKey(appActivityPath, AndroidConstants.AppActivityTemplateInitPath, AndroidConstants.AppActivityKeyCodeTemplateInitPath);
        //     insertDestToSrcBehindKey(appActivityPath, AndroidConstants.ImportTemplatePath, AndroidConstants.ImportKeyCodeTemplatePath);
        //     insertDestToSrcBehindKey(appActivityPath, AndroidConstants.AppActivityTemplateDestroyPath, AndroidConstants.AppActivityKeyCodeTemplateDestroyPath);            
        // }
    }
    /**
     * @en
     * Execute all needed post-build tasks.
     * @param options
     * @param buildResult
     */
    executePostBuildTasks(options, buildResult) {
        this.handleGradleFiles(options, buildResult);
        this.copyLibraryDirectory(options, buildResult);
        this.insertApplicationIdToManifest(options, buildResult);
        this.handleAppActivity(options, buildResult);
        console.log(TAG, 'executePostBuildTasks', "all tasks done.");
    }
}
exports.BuildTaskAndroid = BuildTaskAndroid;
/**
 * @en
 * The global instance of the buildTask.
 */
exports.buildTaskAndroid = {
    android: new BuildTaskAndroid(),
};

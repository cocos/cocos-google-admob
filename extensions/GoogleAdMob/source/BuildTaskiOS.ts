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

import { IBuildResult } from "../@types";
import { PACKAGE_NAME, configs } from "./builder";
import { AdmobOption } from "./AdmobOptions";
import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as plist from 'plist';
import { ITaskOptions } from "./hooks";

const TAG = "[BuildTaskiOS]"
export class BuildTaskiOS {

    static readonly AdmobTemplatePath = `${__dirname}/../template/ios`;
    static readonly NativePath = `${Editor.Project.path}/native/engine/ios`

    mergedPlist(option:ITaskOptions, buildResult: IBuildResult) {
        console.log(TAG, 'mergedPlist','start');
        const adMobOption = option.packages[PACKAGE_NAME] as AdmobOption;
        const applicationId = adMobOption.applicationId;

        const admobPlist = fs.readFileSync(`${BuildTaskiOS.AdmobTemplatePath}/admob-config-info.plist`, 'utf8');
        const parsedAdmobPlist = plist.parse(admobPlist);
        parsedAdmobPlist["GADApplicationIdentifier"] = applicationId;
        
        const nativePlist = fs.readFileSync(`${Editor.Project.path}/native/engine/ios/Info.plist`, 'utf8');
        const parsedNativePlist = plist.parse(nativePlist);

        const mergedPlistData = Object.assign(Object.assign({}, parsedAdmobPlist), parsedNativePlist);
        fs.writeFileSync(`${BuildTaskiOS.AdmobTemplatePath}/admob/Info.plist`, plist.build(mergedPlistData), 'utf8');

        console.log(TAG, 'mergedPlist','end');
    }

    copyAdmobResources(option:ITaskOptions, buildResult: IBuildResult) {
        console.log(TAG, 'copyAdmobResources', 'start');
        
        const adMobOption = option.packages[PACKAGE_NAME] as AdmobOption;
        const overwriteLibrary = adMobOption.overwriteLibrary;

        const preCmakeAssertSrc = `${BuildTaskiOS.AdmobTemplatePath}/Post-admob.cmake`;
        const postCmakeAssertSrc = `${BuildTaskiOS.AdmobTemplatePath}/Pre-admob.cmake`;
        const preCmakeAssertDest = `${BuildTaskiOS.NativePath}/Post-admob.cmake`;
        const postCmakeAssertDest = `${BuildTaskiOS.NativePath}/Pre-admob.cmake`;
        fse.copySync(preCmakeAssertSrc, preCmakeAssertDest, { recursive: true, overwrite: overwriteLibrary });
        fse.copySync(postCmakeAssertSrc, postCmakeAssertDest, { recursive: true, overwrite: overwriteLibrary });

        const admobAssertSrc = `${BuildTaskiOS.AdmobTemplatePath}/admob`;
        const admobAssertDest = `${buildResult.dest}/proj/admob`;
        fse.copySync(admobAssertSrc, admobAssertDest, { recursive: true, overwrite: overwriteLibrary });
        console.log(TAG, 'copyAdmobResources', 'end');
    }

    /**
     * @en
     * Execute all needed post-build tasks.
     * @param options 
     * @param buildResult 
     */
    executePostBuildTasks(options: ITaskOptions, buildResult: IBuildResult) {
        console.log(TAG, 'executePostBuildTasks',"start");
        const adMobOption = options.packages[PACKAGE_NAME] as AdmobOption;
        const enableAdMob = adMobOption.enableAdMob;
        if(enableAdMob) {
            this.mergedPlist(options, buildResult);
            this.copyAdmobResources(options, buildResult);
        } else {
            console.log(TAG, 'executePostBuildTasks', "enableAdMob is false");    
        }
        
        console.log(TAG, 'executePostBuildTasks', "all tasks done.");
    }
}

/**
 * @en
 * The global instance of the buildTask.
 */
export const buildTaskiOS = {
    ios: new BuildTaskiOS(),
}
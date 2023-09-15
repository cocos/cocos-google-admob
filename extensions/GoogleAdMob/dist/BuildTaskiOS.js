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
exports.buildTaskiOS = exports.BuildTaskiOS = void 0;
const builder_1 = require("./builder");
const fs = __importStar(require("fs"));
const fse = __importStar(require("fs-extra"));
const plist = __importStar(require("plist"));
const TAG = "[BuildTaskiOS]";
class BuildTaskiOS {
    mergedPlist(option, buildResult) {
        console.log(TAG, 'mergedPlist', 'start');
        const adMobOption = option.packages[builder_1.PACKAGE_NAME];
        const applicationId = adMobOption.applicationId;
        const admobPlist = fs.readFileSync(`${BuildTaskiOS.AdmobTemplatePath}/admob-config-info.plist`, 'utf8');
        const parsedAdmobPlist = plist.parse(admobPlist);
        parsedAdmobPlist["GADApplicationIdentifier"] = applicationId;
        const nativePlist = fs.readFileSync(`${Editor.Project.path}/native/engine/ios/Info.plist`, 'utf8');
        const parsedNativePlist = plist.parse(nativePlist);
        const mergedPlistData = Object.assign(Object.assign({}, parsedAdmobPlist), parsedNativePlist);
        fs.writeFileSync(`${BuildTaskiOS.AdmobTemplatePath}/admob/Info.plist`, plist.build(mergedPlistData), 'utf8');
        console.log(TAG, 'mergedPlist', 'end');
    }
    copyAdmobResources(option, buildResult) {
        console.log(TAG, 'copyAdmobResources', 'start');
        const adMobOption = option.packages[builder_1.PACKAGE_NAME];
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
    executePostBuildTasks(options, buildResult) {
        console.log(TAG, 'executePostBuildTasks', "start");
        const adMobOption = options.packages[builder_1.PACKAGE_NAME];
        const enableAdMob = adMobOption.enableAdMob;
        if (enableAdMob) {
            this.mergedPlist(options, buildResult);
            this.copyAdmobResources(options, buildResult);
        }
        else {
            console.log(TAG, 'executePostBuildTasks', "enableAdMob is false");
        }
        console.log(TAG, 'executePostBuildTasks', "all tasks done.");
    }
}
exports.BuildTaskiOS = BuildTaskiOS;
BuildTaskiOS.AdmobTemplatePath = `${__dirname}/../template/ios`;
BuildTaskiOS.NativePath = `${Editor.Project.path}/native/engine/ios`;
/**
 * @en
 * The global instance of the buildTask.
 */
exports.buildTaskiOS = {
    ios: new BuildTaskiOS(),
};

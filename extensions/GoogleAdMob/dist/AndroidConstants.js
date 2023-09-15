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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AndroidConstants = void 0;
class AndroidConstants {
}
exports.AndroidConstants = AndroidConstants;
/**
 * @en
 * The native path of this project.
 */
AndroidConstants.NativePath = `${Editor.Project.path}/native/engine/android`;
/**
 * @en
 * the build.gradle path in project.
 */
AndroidConstants.AppBuildGradle = `${AndroidConstants.NativePath}/app/build.gradle`;
/**
 * @en
 * template directory of the extension
 */
AndroidConstants.AdmobTemplatePath = `${__dirname}/../template/android`;
/**
 * @en
 * the template gradle files in extension.
 */
AndroidConstants.AdmobTemplateGradlePath = `${AndroidConstants.AdmobTemplatePath}/build.gradle`;
/**
 * @en
 * The name of the android JAVA library.
 */
AndroidConstants.AdmobLibName = "libadmob";
/**
 * @en
 * the template source path of the java lib.
 */
AndroidConstants.AdmobLibSrcPath = `${AndroidConstants.AdmobTemplatePath}/${AndroidConstants.AdmobLibName}`;
/**
 * @en
 * The destination relative path of the java library.
 */
AndroidConstants.AdmobLibDestPath = `/proj/${AndroidConstants.AdmobLibName}`;
/**
 * @en
 * The final destination path of the libadmob's AndroidManifest.xml.
 */
AndroidConstants.AdmobDestManifestPath = `${AndroidConstants.AdmobLibDestPath}/AndroidManifest.xml`;
/**
 * @en
 * Setting.gradle.
 */
AndroidConstants.SettingGradle = `settings.gradle`;
/**
 * @en
 * The template of the setting.gradle in admob extension.
 */
AndroidConstants.AdmobTemplateSettingGradle = `${AndroidConstants.AdmobTemplatePath}/${AndroidConstants.SettingGradle}`;
/**
 * @en
 * Code template to insert into the AppActivity.java in the build project.
 */
AndroidConstants.AppActivityTemplateInitPath = `${AndroidConstants.AdmobTemplatePath}/java/Init.java`;
/**
 * @en
 * Keycode where do the extension find the exact place to insert the template code in the AppActivity's onCreate method.
 */
AndroidConstants.AppActivityKeyCodeTemplateInitPath = `${AndroidConstants.AdmobTemplatePath}/java/Init_keyCode.java`;
/**
 * @en
 * Code template to insert into the AppActivity.java in the build project.
 */
AndroidConstants.AppActivityTemplateDestroyPath = `${AndroidConstants.AdmobTemplatePath}/java/Destroy.java`;
/**
 * @en
 * Keycode where do the extension find the exact place to insert the template code in the AppActivity's onCreate method.
 */
AndroidConstants.AppActivityKeyCodeTemplateDestroyPath = `${AndroidConstants.AdmobTemplatePath}/java/Destroy_keyCode.java`;
/**
 * @en
 * The absolute path of the AppActivity.java
 */
AndroidConstants.AppActivityPath = `${AndroidConstants.NativePath}/app/src/com/cocos/game/AppActivity.java`;
/**
 *
 */
AndroidConstants.ImportTemplatePath = `${AndroidConstants.AdmobTemplatePath}/java/Import.java`;
/**
 *
 */
AndroidConstants.ImportKeyCodeTemplatePath = `${AndroidConstants.AdmobTemplatePath}/java/Import_keyCode.java`;
/**
 *
 */
AndroidConstants.GoogleNativeAdTemplateLibName = `nativetemplates`;
/**
 *
 */
AndroidConstants.GoogleNativeAdTemplatePath = `${AndroidConstants.AdmobTemplatePath}/googleads-mobile-android-native-templates-main/${AndroidConstants.GoogleNativeAdTemplateLibName}`;
/**
 *
 */
AndroidConstants.GoogleNativeTemplateLibPath = `/proj/${AndroidConstants.GoogleNativeAdTemplateLibName}`;

"use strict";
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

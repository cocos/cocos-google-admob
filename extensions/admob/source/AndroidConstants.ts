import { PACKAGE_NAME } from "./builder";

export class AndroidConstants {
    /**
     * @en
     * The native path of this project.
     */
    static readonly NativePath = `${Editor.Project.path}/native/engine/android`
    /**
     * @en
     * the build.gradle path in project.
     */
    static readonly AppBuildGradle = `${AndroidConstants.NativePath}/app/build.gradle`;
    /**
     * @en
     * template directory of the extension 
     */
    static readonly AdmobTemplatePath = `${Editor.Project.path}/extensions/${PACKAGE_NAME}/template/android`;
    /**
     * @en
     * the template gradle files in extension.
     */
    static readonly AdmobTemplateGradlePath = `${AndroidConstants.AdmobTemplatePath}/build.gradle`;
    /**
     * @en
     * The name of the android JAVA library.
     */
    static readonly AdmobLibName = "libadmob";
    /**
     * @en
     * the template source path of the java lib.
     */
    static readonly AdmobLibSrcPath = `${AndroidConstants.AdmobTemplatePath}/${AndroidConstants.AdmobLibName}`;
    /**
     * @en
     * The destination relative path of the java library.
     */
    static readonly AdmobLibDestPath = `/proj/${AndroidConstants.AdmobLibName}`;
    /**
     * @en
     * The final destination path of the libadmob's AndroidManifest.xml.
     */
    static readonly AdmobDestManifestPath = `${AndroidConstants.AdmobLibDestPath}/AndroidManifest.xml`;

    /**
     * @en
     * Setting.gradle.
     */
    static readonly SettingGradle = `settings.gradle`;
    /**
     * @en
     * The template of the setting.gradle in admob extension.
     */
    static readonly AdmobTemplateSettingGradle = `${AndroidConstants.AdmobTemplatePath}/${AndroidConstants.SettingGradle}`;

    /**
     * @en
     * Code template to insert into the AppActivity.java in the build project.
     */
    static readonly AppActivityTemplateInitPath = `${AndroidConstants.AdmobTemplatePath}/java/Init.java`;

    /**
     * @en
     * Keycode where do the extension find the exact place to insert the template code in the AppActivity's onCreate method.
     */
    static readonly AppActivityKeyCodeTemplateInitPath = `${AndroidConstants.AdmobTemplatePath}/java/Init_keyCode.java`;

    /**
     * @en
     * Code template to insert into the AppActivity.java in the build project.
     */
     static readonly AppActivityTemplateDestroyPath = `${AndroidConstants.AdmobTemplatePath}/java/Destroy.java`;

     /**
      * @en
      * Keycode where do the extension find the exact place to insert the template code in the AppActivity's onCreate method.
      */
     static readonly AppActivityKeyCodeTemplateDestroyPath = `${AndroidConstants.AdmobTemplatePath}/java/Destroy_keyCode.java`;

    /**
     * @en
     * The absolute path of the AppActivity.java
     */
    static readonly AppActivityPath = `${AndroidConstants.NativePath}/app/src/com/cocos/game/AppActivity.java`;
    
    /**
     * 
     */
    static readonly ImportTemplatePath = `${AndroidConstants.AdmobTemplatePath}/java/Import.java`;

    /**
     * 
     */
    static readonly ImportKeyCodeTemplatePath = `${AndroidConstants.AdmobTemplatePath}/java/Import_keyCode.java`;
}


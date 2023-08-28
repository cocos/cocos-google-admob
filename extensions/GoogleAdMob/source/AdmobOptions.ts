import { deprecate } from "util";

/**
 * @en
 * AdmobOption, used to store the configurations in the build panel.
 * After the build process completed, the custom options will be passed through the `onAfterBuild` method in the `hook.js`.
 * The options can be fetched using `options.packages[PACKAGE_NAME]` 
 */
 export interface AdmobOption {
    /**
     * @en
     * The applicationId configured in the google mobile adk administrator website.
     * Visit https://apps.admob.com/v2/home to create your own application.
     */
    applicationId?: string;

    /**
     * @en
     * Enable or disable the admob extension.
     * Once enabled, some files will be replaced by the template in this extension.
     */
    enableAdMob?: boolean;

    /**
     * @en
     * Overwrite all the files exported in the built project by the file in the extension templates.
     */
    overwriteLibrary?: boolean;

    // /**
    //  * @en
    //  * Whether to modify the AppActivity, add import and entry function to it.
    //  */    
    // modifyAppActivity?: boolean;
}
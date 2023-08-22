# Cocos Creator Google Mobile Advertisement Extension

This extension is designed for Cocos Creator to integrate the Google Mobile Ad SDK.

如果你需要中文文档，请移步 [CN](../zh/README.md)。

## Requirements

- Download [node.js](https://nodejs.org/en)
- Download [Cocos Creator](https://www.cocos.com/en)(Minimum version is 3.7.3)

## Work Flow

- Download this sample
- Open the terminal and enter the extension's directory

    ```bash
    cd ./extensions/amob
    ```

    Type `npm install` in the terminal

    ```bash
    npm install
    ```

- Open the project by Cocos Creator v3.7.3.
- Open the Extension Manager panel.

    ![ext-mgr](../img/ext-mgr.png)

- Enable this extension in the installed page

    ![enable](../img/enable.png)

- Create an Android Build Task

    ![open-build-panel](../img/open-build-panel.png)

- Input your application Id, and check the **EnableAdmob** option
  
    ![config-admob-application](../img/config-admob-application.png)

- Click on the Build button, and then open the Android project by AndroidStudio, then build the apk to test.

    ![build](../img/build.png)

## Options

- Application Id: The application Id is generated in the back-end of google admobile console.
- EnableAdmob: Whether to enable the extension  
  - When enabled, releated files include the gradle files and Android project configs will be modified.
  - When disabled, all configurations will be removed from the generated project.
- Modify AppActivity: Whether to modify the AppActivity.java file.
  - **Enabled**：This option will add the admob create and destroy function to the `onCreate` and `onDestroy` method in the AppActivity.java automatically.
  - **Disenabled**：No code will be add the AppActivity.java, if you want to enable admob, please add the following code with manual.
        - onCreate: Add AdServiceHub.instance().init(this);
        - onDestroy: Add AdServiceHub.instance().destroy();
- Force overwrite the libadmob: This option overwrites the libadmob project in the build directory with the extension's template, so don't check this option if you have modified libadmob in the build.
      - If you want to customize libadmob, it is recommended to modify the libadmob project in extension/admob/template, which will be **copied** to the corresponding project in the build.

module.exports = {
    title: "Cocos Google Admob Extension.",
    ruleTest_msg:
        "The filled text does not meet the rules, please enter 'cocos'",

    options: {
        enterCocos: "Please Enter cocos ",

        remoteAddress: "RemoteAddress",

        selectTest: "Select Options",
        selectTestOption1: "option （1）",
        selectTestOption2: "option （2）",
        objectTest: "Object Options Example",
        arrayTest: "Array Options Example",
        complexTestNumber: "Number",
        complexTestBoolean: "Boolean",
        complexTestString: "String"
    },

    description: "A single example about Cocos Build Plugin",

    enableAdMob: {
        title: "EnableAdMob",
        tip: "Enable or disable the admob module, this will copy or replace some files in {build/YourbuildNam} and {project/native}"
    },

    applicationId: {
        title: "Application Id",
        placeholder: "Please enter your Application Id ..",
        tip: "The applicationId configured in the Google Mobile Ad official website (https://apps.admob.com/v2/home)."
    },

    warn: {
        title: "Note：",
        content: `Please do not use the test unitIds when you decide to publish your application on shelf.`,
    },

    overwriteLibrary: {
        title: "Force overwrite the libadmob library",
        tip: "Force overwrite the files in the built proj/libadmob from the extension's template.",
    },

    modifyAppActivity:{
        title: "Modify AppActivity",
        tip: "This option will modify the AppActivity.java, add code include the entry function and import of libadmob to the AppActivity",
    }
};
module.exports = {
    title: "Cocos Creator 谷歌 AdMobile 插件",
    ruleTest_msg: "填写字段不满足规则，请输入 'cocos'",
    options: {
        enterCocos: "请输入 'cocos' 字符 ",
        remoteAddress: "资源服务地址",
        selectTest: "select 选项测试",
        selectTestOption1: "选项 （1）",
        selectTestOption2: "选项 （2）",
        objectTest: "Object 复合类型配置示例",
        arrayTest: "Array 复合类型配置示例",
        complexTestNumber: "Number",
        complexTestBoolean: "Boolean",
        complexTestString: "String"
    },
    description: "构建插件的一个简单示例",

    enableAdMob: {
        title: "启用",
        tip: "启用或禁用 admob，启用后会导出扩展 template 目录内的文件到您的build和 project/native 目录内。"
    },
    applicationId: {
        title: "应用 ID ",
        placeholder: "请输入您的 Application Id ..",
        tip: "在 admob 后台配置的 applicationId",
    },
    warn: {
        title: "注意：",
        content: `默认采用的是测试用 unitId，在发布到正式环境时请务必将这些 unitId 修改为正式 Id`,
    },
    overwriteLibrary: {
        title: "覆盖已存在的库文件",
        tip: "覆盖已有的库文件，这个操作会覆盖 ${build/your build/proj/libadmob} 内的文件。",
    },

    modifyAppActivity:{
        title: "修改 AppActivity",
        tip: "该选项会修改 AppActivity.java 内的文件，包含：引用 libadmob 的库文件，增加入口函数，如取消，则需要手动添加。",
    }
};
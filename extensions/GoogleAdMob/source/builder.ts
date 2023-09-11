import { BuildPlugin } from '../@types';

export const load: BuildPlugin.load = function() {
    console.debug(`${PACKAGE_NAME} load`);
};

export const unload: BuildPlugin.load = function() {
    console.debug(`${PACKAGE_NAME} unload`);
};

export const PACKAGE_NAME = 'admob';

const complexTestItems = {
    number: {
        label: `i18n:${PACKAGE_NAME}.options.complexTestNumber`,
        description: `i18n:${PACKAGE_NAME}.options.complexTestNumber`,
        default: 80,
        render: {
            ui: 'ui-num-input',
            attributes: {
                step: 1,
                min: 0,
            },
        },
    },
    string: {
        label: `i18n:${PACKAGE_NAME}.options.complexTestString`,
        description: `i18n:${PACKAGE_NAME}.options.complexTestString`,
        default: 'cocos',
        render: {
            ui: 'ui-input',
            attributes: {
                placeholder: `i18n:${PACKAGE_NAME}.options.enterCocos`,
            },
        },
        verifyRules: ['ruleTest'],
    },
    boolean: {
        label: `i18n:${PACKAGE_NAME}.options.complexTestBoolean`,
        description: `i18n:${PACKAGE_NAME}.options.complexTestBoolean`,
        default: true,
        render: {
            ui: 'ui-checkbox',
        },
    },
};

export const configs: BuildPlugin.Configs = {
    'android': {
        hooks: './hooks',
        doc: 'editor/publish/custom-build-plugin.html',
        options: {

            enableAdMob: {
                label: `i18n:${PACKAGE_NAME}.enableAdMob.title`,
                description:`i18n:${PACKAGE_NAME}.enableAdMob.tip`,
                default: `true`,
                render: {
                    ui: 'ui-checkbox',                   
                },                
                //verifyRules: ['ruleTest'],
            },

            // modifyAppActivity: {
            //     label: `i18n:${PACKAGE_NAME}.modifyAppActivity.title`,
            //     description:`i18n:${PACKAGE_NAME}.modifyAppActivity.tip`,
            //     default: `true`,
            //     render: {
            //         ui: 'ui-checkbox',                   
            //     },                
            // },

            overwriteLibrary: {
                label: `i18n:${PACKAGE_NAME}.overwriteLibrary.title`,
                description:`i18n:${PACKAGE_NAME}.overwriteLibrary.tip`,
                default: `true`,
                render: {
                    ui: 'ui-checkbox',                   
                },                
                //verifyRules: ['ruleTest'],
            },

            applicationId: {
                label: `i18n:${PACKAGE_NAME}.applicationId.title`,
                description:`i18n:${PACKAGE_NAME}.applicationId.tip`,
                default: '',
                render: {
                    ui: 'ui-input',
                    attributes: {
                        placeholder: `i18n:${PACKAGE_NAME}.applicationId.placeholder`,
                    },
                },
                verifyRules: ['required'],
            },

            warn: {
                label: `i18n:${PACKAGE_NAME}.warn.title`,   
                default: `i18n:${PACKAGE_NAME}.warn.content`,
                render: {
                    ui: 'ui-label',                    
                },                                                    
            },       
        },
        verifyRuleMap: {
            ruleTest: {
                message: `i18n:${PACKAGE_NAME}.options.ruleTest_msg`,
                func(val, buildOptions) {
                    if (val === 'cocos') {
                        return true;
                    }
                    return false;
                },
            },
        },
    },
    'ios': {
        hooks: './hooks',
        doc: 'editor/publish/custom-build-plugin.html',
        options: {

            enableAdMob: {
                label: `i18n:${PACKAGE_NAME}.enableAdMob.title`,
                description:`i18n:${PACKAGE_NAME}.enableAdMob.tip`,
                default: `true`,
                render: {
                    ui: 'ui-checkbox',                   
                },
            },
            overwriteLibrary: {
                label: `i18n:${PACKAGE_NAME}.overwriteLibrary.title`,
                description:`i18n:${PACKAGE_NAME}.overwriteLibrary.tip`,
                default: `true`,
                render: {
                    ui: 'ui-checkbox',                   
                },
            },

            applicationId: {
                label: `i18n:${PACKAGE_NAME}.applicationId.title`,
                description:`i18n:${PACKAGE_NAME}.applicationId.tip`,
                default: '',
                render: {
                    ui: 'ui-input',
                    attributes: {
                        placeholder: `i18n:${PACKAGE_NAME}.applicationId.placeholder`,
                    },
                },
                verifyRules: ['required'],
            },

            warn: {
                label: `i18n:${PACKAGE_NAME}.warn.title`,   
                default: `i18n:${PACKAGE_NAME}.warn.content`,
                render: {
                    ui: 'ui-label',                    
                },                                                    
            },       
        },
        verifyRuleMap: {
            ruleTest: {
                message: `i18n:${PACKAGE_NAME}.options.ruleTest_msg`,
                func(val, buildOptions) {
                    if (val === 'cocos') {
                        return true;
                    }
                    return false;
                },
            },
        },
    },
};

export const assetHandlers: BuildPlugin.AssetHandlers = './asset-handlers';

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

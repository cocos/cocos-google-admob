"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onAfterMake = exports.onBeforeMake = exports.onError = exports.unload = exports.onAfterBuild = exports.onAfterCompressSettings = exports.onBeforeCompressSettings = exports.onBeforeBuild = exports.load = exports.throwError = void 0;
const BuildTaskAndroid_1 = require("./BuildTaskAndroid");
const BuildTaskiOS_1 = require("./BuildTaskiOS");
const PACKAGE_NAME = 'admob';
function log(...arg) {
    return console.log(`[${PACKAGE_NAME}] `, ...arg);
}
let allAssets = [];
exports.throwError = true;
const load = function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`[${PACKAGE_NAME}] Load cocos plugin example in builder.`);
        allAssets = yield Editor.Message.request('asset-db', 'query-assets');
    });
};
exports.load = load;
const onBeforeBuild = function (options, result) {
    return __awaiter(this, void 0, void 0, function* () {
        // Todo some thing
        log(`${PACKAGE_NAME}.webTestOption`, 'onBeforeBuild');
    });
};
exports.onBeforeBuild = onBeforeBuild;
const onBeforeCompressSettings = function (options, result) {
    return __awaiter(this, void 0, void 0, function* () {
        const pkgOptions = options.packages[PACKAGE_NAME];
        if (pkgOptions.webTestOption) {
            console.debug('webTestOption', true);
        }
        // Todo some thing
        console.debug('get settings test', result.settings);
    });
};
exports.onBeforeCompressSettings = onBeforeCompressSettings;
const onAfterCompressSettings = function (options, result) {
    return __awaiter(this, void 0, void 0, function* () {
        // Todo some thing
        console.log('webTestOption', 'onAfterCompressSettings');
        if (options.platform === "ios") {
            BuildTaskiOS_1.buildTaskiOS.ios.executePostBuildTasks(options, result);
        }
    });
};
exports.onAfterCompressSettings = onAfterCompressSettings;
const onAfterBuild = function (options, result) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("onAfterBuild", "options:", JSON.stringify(options));
        if (options.platform === "android") {
            BuildTaskAndroid_1.buildTaskAndroid.android.executePostBuildTasks(options, result);
        }
    });
};
exports.onAfterBuild = onAfterBuild;
const unload = function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`[${PACKAGE_NAME}] Unload cocos plugin example in builder.`);
    });
};
exports.unload = unload;
const onError = function (options, result) {
    return __awaiter(this, void 0, void 0, function* () {
        // Todo some thing
        console.warn(`${PACKAGE_NAME} run onError`);
    });
};
exports.onError = onError;
const onBeforeMake = function (root, options) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`onBeforeMake: root: ${root}, options: ${options}`);
    });
};
exports.onBeforeMake = onBeforeMake;
const onAfterMake = function (root, options) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`onAfterMake: root: ${root}, options: ${options}`);
    });
};
exports.onAfterMake = onAfterMake;

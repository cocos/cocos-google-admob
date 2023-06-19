import { _decorator, Component } from 'cc';
import { director } from 'cc';
import { TestScenes } from './TestScenes';
import { log } from 'cc';
const { ccclass, property } = _decorator;

const module = "[AdmobTestNative]"
@ccclass('AdmobTestNative')
export class AdmobTestNative extends Component {

    protected start(): void {

    }

    onClickLoadNativeAd() {
        log(module, "onClickLoadNativeAd");
    }

    onNextScene() {
        director.loadScene(TestScenes[0]);
    }
}
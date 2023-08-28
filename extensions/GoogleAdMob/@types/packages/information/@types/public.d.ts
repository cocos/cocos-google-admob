export interface IContribution {
    tags?: string[];
}

export interface IInformationItem {
    enable: boolean;
    complete: boolean;
    form: string;
}

// TODO: 状态处理
export interface IDialogAction {
    // reject 用户开始填写后，拒绝填写完成
    // resolve 用户正常填写完数据
    // cancel 开关没开的时候返回跳过填写
    // unusual 异常情况，例如断网、网络接口无法访问
    action: 'reject' | 'resolve' | 'cancel' | 'unusual',
}

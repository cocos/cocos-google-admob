import Gizmo from '../gizmo-base';
import LightProbeTetrahedronController from '../controller/light-probe-tetrahedron-controller';
declare class SkinningModelComponentGizmo extends Gizmo {
    private _controller;
    tetrahedronController: LightProbeTetrahedronController | null;
    init(): void;
    onShow(): void;
    onHide(): void;
    createController(): void;
    updateControllerTransform(): void;
    updateControllerData(): void;
    onTargetUpdate(): void;
    onNodeChanged(): void;
    onUpdate(): void;
}
export default SkinningModelComponentGizmo;
//# sourceMappingURL=skinning-model-component-gizmo.d.ts.map
import {
    App,
    ModelsEngine,
    ShadersEngine,
    SceneManager,
    ScriptManager,
    ControlsManager,
    ImagesEngine,
    AmbientLight,
    DirectionalLight,
    THREE,
    Mesh,
    PostProcessingEngine,
    BackgroundSound,
    AudioEngine
} from 'mage-engine';

import { script } from './cube';

export default class FirstScene extends App {

    loadScene = () => Promise.resolve()

    progressAnimation(callback) {
        callback();
    }

    sampleCube() {
        const geometry = new THREE.CubeGeometry(20, 20, 20);
		const material = new THREE.MeshBasicMaterial({
			color: 0x00ff00,
			wireframe : true
		});

		const cube = new Mesh(geometry, material);
        //cube.loadScript('cube');

        return cube;
    }

    onKeyPress = ({ event }) => {
        console.log('app keypress', event, this.transform);
        switch (event.key) {
			case "q": // Q
				this.transform.setSpace(this.transform.space === "local" ? "world" : "local");
				break;
			case "ctrl": // Ctrl
				this.transform.setTranslationSnap(100);
				this.transform.setRotationSnap(THREE.Math.degToRad(15));
				break;
			case "w": // W
				this.transform.setMode("translate");
				break;
			case "e": // E
				this.transform.setMode("rotate");
				break;
			case "r": // R
				this.transform.setMode("scale");
				break;
			case 187:
			case 107: // +, =, num+
				this.transform.setSize(this.transform.size + 0.1);
				break;
			case 189:
			case 109: // -, _, num-
				this.transform.setSize(Math.max(this.transform.size - 0.1, 0.1));
				break;
			case 'x': // X
				this.transform.showX = ! this.transform.showX;
				break;
			case 'y': // Y
				this.transform.showY = ! this.transform.showY;
				break;
			case 'z': // Z
				this.transform.showZ = ! this.transform.showZ;
				break;
			case 32: // Spacebar
				this.transform.enabled = ! this.transform.enabled;
				break;
		}
    }

    onCreate() {

        ScriptManager.create('cube', script);

        SceneManager.camera.position({y: 70, z: 150});
        SceneManager.camera.lookAt(0, 0, 0);

        const cube = this.sampleCube();

        ControlsManager.setOrbitControl();
        ControlsManager.setTransformControl();
        this.transform = ControlsManager.getControl('transform');

        this.transform.attach(cube.mesh);

        this.enableInput();

        this.sceneHelper.addGrid(200, 10);

    }
}
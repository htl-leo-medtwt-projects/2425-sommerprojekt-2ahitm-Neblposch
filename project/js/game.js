import * as THREE from "https://cdn.skypack.dev/three@0.136";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/GLTFLoader.js";

const KEYS = { 'd': 68, 's': 83, 'w': 87, 'a': 65 };

class InputController {
    constructor() {
        this.keys = {};
        this.mouseXDelta = 0;
        this.mouseYDelta = 0;
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => this.keys[e.keyCode] = true);
        document.addEventListener('keyup', (e) => this.keys[e.keyCode] = false);
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
    }

    onMouseMove(e) {
        if (document.pointerLockElement) {
            this.mouseXDelta = e.movementX;
            this.mouseYDelta = e.movementY;
        }
    }
}



class FirstPersonCamera {
    constructor(camera) {
        this.camera = camera;
        this.input = new InputController();
        this.phi = 0;
        this.theta = 0;
        this.velocity = new THREE.Vector3();
        this.speed = 0.015;
        this.bobbingSpeed = 11;
        this.bobbingAmount = 0.05;
        this.time = 0;
        this.originalY = camera.position.y; // Store the original camera height
    }

    update(deltaTime) {
        this.phi -= this.input.mouseXDelta * 0.002;
        this.theta -= this.input.mouseYDelta * 0.002;
        this.theta = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.theta));

        const direction = new THREE.Vector3(
            Math.sin(this.phi),
            0,
            Math.cos(this.phi)
        );

        this.velocity.set(0, 0, 0);

        if (this.input.keys[KEYS.w]) this.velocity.add(direction);
        if (this.input.keys[KEYS.s]) this.velocity.sub(direction);
        if (this.input.keys[KEYS.a]) this.velocity.add(new THREE.Vector3(direction.z, 0, -direction.x));
        if (this.input.keys[KEYS.d]) this.velocity.add(new THREE.Vector3(-direction.z, 0, direction.x));

        this.velocity.normalize().multiplyScalar(this.speed);
        this.camera.position.add(this.velocity);

        // Camera bobbing effect
        if(this.input.keys[KEYS.w] || this.input.keys[KEYS.s] || this.input.keys[KEYS.a] || this.input.keys[KEYS.d]){

            this.time += deltaTime;
            this.camera.position.y = this.originalY + Math.sin(this.time * this.bobbingSpeed) * this.bobbingAmount;
        }

        const lookDir = new THREE.Vector3(
            Math.sin(this.phi) * Math.cos(this.theta),
            Math.sin(this.theta),
            Math.cos(this.phi) * Math.cos(this.theta)
        );

        this.camera.lookAt(this.camera.position.clone().add(lookDir));
        this.input.mouseXDelta = this.input.mouseYDelta = 0;
    }
}


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.7, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

const loader = new GLTFLoader();
loader.load('./../3d_assets/Room1V1.glb', (gltf) => scene.add(gltf.scene));

const fpsCamera = new FirstPersonCamera(camera);
renderer.domElement.addEventListener('click', () => document.body.requestPointerLock());

let previousTime = performance.now();




function animate() {
    requestAnimationFrame(animate);
    const currentTime = performance.now();
    const deltaTime = (currentTime - previousTime) / 1000;
    previousTime = currentTime;

    fpsCamera.update(deltaTime);
    renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

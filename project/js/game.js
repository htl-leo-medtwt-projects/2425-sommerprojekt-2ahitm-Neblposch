import roomData from './../data/roomData.js';

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);

scene.environmentTexture = null;
scene.environmentIntensity = 0;

const KEYS = { 'w': 87, 'a': 65, 's': 83, 'd': 68 };

class InputController {
    constructor() {
        this.keys = {};
        this.mouseXDelta = 0;
        this.mouseYDelta = 0;
        this.init();
    }

    init() {
        document.addEventListener("keydown", e => this.keys[e.keyCode] = true);
        document.addEventListener("keyup", e => this.keys[e.keyCode] = false);
        document.addEventListener("mousemove", e => this.onMouseMove(e));
    }

    onMouseMove(e) {
        if (document.pointerLockElement) {
            this.mouseXDelta = e.movementX;
            this.mouseYDelta = e.movementY;
        }
    }
}

class FirstPersonCamera {
    constructor(camera, scene) {
        this.camera = camera;
        camera.minZ = 0.01; // default is 1, lower values let the camera get closer

        this.scene = scene;
        this.input = new InputController();
        this.phi = 0;
        this.theta = 0;
        this.speed = 0.02;
        this.velocity = new BABYLON.Vector3();
        this.bobbingSpeed = 14;
        this.bobbingAmount = 0.05;
        this.time = 0;
        this.originalY = this.camera.position.y;
    }

    update(deltaTime) {
        this.phi += this.input.mouseXDelta * 0.002;
        this.theta -= this.input.mouseYDelta * 0.002;
        this.theta = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.theta));

        const direction = new BABYLON.Vector3(
            Math.sin(this.phi),
            0,
            Math.cos(this.phi)
        );

        this.velocity.set(0, 0, 0);

        if (this.input.keys[KEYS.w]) this.velocity.addInPlace(direction);
        if (this.input.keys[KEYS.s]) this.velocity.subtractInPlace(direction);
        if (this.input.keys[KEYS.a]) this.velocity.addInPlace(new BABYLON.Vector3(-direction.z, 0, direction.x));
        if (this.input.keys[KEYS.d]) this.velocity.addInPlace(new BABYLON.Vector3(direction.z, 0, -direction.x));

        if (!this.velocity.equals(BABYLON.Vector3.Zero())) {
            this.velocity = this.velocity.normalize().scale(this.speed);

            const nextPosition = this.camera.position.add(this.velocity);

            // Check for collisions before updating the position
            if (!checkCollision(this.camera.position, nextPosition)) {
                this.camera.position.addInPlace(this.velocity);

                this.time += deltaTime;
                this.camera.position.y = this.originalY + Math.sin(this.time * this.bobbingSpeed) * this.bobbingAmount;
            }
        }

        const lookDir = new BABYLON.Vector3(
            Math.sin(this.phi) * Math.cos(this.theta),
            Math.sin(this.theta),
            Math.cos(this.phi) * Math.cos(this.theta)
        );

        const target = this.camera.position.add(lookDir);
        this.camera.setTarget(target);

        this.input.mouseXDelta = this.input.mouseYDelta = 0;
    }
}

const camera = new BABYLON.UniversalCamera("fpsCamera", new BABYLON.Vector3(0, 1.7, 0), scene);
camera.attachControl(canvas, false);
camera.speed = 0;
camera.inputs.clear();

let brightnessFirstRoom = 7;

const light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), scene);
light.diffuse = new BABYLON.Color3(0, 0, 0);
light.specular = new BABYLON.Color3(1, 0, 0);
light.groundColor = new BABYLON.Color3(0, 0, 0);
light.intensity = 0;

const pointLight1 = new BABYLON.PointLight("greenPointLight", new BABYLON.Vector3(2.8, 3.3, -2.7), scene);
pointLight1.diffuse = new BABYLON.Color3(1, 0, 0);
pointLight1.specular = new BABYLON.Color3(0, 1, 0);
pointLight1.intensity = brightnessFirstRoom;

const pointLight2 = new BABYLON.PointLight("greenPointLight", new BABYLON.Vector3(2.8, 3.3, -0.5), scene);
pointLight2.diffuse = new BABYLON.Color3(1, 0, 0);
pointLight2.specular = new BABYLON.Color3(0, 1, 0);
pointLight2.intensity = brightnessFirstRoom;

const pointLight3 = new BABYLON.PointLight("greenPointLight", new BABYLON.Vector3(2.8, 3.3, 1.5), scene);
pointLight3.diffuse = new BABYLON.Color3(1, 0, 0);
pointLight3.specular = new BABYLON.Color3(0, 1, 0);
pointLight3.intensity = brightnessFirstRoom;

const pointLight4 = new BABYLON.PointLight("greenPointLight", new BABYLON.Vector3(2.8, 3.3, 3.5), scene);
pointLight4.diffuse = new BABYLON.Color3(1, 0, 0);
pointLight4.specular = new BABYLON.Color3(0, 1, 0);
pointLight4.intensity = brightnessFirstRoom;

// Load GLB
BABYLON.SceneLoader.Append("./../3d_assets/", "Room1V1.glb", scene, function () {
    if (scene.environmentHelper) scene.environmentHelper.dispose();
});

// Pointer lock
canvas.addEventListener("click", () => {
    canvas.requestPointerLock();
});

// Resize
window.addEventListener("resize", () => {
    engine.resize();
});

const fpsCamera = new FirstPersonCamera(camera, scene);

// Coordinates display (optional, requires a div with id="coordinates")
const coordinatesDiv = document.getElementById("coordinates");

// Main render loop
let previousTime = performance.now();
engine.runRenderLoop(() => {
    const currentTime = performance.now();
    const deltaTime = (currentTime - previousTime) / 1000;
    previousTime = currentTime;

    fpsCamera.update(deltaTime);

    if (coordinatesDiv) {
        const playerPosition = camera.position;
        coordinatesDiv.innerText = `X: ${playerPosition.x.toFixed(2)}, Z: ${playerPosition.z.toFixed(2)}`;
    }

    scene.render();
});

function checkCollision(playerPosition, nextPosition) {
    for (const room of roomData.rooms) {
        for (const wall of room.walls) {
            if (wall.axis === "x") {
                // Check if the player crosses the x-axis boundary
                if (Math.abs(nextPosition.x - wall.distance) < 0.5) {
                    return true;
                }
            } else if (wall.axis === "z") {
                // Check if the player crosses the z-axis boundary
                if (Math.abs(nextPosition.z - wall.distance) < 0.5) {
                    return true;
                }
            }
        }
    }
    return false;
}
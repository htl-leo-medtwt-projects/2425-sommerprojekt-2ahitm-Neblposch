import roomData from './../data/roomData.js';

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);



const customLoadingScreen = {
    displayLoadingUI: function () {
        document.getElementById("loadingScreen").style.display = "flex";
    },
    hideLoadingUI: function () {
        document.getElementById("loadingScreen").style.display = "none";
    }
};

// Set the custom loading screen
engine.loadingScreen = customLoadingScreen;
engine.loadingScreen.displayLoadingUI(); // manually show



const scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);

scene.environmentTexture = null;
scene.environmentIntensity = 0;


const coneMaterial = new BABYLON.StandardMaterial("sharedConeMaterial", scene);
coneMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);       // Red color
coneMaterial.alpha = 0.5;                                     // Half transparent
coneMaterial.emissiveColor = new BABYLON.Color3(1, 0, 0);     // Glowing red
coneMaterial.specularColor = new BABYLON.Color3(0, 0, 0);     // No reflections
coneMaterial.backFaceCulling = false;                         // Render both sides of the cone



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
        camera.minZ = 0.01;

        this.scene = scene;
        this.input = new InputController();
        this.phi = 0;
        this.theta = 0;
        this.speed = 0.015;
        this.velocity = new BABYLON.Vector3();
        this.bobbingSpeed = 14;
        this.bobbingAmount = 0.03;
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

let currentRoom = null; // Global variable to store the current room's JSON

const camera = new BABYLON.UniversalCamera("fpsCamera", new BABYLON.Vector3(0, 1.7, 0), scene);
camera.attachControl(canvas, false);
camera.speed = 0;
camera.inputs.clear();

let brightnessFirstRoom = 7;
let overallBrightness = 0.05;

const light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 0, 0), scene);
light.diffuse = new BABYLON.Color3(1, 1, 1);
light.specular = new BABYLON.Color3(1, 0, 0);
light.groundColor = new BABYLON.Color3(0, 0, 0);
light.intensity = overallBrightness;

let currentlightPosition;

loadRoom("room2"); // Load the initial room


function reloadLights(){
    scene.lights.forEach(light => {
        light.dispose();
    })
    currentRoom.lights.forEach((z, index) => {

        currentlightPosition = currentRoom.lights[index].position;

        const light = new BABYLON.PointLight(`redPointLight_${index}`, new BABYLON.Vector3(currentlightPosition.x, currentlightPosition.y, currentlightPosition.z), scene);
        light.diffuse = new BABYLON.Color3(1, 0, 0);
        light.specular = new BABYLON.Color3(1, 0, 0);
        light.intensity = brightnessFirstRoom;
    });
}




// Create the default rendering pipeline
const pipeline = new BABYLON.DefaultRenderingPipeline(
    "defaultPipeline",
    true, // Enable HDR
    scene,
    [camera] // Attach to camera
);

// Enable Depth of Field
pipeline.depthOfFieldEnabled = true;
pipeline.depthOfField.focalLength = 10;
pipeline.depthOfField.focusDistance = 600;
pipeline.depthOfField.fStop = 1.4;
pipeline.depthOfField.blurLevel = BABYLON.DepthOfFieldEffectBlurLevel.High;

// Enable Vignette
pipeline.imageProcessingEnabled = true;
pipeline.imageProcessing.vignetteEnabled = true;
pipeline.imageProcessing.vignetteWeight = 9;
pipeline.imageProcessing.vignetteColor = new BABYLON.Color4(0, 0, 0, 1);
pipeline.imageProcessing.vignetteBlendMode = BABYLON.ImageProcessingConfiguration.VIGNETTEMODE_MULTIPLY;

// Enable FXAA Anti-Aliasing
pipeline.fxaaEnabled = true;

// Enable Grain
pipeline.grainEnabled = true;
pipeline.grain.intensity = 1.0;

// Enable MSAA (Multisample Anti-Aliasing)
pipeline.samples = 16;

// Enable Edge Blur (use DOF with appropriate settings)
pipeline.depthOfField.edgeBlur = 1; // 0 to 1, higher means stronger blur at edges

// Enable Chromatic Aberration
pipeline.chromaticAberrationEnabled = true;
pipeline.chromaticAberration.aberrationAmount = 100; // Higher = more distortion
pipeline.chromaticAberration.radialIntensity = 50.0;


// Optionally add some blur noise manually
// (Babylon doesn't have a direct setting called 'blur_noise', but you can simulate it with DOF + grain)
pipeline.depthOfField.blurLevel = BABYLON.DepthOfFieldEffectBlurLevel.High;
pipeline.grain.intensity = 90;


// Pointer lock
canvas.addEventListener("click", () => {
    canvas.requestPointerLock();
});

// Resize
window.addEventListener("resize", () => {
    engine.resize();
});

const fpsCamera = new FirstPersonCamera(camera, scene);

// Coordinates display
const coordinatesDiv = document.getElementById("coordinates");
const actionDiv = document.getElementById("action");
const gameOverlay = document.getElementById("gameOverlay");

// Main render loop
let previousTime = performance.now();

// Proximity detection and interaction logic
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


let currentWalls = [
    { axis: "x", distance: -2.5},  // Left wall
    { axis: "x", distance: 2.5}, // Right wall
    { axis: "z", distance: -3.8 }, // Top wall
    { axis: "z", distance: 3.4 }]; // Store the current room's walls

let gate1 = false;
let gate2 = false;

function checkCollision(playerPosition, nextPosition) {
    if (currentRoom.id === "room2") {
        gate1 = playerPosition.z >= 8;
        gate2 = playerPosition.x <= -2;

        if(gate1 === false && gate2 === false || gate1 === false && gate2 === true){

            for (const wall of currentRoom.wallset1) {
                if (wall.axis === "x") {
                    if (Math.abs(nextPosition.x - wall.distance) < 0.5) {
                        return true;
                    }
                } else if (wall.axis === "z") {
                    if (Math.abs(nextPosition.z - wall.distance) < 0.5) {
                        return true;
                    }
                }
            }
            return false;
        }else if (gate2 === false && gate1 === true){
            for (const wall of currentRoom.wallset2) {
                if (wall.axis === "x") {
                    if (Math.abs(nextPosition.x - wall.distance) < 0.5) {
                        return true;
                    }
                } else if (wall.axis === "z") {
                    if (Math.abs(nextPosition.z - wall.distance) < 0.5) {
                        return true;
                    }
                }
            }
            return false;
        }else if (gate2 === true && gate1 === true){

            for (const wall of currentRoom.wallset3) {
                if (wall.axis === "x") {
                    if (Math.abs(nextPosition.x - wall.distance) < 0.5) {
                        return true;
                    }
                } else if (wall.axis === "z") {
                    if (Math.abs(nextPosition.z - wall.distance) < 0.5) {
                        return true;
                    }
                }
            }
            return false;
        }




    }else{
        for (const wall of currentWalls) {
            if (wall.axis === "x") {
                if (Math.abs(nextPosition.x - wall.distance) < 0.5) {
                    return true;
                }
            } else if (wall.axis === "z") {
                if (Math.abs(nextPosition.z - wall.distance) < 0.5) {
                    return true;
                }
            }
        }
        return false;
    }

    for (const wall of currentWalls) {
        if (wall.axis === "x") {
            if (Math.abs(nextPosition.x - wall.distance) < 0.5) {
                return true;
            }
        } else if (wall.axis === "z") {
            if (Math.abs(nextPosition.z - wall.distance) < 0.5) {
                return true;
            }
        }
    }
    return false;
}

const ray = new BABYLON.Ray();
const rayHelper = new BABYLON.RayHelper(ray);

engine.runRenderLoop(() => {
    const currentTime = performance.now();
    const deltaTime = (currentTime - previousTime) / 1000;
    previousTime = currentTime;

    fpsCamera.update(deltaTime);

    if (coordinatesDiv) {
        const playerPosition = camera.position;
        coordinatesDiv.innerText = `X: ${playerPosition.x.toFixed(2)}, Z: ${playerPosition.z.toFixed(2)}`;

        // Raycasting logic
        const forward = camera.getForwardRay();
        ray.origin = forward.origin;
        ray.direction = forward.direction;

        const hit = scene.pickWithRay(ray);
        if (hit.pickedMesh) {
            coordinatesDiv.innerText += `, Looking at Mesh ID: ${hit.pickedMesh.uniqueId}`;
        } else {
            coordinatesDiv.innerText += `, Looking at: None`;
        }
    }

    scene.render();
});

engine.runRenderLoop(() => {
    const currentTime = performance.now();
    const deltaTime = (currentTime - previousTime) / 1000;
    previousTime = currentTime;

    fpsCamera.update(deltaTime);

    if (coordinatesDiv) {
        const playerPosition = camera.position;

        // Raycasting logic
        const forward = camera.getForwardRay();
        ray.origin = forward.origin;
        ray.direction = forward.direction;

        const hit = scene.pickWithRay(ray);
        let lookingAt = "Looking at: None";
        let distanceToMesh = "Distance: N/A";

        if (hit.pickedMesh) {
            lookingAt = `Looking at Mesh ID: ${hit.pickedMesh.uniqueId}`;
            distanceToMesh = `Distance: ${BABYLON.Vector3.Distance(playerPosition, hit.pickedPoint).toFixed(2)}`;

            // Check if the object is in roomData and within distance
            const distance = BABYLON.Vector3.Distance(playerPosition, hit.pickedPoint);
            if (distance < 1.8) {
                let actionFound = false; // Track if an action is found
                for (const room of roomData.rooms) {
                    if (room.actions) { // Check if the room has actions
                        const action = room.actions.find(a => a.id === hit.pickedMesh.uniqueId);
                        if (action) {
                            actionDiv.style.display = "flex";
                            actionDiv.innerHTML = `<div id="ESign">E</div>${action.output}`;
                            actionFound = true;


                            document.addEventListener("keydown", handleKeyDown);

                            function handleKeyDown(e) {
                                if (e.key === "e" || e.key === "E") {
                                    const forward = camera.getForwardRay();
                                    const hit = scene.pickWithRay(forward);

                                    if (hit.pickedMesh) {
                                        const pickedId = hit.pickedMesh.uniqueId;

                                        for (const room of roomData.rooms) {
                                            if (room.actions) {
                                                const action = room.actions.find(a => a.id === pickedId);

                                                if (action) {
                                                    switch (action.name) {
                                                        case "Paper":
                                                            gameOverlay.style.display = "flex";
                                                            gameOverlay.innerHTML = `<img src="${action.image}" alt="${action.name}" style="height: 80vh" />`;
                                                            break;

                                                        case "Door":
                                                            loadRoom(action.goal);
                                                            break;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

// Close the popup when clicking on it
                            gameOverlay.addEventListener("click", () => {
                                gameOverlay.style.display = "none";
                                gameOverlay.innerHTML = "";
                            });

// Close the popup when clicking outside or pressing a key
                            gameOverlay.addEventListener("click", () => {
                                gameOverlay.style.display = "none";
                                gameOverlay.innerHTML = "";
                            });

                            break;
                        }
                    }
                }
                if (!actionFound) {
                    actionDiv.style.display = "none"; // Hide if no matching action is found
                }
            } else {
                actionDiv.style.display = "none"; // Hide if distance is greater than 1.8
            }
        } else {
            actionDiv.style.display = "none";
        }

        // Update coordinates div
        coordinatesDiv.innerText = `X: ${playerPosition.x.toFixed(2)}, Z: ${playerPosition.z.toFixed(2)}, ${lookingAt}, ${distanceToMesh}`;
    }

    checkPlayerDeath(); // Check for player death



    scene.render();
});



function loadRoom(roomId) {
    // Find the room by ID in roomData
    const room = roomData.rooms.find(r => r.id === roomId);

    if (!room) {
        console.error(`Room with ID ${roomId} not found.`);
        return;
    }

    currentRoom = room; // Update the global variable with the current room's JSON

    if (!room.model) {
        console.error(`No model defined for room with ID ${roomId}.`);
        return;
    }

    // Remove all current meshes from the scene
    scene.meshes.forEach(mesh => {
        if (mesh.name !== "fpsCamera") {
            mesh.dispose();
        }
    });

    scene.lights.forEach(light => {
            light.dispose();
    })
    if(currentRoom.id === "room2") {
        loadCones();
    }else{
        console.error("No cones :(");
        console.error(currentRoom);
    }

    reloadLights();

    // Set camera position if the room has a position attribute
    if (room.position) {
        camera.position = new BABYLON.Vector3(room.position.x, room.position.y, room.position.z);
        console.error(`Camera position set to: ${camera.position}`);
    }

    // Load the model for the room
    BABYLON.SceneLoader.Append("./../3d_assets/", room.model, scene, function () {
        console.log(`Model ${room.model} for room ${roomId} loaded.`);

        // Update wall collision data
        updateCollisions(room.walls);

    });
}


function loadCones(){
    currentRoom.cones.forEach((data, index) => {
        const cone = BABYLON.MeshBuilder.CreateCylinder(`cone_${index}`, {
            diameterTop: 0,
            diameterBottom: data.radius,
            height: data.height,
            tessellation: 32
        }, scene);

        console.error("cone set");

        cone.position.set(data.position.x, data.position.y, data.position.z);
        cone.rotation.set(data.rotation.x, data.rotation.y, data.rotation.z);
        cone.material = coneMaterial;
    });

}




function updateCollisions(walls) {
    // Clear existing collision data
    currentWalls = [];

    // Add new wall collision data
    walls.forEach(wall => {
        currentWalls.push(wall);
    });

    console.log("Collision data updated:", currentWalls);
}


function handleDeath() {
    console.error("Player has died!");
    let deathScreen = document.getElementById("deathScreen");
    deathScreen.style.display = "flex";

    // Exit pointer lock to make the cursor visible
    if (document.pointerLockElement) {
        document.exitPointerLock();
    }
}

function checkPlayerDeath() {
    const ray = new BABYLON.Ray(
        camera.position, // Origin of the ray (camera position)
        new BABYLON.Vector3(0, -1, 0), // Direction of the ray (downward)
        1.7 // Length of the ray (adjust based on player height)
    );

    const hit = scene.pickWithRay(ray);

    if (hit.pickedMesh && hit.pickedMesh.name.startsWith("cone_")) {
        handleDeath();
    }
}



// Add this in `game.js`
function restart() {
    location.reload();
}

// Attach the function to the global `window` object
window.restart = restart;
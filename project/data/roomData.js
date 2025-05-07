const roomData = {
    rooms: [
        {
            id: "room1",
            walls: [
                { axis: "x", distance: -2.5},  // Left wall
                { axis: "x", distance: 2.5}, // Right wall
                { axis: "z", distance: -3.8 }, // Top wall
                { axis: "z", distance: 3.4 }  // Bottom wall
            ],
            actions: [
                {name : "Paper", id: 404, output: "Look at", image: "./../assets/images/FirstMessage.png"},
                {name : "Door", id: 32, output: "open", goal: "room2"},
                {name : "Door", id: 34, output: "open",goal: "room2"}
            ],
            lights: [
                {position: { x: 2.8, y: 3.3, z: -2.7 }, color: [0.8, 0.8, 0.8], intensity: 1},
                {position: { x: 2.8, y: 3.3, z: -0.5 }, color: [0.8, 0.8, 0.8], intensity: 1},
                {position: { x: 2.8, y: 3.3, z: 1.5 }, color: [0.8, 0.8, 0.8], intensity: 1},
                {position: { x: 2.8, y: 3.3, z: 3.5 }, color: [0.8, 0.8, 0.8], intensity: 1}
            ],

            model: "./../3d_assets/room1V1.glb"
        },
        {
            id: "room2",
            wallset1: [
                { axis: "x", distance: -3},  // Left wall
                { axis: "x", distance: 3}, // Right wall
                { axis: "z", distance: -3.8 }, // Top wall
                { axis: "z", distance: 14 }  // Bottom wall
            ],
            wallset2: [
                { axis: "x", distance: 3},  // Left wall
                { axis: "x", distance: -14}, // Right wall
                { axis: "z", distance: -3.8 }, // Top wall
                { axis: "z", distance: 14 }  // Bottom wall
            ],
            wallset3: [
                { axis: "x", distance: -21},  // Left wall
                { axis: "x", distance: 3}, // Right wall
                { axis: "z", distance: 8 }, // Top wall
                { axis: "z", distance: 14 }  // Bottom wall
            ],
            actions: [
                {name: "Door", id: 316, output: "open", goal: "room3",},
                {name: "Door", id: 318, output: "open", goal: "room3",},
            ],
            cones:[
                {position: { x: 0.75, y: 0, z: 0.7 }, rotation: { x :0, y: 0, z: -0.5}, height: 10, radius: 5 },
                {position: { x: -0.75, y: 0, z: 6 }, rotation: { x :0, y: 0, z: 0.5}, height: 10, radius: 5 },
                {position: { x: -8.5, y: -0.2, z: 12.3 }, rotation: { x :0.4, y: 0, z: 0}, height: 10, radius: 6 },
                {position: { x: -8.5, y: -0.2, z: 10.2 }, rotation: { x :-0.4, y: 0, z: 0}, height: 10, radius: 6 },
            ],
            lights: [
                //first wall
                {position: { x: 2.8, y: 3.3, z: -2.7 }, color: [0.8, 0.8, 0.8], intensity: 1},
                {position: { x: 2.8, y: 3.3, z: -0.5 }, color: [0.8, 0.8, 0.8], intensity: 1},
                {position: { x: 2.8, y: 3.3, z: 1.5 }, color: [0.8, 0.8, 0.8], intensity: 1},
                {position: { x: 2.8, y: 3.3, z: 3.5 }, color: [0.8, 0.8, 0.8], intensity: 1},
                {position: { x: 2.8, y: 3.3, z: 6.8 }, color: [0.8, 0.8, 0.8], intensity: 1},
                {position: { x: 2.8, y: 3.3, z: 9.9 }, color: [0.8, 0.8, 0.8], intensity: 1},
                {position: { x: 2.8, y: 3.3, z: 12.9 }, color: [0.8, 0.8, 0.8], intensity: 1},
                //second wall
                {position: { x: 2, y: 3.3, z: 13.99 }, color: [0.8, 0.8, 0.8], intensity: 1},
                {position: { x: -1, y: 3.3, z: 13.99 }, color: [0.8, 0.8, 0.8], intensity: 1},
                {position: { x: -3.7, y: 3.3, z: 13.99 }, color: [0.8, 0.8, 0.8], intensity: 1},
            ],
            model: "./../3d_assets/room2V1.glb",
            audio: {
                narrator: "./../assets/audio/Narrator/room2.wav"
            },
            position: { x: 0, y: 1.7, z: -2.2}
        },
        {
            id: "room3",
            walls: [
                { axis: "x", distance: -5.5},  // Left wall
                { axis: "x", distance: 5.5}, // Right wall
                { axis: "z", distance: -5.5}, // Top wall
                { axis: "z", distance: 5.5}  // Bottom wall
            ],
            actions: [
                {name: "Door", id: 739, output: "open", goal: "room2",},
            ],
            lights: [
                {position: {x: 0, y: 2, z: 1.5}, color: [0.8, 0.8, 0.8], intensity: 1},
            ],

            model: "./../3d_assets/room3V1.glb",
            position: { x: 0, y: 1.7, z: -3.8}
        }

    ]
};

export default roomData;
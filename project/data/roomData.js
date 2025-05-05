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
                {name : "Paper", id: 409, output: "Look at", image: "./../assets/images/FirstMessage.png"},
                {name : "Door", id: 39, output: "open", goal: "room2"},
                {name : "Door", id: 37, output: "open",goal: "room2"}
            ],
            lights: [
                { name: "redPointLight1", position: [2.8, 3.3, -2.7] },
                { name: "redPointLight2", position: [2.8, 3.3, -0.5] },
                { name: "redPointLight3", position: [2.8, 3.3, 1.5] },
                { name: "redPointLight4", position: [2.8, 3.3, 3.5] },

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
                {name: "Door", id: 714, output: "open", goal: "room3",},
            ],
            model: "./../3d_assets/room2V1.glb",
            position: { x: 0, y: 0, z: -2.5}
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

            model: "./../3d_assets/room3V1.glb",
            position: { x: 0, y: 0, z: -3.8}
        }

    ]
};

export default roomData;
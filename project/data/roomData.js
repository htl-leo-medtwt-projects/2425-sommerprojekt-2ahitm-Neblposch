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

            model: "./../3d_assets/room3V1.glb"
        },
        {
            id: "room2",
            walls: [
                { axis: "x", distance: -3},  // Left wall
                { axis: "x", distance: 3}, // Right wall
                { axis: "z", distance: -3.8 }, // Top wall
                { axis: "z", distance: 14 }  // Bottom wall
            ],
            actions: [
                {name: "Door", id: 436, output: "open", goal: "room1",},
            ],
            model: "./../3d_assets/room2V1.glb"
        },
        {
            id: "room3",
            walls: [
                { axis: "x", distance: -3},  // Left wall
                { axis: "x", distance: 3}, // Right wall
                { axis: "z", distance: -3.8 }, // Top wall
                { axis: "z", distance: 14 }  // Bottom wall
            ],
            model: "./../3d_assets/room3V1.glb"
        }

    ]
};

export default roomData;
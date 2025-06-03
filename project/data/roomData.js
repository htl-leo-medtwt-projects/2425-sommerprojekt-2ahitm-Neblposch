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
                {name : "Paper", id: 405, output: "Look at", image: "./../assets/images/FirstMessage.png"},
                {name : "Door", id: 33, output: "open", goal: "Hallway1"},
                {name : "Door", id: 35, output: "open",goal: "Hallway1"}
            ],
            lights: [
                {position: { x: 2.8, y: 3.3, z: -2.7 }, color: [0.8, 0.8, 0.8], intensity: 1},
                {position: { x: 2.8, y: 3.3, z: -0.5 }, color: [0.8, 0.8, 0.8], intensity: 1},
                {position: { x: 2.8, y: 3.3, z: 1.5 }, color: [0.8, 0.8, 0.8], intensity: 1},
                {position: { x: 2.8, y: 3.3, z: 3.5 }, color: [0.8, 0.8, 0.8], intensity: 1}
            ],
            audio: {
                Narrator: "./../assets/audio/Narrator/room1.wav",
                NarratorTiming: [
                    {start: 0, end: 8},
                    {start: 7, end: 14.5},
                    {start: 14, end: 21},
                    {start: 20.8, end: 27},
                    {start: 26, end: 35}
                ]
            },

            model: "./../3d_assets/room1V2.glb"
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
                {name: "Door", id: 793, output: "open", goal: "Hallway2",},
                {name: "Door", id: 795, output: "open", goal: "Hallway2",},
                {name: "Switch", id: 804, output: "Deactivate"},
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
                //{position: { x: 2, y: 3.3, z: 13.99 }, color: [0.8, 0.8, 0.8], intensity: 1},
                //{position: { x: -1, y: 3.3, z: 13.99 }, color: [0.8, 0.8, 0.8], intensity: 1},
                //{position: { x: -3.7, y: 3.3, z: 13.99 }, color: [0.8, 0.8, 0.8], intensity: 1},
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
                {name: "Door", id: 9999, output: "open", goal: "Hallway3",},
                {name: "Door", id: 9998, output: "open", goal: "Hallway3",}
            ],
            PreasurePlates: [
                {id: 925, type: false},
                {id: 915, type: true},
                {id: 919, type: false},
                {id: 921, type: false},
                {id: 923, type: false},
            ],
            lights: [

                {position: { x: 2, y: 1, z: 4 }, color: [0.8, 0.8, 0.8], intensity: 1},
                {position: { x: 4, y: 1, z: 4 }, color: [0.8, 0.8, 0.8], intensity: 1},
                {position: { x: -2, y: 1, z: 4 }, color: [0.8, 0.8, 0.8], intensity: 1},
                {position: { x: -4, y: 1, z: 4 }, color: [0.8, 0.8, 0.8], intensity: 1},
                {position: { x: 0, y: 1, z: 4 }, color: [0.8, 0.8, 0.8], intensity: 1},
            ],

            model: "./../3d_assets/room3V2.glb",
            position: { x: 0, y: 1.7, z: -3.8}
        },
        {
            id: "room4",
            walls: [
                { axis: "x", distance: -5.5},  // Left wall
                { axis: "x", distance: 5.5}, // Right wall
                { axis: "z", distance: -5.5}, // Top wall
                { axis: "z", distance: 5.5}  // Bottom wall
            ],
            actions: [
                {name: "Door", id: 9997, output: "open", goal: "room5",},
                {name: "Door", id: 9996, output: "open", goal: "room5",},
                {name: "Terminal", id: 1258, output: "use"},
                {name : "Paper", id: 1224, output: "Look at", image: "./../assets/images/newspaper.png"}
            ],
            lights: [
            ],

            model: "./../3d_assets/Room4V2.glb",
            position: { x: 0, y: 1.7, z: -3.8}
        },

        {
            id: "room5",
            walls: [
                { axis: "x", distance: -10.5},  // Left wall
                { axis: "x", distance: 0}, // Right wall
                { axis: "z", distance: -3.3}, // Top wall
                { axis: "z", distance: 3.3}  // Bottom wall
            ],
            actions: [
                {name: "Elevator", id: 1311, output: "use"},
                {name: "Elevator", id: 1315, output: "use"},
            ],
            lights: [
                {position: { x: -3, y: 2, z: 1 }, color: [0.8, 0.8, 0.8], intensity: 1}
            ],

            model: "./../3d_assets/ElevatorRoomV1.glb",
            position: { x: -9, y: 1.7, z: 0}
        },

        {
            id: "Hallway1",
            walls: [
                { axis: "x", distance: -2},  // Left wall
                { axis: "x", distance: 2}, // Right wall
                { axis: "z", distance: -8}, // Top wall
                { axis: "z", distance: 54}  // Bottom wall
            ],
            actions: [
                {name : "Door", id: 435, output: "open", goal: "room2"},
                {name : "Door", id: 437, output: "open",goal: "room2"}
            ],
            lights: [
                {position: { x: 1.6, y: 3.3, z: 47.4 }, color: [0.8, 0.8, 0.8], intensity: 1},
                {position: { x: 1.6, y: 3.3, z: 31.2 }, color: [0.8, 0.8, 0.8], intensity: 1},
                {position: { x: 1.6, y: 3.3, z: 16.6 }, color: [0.8, 0.8, 0.8], intensity: 1},
                {position: { x: 1.6, y: 3.3, z: 1.6}, color: [0.8, 0.8, 0.8], intensity: 1},
            ],
            audio: {
                Narrator: "./../assets/audio/Narrator/GameAudio_mixdown.mp3",
            },


            model: "./../3d_assets/HallwayV1.glb",
            position: { x: 0, y: 1.7, z: 40}
        },

        {
            id: "Hallway2",
            walls: [
                { axis: "x", distance: -2},  // Left wall
                { axis: "x", distance: 2}, // Right wall
                { axis: "z", distance: -8}, // Top wall
                { axis: "z", distance: 54}  // Bottom wall
            ],
            actions: [
                {name : "Door", id: 837, output: "open", goal: "room3"},
                {name : "Door", id: 839, output: "open",goal: "room3"}
            ],
            lights: [
                {position: { x: 1.6, y: 3.3, z: 47.4 }, color: [0.8, 0.8, 0.8], intensity: 1},
                {position: { x: 1.6, y: 3.3, z: 31.2 }, color: [0.8, 0.8, 0.8], intensity: 1},
                {position: { x: 1.6, y: 3.3, z: 16.6 }, color: [0.8, 0.8, 0.8], intensity: 1},
                {position: { x: 1.6, y: 3.3, z: 1.6}, color: [0.8, 0.8, 0.8], intensity: 1},
            ],
            audio: {
                Narrator: "./../assets/audio/Narrator/GameAudio_mixdown.mp3",
            },


            model: "./../3d_assets/HallwayV1.glb",
            position: { x: 0, y: 1.7, z: 50}
        },

        {
            id: "Hallway3",
            walls: [
                { axis: "x", distance: -2},  // Left wall
                { axis: "x", distance: 2}, // Right wall
                { axis: "z", distance: -8}, // Top wall
                { axis: "z", distance: 54}  // Bottom wall
            ],
            actions: [
                {name : "Door", id: 969, output: "open", goal: "room4"},
                {name : "Door", id: 971, output: "open",goal: "room4"}
            ],
            lights: [
                {position: { x: 1.6, y: 3.3, z: 47.4 }, color: [0.8, 0.8, 0.8], intensity: 1},
                {position: { x: 1.6, y: 3.3, z: 31.2 }, color: [0.8, 0.8, 0.8], intensity: 1},
                {position: { x: 1.6, y: 3.3, z: 16.6 }, color: [0.8, 0.8, 0.8], intensity: 1},
                {position: { x: 1.6, y: 3.3, z: 1.6}, color: [0.8, 0.8, 0.8], intensity: 1},
            ],
            audio: {
                Narrator: "./../assets/audio/Narrator/GameAudio_mixdown.mp3",
            },


            model: "./../3d_assets/HallwayV1.glb",
            position: { x: 0, y: 1.7, z: 50}
        },

    ]
};


export default roomData;
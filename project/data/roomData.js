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
                {name : "Paper", id: 409, output: "Look at"},
                {name : "Door", id: 39, output: "open"},
                {name : "Door", id: 37, output: "open"}
            ]
        },
        {
            id: "room2",
            walls: [
                { axis: "x", distance: 10 }, // Left wall
                { axis: "x", distance: 15 }, // Right wall
                { axis: "z", distance: 10 }, // Top wall
                { axis: "z", distance: 15 }  // Bottom wall
            ]
        }
    ]
};

export default roomData;
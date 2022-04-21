let [flopActivated, turnActivated, riverActivated] = [false, false, false];

function toggleFlop() {
    let button = document.getElementById("flop-button");
    let div = document.getElementById("flop");
    if (!flopActivated) {
        button.style.borderStyle = "inset";
    } else {
        if (turnActivated) {
            toggleTurn();
        }
        button.style.borderStyle = "";
    }
    
    flopActivated = !flopActivated;
    div.hidden = !div.hidden;
    document.getElementById("turn-button").hidden = !document.getElementById("turn-button").hidden;
}

function toggleTurn() {
    let button = document.getElementById("turn-button");
    let div = document.getElementById("turn");
    if (!turnActivated) {
        button.style.borderStyle = "inset";
    } else {
        if (riverActivated) {
            toggleRiver();
        }
        button.style.borderStyle = "";
    }
    
    turnActivated = !turnActivated;
    div.hidden = !div.hidden;
    document.getElementById("river-button").hidden = !document.getElementById("river-button").hidden;
}

function toggleRiver() {
    let button = document.getElementById("river-button");
    let div = document.getElementById("river");
    if (!riverActivated) {
        button.style.borderStyle = "inset";
    } else {
        button.style.borderStyle = "";
    }
    
    riverActivated = !riverActivated;
    div.hidden = !div.hidden;
}

function sendRequest() {
    document.getElementById("results").hidden = false;
    document.getElementById("json").innerHTML = "calculating...";

    let pocket = [];
    for (let i = 1; i <= 2; i++) {
        let val = document.getElementById(`pocket-val-${i}`).value;
        let suit = document.getElementById(`pocket-suit-${i}`).value;
        pocket.push(val+suit);
    }

    let shared = [];
    if (flopActivated) {
        for (let i = 1; i <= 3; i++) {
            let val = document.getElementById(`flop-val-${i}`).value;
            let suit = document.getElementById(`flop-suit-${i}`).value;
            shared.push(val+suit);
        }
    }
    if (turnActivated) {
        let val = document.getElementById(`turn-val-${i}`).value;
        let suit = document.getElementById(`turn-suit-${i}`).value;
        shared.push(val+suit);
    }
    if (riverActivated) {
        let val = document.getElementById(`river-val-${i}`).value;
        let suit = document.getElementById(`river-suit-${i}`).value;
        shared.push(val+suit);
    }
    
    fetch('/api/?hand=' + pocket.join('-') + '&shared=' + shared.join('-') + `&count=${7}`)
    .then(res => {
        res.json().then(data => {
            document.getElementById("json").innerHTML = JSON.stringify(data, null, 4);
        })
    })
}
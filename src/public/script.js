let hand = [];
let shared = [];
let handCount = 7
let results = {};

function onChangeCardCount() {
    handCount = parseInt(document.getElementById("game").value);
    updateView();
}

function onChange(index, type) {
    let arr = Array();
    switch (type) {
        case 'shared':
            arr = shared;
            break;
        default:
            arr = hand;
            break;
    }

    let newHand = document.getElementById(type + 'rank' + index).value;
    newHand += document.getElementById(type + 'suit' + index).value;
    arr[index] = newHand;
}

function cardHtml(index, type='hand') {
    let arr = Array();
    let removeFuncName = '';
    switch (type) {
        case 'shared':
            arr = shared;
            removeFuncName = 'removeShared';
            break;
        default:
            arr = hand;
            removeFuncName = 'removeCard';
            break;
    }

    return `
        <div id="${type}card${index}>
            <label for="${type}rank${index}">Card ${index + 1}</label>
            <select onchange="onChange(${index}, '${type}')" name="${type}rank${index}" id="${type}rank${index}">
                <option ${arr[index][0] === 'A' ? 'selected' : ''} value="A">A</option>
                <option ${arr[index][0] === '2' ? 'selected' : ''} value="2">2</option>
                <option ${arr[index][0] === '3' ? 'selected' : ''} value="3">3</option>
                <option ${arr[index][0] === '4' ? 'selected' : ''} value="4">4</option>
                <option ${arr[index][0] === '5' ? 'selected' : ''} value="5">5</option>
                <option ${arr[index][0] === '6' ? 'selected' : ''} value="6">6</option>
                <option ${arr[index][0] === '7' ? 'selected' : ''} value="7">7</option>
                <option ${arr[index][0] === '8' ? 'selected' : ''} value="8">8</option>
                <option ${arr[index][0] === '9' ? 'selected' : ''} value="9">9</option>
                <option ${arr[index][0] === '10' ? 'selected' : ''} value="10">10</option>
                <option ${arr[index][0] === 'J' ? 'selected' : ''} value="J">J</option>
                <option ${arr[index][0] === 'Q' ? 'selected' : ''} value="Q">Q</option>
                <option ${arr[index][0] === 'K' ? 'selected' : ''} value="K">K</option>
            </select>
            <select onchange="onChange(${index}, '${type}')" name="${type}suit${index}" id="${type}suit${index}">
                <option ${arr[index][1] === 'c' ? 'selected' : ''} value="c">&clubs;</option>
                <option ${arr[index][1] === 'd' ? 'selected' : ''} value="d">&diams;</option>
                <option ${arr[index][1] === 'h' ? 'selected' : ''} value="h">&hearts;</option>
                <option ${arr[index][1] === 's' ? 'selected' : ''} value="s">&spades;</option>
            </select>
            <button onclick="${removeFuncName}(${index})" type="button">X</button>
        </div>
    `;
}

function updateView() {
    paint();
}

function paint() {
    paintCards();
    paintResults();
    paintShared();
    setHiddens();
}

function setHiddens() {
    document.getElementById('calculate').hidden = hand.length === 0;
    document.getElementById("results").hidden = Object.keys(results).length === 0;
}

function paintShared() {
    let html = '';
    for (i = 0; i < shared.length; i++) {
        html += cardHtml(i, 'shared');
    }
    document.getElementById('shared').innerHTML = html;
}

function paintCards() {
    let html = '';
    for (i = 0; i < hand.length; i++) {
        html += cardHtml(i, 'hand');
    }
    document.getElementById('cards').innerHTML = html;
}

function paintResults() {
    document.getElementById("json").innerHTML = JSON.stringify(results, null, 4);
}

function addCard() {
    hand.push('As');
    if (hand.length > handCount - shared.length) {
        hand = hand.slice(0, handCount - shared.length);
    }
    updateView();
}

function addShared() {
    shared.push('As');
    if (shared.length > handCount - hand.length) {
        shared = shared.slice(0, handCount - hand.length);
    }
    updateView();
}

function removeCard(index) {
    hand.splice(index, 1);
    updateView();
}

function removeShared(index) {
    shared.splice(index, 1);
    updateView();
}

function sendRequest() {
    results = "calculating...";
    updateView();
    fetch('/api/?hand=' + hand.join('-') + '&shared=' + shared.join('-') + `&count=${handCount}`)
    .then(res => {
        res.json().then(data => {
            results = data;
            updateView();
        })
    })
}
function add(a, b) {
    return a+b;
}

function subtract(a, b) {
    return a-b;
}

function multiply(a, b) {
    return a*b;
}

function divide(a, b) {
    return a/b;
}

function operate(a, op, b) {
    if (op === "+") {
        return add(a, b);
    } else if (op === "-") {
        return subtract(a, b);
    } else if (op === "*") {
        return multiply(a, b);
    } else if (op === "/") {
        return divide(a, b);
    } else {
        return null
    }
}

let displayNum = 0
const display = document.querySelector("#display");

// Functionality for number buttons
for (let i=0; i<=9; i++) {
    const button = document.querySelector("#num-"+i)
    button.addEventListener("mouseover", (e) => {
        button.style.backgroundColor = "hsl(0, 0%, 20%)";
    })
    button.addEventListener("mouseout", (e) => {
        button.style.backgroundColor = "hsl(0, 0%, 30%)";
    })
    button.addEventListener("click", () => {
        displayNum = parseInt(displayNum.toString() + i.toString());
        display.textContent = displayNum;
    })
}

// Functionality for the clear button
const clearButton = document.querySelector("#clear");
clearButton.addEventListener("mouseover", (e) => {
    clearButton.style.backgroundColor = "hsl(0, 50%, 40%)";
})
clearButton.addEventListener("mouseout", (e) => {
    clearButton.style.backgroundColor = "hsl(0, 50%, 50%)";
})
clearButton.addEventListener("click", () => {
    displayNum = 0;
    display.textContent = 0;
})
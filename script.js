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
    } else if (op === "×") {
        return multiply(a, b);
    } else if (op === "÷") {
        return divide(a, b);
    } else {
        return op
    }
}

let displayNum = 0;
let firstNum = null;
let op = "";
let secondNum = null;
let lastWasNum = false;

function clipOverflow(n) {
    s = n.toString()
    if (s.length > 11) {
        if (n >= 10**11) {
            return "Overflow";
        } else {
            return s.slice(0, 11);
        }
    } else {
        return n;
    }
}

const display = document.querySelector("#display");

// Number buttons
for (let i=0; i<=9; i++) {
    const button = document.querySelector("#num-"+i)
    button.addEventListener("mouseover", () => {
        button.style.backgroundColor = "hsl(0, 0%, 25%)";
    })
    button.addEventListener("mouseout", () => {
        button.style.backgroundColor = "hsl(0, 0%, 30%)";
    })
    button.addEventListener("click", () => {
        lastWasNum = true;
        if (displayNum.toString().length < 11) {
            displayNum = parseFloat(displayNum.toString() + i.toString());
        }
        display.textContent = clipOverflow(displayNum);
    })
}

// Clear button
const clearButton = document.querySelector("#clear");
clearButton.addEventListener("mouseover", () => {
    clearButton.style.backgroundColor = "hsl(0, 50%, 40%)";
})
clearButton.addEventListener("mouseout", () => {
    clearButton.style.backgroundColor = "hsl(0, 50%, 50%)";
})
clearButton.addEventListener("click", () => {
    displayNum = 0;
    firstNum = null;
    op = null;
    secondNum = null;
    lastWasNum = false;
    display.textContent = 0;
})

// Operator buttons (plus, minus, times, divide)
const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
    button.addEventListener("mouseover", () => {
        button.style.backgroundColor = "hsl(0, 0%, 25%)";
    })
    button.addEventListener("mouseout", () => {
        button.style.backgroundColor = "hsl(0, 0%, 20%)";
    })
    button.addEventListener("click", (e) => {
        console.log(e.target.textContent);
        op = e.target.textContent;
        if (lastWasNum) {
            if (firstNum !== null) {
                // First number is there already
                secondNum = displayNum;
                displayNum = operate(firstNum, op, secondNum);
                display.textContent = clipOverflow(displayNum);
                // Start the next calculation
                firstNum = displayNum;
                secondNum = null;
                displayNum = 0;
            } else {
                // Don't have the first number yet
                firstNum = displayNum;
                displayNum = 0;
            }
        } else {
            // Just change the operation
            displayNum = 0;
            op = e.target.textContent;
        }
        lastWasNum = false;
    })
})

// Equals button
const equalsButton = document.querySelector(".equals");
equalsButton.addEventListener("mouseover", () => {
    equalsButton.style.backgroundColor = "hsl(196, 65%, 40%)";
})
equalsButton.addEventListener("mouseout", () => {
    equalsButton.style.backgroundColor = "hsl(196, 65%, 50%)";
})
equalsButton.addEventListener("click", () => {
    if (firstNum !== null) {
        secondNum = displayNum;
        displayNum = operate(firstNum, op, secondNum);
        display.textContent = clipOverflow(displayNum);
        // Reset the calculation space
        firstNum = null;
        secondNum = null;
        op = "";
    }
})
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

// In case the number is too long
function clipOverflow(n) {
    s = n.toString()
    if (s.length > 11) {
        if (n >= 10**11) {
            // Number has more than 11 digits
            displayNum = 0;
            firstNum = null;
            op = "";
            secondNum = null;
            return "Overflow";
        } else {
            // Number is a decimal that needs to be truncated
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
    lastWasNum = true;
    display.textContent = 0;
})

// Basic operator buttons (plus, minus, times, divide)
const basicOperatorButtons = document.querySelectorAll(".operator.basic");
basicOperatorButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (lastWasNum) {
            if (firstNum !== null) {
                // First number is there already
                secondNum = displayNum;
                displayNum = operate(firstNum, op, secondNum);
                display.textContent = clipOverflow(displayNum);
                // Start the next calculation
                firstNum = displayNum;
                op = e.target.textContent;
                secondNum = null;
                displayNum = 0;
            } else {
                // Don't have the first number yet
                firstNum = displayNum;
                op = e.target.textContent;
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

// Mouseover for all operators
const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
    button.addEventListener("mouseover", () => {
        button.style.backgroundColor = "hsl(0, 0%, 25%)";
    })
    button.addEventListener("mouseout", () => {
        button.style.backgroundColor = "hsl(0, 0%, 20%)";
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
        lastWasNum = true;
        op = "";
    }
})

// Square root
const squareRootButton = document.querySelector("#sqrt");
squareRootButton.addEventListener("click", () => {
    displayNum = Math.sqrt(displayNum);
    display.textContent = clipOverflow(displayNum); 
})

// Percent
const percentButton = document.querySelector("#percent");
percentButton.addEventListener("click", () => {
    displayNum = divide(displayNum, 100);
    display.textContent = clipOverflow(displayNum); 
})

// Plus/Minus
const plusMinusButton = document.querySelector("#pm");
plusMinusButton.addEventListener("click", () => {
    displayNum = -displayNum;
    display.textContent = clipOverflow(displayNum); 
})
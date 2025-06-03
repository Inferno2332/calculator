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
    switch (op) {
        case '+': 
            return add(a, b);
        case '-': 
            return subtract(a, b);
        case '×': 
            return multiply(a, b);
        case '÷': 
            return divide(a, b);
    }
}

let displayValue = "0";
let firstNum = null;
let secondNum = null;
let op = null;
let lastWasEquals = false;
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

function updateDisplay() {
    const roundedVal = parseFloat(parseFloat(displayValue).toFixed(10));
    display.textContent = clipOverflow(roundedVal.toString());
}

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
        // If the last key was "=", reset the display before typing in new digits
        if (lastWasEquals) {
            displayValue = "";
            lastWasEquals = false;
        }
        if (displayValue === "0") {
            // Prevent displaying stuff like 00
            displayValue = i.toString();
        } else {
            displayValue += i.toString();
        }
        lastWasNum = true;
        updateDisplay();
    });
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
    displayValue = "0";
    firstNum = null;
    secondNum = null;
    op = null;
    lastWasEquals = false;
    lastWasNum = false;
    updateDisplay();
});

// Basic operator buttons (plus, minus, times, divide)
const basicOperatorButtons = document.querySelectorAll(".operator.basic");
basicOperatorButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (lastWasEquals) {
            firstNum = parseFloat(displayValue);
            op = null;               
            lastWasEquals = false;
            displayValue = "";      
        } else if (lastWasNum) {
            // If there's an existing operator and a number, do that operation
            if (firstNum !== null && op !== null) {
                secondNum = parseFloat(displayValue);
                firstNum = operate(firstNum, op, secondNum);
                displayValue = firstNum.toString();
                updateDisplay();
            } else {
                // If there's no existing operator, set firstNum
                firstNum = parseFloat(displayValue);
            }
            displayValue = ""; 
        }
        // Add the new operator
        op = e.target.textContent;
        lastWasNum = false;
    });
});

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
    if (firstNum !== null && op !== null && lastWasNum) {
        secondNum = parseFloat(displayValue);
        firstNum = operate(firstNum, op, secondNum);
        displayValue = firstNum.toString();
        updateDisplay();
        lastWasEquals = true;
        lastWasNum = false;
        op = null;
    }
});

// Square root
const squareRootButton = document.querySelector("#sqrt");
squareRootButton.addEventListener("click", () => {
  const num = parseFloat(displayValue);
  if (num < 0) {
    displayValue = "Error";
  } else {
    const result = Math.sqrt(num);
    displayValue = result.toString();
  }
  updateDisplay();
  lastWasEquals = false;
  lastWasNum = true;
});

// Percent
const percentButton = document.querySelector("#percent");
percentButton.addEventListener("click", () => {
    const num = parseFloat(displayValue);
    const result = num / 100;
    displayValue = result.toString();
    updateDisplay();
    lastWasEquals = false;
    lastWasNum = true;
});

// Plus/Minus
const plusMinusButton = document.querySelector("#pm");
plusMinusButton.addEventListener("click", () => {
    const num = parseFloat(displayValue);
    const result = -num;
    displayValue = result.toString();
    updateDisplay();
    lastWasEquals = false;
    lastWasNum = true;
});

// Decimal point
const decimalButton = document.querySelector("#decimal");
decimalButton.addEventListener("click", () => {
    // If the last key was "=", reset first
    if (lastWasEquals) {
        displayValue = "0";
        lastWasEquals = false;
    }
    if (!displayValue.includes(".")) {
        displayValue += (displayValue === "" ? "0." : ".");
    }
    lastWasNum = true;
    updateDisplay();
});
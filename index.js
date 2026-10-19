


const screen = document.getElementById("screen");
const previous = document.getElementById("previous");
const buttons = document.querySelector(".buttons");

let current = "0";
let stored = null;
let operator = null;
let waitingForNumber = false;
let justCalculated = false;

function updateScreen() {
  screen.value = current;
}

 function clearCalculator() {
   current = "0";
   stored = null;
  operator = null;
  waitingForNumber = false;
   justCalculated = false;
   previous.textContent = "";
   updateScreen();
 }

function inputNumber(value) {
  if (justCalculated) {
    current = value === "." ? "0." : value;
    justCalculated = false;
    previous.textContent = "";
    updateScreen();
    return;
  }

  if (waitingForNumber) {
    current = value === "." ? "0." : value;
    waitingForNumber = false;
  } else if (value === ".") {
    if (!current.includes(".")) current += ".";
  } else if (current === "0") {
    current = value;
  } else if (current === "-0") {
    current = "-" + value;
  } else if (current.length < 15) {
    current += value;
  }

  updateScreen();
}

function calculate(a, b, op) {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b === 0 ? null : a / b;
    case "%": return a % b;
    default: return b;
  }
}

function formatResult(number) {
  if (!Number.isFinite(number)) return "Error";
  return String(Number(number.toPrecision(12)));
}

function chooseOperator(nextOperator) {
  const value = Number(current);

  if (!Number.isFinite(value)) {
    clearCalculator();
    current = "Error";
    updateScreen();
    return;
  }

  if (operator && !waitingForNumber) {
    const result = calculate(stored, value, operator);

    if (result === null || !Number.isFinite(result)) {
      current = "Error";
      stored = null;
      operator = null;
      waitingForNumber = true;
      updateScreen();
      return;
    }

    current = formatResult(result);
    stored = Number(current);
  } else {
    stored = value;
  }

  operator = nextOperator;
  waitingForNumber = true;
  justCalculated = false;
  // previous.textContent = ${current} ${operator};
  updateScreen();
}

function showResult() {
  if (operator === null || stored === null) return;

  const first = stored;
  const second = Number(current);
  const op = operator;
  const result = calculate(first, second, op);

  // previous.textContent = ${first} ${op} ${second} =;

  if (result === null || !Number.isFinite(result)) {
    current = "Error";
  } else {
    current = formatResult(result);
  }

  stored = null;
  operator = null;
  waitingForNumber = true;
  justCalculated = true;
  updateScreen();
}

buttons.addEventListener("click", function (event) {
  const button = event.target.closest("button");
  if (!button) return;

  const action = button.dataset.action;
  const value = button.dataset.value;

  if (action === "clear") {
    clearCalculator();
    return;
  }

  if (action === "delete") {
    if (justCalculated || waitingForNumber) return;
    current = current.length > 1
      ? current.slice(0, -1)
      : "0";

    if (current === "-") current = "0";
    updateScreen();
    return;
  }

  if (action === "sign") {
    if (current === "Error") return;
    current = String(Number(current) * -1);
    updateScreen();
    return;
  }

  if (action === "calculate") {
    showResult();
    return;
  }

  //  if (value !== undefined) {
  //  if (current === "Error") clearCalculator();

  //  if ("0123456789.".includes(value) &&
  //      value.length === 1) {
  //      inputNumber(value);
  //    } else if (["+", "-", "*", "/", "%"].includes(value)) {
  //      chooseOperator(value);
  //    }
  //  }
 });

 
updateScreen();














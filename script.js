const result = document.getElementById("result");
const expression = document.getElementById("expression");
const buttons = document.querySelectorAll(".btn");
const clearBtn = document.getElementById("clear");
const equalsBtn = document.getElementById("equals");

let current = "";
let operator = "";
let previous = "";
let shouldReset = false;

document.querySelectorAll(".btn.number").forEach(function(btn) {
  btn.onclick = function() {
    const value = btn.getAttribute("data-value");

    if (shouldReset) {
      current = "";
      shouldReset = false;
    }

    if (value === "." && current.includes(".")) return;

    current += value;
    result.textContent = current;
  };
});

document.querySelectorAll(".btn.operator").forEach(function(btn) {
  btn.onclick = function() {
    const value = btn.getAttribute("data-value");

    if (current === "" && previous === "") return;

    if (current !== "" && previous !== "") {
      calculate();
    }

    operator = value;
    previous = current || result.textContent;
    current = "";

    expression.textContent = previous + " " + btn.textContent;
  };
});

equalsBtn.onclick = function() {
  if (previous === "" || current === "") return;
  calculate();
  operator = "";
  previous = "";
};

function calculate() {
  const a = parseFloat(previous);
  const b = parseFloat(current);
  let answer;

  if (operator === "+") answer = a + b;
  if (operator === "-") answer = a - b;
  if (operator === "*") answer = a * b;
  if (operator === "/") answer = b !== 0 ? a / b : "Error";
  if (operator === "%") answer = a % b;

  result.textContent = answer;
  expression.textContent = previous + " " + operator + " " + current + " =";
  current = String(answer);
  shouldReset = true;
}

clearBtn.onclick = function() {
  current = "";
  operator = "";
  previous = "";
  shouldReset = false;
  result.textContent = "0";
  expression.textContent = "";
};

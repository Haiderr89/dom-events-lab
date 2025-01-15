/*-------------------------------- Constants --------------------------------*/


/*-------------------------------- Variables --------------------------------*/
let currentNumber = ""; // we use to store the current number being input
let previousNumber = ""; // we use also to store as we take it from the current and add it in the previous number for operations
let operator = ""; // Stores the selected operator like + or -

/*------------------------ Cached Element References ------------------------*/
const buttonNumbers = document.querySelectorAll(".button.number");
const buttonOperators = document.querySelectorAll(".button.operator");
const buttonEquals = document.querySelector(".button.equals");
const displayResult = document.querySelector(".display");

// to show at the start of calc the number 0
displayResult.textContent = "0";

/*----------------------------- Event Listeners -----------------------------*/
buttonNumbers.forEach((button) =>
  button.addEventListener("click", handleNumberClick)
);
buttonOperators.forEach((button) =>
  button.addEventListener("click", handleOperatorClick)
);
buttonEquals.addEventListener("click", calculateResult);

/*-------------------------------- Functions --------------------------------*/

// Handle number button clicks
function handleNumberClick(event) {
  const buttonNumb = event.target.innerText;

  if (displayResult.textContent === "0") {
    // Replace default 0 with the clicked number
    displayResult.textContent = buttonNumb;
  } else {
    displayResult.textContent += buttonNumb;
  }
  currentNumber += buttonNumb; // Update the current number
  
}


// Handle operator button clicks
function handleOperatorClick(event) {
  const valueButton = event.target.innerText;

  if (valueButton === "C") {
    // Reset all variables and display
    displayResult.textContent = "0";
    currentNumber = "";
    previousNumber = "";
    operator = "";
    return;
  }



  // save the operator and put the current number in the previous number, then make the current empty for the second number
  if (currentNumber !== "") {
    previousNumber = currentNumber;
    currentNumber = "";
    operator = valueButton;

    
    displayResult.textContent += ` ${valueButton} `;
  }
  displayResult.textContent = "0"; // Clear the display
}



// Handle the "=" button click
function calculateResult() {
  if (previousNumber !== "" && currentNumber !== "" && operator !== "") {
    // it is a way to convert strings to numbers I searched for it outsource
    const num1 = Number(previousNumber);
    const num2 = Number(currentNumber);

    let result;
    if (operator === "+") {
      result = num1 + num2;
    }
    else if (operator === "-") {
      result = num1 - num2;
    }
    else if (operator === "*") {
      result = num1 * num2;
    }
    else if (operator === "/" && num2 !== 0) {
      result =  num1 / num2;
    }
    else if (operator === "/" && num2 === 0) {
      displayResult.textContent = "UNDEFINED";
    }



    // Display and reset variables
    displayResult.textContent = result;
    currentNumber = result.toString(); // make the result as the current to allow if we want to continue making calculations 
    previousNumber = "";
    operator = "";
  }
}

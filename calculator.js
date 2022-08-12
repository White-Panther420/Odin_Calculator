const screen = document.querySelector(".calculator_screen");
const operation = document.querySelector(".operations_text");
const result = document.querySelector(".results_text");
const calc_btns = document.querySelectorAll("button");
const equals_btn = document.querySelector(".equals");
let number1 = 0;
let number2 = 0;
let operator = " ";
let operationChain = ""
//let operationArray = [];
/*const clear_all = document.querySelector(".clear_all");
const clear = document.querySelector(".clear");
const percent = document.querySelector(".percent");
const divide = document.querySelector(".divide");
const seven = document.querySelector(".seven");
const eight = document.querySelector(".eight");
const nine = document.querySelector(".nine");
const plus = document.querySelector(".plus");
const four = document.querySelector(".four");
const five = document.querySelector(".five");
const six = document.querySelector(".six");
const minus = document.querySelector(".minus");
const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
const times = document.querySelector(".timex");
const zero = document.querySelector(".zero");
const decimal = document.querySelector(".decimal");
const equals = document.querySelector(".equals");
*/

calc_btns.forEach(btn => {
    btn.addEventListener('click', ()=>{
        operationChain += btn.innerText;
        operation.textContent = operationChain;
        operationChain.trim();  //Clear all whitespace form string
        console.log("OPERATION CHAIN: " + operationChain);
        //Array that will contain only the operator symbols
        let operators = operationChain.replace(/[0-9]/g, "").split("");
        //Array that will only contain the numbers being operated on
        const operands = operationChain.split(/[\+\/\*\-]/g).filter(n => !!n); //Checking if string has length > 0 then splitting it on operators   
        console.log("1OPERATORS: " + operators);
        console.log("1OPERANDS: " + operands);
        console.log("LENGTH: " + operands.length);
        //If we have an array of more than two numbers, then we need to operate 
        //on the first two, store the result in index 0, remove the number in
        //index 1 (we don't need it anymore) and update the result screen
        if(operands.length >= 2 && operators.length === operands.length)
        {
            operands[0] = operate(+operands[0], +operands[1], operators[0]);
            operands.splice(1,1); //Remove the second element from array
            operators.splice(0,1)
            result.textContent = `${operands[0]}`;
            console.log("OPERANDS[0]: " + operands[0]);
            console.log("OPERANDS AGAIN: " + operands);
            console.log("OPERATORS AGAIN: " + operators);
        }
    });
});

equals_btn.addEventListener("click", () => {
    operands[0] = operate(+operands[0], +operands[1], operators[0]);
    operands.splice(1,1); //Remove the second element from array
    operators.splice(0,1)
    result.textContent = `${operands[0]}`;
});

function operate(num1, num2, operator)
{
    //Go through array and split string by operator?
    if(operator === "+")
    {
        return add(num1, num2);
    }
    else if(operator === "-")
    {
        return subtract(num1, num2);
    }
    else if(operator === "/")
    {
        return divide(num1, num2);
    }
    else if(operator === "*")
    {
        return multiply(num1, num2);
    }
    else if(operator === "%")
    {
        return add(num1, num2);
    }
    else
    {
        return 0;
    }
}

function add(num1, num2)
{   
    return num1 + num2
};

function subtract(num1, num2)
{   
    return num1 - num2
};

function multiply(num1, num2)
{   
    return num1 * num2
};

function divide(num1, num2)
{   
    if(num2 === 0)
    {
        result.textContent = "Error! Haven't you any knowledge of basic Math?!";
    }
    return num1/num2
};

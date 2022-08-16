const screen = document.querySelector(".calculator_screen");
const operationText = document.querySelector(".operations_text");
const result = document.querySelector(".results_text");
const calc_btns = document.querySelectorAll("button");
const equals_btn = document.querySelector(".equals");
const clear_all_btn = document.querySelector(".clear_all");
const backsapce_btn = document.querySelector(".clear");

let number1 = 0;
let number2 = 0;
let operators = "";
let operands = "";
let operationChain = "";

calc_btns.forEach(btn => {
    btn.addEventListener('click', ()=>{
        operationChain += btn.innerText;
        operationText.textContent = operationChain;
        //Array that will contain only the operator symbols
        operators = operationChain.replace(/[0-9.]/g, "").split("");
        console.log("Operators: " + operators);
        console.log("Operands: " + operands);
        //Array that will only contain the numbers being operated on
        operands = operationChain.split(/[\+\/\*\-%]/g).filter(n => !!n); //Checking if string has length > 0 then splitting it on operators   
    });
});

equals_btn.addEventListener("click", () => {
    if(operators.length >= operands.length)  //Ensure user enters correct operation
    {
        result.textContent = "Math Error!";
    }
    else
    {
        //While loop ensures that an operation chain is performed with two numbers at a time
        //until the operand array has one element remaining (the final result)
        while(operands.length !== 1)
        {
            operands[0] = operate(+operands[0], +operands[1], operators[0]);
            operands.splice(1,1); //Remove the second element from array
            operators.shift();
            result.textContent = `${operands[0]}`;
        }
    }
});

clear_all_btn.addEventListener("click", () => {
    operands.splice(0, operands.length);
    operators.splice(0, operators.length);
    operationChain = "";
    result.textContent = "0";
    operationText.textContent = "";
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
        return Math.round(divide(num1, num2) * 1000000000) / 1000000000;
    }
    else if(operator === "*")
    {
        return multiply(num1, num2);
    }
    else if(operator === "%")
    {
        return Math.round(modulous(num1, num2) * 1000000000) / 1000000000;
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
        return result.textContent = "Can't divide by 0 dummy!";
    }
    return num1/num2
};

function modulous(num1, num2)
{
    if (num2 === 0)
    {
        return result.textContent = "Can't mod by 0 dummy!";
    }
    return num1%num2;
}

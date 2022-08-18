const screen = document.querySelector(".calculator_screen");
const operationText = document.querySelector(".operations_text");
const result = document.querySelector(".results_text");
const calc_btns = document.querySelectorAll("button");
const equals_btn = document.querySelector(".equals");
const clear_all_btn = document.querySelector(".clear_all");
const backsapce_btn = document.querySelector(".clear");
const decimal_btn = document.querySelector(".decimal");
let operators = "";
let operands = "";
let operationChain = "";

calc_btns.forEach(btn => {
    btn.addEventListener('click', ()=>{
        operationChain += btn.innerText;
        operationText.textContent = operationChain;
        //Array that will contain only the operator symbols
        operators = operationChain.replace(/[0-9.]/g, "").split("");
        //Array that will only contain the numbers being operated on
        operands = operationChain.split(/[\+\/\*\-%]/g).filter(n => !!n); //Checking if string has length > 0 then splitting it on operators 
    });
});

decimal_btn.addEventListener("click", () => {   
    //Check if user has not used the decimal for the current number
    if(!operands[operands.length-1].includes("."))
    {
        operationChain += decimal_btn.innerText;  
        //Update array so an attempt at entering duplicate decimals can be catched
        //when event fires again 
        operands = operationChain.split(/[\+\/\*\-%]/g).filter(n => !!n);        
    }
    else
    {
        operationChain+=""; //Add nothing if user has already used decimal
    }
    operationText.textContent = operationChain;
});

equals_btn.addEventListener("click", () => {
    if(operators.length >= operands.length)  //Ensure user doesn't end operation chain with an operator
    {
        result.textContent = "Math Error!";
    }
    else if(operators.length === 0 && operands.length === 1)  //Only one digit is entered
    {
        result.textContent = operands[0];
    }
    else
    {
        //While loop ensures that an operation chain is performed with two numbers at a time
        //until the operand array has one element remaining (the final result)
        while(operands.length > 1)
        {
            operands[0] = Math.round(operate(+operands[0], +operands[1], operators[0]) * 1000000000) / 1000000000;
            operands.splice(1,1); //Remove the second element from array
            operators.shift(); 
            if(isNaN(operands[0]))
            {
                result.textContent = "You can't do that dummy!";
            }
            else
            {
                result.textContent = `${operands[0]}`;
            }
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

backsapce_btn.addEventListener("click", () => {
    //Remove last char and update both arrays to make sure the correct element is removed
    operationChain = operationChain.slice(0, -1); //Remove last char 
    operators = operationChain.replace(/[0-9.]/g, "").split("");
    operands = operationChain.split(/[\+\/\*\-%]/g).filter(n => !!n); 
    operationText.textContent = operationChain;
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
        return modulous(num1, num2);
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
        return "undefined";
    }
    return num1/num2
};

function modulous(num1, num2)
{
    if (num2 === 0)
    {
        return "undefined";
    }
    return num1%num2;
}

const screen = document.querySelector(".calculator_screen");
let operationText = document.querySelector(".operations_text");
const result = document.querySelector(".results_text");
const calc_btns = document.querySelectorAll("button");
let operators = "";  //Array to store operators
let operands = "";  //Array to store numbers
let operationChain = ""; //String of operations entered by user


operationText.addEventListener("keydown", function(e) {
    operationChain = e.target.value; //Set op chain to input value
    operators = operationChain.replace(/[0-9.n\s]/g, "").split(""); //Spliting chain on numbers
    if(e.key === "Enter" || operators.length > 1)
    {
        calc_btns[18].click();
    }
});

calc_btns.forEach(btn => {
    if(btn.className === "equals")
    {
        btn.addEventListener("click", () => {
            //Take chain of operations and sort it into two arrays
            operators = operationChain.replace(/[0-9.n\s]/g, "").split(""); //Spliting chain on numbers
            operands = operationChain.split(/[\+\/\*\-%\s]/g).filter(n => !!n); //Checking if string has length > 0 then splitting it on operators 

            for(let i=0; i<operands.length; i++) //Checking for "n" so we can change sign of numbers that came after
            //the +/- button was pressed
            {
                if(operands[i].includes("n"))
                {
                    operands[i] = operands[i].replace("n", "-");
                }
            }
            if(operators.length === 0 && operands.length === 1)  //Only one digit is entered
            {
                result.textContent = operands[0];
            }
            else
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
                    if(operators.length === 0)
                    {
                        operationText.value =  `${operands[0]}`;
                    }
                    else
                    {
                        operationText.value =  `${operands[0]}${operators[0]}`;
                    }
                    operationChain = operationText.value;
                    result.textContent = `${operands[0]}`;
                }
            }
        });
    }
    else if(btn.className === "sign")
    {
        btn.addEventListener("click" , () => {
            if(operationChain[operationChain.length-1] !== "n")
            {
                operationChain += "n";  //Using n because we already split on the "-"
                operationText.value += "(-)"; //Displaying the sign change
            }
            else
            {
                operationChain = operationChain.replace(/.$/, '');  //Turning the number back into a positie by removing the "n"
                operationText.value = operationText.value.replace(/.$/, '');
            }
        });
    }
    else if(btn.className === "decimal")
    {
        btn.addEventListener("click", () => {   
            //Update array so an attempt at entering duplicate decimals can be catched
            //when event fires again 
            operands = operationChain.split(/[\+\/\*\-%\s]/g).filter(n => !!n);
            //Check if user has not used the decimal for the current number
            if(!operands[operands.length-1].includes("."))
            {
                operationChain += btn.innerText;  
                operationText.value += btn.innerText;
            }
            else
            {
                operationChain+=""; //Add nothing if user has already used decimal
                operationText.value += "";
            }
        });
    }
    else if(btn.className === "clear_all")
    {
        btn.addEventListener("click", () => {
            operationChain = "";
            result.textContent = "0";
            operationText.value = "";
        });
    }
    else if(btn.className === "clear")
    {
        btn.addEventListener("click", () => {
            //Remove last char and update both arrays to make sure the correct element is removed
            operationChain = operationChain.slice(0, -1); //Remove last char 
            operationText.value = operationText.value.slice(0, -1); 
        });
    }
    else //All other btns
    {
        btn.addEventListener('click', ()=>{
            operationChain += btn.innerText;
            operationText.value += btn.innerText;
            operators = operationChain.replace(/[0-9.n\s]/g, "").split(""); //Spliting chain on numbers

            if(operators.length > 1)
            {
                calc_btns[18].click();  //Click the equals btn
            }
        });
    }
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

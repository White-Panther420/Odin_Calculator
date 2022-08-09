const screen = document.querySelector(".calculator_screen");
const operation = document.querySelector(".operations_text");
const result = document.querySelector(".results_text");
const calc_btns = document.querySelectorAll("button");
const equals_btn = document.querySelector(".equals");
let number1 = 0;
let number2 = 0;
let operator = " ";
let operationArray = [];
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
        //storing all pushed buttons in array to be parsed for operations
        operationArray.push(btn.innerText)   
        let operationChain = ""
        console.log(operationArray);
        for(let i=0; i<operationArray.length; i++)
        {
            operationChain += operationArray[i];
        }    
        operation.textContent = operationChain;
    });
});

equals_btn.addEventListener("click", () => {
    console.log("HIIII");
    operate(operationArray)
});

function operate(operationArray)
{
    for(let i=0; i<operationArray.length; i++)
    {
        //Go through array and split string by operator?
        if(operationArray[i].typeOf === "number")
        {
            num1+=operationArray[i];
        }
        if(operationArray[i] === "+")
        {
            result.textContent = `${add(num1, num1)}`;
        }
        else if(operationArray[i] === "-")
        {
            result.textContent = `${subtract(num1, num1)}`;
        }
        else if(operationArray[i] === "/")
        {
            result.textContent = `${divide(num1, num1)}`;
        }
        else if(operationArray[i] === "*")
        {
            result.textContent = `${multiply(num1, num1)}`;
        }
        else if(operationArray[i] === "%")
        {
            result.textContent = `${modulous(num1, num1)}`;
        }
        else
        {
            return 0;
        }
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
add = (a, b) => a+b;
substract = (a, b) => a-b;
multiply = (a, b) => a*b;
divide = (a, b) => a/b;

function operate(operator, fisrtNumber, secondNumber){
    if(operator === 'add'){
        return add(fisrtNumber, secondNumber);
    }else if(operator === 'substract'){
        return substract(fisrtNumber, secondNumber);
    }else if(operator === 'multiply'){
        return multiply(fisrtNumber, secondNumber);
    }else if(operator === 'divide'){
        return divide(fisrtNumber, secondNumber);
    }
}

function changeBottomDisplay(button){
    const bottom = document.querySelector('.bottom');
    bottom.textContent += button.textContent;
}

function changeTopDisplay(button){
    const top = document.querySelector('.top');
    const bottom = document.querySelector('.bottom');
    top.textContent = bottom.textContent + button.textContent;
    bottom.textContent = '';
}

function operatorClick(){
    changeTopDisplay(this);
    const operators = document.querySelectorAll('.operator');
    operators.forEach(operator => operator.removeEventListener('click', operatorClick));
}

function numberClick(){
    if(this.textContent === '.'){
        const decimalPoint = document.querySelector('#point');
        decimalPoint.removeEventListener('click',numberClick);
    }
    changeBottomDisplay(this);
    const operators = document.querySelectorAll('.operator');
    const top = document.querySelector('.top');
    operators.forEach(operator => operator.addEventListener('click', operatorClick));
}

function setUp(){
    const numberButtons = document.querySelectorAll('.number');
    numberButtons.forEach(numberButton => numberButton.addEventListener('click', numberClick));
}

setUp();
console.log(operate('divide', 2, 4));

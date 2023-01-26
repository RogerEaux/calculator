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

function allowOperators(){
    const operators = document.querySelectorAll('.operator');
    operators.forEach(operator => operator.addEventListener('click', operatorClick));
}

function disallowOperators(){
    const operators = document.querySelectorAll('.operator');
    operators.forEach(operator => operator.removeEventListener('click', operatorClick));
}

function allowEquals(){
    const equals = document.querySelector('#equals');
    equals.addEventListener('click', equalsClick);
}

function disallowEquals(){
    const equals = document.querySelector('#equals');
    equals.removeEventListener('click', equalsClick);
}

function changeBottomDisplay(button){
    const bottom = document.querySelector('.bottom');
    bottom.textContent += button.textContent;
}

function changeTopDisplay(){
    const top = document.querySelector('.top');
    const bottom = document.querySelector('.bottom');
    console.log(top.textContent);
    if(!top.textContent.trim()){
        top.textContent = bottom.textContent;
    }else{
        top.textContent = getOperationElements();
    }
    bottom.textContent = '';
}

function operatorClick(){
    changeBottomDisplay(this);
    changeTopDisplay();
    disallowOperators();
}

function equalsClick(){
    changeTopDisplay();
    disallowEquals();
}

function numberClick(){
    changeBottomDisplay(this);
    allowOperators();
    const top = document.querySelector('.top')
    if(top.textContent){
        allowEquals();
    }
    if(this.textContent === '.'){
        const decimalPoint = document.querySelector('#point');
        decimalPoint.removeEventListener('click',numberClick);
        disallowOperators();
    }
}

function setUp(){
    const numberButtons = document.querySelectorAll('.number');
    numberButtons.forEach(numberButton => numberButton.addEventListener('click', numberClick));
}

setUp();

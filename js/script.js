function operate(){
    const elements = getOperationElements();
    const operator = elements[0];
    const a = elements[1];
    const b = elements[2];
    if(operator === '+'){
        return a + b;
    }else if(operator === '-'){
        return a - b;
    }else if(operator === 'x'){
        return a * b;
    }else if(operator === '÷'){
        return a / b;
    }
}

function getOperationElements(){
    const top = document.querySelector('.top');
    const bottom = document.querySelector('.bottom');
    const operator = top.textContent.slice(-1);
    const a = parseFloat(top.textContent.slice(0, -1));
    const b = parseFloat(bottom.textContent);

    return [operator, a, b];
}

function allowDP(){
    const decimalPoint = document.querySelector('#point');
    decimalPoint.addEventListener('click', numberClick);
}

function disallowDP(){
    const decimalPoint = document.querySelector('#point');
    decimalPoint.removeEventListener('click', numberClick);
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

function equalsClick(){
    const top = document.querySelector('.top');
    const bottom = document.querySelector('.bottom');
    if(isNaN(top.textContent.slice(-1))){
        top.textContent = operate();
    }else{
        top.textContent = bottom.textContent;
    }
    bottom.textContent = ''
    disallowEquals();
}

function operatorClick(){
    const top = document.querySelector('.top');
    const bottom = document.querySelector('.bottom');
    if(isNaN(top.textContent.slice(-1))){
        top.textContent = operate();
    }else if(bottom.textContent){
        top.textContent = bottom.textContent;
    }
    bottom.textContent = '';
    top.textContent += this.textContent;
    allowDP();
    disallowEquals();
    disallowOperators();
}

function numberClick(){
    const bottom = document.querySelector('.bottom');
    bottom.textContent += this.textContent;
    allowOperators();
    allowEquals();
    if(this.textContent === '.'){
        disallowDP();
        disallowOperators();
        disallowEquals();
    }
}

function setUp(){
    const numberButtons = document.querySelectorAll('.number');
    numberButtons.forEach(numberButton => numberButton.addEventListener('click', numberClick));
}

setUp();

function operate(){
    const elements = getOperationElements();
    const operator = elements[0];
    const a = elements[1];
    const b = elements[2];
    let result;
    if(operator === '+'){
        result = Math.floor((a + b)*100)/100;
    }else if(operator === '-'){
        result = Math.floor((a - b)*100)/100;
    }else if(operator === 'x'){
        result = Math.floor((a * b)*100)/100;
    }else if(operator === '÷'){
        result = Math.floor((a / b)*100)/100
    }
    return result;
}

function getOperationElements(){
    const top = document.querySelector('.top');
    const bottom = document.querySelector('.bottom');
    const operator = top.textContent.slice(-1);
    const a = parseFloat(top.textContent.slice(0, -1));
    const b = parseFloat(bottom.textContent);

    return [operator, a, b];
}

function allowEquals(){
    const equals = document.querySelector('#equals');
    equals.addEventListener('click', clickEquals);
}

function disallowEquals(){
    const equals = document.querySelector('#equals');
    equals.removeEventListener('click', clickEquals);
}

function allowOperators(){
    const operators = document.querySelectorAll('.operator');
    operators.forEach(operator => operator.addEventListener('click', clickOperator));
}

function disallowOperators(){
    const operators = document.querySelectorAll('.operator');
    operators.forEach(operator => operator.removeEventListener('click', clickOperator));
}

function allowDP(){
    const decimalPoint = document.querySelector('#point');
    decimalPoint.addEventListener('click', clickNumber);
}

function disallowDP(){
    const decimalPoint = document.querySelector('#point');
    decimalPoint.removeEventListener('click', clickNumber);
}

function allowDeleters(){
    const allClear = document.querySelector('#clear');
    const del = document.querySelector('#delete');
    allClear.addEventListener('click', clickAllClear);
    del.addEventListener('click', clickDelete);
}

function allowNumbers(){
    const numberButtons = document.querySelectorAll('.number');
    numberButtons.forEach(numberButton => numberButton.addEventListener('click', clickNumber));
}

function clickEquals(){
    const top = document.querySelector('.top');
    const bottom = document.querySelector('.bottom');
    if(isNaN(top.textContent.slice(-1))){
        top.textContent = operate();
        if(isNaN(top.textContent.slice(-3, -2))){
            console.log('E!');
        }
    }else{
        top.textContent = bottom.textContent;
    }
    bottom.textContent = ''
    disallowEquals();
}

function clickOperator(){
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

function clickDelete(){
    const bottom = document.querySelector('.bottom');
    bottom.textContent = bottom.textContent.slice(0, -1);
}

function clickAllClear(){
    const top = document.querySelector('.top');
    const bottom = document.querySelector('.bottom');
    top.textContent = '';
    bottom.textContent = '';
    disallowEquals();
    disallowOperators();
    allowDP();
}

function clickNumber(){
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
    allowNumbers();
    allowDeleters();
}

setUp();

function adjustResult(result){
    const resultString = result.toString();
    const indexE = resultString.indexOf('e');
    const indexDot = resultString.indexOf('.');  
    if(resultString === 'Infinity'){
        return 'No, stop that';
    }else if(resultString.length < 15){
        return resultString;
    }else if(indexE === -1 && indexDot !== -1){
        if(indexDot === 13){
            return resultString.slice(0, 13);
        }else{
            return resultString.slice(0, 14);
        }
    }else{
        return 'Like a lot';
    }
}

function operate(){
    const elements = getOperationElements();
    const operator = elements[0];
    const a = elements[1];
    const b = elements[2];
    let result;
    if(operator === '+'){
        result = (a + b);
    }else if(operator === '-'){
        result = (a - b);
    }else if(operator === 'x'){
        result = (a * b);
    }else if(operator === '÷'){
        result = (a / b)
    }
    result = adjustResult(result);        

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

function allowAns(){
    const ans = document.querySelector('#ans');
    ans.addEventListener('click',clickAns);
}

function disallowAns(){
    const ans = document.querySelector('#ans');
    ans.removeEventListener('click',clickAns);
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

function disallowNumbers(){
    const numberButtons = document.querySelectorAll('.number');
    numberButtons.forEach(numberButton => numberButton.removeEventListener('click', clickNumber));
}

function clickEquals(){
    const top = document.querySelector('.top');
    const bottom = document.querySelector('.bottom');
    if(isNaN(top.textContent.slice(-1))){
        top.textContent = operate();
        allowAns();
    }else{
        top.textContent = bottom.textContent;
        allowAns();
    }
    bottom.textContent = ''
    allowNumbers();
    disallowEquals();
}

function clickOperator(){
    const top = document.querySelector('.top');
    const bottom = document.querySelector('.bottom');
    if(isNaN(top.textContent.slice(-1))){
        top.textContent = operate();
        allowAns();
    }else if(bottom.textContent){
        top.textContent = bottom.textContent;
    }
    bottom.textContent = '';
    if(top.textContent !== 'Like a lot' && top.textContent !== 'No, stop that'){
        top.textContent += this.textContent;
    }else{
        disallowAns();
    }
    allowDP();
    allowNumbers();
    disallowEquals();
    disallowOperators();
}

function clickAns(){
    const top = document.querySelector('.top');
    const bottom = document.querySelector('.bottom');
    if(isNaN(top.textContent.slice(-1))){
        bottom.textContent = top.textContent.slice(0, -1);
    }else{
        bottom.textContent = top.textContent;
    }
    allowOperators();
    allowEquals();
    disallowAns();
}

function clickDelete(){
    const bottom = document.querySelector('.bottom');
    if(bottom.textContent.slice(-1) === '.'){
        allowDP();
    }
    bottom.textContent = bottom.textContent.slice(0, -1);
    if(bottom.textContent.length < 13){
        allowDP();
    }
    if(bottom.textContent.length < 14){
        allowNumbers();
    }
}

function clickAllClear(){
    const top = document.querySelector('.top');
    const bottom = document.querySelector('.bottom');
    top.textContent = '';
    bottom.textContent = '';
    allowDP();
    allowNumbers();
    disallowEquals();
    disallowOperators();
}

function clickNumber(){
    const top = document.querySelector('.top');
    const bottom = document.querySelector('.bottom');
    if(top.textContent === 'Like a lot' || top.textContent === 'No, stop that'){
        top.textContent = '';
    }
    bottom.textContent += this.textContent;
    if(bottom.textContent.length > 12){
        disallowDP();
    }
    if(bottom.textContent.length > 13){
        disallowNumbers();
    }
    allowOperators();
    allowEquals();
    disallowAns();
    if(this.textContent === '.'){
        disallowDP();
        disallowOperators();
        disallowEquals();
    }
}

function setUp(){
    allowNumbers();
    allowDP();
    allowDeleters();
}

setUp();

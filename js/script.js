function adjustResult(result){
    let resultString = result.toString();
    let indexE = resultString.indexOf('e');
    let indexDot = resultString.indexOf('.');  
    if(resultString === 'Infinity'){
        return 'No, stop that';
    }else if(resultString.length < 15){
        return resultString;
    }else if(indexE === -1){
        if(indexDot === 13){
            return resultString.slice(0, 13);
        }else{
            return resultString.slice(0, 14);
        }
    }else{
        return 'Too long';
    }
}

function operate(){
    let elements = getOperationElements();
    let operator = elements[0];
    let a = elements[1];
    let b = elements[2];
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
    let operator = top.textContent.slice(-1);
    let a = parseFloat(top.textContent.slice(0, -1));
    let b = parseFloat(bottom.textContent);

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
    const numbers = document.querySelectorAll('.number');
    numbers.forEach(number => number.addEventListener('click', clickNumber));
}

function disallowNumbers(){
    const numbers = document.querySelectorAll('.number');
    numbers.forEach(number => number.removeEventListener('click', clickNumber));
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
    if(top.textContent === 'Too long' || top.textContent === 'No, stop that'){
        disallowAns();
    }
    allowDP();
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
    if(top.textContent === 'Too long' || top.textContent === 'No, stop that'){
        disallowAns();
    }else{
        top.textContent += this.textContent;
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
    if(top.textContent === 'Too long' || top.textContent === 'No, stop that'){
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

function allowKeyboardInput(){
    document.addEventListener('keydown', (event)=>{
        let key = event.key;
        const numbers = document.querySelectorAll('.number');        
        const equals = document.querySelector('#equals');
        const del = document.querySelector('#delete');
        const allClear = document.querySelector('#clear');
        const ans = document.querySelector('#ans');
        const decimalPoint = document.querySelector('#point');
        const operators = document.querySelectorAll('.operator');
        const multiply = document.querySelector('#multiply');
        const divide = document.querySelector('#divide');
        
        numbers.forEach(number => {
            if(number.textContent === key) number.click();
        });
        operators.forEach(operator => {
            if(operator.textContent === key) operator.click();
        });

        if(key === '=' || key === 'Enter') equals.click();
        if(key === 'Escape') allClear.click();
        if(key === 'Backspace') del.click();
        if(key === 'a') ans.click();
        if(key === '.') decimalPoint.click();
        if(key === '*') multiply.click();
        if(key === '/') divide.click();
      });
}

function setUp(){
    allowNumbers();
    allowDP();
    allowDeleters();
    allowKeyboardInput();
}

setUp();

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

console.log(operate('divide', 2, 4));

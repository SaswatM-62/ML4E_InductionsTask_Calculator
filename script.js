let display = document.querySelector('.calculator__display');
let calculator = document.querySelector('.calculator');
let keys = calculator.querySelector('.calculator__keys');

let calculate = (n1, operator, n2) => {
    let firstNum = parseFloat(n1)
    let secondNum = parseFloat(n2)

    if (operator === 'add') {
        return firstNum + secondNum
    }

    if (operator === 'subtract') {
        return firstNum - secondNum
    }

    if (operator === 'multiply') {
        return firstNum * secondNum 
    }

    if (operator === 'divide') { 
        return firstNum / secondNum 
    }

    if (operator === 'modulus') { 
        return firstNum % secondNum 
    }

    if (operator === 'pow') { 
        return Math.pow(firstNum, secondNum)
    }
}


keys.addEventListener('click', e => {

    if (e.target.matches('button')) {
        let key = e.target;
        let action = key.dataset.action;
        let keyContent = key.textContent;
        let displayedNum = display.textContent;

        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));

        if (!action) {
            let previousKeyType = calculator.dataset.previousKeyType;
            if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = keyContent;
            } else {
                display.textContent = displayedNum + keyContent;
            }

            calculator.dataset.previousKeyType = 'number';
        }

        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
              display.textContent = displayedNum + '.';
            } else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
              display.textContent = '0.';
            }
            calculator.dataset.previousKeyType = 'decimal'
        }

        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide' || action === 'modulus' || action === 'pow') {
            let firstValue = calculator.dataset.firstValue;
            let operator = calculator.dataset.operator;
            let secondValue = displayedNum;
            let previousKeyType = calculator.dataset.previousKeyType;

            if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
                let calcValue = calculate(firstValue, operator, secondValue);
                display.textContent = calcValue;
                calculator.dataset.firstValue = calcValue;
            } else {
                calculator.dataset.firstValue = displayedNum;
            }

            key.classList.add('is-depressed');
 
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.firstValue = displayedNum;
            calculator.dataset.operator = action;
        }

        if (action === 'decimal') {
            if (!displayedNum.includes('.') ) {
                display.textContent = displayedNum + '.';
            }
            if (calculator.dataset.previousKeyType === 'operator') {
                display.textContent = '0.';
            }
            calculator.dataset.previousKeyType = 'decimal';
        }

        if (action === 'clear') {
            if (key.textContent === 'AC') {
                calculator.dataset.firstValue = '';
                calculator.dataset.modValue = '';
                calculator.dataset.operator = '';
                calculator.dataset.previousKeyType = '';
              } else {
                key.textContent = 'AC';
              }
            display.textContent = 0;
            calculator.dataset.previousKeyType = 'clear';
        }
        if (action !== 'clear') {
            let clearButton = calculator.querySelector('[data-action=clear]')
            clearButton.textContent = 'CE';
        }

        if (action === 'calculate') {
            let firstValue = calculator.dataset.firstValue;
            let operator = calculator.dataset.operator;
            let secondValue = displayedNum;
            let previousKeyType = calculator.dataset.previousKeyType;

            if (firstValue) {
                if (previousKeyType === 'calculate') {
                    firstValue = displayedNum;
                    secondValue = calculator.dataset.modValue;
                }
                
                display.textContent = calculate(firstValue, operator, secondValue);
            }

            calculator.dataset.modValue = secondValue;
            calculator.dataset.previousKeyType = 'calculate';
        }
    }
})
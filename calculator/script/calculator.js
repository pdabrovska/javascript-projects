let calculation = localStorage.getItem('calculation') || '';
      displayCalculation();
      
function updateCalculation(symbol){
  calculation += symbol;
  //console.log(calculation);
  displayCalculation();
  localStorage.setItem('calculation', calculation);
}

function saveCalculation(){
  localStorage.setItem('calculation', calculation);
}

function displayCalculation(){
  document.querySelector('.js-result').innerHTML = calculation;
}

document.body.addEventListener('keydown', (event) => {
  if (event.key === '+') {
    updateCalculation(' + ');
  } else if (event.key === '-'){
    updateCalculation(' - ');
  } else if (event.key === '*'){
    updateCalculation(' * ');
  } else if (event.key === '/'){
    updateCalculation(' / ');
  } else if (event.key === 'Backspace'){
    console.log('Clear');
        calculation = '';
        document.querySelector('.js-result').innerHTML = '0';
        saveCalculation();
  } else if (event.key === '.'){
    updateCalculation('.');
  } else if (event.key === '=' || event.key === 'Enter'){
    calculation = eval(calculation);
    displayCalculation();
    saveCalculation();
  }

  else if (event.key === '1'){
    updateCalculation('1');
  } else if (event.key === '2'){
    updateCalculation('2');
  } else if (event.key === '3'){
    updateCalculation('3');
  } else if (event.key === '4'){
    updateCalculation('4');
  }else if (event.key === '5'){
    updateCalculation('5');
  } else if (event.key === '6'){
    updateCalculation('6');
  } else if (event.key === '7'){
    updateCalculation('7');
  } else if (event.key === '8'){
    updateCalculation('8');
  }else if (event.key === '9'){
    updateCalculation('9');
  } else if (event.key === '0'){
    updateCalculation('0');
  } 
});

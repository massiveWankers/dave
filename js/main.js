//Listener
outputResults.innerHTML = 0;
document.getElementById('Tools/myForm').addEventListener('Tools/submit', main);


function main(e) {


    output()
    e.preventDefault();
}

function inputsFunc() {

    var inputs = {
        stockPrice: Number(document.getElementById('stockPrice').value),
        strikePrice: Number(document.getElementById('strikePrice').value),
        expiry: Number(document.getElementById('expiry').value),
        volatility: Number(document.getElementById('volatility').value)
    }

    return inputs
}

function output() {
    var inputs = inputsFunc();
    var output = inputs
    console.log(output);
    outputResults.innerHTML = add(inputsFunc())
}

function add(func) {

    var object = func;
    var sum = 0
    Object.keys(object).forEach(function(key) {

        sum += object[key]
    });
    console.log(sum);
    return sum;
}


$(function() {
    $("#datepicker").datepicker();
});
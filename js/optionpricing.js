// document.getElementById('outputResults').innerHTML = 44;
// document.getElementById('stockPrice').value = 10;
// document.getElementById('strikePrice').value = 11;
// document.getElementById('expiry').value = "12/12/2018"
// document.getElementById('volatility').value = 0.2
// document.getElementById('rate').value = 0.05
document.getElementById('myForm').addEventListener('submit', main);
//alert(date1 + inputsFunc().expiry)


function main(e) {

    //Define year fraction for T
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }
    today = mm + '/' + dd + '/' + yyyy;

    var date1 = new Date(today);
    var date2 = new Date((inputsFunc().expiry).toString());
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    var diffYears = diffDays / 365
    output(diffYears);
    e.preventDefault();
};

function inputsFunc() {

    var e = document.getElementById("optionType");
    var strUser = e.options[e.selectedIndex].value;
    console.log('strUser' + strUser)
    if (strUser === "Call") {
        var optionType = "Call";
    } else {
        var optionType = "Put"
    }
    var inputs = {
        optionType: optionType,
        stockPrice: Number(document.getElementById('stockPrice').value),
        strikePrice: Number(document.getElementById('strikePrice').value),
        expiry: document.getElementById('expiry').value,
        volatility: Number(document.getElementById('volatility').value) / 100,
        rate: Number(document.getElementById('rate').value) / 100
    }

    return inputs
}

function output(diffYears) {
    var inputs = inputsFunc();
    var output = inputs
    console.log(output);
    //var cumNormDist = CND(output.stockPrice)

    var time = 1;
    var rate = 0.05;
    var vol = 0.2;
    var premium = BlackScholes(output.optionType, output.strikePrice, output.stockPrice, diffYears, inputs.rate, inputs.volatility)
    //console.log(cumNormDist)
    console.log("Premium: " + premium + "callput: " + output.optionType + "yearFrac: " + diffYears);
    //outputResults.innerHTML = add(inputsFunc())
    outputResults.innerHTML = parseFloat(premium.toFixed(4))


}

function add(func) {

    var object = func;
    var sum = 0
    Object.keys(object).forEach(function(key) {

        if (typeof object[key] == "number") {
            sum += object[key]
        }
    });
    console.log(sum);
    return sum;
}


function CND(X) {

    var L, K;
    var a1 = 0.31938153;
    var a2 = -0.356563782;
    var a3 = 1.781477937;
    var a4 = -1.821255978;
    var a5 = 1.330274429;
    L = Math.abs(X);
    K = 1 / (1 + 0.2316419 * L);
    var ret = 1 - 1 / Math.sqrt(2 * Math.PI) * Math.exp((-1) * Math.pow(L, 2) / 2) * (a1 * K + a2 * Math.pow(K, 2) + a3 * Math.pow(K, 3) + a4 * Math.pow(K, 4) + a5 * Math.pow(K, 5));

    if (X < 0) {

        ret = 1 - ret;
    };
    return ret;
};

function BlackScholes(CallPutFlag, S, X, T, r, v, debug) {

    var d1, d2, ret;

    // convert the input strings to numbers
    S = parseFloat(S);
    X = parseFloat(X);
    T = parseFloat(T);
    r = parseFloat(r);
    v = parseFloat(v);

    // check for legal input

    if ((isNaN(S)) || (S <= 0)) {

        alert("Strike invalid!");
        return Number.NaN;
    };

    if ((isNaN(X)) || (X <= 0)) {
        alert("Asset price invalid!");
        return Number.NaN;

    };

    if ((isNaN(r)) || (r < 0)) {

        alert("Interest rate invalid!");
        return Number.NaN;
    };

    if (r == 0) {

        alert("Warning: interest rate sero.");
    };

    if ((isNaN(v)) || (v < 0)) {

        alert("volatility invalid!");
        return Number.NaN;
    };

    if (v == 0) {

        alert("Warning: volatility sero.");
    };

    d1 = (Math.log(S / X) + (r + Math.pow(v, 2) / 2) * T) / (v * Math.sqrt(T));
    d2 = d1 - v * Math.sqrt(T);

    if (CallPutFlag == 'Put') {

        ret = S * CND(d1) - X * Math.exp(-r * T) * CND(d2);
    } else if (CallPutFlag == 'Call') {

        ret = X * Math.exp(-r * T) * CND(-d2) - S * CND(-d1);
    } else

    {

        alert("Flag must be Call or Put");
    };

    return ret;
}; // end
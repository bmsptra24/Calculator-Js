const klik = document.querySelectorAll(".input div");
const output = document.querySelector(".output h1");
const audio = document.querySelector("audio");
let flagTitik = false, flagOprator = false;

function prosesOutput (inputValue) {
    if (output.innerHTML == '0') {
        return output.innerHTML = inputValue;
    } else {
        return output.innerHTML += inputValue;
    }
}
function stringToNumber(params) {
    return Number(params);
}
function style(font,marginTop,marginRight) {
    output.style.fontSize = font;
    output.style.marginTop = marginTop;
    output.style.marginRight = marginRight;
}
function fontControl() {
    if (output.innerHTML.length > 13) {
        style("33px","70px","14px");
    } else if (output.innerHTML.length > 8) {
        style("40px","60px","14px");
    } else if (output.innerHTML.length > 4) {
        style("60px","40px","8px");
    } else if (output.innerHTML.length > 0) {
        style("120px","-9px","0px");
    }
}
const onKlik = klik.forEach(function (e){
    e.addEventListener('click', function (input) {
        audio.play();
        const inputValue = e.firstElementChild.innerHTML;
        if (inputValue >= 0) {
            flagOprator =false;
            prosesOutput(inputValue);
        } else if (inputValue == '.' && flagTitik == false) {
            if (flagOprator == false) {
                output.innerHTML += inputValue;
                flagTitik = true;
            } else {
                output.innerHTML += '0.';
                flagTitik = true;
            }
        } else if (inputValue == 'C') {
            flagOprator = false;
            flagTitik = false;
            output.innerHTML = 0;
        } else if (inputValue == '⇦') {
            output.innerHTML = output.innerHTML.slice(0, -1);
            console.log("ok");
        } else if ((flagOprator == false) && (inputValue == '÷' || inputValue == 'x' || inputValue == '-' || inputValue == '+')) {
            flagTitik = false;
            flagOprator = true;
            output.innerHTML += inputValue;
        } else if (inputValue == '%') {
            flagTitik = true;
            output.innerHTML += inputValue;
        } else if (inputValue == '=') {
            let tempOutput = output.innerHTML;
            for (let i = 0; i < tempOutput.length; i++) {
                tempOutput = tempOutput.replace("x", "*");
                tempOutput = tempOutput.replace("÷", "/");
                tempOutput = tempOutput.replace("%", "*0.01");
            }
            output.innerHTML = eval(tempOutput);
            console.log(tempOutput);

        }
         
        fontControl();
    })
})

// progres sampe munculin input ke layar
$(document).ready(function() {
    checkmaintextbox();
});

function checkmaintextbox(parameters) {
    var el = document.getElementById('mainTextBox');
    if (el != null) {
        if (el.value == '') {
            el.value = 'Введите номер запчасти либо VIN код';
        }
    }
}



document.getElementById('mainTextBox').ondeactivate= function() {

    checkmaintextbox();
}







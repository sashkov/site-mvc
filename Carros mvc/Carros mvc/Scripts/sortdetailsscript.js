var path = "http://www.carross.ru";
var manufDiv = document.getElementById('sortManuf'); // событие по нажатию на выбор фильтров
if (manufDiv != null) {
    var brandDiv = document.getElementById('brandDiv');
    manufDiv.onclick = function () {
        var attr = brandDiv.attributes['style'];
        if (attr != null) {
            if (attr.value.match('display: none')) {
                brandDiv.setAttribute("style", "");
            } else {
                brandDiv.setAttribute("style", "display: none");
            }
        }
        else brandDiv.setAttribute("style", "display: none");
    }
    brandDiv.onmouseleave = function () {
        brandDiv.setAttribute("style", "display: none");

    } 
}

var checkBoxes = document.getElementsByName('cbx'); // события по нажатию на чекбокс
if (checkBoxes != null) {
    for (var i = 0; i < checkBoxes.length; i++) {
        checkBoxes[i].onclick = function () {
            var parameter = this.defaultValue + ',';
            if (this.defaultValue == '#all') {// если нажали на всех производителей
        
                this.checked = false;
                 document.getElementById('brandDiv').setAttribute("style", "display: none");;
                 document.getElementById('filtdv').setAttribute("style", "display: none");
                 document.getElementById('params').innerHTML = '#all';
                 var chbxs = document.getElementsByName('cbx');
                 for (var i = 0; i < chbxs.length; i++) {
                     chbxs[i].checked = false;
                 }
                document.getElementById('submitfltrbtn').click();
                return;
            }

            if (document.getElementById('params').innerHTML.indexOf('#all') != -1) {
                document.getElementById('params').innerHTML = document.getElementById('params').innerHTML.replace("#all", "");
            }


            var paramsElement = document.getElementById('params');
            var parameters = paramsElement.innerHTML;
            if (parameters.indexOf(parameter)==-1) {
                parameters = parameters + parameter;
            } else {
                parameters=  parameters.replace(parameter, "");
            }
            paramsElement.innerHTML = parameters;
            if (parameters != '') {
                var filterDiv = document.getElementById('filter');
                if (parameters.length < 100) {
                    filterDiv.innerHTML = "Фильтр: " + parameters;
                } else filterDiv.innerHTML = "Фильтр: " + parameters.substring(0, 100) + "...";
                filterDiv = document.getElementById('filtdv');
                var attr = filterDiv.attributes['style'];
                if (attr != null) attr.value = "";
             } else {
                var attrs = document.getElementById('filtdv').attributes['style'];
                if (attrs != null) {
                    attrs.value = "display: none";
                } else document.getElementById('filtdv').setAttribute("style", "display: none");
            }
        }

    }
}

var submitFiltersbtn = document.getElementById('submitfltrbtn');
if (submitFiltersbtn != null) {
    submitFiltersbtn.onclick = function () {
        var sid = document.getElementById('reqid').innerHTML;
        var parameters = sid + '|' + document.getElementById('params').innerHTML;
        var xhr = new XMLHttpRequest();
        var body = 'parameters=' + encodeURIComponent(parameters);
        xhr.open("POST", path+'/Home/Fltr', false);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(body);
        var response = xhr.responseText;
        var table = document.getElementById('detailsTable');
        table.innerHTML = response;

    }

}








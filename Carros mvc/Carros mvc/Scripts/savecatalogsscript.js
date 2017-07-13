var path = "http://www.carross.ru";
var button = document.getElementById('SaveCatalogs');
if (button != null) {
    button.onclick = function () {
        var parameters = '';
        var table = document.getElementsByName('editableTable')[0];
        var keys = '';
        for (var i = 1; i < table.rows.length; i++) {
            var row = '';
            for (var j = 1; j < table.rows[i].cells.length-1; j++) {
                var value = table.rows[i].cells[j].innerHTML;
                if (j ==1 && value!='') {
                    if (keys.match(';'+value)) {
                        alert("Ошибка "+ value + " уже добавлен");
                        return;
                    }
                    keys = keys + ';' + value;
                }
               if(value=='')break;
                row = row + value + '|';
            }
          
            parameters =parameters+ btoa(row)+'|';
        }
        
        var xhr = new XMLHttpRequest();
        var body = 'parameters=' + encodeURIComponent(parameters);
        xhr.open("POST", path +'/Catalogs/SaveCatalogs', false);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(body);
        var responseCode = xhr.responseText;
        if (responseCode == '0') alert('Данные успешно сохранены');
        else alert('Ошибка при сохранении: '+responseCode);

    }
   
}

var buttons = document.getElementsByName('removebtn');
if (buttons != null) {
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function(event) {
            var table = document.getElementsByName('editableTable')[0];
            if (table != null) {
                var index = parseInt(this.attributes['id'].value)+1;
                table.deleteRow(index);
            }
        }
    }

}


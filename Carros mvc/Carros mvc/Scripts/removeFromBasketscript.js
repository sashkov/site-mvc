var button = document.getElementById('RemoveDetailsDromBasket');
if (button != null) {
    button.onclick = function() {

        var parameters = '';
        var tbd = document.getElementById('editableTable');
        if (tbd.rows.length > 0) {
            parameters = 'removeFromBascet|';
            for (var i = 0; i < tbd.rows.length; i++) {
              var inputs = tbd.rows[i].getElementsByTagName('td'); //array of inputs in this row 
                    if (inputs.length > 0) {
                        if (inputs[8].childNodes[0].checked)
                       {
                            parameters = parameters+inputs[9].innerHTML + '|';
                        }
                    }
               
            }
           
        }
        if (parameters != '') {
            var hiddendoc = document.getElementById('saveParameters');
            hiddendoc.value = parameters;
            hiddendoc.click();
           }

    }
}


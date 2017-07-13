var button = document.getElementById('SaveUsers');
if (button == null) button = document.getElementById('SaveComissions');
if (button != null) {
    button.onclick = function(event) {

        var target = event.target;

        while (target != button) {
            return;
        }
        var parameters = "";
        var hiddendoc;
        var tbd;

        if (target.id == 'SaveUsers') {
            parameters = 'saveUsers|';
            tbd = document.getElementById('usrsTable');

            for (var i = 0; i < tbd.rows.length; i++) {
                try {
                    var inputs = tbd.rows[i].getElementsByTagName('td'); //array of inputs in this row 
                    if (inputs.length > 0) {
                        var userName = inputs[1].innerText;
                        var firstName = inputs[2].innerText;
                        var lastName = inputs[3].innerText;
                        var patronymic = inputs[4].innerText;
                        var lastConnection = inputs[6].innerText;
                        var registerDate = inputs[5].innerText;
                        var isAdmin = inputs[7].innerText;

                        parameters = parameters + i.toString() + ';' + lastName + ';' + firstName + ';' + patronymic + ';' + isAdmin.toString() + ';' + lastConnection.toString() + ';' + registerDate.toString() + ';' + userName + '|';
                    }
                } catch (e) {

                }
            }

            hiddendoc = document.getElementById('usersValue');
        }

        if (target.id == 'SaveComissions') {
            parameters = 'saveComissions|';
            tbd = document.getElementById('comissionsTable');

            for (var i = 0; i < tbd.rows.length; i++) {
                try {
                    var inputs = tbd.rows[i].getElementsByTagName('td'); //array of inputs in this row 
                    if (inputs.length > 0) {
                        var from = inputs[1].innerText;
                        var to = inputs[2].innerText;
                        var value = inputs[3].innerText;
                        var type = inputs[4].innerText;
                        parameters = parameters + i.toString() + ';' + from + ';' + to + ';' + value + ';' + type + '|';
                    }
                } catch (e) {

                }
              
            }
            hiddendoc = document.getElementById('comissionValue');
        }
        if (parameters != '') {
            hiddendoc.value = parameters;
            hiddendoc.click();
            alert("Таблица успешно сохранена");
        }
    }
}

var buttons = document.getElementsByName('tobasket');
if (buttons != null) {
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            addToBaskt(this.id);
          }

    }
}
var path = "http://www.carross.ru";
function addToBaskt(id) {
    var h = window.screen.height-pageXOffset;
    var w = getComputedStyle(document.getElementById('login')).width.replace('px','');
    var bw = document.getElementById('basketwindow');
    var bp = document.getElementById('backgroundpanel');
    var ml = (Number(w) / 3);
    var mt = (Number(window.screen.height) / 5) + Number(pageYOffset);
    bp.setAttribute("style", "height:" + h + "px;width:" + w + "px;z-index: 1;margin-top:" + pageYOffset + "px;");
    bw.setAttribute("style", "width: 500px;height: 350px;z-index: 200;margin-left:" + ml + "px;margin-top:" + mt + "px");
    document.getElementsByTagName('body')[0].setAttribute("style", "overflow: hidden");
    document.getElementById('baskHash').innerHTML = id;

    var parameters = id + '|' + document.getElementById('reqid').innerHTML;
    var xhr = new XMLHttpRequest();
    var body = 'parameters=' + encodeURIComponent(parameters);
    xhr.open("POST", path+'/Home/GetDetailInfo', false);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(body);
    var response = decodeURIComponent(atob(xhr.responseText));
    if (response != '-1') {
        var parce = response.split('|');
        for (var i = 0; i < parce.length; i++) {
            var parameterName = parce[i].split('=')[0];
            var value = parce[i].split('=')[1].replace(new RegExp("\\+", "g"), " ");
            switch (parameterName) {
                case "name":
                    {
                        document.getElementById('namebskt').innerHTML = value;
                        break;
                    }
                case "manuf":
                    {
                        document.getElementById('manufbskt').innerHTML = value;
                        break;
                    }
                case "price":
                    {
                        document.getElementById('pricebskt').innerHTML = value;
                        break;
                    }
                case "baseCount":
                    {
                        document.getElementById('countbskt').value = '1';
                        break;
                    }
                case "code":
                    {
                        document.getElementById('codebskt').innerHTML = value;
                        break;
                    }
              }
        }
    }
}

var buttons = document.getElementById('canceladdtobasket');
if (buttons != null) {
    buttons.onclick= function() {
        document.getElementsByTagName('body')[0].setAttribute("style", "overflow: auto");
        document.getElementById('backgroundpanel').setAttribute("style", "display:none");
        document.getElementById('basketwindow').setAttribute("style", "display:none");
    }
}

buttons = document.getElementsByName('frombasket');
if (buttons != null) {
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function() {
            var td = document.getElementById('parameters');
            td.value = "fromBasket|" + this.id;
            td.click();
        }

    }
}

var button = document.getElementById('submitaddtobasket');
if (button != null) {
    button.onclick = function () {
            var parameters = "toBasket|" + document.getElementById('baskHash').innerHTML + "|";
            var xhr = new XMLHttpRequest();
            var body = 'parameters=' + encodeURIComponent(parameters);
            xhr.open("POST", path+'/Home/AddDetailModels', false);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(body);
            var response = xhr.responseText;
            if (response == '0') {
                alert("Успешно добавлено");
            }
        

    }
}

function onResize() {
    var h = window.screen.height;
    var w = getComputedStyle(document.getElementById('login')).width.replace('px', '');
    var bp = document.getElementById('backgroundpanel');
    if (bp != null) {
        if (bp.style.display != 'none') {
            bp.style.width = w + 'px';
            bp.style.height = h + 'px';
        }
    }
    var bw = document.getElementById('basketwindow');
    if (bw != null) {
        if (bw.style.display != 'none') {
            var ml = (Number(w) / 3.5);
            var mt = (Number(window.screen.height) / 5) + Number(pageYOffset);
            bw.setAttribute("style", "width: 500px;height: 400px;z-index: 200;margin-left:" + ml + "px;margin-top:" + mt + "px");
        }
    }
}

var maintextb = document.getElementById('maininput');
if (maintextb != null) {
    maintextb.onkeypress= function(event) {
        if (event.keyCode == '13') {
            document.getElementById('startfind').click();
        }

    }
}






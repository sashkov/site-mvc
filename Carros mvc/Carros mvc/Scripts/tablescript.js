
var table = document.getElementsByName('editableTable')[0];
if (table == null) table = document.getElementById('usrsTable');
    var editingTd;
    if (table != null) {
       
        table.onclick = function(event) {

            var target = event.target;
          
            while (target != table) {
                if (target == null) break;
                
                    if (target.className.indexOf('edit-cancel')!=-1) {
                        finishTdEdit(editingTd.elem, false);
                        return;
                    }

                    if (target.className.indexOf('edit-ok')!=-1) {
                        finishTdEdit(editingTd.elem, true);
                        return;
                    }

                    if (target.className.indexOf('edit')!=-1) {
                        if (editingTd) return; // already editing

                        makeTdEditable(target);
                        return;
                    }

                    target = target.parentNode;
                
            }
        }

        function makeTdEditable(td) {
            editingTd = {
                elem: td,
                data: td.innerHTML
            };

            td.classList.add('edit-td');

            var textArea = document.createElement('textarea');
            textArea.style.width = td.clientWidth + 'px';
            textArea.style.height = td.clientHeight + 'px';
            textArea.className = 'edit-area';

            textArea.value = td.innerHTML;
            td.innerHTML = '';
            td.appendChild(textArea);
            textArea.focus();

            td.insertAdjacentHTML("beforeEnd",
                '<div class="edit-controls"><button class="edit-ok">ok</button><button class="edit-cancel">отмена</button></div>'
            );
        }

        function finishTdEdit(td, isOk) {
            if (isOk) {
                td.innerText = td.firstChild.value;
            } else {
                td.innerHTML = editingTd.data;
            }
            td.classList.remove('edit-td');
            editingTd = null;
        }
    }

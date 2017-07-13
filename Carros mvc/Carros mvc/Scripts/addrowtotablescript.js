var button = document.getElementsByName('addRow')[0];
if (button != null) {
    button.onclick = function () {
        var tbl = document.getElementsByName('editableTable')[0];
        var index = tbl.rows.length;
        tbl.insertRow(index);
        for (var i = 0; i < tbl.rows[index-1].cells.length; i += 1) {
            tbl.rows[index].insertCell(i);
            if (i == 0) tbl.rows[index].cells[i].innerHTML = index;
            if (tbl.id == 'catalogsTable' && i == 3) tbl.rows[index].cells[i].setAttribute("class", "maintd");
            else tbl.rows[index].cells[i].setAttribute("class", "edit maintd");
         }
   }
}




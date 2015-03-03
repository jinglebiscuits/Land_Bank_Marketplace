function drawTable() {
    var queryText = encodeURIComponent(
        " SELECT FULL_ADDRESS,PARCELID" + " FROM " + tableID);
    var query = new google.visualization.Query(
        'http://www.google.com/fusiontables/gvizdata?tq=' + queryText);

    query.send(function (response) {
        var numRows = response.getDataTable().getNumberOfRows();
        var numCols = response.getDataTable().getNumberOfColumns();
        var ftdata = [
             '<input id="search"  class="form-control" placeholder="Search" onkeypress="updateTable();" />'
            + '<table id="datatable" class=" table-striped table-hover"><thead><tr>'];
        for (var i = 0; i < numCols; i++) {
            var columnTitle = response.getDataTable().getColumnLabel(i);
            ftdata.push('<th>' + columnTitle + '</th>');
        }
        ftdata.push('</tr></thead><tbody class="list">');

        for (var i = 0; i < numRows; i++) {
            ftdata.push('<tr>');
            for (var j = 0; j < numCols; j++) {
                var rowValue = response.getDataTable().getValue(i, j);
                ftdata.push('<td>' + rowValue + '</td>');
            }
            ftdata.push('</tr>');
        }
        ftdata.push('</tbody></table>');
        document.getElementById('ft-data').innerHTML = ftdata.join('');
    });
}

function updateTable() {
    $("#search").keyup(function (e) {
        e.stopPropagation();
        e.preventDefault();
        if (e.keyCode == 13) {
            var input = $('#search').val().toUpperCase();
            var queryText = encodeURIComponent(
                " SELECT FULL_ADDRESS " + " FROM " + tableID + " WHERE FULL_ADDRESS MATCHES \'%" + input + "%\'");
            console.log(queryText);
            var query = new google.visualization.Query(
                'http://www.google.com/fusiontables/gvizdata?tq=' + queryText);
            
            query.send(function (response) {
                console.log(response);
                var numRows = response.getDataTable().getNumberOfRows();
                var numCols = response.getDataTable().getNumberOfColumns();
                console.log(numCols);
                console.log(numRows);
                var ftdata = [];
                for (var i = 0; i < numRows; i++) {
                    ftdata.push('<tr>');
                    for (var j = 0; j < numCols; j++) {
                        var rowValue = response.getDataTable().getValue(i, j);
                        ftdata.push('<td>' + rowValue + '</td>');
                    }
                    ftdata.push('</tr>');
                }
//                ftdata.push('</tbody>');
                $("tbody tr").remove();
//                $("tbody").
                $('tbody').append(ftdata.join(''));
            });
        }
        return;

    });
}
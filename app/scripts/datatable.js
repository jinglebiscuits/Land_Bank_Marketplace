var RESPONSE;

function drawTable() {
    var queryText = encodeURIComponent(
        " SELECT FULL_ADDRESS,PARCELID" + " FROM " + tableID);
    var query = new google.visualization.Query(
        'http://www.google.com/fusiontables/gvizdata?tq=' + queryText);

    query.send(function (response) {
        RESPONSE = response.getDataTable();
        var numRows = response.getDataTable().getNumberOfRows();
        var numCols = response.getDataTable().getNumberOfColumns();
        var ftdata = ['<table class="table table-striped table-hover"><thead><tr>'];
        for (var i = 0; i < numCols; i++) {
            var columnTitle = response.getDataTable().getColumnLabel(i);
            ftdata.push('<th>' + columnTitle + '</th>');
        }
        ftdata.push('</tr></thead><tbody class="list">');

        for (var i = 0; i < numRows; i++) {
            ftdata.push('<tr>');
            for (var j = 0; j < numCols; j++) {
                var rowValue = response.getDataTable().getValue(i, j);
                var columnTitle = response.getDataTable().getColumnLabel(j);
                console.log('<td class = \"' + columnTitle + '\"> ' + rowValue + '</td>');
                ftdata.push('<td class = \"' + columnTitle + '\"> ' + rowValue + '</td>');
            }
            ftdata.push('</tr>');
        }
        ftdata.push('</tbody></table>');
        document.getElementById('ft-data').innerHTML = ftdata.join('');
    });
    var options = {
  valueNames: [ 'FULL_ADDRESS','PARCELID']
};
    var data = new List('ft-data', options);
}
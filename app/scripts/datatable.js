function drawTable() {
    var queryText = encodeURIComponent(
        " SELECT FULL_ADDRESS,PARCELID" + " FROM " + tableID);
    var query = new google.visualization.Query(
        'http://www.google.com/fusiontables/gvizdata?tq=' + queryText);

    query.send(function (response) {
        var numRows = response.getDataTable().getNumberOfRows();
        var numCols = response.getDataTable().getNumberOfColumns();
        var ftdata = ['<section class="container">'
            + '<input type="search" id="search"  class="form-control light-table-filter" placeholder="Search" data-table="order-table">'
            + '<table class="table table-striped table-hove order-table tabler" id="datatable"><thead><tr>'];
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
        ftdata.push('</tbody></table><section>');
        document.getElementById('ft-data').innerHTML = ftdata.join('');
    });

}

function updateTable(layer, tableID) {

    var input = document.getElementById('search').value.toUpperCase;
    var queryText = encodeURIComponent(
        " SELECT FULL_ADDRESS,PARCELID" + " FROM " + tableID +"WHERE  FULL_ADDRESS,PARCELID MATCHES \'%" + input + "%\'");
    var query = new google.visualization.Query(
        'http://www.google.com/fusiontables/gvizdata?tq=' + queryText);

    query.send(function (response) {
        var numRows = response.getDataTable().getNumberOfRows();
        var numCols = response.getDataTable().getNumberOfColumns();
        var ftdata = ['<section class="container">'
            + '<input type="search" id="search"  class="form-control light-table-filter" placeholder="Search" data-table="order-table">'
            + '<table class="table table-striped table-hove order-table tabler" id="datatable"><thead><tr>'];
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
        ftdata.push('</tbody></table><section>');
        document.getElementById('ft-data').innerHTML = ftdata.join('');
    });
   
}

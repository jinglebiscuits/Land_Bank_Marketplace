'use strict';
var map;
var tableID = '1MbTC65NjQ2Pxp9r0Ir_SnavY9NDzltgUUUIfOVKh';
var loc = 'FULL_ADDRESS';
var LAYER;

function initialize() {
    google.load("visualization", "1", {
        packages: ['table']
    });
    var mapOptions = {
        zoom: 13,
        center: new google.maps.LatLng(33.5205556, -86.8025)
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
    LAYER = new google.maps.FusionTablesLayer({
        query: {
            select: loc,
            from: tableID,
        },
        map: map,
        styleId: 1,
        templateId: 2
    });
    google.maps.event.addDomListener(document.getElementById('input'), 'keydown', function (e) {
        if (e.keyCode == 13) {
            var input = document.getElementById('input').value;

            updateMap(LAYER, tableID, input)
            e.preventDefault();
        }
    });

    var input = document.getElementById('input');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    LAYER.setMap(map);
}

function updateMap(layer, tableID) {

    var searchString = document.getElementById('input').value;
    layer.setQuery("SELECT 'PARCELID' FROM " + tableID );

    //    console.log(document.getElementById('input').value);
    //    console.log(input.value);
    //    var loc = document.getElementById('input').value;
    //    var input = document.getElementById('input').value;
    //    var addressQuery = encodeURIComponent(" SELECT 'FULL_ADDRESS' " + " FROM " + tableID + " WHERE ('FULL_ADDRESS' LIKE '%" + input + "%')");
    //    var parcelQuery = encodeURIComponent(" SELECT PARCELID " + " FROM " + tableID + " WHERE ('PARCELID' LIKE \'% " + input + " %\')");
    //    var query = null;
    //    var results = [];
    //    console.log(input);
    //    if (typeof input == "string") {
    //        var newLayer = new google.maps.FusionTablesLayer({
    //            query: {
    //                select: 'FULL_ADDRESS',
    //                from: tableID,
    //                where: "FULL_ADDRESS LIKE %" + input + "%"
    //            }
    //        });
    //        if (newLayer)
    //            console.log(newLayer);
    //        oldLayer.setMap(null);
    //        newLayer.setMap(map);
    //        oldLayer = newLayer;
    //    } else {
    //        console.log("huh?!?!");
    //    }

}

function drawTable() {
        var queryText = encodeURIComponent(
            //" SELECT 'FULL_ADDRESS' as address,'PARCELID' as id, 'ASSESSEDTO' as value " + " FROM " + tableID);
            " SELECT 'FULL_ADDRESS' as address,'PARCELID' as id " + " FROM " + tableID);
        //        console.log(queryText);
        var query = new google.visualization.Query(
            'http://www.google.com/fusiontables/gvizdata?tq=' + queryText);

        query.send(function (response) {
            //        var table = new google.visualization.Table(
            //            document.getElementById('visualization'));
            //        table.draw(response.getDataTable(), {
            //            showRowNumber: true
            //          });
            //        });

            var numRows = response.getDataTable().getNumberOfRows();
            var numCols = response.getDataTable().getNumberOfColumns();
            var ftdata = ['<table class="table table-striped table-hover "><thead><tr>'];
            for (var i = 0; i < numCols; i++) {
                var columnTitle = response.getDataTable().getColumnLabel(i);
                ftdata.push('<th>' + columnTitle + '</th>');
            }
            ftdata.push('</tr></thead><tbody>');
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

            // Create the list of results for display of autocomplete.
            //            var results = [];
            //            for (var i = 0; i < numRows; i++) {
            //                console.log(response.getDataTable().getValue(i, 0));
            //                results.push(response.getDataTable().getValue(i, 0));
            //            }
        });
        //
        //        // Use the results to create the autocomplete options.
        //        console.log(results);
        //        return results;

    }
    //
    //function drawTable() {
    //    var query = "SELECT 'Scoring Team' as Scoring, " +
    //        "'Receiving Team' as Receiving, 'Minute of goal' as Minute " +
    //        'FROM 1VlPiBCkYt_Vio-JT3UwM-U__APurJvPb6ZEJPg';
    //    var team = document.getElementById('team').value;
    //    if (team) {
    //        query += " WHERE 'Scoring Team' = '" + team + "'";
    //    }
    //    var queryText = encodeURIComponent(query);
    //    var gvizQuery = new google.visualization.Query(
    //        'http://www.google.com/fusiontables/gvizdata?tq=' + queryText);
    //
    //    gvizQuery.send(function (response) {
    //        var table = new google.visualization.Table(
    //            document.getElementById('visualization'));
    //        table.draw(response.getDataTable(), {
    //            showRowNumber: true
    //        });
    //    });
    //}
google.setOnLoadCallback(initialize());
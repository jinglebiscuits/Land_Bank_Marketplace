'use strict';
var map;
var tableID = '1MbTC65NjQ2Pxp9r0Ir_SnavY9NDzltgUUUIfOVKh';
var loc = 'FULL_ADDRESS';

function initialize() {
    var layer;
    google.load("visualization", "1");
    var mapOptions = {
        zoom: 13,
        center: new google.maps.LatLng(33.5205556, -86.8025)
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
    layer = new google.maps.FusionTablesLayer({
        query: {
            select: loc,
            from: tableID,
        }
    });
    google.maps.event.addDomListener(document.getElementById('input'), 'keydown', function (e) {
        if (e.keyCode == 13) {
            var input = document.getElementById('input').value;
            console.log(document.getElementById('input').value);

            updateMap(layer, tableID, input)
            e.preventDefault();
        }
    });

    var input = document.getElementById('input');
//    console.log(input.value);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    layer.setMap(map);
}

function updateMap(layer, tableID) {
    var loc = document.getElementById('input').value;
    if (loc) {
        console.log("hey this happen");
        layer.setOptions({
            query: {
                select: loc,
                from: tableID,
                like: loc
            }
        });
    } else {
        layer.setOptions({
            query: {
                select: loc,
                from: tableID
            }
        });
    }
}

function autoComplete(tableId) {
    var queryText = encodeURIComponent(
        "SELECT" + loc +
        "FROM" + tableId );
    var query = new google.visualization.Query(
        'http://www.google.com/fusiontables/gvizdata?tq=' + queryText);

    query.send(function (response) {
        var numRows = response.getDataTable().getNumberOfRows();

        // Create the list of results for display of autocomplete.
        var results = [];
        for (var i = 0; i < numRows; i++) {
            results.push(response.getDataTable().getValue(i, 0));
        }

        // Use the results to create the autocomplete options.
        console.log(results);
        $('#input').typeahead([
            results
        ]);
    });
}

google.setOnLoadCallback(initialize());
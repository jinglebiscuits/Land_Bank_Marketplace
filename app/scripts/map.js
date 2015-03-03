'use strict';


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

            updateMap(LAYER, tableID);
            e.preventDefault();
        }
    });

    var input = document.getElementById('input');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    LAYER.setMap(map);
}

function updateMap(layer, tableID) {

    var input = $('#input').val().toUpperCase();
    var newLayer = new google.maps.FusionTablesLayer({
        query: {
            select: 'FULL_ADDRESS',
            from: tableID,
            where: "FULL_ADDRESS MATCHES  \'%" + input + "%\' "
        },
        templateId: 2
    });
    console.log(newLayer);
    layer.setMap(null);
    newLayer.setMap(map);
    LAYER = newLayer;

}
google.setOnLoadCallback(initialize());
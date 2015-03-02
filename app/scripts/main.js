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
    // introJs().start();
}

function updateMap(layer, tableID) {

    var input = document.getElementById('input').value;
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

function startIntro(){
        var intro = introJs();
          intro.setOptions({
            steps: [
              { 
                intro: "Hello world!"
              },
              { 
                intro: "You <b>don't need</b> to define element to focus, this is a floating tooltip."
              },
              {
                element: document.querySelector('#step1'),
                intro: "This is a tooltip."
              },
              {
                element: document.querySelectorAll('#step2')[0],
                intro: "Ok, wasn't that fun?",
                position: 'right'
              },
              {
                element: '#step3',
                intro: 'More features, more fun.',
                position: 'left'
              },
              {
                element: '#step4',
                intro: "Another step.",
                position: 'bottom'
              },
              {
                element: '#step5',
                intro: 'Get it, use it.'
              }
            ]
          });
          intro.start();
      }

function doIt() {
    introJs().start();
}
google.setOnLoadCallback(initialize());

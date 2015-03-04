'use strict';


function initialize() {
    var markers = [];
    
    // google.maps.event.addDomListener(document.getElementById('input'), 'keydown', function (e) {
    //     if (e.keyCode == 13) {

    //         //updateMap(LAYER, tableID);
    //         e.preventDefault();
    //     }
    // });

    var input = /** @type {HTMLInputElement} */(
      document.getElementById('input'));
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    LAYER.setMap(map);

    var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

    // Listen for the event fired when the user selects an item from the
    // pick list. Retrieve the matching places for that item.
    google.maps.event.addListener(searchBox, 'places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }
        for (var i = 0, marker; marker = markers[i]; i++) {
          marker.setMap(null);
        }

        // For each place, get the icon, place name, and location.
        markers = [];
        var bounds = new google.maps.LatLngBounds();

        var image = {
            url: places[0].icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };
        var marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: places[0].name,
            position: places[0].geometry.location
          });
        markers.push(marker);
        bounds.extend(places[0].geometry.location);

        // for (var i = 0, place; place = places[i]; i++) {
        //   var image = {
        //     url: place.icon,
        //     size: new google.maps.Size(71, 71),
        //     origin: new google.maps.Point(0, 0),
        //     anchor: new google.maps.Point(17, 34),
        //     scaledSize: new google.maps.Size(25, 25)
        //   };

        //   // Create a marker for each place.
        //   var marker = new google.maps.Marker({
        //     map: map,
        //     icon: image,
        //     title: place.name,
        //     position: place.geometry.location
        //   });

        //   markers.push(marker);
        //   bounds.extend(place.geometry.location);
        // }

        //map.fitBounds(bounds);
        map.panTo(markers[0].getPosition());
        map.setZoom(15);
      });
    // Bias the SearchBox results towards places that are within the bounds of the
    // current map's viewport.
    google.maps.event.addListener(map, 'bounds_changed', function() {
        var bounds = map.getBounds();
        searchBox.setBounds(bounds);
    });
}

function drawMap() {
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
    google.maps.event.addDomListener(window, 'load', initialize);
}

// function updateMap(layer, tableID) {

//     var input = $('#input').val().toUpperCase();
//     var newLayer = new google.maps.FusionTablesLayer({
//         query: {
//             select: 'FULL_ADDRESS',
//             from: tableID,
//             where: "FULL_ADDRESS MATCHES  \'%" + input + "%\' "
//         },
//         templateId: 2
//     });
//     console.log(newLayer);
//     layer.setMap(null);
//     newLayer.setMap(map);
//     LAYER = newLayer;
// }

google.setOnLoadCallback(drawMap());
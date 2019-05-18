// Creating map object
var myMap = L.map("map", {
  center: [32.7157, -117.1611],
  zoom: 11
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// Assemble API query URL
var url = "http://seshat.datasd.org/get_it_done_311/get_it_done_pothole_requests_datasd.csv"

// Grab the data with d3
d3.csv(url, function(response) {
//   console.log(response);

// Create a new marker cluster group
var markers = L.markerClusterGroup();

// Loop through data
for (var i = 0; i < response.length; i++) {
    // console.log(response[i].lat)

    // Set the data latitude and longtitude
    var lat = response[i].lat;
    var long = response[i].long;
    // if(i < response.length/50){
    //     console.log(typeof lat);
    //     console.log(lat);
    //     console.log(response[0]);
    // }

    // Check for lat, long service request property
    if (lat) {
        if (long) {

    // Add a new marker to the cluster group and bind a pop-up
    markers.addLayer(L.marker([lat, long])
    .bindPopup(response[i].service_request_id));
        }  
    }
}
  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});

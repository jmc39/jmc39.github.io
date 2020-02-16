// Creating map object
  
var myMap = L.map("map", {
  center: [32.7157, -117.1611],
  zoom: 13
});
// function createMap(serviceRequests) {

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// Assemble API query URL
console.log("CSV dataset url is http instead of https which generates console error for Seshat URL")
var url ="s3://mydataviztest-39/get_it_done_pothole_requests_datasd_v1.csv"
// Grab the data with d3
d3.csv(url, 
  function(response) {
//   console.log(response);

// Create a new marker cluster group
var markers = new L.MarkerClusterGroup();

// Loop through data
for (var i = 0; i < response.length; i++) {
    // console.log(response[i].lat)

    // Set the data latitude and longtitude
    var lat = response[i].lat;
    var long = response[i].long;
    var council = response[i].council_district
    
    // Check for service requests located in San Diego Council Districts    
    if (council) {
    
      // Check for lat, long service request property
      if (lat) {
        if (long) {
    // Add a new marker to the cluster group and bind a pop-up
    markers.addLayer(L.marker([lat, long])
    .bindPopup(
        `Service Request ID: ${response[i].service_request_id}<br>
        Council District: ${response[i].council_district}<br>
        Community Plan Area: ${response[i].comm_plan_name}<br>
        Case Origin: ${response[i].case_origin}<br>
        Date Updated: ${response[i].updated_datetime}<br>
        `));
        }   
    }
  }
}
  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});

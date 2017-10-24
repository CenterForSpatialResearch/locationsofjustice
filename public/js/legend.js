function buildLegend() {
    console.log("build legend for all categories... TODO");
    // 
    // get data via d3
    /*d3.request("data/TestLocations.geojson")
        .mimeType("application/json")
        .response(function(xhr) { return JSON.parse(xhr.responseText); })
        .get(buildElements);
    */
}

function buildElements(data) {

    console.log("building legend elements");
    console.log("got data", data);

       


}


function closeAbout() {
    document.querySelector("#aboutPopup").style.display = 'none';
}


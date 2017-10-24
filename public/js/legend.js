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

function updateItemDetail(category, itemType) {
    console.log("updateItemDetail with category and type", category, itemType);
    if (copyData) {
        for (section in copyData) {
            if (section == category) {
                var items = copyData[section];
                for (item in items) {
                    if (items[item]['type-name'] == itemType) {
                        var desc = items[item]['type-description'];
                        var className = '.' + category;
                        $(className).find('.type-info').html(desc);



                    }
                }
            }
            
        }
    }
    

}

function closeAbout() {
    document.querySelector("#aboutPopup").style.display = 'none';
}

function toggleLegend(ev, legendType) {
    console.log('toggleLegend');

    // show legend or info about child
    var item = $(ev.target);
    var itemId = item.attr('id');
    
    if (itemId == 'enforcement_toggle') {
        
        if (legendType) {
            switch (legendType) {
                case 'enforcement':
                    
                    
                    $('.enforcement .type-wrapper').toggle(200);
                    break;
            }
        }

    } 

}
function toggleChildren(e) {
    console.log("going through children for element", e);
    

    $('.enforcement').children().each(function(key, value) {
        
        if (key > 0) {
            var display = this.style.display;
            if (display) {
                if (display == 'inline') this.style.display = 'none';
                if (display == 'none') this.style.display = 'inline';
            } else {
                // not defined so show it
                this.style.display = 'inline';
            }
        }
        
        
    });
}
function buildLegend() {
    console.log("build legend for all categories... TODO");
    // 
    // get data via d3
    /*d3.request("data/TestLocations.geojson")
        .mimeType("application/json")
        .response(function(xhr) { return JSON.parse(xhr.responseText); })
        .get(buildElements);
    */

    d3.request("data/locations.geojson")
        .mimeType("application/json")
        .response(function(xhr) { return JSON.parse(xhr.responseText); })
        .get(function(data) {

            // just print it for ref
            console.log(data);
            // enforcement
            var types = [];
            var categories = [];
            data.features.forEach(function(d) {

                var cat = d.properties.CATEGORY;
                if (categories.indexOf(cat) < 0) {
                    categories.push(cat);
                    console.log("Added ", cat);
                }

                var type = d.properties.TYPE;
                if (types.indexOf(type) < 0) {
                    // 
                    if (cat == "Support") types.push(type);
                }

            });
            console.dir(categories);

            console.dir(types);
        });


}

function fadeLegendExceptTarget(eventTarget) {
    // fade all 
    $('.type-item').css('opacity', '0.5');
    // but not the target
    eventTarget.parentElement.style.opacity = 1;

}

function buildElements(data) {

    console.log("building legend elements");
    console.log("got data", data);

       


}


function closeAbout() {
    document.querySelector("#aboutPopup").style.display = 'none';
}

function toggleLegend(ev, legendType) {
    console.log('toggleLegend', legendType);
    fadeLegendExcept(legendType);

    // show legend or info about child		
    var item = $(ev.target);
    var itemId = item.attr('id');
    console.log("itemId", itemId);
    //
    if (itemId == legendType + '_toggle') {
        if (legendType) $('.' + legendType + ' .type-wrapper').toggle(200);		
    }
}

function closeOpenMenusExcept(legendType) {
    var types = ['legal', 'enforcement', 'courts', 'confinement', 'alternatives', 'support'];
    var index = types.indexOf(legendType);
    types.slice(index, 1);
    for (type in types) {
        console.log("hiding type-wrapper for type", types[type]);
        $('.' + types[type] + ' .type-wrapper').hide();
    }
}
function closeAllOpenMenus() {

    $('.legal .type-wrapper').hide();
    $('.enforcement .type-wrapper').hide();
    $('.courts .type-wrapper').hide();
    $('.confinement .type-wrapper').hide();
    $('.alternatives .type-wrapper').hide();
    $('.support .type-wrapper').hide();

}

function fadeLegendExcept(legendType) {
    // fade all others
    $('.layer-control.legend.leaflet-control').css('opacity', '0.5');
    // show main
    $('.layer-control.legend.' + legendType + '.leaflet-control').css('opacity', '1');
}


/* not used - was for displaying category information about each subtype


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
*/
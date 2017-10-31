// toggle category legend and submenus
function toggleLegend(ev, legendType) {
    fadeLegendExcept(legendType);
    
    // show legend or info about child		
    var item = $(ev.target);
    var itemId = item.attr('id');
    //
    if (itemId == legendType + '_toggle') {
        hideOtherMenus(legendType);
        if (legendType) $('.' + legendType + ' .type-wrapper').toggle(200);		
    }
}

// fade all submenu items except for selected
function fadeLegendExceptTarget(eventTarget) {
    $('.type-item').css('opacity', '0.5');
    // show parent
    eventTarget.parentElement.style.opacity = 1;
}

// update submenu on double click on category
function updateSubMenuStyle(parentLayerName) {
    var cssSelector = parentLayerName.substring(0, parentLayerName.indexOf('Icons'));
    $('.legend.' + cssSelector + ' .type-item').css('opacity', '1');
}

// hide all other menus
function hideOtherMenus(legendType) {
    var types = [
        "legal", "enforcement", "courts", "confinement", "alternatives", "support"
    ];
    for (type in types) {
        if (types[type] !== legendType) {
            $('.' + types[type] + ' .type-wrapper').hide();
        }
    }
}

// close all other menus
function closeOpenMenusExcept(legendType) {
    var types = ['legal', 'enforcement', 'courts', 'confinement', 'alternatives', 'support'];
    var index = types.indexOf(legendType);
    types.slice(index, 1);
    for (type in types) {
        //console.log("hiding type-wrapper for type", types[type]);
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
    // reset opacity
    $('.layer-control').css('opacity', 1);
}

function fadeLegendExcept(legendType) {
    $('.layer-control.legend.leaflet-control').css('opacity', '0.5');
    $('.layer-control.legend.' + legendType + '.leaflet-control').css('opacity', '1');
}

/* TODO implement on ESC key */
function closeAbout() {
    document.querySelector("#aboutPopup").style.display = 'none';
}


/*

not needed, this was useful to see what was in the geojson

function buildLegend() {
    d3.request("data/locations.geojson")
        .mimeType("application/json")
        .response(function(xhr) { return JSON.parse(xhr.responseText); })
        .get(function(data) {
            
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
*/
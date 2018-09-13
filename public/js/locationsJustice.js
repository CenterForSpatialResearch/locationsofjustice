// Map settings
var lat = 40.723;
var lng = -73.945;
var zoom = 11;

var map = L.Mapzen.map('justiceMap', {
  apiKey: 'mapzen-h1njtmE',
  zoomControl: false,
  center: [40.723, -73.945],
  zoom: 11,
  minZoom: 7,
  maxZoom: 19,
  maxBounds: [[45, -80], [40, -70]],
  attribution: '© <a href="http://c4sr.columbia.edu/">Center for Spatial Research</a> Columbia University, <a href="http://archleague.org/">Architectural League</a>, <a href="https://www.mapzen.com/rights">Mapzen</a>, <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>, <a href="https://www.mapbox.com/about/maps/">Mapbox</a>, and <a href="https://www.mapzen.com/rights/#services-and-data-sources">others</a>',
  tangramOptions: {
    scene: 'sceneMapboxTiles.yaml'
  },
});

// mapboxgl.accessToken = 'pk.eyJ1IjoiamZzMjExOCIsImEiOiJlMUQzd2YwIn0.WLb3PYDt2z-XttOLFcQlVQ';
// var map = new mapboxgl.Map({
//     container: 'justiceMap',
//     style: 'mapbox://styles/mapbox/streets-v9'
// });

var zoomHome = L.Control.zoomHome({
  position: 'bottomright'
});
zoomHome.addTo(map);

// adding menu state
var categoryShowing = null;
var firstSubmenuClick = true;

// basic show-hide for now
function toggleHighlighted() {
  if (scene.config.layers.justice_locations.highlightedIcons.visible == true) {
    //show all others and hide highlighted
    scene.config.layers.justice_locations.legalIcons.visible = true;
    scene.config.layers.justice_locations.enforcementIcons.visible = true;
    scene.config.layers.justice_locations.courtsIcons.visible = true;
    scene.config.layers.justice_locations.confinementIcons.visible = true;
    scene.config.layers.justice_locations.alternativesIcons.visible = true;
    scene.config.layers.justice_locations.supportIcons.visible = true;
    scene.config.layers.justice_locations.highlightedIcons.visible = false;

  } else {
    // hide all else and show highlighted
    scene.config.layers.justice_locations.legalIcons.visible = false;
    scene.config.layers.justice_locations.enforcementIcons.visible = false;
    scene.config.layers.justice_locations.courtsIcons.visible = false;
    scene.config.layers.justice_locations.confinementIcons.visible = false;
    scene.config.layers.justice_locations.alternativesIcons.visible = false;
    scene.config.layers.justice_locations.supportIcons.visible = false;
    scene.config.layers.justice_locations.highlightedIcons.visible = true;

  }
  scene.updateConfig();
}

// show all layers
function showAllLayers() {
    if (scene) {
      categoryShowing = null;
      scene.config.layers.justice_locations.legalIcons.visible = true;
      scene.config.layers.justice_locations.enforcementIcons.visible = true;
      scene.config.layers.justice_locations.courtsIcons.visible = true;
      scene.config.layers.justice_locations.confinementIcons.visible = true;
      scene.config.layers.justice_locations.alternativesIcons.visible = true;
      scene.config.layers.justice_locations.supportIcons.visible = true;
      scene.config.layers.justice_locations.highlightedIcons.visible = false;
      scene.updateConfig();

      // show all subcategories
      showAllSubcategories();

    }
}

function showAllSubcategories() {
  if (scene) {
    var parentLayers = ['legalIcons', 'enforcementIcons', 'courtsIcons', 'confinementIcons', 'alternativesIcons', 'supportIcons'];

    for (name in parentLayers) {
      var layerName = parentLayers[name]; // ...
      for (i in scene.config.layers.justice_locations) {
        if (i == layerName) {
          for (j in scene.config.layers.justice_locations[layerName]) {
            if ((j !== 'visible') && (j !== 'filter')) {
              scene.config.layers.justice_locations[layerName][j].visible = true;
            }
          }
        }
      }
    }
    scene.updateConfig();
  }
}

function hideLayersExcept(layerToIgnore) {
  if (scene) {
    // turn all off first
    scene.config.layers.justice_locations.legalIcons.visible = false;
    scene.config.layers.justice_locations.enforcementIcons.visible = false;
    scene.config.layers.justice_locations.courtsIcons.visible = false;
    scene.config.layers.justice_locations.confinementIcons.visible = false;
    scene.config.layers.justice_locations.alternativesIcons.visible = false;
    scene.config.layers.justice_locations.supportIcons.visible = false;
    scene.config.layers.justice_locations.highlightedIcons.visible = false;

    switch (layerToIgnore) {
      case 'legalIcons':
        scene.config.layers.justice_locations.legalIcons.visible = true;
        break;
      case 'enforcementIcons':
        scene.config.layers.justice_locations.enforcementIcons.visible = true;
        break;
      case 'courtsIcons':
        scene.config.layers.justice_locations.courtsIcons.visible = true;
        break;
      case 'confinementIcons':
        scene.config.layers.justice_locations.confinementIcons.visible = true;
        break;
      case 'alternativesIcons':
        scene.config.layers.justice_locations.alternativesIcons.visible = true;
        break;
      case 'supportIcons':
        scene.config.layers.justice_locations.supportIcons.visible = true;
        break;
    }

    categoryShowing = layerToIgnore;
    scene.updateConfig();
  }
}

function hideSublayers(parentLayerName, sublayerToShow) {
  if (scene) {
    // hide all other layers again
    hideLayersExcept(parentLayerName);
    var resetLayers = false;

    for (i in scene.config.layers.justice_locations) {
      if (i == parentLayerName) {
        for (j in scene.config.layers.justice_locations[parentLayerName]) {
          if ((j !== 'visible') && (j !== 'filter')) {
            if (j !== sublayerToShow) {

              // hide all others
              scene.config.layers.justice_locations[parentLayerName][j].visible = false;

            } else {

              if (firstSubmenuClick) {
                // ignore this logic on first click because by default the subcategory will be showing
                firstSubmenuClick = false;
                scene.config.layers.justice_locations[parentLayerName][j].visible = true;

              } else {
                var subcategoryStatus = scene.config.layers.justice_locations[parentLayerName][j].visible;
                if (subcategoryStatus == true) {
                  // reset to parent category
                  resetLayers = true;
                } else {
                  scene.config.layers.justice_locations[parentLayerName][j].visible = true;
                }
              }
            }
          }
        }
      }
    }
    scene.updateConfig();

    if (resetLayers == true) {
      showAllSublayers(parentLayerName);
    }
  }
}

function showAllSublayers(parentLayerName) {
  firstSubmenuClick = true;
  if (scene) {
    // hide all other layers again
    hideLayersExcept(parentLayerName);
    updateSubMenuStyle(parentLayerName);
    for (i in scene.config.layers.justice_locations) {
      if (i == parentLayerName) {
        for (j in scene.config.layers.justice_locations[parentLayerName]) {
          if ((j !== 'visible') && (j !== 'filter')) {
            scene.config.layers.justice_locations[parentLayerName][j].visible = true;
          }
        }
      }
    }
    scene.updateConfig();
  }
}


function getTangramName(subtypeName) {

  switch(subtypeName) {
    // legal
    case "State Prosecutor": return 'StateProsecutor';
    case "Federal Prosecutor": return 'FederalProsecutor';
    case "Public Appellate Representation": return 'PublicAppellate';
    case "Public Defender": return 'PublicDefender';
    case "Public Family Court Representation": return 'PublicFamily';
    case "Mental Hygiene Legal Services": return 'MentalHygiene';
    case "Attorney Conduct Grievance Committee": return 'Grievance';
    // enforcement
    case "Tow Pound": return 'TowPound';
    case "Logistics": return 'NYPDLogistics';
    case "Offices & Posts": return 'NYPDAdmin';
    case "Police Station": return 'NYPDStationhouse';
    case "Police Service Area Command": return 'NYPDServiceArea';
    case "NYPD Division of School Safety": return 'NYPDSchoolSafety';
    case "Parks Police": return 'Parks';
    case "State Law Enforcement": return 'StateLaw';
    case "Federal Law Enforcement": return 'lawEnforcement';
    case "Headquarters": return 'NYPDHeadquarters';
    case "Parking": return 'Parking';
    case "Training": return 'Training';
    // Courts
    case "Alternative Court": return 'AlternativeCourt';
    case "Appeals Court": return 'AppealsCourt';
    case "Civil & Criminal Court": return 'CivilCriminalCourt';
    case "Civil Court": return 'CivilCourt';
    case "Criminal Court": return 'CriminalCourt';
    case "Family Court": return 'FamilyCourt';
    case "Immigration Court": return 'Immigration';
    // Alternatives
    case "Alternatives Referral Point": return 'AlternativesReferralPoint';
    case "Alternatives Service Provider": return 'AlternativesServiceProvider';
    // case "Federal Probation Office": return 'FederalProbation';
    case "Juvenile Probation": return 'JuvenileProbation';
    case "Neighborhood Opportuity Network (NeON)": return 'Neon';
    case "Parole Office": return 'ParoleOffice';
    case "Probation Office": return 'ProbationOffice';
    case "Reentry Services Provider": return 'ReentryServicesProvider';
    // Confinement
    case "Felony": return 'Felony';
    case "Immigration Detention": return 'ImmigrationDetention';
    case "Juvenile": return 'Juvenile';
    case "Medical & Psychiatric": return 'Medical';
    case "Pretrial & Misdemeanor": return 'Pretrial';
    // Support
    case "Administration": return 'Administration';
    case "Infrastructure": return 'Infrastructure';
    case "Private Business": return 'PrivateBusiness';
  }
}

// Legal button **********
var LegalLayerControl = L.Control.extend({
  options: {
    position: 'topleft'
  },
  onAdd: function() {
    var container = L.DomUtil.create('div', 'layer-control');
    container.innerHTML = '<input id="legal_toggle" type="button" value="Legal">'
    L.DomEvent.on(container, 'click', this.toggleOnClick);
    // build legend for subtypes
    L.DomUtil.addClass(container, "legend");
    L.DomUtil.addClass(container, "legal");
    var innerWrapper = L.DomUtil.create('div', 'type-wrapper');
    container.appendChild(innerWrapper);

    var types = [
      "State Prosecutor", "Federal Prosecutor", "Public Defender", "Public Family Court Representation",
      "Public Appellate Representation",  "Mental Hygiene Legal Services", "Attorney Conduct Grievance Committee"
    ];

    for (type in types) {
      var typeItem = L.DomUtil.create('div', 'type-item');
      typeItem.innerHTML = '<input class="legal-type" value="' + types[type] + '" type="button">';
      L.DomEvent.on(typeItem, 'click', this.toggleTypeInfo);
      innerWrapper.appendChild(typeItem);
    }
    return container;
  },
  toggleTypeInfo: function (e) {
    if (e.target.value) {
      fadeLegendExceptTarget(e.target);
      hideSublayers('legalIcons', getTangramName(e.target.value));
    }
  },
  toggleOnClick: function (e) {
    toggleLegend(e, 'legal');
    if (scene) {
      hideLayersExcept('legalIcons');
      var toggle = document.getElementById("legal_toggle");
      toggle.style.background = '#5db323';
      toggle.style.color = 'white';
      if (e.target.value == 'Legal') {
        if (toggle.parentElement.children[1] !== undefined) {
          if (toggle.parentElement.children[1].style.display !== 'none') {
            showAllSublayers('legalIcons');
          }
        }
      }
    }
  }
});

// Enforcement button *****************
var EnforcementLayerControl = L.Control.extend({
  options: {
    position: 'topleft'
  },
  onAdd: function() {
    var container = L.DomUtil.create('div', 'layer-control');
    container.innerHTML = '<input id="enforcement_toggle" type="button" value="Enforcement">'
    L.DomEvent.on(container, 'click', this.toggleOnClick);
    // build legend for subtypes
    L.DomUtil.addClass(container, "legend");
    L.DomUtil.addClass(container, "enforcement");
    var innerWrapper = L.DomUtil.create('div', 'type-wrapper');
    container.appendChild(innerWrapper);

    var types = [
      "Police Station", "Police Service Area Command", "Parks Police",
      "NYPD Division of School Safety", "State Law Enforcement",
      "Federal Law Enforcement", "Headquarters", "Offices & Posts",
      "Training", "Logistics", "Parking", "Tow Pound"
    ];
    for (type in types) {
      var typeItem = L.DomUtil.create('div', 'type-item');
      typeItem.innerHTML = '<input class="enforcement-type" value="' + types[type] + '" type="button">';
      L.DomEvent.on(typeItem, 'click', this.toggleTypeInfo);
      innerWrapper.appendChild(typeItem);
    }
    return container;
  },
  toggleTypeInfo: function (e) {
    if (e.target.value) {
      fadeLegendExceptTarget(e.target);
      hideSublayers('enforcementIcons', getTangramName(e.target.value));
    }
  },
  toggleOnClick: function (e) {
    toggleLegend(e, 'enforcement');
    if (scene) {
      hideLayersExcept('enforcementIcons');
      var toggle = document.getElementById("enforcement_toggle");
      toggle.style.background = '#4169ad';
      toggle.style.color = 'white';
      if (e.target.value == 'Enforcement') {
        if (toggle.parentElement.children[1] !== undefined) {
          if (toggle.parentElement.children[1].style.display !== 'none') {
            showAllSublayers('enforcementIcons');
          }
        }
      }
    }
  }
});

// Courts button *****************
var CourtsLayerControl = L.Control.extend({
  options: {
    position: 'topleft'
  },
  onAdd: function() {
    var container = L.DomUtil.create('div', 'layer-control');
    container.innerHTML = '<input id="courts_toggle" type="button" value="Courts">'
    L.DomEvent.on(container, 'click', this.toggleOnClick);
    // build legend for subtypes
    L.DomUtil.addClass(container, "legend");
    L.DomUtil.addClass(container, "courts");
    var innerWrapper = L.DomUtil.create('div', 'type-wrapper');
    container.appendChild(innerWrapper);

    var types = [
      "Criminal Court",
      "Civil & Criminal Court",
      "Civil Court",
      "Family Court",
      "Immigration Court",
      "Appeals Court",
      "Alternative Court"
    ];
    for (type in types) {
      var typeItem = L.DomUtil.create('div', 'type-item');
      typeItem.innerHTML = '<input class="courts-type" value="' + types[type] + '" type="button">';
      L.DomEvent.on(typeItem, 'click', this.toggleTypeInfo);
      innerWrapper.appendChild(typeItem);
    }
    return container;
  },
  toggleTypeInfo: function (e) {
    if (e.target.value) {
      fadeLegendExceptTarget(e.target);
      hideSublayers('courtsIcons', getTangramName(e.target.value));
    }
  },
  toggleOnClick: function (e) {
    toggleLegend(e, 'courts');
    if (scene) {
      hideLayersExcept('courtsIcons');
      var toggle = document.getElementById("courts_toggle");
      toggle.style.background = '#a53295';
      toggle.style.color = 'white';
      if (e.target.value == 'Courts') {
        if (toggle.parentElement.children[1] !== undefined) {
          if (toggle.parentElement.children[1].style.display !== 'none') {
            showAllSublayers('courtsIcons');
          }
        }
      }
    }
  }
});

// Confinement button **********
var ConfinementLayerControl = L.Control.extend({
  options: {
    position: 'topleft'
  },
  onAdd: function() {
    var container = L.DomUtil.create('div', 'layer-control');
    container.innerHTML = '<input id="confinement_toggle" type="button" value="Confinement">'
    L.DomEvent.on(container, 'click', this.toggleOnClick);
    // build legend for subtypes
    L.DomUtil.addClass(container, "legend");
    L.DomUtil.addClass(container, "confinement");
    var innerWrapper = L.DomUtil.create('div', 'type-wrapper');
    container.appendChild(innerWrapper);
    var types = [
      "Pretrial & Misdemeanor",
      "Felony",
      "Juvenile",
      "Medical & Psychiatric",
      "Immigration Detention"
    ]

    for (type in types) {
      var typeItem = L.DomUtil.create('div', 'type-item');
      typeItem.innerHTML = '<input class="confinement-type" value="' + types[type] + '" type="button">';
      L.DomEvent.on(typeItem, 'click', this.toggleTypeInfo);
      innerWrapper.appendChild(typeItem);
    }
    return container;
  },
  toggleTypeInfo: function (e) {
    if (e.target.value) {
      fadeLegendExceptTarget(e.target);
      hideSublayers('confinementIcons', getTangramName(e.target.value));
    }
  },
  toggleOnClick: function (e) {
    toggleLegend(e, 'confinement');
    if (scene) {
      hideLayersExcept('confinementIcons');
      var toggle = document.getElementById("confinement_toggle");
      toggle.style.background = '#ca2016';
      toggle.style.color = 'white';
      if (e.target.value == 'Confinement') {
        if (toggle.parentElement.children[1] !== undefined) {
          if (toggle.parentElement.children[1].style.display !== 'none') {
            showAllSublayers('confinementIcons');
          }
        }
      }
    }
  }
});

// Alternatives button ****************
var AlternativesLayerControl = L.Control.extend({
  options: {
    position: 'topleft'
  },
  onAdd: function() {
    var container = L.DomUtil.create('div', 'layer-control');
    container.innerHTML = '<input id="alternatives_toggle" type="button" value="Alternatives">'
    L.DomEvent.on(container, 'click', this.toggleOnClick);
    // build legend for subtypes
    L.DomUtil.addClass(container, "legend");
    L.DomUtil.addClass(container, "alternatives");
    var innerWrapper = L.DomUtil.create('div', 'type-wrapper');
    container.appendChild(innerWrapper);
    var types = [
      "Parole Office", "Probation Office", "Juvenile Probation", "Neighborhood Opportuity Network (NeON)", "Alternatives Referral Point",
      "Alternatives Service Provider", "Reentry Services Provider",
    ]
    for (type in types) {
      var typeItem = L.DomUtil.create('div', 'type-item');
      typeItem.innerHTML = '<input class="alternatives-type" value="' + types[type] + '" type="button">';
      L.DomEvent.on(typeItem, 'click', this.toggleTypeInfo);
      innerWrapper.appendChild(typeItem);
    }
    return container;
  },
  toggleTypeInfo: function (e) {
    if (e.target.value) {
      fadeLegendExceptTarget(e.target);
      hideSublayers('alternativesIcons', getTangramName(e.target.value));
    }
  },
  toggleOnClick: function (e) {
    toggleLegend(e, 'alternatives');
    if (scene) {
      hideLayersExcept('alternativesIcons');
      var toggle = document.getElementById("alternatives_toggle");
      toggle.style.background = '#7bcbc2';
      toggle.style.color = 'white';
      if (e.target.value == 'Alternatives') {
        if (toggle.parentElement.children[1] !== undefined) {
          if (toggle.parentElement.children[1].style.display !== 'none') {
            showAllSublayers('alternativesIcons');
          }
        }
      }
    }
  }
});

// Support button ***************
var SupportLayerControl = L.Control.extend({
  options: {
    position: 'topleft'
  },
  onAdd: function() {
    var container = L.DomUtil.create('div', 'layer-control');
    container.innerHTML = '<input id="support_toggle" type="button" value="Support">'
    L.DomEvent.on(container, 'click', this.toggleOnClick);
    // build legend for subtypes
    L.DomUtil.addClass(container, "legend");
    L.DomUtil.addClass(container, "support");
    var innerWrapper = L.DomUtil.create('div', 'type-wrapper');
    container.appendChild(innerWrapper);
    var types = [
      "Administration",
      "Infrastructure",
      "Private Business"
    ]
    for (type in types) {
      var typeItem = L.DomUtil.create('div', 'type-item');
      typeItem.innerHTML = '<input class="support-type" value="' + types[type] + '" type="button">';
      L.DomEvent.on(typeItem, 'click', this.toggleTypeInfo);
      innerWrapper.appendChild(typeItem);
    }
    return container;
  },
  toggleTypeInfo: function (e) {
    if (e.target.value) {
      fadeLegendExceptTarget(e.target);
      hideSublayers('supportIcons', getTangramName(e.target.value));
    }
  },
  toggleOnClick: function (e) {
    toggleLegend(e, 'support');
    if (scene) {
      hideLayersExcept('supportIcons');
      var toggle = document.getElementById("support_toggle");
      toggle.style.background = '#fecf01';
      toggle.style.color = 'white';
      if (e.target.value == 'Support') {
        if (toggle.parentElement.children[1] !== undefined) {
          if (toggle.parentElement.children[1].style.display !== 'none') {
            showAllSublayers('supportIcons');
          }
        }
      }
    }
  }
});



// All layers button ***************
var AllLayersControl = L.Control.extend({
  options: {
    position: 'topleft'
  },
  onAdd: function() {
    var container = L.DomUtil.create('div', 'layer-control');
    container.innerHTML = '<input id="all_toggle" type="button" value="All Layers">'
    L.DomEvent.on(container, 'click', this.toggleOnClick);
    return container;
  },
  toggleOnClick: function (e) {
    // reset menu and show all
    closeAllOpenMenus();
    if (scene) showAllLayers();
  }
});

// highlighted toggle
var HighlightedControl = L.Control.extend({
  options: {
    position: 'topleft'
  },
  onAdd: function() {
    var container = L.DomUtil.create('div', 'layer-control');
    container.innerHTML = '<input id="highlights_toggle" type="button" value="Highlighted">'
    L.DomEvent.on(container, 'click', this.toggleOnClick);
    return container;
  },
  toggleOnClick: function (e) {
    if (scene) {
      toggleHighlighted();
      closeAllOpenMenus();

    }
  }
});

// About button **********
var AboutMapControl = L.Control.extend({
  options: {
    position: 'topleft'
  },
  onAdd: function() {
    var container = L.DomUtil.create('div', 'layer-control');
    container.innerHTML = '<input id="highlights_toggle" type="button" value="About This Map">'
    L.DomEvent.on(container, 'click', this.toggleOnClick);
    return container;
  },
  toggleOnClick: function (e) {
    var visibility = document.querySelector("#aboutPopup").style.display;
    if (visibility == 'none') {
      document.querySelector("#aboutPopup").style.display = 'inline';
    } else {
      document.querySelector("#aboutPopup").style.display = 'none';
    }
  }
});

// Non interactive, static legend
var StaticLegendControl = L.Control.extend({
  options: {
    position: 'topleft'
  },
  onAdd: function() {
    var container = L.DomUtil.create('div', 'layer-control');
    container.innerHTML = '<div class="legend static-legend">'  +
        '<div class="icon"><img src="icons/Legend_5.svg"></div><a href="#" class="legend-tooltip" data-type="direct" alt="Direct category tooltip">Direct</a><br/>' +
        '<div class="icon"><img src="icons/Legend_3.svg"></div><a href="#" class="legend-tooltip" data-type="indirect" alt="Indirect category tooltip">Indirect</a><br/>' +
        '<div class="icon"><img src="icons/Legend_1.svg"></div><a href="#" class="legend-tooltip" data-type="support" alt="Support category tooltip">Support</a><br/>' +
      '</div>';
      return container;
    }
  });


var FullScreenToggle = L.Control.extend({
  options: {
    position: 'bottomright'
  },
  onAdd: function() {
    var container = L.DomUtil.create('div', 'layer-control');
    container.innerHTML = '<div class="leaflet-control-fullscreen leaflet-bar leaflet-control"><a class="leaflet-control-fullscreen-button leaflet-bar-part" href="#" title="View Fullscreen" style="outline: none;"></a></div>';
    L.DomEvent.on(container, 'click', this.toggleOnClick);
    return container;
  },
  toggleOnClick: function(e) { map.toggleFullscreen(); }
});

var enforcementToggleControl = new EnforcementLayerControl();
map.addControl(enforcementToggleControl);
var courtsToggleControl = new CourtsLayerControl();
map.addControl(courtsToggleControl);
var legalToggleControl = new LegalLayerControl();
map.addControl(legalToggleControl);
var confinementToggleControl = new ConfinementLayerControl();
map.addControl(confinementToggleControl);
var alternativesToggleControl = new AlternativesLayerControl();
map.addControl(alternativesToggleControl);
var supportToggleControl = new SupportLayerControl();
map.addControl(supportToggleControl);
var allLayersToggleControl = new AllLayersControl();
map.addControl(allLayersToggleControl);
//var highlightedControl = new HighlightedControl();
//map.addControl(highlightedControl);
var aboutMapControl= new AboutMapControl();
map.addControl(aboutMapControl);
var staticLegendControl = new StaticLegendControl();
map.addControl(staticLegendControl);

var fullScreenToggleControl = new FullScreenToggle();
map.addControl(fullScreenToggleControl);

// Create the popup element
var popup = L.popup();

// Add selection events
function onMapClick(selection) {
  if(selection.feature) {
    var latlng = selection.leaflet_event.latlng;
    var name = selection.feature.properties.NAME;
    var category = selection.feature.properties.CATEGORY;
    var locationType = selection.feature.properties.TYPE;
    var description = selection.feature.properties.DESCRIPTION;
    showPopup(latlng, name, description, category, locationType);
  }
}

// Add Tangram Listener
var scene;
map.on('tangramloaded', function(e) {
  var tangramLayer = e.tangramLayer;
  scene = tangramLayer.scene;
  tangramLayer.setSelectionEvents({
    click: onMapClick,
    hover: onMapHover
  });
});

function showPopup(latlng, name, description, category, locationType) {
  popup
  .setLatLng(latlng)
  .setContent('<h1>' + name + '</h1><p>' + category.toUpperCase() + ': ' + locationType.toUpperCase() + '</p><p>' + description + '</p>')
  .openOn(map);
}
function onMapHover(selection){
  document.getElementById('justiceMap').style.cursor = selection.feature ? 'pointer' : '';
}

// jquery
$(document).ready(function() {
  var copyReady = false;
  copyData = null;
  $.getJSON('data/siteCopy.json', function(data) {
    copyReady = true;
    copyData = data;
    //console.log('set copyData to ', copyData);
  });

  // basic tooltips
  $('a.legend-tooltip').hover(function() {
    // hide all

    var types = ['direct', 'indirect', 'support'];
    var typeToShow = $(this).attr('data-type');

    for (type in types) {
      if (types[type] == typeToShow) {

        // calc the correct offset
        var offsetOfMenu = $('.legend.static-legend').offset();

        $('#' + typeToShow).css('top', offsetOfMenu.top);
        $('#' + typeToShow).show();
      } else {
        $('#' + types[type]).hide();
      }
    }

  }, function() {
      // hovering off
      $('#direct').hide();
      $('#indirect').hide();
      $('#support').hide();
    }
  );
});

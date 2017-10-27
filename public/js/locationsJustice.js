// Map settings
var map = L.Mapzen.map('justiceMap', {
  apiKey: 'mapzen-h1njtmE',
  center: [40.722570, -73.997099],
  zoom: 12,
  minZoom: 7,
  maxZoom: 19,
  maxBounds: [[45, -80], [40, -70]],
  attribution: '© <a href="http://c4sr.columbia.edu/">Center for Spatial Research</a> Columbia University, <a href="http://archleague.org/">Architectural League</a>, <a href="https://www.mapzen.com/rights">Mapzen</a>, <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>, and <a href="https://www.mapzen.com/rights/#services-and-data-sources">others</a>',
  tangramOptions: {
    scene: 'scene.yaml'
  },
});

function hideLayersExcept(layerToIgnore) {
  if (scene) {
    for (i in scene.config.layers.justice_locations) {
      if ((i !== 'data') && (i !== layerToIgnore)) {
        if (scene.config.layers.justice_locations[i].visible == false) {
          scene.config.layers.justice_locations[i].visible = true;
        }
        else {
          scene.config.layers.justice_locations[i].visible = false;
        }
      } else {
      }
    }
    scene.updateConfig();
  }
}

function hideSublayers(parentLayerName, sublayerToShow) {
  if (scene) {
    for (i in scene.config.layers.justice_locations) {
      if (i == parentLayerName) {
        for (j in scene.config.layers.justice_locations[parentLayerName]) {
          if ((j !== 'visible') && (j !== 'filter')) {
            if (j !== sublayerToShow) {
              if (scene.config.layers.justice_locations[parentLayerName][j].visible == false){
                scene.config.layers.justice_locations[parentLayerName][j].visible = true;
              }
              else{
                scene.config.layers.justice_locations[parentLayerName][j].visible = false;
              }
            } else {
            }
          }
        }
      }
    }
  }
}

function getTangramName(subtypeName) {
  switch(subtypeName) {
    // legal
    case "State Prosecutor": return 'StateProsecutor';
    case "Federal Prosecutor": return 'FedralProsecutor';
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
    case "Federal Probation Office": return 'FederalProbation';
    case "Juvenile Probation": return 'JuvenileProbation';
    case "Neighborhood Opportuity Network (NeON)": return 'Neon';
    case "Parole Office": return 'ParoleOffice';
    case "Probation Office": return 'ProbationOffice';
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
      "State Prosecutor", "Federal Prosecutor", "Public Appellate Representation", "Public Defender", "Public Family Court Representation", "Mental Hygiene Legal Services", "Attorney Conduct Grievance Committee"
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
      // to add later when we have copy for the types -> updateItemDetail('enforcement', e.target.value);
      hideSublayers('legalIcons', getTangramName(e.target.value));
    }
  },
  toggleOnClick: function (e) {
    toggleLegend(e, 'legal');
    if (scene) {
      hideLayersExcept('legalIcons');
      document.getElementById("legal_toggle").style.background = '#5db323';
      document.getElementById("legal_toggle").style.color = 'white';
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
    container.innerHTML = '<div id="enforcement"><input id="enforcement_toggle" type="button" value="Enforcement"></div>'
    L.DomEvent.on(container, 'click', this.toggleOnClick);
    // build legend for subtypes
    L.DomUtil.addClass(container, "legend");
    L.DomUtil.addClass(container, "enforcement");
    var innerWrapper = L.DomUtil.create('div', 'type-wrapper');
    container.appendChild(innerWrapper);
    var types = [
      "Tow Pound", "Logistics", "Offices & Posts", "Police Station", "Police Service Area Command",
      "NYPD Division of School Safety", "Parks Police", "State Law Enforcement", "Federal Law Enforcement",
      "Headquarters", "Parking", "Training"
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
      document.getElementById("legal_toggle").style.background = '#5db323';
      document.getElementById("legal_toggle").style.color = 'white';
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
      "Alternative Court",
      "Appeals Court",
      "Civil & Criminal Court",
      "Civil Court",
      "Criminal Court",
      "Family Court",
      "Immigration Court"
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
      document.getElementById("courts_toggle").style.background = '#a53295';
      document.getElementById("courts_toggle").style.color = 'white';
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
      "Felony",
      "Immigration Detention",
      "Juvenile",
      "Medical & Psychiatric",
      "Pretrial & Misdemeanor"
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
      document.getElementById("confinement_toggle").style.background = '#ca2016';
      document.getElementById("confinement_toggle").style.color = 'white';
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
      "Parole Office",
      "Federal Probation Office",
      "Juvenile Probation",
      "Neighborhood Opportuity Network (NeON)",
      "Probation Office"
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
      document.getElementById("alternatives_toggle").style.background = '#7bcbc2';
      document.getElementById("alternatives_toggle").style.color = 'white';
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
      document.getElementById("support_toggle").style.background = '#fecf01';
      document.getElementById("support_toggle").style.color = 'white';
    }
  }
});

// All layers button ***************
var AllLayersLayerControl = L.Control.extend({
  options: {
    position: 'topleft'
  },
  onAdd: function() {
    var container = L.DomUtil.create('div', 'layer-control');
    container.innerHTML = '<input id="allLayers_toggle" type="button" value="All Layers">'
    L.DomEvent.on(container, 'click', this.toggleOnClick);
    return container;
  },
  toggleOnClick: function (e) {
    if (scene) {
      for (i in scene.config.layers.justice_locations) {
        if (i !== 'data') {
          if (scene.config.layers.justice_locations[i].visible == false) {
            scene.config.layers.justice_locations[i].visible = true;
          }
          else {
          }
        } else {
        }
        for (j in scene.config.layers.justice_locations[i]) {
          if ((j !== 'visible') && (j !== 'filter')) {
            if (scene.config.layers.justice_locations[i][j].visible == false){
              scene.config.layers.justice_locations[i][j].visible = true;
            }
            else{
            }
          }
        }
      }
    }
    scene.updateConfig();
    document.getElementById("alllayers_toggle").style.background = '#5db323';
    document.getElementById("alllayers_toggle").style.color = 'white';
  }
});


var FullScreenToggle = L.Control.extend({
  options: {
    position: 'bottomleft'
  },
  onAdd: function() {
    var container = L.DomUtil.create('div', 'layer-control');
    container.innerHTML = '<div class="leaflet-control-fullscreen leaflet-bar leaflet-control"><a class="leaflet-control-fullscreen-button leaflet-bar-part" href="#" title="View Fullscreen" style="outline: none;"></a></div>';
    L.DomEvent.on(container, 'click', this.toggleOnClick);
    return container;
  },
  toggleOnClick: function(e) { map.toggleFullscreen(); }
});

// About button **********
var AboutMapControl = L.Control.extend({
  options: {
    position: 'bottomleft'
  },
  onAdd: function() {
    var container = L.DomUtil.create('div', 'about-control');
    container.innerHTML = 'About this Map'
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

var legalToggleControl = new LegalLayerControl();
map.addControl(legalToggleControl);
var enforcementToggleControl = new EnforcementLayerControl();
map.addControl(enforcementToggleControl);
var courtsToggleControl = new CourtsLayerControl();
map.addControl(courtsToggleControl);
var confinementToggleControl = new ConfinementLayerControl();
map.addControl(confinementToggleControl);
var alternativesToggleControl = new AlternativesLayerControl();
map.addControl(alternativesToggleControl);
var supportToggleControl = new SupportLayerControl();
map.addControl(supportToggleControl);
var allLayersToggleControl = new AllLayersLayerControl();
map.addControl(allLayersToggleControl);
var aboutMapControl= new AboutMapControl();
map.addControl(aboutMapControl);
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
  console.log("jquery ready");
  // load texts via json
  var copyReady = false;
  copyData = null;
  $.getJSON('data/siteCopy.json', function(data) {
    copyReady = true;
    console.log(data);
    copyData = data;
    console.log('set copyData to ', copyData);
  });
});

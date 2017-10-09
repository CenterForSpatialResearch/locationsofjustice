

      // Map settings
      var map = L.Mapzen.map('justiceMap', {
        apiKey: 'mapzen-h1njtmE',
        center: [40.722570, -73.997099],
        zoom: 12,
        minZoom: 7,
        maxZoom: 19,
        maxBounds: [[44.292059, -78.209836], [36.990458, -68.924623]],
        attribution: '© <a href="http://c4sr.columbia.edu/">Center for Spatial Research</a>, <a href="http://archleague.org/">Architectural League</a>, <a href="https://www.mapzen.com/rights">Mapzen</a>, <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>, and <a href="https://www.mapzen.com/rights/#services-and-data-sources">others</a>',
        tangramOptions: {
          scene: 'sceneTest.yaml'
        },
        fullscreenControl: true
      });

      // Add layer toggle
      var LegalLayerControl = L.Control.extend({
        options: {
          position: 'topleft'
        },
        onAdd: function() {
          var container = L.DomUtil.create('div', 'layer-control');
          container.innerHTML = '<input id="legal_toggle" type="button" value="Legal">'
          L.DomEvent.on(container, 'click', this.toggleOnClick);
          return container;
        },
        toggleOnClick: function (e) {

           var layerStatus = scene.config.layers.justice_locations.legalIcons.visible;
          if (scene) {
            if (layerStatus == true){
              document.getElementById("legal_toggle").style.background = 'rgba(93,179,35,0.25)';
              document.getElementById("legal_toggle").style.color = '#4C4C4C';
              layerStatus = false;
            }
            else {
              document.getElementById("legal_toggle").style.background = '#5db323';
              document.getElementById("legal_toggle").style.color = 'white';
              layerStatus = true;
            }
            scene.config.layers.justice_locations.legalIcons.visible = layerStatus;
            scene.updateConfig();
          }
        }
      });
      var EnforcementLayerControl = L.Control.extend({
        options: {
          position: 'topleft'
        },
        onAdd: function() {
          var container = L.DomUtil.create('div', 'layer-control');
          container.innerHTML = '<input id="enforcement_toggle" type="button" value="Enforcement">'
          L.DomEvent.on(container, 'click', this.toggleOnClick);
          return container;
        },
        toggleOnClick: function (e) {

             // add jquery here to show hide sub-categories
            /*

            Police stations
NYCHA Patrol Command
Police Parking
Police Administration
Police Special Units
Police Logistics
Police Training
School Safety Unit & PEP
            

            */

          var layerStatus = scene.config.layers.justice_locations.enforcementIcons.visible;
          if (scene) {
            if (layerStatus == true){
              document.getElementById("enforcement_toggle").style.background = 'rgba(65,105,173,0.25)';
              document.getElementById("enforcement_toggle").style.color = '#4C4C4C';
              layerStatus = false;
            }
            else {
              document.getElementById("enforcement_toggle").style.background = '#4169ad';
              document.getElementById("enforcement_toggle").style.color = 'white';
              layerStatus = true;
            }
            scene.config.layers.justice_locations.enforcementIcons.visible = layerStatus;
            scene.updateConfig();
          }
        }
      });
      var CourtsLayerControl = L.Control.extend({
        options: {
          position: 'topleft'
        },
        onAdd: function() {
          var container = L.DomUtil.create('div', 'layer-control');
          container.innerHTML = '<input id="courts_toggle" type="button" value="Courts">'
          L.DomEvent.on(container, 'click', this.toggleOnClick);
          return container;
        },
        toggleOnClick: function (e) {
          var layerStatus = scene.config.layers.justice_locations.courtsIcons.visible;
          if (scene) {
            if (layerStatus == true){
              document.getElementById("courts_toggle").style.background = 'rgba(165,50,149,0.25)';
              document.getElementById("courts_toggle").style.color = '#4C4C4C';
              layerStatus = false;
            }
            else {
              document.getElementById("courts_toggle").style.background = '#a53295';
              document.getElementById("courts_toggle").style.color = 'white';
              layerStatus = true;
            }
            scene.config.layers.justice_locations.courtsIcons.visible = layerStatus;
            scene.updateConfig();
          }
        }
      });
      var ConfinementLayerControl = L.Control.extend({
        options: {
          position: 'topleft'
        },
        onAdd: function() {
          var container = L.DomUtil.create('div', 'layer-control');
          container.innerHTML = '<input id="confinement_toggle" type="button" value="Confinement">'
          L.DomEvent.on(container, 'click', this.toggleOnClick);
          return container;
        },
        toggleOnClick: function (e) {
          var layerStatus = scene.config.layers.justice_locations.confinementIcons.visible;
          if (scene) {
            if (layerStatus == true){
              document.getElementById("confinement_toggle").style.background = 'rgba(202,32,22,0.25)';
              document.getElementById("confinement_toggle").style.color = '#4C4C4C';
              layerStatus = false;
            }
            else {
              document.getElementById("confinement_toggle").style.background = '#ca2016';
              document.getElementById("confinement_toggle").style.color = 'white';
              layerStatus = true;
            }
            scene.config.layers.justice_locations.confinementIcons.visible = layerStatus;
            scene.updateConfig();
          }
        }
      });
      var AlternativesLayerControl = L.Control.extend({
        options: {
          position: 'topleft'
        },
        onAdd: function() {
          var container = L.DomUtil.create('div', 'layer-control');
          container.innerHTML = '<input id="alternatives_toggle" type="button" value="Alternatives">'
          L.DomEvent.on(container, 'click', this.toggleOnClick);
          return container;
        },
        toggleOnClick: function (e) {
          var layerStatus = scene.config.layers.justice_locations.alternativesIcons.visible;
          if (scene) {
            if (layerStatus == true){
              document.getElementById("alternatives_toggle").style.background = 'rgba(123,203,194,0.25)';
              document.getElementById("alternatives_toggle").style.color = '#4C4C4C';
              layerStatus = false;
            }
            else {
              document.getElementById("alternatives_toggle").style.background = '#7bcbc2';
              document.getElementById("alternatives_toggle").style.color = 'white';
              layerStatus = true;
            }
            scene.config.layers.justice_locations.alternativesIcons.visible = layerStatus;
            scene.updateConfig();
          }
        }
      });
      var InfrastructureLayerControl = L.Control.extend({
        options: {
          position: 'topleft'
        },
        onAdd: function() {
          var container = L.DomUtil.create('div', 'layer-control');
          container.innerHTML = '<input id="infrastructure_toggle" type="button" value="Infrastructure">'
          L.DomEvent.on(container, 'click', this.toggleOnClick);
          return container;
        },
        toggleOnClick: function (e) {
          var layerStatus = scene.config.layers.justice_locations.infrastructureIcons.visible;
          if (scene) {
            if (layerStatus == true){
              document.getElementById("infrastructure_toggle").style.background = 'rgba(254,207,1,0.25)';
              document.getElementById("infrastructure_toggle").style.color = '#4C4C4C';
              layerStatus = false;
            }
            else {
              document.getElementById("infrastructure_toggle").style.background = '#fecf01';
              document.getElementById("infrastructure_toggle").style.color = '#4C4C4C';
              layerStatus = true;
            }
            scene.config.layers.justice_locations.infrastructureIcons.visible = layerStatus;
            scene.updateConfig();
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
      var infrastructureToggleControl = new InfrastructureLayerControl();
      map.addControl(infrastructureToggleControl);

      // Create the popup element
      var popup = L.popup();

      // Add selection events
      function onMapClick(selection) {
        if(selection.feature) {
          var latlng = selection.leaflet_event.latlng;
          var name = selection.feature.properties.NAME;
          var category = selection.feature.properties.CATEGORY;
          var subcategory = selection.feature.properties.SUBCATEGORY;
          var description = selection.feature.properties.DESCRIPTION;
          showPopup(latlng, name, description, category, subcategory);
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

      function showPopup(latlng, name, description, category, subcategory) {
        popup
          .setLatLng(latlng)
          .setContent('<h1>' + name + '</h1><p>' + description + '</p><p>' + category.toUpperCase() + ': ' + subcategory.toUpperCase() + '</p>')
          .openOn(map);
      }

      function onMapHover(selection){
        document.getElementById('justiceMap').style.cursor = selection.feature ? 'pointer' : '';
      }
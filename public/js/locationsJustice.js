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
      });

      // Legal button **********
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
          var legalLayerStatus = scene.config.layers.justice_locations.legalIcons.visible;
          var enforcementLayerStatus = scene.config.layers.justice_locations.enforcementIcons.visible;
          var courtsLayerStatus = scene.config.layers.justice_locations.courtsIcons.visible;
          var confinementLayerStatus = scene.config.layers.justice_locations.confinementIcons.visible;
          var alternativesLayerStatus = scene.config.layers.justice_locations.alternativesIcons.visible;
          var infrastructureLayerStatus = scene.config.layers.justice_locations.infrastructureIcons.visible;
          if (scene) {
            if (legalLayerStatus == true){
            }
            else {
              document.getElementById("legal_toggle").style.background = '#5db323';
              document.getElementById("legal_toggle").style.color = 'white';
              legalLayerStatus = true;
            }
            scene.config.layers.justice_locations.legalIcons.visible = legalLayerStatus;
            if (enforcementLayerStatus == true){
              document.getElementById("enforcement_toggle").style.background = 'rgba(65,105,173,0.25)';
              document.getElementById("enforcement_toggle").style.color = '#4C4C4C';
              enforcementLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.enforcementIcons.visible = enforcementLayerStatus;
            if (courtsLayerStatus == true){
              document.getElementById("courts_toggle").style.background = 'rgba(165,50,149,0.25)';
              document.getElementById("courts_toggle").style.color = '#4C4C4C';
              courtsLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.courtsIcons.visible = courtsLayerStatus;
            if (confinementLayerStatus == true){
              document.getElementById("confinement_toggle").style.background = 'rgba(202,32,22,0.25)';
              document.getElementById("confinement_toggle").style.color = '#4C4C4C';
              confinementLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.confinementIcons.visible = confinementLayerStatus;
            if (alternativesLayerStatus == true){
              document.getElementById("alternatives_toggle").style.background = 'rgba(123,203,194,0.25)';
              document.getElementById("alternatives_toggle").style.color = '#4C4C4C';
              alternativesLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.alternativesIcons.visible = alternativesLayerStatus;
            if (infrastructureLayerStatus == true){
              document.getElementById("infrastructure_toggle").style.background = 'rgba(254,207,1,0.25)';
              document.getElementById("infrastructure_toggle").style.color = '#4C4C4C';
              infrastructureLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.infrastructureIcons.visible = infrastructureLayerStatus;
            scene.updateConfig();
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
          container.innerHTML = '<div id="enforcement"><input id="enforcement_toggle" type="button" value="Enforcement"><div class="enforcement-legend"></div>'
          L.DomEvent.on(container, 'click', this.toggleOnClick);
          L.DomUtil.addClass(container, "legend");
          L.DomUtil.addClass(container, "enforcement");
          
          // get data from d3
          d3.request("data/TestLocations.geojson")
            .mimeType("application/json")
            .response(function(xhr) { return JSON.parse(xhr.responseText); })
            .get(function(data) {

              d3.select(".enforcement-legend").transition()
                .style('max-width', function() { return '100px';})
                .style('background', function() { return 'white';})
                .style('margin', function() { return '2px';})
                .style('padding', function() { return '2px';})
                .style('overflow', function() { return 'scroll'})
                //.style('display', function() { return 'none'});
            

                // calculate legend dynamically based on data
                var subLegend = {};
                    subLegend.itemsTotal = 0;
                    subLegend.subcategories = [];

                data.features.forEach(function(d) {
                  if (d.properties.CATEGORY == 'Enforcement') {
                    subLegend.itemsTotal += 1;
                    var sub = {};
                        sub.name = d.properties.SUBCATEGORY;
                    
                        // add it to subcategories or increment
                    var found = false;
                    subLegend.subcategories.forEach(function(s) {
                      if (s.name == sub.name) {
                        s.count += 1;
                        s.gravity += d.properties.GRAVITY;  
                        found = true;
                      }
                    });

                    if (!found) {
                      // add it
                      sub.count = 0;
                      sub.gravity = d.properties.GRAVITY;
                      subLegend.subcategories.push(sub);
                    }
                  }
                });

                // build d3 color scale for background color based on range
                var color = d3.scaleLinear()
                  .domain([1, subLegend.itemsTotal])
                  .range(["#4169ad", "#ffffff"]);
                  //console.log('color20', color(20)); // "#9a3439"
    
                // get percentages now that all the items have been examined and 
                // insert DOM elements inline (cant use d3 since it cant operate on dynamic leaflet DOM elements)
                subLegend.subcategories.forEach(function(s) {
                  s.percent = s.count / subLegend.itemsTotal;
                  
                  // use DOM fragment for performance
                  var fragment = document.createDocumentFragment();
                  var el = document.createElement('div');
                      el.innerText = s.name + " (" + s.count + ")";
                      // from color scale
                      el.style['background-color'] = color(s.count);
                      el.style['color'] = 'white';
                      
                      if (s.percent > 0.5) {
                        el.style['color'] = 'black';
                      }
                
                      el.style['padding'] = '2px 2px 2px 5px';
                      el.style['margin'] = '2px';
                      el.style['border-radius'] = '5px';
                    fragment.appendChild(el);
                    document.querySelector(".enforcement-legend").appendChild(fragment);
                });              
              }); // done with d3.data


          return container;
        },
        toggleOnClick: function (e) {

          // maybe show hide the sublegend
          //d3.select(".enforcement-legend").transition()
            //.style('display', function() { return 'inline';});

              var legalLayerStatus = scene.config.layers.justice_locations.legalIcons.visible;
              var enforcementLayerStatus = scene.config.layers.justice_locations.enforcementIcons.visible;
              var courtsLayerStatus = scene.config.layers.justice_locations.courtsIcons.visible;
              var confinementLayerStatus = scene.config.layers.justice_locations.confinementIcons.visible;
              var alternativesLayerStatus = scene.config.layers.justice_locations.alternativesIcons.visible;
              var infrastructureLayerStatus = scene.config.layers.justice_locations.infrastructureIcons.visible;
              if (scene) {
                if (legalLayerStatus == true){
                  document.getElementById("legal_toggle").style.background = 'rgba(93,179,35,0.25)';
                  document.getElementById("legal_toggle").style.color = '#4C4C4C';
                  legalLayerStatus = false;
                }
                else {
                }
                scene.config.layers.justice_locations.legalIcons.visible = legalLayerStatus;
                if (enforcementLayerStatus == true){
                }
                else {
                  document.getElementById("enforcement_toggle").style.background = '#4169ad';
                  document.getElementById("enforcement_toggle").style.color = 'white';
                  enforcementLayerStatus = true;
                }
                scene.config.layers.justice_locations.enforcementIcons.visible = enforcementLayerStatus;
                if (courtsLayerStatus == true){
                  document.getElementById("courts_toggle").style.background = 'rgba(165,50,149,0.25)';
                  document.getElementById("courts_toggle").style.color = '#4C4C4C';
                  courtsLayerStatus = false;
                }
                else {
                }
                scene.config.layers.justice_locations.courtsIcons.visible = courtsLayerStatus;
                if (confinementLayerStatus == true){
                  document.getElementById("confinement_toggle").style.background = 'rgba(202,32,22,0.25)';
                  document.getElementById("confinement_toggle").style.color = '#4C4C4C';
                  confinementLayerStatus = false;
                }
                else {
                }
                scene.config.layers.justice_locations.confinementIcons.visible = confinementLayerStatus;
                if (alternativesLayerStatus == true){
                  document.getElementById("alternatives_toggle").style.background = 'rgba(123,203,194,0.25)';
                  document.getElementById("alternatives_toggle").style.color = '#4C4C4C';
                  alternativesLayerStatus = false;
                }
                else {
                }
                scene.config.layers.justice_locations.alternativesIcons.visible = alternativesLayerStatus;
                if (infrastructureLayerStatus == true){
                  document.getElementById("infrastructure_toggle").style.background = 'rgba(254,207,1,0.25)';
                  document.getElementById("infrastructure_toggle").style.color = '#4C4C4C';
                  infrastructureLayerStatus = false;
                }
                else {
                }
                scene.config.layers.justice_locations.infrastructureIcons.visible = infrastructureLayerStatus;
                scene.updateConfig();
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
          return container;
        },
        toggleOnClick: function (e) {
          var legalLayerStatus = scene.config.layers.justice_locations.legalIcons.visible;
          var enforcementLayerStatus = scene.config.layers.justice_locations.enforcementIcons.visible;
          var courtsLayerStatus = scene.config.layers.justice_locations.courtsIcons.visible;
          var confinementLayerStatus = scene.config.layers.justice_locations.confinementIcons.visible;
          var alternativesLayerStatus = scene.config.layers.justice_locations.alternativesIcons.visible;
          var infrastructureLayerStatus = scene.config.layers.justice_locations.infrastructureIcons.visible;
          if (scene) {
            if (legalLayerStatus == true){
              document.getElementById("legal_toggle").style.background = 'rgba(93,179,35,0.25)';
              document.getElementById("legal_toggle").style.color = '#4C4C4C';
              legalLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.legalIcons.visible = legalLayerStatus;
            if (enforcementLayerStatus == true){
              document.getElementById("enforcement_toggle").style.background = 'rgba(65,105,173,0.25)';
              document.getElementById("enforcement_toggle").style.color = '#4C4C4C';
              enforcementLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.enforcementIcons.visible = enforcementLayerStatus;
            if (courtsLayerStatus == true){
            }
            else {
              document.getElementById("courts_toggle").style.background = '#a53295';
              document.getElementById("courts_toggle").style.color = 'white';
              courtsLayerStatus = true;
            }
            scene.config.layers.justice_locations.courtsIcons.visible = courtsLayerStatus;
            if (confinementLayerStatus == true){
              document.getElementById("confinement_toggle").style.background = 'rgba(202,32,22,0.25)';
              document.getElementById("confinement_toggle").style.color = '#4C4C4C';
              confinementLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.confinementIcons.visible = confinementLayerStatus;
            if (alternativesLayerStatus == true){
              document.getElementById("alternatives_toggle").style.background = 'rgba(123,203,194,0.25)';
              document.getElementById("alternatives_toggle").style.color = '#4C4C4C';
              alternativesLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.alternativesIcons.visible = alternativesLayerStatus;
            if (infrastructureLayerStatus == true){
              document.getElementById("infrastructure_toggle").style.background = 'rgba(254,207,1,0.25)';
              document.getElementById("infrastructure_toggle").style.color = '#4C4C4C';
              infrastructureLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.infrastructureIcons.visible = infrastructureLayerStatus;
            scene.updateConfig();
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
          return container;
        },
        toggleOnClick: function (e) {
          var legalLayerStatus = scene.config.layers.justice_locations.legalIcons.visible;
          var enforcementLayerStatus = scene.config.layers.justice_locations.enforcementIcons.visible;
          var courtsLayerStatus = scene.config.layers.justice_locations.courtsIcons.visible;
          var confinementLayerStatus = scene.config.layers.justice_locations.confinementIcons.visible;
          var alternativesLayerStatus = scene.config.layers.justice_locations.alternativesIcons.visible;
          var infrastructureLayerStatus = scene.config.layers.justice_locations.infrastructureIcons.visible;
          if (scene) {
            if (legalLayerStatus == true){
              document.getElementById("legal_toggle").style.background = 'rgba(93,179,35,0.25)';
              document.getElementById("legal_toggle").style.color = '#4C4C4C';
              legalLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.legalIcons.visible = legalLayerStatus;
            if (enforcementLayerStatus == true){
              document.getElementById("enforcement_toggle").style.background = 'rgba(65,105,173,0.25)';
              document.getElementById("enforcement_toggle").style.color = '#4C4C4C';
              enforcementLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.enforcementIcons.visible = enforcementLayerStatus;
            if (courtsLayerStatus == true){
              document.getElementById("courts_toggle").style.background = 'rgba(165,50,149,0.25)';
              document.getElementById("courts_toggle").style.color = '#4C4C4C';
              courtsLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.courtsIcons.visible = courtsLayerStatus;
            if (confinementLayerStatus == true){
            }
            else {
              document.getElementById("confinement_toggle").style.background = '#ca2016';
              document.getElementById("confinement_toggle").style.color = 'white';
              confinementLayerStatus = true;
            }
            scene.config.layers.justice_locations.confinementIcons.visible = confinementLayerStatus;
            if (alternativesLayerStatus == true){
              document.getElementById("alternatives_toggle").style.background = 'rgba(123,203,194,0.25)';
              document.getElementById("alternatives_toggle").style.color = '#4C4C4C';
              alternativesLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.alternativesIcons.visible = alternativesLayerStatus;
            if (infrastructureLayerStatus == true){
              document.getElementById("infrastructure_toggle").style.background = 'rgba(254,207,1,0.25)';
              document.getElementById("infrastructure_toggle").style.color = '#4C4C4C';
              infrastructureLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.infrastructureIcons.visible = infrastructureLayerStatus;
            scene.updateConfig();
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
          return container;
        },
        toggleOnClick: function (e) {
          var legalLayerStatus = scene.config.layers.justice_locations.legalIcons.visible;
          var enforcementLayerStatus = scene.config.layers.justice_locations.enforcementIcons.visible;
          var courtsLayerStatus = scene.config.layers.justice_locations.courtsIcons.visible;
          var confinementLayerStatus = scene.config.layers.justice_locations.confinementIcons.visible;
          var alternativesLayerStatus = scene.config.layers.justice_locations.alternativesIcons.visible;
          var infrastructureLayerStatus = scene.config.layers.justice_locations.infrastructureIcons.visible;
          if (scene) {
            if (legalLayerStatus == true){
              document.getElementById("legal_toggle").style.background = 'rgba(93,179,35,0.25)';
              document.getElementById("legal_toggle").style.color = '#4C4C4C';
              legalLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.legalIcons.visible = legalLayerStatus;
            if (enforcementLayerStatus == true){
              document.getElementById("enforcement_toggle").style.background = 'rgba(65,105,173,0.25)';
              document.getElementById("enforcement_toggle").style.color = '#4C4C4C';
              enforcementLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.enforcementIcons.visible = enforcementLayerStatus;
            if (courtsLayerStatus == true){
              document.getElementById("courts_toggle").style.background = 'rgba(165,50,149,0.25)';
              document.getElementById("courts_toggle").style.color = '#4C4C4C';
              courtsLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.courtsIcons.visible = courtsLayerStatus;
            if (confinementLayerStatus == true){
              document.getElementById("confinement_toggle").style.background = 'rgba(202,32,22,0.25)';
              document.getElementById("confinement_toggle").style.color = '#4C4C4C';
              confinementLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.confinementIcons.visible = confinementLayerStatus;
            if (alternativesLayerStatus == true){
            }
            else {
              document.getElementById("alternatives_toggle").style.background = '#7bcbc2';
              document.getElementById("alternatives_toggle").style.color = 'white';
              alternativesLayerStatus = true;
            }
            scene.config.layers.justice_locations.alternativesIcons.visible = alternativesLayerStatus;
            if (infrastructureLayerStatus == true){
              document.getElementById("infrastructure_toggle").style.background = 'rgba(254,207,1,0.25)';
              document.getElementById("infrastructure_toggle").style.color = '#4C4C4C';
              infrastructureLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.infrastructureIcons.visible = infrastructureLayerStatus;
            scene.updateConfig();
          }
        }
      });

      // Infrastructure button ***************
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
          var legalLayerStatus = scene.config.layers.justice_locations.legalIcons.visible;
          var enforcementLayerStatus = scene.config.layers.justice_locations.enforcementIcons.visible;
          var courtsLayerStatus = scene.config.layers.justice_locations.courtsIcons.visible;
          var confinementLayerStatus = scene.config.layers.justice_locations.confinementIcons.visible;
          var alternativesLayerStatus = scene.config.layers.justice_locations.alternativesIcons.visible;
          var infrastructureLayerStatus = scene.config.layers.justice_locations.infrastructureIcons.visible;
          if (scene) {
            if (legalLayerStatus == true){
              document.getElementById("legal_toggle").style.background = 'rgba(93,179,35,0.25)';
              document.getElementById("legal_toggle").style.color = '#4C4C4C';
              legalLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.legalIcons.visible = legalLayerStatus;
            if (enforcementLayerStatus == true){
              document.getElementById("enforcement_toggle").style.background = 'rgba(65,105,173,0.25)';
              document.getElementById("enforcement_toggle").style.color = '#4C4C4C';
              enforcementLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.enforcementIcons.visible = enforcementLayerStatus;
            if (courtsLayerStatus == true){
              document.getElementById("courts_toggle").style.background = 'rgba(165,50,149,0.25)';
              document.getElementById("courts_toggle").style.color = '#4C4C4C';
              courtsLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.courtsIcons.visible = courtsLayerStatus;
            if (confinementLayerStatus == true){
              document.getElementById("confinement_toggle").style.background = 'rgba(202,32,22,0.25)';
              document.getElementById("confinement_toggle").style.color = '#4C4C4C';
              confinementLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.confinementIcons.visible = confinementLayerStatus;
            if (alternativesLayerStatus == true){
              document.getElementById("alternatives_toggle").style.background = 'rgba(123,203,194,0.25)';
              document.getElementById("alternatives_toggle").style.color = '#4C4C4C';
              alternativesLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.alternativesIcons.visible = alternativesLayerStatus;
            if (infrastructureLayerStatus == true){
            }
            else {
              document.getElementById("infrastructure_toggle").style.background = '#fecf01';
              document.getElementById("infrastructure_toggle").style.color = '#4C4C4C';
              infrastructureLayerStatus = true;
            }
            scene.config.layers.justice_locations.infrastructureIcons.visible = infrastructureLayerStatus;
            scene.updateConfig();
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
          var legalLayerStatus = scene.config.layers.justice_locations.legalIcons.visible;
          var enforcementLayerStatus = scene.config.layers.justice_locations.enforcementIcons.visible;
          var courtsLayerStatus = scene.config.layers.justice_locations.courtsIcons.visible;
          var confinementLayerStatus = scene.config.layers.justice_locations.confinementIcons.visible;
          var alternativesLayerStatus = scene.config.layers.justice_locations.alternativesIcons.visible;
          var infrastructureLayerStatus = scene.config.layers.justice_locations.infrastructureIcons.visible;
          if (scene) {
            if (legalLayerStatus == false){
              document.getElementById("legal_toggle").style.background = '#5db323';
              document.getElementById("legal_toggle").style.color = 'white';
              legalLayerStatus = true;
            }
            else {
            }
            scene.config.layers.justice_locations.legalIcons.visible = legalLayerStatus;
            if (enforcementLayerStatus == false){
              document.getElementById("enforcement_toggle").style.background = '#4169ad';
              document.getElementById("enforcement_toggle").style.color = 'white';
              enforcementLayerStatus = true;
            }
            else {
            }
            scene.config.layers.justice_locations.enforcementIcons.visible = enforcementLayerStatus;
            if (courtsLayerStatus == false){
              document.getElementById("courts_toggle").style.background = '#a53295';
              document.getElementById("courts_toggle").style.color = 'white';
              courtsLayerStatus = true;
            }
            else {
            }
            scene.config.layers.justice_locations.courtsIcons.visible = courtsLayerStatus;
            if (confinementLayerStatus == false){
              document.getElementById("confinement_toggle").style.background = '#ca2016';
              document.getElementById("confinement_toggle").style.color = 'white';
              confinementLayerStatus = true;
            }
            else {
            }
            scene.config.layers.justice_locations.confinementIcons.visible = confinementLayerStatus;
            if (alternativesLayerStatus == false){
              document.getElementById("alternatives_toggle").style.background = '#7bcbc2';
              document.getElementById("alternatives_toggle").style.color = 'white';
              alternativesLayerStatus = true;
            }
            else {
            }
            scene.config.layers.justice_locations.alternativesIcons.visible = alternativesLayerStatus;
            if (infrastructureLayerStatus == false){
              document.getElementById("infrastructure_toggle").style.background = '#fecf01';
              document.getElementById("infrastructure_toggle").style.color = '#4C4C4C';
              infrastructureLayerStatus = true;
            }
            else {
            }
            scene.config.layers.justice_locations.infrastructureIcons.visible = infrastructureLayerStatus;
            scene.updateConfig();
          }
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
      var allLayersToggleControl = new AllLayersLayerControl();
      map.addControl(allLayersToggleControl);
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

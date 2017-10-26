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
          var supportLayerStatus = scene.config.layers.justice_locations.supportIcons.visible;


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
            if (supportLayerStatus == true){
              document.getElementById("support_toggle").style.background = 'rgba(254,207,1,0.25)';
              document.getElementById("support_toggle").style.color = '#4C4C4C';
              supportLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.supportIcons.visible = supportLayerStatus;
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
          container.innerHTML = '<div id="enforcement"><input id="enforcement_toggle" type="button" value="Enforcement"></div>'
          L.DomEvent.on(container, 'click', this.toggleOnClick);
          L.DomUtil.addClass(container, "legend");
          L.DomUtil.addClass(container, "enforcement");

          // create container to hold the entire menu for show/hide
          var innerWrapper = L.DomUtil.create('div', 'type-wrapper');
          container.appendChild(innerWrapper);

          // create all elements inside this
          // no jquery loaded yet to static DOM is best for this

          var types = [
            "Tow Pound",
            "Logistics",
            "Offices & Posts",
            "Police Station",
            "Police Service Area Command",
            "NYPD Division of School Safety",
            "Parks Police",
            "State Law Enforcement",
            "Federal Law Enforcement",
            "Headquarters",
            "Parking",
            "Training"
          ];



          /*for (type in types) {
            var typeItem = L.DomUtil.create('div', 'type-item');
            typeItem.innerHTML = '<input class="enforcement-type" value="' + types[type] + '" type="button">';
            L.DomEvent.on(typeItem, 'click', this.toggleTypeInfo);
            innerWrapper.appendChild(typeItem);
          }
          */



          var typeInfo = L.DomUtil.create('div', 'type-info');
          typeInfo.innerHTML = 'Some starting copy? Maybe the text for the very first item and have that highlighted? Lorem ipsum...';

          innerWrapper.appendChild(typeInfo);




          return container;
        },

        toggleTypeInfo: function (e) {
          if (e.target.value) {
            console.log("click on subitem in enforcement menu with value", e.target.value);
            
            fadeLegendExceptTarget(e.target);
            updateItemDetail('enforcement', e.target.value);


            // toggling statuses here has no effect...
            
            
            
            
          }

        },



        toggleOnClick: function (e) {
          console.log(" ------- toggleOnCLick called for input of parent item, updating layer statuses");
          //toggleLegend(e, 'enforcement');
          





              var legalLayerStatus = scene.config.layers.justice_locations.legalIcons.visible;
              var enforcementLayerStatus = scene.config.layers.justice_locations.enforcementIcons.visible;
              var courtsLayerStatus = scene.config.layers.justice_locations.courtsIcons.visible;
              var confinementLayerStatus = scene.config.layers.justice_locations.confinementIcons.visible;
              var alternativesLayerStatus = scene.config.layers.justice_locations.alternativesIcons.visible;
              var supportLayerStatus = scene.config.layers.justice_locations.supportIcons.visible;

              var enf_NYPDAdmin = scene.config.layers.justice_locations.enforcementIcons.NYPDAdmin.visible;
              var enf_NYPDSchoolSafety = scene.config.layers.justice_locations.enforcementIcons.NYPDSchoolSafety.visible;
              var enf_NYPDHQ = scene.config.layers.justice_locations.enforcementIcons.NYPDHeadquarters.visible;
              var enf_NYPDLogistics = scene.config.layers.justice_locations.enforcementIcons.NYPDLogistics.visible;
              var enf_NYPDServiceArea = scene.config.layers.justice_locations.enforcementIcons.NYPDServiceArea.visible;
              
              //console.dir(scene.config.layers.justice_locations.enforcementIcons);




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


                  // adding a new control now also doesnt work because it cant add it to the map after Tangram 
                  // has initialized
                  
                  // if i do this it hides everything
                  //enforcementLayerStatus = false;
                  
                  // however toggling these doesn't have any effects
                  enf_NYPDAdmin = false;
                  enf_NYPDSchoolSafety = false;
                  enf_NYPDHQ = false;
                  scene.updateConfig();
                  // etc...

                  
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
                if (supportLayerStatus == true){
                  document.getElementById("support_toggle").style.background = 'rgba(254,207,1,0.25)';
                  document.getElementById("support_toggle").style.color = '#4C4C4C';
                  supportLayerStatus = false;
                }
                else {
                }
                scene.config.layers.justice_locations.supportIcons.visible = supportLayerStatus;
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
          var supportLayerStatus = scene.config.layers.justice_locations.supportIcons.visible;
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
            if (supportLayerStatus == true){
              document.getElementById("support_toggle").style.background = 'rgba(254,207,1,0.25)';
              document.getElementById("support_toggle").style.color = '#4C4C4C';
              supportLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.supportIcons.visible = supportLayerStatus;
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
          var supportLayerStatus = scene.config.layers.justice_locations.supportIcons.visible;
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
            if (supportLayerStatus == true){
              document.getElementById("support_toggle").style.background = 'rgba(254,207,1,0.25)';
              document.getElementById("support_toggle").style.color = '#4C4C4C';
              supportLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.supportIcons.visible = supportLayerStatus;
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
          var supportLayerStatus = scene.config.layers.justice_locations.supportIcons.visible;
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
            if (supportLayerStatus == true){
              document.getElementById("support_toggle").style.background = 'rgba(254,207,1,0.25)';
              document.getElementById("support_toggle").style.color = '#4C4C4C';
              supportLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.supportIcons.visible = supportLayerStatus;
            scene.updateConfig();
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
          return container;
        },
        toggleOnClick: function (e) {
          var legalLayerStatus = scene.config.layers.justice_locations.legalIcons.visible;
          var enforcementLayerStatus = scene.config.layers.justice_locations.enforcementIcons.visible;
          var courtsLayerStatus = scene.config.layers.justice_locations.courtsIcons.visible;
          var confinementLayerStatus = scene.config.layers.justice_locations.confinementIcons.visible;
          var alternativesLayerStatus = scene.config.layers.justice_locations.alternativesIcons.visible;
          var supportLayerStatus = scene.config.layers.justice_locations.supportIcons.visible;
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
            if (supportLayerStatus == true){
            }
            else {
              document.getElementById("support_toggle").style.background = '#fecf01';
              document.getElementById("support_toggle").style.color = '#4C4C4C';
              supportLayerStatus = true;
            }
            scene.config.layers.justice_locations.supportIcons.visible = supportLayerStatus;
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
          var supportLayerStatus = scene.config.layers.justice_locations.supportIcons.visible;
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
            if (supportLayerStatus == false){
              document.getElementById("support_toggle").style.background = '#fecf01';
              document.getElementById("support_toggle").style.color = '#4C4C4C';
              supportLayerStatus = true;
            }
            else {
            }
            scene.config.layers.justice_locations.supportIcons.visible = supportLayerStatus;
            scene.updateConfig();
          }
        }
      });

      // All layers button ***************
      var NewControl = L.Control.extend({
        options: {
          position: 'topleft'
        },
        onAdd: function() {
          var container = L.DomUtil.create('div', 'layer-control');
          container.innerHTML = '<input id="allLayers_toggle" type="button" value="TestControl">'
          L.DomEvent.on(container, 'click', this.toggleOnClick);
          return container;
        },
        toggleOnClick: function (e) {
          var legalLayerStatus = scene.config.layers.justice_locations.legalIcons.visible;
          var enforcementLayerStatus = scene.config.layers.justice_locations.enforcementIcons.visible;
          var courtsLayerStatus = scene.config.layers.justice_locations.courtsIcons.visible;
          var confinementLayerStatus = scene.config.layers.justice_locations.confinementIcons.visible;
          var alternativesLayerStatus = scene.config.layers.justice_locations.alternativesIcons.visible;
          var supportLayerStatus = scene.config.layers.justice_locations.supportIcons.visible;
          var lawEnforcement = scene.config.layers.justice_locations.enforcementIcons.lawEnforcement.visible;
          var nypdAdmin = scene.config.layers.justice_locations.enforcementIcons.NYPDAdmin.visible;

          if (scene) {
            if (lawEnforcement == true){
              document.getElementById("legal_toggle").style.background = '#5db323';
              document.getElementById("legal_toggle").style.color = 'white';
              lawEnforcement = false;
            }
            else {
            }
            if (nypdAdmin == true){
              document.getElementById("legal_toggle").style.background = '#5db323';
              document.getElementById("legal_toggle").style.color = 'white';
              scene.config.layers.justice_locations.enforcementIcons.NYPDAdmin.visible = false;
              // nypdAdmin = false;
              console.log(scene.config.layers.justice_locations.enforcementIcons.NYPDAdmin.visible);
            }
            else {
            }
            if (legalLayerStatus == true){
              document.getElementById("legal_toggle").style.background = '#5db323';
              document.getElementById("legal_toggle").style.color = 'white';
              legalLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.legalIcons.visible = legalLayerStatus;
            if (enforcementLayerStatus == true){
              document.getElementById("enforcement_toggle").style.background = '#4169ad';
              document.getElementById("enforcement_toggle").style.color = 'white';
              enforcementLayerStatus = true;
            }
            else {
            }
            scene.config.layers.justice_locations.enforcementIcons.visible = enforcementLayerStatus;
            if (courtsLayerStatus == true){
              document.getElementById("courts_toggle").style.background = '#a53295';
              document.getElementById("courts_toggle").style.color = 'white';
              courtsLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.courtsIcons.visible = courtsLayerStatus;
            if (confinementLayerStatus == true){
              document.getElementById("confinement_toggle").style.background = '#ca2016';
              document.getElementById("confinement_toggle").style.color = 'white';
              confinementLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.confinementIcons.visible = confinementLayerStatus;
            if (alternativesLayerStatus == true){
              document.getElementById("alternatives_toggle").style.background = '#7bcbc2';
              document.getElementById("alternatives_toggle").style.color = 'white';
              alternativesLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.alternativesIcons.visible = alternativesLayerStatus;
            if (supportLayerStatus == true){
              document.getElementById("support_toggle").style.background = '#fecf01';
              document.getElementById("support_toggle").style.color = '#4C4C4C';
              supportLayerStatus = false;
            }
            else {
            }
            scene.config.layers.justice_locations.supportIcons.visible = supportLayerStatus;
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
      var newControl= new NewControl();
      map.addControl(newControl);


      


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

var styles = [
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#aee2e0"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#abce83"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#769E72"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#7B8758"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#EBF4A4"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "color": "#8dab68"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#5B5B3F"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ABCE83"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#A4C67D"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#9BBF72"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#EBF4A4"
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#87ae79"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#7f2200"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "visibility": "on"
                    },
                    {
                        "weight": 4.1
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#495421"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            }
        ]



        function RecupChangementJour(jour){
                

                if(document.getElementById("jour_"+jour).getAttribute("data-checked") == "true")
                {
                    document.getElementById("jour_"+jour).setAttribute("data-checked",false);
                }
                else
                {
                    document.getElementById("jour_"+jour).setAttribute("data-checked",true);
                }
                
                var jours;
                jours = new Array();


                for(i=1;i<=7;i++)
                {
                    if(document.getElementById('jour_'+i).getAttribute("data-checked") == "true")
                    {
                        if(i==1)
                            jours.push("lundi");
                        if(i==2)
                            jours.push("mardi");
                        if(i==3)
                            jours.push("mercredi");
                        if(i==4)
                            jours.push("jeudi");
                        if(i==5)
                            jours.push("vendredi");
                        if(i==6)
                            jours.push("samedi");
                        if(i==7)
                            jours.push("dimanche");

                    }
                }

                console.log(jours);

                var myOptions = {
                    center: new google.maps.LatLng(45.750000,4.850000),
                    zoom: 11,
                    styles:styles,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var map = new google.maps.Map(document.getElementById("map"), myOptions);               

                function RechercheJour() 
                { 
                   if (req.readyState == 4) 
                   { 
                        var doc = eval('(' + req.responseText + ')'); 


                        for(i=0;i<doc.length;i++)
                        {

                            latitude = doc[i].latitude;
                            longitude = doc[i].longitude;

                            var myLatlng=new google.maps.LatLng(latitude,longitude);
                            var chaine = "<b>" + doc[i].name + "</b><br/><br/>Superficie : " + doc[i].size +"<br/><br/>Lundi : " + doc[i].monday  
                            chaine = chaine + "<br/>Mardi : " + doc[i].tuesday + "<br/>Mercredi : " + doc[i].wednesday 
                            chaine = chaine + "<br/>Jeudi : "+ doc[i].thursday + "<br/>Vendredi : " + doc[i].friday 
                            chaine = chaine + "<br/>Samedi : " + doc[i].saturday + "<br/>Dimanche : " + doc[i].sunday
                
                            var infowindow = new google.maps.InfoWindow({
                                content: chaine
                            });

                            marker = new google.maps.Marker({
                                position: myLatlng,
                                map: map,
                                info: chaine,
                                animation: google.maps.Animation.DROP
                              });

                            google.maps.event.addListener(marker, 'click', function(){
                                infowindow.setContent(this.info);
                                infowindow.open(map,this);
                            }); 
                            
                        }

                   }
                }

                var req = new XMLHttpRequest();
                req.open("GET", "/days/"+jours); 
                req.onreadystatechange = RechercheJour;  
                req.send(null); 

                
                var myLatlng=new google.maps.LatLng(document.getElementById("malatitude").innerHTML, document.getElementById("malongitude").innerHTML);
                
                var pinColor = "8FCF3C";
                var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
                    new google.maps.Size(21, 34),
                    new google.maps.Point(0,0),
                    new google.maps.Point(10, 34));

                marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    icon: pinImage,
                    animation: google.maps.Animation.DROP
                  });


                
                var infowindow = new google.maps.InfoWindow({
                    content: "Vous êtes ici !"
                });

                infowindow.open(map,marker);

                            
            }


            function RecupChangementVille(){

                ville = document.getElementById("ville").value;

                console.log(ville);


                var myOptions = {
                    center: new google.maps.LatLng(45.750000,4.850000),
                    zoom: 11,
                    styles:styles,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var map = new google.maps.Map(document.getElementById("map"), myOptions);
           
            
                function RechercheJour() 
                { 
                   if (req.readyState == 4) 
                   { 
                        var doc = eval('(' + req.responseText + ')'); 

                        for(i=0;i<doc.length;i++)
                        {

                            longitude = doc[i].longitude;
                            latitude = doc[i].latitude;

                                
                            var chaine = "<b>" + doc[i].name + "</b><br/><br/>Superficie : " + doc[i].size +"<br/><br/>Lundi : " + doc[i].monday  
                                chaine = chaine + "<br/>Mardi : " + doc[i].tuesday + "<br/>Mercredi : " + doc[i].wednesday 
                                chaine = chaine + "<br/>Jeudi : "+ doc[i].thursday + "<br/>Vendredi : " + doc[i].friday 
                                chaine = chaine + "<br/>Samedi : " + doc[i].saturday + "<br/>Dimanche : " + doc[i].sunday
                            

                            var myLatlng=new google.maps.LatLng(latitude,longitude);

                            var infowindow = new google.maps.InfoWindow({
                                content: chaine
                            });

                            marker = new google.maps.Marker({
                                position: myLatlng,
                                map: map,
                                info: chaine,
                                animation: google.maps.Animation.DROP
                              });

                            google.maps.event.addListener(marker, 'click', function(){
                                infowindow.setContent(this.info);
                                infowindow.open(map,this);
                            });
                        }

                   }
                }


                var req = new XMLHttpRequest();
                req.open("GET", "/towns/"+ville, true); 
                req.onreadystatechange = RechercheJour;  
                req.send(null); 

                
                  var myLatlng=new google.maps.LatLng(document.getElementById("malatitude").innerHTML, document.getElementById("malongitude").innerHTML);

                  var pinColor = "8FCF3C";
                    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
                        new google.maps.Size(21, 34),
                        new google.maps.Point(0,0),
                        new google.maps.Point(10, 34));

                    
                    marker = new google.maps.Marker({
                        position: myLatlng,
                        map: map,
                        icon: pinImage,
                        animation: google.maps.Animation.DROP
                      });
               
                    var infowindow = new google.maps.InfoWindow({
                        content: "Vous êtes ici !"
                    });

                    infowindow.open(map,marker);
            }


            function initialize() {

                var myOptions = {
                    center: new google.maps.LatLng(45.750000,4.850000),
                    zoom: 11,
                    styles:styles,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var map = new google.maps.Map(document.getElementById("map"), myOptions);

                
                function lectureFichier() 
                    { 
                       if (req.readyState == 4) 
                       { 
                            var doc = eval('(' + req.responseText + ')'); 

                            for(i=0;i<doc.length;i++)
                            {
                                longitude = doc[i].longitude;
                                latitude = doc[i].latitude;


                                var chaine = "<b>" + doc[i].name + "</b><br/><br/>Superficie : " + doc[i].size +"<br/><br/>Lundi : " + doc[i].monday  
                                chaine = chaine + "<br/>Mardi : " + doc[i].tuesday + "<br/>Mercredi : " + doc[i].wednesday 
                                chaine = chaine + "<br/>Jeudi : "+ doc[i].thursday + "<br/>Vendredi : " + doc[i].friday 
                                chaine = chaine + "<br/>Samedi : " + doc[i].saturday + "<br/>Dimanche : " + doc[i].sunday

                                var myLatlng=new google.maps.LatLng(latitude, longitude);
                                
                                var infowindow = new google.maps.InfoWindow({
                                    content: chaine
                                });

                                marker = new google.maps.Marker({
                                    position: myLatlng,
                                    map: map,
                                    info: chaine,
                                    animation: google.maps.Animation.DROP
                                  });

                                google.maps.event.addListener(marker, 'click', function(){
                                    infowindow.setContent(this.info);
                                    infowindow.open(map,this);
                                });
                                
                            }
                       }
                    }

                    var req = new XMLHttpRequest();
                    req.open("GET", "/init", true); 
                    req.onreadystatechange = lectureFichier;  
                    req.send(null); 

                    
                      var myLatlng=new google.maps.LatLng(document.getElementById("malatitude").innerHTML, document.getElementById("malongitude").innerHTML);

                      var pinColor = "8FCF3C";
                        var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
                            new google.maps.Size(21, 34),
                            new google.maps.Point(0,0),
                            new google.maps.Point(10, 34));
                        
                        marker = new google.maps.Marker({
                            position: myLatlng,
                            map: map,
                            icon: pinImage,
                            animation: google.maps.Animation.DROP
                          });


                        
                        var infowindow = new google.maps.InfoWindow({
                            content: "Vous êtes ici !"
                        });

                        infowindow.open(map,marker);
            }


            function maPosition(position) {

              document.getElementById("malongitude").innerHTML = position.coords.longitude;
              document.getElementById("malongitude").style.visibility = "hidden";

              document.getElementById("malatitude").innerHTML =  position.coords.latitude;
              document.getElementById("malatitude").style.visibility = "hidden";

            }

            if(navigator.geolocation)
              navigator.geolocation.getCurrentPosition(maPosition);

          initialize();
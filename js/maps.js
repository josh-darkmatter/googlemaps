jQuery(document).ready(function(){
// Locations Map Settings ---------------------------------------------------------
  function new_map( $el ) {
	  var $markers = $el.find('.marker');

    var args = {
		  zoom		: 12,
      center		: new google.maps.LatLng(0, 0),
      mapTypeId	: google.maps.MapTypeId.ROADMAP,
      styles: [
        {elementType: 'geometry', stylers: [{hue: '#f6e0e0'}, {saturation: -20}]},
        //{elementType: 'labels.text.stroke', stylers: [{color: '#811717'}]},
        //{elementType: 'labels.text.fill', stylers: [{color: '#811717'}]},  
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#811717'}]
        }, 
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#ea0000'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#ea0000'}, {saturation: -20}]
        },        
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#ea0000'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#ea0000'}]
        },        
        { 
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#a05050'}]
        },
        { 
          'featureType': 'poi.business',
          'elementType': 'geometry',
          'stylers': [{'color': '#a05050'}, {'visibility': 'on'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#f1d4d4'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#a05050'}]
        }, 
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#f5b3b3'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#ea0000'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#ea0000'}]
        },          
        
        {
          "featureType": "landscape.man_made",
          "elementType": "geometry.stroke",
          "stylers": [
          {
            "color": "#a05050"
          },
          {
            "hue": "#a05050"
          },
          {
            "visibility": "on"
          }
          ]
        },
      
        
       
             
      ],
	  };       	
    var map = new google.maps.Map( $el[0], args);
    map.markers = [];
    $markers.each(function(){
		  add_marker( jQuery(this), map );
    });
    center_map( map );
    return map;
  } 
   

  var infowindow = new google.maps.InfoWindow({
    content		: '' 
  }); 

  function add_marker( $marker, map ) {
    var image = 'http://res.cloudinary.com/bulldog-yoga/image/upload/v1491335714/bulldogpin_yzb4gn.png';    
	  var latlng = new google.maps.LatLng( $marker.attr('data-lat'), $marker.attr('data-lng') );
    var marker = new google.maps.Marker({
		  position	: latlng,
      map			: map,
      icon: image
	  });
    // add to array
    map.markers.push( marker );
    if( $marker.html() ) {
		  // create info window
      var infowindow = new google.maps.InfoWindow({
			  content		: $marker.html()
		  });
      // show info window when marker is clicked
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open( map, marker );
      });
	  }
  }

  function center_map( map ) {
	  var bounds = new google.maps.LatLngBounds();
    // loop through all markers and create bounds
    $.each( map.markers, function( i, marker ){
      var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );
      bounds.extend( latlng );
    });
    // only 1 marker?
    if( map.markers.length == 1 ) {
		  // set center of map
      map.setCenter( bounds.getCenter() );
      map.setZoom( 19 );
	  } else {
		  // fit to bounds
      map.fitBounds( bounds );
	  }
  }

  jQuery('.acf-map').each(function(){
    // create map
    map = new_map( jQuery(this) );
  });
  });
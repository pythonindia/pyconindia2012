$(function() {
	$('body').attr('data-spy', 'scroll');
        $('#nav').scrollspy();
	$('.navbar a').smoothScroll({
		offset: -40,
		speed: 900
	});

	$('.preview_video.tooltip-left img').tooltip({
		title: '<h3 style="border-bottom:1px solid rgba(220, 220, 220, 0.8)">Speaker Name</h3><p>Video Description</p>',
		placement: 'right'
	});

	$('.preview_video.tooltip-right img').tooltip({
		title: '<h3 style="border-bottom:1px solid rgba(220, 220, 220, 0.8)">Speaker Name</h3><p>Video Description</p>',
		placement: 'left'
	});
});

$(function() {
    var map = new L.Map('map');
    var cloudmadeUrl = 'http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',
        subDomains = ['otile1','otile2','otile3','otile4'],
        cloudmadeAttrib = '<a href="http://open.mapquest.co.uk" target="_blank">MapQuest</a>, <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> and contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/" target="_blank">CC-BY-SA</a>';
        var cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18, attribution: cloudmadeAttrib, subdomains: subDomains});

        var venue = new L.LatLng(12.9334, 77.6050); // geographical point (longitude and latitude)
        var center = new L.LatLng(12.936, 77.62);
        var mobile_center = new L.LatLng(12.935, 77.591);
        map.setView(center, 14).addLayer(cloudmade);
        if (map.getSize().x < 768) { map.setView(venue,14); } // on smaller screen where map takes full-width

        var venue_marker = new L.Marker(venue);
        map.addLayer(venue_marker);
        venue_marker.bindPopup('NIMHANS').openPopup();
        map.scrollWheelZoom.disable();
        map.doubleClickZoom.disable();

        map.on('zoomend', onZoomend);
        function onZoomend(){ map.setView(venue, map.getZoom()); };
    });
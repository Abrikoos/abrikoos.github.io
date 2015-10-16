var apiKey = 'b8d6d7114d8bfbab18543176f4104ce9',
	userName = 'zuilhofkoos',
	cboxOpen = false,
	height = 350,
	maxHeight = 500;


$(function () {
	// Get the user id by username
	getUserIdByName(userName, function (nsid) {
		// Get all the photos of this user
		getPhotosById(nsid, function (photos) {
			// Loop through the photos
			$.each(photos.photos.photo, function (i, photo) {
				// Get the original size url
				getPhotoSizesById(photo.id, function (sizes) {
					var original;
					var thumbnail;
					$.each(sizes, function (j, photoSize) {
						if (photoSize.width >= maxHeight && thumbnail == null) {
							thumbnail = photoSize;
						}
						if (photoSize.label == 'Original') {
							original = photoSize;
						}
					});

					console.log(original.source + ' != ' + thumbnail.source);
					var a = $('<a>')
						.attr('href', original.source)
						.appendTo('#images');

					$('<img>')
						.attr('src', thumbnail.source)
						.appendTo(a);
				});
			});
			$(window).load(function () {
				$('#images').justifiedGallery({
					rowHeight: height,
					maxRowHeight: maxHeight,
					margins: 1,
					border: 0,
					lastRow: 'nojustify',
					fixedHeight: false,
					captions: false,
					randomize: false
				}).on('jg.complete', function() {
					$(this).find('a').colorbox({
						maxWidth: '80%',
						maxHeight: '80%',
						opacity: 0.8,
						transition: 'elastic',
						current: ''
					});
				});
			    setTimeout(function() {
			    	$('body').fadeIn('slow');
			    }, 250);
			});
		});
	});

    $(window).bind('cbox_complete', function () {
        cboxOpen = true;
    });

    $(window).bind('cbox_cleanup', function () {
    	cboxOpen = false;
    });

    $(window).click(function() {
    	if (cboxOpen) {
        	$.colorbox.close();
    	}
    });
});

function getUserIdByName (username, callback) {
	$.getJSON('https://api.flickr.com/services/rest/?method=flickr.people.findByUsername&api_key='+apiKey+'&username='+username+'&format=json&jsoncallback=?', function (data) {
		return callback(data.user.nsid);
	});
}

function getPhotosById (nsid, callback) {
	$.getJSON('https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key='+apiKey+'&user_id='+nsid+'&format=json&jsoncallback=?', function (data) {
		return callback(data);
	});
}

function getPhotoSizesById (photoId, callback) {
	$.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key='+apiKey+'&photo_id='+photoId+'&format=json&jsoncallback=?', function (data) {
		return callback(data.sizes.size);
	});
}


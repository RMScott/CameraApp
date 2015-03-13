var Cloud = require('ti.cloud');

/*Cloud.Users.login({
	login: 'spock@vulcan.com',
	password: 'motdepasse'
}, function(e) {
	if (e.success) {
		var user = e.users[0];
		alert('Success:\n' +
		'id: ' + user.id + '\n' +
		'sessionId: ' + Cloud.sessionId + '\n' +
		'first name: ' + user.first_name + '\n' +
		'last name: ' + user.last_name);
	} else {
		alert('Error:\n' +
		((e.error && e.message) || JSON.stringify(e)));
	}
});*/

//Creat an event listener
//When the button is clicked, call the cameraButtonClicked function
OS_IOS && $.cameraButton.addEventListener("click", function(_event){
	$.cameraButtonClicked(_event);
});

//When the camera button is clicked, call photoSource
$.cameraButtonClicked= function(_event){
	var photoSource = Titanium.Media.getIsCameraSupported() ?
//If true, show the camera and open the photo gallery
	Titanium.Media.showCamera : Titanium.Media.openPhotoGallery;

	photoSource ({
			success: function(event) {
				//Call to function to process an image from the photo gallery
				processImage(event.media, function(photoResp){
					//Create a controller called feedRow
					var row = Alloy.createController("feedRow", photoResp);
					//if the length of the length of the table = 0, set the data and append it to the row
					//feedTable is contained in the TableView tag in feed.xml
					if($.feedTable.getData().length === 0) {
							$.feedTable.setData([]);
							$.feedTable.appendRow(row.getView(), true);
					} else {
							$.feedTable.insertRowBefore(0, row.getView(), true);
					}
				});
			},
			cancel: function() {
				//called when user cancels taking a picture
			},
			error: function(error) {
					if(error.code == Titanium.Media.NO_CAMERA){
							alert("Please run this test on device");
					} else {
							alert("Unexpected error: " + error.code);
					}
			},
			//Do not save to photo gallery
			//Camera currently does not open
			saveToPhotoGallery: false,
			allowEditing : true,
			mediaType: [Ti.Media.MEDIA_TYPE_PHOTO]
	});
	
	//Function takes an event and returns a callback to
	//an object that contains and image, title, and time stamp
	function processImage(_mediaObject, _callback){
			var photoObject = {
					image: _mediaObject,
					title: "Sample Photo " + new Date()
			};
			_callback(photoObject);
	}
};


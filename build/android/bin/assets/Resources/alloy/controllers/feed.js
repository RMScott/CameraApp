function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "feed";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.feedWindow = Ti.UI.createWindow({
        backgroundColor: "#fff",
        modal: false,
        id: "feedWindow",
        title: "Feed"
    });
    $.__views.feedTable = Ti.UI.createTableView({
        id: "feedTable"
    });
    $.__views.feedWindow.add($.__views.feedTable);
    $.__views.__alloyId0 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "This is a Feed tab",
        id: "__alloyId0"
    });
    $.__views.feedWindow.add($.__views.__alloyId0);
    $.__views.feedTab = Ti.UI.createTab({
        window: $.__views.feedWindow,
        id: "feedTab",
        title: "Feed"
    });
    $.__views.feedTab && $.addTopLevelView($.__views.feedTab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("ti.cloud");
    false;
    $.cameraButtonClicked = function() {
        function processImage(_mediaObject, _callback) {
            var photoObject = {
                image: _mediaObject,
                title: "Sample Photo " + new Date()
            };
            _callback(photoObject);
        }
        var photoSource = Titanium.Media.getIsCameraSupported() ? Titanium.Media.showCamera : Titanium.Media.openPhotoGallery;
        photoSource({
            success: function(event) {
                processImage(event.media, function(photoResp) {
                    var row = Alloy.createController("feedRow", photoResp);
                    if (0 === $.feedTable.getData().length) {
                        $.feedTable.setData([]);
                        $.feedTable.appendRow(row.getView(), true);
                    } else $.feedTable.insertRowBefore(0, row.getView(), true);
                });
            },
            cancel: function() {},
            error: function(error) {
                alert(error.code == Titanium.Media.NO_CAMERA ? "Please run this test on device" : "Unexpected error: " + error.code);
            },
            saveToPhotoGallery: false,
            allowEditing: true,
            mediaType: [ Ti.Media.MEDIA_TYPE_PHOTO ]
        });
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
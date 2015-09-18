"use strict";

var React = require('react'),
    S3Upload = require('./s3upload.js'),
    objectAssign = require('object-assign');

function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
}

var ReactS3Uploader = React.createClass({

    propTypes: {
        signingUrl: React.PropTypes.string.isRequired,
        onProgress: React.PropTypes.func,
        onFinish: React.PropTypes.func,
        onError: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            onProgress: function(percent, message) {
                console.log('Upload progress: ' + percent + '% ' + message);
            },
            onFinish: function(signResult) {
                console.log("Upload finished: " + signResult.publicUrl);
            },
            onError: function(message) {
                console.log("Upload error: " + message);
            }
        };
    },

    uploadFile: function(e) {
        var file = e.target.files[0];
        var objectURL = window.URL.createObjectURL(file);
        if(this.props.optUpdateImageUpload)
            this.props.optUpdateImageUpload(objectURL);

        // get image thumbnail
        var img = document.createElement('img');
        img.src = objectURL;
        
        var _this = this;
        img.onload = function () {
            var MAX_WIDTH = 600;
            var MAX_HEIGHT = 400;
            var width = this.width;
            var height = this.height;
             
            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }

            var canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            var ctx = canvas.getContext("2d");
            ctx.drawImage(this, 0, 0, width, height);
            
            var dataURL = canvas.toDataURL('image/jpeg');
            var thumbnail = { name: 'thumbnail_'+file.name, type: 'image/jpeg', dataURL: dataURL };
            _this.uploadThumnail(thumbnail);
        };

        new S3Upload({
            fileElement: this.getDOMNode(),
            signingUrl: this.props.signingUrl,
            onProgress: this.props.onProgress,
            onFinishS3Put: this.props.onFinish,
            onError: this.props.onError
        });
    },

    uploadThumnail: function(thumbnail) {
        new S3Upload({
            thumbnail: thumbnail,
            signingUrl: this.props.signingUrl,
            // onProgress: this.props.onProgress,
            onFinishS3Put: this.props.onThumbnailFinish,
            onError: this.props.onThumbnailError
        });
    },

    render: function() {
        return React.DOM.input(objectAssign({}, this.props, {type: 'file', onChange: this.uploadFile}));
    }
});


module.exports = ReactS3Uploader;

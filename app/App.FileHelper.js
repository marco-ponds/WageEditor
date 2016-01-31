Class("FileHelper", {
    FileHelper: function() {
        try {
            this.fs = require("fs");
            this.nw = true;
        } catch(e) {
            this.nw = false;
        }
    },

    requestDirectory: function(callback) {
        //if we're not using node-webkit return
        if (!this.nw) return;
        //appending input to body
        var input = document.createElement('input');
        input.id = "directoryChooser";
        input.type = "file";
        input.style.visibility = "hidden";
        input.nwdirectory = true;
        $('body').append(input);
        //setting change listener
        $('#directoryChooser').change(function(event) {
            var dir = event.target.files[0].path;
            if (callback) callback(dir);
            //now removing the input created
            $('#directoryChooser').remove();
        });
        //triggering click
        $('#directoryChooser').click();
    },

    writeAppend: function(path, text, callback) {
        //if we're not using node-webkit return
        if (!this.nw) return;
        this.fs.open(path, "a", "0666", function(error, descriptor) {
            if (error) return;
            //writing text to file
            app.filehelper.fs.write(descriptor, text, callback);
        });
    },

    write: function(path, text, callback) {
        //if we're not using node-webkit return
        if (!this.nw) return;
        this.fs.open(path, "w", "0666", function(error, descriptor) {
            if (error) return;
            //writing text to file
            app.filehelper.fs.write(descriptor, text, callback);
        });
    }
})
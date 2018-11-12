var fs = require('fs');
var xml2js = require('xml2js');
var path = require('path')


module.exports = function (context) {
    fs.readFile('config.xml', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        // XML to Java Script Obj
        xml2js.parseString(data, function (err, result) {
            if (err) {
                return console.log(err);
            }
            debugger
            var name = result.widget.name[0] + "-" + (new Date()).format("yyMMddhhmm");
            var apkPath = "platforms/android/build/outputs/apk/android-debug.apk";
            var ipaPath = "";
            if (fs.existsSync(apkPath)) {
                var newApkPath = "platforms/android/build/outputs/apk/" + name + ".apk";
                fs.rename(apkPath, newApkPath, function (err) {
                    if (err) console.log('ERROR: ' + err);
                    console.log("Rename success");
                    console.log("new path is " + path.resolve(newApkPath))
                });
            }

        });
    });
}


Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month 
        "d+": this.getDate(), //day 
        "h+": this.getHours(), //hour 
        "m+": this.getMinutes(), //minute 
        "s+": this.getSeconds(), //second 
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
        "S": this.getMilliseconds() //millisecond 
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};
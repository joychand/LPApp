#!/usr/bin/env node

/**
 * After prepare, files are copied to the platforms/ios and platforms/android folders.
 * Lets clean up some of those files that arent needed with this hook.
 */
var fs = require('fs');
var path = require('path');
var mv = require('mv');

var deleteFolderRecursive = function(removePath) {
  if( fs.existsSync(removePath) ) {
    fs.readdirSync(removePath).forEach(function(file,index){
      var curPath = path.join(removePath, file);
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(removePath);
  }
};

//var iosPlatformsDir_dist = path.resolve(__dirname, '../../platforms/ios/www/dist');
var androidPlatformsDir_dist = path.resolve(__dirname, '../../platforms/android/assets/www/dist');
var androidPlatformsDir_dist_lib=path.resolve(__dirname, '../../platforms/android/assets/www/lib');

//deleteFolderRecursive(iosPlatformsDir_dist);
deleteFolderRecursive(androidPlatformsDir_dist);
deleteFolderRecursive(androidPlatformsDir_dist_lib);
//**Move Fonts folder to lib/ionic/fonts***//

var androidPlatformsDir_dist_fonts=path.resolve(__dirname,'../../platforms/android/assets/www/lib/ionic/fonts');
var androidPlatformsDir_www_fonts=path.resolve(__dirname,'../../platforms/android/assets/www/fonts');
mv(androidPlatformsDir_www_fonts,androidPlatformsDir_dist_fonts,{mkdirp: true}, function(err) {
  if(typeof err != 'undefined')
  {
    console.log("err");
    console.log(err);
    console.log("ERROR when moving fonts directory to lib");
  }
  else
  {
    console.log("fonts directory moved OK to Android platform lib");
  }
});

//deleteFolderRecursive(androidPlatformsDir_www_fonts);
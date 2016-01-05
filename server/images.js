var fs      = Npm.require('fs');
var http    = Npm.require('http');
var https   = Npm.require('https');
var IMAGES  = '../../../../../.cachedImages';

WebApp.connectHandlers.stack.splice(0, 0,  {
    route: '/images',
    handle: function (req, res, next) {
        if (!req.query || !req.query.url) {
            res.end(304);
        }

        var url = req.query.url;
        var size = req.query.imageSize || 'original';
        var fileName = url.replace(/\//g, '_').slice(0, 247);
        var originalImage = IMAGES + '/original/' + fileName;
        var resizedImage = IMAGES + '/' + size + '/' + fileName;

        fs.exists(IMAGES, function (exists) {
            if (exists) {
                if (size) {
                    fs.exists(resizedImage, function (exists) {
                        if (exists) {
                            console.log("the RESIZED image DOES exist. piping to client");
                            retrieveImage(url, size, fileName, res);
                        } else {
                            console.log("the RESIZED image DOES NOT exist. piping to client");
                            fs.exists(originalImage, function (exists) {
                                if (exists) {
                                    console.log("RESIZED DOES NOT exist. the ORIGINAL image DOES exist. piping to client");
                                    retrieveImage(url, size, fileName, res);
                                    // convertImage(size, fileName, res);
                                } else {
                                    console.log("RESIZED DOES NOT exist. the ORIGINAL image DOES NOT exist. piping to client");
                                    retrieveImage(url, size, fileName, res);
                                }
                            });
                        }
                    });
                } else {
                    fs.exists(originalImage, function (exists) {
                        if (exists) {
                            console.log("the original image DOES exist. piping to client");
                            retrieveImage(url, size, fileName, res);
                        } else {
                            console.log("the original image DOES NOT exist. piping to client");
                            retrieveImage(url, size, fileName, res);
                        }

                    });
                }
            } else {
                fs.mkdir(IMAGES, function () {
                    fs.mkdir(IMAGES + '/large', function () {
                        fs.mkdir(IMAGES + '/medium', function () {
                            fs.mkdir(IMAGES + '/small', function () {
                                fs.mkdir(IMAGES + '/original', function () {
                                    retrieveImage(url, size, fileName, res);
                                });
                            });
                        });
                    });
                });
            }
        });

        if (!req.query.url) {
            next();
        }
    }
});

// try {
//         var result = request.getSync(url, {
//             encoding: null
//         });
//     } catch(e) {
//         console.log(e);
//     }
//
//     var buffer = result.body;
//
//     res.end(buffer);
// } else {
//     next();
// }

var retrieveImage = Meteor.bindEnvironment(function (url, size, fileName, res) {
    try {
        var result = request.getSync(url, { encoding: null });
    } catch (e) {
        console.log(e);
    }

    var buffer = result.body;
    var getImagePath = IMAGES + '/' + size + '/' + fileName;    
    var _http = (url.slice(0, 5) === 'https' ? https : http); // choosing http type
    
    _http.get(url, function (image) {
        image.pipe(fs.createWriteStream(getImagePath));
        
        if (!size) {
            console.log('original image retrieved');
            res.end(getImagePath);
        }
        
        console.log('resized image retrieved');
        image.on('end', function () {
            Meteor._debug('Done loading ', getImagePath);
            res.end(getImagePath);
            //convert image here
        });
    });

    res.end(buffer);
});


// var convertImage = Meteor.bindEnvironment(function (buffer, size, fileName, res) {
//     gm(IMAGES + '/original/' + fileName).resize(768, 432).stream(function (err, image) {
//         if (err) {
//             throw err;
//         } else {
//             image.pipe(fs.createWriteStream(IMAGES + '/' + size + '/' + fileName));
//             res.end(buffer);
//         }
//     });
//     res.end(buffer);
// });


// WebApp.connectHandlers.use(function (req, res, next) {
//     if (req.url.slice(0, 13) === '/images/?url=') {
//         var url = req.url.slice(13).replace('http:/', 'http://').replace('https:/','https://').split('&imageSize=')[0];
//         if (!url || url[0] === '{' || req.headers['if-modified-since']) {   // buggy request from angular   OR   cached in browser
//             res.writeHead(304);
//             res.end();
//         } else {
//             res.writeHead(200, { 'Last-Modified' : (new Date).toUTCString() });
//             fs.exists(IMAGES, function (exists) {
//                 var size = req.url.split('&imageSize=')[1];
//                 if (size && size !== 'small') { size = 'small'; } // TODO add better checking
//                 var fileName = url.replace(/\//g,'_').slice(0, 255); // replacing '/' with '_';  slicing to 255 - max file name length
//                 var fileOriginal = IMAGES + '/original/' + fileName;
//                 if (exists) {
//                     if (size) {
//                         var fileResized = IMAGES + '/' + size + '/' + fileName;
//                         fs.exists(fileResized, function (exists) {
//                             if (exists) {
//                                 fs.createReadStream(fileResized).pipe(res); // sending to client existing resized image
//                             } else {
//                                 fs.exists(fileOriginal, function (exists) { // else checking original
//                                     if (exists) {                           // making convertation
//                                         convertImage(size, fileName, res);
//                                     } else {
//                                         retriveImage(url, fileName, res, size);
//                                     }
//                                  });
//                             }
//                         });
//                     } else { // original
//                         fs.exists(fileOriginal, function (exists) {
//                             if (exists) {
//                                 fs.createReadStream(fileOriginal).pipe(res); // sending to the client
//                             } else {
//                                 retriveImage(url, fileName, res);
//                             }
//                          });
//                     }
//                 } else {        // creating directories
//                     fs.mkdir(IMAGES, function () {
//                         fs.mkdir(IMAGES + '/original', function () {
//                             fs.mkdir(IMAGES + '/small', function () {
//                                 retriveImage(url, fileName, res, size);
//                             });
//                         });
//                     });
//                 }
//             });
//         }
//     } else {
//         next();
//     }
// });

// var urls = []; // processed urls

// var retriveImage = Meteor.bindEnvironment(function (url, fileName, res, size) {
//     if (urls.indexOf(url) === -1) {
//         urls.push(url);
//         var _http = (url.slice(0, 5) === 'https' ? https : http); // choosing http type
//         _http.get(url, function (image) {
//             image.pipe(fs.createWriteStream(IMAGES + '/original/' + fileName)); // writing to disc
//             urls.pop(url);
//             if (!size) {
//                 image.pipe(res); // piping to client
//             }
//             image.on('end', function () {
//                 Meteor._debug('Done loading ', url);
//                 if (size) {
//                     convertImage(size, fileName, res);
//                 }
//             });
//         });
//     } else {
//         res.end(); // TODO add callback to queue
//     }
// });

// var gmList = []; // processed files

// var convertImage = Meteor.bindEnvironment(function (size, fileName, res) {          // http://aheckmann.github.io/gm/docs.html
//     var file = size + fileName;
//     if (gmList.indexOf(file) === -1) {
//         gmList.push(file);
//         gm(IMAGES + '/original/' + fileName).resize(370).stream(function (err, image) { // http://stackoverflow.com/questions/12468471/nodejs-gm-resize-and-pipe-to-response
//             if (err) {
//                 Meteor._debug(err);
//             } else {
//                 image.pipe(fs.createWriteStream(IMAGES + '/' + size + '/' + fileName)); // writing to disc
//                 gmList.pop(file);
//                 image.pipe(res); // piping to client
//             }
//         });
//     } else {
//         res.end(); // TODO add callback to queue
//     }
// });
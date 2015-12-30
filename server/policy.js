BrowserPolicy.framing.disallow();
BrowserPolicy.content.allowInlineScripts();
BrowserPolicy.content.allowEval();
BrowserPolicy.content.allowInlineStyles();
BrowserPolicy.content.allowFontDataUrl();

var trusted = [
  '*.bootstrapcdn.com',
  '*.facebook.com',
  '*.facebook.net',
  '*.google.com',
  '*.google-analytics.com',
  '*.mxpnl.com',
  '*.polygon.com',
  '*.ritetag.com',
  '*.soundcloud.com',
  '*.twitter.com',
  '*.vox-cdn.com',
  '*.voxmedia.com',
  '*.xbox.com',
  '*.xboxlive.com',
  '*.youtube.com',
  '*.ritetag.com',
  'localhost:3000'
];

_.each(trusted, function(origin) {
  originSecure = "https://" + origin;
  origin = "http://" + origin;
  BrowserPolicy.content.allowImageOrigin(originSecure);
  BrowserPolicy.content.allowImageOrigin(origin);
  BrowserPolicy.content.allowOriginForAll(originSecure);
  BrowserPolicy.content.allowOriginForAll(origin);
  BrowserPolicy.content.allowFrameOrigin(originSecure);
  BrowserPolicy.content.allowFrameOrigin(origin);
});

// var origins = ['a.com', 'b.com', 'c.com', 'boobies.com'];
// for( var i=0 ; i < trusted.length; i++ ){
//     var origin = origins[i];
//     if(request.headers.origin.indexOf(origin) > -1){ 
//          response.setHeader('Access-Control-Allow-Origin', request.headers.origin);
//          return;
//     }
// }
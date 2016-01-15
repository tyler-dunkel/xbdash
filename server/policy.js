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
  '*.cloudinary.com',
  '*.xbdash.com'
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
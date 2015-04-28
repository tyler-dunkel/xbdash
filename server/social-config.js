ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '109259765831650',
    secret: '5d426e68a123871b8f051262b0f86f7b'
});

ServiceConfiguration.configurations.remove({
  service: "twitter"
});

ServiceConfiguration.configurations.insert({
  service: "twitter",
  consumerKey: "UVos5UTOWCXMAUGDzvEcyHqAZ",
  loginStyle: "popup",
  secret: "9TDyJr6AK3BcONuagMN7eeBD5xWHON41UD5HxkIoymUtxvz3Dh"
});
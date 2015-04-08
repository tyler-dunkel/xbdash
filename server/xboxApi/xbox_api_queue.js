var xboxApiQueue = [];
var callInQueue;	//current api call in the queue. will be the url and a callback
// Tracker.autorun(function() {
// 	if (xboxApiQueue.length) {
// 		callInQueue = xboxApiQueue.shift();
// 		Meteor._debug(callInQueue);
// 	}
// 	else { Meteor._debug("fuck damn it"); }
// });

Meteor.methods({
	testMethod: function() {
		xboxApiQueue.push("this is whats in the queue");
		Meteor._debug("this fired");
		//Meteor._debug(xboxApiQueue[0]);
	}
});
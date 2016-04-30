Template.achievementCommentBox.helpers({
		loginAction:function(){
				returnComments.session.get('loginAction');
		},
		textarea:function(){
				returnTemplate.commentsTextarea;
		},
		hasMoreComments:function(){
				returnComments.get(this.id).count()<Comments.session.get(this.id+'_count');
		}
});

Template.newsCommentBox.helpers({
	loginAction:function(){
			returnComments.session.get('loginAction');
	},
	textarea:function(){
			returnTemplate.commentsTextarea;
	},
	hasMoreComments:function(){
			returnComments.get(this.id).count()<Comments.session.get(this.id+'_count');
	}
});

// Template.singleComment.created = function() {
// 		this.subscribe("commentUserImage",this.data.userId);
// }

// Template.singleComment.rendered = function() {
// 	this.$('p').contents().each(function() {
// 		if (this.nodeType !== 3) {
// 			returntrue;
// 		}

// 		varmatches = this.data.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([\w\-]{10,12})(?:&feature=related)?(?:[\w\-]{0})?/g);

// 		if (matches) {
// 			matches = matches[0].match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
// 		} else {
// 			return;
// 		}

// 		if (matches[2].length!=11) {
// 			return;
// 		}

// 		variframeWrap = '<divclass="embed-responsiveembed-responsive-16by9"></div>';
// 		variframe = $('<iframeclass="embed-responsive-item"allowfullscreen/>');

// 		iframe.attr('src', function(i,val) {
// 			return '//www.youtube.com/embed/' + matches[2];
// 		})

// 		iframe.insertAfter(this).wrap(iframeWrap);
// 	});
// }

// Template.singleComment.helpers({
// 	getUser:function(user){
// 			varuser=Meteor.users.findOne({_id:this.userId});
// 			returnuser.gamercard.gamertag;
// 	},
// 	avatarUrl:function(user){
// 			varuser=Meteor.users.findOne({_id:this.userId});
// 			if(user&&user.gamercard&&user.gamercard.gamerpicLargeSslImagePath){
// 					getUserImage="https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_64,h_64/"+encodeURIComponent(user.gamercard.gamerpicLargeSslImagePath);
// 			}
// 			returngetUserImage||Comments.ui.config().defaultAvatar;
// 	},
// 	take:function(params){
// 			varcontent=Comments.session.get('content');
// 			if(content[params.hash.key]){
// 					returncontent[params.hash.key];
// 			}
// 			returnparams.hash.default;
// 	},
// 	templateIs:function(name){
// 			returnname===Comments.ui.config().template;
// 	},
// 	hasMoreComments:function(){
// 			returnComments.get(this.id).count()<Comments.session.get(this.id+'_count');
// 	},
// 	textarea:function(){
// 			returnTemplate.commentsTextarea;
// 	},
// 	commentId:function(){
// 			returnthis._id||this.replyId;
// 	},
// 	hasLiked:function(){
// 			returnthis.likes.indexOf(Meteor.userId())>-1;
// 	},
// 	isOwnComment:function(){
// 			returnthis.userId===Meteor.userId();
// 	},
// 	loginAction:function(){
// 			returnComments.session.get('loginAction');
// 	},
// 	addReply:function(){
// 			varid=this._id||this.replyId;
// 			returnComments.session.equals('replyTo',id);
// 	},
// 	isEditable:function(){
// 			varid=this._id||this.replyId;
// 			returnComments.session.equals('editingDocument',id);
// 	},
// 	mediaContent:function(){
// 			returnmediaService.getMarkup(this.media);
// 	},
// 	reply:function(){
// 			if(_.isFunction(this.enhancedReplies)){
// 					returnthis.enhancedReplies();
// 			}elseif(_.isArray(this.enhancedReplies)){
// 					returnthis.enhancedReplies;
// 			}
// 	},
// 	showAnonymousInput:function(isReply){
// 			returnuserService.isAnonymous()&&!isReply;
// 	},
// 	configGet:function(key){
// 			returnComments.config()[key];
// 	},
// 	uiConfigGet:function(key){
// 			returnComments.ui.config()[key];
// 	},
// 	sessionGet:function(key){
// 			returnComments.session.get(key);
// 	}
// });
!function(){"use strict";function e(e,n,o,t){function r(){e.getBusiness().then(function(e){l=e,g.storeName=e.storeName,g.address=e.address,g.desc=e.desc,g.phoneNumber=e.phoneNumber})}function a(){n.openMapsApp(l.officeLocation)}function s(){o.isAvailable().then(function(){var e={to:l.email,subject:"Cordova Icons",body:"How are you? Nice greetings from Leipzig"};o.open(e)})}function i(){n.openExternalUrl(l.facebookPage)}function c(){n.openExternalUrl(l.instagramPage)}function u(){n.openExternalUrl(l.twitterPage)}function p(){n.openExternalUrl(l.pinterestPage)}var l,g=angular.extend(this,{storeName:"",address:"",desc:"",phoneNumber:"",getDirections:a,sendEmail:s,openFacebookPage:i,openInstagramPage:c,openTwitterPage:u,openPinterestPage:p,openHours:t.getOpenHours()});!function f(){r()}()}angular.module("restaurant.contact-us").controller("ContactUsController",e),e.$inject=["contactUsService","externalAppsService","$cordovaEmailComposer","openHoursService"]}();
"use strict";

 angular.module('config', [])

.constant('ENV', 
	{
		name:'development',
		firebaseUrl:'https://wmdo1.firebaseio.com/',
		s3:{
			accessKeyId:'AKIAJ3WSYT3O6MGS4XTQ',
			secretAccessKey:'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',
			bucket:'skounis-dev/mobile-apps/firebase-front'
		},
		columnsInGallery:4,
		youtubeKey:'AIzaSyDael5MmCQa1GKQNKQYypmBeB08GATgSEo',
		ionicPrivateKey:'a9265eaf15a20cc8516c770e8748aeed4891b28f453ce755',
		ionicPublicKey:'e30d4d540b8c75d1f167bbf242423c3fb23fe10275d1c016',
		ionicAppId:'241b6d37',
		gcmId:'228071472080',
		vimeoAccessToken:'d995ffff0228beba7c9716c3ee0d4add',
		facebookAppId:'785803021527033',
		facebookPermanentAccessToken:'CAANL6xXrSHYBANNHhMUDugVZBHXfVQBMeWG6FmpYROWcOEmC2xze1BNiraZB87NCAZC3w08L7KhCBnhJItZCUzWCgBNzBjt0BkoV6qMoXjIZBjkWRTUGgZBR39OZAiP3DF76jufQ4hJ7xsdQc0l68vFAZAePdZCZAjkjTwaOeEZC22xi8ZAQYBqvNvYRgIfOZBzf4zRURHgrLtNazxzln8ZBkd9FZC7',
		facebookPage:'apple.inc',
		instagramAppId:'2998ca20ed924ca3be22907c6ae77363',
		iosUrl:'com.titaniumtemplates.barebone-ionic',
		androidUrl:'market://details?id=com.titaniumtemplates.barebone-ionic',
		usesUntilRatePrompt:4,
		androidPublisherKey:'ca-app-pub-3965039466794589/2790557649',
		iosPublisherKey:'ca-app-pub-3965039466794589/2930158449',
		googleAppId:'400671186930-m07eu77bm43tgr30p90k6b9e1qgsva4p.apps.googleusercontent.com',
		twitterApiKey:'wXRPbDKzyLXOy4etLq4fNqu8M',
		twitterApiSecret:'1Bi6DGM98yc9MToSLstGLFaB2tvHOLkBrBBYm8WWI2fTKl0gWX'
	})

;
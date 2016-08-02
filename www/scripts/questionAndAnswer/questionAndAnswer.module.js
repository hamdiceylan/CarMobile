(function() {
  'use strict';

  angular
    .module('firebase-starter.questionAndAnswer', [
      'ionic'
    ])
    .config(function($stateProvider) {
      $stateProvider
        .state('app.questionAndAnswer', {
          url: '/questionAndAnswer',
          views: {
            'menuContent': {
              templateUrl: 'scripts/questionAndAnswer/questionList.html',
              controller: 'QuestionAndAnswer as vm'
            }
          }
        })
        .state('app.singleQuestion', {
          url: '/singleQuestion/:questionId',
          views: {
            'menuContent': {
              templateUrl: 'scripts/questionAndAnswer/singleQuestion.html',
              controller: 'SingleQuestion as vm'
            }
          }
        })

    });
})();

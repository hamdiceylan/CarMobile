(function() {
  'use strict';

  angular
    .module('firebase-starter.questionAndAnswer')
    .controller('QuestionAndAnswer', QuestionAndAnswer)
    .controller('SingleQuestion', SingleQuestion);


  /* @ngInject */
  QuestionAndAnswer.$inject = [
    '$ionicSlideBoxDelegate',  '$stateParams', '$ionicPopup','carComparisationService','$scope','questionAndAnswerService'];

  /* CarComparisationController */
  function QuestionAndAnswer($ionicSlideBoxDelegate, $stateParams, $ionicPopup,carComparisationService,$scope,questionAndAnswerService) {

    $scope.$on('$ionicView.enter',function(){
    });


    var vm = angular.extend(this, {
      rating: 0,
      item: null,
      question:null,
      questionList:null,
      askQuestion : askQuestion
    });

    (function activate() {
      questionAndAnswerService.getQuestion().then(function (success) {
        vm.questionList = success;
        console.log(success);
      });

    })();

    function askQuestion(){
      questionAndAnswerService.askQuestion(vm.question);

    }


  }

  /* @ngInject */
  SingleQuestion.$inject = [
    '$ionicSlideBoxDelegate',  '$stateParams', '$ionicPopup','carComparisationService','$scope','questionAndAnswerService'];

  /* CarComparisationController */
  function SingleQuestion($ionicSlideBoxDelegate, $stateParams, $ionicPopup,carComparisationService,$scope,questionAndAnswerService) {

    $scope.$on('$ionicView.enter',function(){
    });


    var vm = angular.extend(this, {
      rating: 0,
      item: null,
      questionList:null,
      answer : null,
      sendAnswer:sendAnswer
    });

    (function activate() {
      questionAndAnswerService.getQuestionById($stateParams.questionId).then(function (success) {
        vm.questionList = success;
        console.log(success);
      });

    })();


    function sendAnswer() {
      questionAndAnswerService.insertAnswer(vm.questionList.$id,vm.answer);
    }

  }




})();

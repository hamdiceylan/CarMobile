(function() {
  'use strict';

  angular
    .module('firebase-starter.questionAndAnswer')
    .factory('questionAndAnswerService', questionAndAnswerService);

  questionAndAnswerService.$inject = ['fireDataService'];

  /* @ngInject */
  function questionAndAnswerService(fireDataService) {

    var service = {
      askQuestion: askQuestion,
      getQuestion: getQuestion,
      getQuestionById:getQuestionById,
      insertAnswer:insertAnswer
    };
    return service;

    function askQuestion(question) {

      fireDataService.create("Question").insert(question);

    }

    function getQuestion() {

       return fireDataService.create("Question").selectAll().$loaded();

    }

    function getQuestionById(id) {

      return fireDataService.create("Question").selectOne(id).$loaded();

    }

    function insertAnswer(qeustionId,answer) {

      fireDataService.createChild("Question",qeustionId).updateItem(qeustionId,answer);


    }




  }
})();

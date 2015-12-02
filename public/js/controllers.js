var updateNavBar = function(selected) {
  $('.section-nav-link').removeClass('nav-selected').addClass('nav-not-selected');
  $('#' + selected).removeClass('nav-not-selected').addClass('nav-selected');
};

angular.module('LivreJeu.controllers', []).
    controller('AppCtrl', function($scope, $http) {
      console.log('PASSED INTO THE CLIENT ROUTER / AppController');
      $scope.message = 'I AM IN CONTROL OF THE APPLICATION';
      /*$http({
       method: 'GET',
       url: '/api/name'
       }).
       success(function(data, status, headers, config) {
       $scope.name = data.name;
       }).
       error(function(data, status, headers, config) {
       $scope.name = 'Error!';
       });
       */
    }).
    controller('homeController', function($scope) {
      $scope.message = 'Everyone come and see how good I lookin my HOME';
      updateNavBar('home');
    }).
    controller('createController', function($scope) {
      $scope.message = 'Everyone come and see how good I lookin my HOME';
      updateNavBar('story');
    }).
    controller('storyController', function($scope) {
      $scope.message = 'Everyone come and see how good I lookin my HOME';
      updateNavBar('story');
    }).
    controller('fightController', function($scope) {
      $scope.message = 'Everyone come and see how good I lookin my HOME';
      updateNavBar('story');
    }).
    controller('createController', function($scope) {
      $scope.message = 'Everyone come and see how good I lookin my HOME';
      updateNavBar('story');
    }).
    controller('helpController', function($scope) {
      $scope.message = 'HELP ! DAQUAN KING OF THE STREETS IS ATTACKING ME!!1!';
      updateNavBar('help');
    });

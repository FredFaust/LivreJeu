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
      console.log('PASSED INTO THE CLIENT ROUTER / homeController');
      $scope.message = 'Everyone come and see how good I lookin my HOME';
      updateNavBar('home');
  }).
  controller('helpController', function($scope) {
      console.log('PASSED INTO THE CLIENT ROUTER / helpController');
      $scope.message = 'HELP ! DAQUAN KING OF THE STREETS IS ATTACKING ME!!1!';
      updateNavBar('help');
  });

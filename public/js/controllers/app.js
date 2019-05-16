angular.module('LivreJeu.controllers').controller('appController', function ($scope, $http, $location, $timeout) {
  //$scope.goToStory = function() {};

  $scope.page = {};
  $scope.nav = {
    selected: ""
  };

  $scope.info = {
    player: {},
    progression: {}
  };

  $scope.context = {
    disciplines: {},
    items: {},
    itemsFiles: {},
    specialObjects: {},
    specialObjectsFiles: {}
  };

  $scope.prompt = {
    showCustom: false,
    showBackpack: false,
    showSpecialObjects: false
  };

  $scope.showCustomPrompt = function () {
    $scope.prompt.showCustom = true;
  };

  $scope.hideCustomPrompt = function () {
    $scope.prompt.showCustom = false;
  };

  $scope.updateNavBar = function (selected) {
    $scope.nav.selected = selected;
  };

  $scope.goToPage = function (link) {
    var page = link;

    if (link === '/story') {
      if ($scope.info.progression.page) {
        page = '/story/' + $scope.info.progression.page;
      } else {
        page = '/create';
      }
    }

    $location.path(page);
  };

  $http({
    method: "GET",
    url: "/api/gameinfo/all"
  }).then(function (response) {
    if (response && response.data) {
      var deserializedData = JSON.parse(response.data);

      //Updates the model whenever possible
      $timeout(function () {
        $scope.context.disciplines = deserializedData.DISCIPLINES;
        $scope.context.items = deserializedData.ITEMS;
        $scope.context.itemsFiles = deserializedData.ITEMS_FILES;
        $scope.context.specialObjects = deserializedData.SPECIAL_ITEMS;
        $scope.context.specialObjectsFiles = deserializedData.SPECIAL_ITEMS_FILES;
      }, 0);
    }
  });

  /************************** ACTIONS + PAGES DEFINITION *************************************/
  var verifyDisciplines = function () {
    $scope.page.hasHunt = _.contains($scope.info.player.disciplines, 'HUNT');
    $scope.page.hasAnimalCommunication = _.contains($scope.info.player.disciplines, 'ANIMAL_COMMUNICATION');
  };

  var page160OnLoad = function () {
    $scope.page = this.variables;
    verifyDisciplines();
  };

  var page91OnLoad = function () {
    $scope.page = this.variables;
    $scope.showCustomPrompt();
  };

  var addBakanalOil = function () {
    $scope.info.progression.specialObjects.push('BAKANAL_OIL');
  };

  var updateLinks134 = function () {
    $timeout(function () {
      var resultPage = $scope.info.progression.random.resultPage;

      switch (resultPage) {
        case 57:
          $scope.page.choice1.show = true;
          break;
        case 188:
          $scope.page.choice2.show = true;
          break;
        case 331:
          $scope.page.choice3.show = true;
          break;
      }
      $scope.page.choiceMade = true;
    }, 0);
  };

  var updateLinks167 = function () {
    $timeout(function () {
      var resultPage = $scope.info.progression.random.resultPage;

      switch (resultPage) {
        case 85:
          $scope.page.choice1.show = true;
          break;
        case 300:
          $scope.page.choice2.show = true;
          break;
      }
      $scope.page.choiceMade = true;
    }, 0);
  };


  var updateLinks331 = function () {
    $timeout(function () {
      var resultPage = $scope.info.progression.random.resultPage;

      switch (resultPage) {
        case 62:
          $scope.page.choice1.show = true;
          break;
        case 288:
          $scope.page.choice2.show = true;
          break;
      }
      $scope.page.choiceMade = true;
    }, 0);
  };

  var updateLinks155 = function () {
    $timeout(function () {
      var resultPage = $scope.info.progression.random.resultPage;

      switch (resultPage) {
        case 248:
          $scope.page.choice1.show = true;
          break;
        case 191:
          $scope.page.choice2.show = true;
          break;
      }
      $scope.page.choiceMade = true;
    }, 0);
  };

  var checkFoodChoice = function (page, choice) {
    if (choice === 'eat' && $scope.page.canEat) {
      $scope.info.progression.specialObjects = _.without($scope.info.progression.specialObjects, 'MEAL');
    } else if (choice === 'no') {
      $scope.info.progression.endurance -= 3;
    }
    $scope.goToStory(page, 2);
  };

  var loseEndurance = function (page, end) {
    $scope.info.progression.endurance -= end;
    $scope.goToStory(page, 2);
  };

  var updateProgressionWithSelection = function () {
    if ($scope.page.blueDiscSelected) {
      $scope.info.progression.specialObjects.push('BLUE_DISC');
    }

    if ($scope.page.boneSwordSelected) {
      $scope.info.progression.specialObjects.push('BONE_SWORD');
    }
  };

  var killPlayer = function () {
    $http({
      method: 'DELETE',
      url: '/api/players/' + $scope.info.player._id
    }).then(function () {
      $timeout(function () {
        $scope.info.player = {};
        $scope.info.progression = {};
        $scope.goToPage('/home');
      }, 10000);
    });
  };

  $scope.pages = [
    {
      id: 57,
      actionOnLoad: function () {
        $scope.page = this.variables;
      },
      actionOnEvent: updateProgressionWithSelection,
      variables: {
        boneSwordSelected: false,
        blueDiscSelected: false
      }
    },
    {
      id: 160,
      actionOnLoad: page160OnLoad,
      actionOnEvent: null,
      variables: {
        hasHunt: false,
        hasAnimalCommunication: false
      }
    },
    {
      id: 91,
      actionOnLoad: page91OnLoad,
      actionOnEvent: addBakanalOil,
      variables: {}
    },
    {
      id: 134,
      actionOnLoad: function () {
        $scope.page = this.variables;
      },
      actionOnEvent: updateLinks134,
      variables: {
        choiceMade: false,
        choice1: {
          page: 57,
          show: false
        },
        choice2: {
          page: 188,
          show: false
        },
        choice3: {
          page: 331,
          show: false
        }
      }
    },
    {
      id: 167,
      actionOnLoad: function () {
        $scope.page = this.variables;
      },
      actionOnEvent: updateLinks167,
      variables: {
        choiceMade: false,
        choice1: {
          page: 85,
          show: false
        },
        choice2: {
          page: 300,
          show: false
        }
      }
    },
    {
      id: 155,
      actionOnLoad: function () {
        $scope.page = this.variables;
        if (_.contains($scope.info.progression.specialObjects, 'MEAL')) {
          $scope.page.canEat = true;
        }
      },
      actionOnEvent: updateLinks155,
      actionOnModalEvent: checkFoodChoice,
      variables: {
        choiceMade: false,
        canEat: false,
        choice1: {
          page: 248,
          show: false
        },
        choice2: {
          page: 191,
          show: false
        }
      }
    },
    {
      id: 331,
      actionOnLoad: function () {
        $scope.page = this.variables;
      },
      actionOnEvent: updateLinks331,
      variables: {
        choiceMade: false,
        choice1: {
          page: 62,
          show: false
        },
        choice2: {
          page: 288,
          show: false
        }
      }
    },
    {
      id: 188,
      actionOnLoad: function () {
        $timeout(function () {
          $scope.goToStory(331, 1);
        }, 3000);
      },
      actionOnEvent: function () { },
      variables: {}
    },
    {
      id: 62,
      actionOnLoad: function () {
        $timeout(function () {
          $scope.goToStory(288, 1);
        }, 3000);
      },
      actionOnEvent: function () { },
      variables: {}
    },
    {
      id: 85,
      actionOnLoad: function () {
        $timeout(function () {
          $scope.goToStory(300, 1);
        }, 3000);
      },
      actionOnEvent: function () { },
      variables: {}
    },
    {
      id: 70,
      actionOnLoad: function () {
        $scope.page = this.variables;
        $scope.page.hasBakanalOil = _.contains($scope.info.progression.specialObjects, 'BAKANAL_OIL');
      },
      actionOnEvent: function () { },
      variables: {
        hasBakanalOil: false
      }
    },
    {
      id: 339,
      actionOnLoad: killPlayer,
      actionOnEvent: function () { },
      variables: {}
    },
    {
      id: 248,
      actionOnLoad: killPlayer,
      actionOnEvent: function () { },
      variables: {}
    },
    {
      id: 129,
      actionOnLoad: function () {
        $scope.page = this.variables;
      },
      actionOnEvent: function () { },
      actionOnModalEvent: loseEndurance,
      variables: {}
    },
    {
      id: 209,
      actionOnLoad: function () {
        $scope.page = this.variables;
      },
      actionOnEvent: function () { },
      actionOnModalEvent: loseEndurance,
      variables: {}
    }
  ];

  /************************** HANDLE EVENT *************************************/
  $scope.handleEvent = function (page) {
    var pageToHandle = _.findWhere($scope.pages, { id: page });

    if (pageToHandle && pageToHandle.actionOnEvent) {
      pageToHandle.actionOnEvent();
    }
  };

  $scope.handleModalEvent = function (page, context) {
    var pageToHandle = _.findWhere($scope.pages, { id: page });

    if (pageToHandle && pageToHandle.actionOnModalEvent) {
      pageToHandle.actionOnModalEvent(page, context);
    }
  };

  /************************** FUNCTION THAT WE USE FOR EVERY LINK IN THE STORY *******************/
  $scope.goToStory = function (page, section) {
    //TODO: WE WOULD WANT TO REFRESH THE DATA, LIKE RESULT OF A FIGHT OR SMTHG
    $scope.prompt.show = false;
    $scope.prompt.showBackpack = false;
    $scope.prompt.showSpecialObjects = false;
    $scope.info.progression.previousPage = $scope.info.progression.page;
    $scope.info.progression.page = parseInt(page, 10);


    if ($scope.info.progression.endurance > 0) {
      var data = _.omit($scope.info.progression, '_id'),
        progressionId = $scope.info.progression.playerId;

      $http({
        method: 'PUT',
        url: '/api/progressions/' + progressionId,
        data: data
      }).then(function () {
        var s = section || '1';
        var pageToHandle = _.findWhere($scope.pages, { id: page });

        $location.path('/story/' + page + '/' + s);

        if (pageToHandle && pageToHandle.actionOnLoad) {
          pageToHandle.actionOnLoad();
        }
      });
    } else {
      killPlayer();
    }

  };
});
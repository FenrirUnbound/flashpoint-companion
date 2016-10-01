var main = angular.module('flashpoint', []);

/**
 * CONSTANTS
 */
var FIRST_EXPLOSION = [
  null, // off-by-one padding
  [3, 3],
  [3, 4],
  [3, 5],
  [3, 6],
  [4, 6],
  [4, 5],
  [4, 4],
  [4, 3]
];
var D8_MAP = {
  '1': 6,
  '2': 5,
  '3': 8,
  '4': 7,
  '5': 2,
  '6': 1,
  '7': 4,
  '8': 3
};


main.controller('ScenarioController', ['$scope', '$http', ($scope, $http) => {
  function rollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
  }



  $scope.firstExplosion = FIRST_EXPLOSION[rollDice(8)];

  $scope.secondExplosion = [rollDice(6), rollDice(8)];

  $scope.thirdExplosion = [ rollDice(6), D8_MAP[$scope.secondExplosion[1]] ];

  $scope.hazMat = [
    [rollDice(6), rollDice(8)],
    [rollDice(6), rollDice(8)],
    [rollDice(6), rollDice(8)],
    [rollDice(6), rollDice(8)],
    [rollDice(6), rollDice(8)],
    [rollDice(6), rollDice(8)]
  ];

  $scope.poi = [
    [rollDice(6), rollDice(8)],
    [rollDice(6), rollDice(8)],
    [rollDice(6), rollDice(8)],
    [rollDice(6), rollDice(8)],
    [rollDice(6), rollDice(8)],
    [rollDice(6), rollDice(8)]
  ];

  $scope.hotSpots = [
    [rollDice(6), rollDice(8)],
    [rollDice(6), rollDice(8)],
    [rollDice(6), rollDice(8)],
    [rollDice(6), rollDice(8)],
    [rollDice(6), rollDice(8)],
    [rollDice(6), rollDice(8)]
  ];

  function rerollThirdExplosion() {
    var blackDice = D8_MAP[$scope.secondExplosion[1]];
    var redDice = rollDice(6);

    return [redDice, blackDice];
  }

  $scope.rerollExplosion = function (gameElement) {
    var newRoll = [rollDice(6), rollDice(8)];

    if (gameElement === 'thirdExplosion') {
      newRoll = rerollThirdExplosion();
    } else if (gameElement === 'secondExplosion') {
      $scope[gameElement] = newRoll;
      $scope.thirdExplosion = rerollThirdExplosion();
    }

    $scope[gameElement] = newRoll;
  };

  $scope.reroll = function (gameElement, index) {
    var targetIndex = parseInt(index);

    $scope[gameElement][targetIndex] = [rollDice(6), rollDice(8)];
  };
}]);

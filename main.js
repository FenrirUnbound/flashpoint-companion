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
var EIGHTD_MAP = {
  1: 6,
  2: 5,
  3: 8,
  4: 7,
  5: 2,
  6: 1,
  7: 4,
  8: 3
};


main.controller('ScenarioController', ['$scope', '$http', ($scope, $http) => {
  function rollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
  }

  $scope.firstExplosion = FIRST_EXPLOSION[rollDice(8)];

  $scope.secondExplosion = [
    [rollDice(6), rollDice(8)],
    [rollDice(6), rollDice(8)],
    [rollDice(6), rollDice(8)]
  ];

  $scope.thirdExplosion = [
    [ rollDice(6), EIGHTD_MAP[$scope.secondExplosion[0][1]] ],
    [ rollDice(6), EIGHTD_MAP[$scope.secondExplosion[1][1]] ],
    [ rollDice(6), EIGHTD_MAP[$scope.secondExplosion[2][1]] ],
  ];

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
}]);

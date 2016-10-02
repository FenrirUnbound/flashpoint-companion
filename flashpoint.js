'use strict';

const main = angular.module('flashpoint', []);

/**
 * CONSTANTS
 */
const FIRST_EXPLOSION = [
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
const D8_MAP = {
  '1': 6,
  '2': 5,
  '3': 8,
  '4': 7,
  '5': 2,
  '6': 1,
  '7': 4,
  '8': 3
};


main.controller('ScenarioController', ['$scope', ($scope) => {
  $('#mainView').hide();

  function rollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
  }

  function rollRed() {
    return rollDice(6);
  }

  function rollBlack() {
    return rollDice(8);
  }

  $scope.difficulty = [
    {
      name: 'ROOKIE',
      value: 'rookie'
    },
    {
      name: 'VETERAN',
      value: 'veteran'
    },
    {
      name: 'HEROIC',
      value: 'heroic'
    }
  ];

  function rerollThirdExplosion() {
    const blackDice = D8_MAP[$scope.secondExplosion[1]];
    const redDice = rollRed();

    return [redDice, blackDice];
  }

  $scope.rerollExplosion = (gameElement) => {
    let newRoll = [rollDice(6), rollDice(8)];

    if (gameElement === 'thirdExplosion') {
      newRoll = rerollThirdExplosion();
    } else if (gameElement === 'secondExplosion') {
      $scope[gameElement] = newRoll;
      $scope.thirdExplosion = rerollThirdExplosion();
    }

    $scope[gameElement] = newRoll;
  };

  $scope.reRoll = (gameElement, id) => {
    $scope[gameElement][id].red = rollDice(6);
    $scope[gameElement][id].black = rollDice(8);
  };

  $scope.generate = (difficulty, firefighters) => {
    $scope.firstExplosion = FIRST_EXPLOSION[rollRed()];
    $scope.rerollExplosion('secondExplosion');
    $scope.rerollExplosion('thirdExplosion');

    $scope.hazMat = [0,1,2].map((item) => {
      return { name: 'hazMat', id: item, red: rollDice(6), black: rollDice(8) };
    });

    $scope.poi = [0,1,2].map((item) => {
      return { name: 'poi', id: item, red: rollDice(6), black: rollDice(8) };
    });

    $scope.hotSpots = [0,1,2].map((item) => {
      return { name: 'hotSpots', id: item, red: rollDice(6), black: rollDice(8) };
    });

    $('#mainView').show();
  };
}]);

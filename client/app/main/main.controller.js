'use strict';

var Entry = function Entry (mortality) {
  this.name = mortality.name;
  this.dateAdded = mortality.dateAdded;
  this.inputDate = mortality.inputDate;
  this.daysAlive = mortality.daysAlive;
}

Entry.prototype.calculate = function() {
  this.inputDate = moment(this.inputDate).format('MMMM Do YYYY');

  this.dateAdded = moment(this.dateAdded).fromNow();
}

angular.module('mortalityApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.mortalityTimes = [];
    $scope.error = false;

    $http.get('/api/mortality').success(function(mortalityEntries) {
      mortalityEntries.forEach(function(mortalityEntry) {
          var entry = new Entry(mortalityEntry);
          entry.calculate(); // Converts to a readable format
          $scope.mortalityTimes.push(entry);
      });

      $scope.mortalityTimes.reverse();
    });

    $scope.addThing = function() {
      if($scope.name === '' || $scope.dateOfBirth === '') {
        return;
      }

      var enteredDate = new Date($scope.dateOfBirth);
      var currentDate = new Date();
      var daysAlive = Math.round(
        (currentDate.getTime() - enteredDate.getTime())/(24*60*60*1000)
      )

      if (daysAlive >= 0)
      {
        var newEntry = new Entry(
          {
              name: $scope.name,
              dateAdded: currentDate,
              inputDate: enteredDate,
              daysAlive: daysAlive
          });

        $http.post('/api/mortality', newEntry).then(function(response){
          newEntry.calculate();
          $scope.mortalityTimes.unshift(newEntry);
        });

        $scope.error = false;
      }
      else
      {
        $scope.error = true;
      }

      // Reset input fields
      $scope.dateOfBirth = '';
      $scope.name = '';
    };

  });

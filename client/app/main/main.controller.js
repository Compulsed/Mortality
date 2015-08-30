'use strict';

var Entry = function Entry (mortality) {
  this.name = mortality.name;
  this.lastName = mortality.lastName;
  this.dateAdded = mortality.dateAdded;
  this.inputDate = mortality.inputDate;
  this.daysAlive = mortality.daysAlive;
}

Entry.prototype.toInputDate = function() {
  return moment(this.inputDate).format('MMMM Do YYYY');
}

Entry.prototype.toDateAdded = function () {
  return moment(this.dateAdded).fromNow();
}

Entry.prototype.martianDays = function () {
  return Math.floor(this.daysAlive / (687 / 365));
}

angular.module('mortalityApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.mortalityTimes = [];
    $scope.error = false;

    $http.get('/api/mortality').success(function(mortalityEntries) {
      mortalityEntries.forEach(function(mortalityEntry) {
          var entry = new Entry(mortalityEntry);
          $scope.mortalityTimes.push(entry);
      });

      $scope.mortalityTimes.reverse();
    });

    $scope.addThing = function() {
      if($scope.name === '' || $scope.dateOfBirth === '' || $scope.lastName === '') {
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
              lastName: $scope.lastName,
              dateAdded: currentDate,
              inputDate: enteredDate,
              daysAlive: daysAlive
          });

        $http.post('/api/mortality', newEntry).then(function(response){
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

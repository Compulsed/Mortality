'use strict';

angular.module('mortalityApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.mortalityTimes = [];
    $scope.error = false;

    $http.get('/api/mortality').success(function(mortalityTimes) {
      mortalityTimes.forEach(function(time) {
          time.inputDate = moment(time.inputDate).format('MMMM Do YYYY');
          time.dateAdded = moment(time.dateAdded).startOf('hour').fromNow();
      });

      mortalityTimes.reverse();
      $scope.mortalityTimes = mortalityTimes;
    });

    $scope.addThing = function() {
      if($scope.name === '' || $scope.dateOfBirth === '') {
        return;
      }

      var enteredDate = new Date($scope.dateOfBirth);
      var currentDate = new Date();

      // Found here: http://stackoverflow.com/questions/2627473/how-to-calculate-the-number-of-days-between-two-dates-using-javascript
      var daysAlive = Math.round(
        (currentDate.getTime() - enteredDate.getTime())/(24*60*60*1000)
      )

      if (daysAlive >= 0)
      {
        var newEntry = { 
            name: $scope.name,
            dateAdded: currentDate,
            inputDate: enteredDate,
            daysAlive: daysAlive 
        };


        $http.post('/api/mortality', newEntry).then(function(response){
          newEntry.inputDate = moment(newEntry.inputDate).format('MMMM Do YYYY');
          newEntry.dateAdded = moment(newEntry.dateAdded).startOf('hour').fromNow();

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

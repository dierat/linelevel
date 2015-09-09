angular.module('main').controller('editEventController',['$scope','appFactory', '$firebase',
  function($scope,appFactory,$firebase){

  var ref = appFactory.firebase;
  var user = ref.getAuth();

  // this is the list of the user's chosen genres
  var genres = appFactory.genres;
  $scope.chosenGenres = appFactory.chosenGenres;
  $scope.chooseGenre = appFactory.chooseGenre;

  $scope.today = new Date();
  $scope.date = appFactory.date;
    // sets the date to today and time to 7pm with no seconds
  appFactory.resetDate();
  
 

  var init = function(){
      // load event data
      ref.child("events").child($scope.eventId)
        .on("value",function(info){
          
          var eventData = info.val();
          console.log(eventData);
          $scope.eventTitle = eventData.title;
          $scope.eventDescription = eventData.description;
          $scope.eventImage = eventData.image;
          $scope.eventLabel = eventData.label;
          $scope.genre = eventData.genre;
          if($scope.genre){
            $scope.genre.forEach(function(genre){
              genres.forEach(function(genres){
                genres.name === genre ? genres.selected = true : genres.selected = false;
              });
            });
          }
          

          $scope.genres = genres;
          $scope.date.eventDate = new Date(eventData.date);
          // console.log($scope.genres);
          // console.log($scope.genre);
        });
        
    };

    $scope.saveChanges = function(){
      console.log('save changes invoked');


      // ref.child("events").child($scope.eventId).update({'videoId' : peer.id});
      //   console.log(peer.id);
    };


  $scope.isAuth = function(){
    return user !== null;
  };

  init();

}]).directive('autofill', ['$timeout', function ($timeout) {
    return {
        scope: true,
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            $timeout(function(){
                $(elem[0]).trigger('input');
                // elem.trigger('input'); try this if above don't work
            }, 200)
        }
    }
}]);
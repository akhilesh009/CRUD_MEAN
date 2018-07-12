'use strict';



(function () {
    var userApp = angular.module("userApp");

    var cities = [
              
          ];

    var cities = [
    
                {
                    city : 'India',
                    desc : 'This is the best country in the world!',
                    lat : 23.200000,
                    long : 79.225487
                },
                {
                    city : 'New Delhi',
                    desc : 'The Heart of India!',
                    lat : 28.500000,
                    long : 77.250000
                },
                {
                    city : 'Mumbai',
                    desc : 'Bollywood city!',
                    lat : 19.000000,
                    long : 72.90000
                },
                {
                    city : 'Kolkata',
                    desc : 'Howrah Bridge!',
                    lat : 22.500000,
                    long : 88.400000
                },
                {
                    city : 'Chennai  ',
                    desc : 'Kathipara Bridge!',
                    lat : 13.000000,
                    long : 80.250000
                }
    ]      

    var PersonCtrl = function ($scope, $http)
    {

        var mapOptions = {
                  zoom: 4,
                  center: new google.maps.LatLng(25,80),
                  mapTypeId: google.maps.MapTypeId.TERRAIN
              }

                $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

                $scope.markers = [];
              
                var infoWindow = new google.maps.InfoWindow();
              
                var createMarker = function (info){
                  
                    var marker = new google.maps.Marker({
                      map: $scope.map,
                      position: new google.maps.LatLng(info.lat, info.long),
                      title: info.city
                    });
                    marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
                  
                    google.maps.event.addListener(marker, 'click', function(){
                      infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                      infoWindow.open($scope.map, marker);
                    });
                  
                    $scope.markers.push(marker);

                }  
          
                for (var i = 0; i < cities.length; i++){
                    createMarker(cities[i]);
                }

                $scope.openInfoWindow = function(e, selectedMarker){
                    e.preventDefault();
                    google.maps.event.trigger(selectedMarker, 'click');
                }

    	//$scope.working = 'Angular is Working';
        //common error function
    	var onError = function (error) {
            $scope.error = error.data;
        };
        //end error function

        //get all persone
    	var onPersonGetCompleted = function(response){
    		$scope.persons = response.data;
            console.log($scope.persons);
            

    	}
    	

        var refresh = function(){
        	$http.get('/persons')
        		.then(onPersonGetCompleted, onError);
        	console.log('Response received...');
        }

        refresh();
    	//end get all persons

        //get persons by Id
        var onGetByIdCompleted = function(response){
            $scope.person = response.data;
            console.log("innnn");
            console.log($scope.person);
        };

        $scope.searchPerson = function(id){
            $http.get('/person/' + id)
                    .then(onGetByIdCompleted, onError);
            console.log(id);
        };
        //end get person by Id

        //add new person
        var onAddPersonCompleted = function(response){
            $scope.person = response.data;
            console.log(response.data);
            refresh();
        };
        $scope.addPerson = function(person){
            $http.post('/addPerson', person)
                    .then(onAddPersonCompleted, onError);
            refresh();
        };
        //end add new person

        //delete person
        $scope.deletePerson = function(id){

            $http.delete('/deletePerson/' + id)
                .then(onPersonDeleteCompleted,  onError);
            refresh();
        };

        var onPersonDeleteCompleted = function(response){
            $scope.person = response.data;
            console.log(response.data);
            refresh();
        };
        //end delete person

        //update person
        $scope.updatePerson = function(person){
            $http.put("/updatePerson", person)
                .then(onUpdatePersonCompleted, onError);
                    console.log(person);
                    refresh();
        };

        var onUpdatePersonCompleted = function(response){
            $scope.person = null;//response.data;
            console.log(response.data);
            refresh();
        };
        //end update person
    }
    userApp.controller('PersonCtrl', PersonCtrl);
}());

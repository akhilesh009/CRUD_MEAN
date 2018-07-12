angular.module('userApp', ['ui.bootstrap']);

var modalControl = function ($scope, $modal, $log) {

  var key = 1000;
  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (person) {

    var modalInstance = $modal.open({
      templateUrl: 'editpersonmodal.html',
      controller: PersonCtrl,
      resolve: {
        items: function () {
          return $scope.persons;
        },
        key: function() {return key; }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
};

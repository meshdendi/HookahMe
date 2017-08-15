var hk = angular.module('login',[]);
hk.controller('ctrl', ['$scope', '$http', function($scope, $http){

	$scope.logUser = function(){
		$http.get('/about').then(function(response){
		});
	}

}]);

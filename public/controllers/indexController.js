var hk = angular.module('index',[]);
hk.controller('products_controller', ['$scope', '$http', function($scope, $http){
	var refresh = function(){
		$http.get('/types').then(function(response){
			//console.log(response);
			$scope.products = response.data;
		});
	}
	refresh();
}]);
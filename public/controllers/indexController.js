var hk = angular.module('index',[]);
hk.controller('products_controller', ['$scope', '$http', function($scope, $http){
	var refresh = function(){
		$http.get('/types').then(function(response){
			$scope.products = response.data;
		});
	}
	refresh();

	$scope.view = function(id){
		$http.get('/product/' + id).then(function(response){
			$scope.argile = response.data;
			console.log(response.data);
		});
	}

	$scope.submit = function(){
		$http.post('/user').then(function(response){
			console.log(response.data);
		});
	}


}]);
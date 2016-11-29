'use strict';

var controllersSite = angular.module( 'controllersSite' , [] );


controllersSite.controller( 'siteProducts' , [ '$scope' , '$http' , 'cartSrv' , function( $scope , $http , cartSrv ){
	
	$http.get( 'model/products.json' ).
	success( function( data ){
		$scope.products = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

	$scope.addToCart = function ( product ) {
		cartSrv.add( product );
	};

}]);


controllersSite.controller( 'siteProduct' , [ '$scope' , '$http' , '$routeParams' , 'cartSrv' , function( $scope , $http , $routeParams , cartSrv ){

	$http.post( 'model/products.json' ).
	success( function( data ){
		var products = data;
		$scope.product = products[$routeParams.id];
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

	$scope.addToCart = function ( product ) {
		cartSrv.add( product );
	};

}]);


controllersSite.controller( 'siteOrders' , [ '$scope' , '$http' , function( $scope , $http ){

	$http.get( 'model/orders.json' ).
	success( function( data ){
		$scope.orders = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

}]);


controllersSite.controller( 'cartCtrl' , [ '$scope' , '$http' , 'cartSrv' , function( $scope , $http , cartSrv ){

	$scope.cart = cartSrv.show();

	$scope.emptyCart = function () {
		cartSrv.empty();
	};

	$scope.total = function () {
		var total = 0;
		angular.forEach( $scope.cart , function ( item ) {
			total += item.qty * item.cena;
		});
		return total;
	};


	$scope.removeItem = function( $index) {

		$scope.cart.splice($index,1);
		cartSrv.update($scope.cart);

	};

	$scope.setOrder= function ( $event) {




		//zapisz zamowienie w bazie

		//sprawdzanie czy uzytkownik jest zalogowany

		var loggedIn=false;

		if(!loggedIn)
		{
			$scope.alert={ type: 'warning', msg: 'Musisz być zalogowany'};
		}


		console.log($scope.total());
		console.log($scope.cart);


		$event.preventDefault();   //blokada przesyłanie formularza


	};

	$scope.$watch(function() {

		cartSrv.update( $scope.cart );
	});

}]);
'use strict';

/* Controllers */

var ovAdminAppControllers = angular.module('ovAdminAppControllers', ['angularFileUpload']);

ovAdminAppControllers.controller('OpticianListCtrl', [ '$scope', '$http', '$upload',
		function($scope, $http, $upload) {
			$http.get('/rest/optician/fetchAll').success(function(data) {
				$scope.opticians = data;
			});
			$scope.orderProp = 'name';

            $scope.onFileSelect = function($files) {
                //$files: an array of files selected, each file has name, size, and type.
                for (var i = 0; i < $files.length; i++) {
                    var file = $files[i];
                    $scope.upload = $upload.upload({
                        url: '/upload', //upload.php script, node.js route, or servlet url
                        //method: 'POST' or 'PUT',
                        //headers: {'header-key': 'header-value'},
                        //withCredentials: true,
                        data: {myObj: $scope.myModelObj},
                        file: file, // or list of files ($files) for html5 only
                        //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
                        // customize file formData name ('Content-Desposition'), server side file variable name.
                        //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file'
                        // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
                        //formDataAppender: function(formData, key, val){}
                    }).progress(function(evt) {
                        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    }).success(function(data, status, headers, config) {
                        // file is uploaded successfully
                        console.log(data);
                    });
                    //.error(...)
                    //.then(success, error, progress);
                    // access or attach event listeners to the underlying XMLHttpRequest.
                    //.xhr(function(xhr){xhr.upload.addEventListener(...)})
                }
                /* alternative way of uploading, send the file binary with the file's content-type.
                 Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed.
                 It could also be used to monitor the progress of a normal http post/put request with large data*/
                // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
            }
		}
]);

ovAdminAppControllers.controller('OpticianDetailsCtrl', [
		'$scope',
		'$http',
		'$routeParams',
		function($scope, $http, $routeParams) {
			if ($routeParams.opticianId == 'new') {
				$scope.optician = {};
			} else {
				$http.get('/rest/optician/' + $routeParams.opticianId).success(
						function(data) {
							$scope.optician = data;
						});
			}

			$scope.update = function(user) {
				$http.post('/rest/optician', $scope.optician).success(
						function(retdata) {
							$scope.optician = retdata;
						});
			};

			$scope.reset = function() {
				$scope.optician = {};
			};

			$scope.remove = function() {
				$http.delete('/rest/optician/' + $scope.optician.id);
				$scope.optician = {};
			};
		}
]);

ovAdminAppControllers.controller('DashboardCtrl', [ '$scope', '$routeParams',
		function($scope, $routeParams) {
		}
]);
// public/core.js
var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/api/todos')
        .success(function(data, id) {
            $scope.todos = data;
            console.log(data);
            console.log(id);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        var insertedTodo = document.getElementById("todo-item").value;
        if(insertedTodo == ""){
            alert("Please enter an Item");

        } else {

            $http.post('/api/todos', $scope.formData)
                .success(function (data) {
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.todos = data;
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        }
    };

    // delete a 2do after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}

function weatherController($scope, $https){
    $scope.weatherData = {};

    $https.get('/api/weather')
        .success(function(data){
            $scope.insideTemp = data;
            console.log(data);
        })
        .error(function(data){
            console.log("Error: " + data);
        });

}
// public/core.js
var mainApp = angular.module('mainApp', []);

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

    $scope.newDumyData = function(){
        console.log("calling newDumyData!");
        $http.get('/api/todos/lol')
        .success(function(data, id) {
            console.log(data);
            console.log(id);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // delete a todo after checking it
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





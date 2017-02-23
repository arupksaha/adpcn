angular.module('starter.factory')
.factory('MenuService', function($http) {
    return {
        getMenu: function(userId) {
            return $http.get('/adpcn/jsp/cnadpMenuJson.jsp',{params: {userId: userId}}).then(function(response) { return response.data; });
        };
    };
});
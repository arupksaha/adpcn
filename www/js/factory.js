.factory('UserMenu', function($http) {
 
.factory('MenuService', function($http) {
    return {
        getMenu: function(userId) {
            //return $http.get('/adpcn/jsp/cnadpMenuJson.jsp',{params: {userId: userId}}).then(function(response) { return response.data; });
            return $timeout( function() { 
             return	{"USER_ACCESS":{ "WHATSNEW_FILE_PATH":"" }, "DEFAULT_VIEWS" : [ ] ,  "BU": [ {"MODE":"MGR", "SBU": "MGR","SBUNAME": "Manager", "RCW": "201731", "ADM_FLAG": "N", "FCT_FLAG": "", "CY_MH_FLAG": "MH", "PY_MH_FLAG": "H", "CURR_YEAR": "2017", "PREV_YEAR": "2016", "CURR_PERIOD": "", "USER_ID": "35510" , "DB":[{"FN":"Rollcall", "AID":"","PF":"","SPAID":"","SPPF":"","UNQID":"13196128728004"},{"FN":"Sales Liability", "AID":"","PF":"","SPAID":"","SPPF":"","UNQID":"25435517784057"},{"FN":"YTD Summary", "AID":"","PF":"","SPAID":"","SPPF":"","UNQID":"34504421961001"} ] } ]};
            },2000);

        };
    };
});
});
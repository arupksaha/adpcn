angular.module('starter.controllers', [])
.controller('LoginCtrl', function($scope,$http,$cordovaInAppBrowser,$ionicPlatform,$cordovaDialogs,$timeout,$state) {
    $scope.loginData = {};
    var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
    };

    $scope.doLogin = function () { 
      //console.log('user=' + $scope.loginData.username); 
      //console.log('password=' + $scope.loginData.password); 
      /*
   $ionicPlatform.ready(function() {
    $cordovaInAppBrowser.open('https://spmdit1.nj.adp.com/public/login.html', '_blank', options).then(function(event) {
        $cordovaDialogs.alert('success', 'spmdit1 login', 'OK').then(function() {console.log('scuccess');});
      }).catch(function(event) { 
        $cordovaDialogs.alert('error', 'spmdit1 login', 'OK').then(function() {console.log('error');});
      });


    $cordovaInAppBrowser.close();

  }, false);
   */
      
          var param = "password=" + $scope.loginData.password + "&user=" + $scope.loginData.username;
          $http.post('/loginonget.fcc?'+param,{  
            headers:  
                            { 'Content-Type': 'application/x-www-form-urlencoded' }  
            }).success(function (data,status) {
               console.log('status = '+status); 
               console.log(data);                                                                            
              if (status === 200) {
                //$window.location = '/adpinfo.php';
                $timeout(function () { $state.go('app.Dashboard'); } ,5000);
                //alert('status OK '); 

              }
              else { console.log('status NOT 200 '); };
            })
            .error(function (data,status) { 
               console.log('status = '+status); 
               console.log(data); 
            }); 
             
        } //$scope.doLogin = function () { 

  // Create the login modal that we will use later
  /*
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
*/
/*
  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
*/
})
.controller('DashboardController', function DashboardController($scope,$http,adpcnFactory,$state,$timeout,$ionicLoading) {

$scope.$on("$ionicView.enter", function(event, data){
   // handle event
   console.log("ionicView enter: ");

$ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

$timeout(function () {
    
    console.log("The loading indicator is now hidden");
    //$scope.stooges = [{name: 'Moe'}, {name: 'Larry'}, {name: 'Curly'}];
    //$state.go('app.Rollcall',{unqId : adpcnFactory.userID});
  

//$state.go('app.Rollcall',{unqId : adpcnFactory.userID});
    $scope.userID = adpcnFactory.userID;
    fetchLiabilitySummary();
    $ionicLoading.hide();
    }, 4000).then( function () {
        console.log("Dashboard adpcnFactory unqId : "+ adpcnFactory.unqId);
        $state.go('app.Rollcall',{unqId : adpcnFactory.unqId});
 });   
 });
    $scope.getUserID = function(associateUniqueID) {
            return associateUniqueID.substring(associateUniqueID.indexOf("_")+1);
      }
    
    
    function fetchLiabilitySummary() {
      
      $scope.liabilityUnqID = null;
      for(var i = 0; i < adpcnFactory.userAccessData.length; i++) {
        if(adpcnFactory.userAccessData[i]["DBNAME"] == 'Sales Liability') {
          $scope.liabilityUnqID = adpcnFactory.userAccessData[i]["UNQID"]+"_"+adpcnFactory.userID;
        }
      }
      
      
//$http({url: baseUrl+'adpcn/jsp/cnadpRollcallDMSummaryJson.jsp', method: "GET",params: {rcWeek: adpcnFactory.currentRCWeek, unqId: $scope.liabilityUnqID, dashboardName: 'Sales Liability', sbuCode: adpcnFactory.sbuCode}})
     // .success(function(data, status) { 
      /*
      if(angular.isUndefined(data["LAND_DATA"][0])){
        $scope.firstPeriodName = "";
        $scope.secondPeriodName = "";
        $scope.thirdPeriodName = "";
        $scope.firstPeriodValue = "";
        $scope.secondPeriodValue = "";
        $scope.thirdPeriodValue = "";

      }else{  
        $scope.periodData = data["PERIOD_DATA"][0];
        $scope.liabilityData = data["LAND_DATA"][0]["SALESLIABILITY"][0];
        $scope.firstPeriodName = $scope.periodData["P1"];
        $scope.secondPeriodName = $scope.periodData["P2"];
        $scope.thirdPeriodName = $scope.periodData["P3"];
        var p1 = parseFloat($scope.liabilityData["FTL"]);
        $scope.firstPeriodValue = p1.toLocaleString('en-US', {minimumFractionDigits: 1});
        var p2 = parseFloat($scope.liabilityData["STL"]);
        $scope.secondPeriodValue = p2.toLocaleString('en-US', {minimumFractionDigits: 1});
        var p3 = parseFloat($scope.liabilityData["TTL"]);
        $scope.thirdPeriodValue = p3.toLocaleString('en-US', {minimumFractionDigits: 1});
      }
      */
       //$timeout(function() { 
        //console.log("Dashboard adpcnFactory unqId : "+ adpcnFactory.unqId);
        //$state.go('app.Rollcall',{unqId : adpcnFactory.unqId}); }, 2000);

     // });
  
  }

/*
  function getAssoicateInfo()
    {
      $http({
        url: baseUrl+'adpcn/jsp/cnadpAssociateInfoJson.jsp',
        method: "GET",
        params: {userId: adpcnFactory.userID, userName: adpcnFactory.userID}
      }).success(function(data, status) 
      {
        $scope.aidInfoArray = data;
        $scope.associateName = $scope.aidInfoArray["INFO"][0]["NAME"];
        $scope.title = $scope.aidInfoArray["INFO"][0]["TITLE"];         
      });
    }
    */
})
.controller('buttonDropdownController', function ($scope,adpcnFactory,$rootScope) {

    //$scope.selectedPeriod = adpcnFactory.selectedPeriod;
  //$rootScope.$broadcast('periodChanged', $scope.selectedPeriod);

    //$scope.periods = adpcnFactory.periods;
    $scope.periodsArray = adpcnFactory.earningsPeriodArray;

  if(!angular.isUndefined(adpcnFactory.slperiodsArray)){
$scope.slperiods = adpcnFactory.slperiodsArray;
}
/*
  if(!angular.isUndefined(adpcnFactory.selectedslperiod)){
    adpcnFactory.selectedslnum=adpcnFactory.selectedslperiod[0].NUM;
    $scope.selectedslItem = adpcnFactory.selectedslperiod[0].PNAME;
    $scope.selectedslperiod = adpcnFactory.selectedslperiod;
}
*/
console.log(' adpcnFactory currentRCWeek :' +adpcnFactory.currentRCWeek);
  if(!angular.isUndefined(adpcnFactory.rollcallWeeksArray)){
    $scope.rollcallWeeks = adpcnFactory.rollcallWeeksArray;
  }
  if(!angular.isUndefined(adpcnFactory.currentRCWeek) && adpcnFactory.currentRCWeek!=null){
    $scope.selectedItem = adpcnFactory.currentWeek; //adpcnFactory.currentRCWeek.slice(-2);
  }
  if(!angular.isUndefined(adpcnFactory.monthYear) && adpcnFactory.monthYear!=null){
    $scope.monthandYear = adpcnFactory.monthYear;
  }
  
  $scope.$on('setRCWeekArray', function(event,data) {
    console.log(' setRCWeekArray ');
    $scope.rollcallWeeks = adpcnFactory.rollcallWeeksArray;
    $scope.selectedItem = adpcnFactory.currentWeek; //adpcnFactory.currentRCWeek.slice(-2);
    console.log(' adpcnFactory currentRCWeek ' + adpcnFactory.currentRCWeek);
    $scope.monthandYear = adpcnFactory.monthYear;
  });
  $scope.$on('setEarningsPeriodAndIDArray', function(event,data) {
    $scope.periodsArray = adpcnFactory.earningsPeriodArray;
    if (adpcnFactory.earningsMonth == "") {
      $scope.selectedEarningsMonth = $scope.periodsArray[1]["NAME"];
    } else {
      $scope.selectedEarningsMonth = adpcnFactory.earningsMonth;
    }
  });
  

    $scope.$on('setSLPeriodArray', function(event,data) {
    $scope.slperiods = adpcnFactory.slperiodsArray;
    adpcnFactory.selectedslnum=adpcnFactory.selectedslperiod[0].NUM;
    $scope.selectedslItem = adpcnFactory.selectedslperiod[0].PNAME;
    $scope.selectedslperiod = adpcnFactory.selectedslperiod;
    $rootScope.$broadcast('slperiodchanged', $scope.selectedSLperiod);
  });
  
/*
    $scope.setMaster = function() {
    $scope.selectedPeriod = period.name;
    adpcnFactory.selectedPeriod = period.name;
    console.log('periodChanged :'+ $scope.selectedPeriod);
    $rootScope.$broadcast('periodChanged', $scope.selectedPeriod);
    };
    */
    $scope.setEarningsMonth = function(period) {
      $scope.selectedEarningsMonth = period.NAME;
      adpcnFactory.earningsMonth = period.NAME;
      $rootScope.$broadcast ('earningsMonthChanged', period.ID);
    }
  
  $scope.setRCWeek = function(rcweek) {
    console.log('RC Week :'+$scope.selectedItem);
    //$scope.selectedItem = rcweek; //rcweek.WEEK_CODE.slice(-2);
    adpcnFactory.currentWeek = $scope.selectedItem ;
    adpcnFactory.currentRCWeek = $scope.selectedItem.WEEK_CODE;
    $scope.monthandYear = $scope.selectedItem.MON_CODE;
    adpcnFactory.monthYear = $scope.monthandYear;
    $rootScope.$broadcast('rcWeekChanged', $scope.selectedWeek);
  }

  $scope.setSLPeriod = function(slperiod) {
    $scope.selectedSLperiod = slperiod;
    $scope.selectedslItem =slperiod.PNAME;
    adpcnFactory.selectedslnum=slperiod.NUM;
    adpcnFactory.selectedslperiod[0]=slperiod;
    $rootScope.$broadcast('slperiodchanged', $scope.selectedSLperiod);
  }

    $scope.isSelected = function(section) {
        return $scope.selected === section;
    };

    $scope.status = {
        isopen: false
    };

    $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };
})
.controller('AppCtrl', function($scope, $ionicModal, $timeout,$http,adpcnFactory,$rootScope,$state,$location,$q,$window,UserService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  /*
  $scope.setImage = function(navigationItemName) {
        if(navigationItemName == "Rollcall") {
            return 'fa fa-line-chart';
        } else if(navigationItemName == "YTD Summary") {
            return 'fa fa-dollar';
        }else if(navigationItemName == "Sales Liability") {
            return 'fa fa-car';
        }else if(navigationItemName == "Home") {
            return 'fa fa-home';
        }else if(navigationItemName == "Logout") {
            return 'fa fa-power-off';
        } else if(navigationItemName == "Dashboard") {
      return 'fa fa-dashboard';
    }
    }
*/
//$scope.$on("$ionicView.enter", function(event, data){
   // handle event
   //console.log("ionicView enter AppCtrl: ");
/*
$ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
*/
//$timeout ( function () {
  $rootScope.isRoleOptionsSelected = true;
  if($location.path()!= null && !angular.isUndefined($location.path()) && $location.path() != "" )
  {
    adpcnFactory.currentPageName = $location.path().slice(1);
  }
  $scope.selectedRouteName = adpcnFactory.currentPageName;
  $scope.userPhoto = {};
  console.log('userId =' +userId);
  console.log('userName =' +userName);
  console.log('baseUrl =' +baseUrl);
/*
      $http({ url: baseUrl+'adpcn/jsp/cnadpMenuJson.jsp',method: "GET",params: {userId: userId}}).success(function(data, status) 
      */
      UserService.getMenu(userId).then(function(data) {
        console.log('cnadpMenuJson.jsp');
        console.log(data);
        $scope.userAccess = data;
        $scope.userAccesInfo = [];
        for (var i = 0; i < $scope.userAccess["BU"][0]["DB"].length; i++) 
        { 
          var routeName = null;
          if("Rollcall" == $scope.userAccess["BU"][0]["DB"][i]["FN"])
          {
            routeName = "RC";
          }else if("Sales Liability" == $scope.userAccess["BU"][0]["DB"][i]["FN"])
          {
            routeName = "SL";
          }else if("YTD Summary" == $scope.userAccess["BU"][0]["DB"][i]["FN"])
          {
            routeName = "YTD";
          }
          
            $scope.userAccesInfo[i] = { "DBNAME": $scope.userAccess["BU"][0]["DB"][i]["FN"],
                          "ROUTE" : 'app.'+$scope.userAccess["BU"][0]["DB"][i]["FN"],
                          "UNQID" : $scope.userAccess["BU"][0]["DB"][i]["UNQID"]};        
          
         }  
        console.log($scope.userAccesInfo);
        /*
        adpcnFactory.userAccessData = $scope.userAccesInfo;
        adpcnFactory.mode = $scope.userAccess["BU"][0]["MODE"];
        adpcnFactory.sbuCode = $scope.userAccess["BU"][0]["SBU"];
        adpcnFactory.userID = $scope.userAccess["BU"][0]["USER_ID"];
        adpcnFactory.unqId = $scope.userAccess["BU"][0]["DB"][0]["UNQID"]+"_"+userId;
        */
        $scope.unqId = adpcnFactory.unqId;
        console.log( ' $scope unqId :'+ $scope.unqId );
        //adpcnFactory.navigationPathArray[adpcnFactory.navigationCounter] = {"unqId" : adpcnFactory.unqId};
        $rootScope.showBackButton = false;
/*
      $http({url: baseUrl+'adpcn/jsp/cnadpAssociateInfoJson.jsp',method: "GET",params: {userId: userId, userName: userName}}).success(function(data, status) 
      */
      UserService.getUser(userId,userName).then(function(data) {    
          console.log('cnadpAssociateInfoJson.jsp');
          console.log(data);
          $scope.aidInfoArray = data;
          $scope.associateName = $scope.aidInfoArray["INFO"][0]["NAME"];
          $scope.title = $scope.aidInfoArray["INFO"][0]["TITLE"];

          UserService.getUserPhoto(userId).then(function(data) { $scope.userPhoto = adpcnFactory.userPhoto ; }).catch (function(error) { console.log(error); });
          //$http.get(baseUrl+'adpcn/jsp/cnadpRCWeekInfoJson.jsp').success(function(data, status) {
            UserService.getRCWeek(userId,userName).then(function(data) {
              console.log('cnadpRCWeekInfoJson.jsp');
              console.log(data);
              $scope.weekinfo = data;
              /*
              adpcnFactory.rollcallWeeksArray = $scope.weekinfo["WEEK_INFO"];
              adpcnFactory.currentRCWeek = $scope.weekinfo["CURRWEEK"][0]["WEEK_CODE"];
              adpcnFactory.monthYear = $scope.weekinfo["CURRWEEK"][0]["MON_CODE"];
              */
            $rootScope.$broadcast('setRCWeekArray',adpcnFactory.rollcallWeeksArray);
            //UserService.getTeamInfo(adpcnFactory.currentRCWeek, userId, 'Team Info', 'MGR').then(function(data) { console.log(data); }).catch (function(error) { console.log(error); });

              //$http.get(baseUrl+'adpcn/jsp/cnadpLastUpdatedDates.jsp').success(function(data, status) {
                UserService.getLastUpdateDates(userId).then(function(data) {
                  console.log('cnadpLastUpdatedDates.jsp');
                  console.log(data);
                  $scope.updatedDates = data;
                  $rootScope.lastOTCUpdatedDate = $scope.updatedDates["lstupd"][0]["DB"][0]["OTC"];
                  $rootScope.lastRUNUpdatedDate = $scope.updatedDates["lstupd"][0]["DB"][0]["RUN"];

                  $rootScope.$broadcast('fetchDonutSummaryData');   //call donut data
                  $rootScope.$broadcast('fetchRollcallData');      //call rollcall data

                }).catch (function(error) { console.log(error); });

            }).catch (function(error) { console.log(error); });

        }).catch (function(error) { console.log(error); });
    
      }).catch (function(error) { console.log(error); });
/*
      $http({url: 'http://dc1dvofc02.es.ad.adp.com:8019/OA_HTML/adpcn/jsp/cnadpSLPeriodInfoJson.jsp',method: "GET"}).success(function(data, status)  {
              console.log('cnadpSLPeriodInfoJson.jsp');
              console.log(data);
              $scope.slperiodinfo = data;
              adpcnFactory.slperiodsArray [0]= {"PID":$scope.slperiodinfo["PERIOD_DATA"][0]["PID1"],"PNAME": $scope.slperiodinfo["PERIOD_DATA"][0]["P1"],"NUM":"1"};
              adpcnFactory.slperiodsArray [1]= {"PID":$scope.slperiodinfo["PERIOD_DATA"][0]["PID2"],"PNAME": $scope.slperiodinfo["PERIOD_DATA"][0]["P2"],"NUM":"2"};
              adpcnFactory.slperiodsArray [2]= {"PID":$scope.slperiodinfo["PERIOD_DATA"][0]["PID3"],"PNAME": $scope.slperiodinfo["PERIOD_DATA"][0]["P3"],"NUM":"3"};

              adpcnFactory.currentslperiod[0]  = adpcnFactory.slperiodsArray [0];
              adpcnFactory.selectedslperiod[0] = adpcnFactory.slperiodsArray [0];

            $rootScope.$broadcast('setSLPeriodArray',adpcnFactory.slperiodsArray);
        }).error (function(error) { console.log(error); });

  */
    $scope.profile = {};
   // $ionicLoading.hide();
    //console.log("The loading indicator is now hidden");
  
 // },5000);

// });
 
   // $scope.menuState = menuService.menuState;
   // $scope.toggleMenu = menuService.toggleMenu;
/*
   function initMenuState() {
          $scope.menuState.isDesktop = ($window.innerWidth >= 992);
          menuService.setMenu($scope.menuState.isDesktop);
     }

    // If window changes desktop/mobile menu breakpoints then reset menuState
     $(window).resize(function() {
      var newIsDesktop = ($window.innerWidth >= 992);
      if(newIsDesktop !== $scope.menuState.isDesktop) {
        initMenuState();
      }
    });
*/
    $scope.isActive = function (appId) {
          var regex = new RegExp('^/' + appId);
          return regex.test($location.path());
       };


    $scope.setImage = function(navigationItemName) {
        if(navigationItemName == "Rollcall") {
            return 'fa fa-line-chart';
        } else if(navigationItemName == "YTD Summary") {
            return 'fa fa-dollar';
        }else if(navigationItemName == "Sales Liability") {
            return 'fa fa-car';
        }else if(navigationItemName == "Home") {
            return 'fa fa-home';
        }else if(navigationItemName == "Logout") {
            return 'fa fa-power-off';
        } else if(navigationItemName == "Dashboard") {
      return 'fa fa-dashboard';
    } else if(navigationItemName == "EarningsEstimator") {
      return 'fa fa-calculator';
    } else if(navigationItemName == "Settings") {
      return 'fa fa-gear';
    }else if(navigationItemName == "Role"){
      return 'fa fa-graduation-cap';
    }
    }

  $scope.saveSelectedRoute = function(index) {
    if(index == -1){
      adpcnFactory.currentPageName = "Dashboard";
      $scope.selectedRouteName = "Dashboard";
    } else if (index == -2) {
      adpcnFactory.currentPageName = "Earnings Estimator";
      $scope.selectedRouteName = "Earnings Estimator";
    }  else if (index == -3) {
      adpcnFactory.currentPageName = "Settings";
      $scope.selectedRouteName = "Settings";
    } else {
      adpcnFactory.currentPageName = adpcnFactory.userAccessData[index]["DBNAME"];
      $scope.selectedRouteName = adpcnFactory.currentPageName;
      adpcnFactory.unqId = adpcnFactory.userAccessData[index]["UNQID"]+"_"+userId;
    }
    
  }

  $scope.saveSelectedTabRoute = function(tabName) {
    $scope.selectedRouteName = tabName;
  }

  $scope.removeNavigationPathFromArray = function(){
    adpcnFactory.navigationPathArray.splice(adpcnFactory.navigationCounter, 1);
    adpcnFactory.navigationCounter = adpcnFactory.navigationCounter-1;
    adpcnFactory.unqId = adpcnFactory.navigationPathArray[adpcnFactory.navigationCounter]["unqId"]; 
    $scope.unqId = adpcnFactory.unqId;
    adpcnFactory.mode = adpcnFactory.navigationPathArray[adpcnFactory.navigationCounter]["mode"];;
    if(adpcnFactory.navigationCounter>0){
      $rootScope.showBackButton = true;
    }else{
      $rootScope.showBackButton = false;
    }
    $state.go("Rollcall",{
        unqId : adpcnFactory.unqId
      });

  }

  $rootScope.convertToNumberWithFormat = function(variable){
    return $filter('number')(variable,1);
  }

  $scope.setRoleSelectedtoTrue = function(){
    $rootScope.isRoleOptionsSelected = false;
  }

  $scope.loadDashboardwithBU = function(){
    $state.go("Dashboard");
  }

})

.controller('RollcallCtrl', function($scope,$state,adpcnFactory,$window,$rootScope,$http,$ionicLoading,UserService,NgTableParams,$stateParams,$timeout) {
        

$scope.$on("$ionicView.enter", function(event, data){
   // handle event
   console.log("ionicView enter RollcallCtrl: ");
$ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

$timeout(function () {
    
    console.log("The loading indicator is now hidden");
    
  //$rootScope.$broadcast('periodChanged', $scope.selectedPeriod);
    $scope.tabCode = adpcnFactory.getType;
    $scope.periods = adpcnFactory.periods;
    $scope.selectedPeriod = $scope.periods[0];
    adpcnFactory.selectedPeriod = $scope.selectedPeriod;
    $scope.userPhoto = '';
    console.log('RollcallCtrl selectedPeriod : '+ $scope.selectedPeriod.name) ;
  //get Associate Info if the unqId is not null --- 
  adpcnFactory.unqId = $stateParams.unqId ;
  $scope.propertyName = 'NAME';
  $scope.reverse = true;
  $scope.slider = {};
  $scope.options = {
  loop: false,
   //initialSlide: 0,
     // direction: 'horizontal',
  autoHeight:true,
  effect: 'slide',
  speed: 500
};
  $scope.tabs = [
    { TAB_NAME:'My Team', TAB_CODE:'TAB_SEVP' },
    { TAB_NAME:'Sales Office', TAB_CODE:'TAB_OFF' },
    { TAB_NAME:'Sales Person', TAB_CODE:'TAB_DM' },
  ];
  $scope.teamData = {};                                             
  $scope.officeData = {}; 
  $scope.dmData = {};

   
  console.log('adpcnFactory unqId='+adpcnFactory.unqId);
  if(adpcnFactory.unqId != null && !angular.isUndefined(adpcnFactory.unqId)){
    getAssoicateInfo();
  }
  //console.log(' RollcallCtrl period = ' + adpcnFactory.selectedPeriod);
  //$scope.period = adpcnFactory.selectedPeriod ; //'WTD' ;
                                         
  fetchMyTeamData(); 
  fetchSalesOfficeData();
  fetchSalesPersonData();
  $ionicLoading.hide();
}, 4000);
});   

   $scope.$on('rcWeekChanged', function (event, data) {
    console.log('RC Week Changed to:'+adpcnFactory.currentRCWeek);
    //$scope.selectedItem = rcweek; //rcweek.WEEK_CODE.slice(-2);
    //adpcnFactory.currentWeek = $scope.selectedItem ;
    //adpcnFactory.currentRCWeek = $scope.selectedItem.WEEK_CODE;
    //$scope.monthandYear = $scope.selectedItem.MON_CODE;
    //adpcnFactory.monthYear = $scope.monthandYear;
    fetchMyTeamData(); 
    fetchSalesOfficeData();
    fetchSalesPersonData();
    //$rootScope.$broadcast('rcWeekChanged', $scope.selectedWeek);
  });
                             
                                
    
    $scope.setMaster = function() {
    console.log($scope.selectedPeriod);
    adpcnFactory.selectedPeriod = $scope.selectedPeriod;
    //console.log('periodChanged to:'+ adpcnFactory.selectedPeriod.name);
    $rootScope.$broadcast('periodChanged', $scope.selectedPeriod);
    };

    $scope.getSelectedTabData = function(tabCode){
    adpcnFactory.getType = tabCode;
    $scope.tabCode = adpcnFactory.getType;
    console.log(' adpcnFactory getType '+ adpcnFactory.getType);
    if(adpcnFactory.getType == "TAB_SEVP"){
      $scope.data = $scope.teamData ;
      //fetchSEVPData();
    }else if(adpcnFactory.getType == "TAB_OFF"){ 
      $scope.data = $scope.officeData ;
      //fetchSalesOfficeData();
    }
    else if(adpcnFactory.getType == "TAB_DM"){ 
      $scope.data = $scope.dmData ;
      //fetchSalesPersonData(); 
    }
    
  }

      $scope.addNavigationPathToArray = function(unqId, mode, getType, colName, sbu){
      if(colName == "NAME" && unqId != null && "" != unqId && !angular.isUndefined(unqId)){ //ng-click should work only for MyTeam Tab and MyMgmt Tab
        adpcnFactory.navigationCounter = adpcnFactory.navigationCounter+1;
        adpcnFactory.navigationPathArray[adpcnFactory.navigationCounter] = {"unqId" : unqId,
                                          "mode" : mode};
        adpcnFactory.navigationPathArray;
        adpcnFactory.unqId = unqId;
        adpcnFactory.mode = mode;
        adpcnFactory.sbu = sbu;
        if(adpcnFactory.navigationCounter>0){
          $rootScope.showBackButton = true;
        }else{
          $rootScope.showBackButton = false;
        }
        $state.go("Rollcall",{
          unqId : unqId
        }
        );
      }else if(colName == "WG" || colName == "WNS" || colName == "WAUD" || colName == "WN" || colName == "MG" || colName == "MNS" || colName == "MAUD" || colName == "MN"){
        
        adpcnFactory.navigationCounter = adpcnFactory.navigationCounter+1;
        adpcnFactory.navigationPathArray[adpcnFactory.navigationCounter] = {"unqId" : "DETAIL",
                                          "mode" : mode};

        if(adpcnFactory.navigationCounter>0){
          $rootScope.showBackButton = true;
        }else{
          $rootScope.showBackButton = false;
        }       
               
        $state.go("RCTransactionsSummary");
      }
    }
  
$scope.sorterFunc = function(propertyName){
    return parseFloat(propertyName);
};

  $scope.sortBy = function(propertyName, isFloat) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
    if(isFloat) {
            angular.forEach($scope.data, function (row) {
            for(var column in row )
            {
               if(column == propertyName && row[column] != '') 
                  row[propertyName] =  parseFloat(row[propertyName]);       
            }
           });
        }
  };

  function fetchSalesPersonData(){
    console.log(' fetchSalesOfficeData mode :' +adpcnFactory.mode) ;
    console.log(' fetchSalesOfficeData  getType: '+ adpcnFactory.getType);
//    $http.get(baseUrl+'adpcn/jsp/cnadpRollcallMyTeamJson.jsp',{params: {rcWeek: adpcnFactory.currentRCWeek, unqId: adpcnFactory.unqId, mode:adpcnFactory.mode, getType:adpcnFactory.getType}}).success(function(data, status) {
    UserService.getDMRollCall(adpcnFactory.currentRCWeek, adpcnFactory.unqId, adpcnFactory.mode, 'TAB_DM').then(function (data) {
      $scope.dmData = adpcnFactory.dmData["TABS"][0]["DATA"];
      console.log('function fetchSalesPersonData');
      console.log($scope.dmData);  
      //$scope.tabName = adpcnFactory.getType;
      //$scope.showSalesOffTab = true;
      //$scope.rows=[];
      //$scope.tables = [];

    });

  }

//fuction set SalesOffice tab data to $scope.data variable and set table display data to $scope.tables array
  function fetchSalesOfficeData(){
     console.log(' fetchSalesOfficeData mode :' +adpcnFactory.mode) ;
     console.log(' fetchSalesOfficeData  getType: '+ adpcnFactory.getType);
//$http({url: baseUrl+'adpcn/jsp/cnadpRollcallMyTeamJson.jsp',method: "GET",params: {rcWeek: adpcnFactory.currentRCWeek, unqId: adpcnFactory.unqId, mode:adpcnFactory.mode, getType:adpcnFactory.getType}}).success(function(data, status) {
   UserService.getOfficeRollCall(adpcnFactory.currentRCWeek, adpcnFactory.unqId, adpcnFactory.mode, 'TAB_OFF').then(function (data) {
      $scope.officeData = adpcnFactory.officeData["TABS"][0]["DATA"];
      console.log('function fetchSalesOfficeData');
      console.log($scope.officeData);
      //$scope.data = adpcnFactory.officedata;  
      //$scope.tabName = adpcnFactory.getType;
      //$scope.showSalesOffTab = true;
    }).catch(function (error) {console.log(error)});
  }

  function fetchMyTeamData()  {
    //$http({url: 'http://dc1dvofc02.es.ad.adp.com:8019/OA_HTML/adpcn/jsp/cnadpRollcallDMSummaryJson.jsp',method: "GET",params: {rcWeek: adpcnFactory.currentRCWeek, unqId: adpcnFactory.unqId, dashboardName: 'Team Info', sbuCode: adpcnFactory.sbuCode}
    //}).success(function(data, status) {
           // $scope.data = data;
      console.log(' fetchMyTeamData adpcnFactory currentRCWeek :' + adpcnFactory.currentRCWeek); 
      console.log(' fetchMyTeamData adpcnFactory unqId :' + adpcnFactory.unqId); 
      console.log(' fetchMyTeamData adpcnFactory sbuCode :' + adpcnFactory.sbuCode);     
      UserService.getTeamInfo(adpcnFactory.currentRCWeek, adpcnFactory.unqId, 'Team Info', adpcnFactory.sbuCode).then(function(data) {
       $scope.teamData =  adpcnFactory.teamInfo["LAND_DATA"][0]["TEAMINFO"][0]["DATA"];
       $scope.data = $scope.teamData ;
       console.log('function fetchMyTeamData');
       console.log($scope.data);
        //});
      }).catch (function(error) { console.log(error); });
  }  

function getAssoicateInfo()
    {
      //$http({url: baseUrl+'adpcn/jsp/cnadpAssociateInfoJson.jsp',method: "GET",params: {userId: adpcnFactory.unqId.substring(adpcnFactory.unqId.indexOf("_")+1), userName: userName}
      //}).success(function(data, status) 
      //{
        //$scope.aidInfoArray = data;
        //$scope.associateName = $scope.aidInfoArray["INFO"][0]["NAME"];
        //$scope.title = $scope.aidInfoArray["INFO"][0]["TITLE"]; 
        UserService.getUser(adpcnFactory.unqId.substring(adpcnFactory.unqId.indexOf("_")+1),'').then (function(data) {
        $scope.userId = adpcnFactory.unqId.substring(adpcnFactory.unqId.indexOf("_")+1);
        $scope.associateName = adpcnFactory.associateName ;
        console.log(' associateName = ' + $scope.associateName );
        $scope.title = adpcnFactory.title ;
        console.log(' title = ' + $scope.title );
        UserService.getUserPhoto($scope.userId).then (function(data) { 
          $scope.userPhoto = adpcnFactory.userPhoto ;
          console.log(' userPhoto = ' + $scope.userPhoto );
        }).catch(function(error) { console.log(error);});
        console.log('Rollcall userId ='+userId);
      }).catch(function(error) { console.log(error);});
    }

//$scope.data = {};


$scope.$on("$ionicSlides.sliderInitialized", function(event, data){
  // data.slider is the instance of Swiper
  $scope.slider = data.slider;
  console.log('slider Initialized');
  console.log($scope.slider);
});

$scope.$on("$ionicSlides.slideChangeStart", function(event, data){
  console.log('Slide change is beginning');
});

$scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
  // note: the indexes are 0-based
  console.log('slide Change End');
  $scope.slider.activeIndex = data.slider.activeIndex;
  $scope.slider.previousIndex = data.slider.previousIndex;
  console.log($scope.slider);
});

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})
.controller('lineChartCtrl', function ($scope,$http,adpcnFactory,UserService) {

  //This is not a highcharts object. It just looks a little like one!
  Highcharts.setOptions({
    lang: {
      numericSymbols: null, //otherwise by default ['k', 'M', 'G', 'T', 'P', 'E']
      thousandsSep: ''
    }
  });

  $scope.showDropDown=true;

  //get periods to be shown in period dropdown in the rollcall Sales Graph
  $scope.rcGraphPeriods = adpcnFactory.rcGraphPeriods;

  $scope.selectedRcGraphPeriod = adpcnFactory.selectedRcGraphPeriod;

  //method to set the period selected from drop down
   $scope.setrcGraphPeriod = function(period) {
    $scope.selectedRcGraphPeriod = period.name;
    $scope.changeGraph("SALES");
    };

  //configure Sales graph parameters
      $scope.chartConfig = {

        options: {
            //This is the Main Highcharts chart config. Any Highchart options are valid here.
            //will be overriden by values specified below.
            chart: {        
        type: 'area',
                style: {
                    fontFamily: 'inherit'
                }
            },
      legend: {
        align: 'right',
        verticalAlign: 'top',
        layout: 'vertical'
      },
      tooltip: {
        shared: true
      },
            plotOptions: {
                series: {
                    allowPointSelect: true,
                    marker: {
                        symbol: 'circle',
                        radius: 4,
                        fillColor: '#ffffff',
                        lineColor: null,
                        lineWidth: '2',
                        states: {
                            hover: {
                                radius: 4,
                                fillColor: '#ffffff',
                                lineColor: null,
                                lineWidth: '2'
                            },
                            select: {
                                radius: 7,
                                fillColor: '#ffffff',
                                lineColor: null,
                                lineWidth: '2'
                            }
                        }
                    }
                },
                column: {
                    allowPointSelect: false,
                    borderWidth: 0
                },
        area: {
          fillOpacity: 0.1
        }
            }
        },
        //The below properties are watched separately for changes.

        //Series object (optional) - a list of series using normal highcharts series options.
        series: [{
      threshold: null,
      data : [],
      color: '#F47B19'      
        }, {
      threshold: null,
            data: [],
      color: '#6c0090'
        }],
        credits: {
            enabled: false
        },
        //Title configuration (optional)
        title: {
      text: null,
            x: 20
        },
        //Boolean to control showng loading status on chart (optional)
        //Could be a string if you want to show specific loading text.
        loading: false,
        //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
        //properties currentMin and currentMax provied 2-way binding to the chart's maximimum and minimum
        xAxis: {
            categories: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
                'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'],
      labels: {
                style: {
                    color: '#1a8099'
                }
            },
            lineWidth: 1
        },
    yAxis: {
      title: {
      text: null
      },
      labels: {
              style: {
              color: 'black'
        }
      },
            lineWidth: 1
        },
        //Whether to use HighStocks instead of HighCharts (optional). Defaults to false.
        useHighStocks: false,
        //size (optional) if left out the chart will default to size of the div or something sensible.
        size: {
            height: 200
        },
        //function (optional)
        func: function (chart) {
            //setup some logic for the chart
        }
    };
  /*
    $scope.chartConfig = {

        options: {
            //This is the Main Highcharts chart config. Any Highchart options are valid here.
            //will be overriden by values specified below.
            chart: {        
        type: 'area',
                style: {
                    fontFamily: 'inherit'
                }
            },
      legend: {
        align: 'right',
        verticalAlign: 'top',
        layout: 'vertical'
      },
      tooltip: {
        shared: true
      },
            plotOptions: {
                series: {
                    allowPointSelect: true,
                    marker: {
                        symbol: 'circle',
                        radius: 4,
                        fillColor: '#ffffff',
                        lineColor: null,
                        lineWidth: '2',
                        states: {
                            hover: {
                                radius: 4,
                                fillColor: '#ffffff',
                                lineColor: null,
                                lineWidth: '2'
                            },
                            select: {
                                radius: 7,
                                fillColor: '#ffffff',
                                lineColor: null,
                                lineWidth: '2'
                            }
                        }
                    }
                },
                column: {
                    allowPointSelect: false,
                    borderWidth: 0
                },
        area: {
          fillOpacity: 0.1
        }
            }
        },
        //The below properties are watched separately for changes.

        //Series object (optional) - a list of series using normal highcharts series options.
        series: [
        {
          name: "Series 1",
      threshold: null,
      data : [100, 150, 120, 80, 70,60,50,40,30,20,10,10],
      color: '#F47B19'      
        }, 
        {
        name: "Series 2",
      threshold: null,
      data : [120, 130, 140, 180, 170,160,150,140,130,120,110,110],
      color: '#F47B19'      
        }, 
        {
      threshold: null,
            data: [],
      color: '#6c0090'
        }],
        credits: {
            enabled: false
        },
        //Title configuration (optional)
        title: {
      text: null,
            x: 20
        },
        //Boolean to control showng loading status on chart (optional)
        //Could be a string if you want to show specific loading text.
        loading: false,
        //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
        //properties currentMin and currentMax provied 2-way binding to the chart's maximimum and minimum
        xAxis: {
            categories: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
                'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'],
      labels: {
                style: {
                    color: '#1a8099'
                }
            },
            lineWidth: 1
        },
    yAxis: {
      title: {
      text: null
      },
      labels: {
              style: {
              color: 'black'
        }
      },
            lineWidth: 1
        },
        //Whether to use HighStocks instead of HighCharts (optional). Defaults to false.
        useHighStocks: false,
        //size (optional) if left out the chart will default to size of the div or something sensible.
        size: {
            height: 200
        },
        //function (optional)
        func: function (chart) {
            //setup some logic for the chart
        }
    };
*/
  fetchRollcallGraphData();
/*
  scope.$on('resize', function () {
         chart.reflow();
      });
*/
  //method calls the jsp which generates JSON of Graph data
  
  function fetchRollcallGraphData() 
  {
  
//$http({url: baseUrl+'adpcn/jsp/cnadpRollcallGraphJson.jsp',method: "GET",params: {rcWeek: adpcnFactory.currentRCWeek, unqId: adpcnFactory.unqId, getType: 'MGR', sbu : 'NULL'}}).success(function(data, status) {
  UserService.getRollCallGraph(adpcnFactory.currentRCWeek, adpcnFactory.unqId,'MGR','NULL').then(function(data) {
      $scope.salesGraphSeries1Data = [];
      $scope.salesGraphSeries2Data = [];
      $scope.salesYTDGraphSeries1Data = [];
      $scope.salesYTDGraphSeries2Data = [];
      $scope.ytdGraphSeries1Data = [];
      $scope.ytdGraphSeries2Data = [];

      //set legend names dynamically
      $scope.chartConfig["series"][0]["name"]='FY-'+data["GRAPHDATA"][0]["FICAL_YEAR"];
      $scope.chartConfig["series"][1]["name"]='FY-'+data["GRAPHDATA"][1]["FICAL_YEAR"];
  
      //set data dynamically to the graph for previous year
      rcGraphDataSeries1 = data["GRAPHDATA"][0]["DATA"];      
      for(var i=0; i<rcGraphDataSeries1.length; i++){
        $scope.salesGraphSeries1Data.push(parseFloat(rcGraphDataSeries1[i]["MTD_SALES"]));
        $scope.salesYTDGraphSeries1Data.push(parseFloat(rcGraphDataSeries1[i]["YTD_SALES"]));
        $scope.ytdGraphSeries1Data.push(parseFloat(rcGraphDataSeries1[i]["YTD_PERC"]));
      }
      

      //set data dynamically to the graph for current year
      rcGraphDataSeries2 = data["GRAPHDATA"][1]["DATA"];      
      for(var i=0; i<rcGraphDataSeries2.length; i++){
        $scope.salesGraphSeries2Data.push(parseFloat(rcGraphDataSeries2[i]["MTD_SALES"]));
        $scope.salesYTDGraphSeries2Data.push(parseFloat(rcGraphDataSeries1[i]["YTD_SALES"]));
        $scope.ytdGraphSeries2Data.push(parseFloat(rcGraphDataSeries2[i]["YTD_PERC"]));
      }
      

      if($scope.selectedRcGraphPeriod == "MTD"){
        $scope.chartConfig["series"][0]["data"] = $scope.salesGraphSeries1Data;
        $scope.chartConfig["series"][1]["data"] = $scope.salesGraphSeries2Data;
        //set max and min values of the YAxis of graph based on the min and max values of the json FOR both SALES AND YTD% graphs
        var maxValue = Math.max(Math.max.apply(null,$scope.salesGraphSeries1Data),Math.max.apply(null,$scope.salesGraphSeries2Data));
        var minValue = Math.min(Math.min.apply(null,$scope.salesGraphSeries1Data),Math.min.apply(null,$scope.salesGraphSeries2Data));

      }else if($scope.selectedRcGraphPeriod == "YTD"){
        $scope.chartConfig["series"][0]["data"] = $scope.salesYTDGraphSeries1Data;
        $scope.chartConfig["series"][1]["data"] = $scope.salesYTDGraphSeries2Data;
        //set max and min values of the YAxis of graph based on the min and max values of the json FOR both SALES AND YTD% graphs
        var maxValue = Math.max(Math.max.apply(null,$scope.salesYTDGraphSeries1Data),Math.max.apply(null,$scope.salesYTDGraphSeries2Data));
        var minValue = Math.min(Math.min.apply(null,$scope.salesYTDGraphSeries1Data),Math.min.apply(null,$scope.salesYTDGraphSeries2Data));
      }     
    
      $scope.chartConfig["yAxis"]["min"]=minValue;
      $scope.chartConfig["yAxis"]["max"]=maxValue;
      $scope.chartConfig["yAxis"]["tickAmount"]= 6;
      
    }).catch(function(error) { console.log(error) });
  }


  $scope.changeGraph = function(graphName)
  {

    //set data dynamically to the graph
    if(graphName == "SALES"){
      $scope.showDropDown = true;
      if($scope.selectedRcGraphPeriod == "MTD"){
        $scope.chartConfig["series"][0]["data"] = $scope.salesGraphSeries1Data;
        $scope.chartConfig["series"][1]["data"] = $scope.salesGraphSeries2Data;

        //set max and min values of the YAxis of graph based on the min and max values of the json FOR both SALES AND YTD% graphs
        var maxValue = Math.max(Math.max.apply(null,$scope.salesGraphSeries1Data),Math.max.apply(null,$scope.salesGraphSeries2Data));
        var minValue = Math.min(Math.min.apply(null,$scope.salesGraphSeries1Data),Math.min.apply(null,$scope.salesGraphSeries2Data));

      }else if($scope.selectedRcGraphPeriod == "YTD"){
        $scope.chartConfig["series"][0]["data"] = $scope.salesYTDGraphSeries1Data;
        $scope.chartConfig["series"][1]["data"] = $scope.salesYTDGraphSeries2Data;

        //set max and min values of the YAxis of graph based on the min and max values of the json FOR both SALES AND YTD% graphs
        var maxValue = Math.max(Math.max.apply(null,$scope.salesYTDGraphSeries1Data),Math.max.apply(null,$scope.salesYTDGraphSeries2Data));
        var minValue = Math.min(Math.min.apply(null,$scope.salesYTDGraphSeries1Data),Math.min.apply(null,$scope.salesYTDGraphSeries2Data));
      }

      //set colors to the series of the graph
      $scope.chartConfig["series"][0]["color"] = '#F47B19';
      $scope.chartConfig["series"][1]["color"] = '#6c0090';

    }else if(graphName == "YTD"){
      $scope.showDropDown = false;
      $scope.chartConfig["series"][0]["data"] = $scope.ytdGraphSeries1Data;
      $scope.chartConfig["series"][1]["data"] = $scope.ytdGraphSeries2Data;

      //set max and min values of the YAxis of graph based on the min and max values of the json FOR both SALES AND YTD% graphs
      var maxValue = Math.max(Math.max.apply(null,$scope.ytdGraphSeries1Data),Math.max.apply(null,$scope.ytdGraphSeries1Data));
      var minValue = Math.min(Math.min.apply(null,$scope.ytdGraphSeries2Data),Math.min.apply(null,$scope.ytdGraphSeries2Data));

      //set colors to the series of the graph
      $scope.chartConfig["series"][0]["color"] = '#EAB014';
      $scope.chartConfig["series"][1]["color"] = '#1A6CCC';
    } 

    $scope.chartConfig["yAxis"]["min"]=minValue;
    $scope.chartConfig["yAxis"]["max"]=maxValue;
    $scope.chartConfig["yAxis"]["tickAmount"]= 6;

  }

  $scope.showSalesGraphData = function()
  {
    alert('click function');
  }
})
.controller("tableGridController", function ($scope, $http, $filter, $rootScope,$q, adpcnFactory,NgTableParams) {


    $scope.selectedRows = [];
    $scope.currentPage = 1;
  //$scope.selectedPeriod = adpcnFactory.selectedPeriod;
  console.log('adpcnFactory selectedPeriod :'+adpcnFactory.selectedPeriod);
  /*
  $scope.$on('periodChanged', function (event, data) {
$scope.selectedPeriod = data;
    $scope.tables = []; 
    $scope.sltables = [];   //clear tables array other wise n number of tables will be created
    if(adpcnFactory.mode == "DM"){
      if("WTD" == $scope.selectedPeriod){
        $scope.tables.push({rows: $scope.rows, cols: ["SO","WG","WNS","WRS","WAUD","WN","WQ","WPT"]});
      }else if("MTD" == $scope.selectedPeriod){
        $scope.tables.push({rows: $scope.rows, cols: ["SO","MG","MNS","MRS","MAUD","MN","MQ","MPT"]});
      }else if("YTD" == $scope.selectedPeriod){
        $scope.tables.push({rows: $scope.rows, cols: ["SO","YG","YNS","YRS","YAUD","YN","YQ","YPT"]});
      }
    }else if(adpcnFactory.getType == "TAB_OFF" || adpcnFactory.mode == "DM"){   //FOR sales office tab add the columns related to sales office
      if("WTD" == $scope.selectedPeriod){
        $scope.tables.push({rows: $scope.rows, cols: ["SO","WG","WNS","WRS","WAUD","WN","WQ","WPT"]});
      }else if("MTD" == $scope.selectedPeriod){
        $scope.tables.push({rows: $scope.rows, cols: ["SO","MG","MNS","MRS","MAUD","MN","MQ","MPT"]});
      }else if("YTD" == $scope.selectedPeriod){
        $scope.tables.push({rows: $scope.rows, cols: ["SO","YG","YNS","YRS","YAUD","YN","YQ","YPT"]});
      }
    }else if (adpcnFactory.getType == "TAB_DM")
    {
      if("WTD" == $scope.selectedPeriod){
        $scope.tables.push({rows: $scope.rows, cols: ["NAME","SO","WG","WNS","WRS","WAUD","WN","WQ","WPT"]});
      }else if("MTD" == $scope.selectedPeriod){
        $scope.tables.push({rows: $scope.rows, cols: ["NAME","SO","MG","MNS","MRS","MAUD","MN","MQ","MPT"]});
      }else if("YTD" == $scope.selectedPeriod){
        $scope.tables.push({rows: $scope.rows, cols: ["NAME","SO","YG","YNS","YRS","YAUD","YN","YQ","YPT"]});
      }
    }else
    {
      if("WTD" == $scope.selectedPeriod){
        $scope.tables.push({rows: $scope.rows, cols: ["NAME","RNAME","WG","WNS","WRS","WAUD","WN","WQ","WPT"]});
      }else if("MTD" == $scope.selectedPeriod){
        $scope.tables.push({rows: $scope.rows, cols: ["NAME","RNAME","MG","MNS","MRS","MAUD","MN","MQ","MPT"]});
      }else if("YTD" == $scope.selectedPeriod){
        $scope.tables.push({rows: $scope.rows, cols: ["NAME","RNAME","YG","YNS","YRS","YAUD","YN","YQ","YPT"]});
      }
    }
  });
*/

  $scope.$on('rcWeekChanged', function (event, data) {
    fetchRCData();
   });

$scope.$on('slperiodchanged', function (event, data) {
    fetchSLData();
fetchSLCUSTData();
fetchSLPRODData();

 });
/*
  //the method fetchRCData/fetchMyTeamData is to be called only after unqId and currentRCWeek is fetched in cnadpDashboardLayout.js
  $scope.$on('fetchRollcallData', function (event) {
    //if(adpcnFactory.currentPageName == 'Dashboard'){
    fetchMyTeamData();
    //} else{
      fetchRCData();
    //} 
   });
*/



  //if(adpcnFactory.unqId != null && !angular.isUndefined(adpcnFactory.unqId)){
    //if(adpcnFactory.currentPageName == 'Dashboard'){
    //fetchMyTeamData();
   // }else{
      //fetchRCData();
   // } 
  //}

  $scope.showSalesOffTab = false;

    $scope.onKeyPress = function(keyEvent) {

        console.log(keyEvent);

        if (keyEvent.which === 13) {
            alert('I am an alert');
        }
    };

  $scope.urlString = '../OA_HTML/adpcn/jsp/cnadpRollcallMyTeamJson.jsp';
    
    
    // Row Selection

    $scope.selectRow = function(e) {

        // Current selected row index
        var arrayIndex = $scope.selectedRows.indexOf(this.user);

        // if row not in array of selected
        if(arrayIndex == -1) {

            // If no modifiers, assume individual select, reset array
            if(!e.metaKey && !e.ctrlKey && !e.shiftKey) {
                $scope.selectedRows = [];
            }

            // Shift key pressed
            if(e.shiftKey) {

                // Define start and end rows
                var startRow = $scope.users.indexOf($scope.selectedRows[0]),
                    endRow = $scope.users.indexOf(this.user);

                // Check if shift select upward, traverse
                if(startRow > endRow) {

                    // Nifty way to swap 2 variables
                    endRow = [startRow, startRow = endRow][0];
                }

                // Get range in between selected rows
                $scope.usersToAdd = $scope.users.slice(startRow, endRow);

                // Loop through range to see if in selectedRows already
                angular.forEach($scope.usersToAdd, function(value, key){
                    if($scope.selectedRows.indexOf(value) == -1) {

                        // Add the rows that aren't
                        $scope.selectedRows.push(value);
                    }
                });

            }

            // Add this row
            $scope.selectedRows.push(this.user);

        } else {

            // Row is in array of selected

            // If Cmd or Ctrl pressed
            if(e.metaKey || e.ctrlKey) {
                $scope.selectedRows.splice(arrayIndex, 1);
            } else {
                // Add this row as the only row now
                $scope.selectedRows = [];
                $scope.selectedRows.push(this.user);
            }

        }

    };

  $scope.setRouteName = function() {
    adpcnFactory.currentPageName = "Rollcall Transactions";   
  }

  /*
  function fetchMyTeamData()  {
    //$http({url: 'http://dc1dvofc02.es.ad.adp.com:8019/OA_HTML/adpcn/jsp/cnadpRollcallDMSummaryJson.jsp',method: "GET",params: {rcWeek: adpcnFactory.currentRCWeek, unqId: adpcnFactory.unqId, dashboardName: 'Team Info', sbuCode: adpcnFactory.sbuCode}
    //}).success(function(data, status) {
           // $scope.data = data;
       $scope.data = adpcnFactory.teamInfo["LAND_DATA"][0]["TEAMINFO"][0]["DATA"];
       console.log('function fetchMyTeamData');
       console.log($scope.data);
       $scope.tableParams = new NgTableParams({
              page: 1,            // show first page
              count: 10,          // count per page
              sorting: {          // initial sorting
                batch_id: 'desc'
              },
              filter: {
                owner: ''       // initial filter
              }
            }, {
              total: $scope.data.length, // length of data
              getData: function ($defer, params) {

                // use build-in angular filter
                var orderedData = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                orderedData = params.sorting() ? $filter('orderBy')($scope.data, params.orderBy()) : $scope.data;

                $scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                params.total(orderedData.length); // set total for recalc pagination
                params.totalPages = Math.ceil(params.total() / params.count());
                params.currPageItemStart = params.page();
                params.currPageItemEnd = params.count() * params.page();

                // if greater than first page, calculate current page start item

                if (params.page() > 1)
                  params.currPageItemStart = ((params.page() * params.count()) - params.count()) + 1;

                // if less than total count of items, set number to total

                if (params.currPageItemEnd > params.total())
                  params.currPageItemEnd = params.total();

                $defer.resolve($scope.users);
              }
          });
          
        //});
  }
*/
  
  //first time loading
  /*
   function fetchRCData() {
    $http({
url: 'http://dc1dvofc02.es.ad.adp.com:8019/OA_HTML/adpcn/jsp/cnadpRollcallMyTeamJson.jsp',
method: "GET",
params: {rcWeek: adpcnFactory.currentRCWeek, unqId: adpcnFactory.unqId, mode:adpcnFactory.mode, getType:"NULL", sbu : adpcnFactory.sbu}
})
        .success(function(data, status) {
        $scope.tables=[];
      //store tabs(My mgmt Team, Sales Office, Salesperson, My Team) information in $scope.tabs variable to create tabs dynamically
      $scope.tabs = data["TABS"];
      $scope.firstTab = $scope.tabs[0]["TAB_CODE"];

      adpcnFactory.getType = $scope.firstTab;
      console.log(' adpcnFactory getType : '+adpcnFactory.getType);
      //if My mgmt tab doesnot exists then other JSON to be called for Office/ My Team(salesperson) data
      if(adpcnFactory.getType == "TAB_OFF")
      {
        fetchSalesOfficeData();
      }else if(adpcnFactory.getType == "TAB_DM"){
        fetchSalesPersonData();
      }else if (adpcnFactory.mode == "DM"){
        adpcnFactory.rcdata = data["TABS"][0]["DATA"];
        $scope.data = adpcnFactory.rcdata;
        $scope.rows=[];
        $scope.tables = [];
        for(var i=0; i< adpcnFactory.rcdata.length;i++)
        {     
          var element = adpcnFactory.rcdata[i];
          var newArray = {"SO"      : element.SO,
                  "ASSOCIATE_ID"  : element.ASSOCIATE_ID,
                  "DRILLDOWN_MODE": element.DRILLDOWN_MODE,
                  "BU"      : element.BU,               
                  "WG"      : $filter('number')(element.WG, 1),
                  "WNS"     : $filter('number')(element.WNS, 1),
                  "WRS"     : $filter('number')(element.WRS, 1),
                  "WAUD"      : $filter('number')(element.WAUD, 1),
                  "WN"      : $filter('number')(element.WN, 1),
                  "WQ"      : $filter('number')(element.WQ, 1),
                  "WPT"     : $filter('number')(element.WPT.replace("%",""), 1),
                  "MG"      : $filter('number')(element.MG, 1),
                  "MNS"     : $filter('number')(element.MNS, 1),
                  "MRS"     : $filter('number')(element.MRS, 1),
                  "MAUD"      : $filter('number')(element.MAUD, 1),
                  "MN"      : $filter('number')(element.MN, 1),
                  "MQ"      : $filter('number')(element.MQ, 1),
                  "MPT"     : $filter('number')(element.MPT.replace("%",""), 1),
                  "YG"      : $filter('number')(element.YG, 1),
                  "YNS"     : $filter('number')(element.YNS, 1),
                  "YRS"     : $filter('number')(element.YRS, 1),
                  "YAUD"      : $filter('number')(element.YAUD, 1),
                  "YN"      : $filter('number')(element.YN, 1),
                  "YQ"      : $filter('number')(element.YQ, 1),
                  "YPT"     : $filter('number')(element.YPT.replace("%",""), 1),
                  "GETTYPE"   : adpcnFactory.getType
                };
          $scope.rows.push(newArray);
        } 
        $scope.colNames = ["Sales Office", "Gross", "No Start","ReStart", "Audit", "Net Sales", "Quota", "% of Quota"];
        $scope.tables.push({rows: $scope.rows, cols: ["SO","WG","WNS","WRS","WAUD","WN","WQ","WPT"]});
      }else{
        adpcnFactory.rcdata = data["TABS"][0]["DATA"];
        $scope.data = adpcnFactory.rcdata;
        $scope.rows=[];
        $scope.tables = [];
        for(var i=0; i< adpcnFactory.rcdata.length;i++)
        {     
          var element = adpcnFactory.rcdata[i];
          var newArray = {"NAME"      : element.NAME,
                  "ASSOCIATE_ID"  : element.ASSOCIATE_ID,
                  "DRILLDOWN_MODE": element.DRILLDOWN_MODE,
                  "BU"      : element.BU,
                  "RNAME"     : element.RNAME,                  
                  "WG"      : $filter('number')(element.WG, 1),
                  "WNS"     : $filter('number')(element.WNS, 1),
                  "WRS"     : $filter('number')(element.WRS, 1),
                  "WAUD"      : $filter('number')(element.WAUD, 1),
                  "WN"      : $filter('number')(element.WN, 1),
                  "WQ"      : $filter('number')(element.WQ, 1),
                  "WPT"     : $filter('number')(element.WPT, 1),
                  "MG"      : $filter('number')(element.MG, 1),
                  "MNS"     : $filter('number')(element.MNS, 1),
                  "MRS"     : $filter('number')(element.MRS, 1),
                  "MAUD"      : $filter('number')(element.MAUD, 1),
                  "MN"      : $filter('number')(element.MN, 1),
                  "MQ"      : $filter('number')(element.MQ, 1),
                  "MPT"     : $filter('number')(element.MPT, 1),
                  "YG"      : $filter('number')(element.YG, 1),
                  "YNS"     : $filter('number')(element.YNS, 1),
                  "YRS"     : $filter('number')(element.YRS, 1),
                  "YAUD"      : $filter('number')(element.YAUD, 1),
                  "YN"      : $filter('number')(element.YN, 1),
                  "YQ"      : $filter('number')(element.YQ, 1),
                  "YPT"     : $filter('number')(element.YPT, 1),
                  "GETTYPE"   : adpcnFactory.getType
                  };
          $scope.rows.push(newArray);
        } 
        $scope.colNames = ["Manager Name","Role","Gross", "No Start","ReStart", "Audit", "Net Sales", "Quota", "% of Quota"];
        $scope.tables.push({rows: $scope.rows, cols: ["NAME","RNAME","WG","WNS","WRS","WAUD","WN","WQ","WPT"]});

        //pagination
        $scope.tableParams = new NgTableParams({
              page: 1,            // show first page
              count: 30,          // count per page
              sorting: {          // initial sorting
                name: 'desc'
              },
              filter: {
                owner: ''       // initial filter
              }
            }, {
              total: $scope.data.length, // length of data
              getData: function ($defer, params) {

                // use build-in angular filter
                var orderedData = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                orderedData = params.sorting() ? $filter('orderBy')($scope.data, params.orderBy()) : $scope.data;

                $scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                params.total(orderedData.length); // set total for recalc pagination
                params.totalPages = Math.ceil(params.total() / params.count());
                params.currPageItemStart = params.page();
                params.currPageItemEnd = params.count() * params.page();

                // if greater than first page, calculate current page start item

                if (params.page() > 1)
                  params.currPageItemStart = ((params.page() * params.count()) - params.count()) + 1;

                // if less than total count of items, set number to total

                if (params.currPageItemEnd > params.total())
                  params.currPageItemEnd = params.total();

                $defer.resolve($scope.users);
              }
        });
      }

        });
  }
  */

  $scope.getSelectedTabData = function(tabCode){
    adpcnFactory.getType = tabCode;
    console.log('tabCode :'+tabCode);
    if(adpcnFactory.getType == "TAB_SEVP"){
      fetchSEVPData();
    }else if(adpcnFactory.getType == "TAB_OFF"){
      fetchSalesOfficeData();
    }else if(adpcnFactory.getType == "TAB_DM"){
      fetchSalesPersonData();
    }
  }


  //fuction set MyTeam tab data to $scope.data variable and set table display data to $scope.tables array
  /*
  function fetchSEVPData(){
    $http({
      url: baseUrl+'adpcn/jsp/cnadpRollcallMyTeamJson.jsp',
      method: "GET",
      params: {rcWeek: adpcnFactory.currentRCWeek, unqId: adpcnFactory.unqId, mode:adpcnFactory.mode, getType:"NULL"}  //getType should be NULL for MyTeam Tab
    })
        .success(function(data, status) {
      adpcnFactory.rcdata = data["TABS"][0]["DATA"];
      $scope.data = adpcnFactory.rcdata;
      $scope.rows=[];
      $scope.tables = [];
      for(var i=0; i< adpcnFactory.rcdata.length;i++){      
        var element = adpcnFactory.rcdata[i];
        var newArray = {"NAME"      : element.NAME,
                "ASSOCIATE_ID"  : element.ASSOCIATE_ID,
                "DRILLDOWN_MODE": element.DRILLDOWN_MODE,
                "BU"      : element.BU,
                "RNAME"     : element.RNAME,                  
                "WG"      : $filter('number')(element.WG, 1),
                "WNS"     : $filter('number')(element.WNS, 1),
                "WRS"     : $filter('number')(element.WRS, 1),
                "WAUD"      : $filter('number')(element.WAUD, 1),
                "WN"      : $filter('number')(element.WN, 1),
                "WQ"      : $filter('number')(element.WQ, 1),
                "WPT"     : $filter('number')(element.WPT, 1),
                "MG"      : $filter('number')(element.MG, 1),
                "MNS"     : $filter('number')(element.MNS, 1),
                "MRS"     : $filter('number')(element.MRS, 1),
                "MAUD"      : $filter('number')(element.MAUD, 1),
                "MN"      : $filter('number')(element.MN, 1),
                "MQ"      : $filter('number')(element.MQ, 1),
                "MPT"     : $filter('number')(element.MPT, 1),
                "YG"      : $filter('number')(element.YG, 1),
                "YNS"     : $filter('number')(element.YNS, 1),
                "YRS"     : $filter('number')(element.YRS, 1),
                "YAUD"      : $filter('number')(element.YAUD, 1),
                "YN"      : $filter('number')(element.YN, 1),
                "YQ"      : $filter('number')(element.YQ, 1),
                "YPT"     : $filter('number')(element.YPT, 1),
                "GETTYPE"   : adpcnFactory.getType
                };
        $scope.rows.push(newArray);
      } 
      $scope.colNames = ["Manager Name","Role","Gross", "No Start","ReStart", "Audit", "Net Sales", "Quota", "% of Quota"];
      if("WTD" == $scope.selectedPeriod){
        $scope.tables.push({rows: $scope.rows, cols: ["NAME","RNAME","WG","WNS","WRS","WAUD","WN","WQ","WPT"]});
      }else if("MTD" == $scope.selectedPeriod){
        $scope.tables.push({rows: $scope.rows, cols: ["NAME","RNAME","MG","MNS","MRS","MAUD","MN","MQ","MPT"]});
      }else if("YTD" == $scope.selectedPeriod){
        $scope.tables.push({rows: $scope.rows, cols: ["NAME","RNAME","YG","YNS","YRS","YAUD","YN","YQ","YPT"]});
      }

    });
  }
*/
/*
  //fuction set SalesOffice tab data to $scope.data variable and set table display data to $scope.tables array
  function fetchSalesOfficeData(){
//$http({url: baseUrl+'adpcn/jsp/cnadpRollcallMyTeamJson.jsp',method: "GET",params: {rcWeek: adpcnFactory.currentRCWeek, unqId: adpcnFactory.unqId, mode:adpcnFactory.mode, getType:adpcnFactory.getType}}).success(function(data, status) {
getOfficeRollCall(rcWeek, unqId, dashboardName, sbuCode).then(function (data) {
      adpcnFactory.officeData = data["TABS"][0]["DATA"];
      $scope.data = adpcnFactory.officedata;  
      $scope.tabName = adpcnFactory.getType;
      $scope.showSalesOffTab = true;
      $scope.rows=[];
      $scope.tables = [];
      for(var i=0; i< adpcnFactory.officedata.length;i++){
      
        var element = adpcnFactory.officedata[i];
        var newArray = {"SO": element.SO,
                "ASSOCIATE_ID"  : element.ASSOCIATE_ID,
                "DRILLDOWN_MODE": element.DRILLDOWN_MODE,
                "BU"      : element.BU,
                "RNAME"     : element.RNAME,                  
                "WG"      : $filter('number')(element.WG, 1),
                "WNS"     : $filter('number')(element.WNS, 1),
                "WRS"     : $filter('number')(element.WRS, 1),
                "WAUD"      : $filter('number')(element.WAUD, 1),
                "WN"      : $filter('number')(element.WN, 1),
                "WQ"      : $filter('number')(element.WQ, 1),
                "WPT"     : $filter('number')(element.WPT, 1),
                "MG"      : $filter('number')(element.MG, 1),
                "MNS"     : $filter('number')(element.MNS, 1),
                "MRS"     : $filter('number')(element.MRS, 1),
                "MAUD"      : $filter('number')(element.MAUD, 1),
                "MN"      : $filter('number')(element.MN, 1),
                "MQ"      : $filter('number')(element.MQ, 1),
                "MPT"     : $filter('number')(element.MPT, 1),
                "YG"      : $filter('number')(element.YG, 1),
                "YNS"     : $filter('number')(element.YNS, 1),
                "YRS"     : $filter('number')(element.YRS, 1),
                "YAUD"      : $filter('number')(element.YAUD, 1),
                "YN"      : $filter('number')(element.YN, 1),
                "YQ"      : $filter('number')(element.YQ, 1),
                "YPT"     : $filter('number')(element.YPT, 1),
                "GETTYPE"   : adpcnFactory.getType
              };
        $scope.rows.push(newArray);
      } 
      $scope.colNames = ["Sales Office","Gross", "No Start","ReStart", "Audit", "Net Sales", "Quota", "% of Quota"];
      if("WTD" == $scope.selectedPeriod){
        $scope.tables.push({rows: $scope.rows, cols: ["SO","WG","WNS","WRS","WAUD","WN","WQ","WPT"]});
      }else if("MTD" == $scope.selectedPeriod){
        $scope.tables.push({rows: $scope.rows, cols: ["SO","MG","MNS","MRS","MAUD","MN","MQ","MPT"]});
      }else if("YTD" == $scope.selectedPeriod){
        $scope.tables.push({rows: $scope.rows, cols: ["SO","YG","YNS","YRS","YAUD","YN","YQ","YPT"]});
      }
    }).catch(function (error) {console.log(error)});
  }
*/
  //fuction set SalesOffice tab data to $scope.data variable and set table display data to $scope.tables array
  /*
  function fetchSalesPersonData(){
  $http({url: baseUrl+'adpcn/jsp/cnadpRollcallMyTeamJson.jsp',method: "GET",params: {rcWeek: adpcnFactory.currentRCWeek, unqId: adpcnFactory.unqId, mode:adpcnFactory.mode, getType:adpcnFactory.getType}}).success(function(data, status) {
      adpcnFactory.rcdata = data["TABS"][0]["DATA"];
      $scope.data = adpcnFactory.rcdata;  
      $scope.tabName = adpcnFactory.getType;
      $scope.showSalesOffTab = true;
      $scope.rows=[];
      $scope.tables = [];
      for(var i=0; i< adpcnFactory.rcdata.length;i++){
      
        var element = adpcnFactory.rcdata[i];
        var newArray = {"NAME"      : element.NAME,
                "ASSOCIATE_ID"  : element.ASSOCIATE_ID,
                "DRILLDOWN_MODE": element.DRILLDOWN_MODE,
                "BU"      : element.BU,
                "SO"      : element.SO,                 
                "WG"      : $filter('number')(element.WG, 1),
                "WNS"     : $filter('number')(element.WNS, 1),
                "WRS"     : $filter('number')(element.WRS, 1),
                "WAUD"      : $filter('number')(element.WAUD, 1),
                "WN"      : $filter('number')(element.WN, 1),
                "WQ"      : $filter('number')(element.WQ, 1),
                "WPT"     : $filter('number')(element.WPT, 1),
                "MG"      : $filter('number')(element.MG, 1),
                "MNS"     : $filter('number')(element.MNS, 1),
                "MRS"     : $filter('number')(element.MRS, 1),
                "MAUD"      : $filter('number')(element.MAUD, 1),
                "MN"      : $filter('number')(element.MN, 1),
                "MQ"      : $filter('number')(element.MQ, 1),
                "MPT"     : $filter('number')(element.MPT, 1),
                "YG"      : $filter('number')(element.YG, 1),
                "YNS"     : $filter('number')(element.YNS, 1),
                "YRS"     : $filter('number')(element.YRS, 1),
                "YAUD"      : $filter('number')(element.YAUD, 1),
                "YN"      : $filter('number')(element.YN, 1),
                "YQ"      : $filter('number')(element.YQ, 1),
                "YPT"     : $filter('number')(element.YPT, 1),
                "GETTYPE": adpcnFactory.getType
              };
        $scope.rows.push(newArray);
      } 
      $scope.colNames = ["Salesperson", "Sales Office","Gross", "No Start","ReStart", "Audit", "Net Sales", "Quota", "% of Quota"];
      if("WTD" == $scope.selectedPeriod){
        $scope.tables.push({rows: $scope.rows, cols: ["NAME","SO","WG","WNS","WRS","WAUD","WN","WQ","WPT"]});
      }else if("MTD" == $scope.selectedPeriod){
        $scope.tables.push({rows: $scope.rows, cols: ["NAME","SO","MG","MNS","MRS","MAUD","MN","MQ","MPT"]});
      }else if("YTD" == $scope.selectedPeriod){
        $scope.tables.push({rows: $scope.rows, cols: ["NAME","SO","YG","YNS","YRS","YAUD","YN","YQ","YPT"]});
      }
    });

  }
*/
/*
 function fetchSLPRODData() {
    $http({
url:  baseUrl+'adpcn/jsp/cnadpSalesLiabilityMyTeamJson.jsp',
method: "GET",
params: {unqId: adpcnFactory.unqId, mode:adpcnFactory.mode, getType:"PRD",colname:"now_bklg",mhflag:"H"} 
})
        .success(function(data, status) {

        $scope.slproddata = [];
        

      $scope.sltabs = data["TABS"];
      $scope.firstTab = $scope.sltabs[1]["TAB_CODE"];
      adpcnFactory.getType = $scope.firstTab;
        adpcnFactory.slproddata = data["TABS"][1]["DATA"];
        $scope.slproddata = adpcnFactory.slproddata;
        $scope.rows=[];
        $scope.slprodtables = [];
        for(var i=0; i< adpcnFactory.slproddata.length;i++)
        {     
          var element = adpcnFactory.slproddata[i];
          var newArray = {"SO"      : element.SO,
                  "ASSOCIATE_ID"  : element.AID,
                  "NAME"          : element.NAME,
                  "DRILLDOWN_MODE": element.DRILLDOWN_MODE,
                  "RNAME" : element.RNAME,
                  "SO"      : element.SO,               
                  "BU"      : element.BU,   
                  "PF"      : element.PF,   
                  "MRC_ADJ1"    : element.MRC_ADJ1,   
                  "MRC_ADJ2"      : element.MRC_ADJ2,   
                  "MRC_ADJ3"      : element.MRC_ADJ3,   
                  "ESD_P1"      : element.ESD_P1,   
                  "ESD_P2"      : element.ESD_P2,   
                  "ESD_P3"      : element.ESD_P3,   
                  "TBKLG"     : $filter('number')(element.TBKLG, 1),
                  "PBB"     : $filter('number')(element.PBB, 1),
                  "TTL"     : $filter('number')(element.TTL, 1),
                  "TAD"     : $filter('number')(element.TAD, 1),
                  "TAS"     : $filter('number')(element.TAS, 1),
                  "TAR"     : $filter('number')(element.TAR, 1),
                  "TARR"      : $filter('number')(element.TARR, 1),
                  "TNS"     : $filter('number')(element.TNS, 1),
                  "TBB"     : $filter('number')(element.TBB, 1),
                  "STL"     : $filter('number')(element.STL, 1),
                  "SAD"     : $filter('number')(element.SAD, 1),
                  "SAS"     : $filter('number')(element.SAS, 1),
                  "SAR"     : $filter('number')(element.SAR, 1),
                  "SARR"      : $filter('number')(element.SARR, 1),
                  "SNS"     : $filter('number')(element.SNS, 1),
                  "SBB"     : $filter('number')(element.SBB, 1),
                    "FTL"     : $filter('number')(element.FTL, 1),
                  "FAD"     : $filter('number')(element.FAD, 1),
                  "FAS"     : $filter('number')(element.FAS, 1),
                  "FAR"     : $filter('number')(element.FAR, 1),
                  "FARR"      : $filter('number')(element.FARR, 1),
                  "FNS"     : $filter('number')(element.FNS, 1),
                  "FBB"     : $filter('number')(element.FBB, 1),
                  "GETTYPE"   : adpcnFactory.getType
                };
          $scope.rows.push(newArray);
        } 
        

        if(adpcnFactory.selectedslnum=="1")
        {
$scope.slprodcolNames = ["Product Name","Sales Office","Full Backlog", "Total Liabilities", "No Start","ReStart", "Audit", "Bad Business", "Past Bad Business", "Manual RC Adj", "At Risk and Restarts", "Anticipated Starts", "Roll at Starts Bades on ESD"];
        $scope.slprodtables.push({rows: $scope.rows, cols: ["NAME","SO","TBKLG","FTL","FNS","FAR","FAD","FBB","PBB","MRC_ADJ1","FARR","FAS","ESD_P1"]});


      } 
      else{
        if(adpcnFactory.selectedslnum=="2")
        {
$scope.slprodcolNames = ["Product Name","Sales Office","Full Backlog", "Total Liabilities", "No Start","ReStart", "Audit", "Bad Business", "Manual RC Adj", "At Risk and Restarts", "Anticipated Starts", "Roll at Starts Bades on ESD"];
        $scope.slprodtables.push({rows: $scope.rows, cols: ["NAME","SO","TBKLG","STL","SNS","SAR","SAD","SBB","MRC_ADJ2","SARR","SAS","ESD_P2"]});

      }
      else
      {
$scope.slprodcolNames = ["Product Name","Sales Office","Full Backlog", "Total Liabilities", "No Start","ReStart", "Audit", "Bad Business", "Manual RC Adj", "At Risk and Restarts", "Anticipated Starts", "Roll at Starts Bades on ESD"];
      $scope.slprodtables.push({rows: $scope.rows, cols: ["NAME","SO","TBKLG","TTL","TNS","TAR","TAD","TBB","MRC_ADJ3","TARR","TAS","ESD_P3"]});  

      }

      }






    

        })
.error(function(error){
alert(error);

alert("from Prod call");
});

  }
*/
 function fetchSLCUSTData() {
    $http({
url:  baseUrl+'adpcn/jsp/cnadpSalesLiabilityMyTeamJson.jsp',
method: "GET",
params: {unqId: adpcnFactory.unqId, mode:adpcnFactory.mode, getType:"CUST",colname:"now_bklg",mhflag:"H"} 
})
        .success(function(data, status) {
        

      $scope.sltabs = data["TABS"];
      $scope.firstTab = $scope.sltabs[1]["TAB_CODE"];
      adpcnFactory.getType = $scope.firstTab;
        $scope.slcustdata=[];
    
        adpcnFactory.slcustdata = data["TABS"][1]["DATA"];
        $scope.slcustdata = adpcnFactory.slcustdata;
        $scope.rows=[];
        $scope.slcusttables = [];
        for(var i=0; i< adpcnFactory.slcustdata.length;i++)
        {     
          var element = adpcnFactory.slcustdata[i];
          var newArray = {"SO"      : element.SO,
                  "ASSOCIATE_ID"  : element.AID,
                  "NAME"          : element.NAME,
                  "DRILLDOWN_MODE": element.DRILLDOWN_MODE,
                  "RNAME" : element.RNAME,
                  "SO"      : element.SO,               
                  "BU"      : element.BU,   
                  "PF"      : element.PF,   
                  "MRC_ADJ1"    : element.MRC_ADJ1,   
                  "MRC_ADJ2"      : element.MRC_ADJ2,   
                  "MRC_ADJ3"      : element.MRC_ADJ3,   
                  "ESD_P1"      : element.ESD_P1,   
                  "ESD_P2"      : element.ESD_P2,   
                  "ESD_P3"      : element.ESD_P3,   
                  "TBKLG"     : $filter('number')(element.TBKLG, 1),
                  "PBB"     : $filter('number')(element.PBB, 1),
                  "TTL"     : $filter('number')(element.TTL, 1),
                  "TAD"     : $filter('number')(element.TAD, 1),
                  "TAS"     : $filter('number')(element.TAS, 1),
                  "TAR"     : $filter('number')(element.TAR, 1),
                  "TARR"      : $filter('number')(element.TARR, 1),
                  "TNS"     : $filter('number')(element.TNS, 1),
                  "TBB"     : $filter('number')(element.TBB, 1),
                  "STL"     : $filter('number')(element.STL, 1),
                  "SAD"     : $filter('number')(element.SAD, 1),
                  "SAS"     : $filter('number')(element.SAS, 1),
                  "SAR"     : $filter('number')(element.SAR, 1),
                  "SARR"      : $filter('number')(element.SARR, 1),
                  "SNS"     : $filter('number')(element.SNS, 1),
                  "SBB"     : $filter('number')(element.SBB, 1),
                    "FTL"     : $filter('number')(element.FTL, 1),
                  "FAD"     : $filter('number')(element.FAD, 1),
                  "FAS"     : $filter('number')(element.FAS, 1),
                  "FAR"     : $filter('number')(element.FAR, 1),
                  "FARR"      : $filter('number')(element.FARR, 1),
                  "FNS"     : $filter('number')(element.FNS, 1),
                  "FBB"     : $filter('number')(element.FBB, 1),
                  "GETTYPE"   : adpcnFactory.getType
                };
          $scope.rows.push(newArray);
        } 
        

        if(adpcnFactory.selectedslnum=="1")
        {
$scope.slcustcolNames = ["Customer Name","Sales Office","Full Backlog", "Total Liabilities", "No Start","ReStart", "Audit", "Bad Business", "Past Bad Business", "Manual RC Adj", "At Risk and Restarts", "Anticipated Starts", "Roll at Starts Bades on ESD"];
        $scope.slcusttables.push({rows: $scope.rows, cols: ["NAME","SO","TBKLG","FTL","FNS","FAR","FAD","FBB","PBB","MRC_ADJ1","FARR","FAS","ESD_P1"]});


      } 
      else{
        if(adpcnFactory.selectedslnum=="2")
        {
$scope.slcustcolNames = ["Customer Name","Sales Office","Full Backlog", "Total Liabilities", "No Start","ReStart", "Audit", "Bad Business", "Manual RC Adj", "At Risk and Restarts", "Anticipated Starts", "Roll at Starts Bades on ESD"];
        $scope.slcusttables.push({rows: $scope.rows, cols: ["NAME","SO","TBKLG","STL","SNS","SAR","SAD","SBB","MRC_ADJ2","SARR","SAS","ESD_P2"]});

      }
      else
      {
$scope.slcustcolNames = ["Customer Name","Sales Office","Full Backlog", "Total Liabilities", "No Start","ReStart", "Audit", "Bad Business", "Manual RC Adj", "At Risk and Restarts", "Anticipated Starts", "Roll at Starts Bades on ESD"];
      $scope.slcusttables.push({rows: $scope.rows, cols: ["NAME","SO","TBKLG","TTL","TNS","TAR","TAD","TBB","MRC_ADJ3","TARR","TAS","ESD_P3"]});  

      }

      }




    

        })
.error(function(error){
alert(error);
alert("from Cust call");
});

  }


 function fetchSLData() {
    $http({
url:  baseUrl+'adpcn/jsp/cnadpSalesLiabilityMyTeamJson.jsp',
method: "GET"
})
        .success(function(data, status) {
        

      $scope.sltabs = data["TABS"];
      $scope.firstTab = $scope.sltabs[1]["TAB_CODE"];
      adpcnFactory.getType = $scope.firstTab;

adpcnFactory.slheaderdata = data["TABS"][0]["DATA"];
$scope.slheaderdata= data["TABS"][0]["DATA"];

adpcnFactory.slheaderdetdata=adpcnFactory.slheaderdata[0];

        $scope.sldata =[];
    
        adpcnFactory.sldata = data["TABS"][1]["DATA"];
        $scope.sldata = adpcnFactory.sldata;
        $scope.rows=[];
        $scope.sltables = [];
        for(var i=0; i< adpcnFactory.sldata.length;i++)
        {     
          var element = adpcnFactory.sldata[i];
          var newArray = {"SO"      : element.SO,
                  "ASSOCIATE_ID"  : element.AID,
                  "NAME"          : element.NAME,
                  "DRILLDOWN_MODE": element.DRILLDOWN_MODE,
                  "RNAME" : element.RNAME,
                  "SO"      : element.SO,               
                  "BU"      : element.BU,   
                  "PF"      : element.PF,   
                  "MRC_ADJ1"    : element.MRC_ADJ1,   
                  "MRC_ADJ2"      : element.MRC_ADJ2,   
                  "MRC_ADJ3"      : element.MRC_ADJ3,   
                  "ESD_P1"      : element.ESD_P1,   
                  "ESD_P2"      : element.ESD_P2,   
                  "ESD_P3"      : element.ESD_P3,   
                  "TBKLG"     : $filter('number')(element.TBKLG, 1),
                  "PBB"     : $filter('number')(element.PBB, 1),
                  "TTL"     : $filter('number')(element.TTL, 1),
                  "TAD"     : $filter('number')(element.TAD, 1),
                  "TAS"     : $filter('number')(element.TAS, 1),
                  "TAR"     : $filter('number')(element.TAR, 1),
                  "TARR"      : $filter('number')(element.TARR, 1),
                  "TNS"     : $filter('number')(element.TNS, 1),
                  "TBB"     : $filter('number')(element.TBB, 1),
                  "STL"     : $filter('number')(element.STL, 1),
                  "SAD"     : $filter('number')(element.SAD, 1),
                  "SAS"     : $filter('number')(element.SAS, 1),
                  "SAR"     : $filter('number')(element.SAR, 1),
                  "SARR"      : $filter('number')(element.SARR, 1),
                  "SNS"     : $filter('number')(element.SNS, 1),
                  "SBB"     : $filter('number')(element.SBB, 1),
                    "FTL"     : $filter('number')(element.FTL, 1),
                  "FAD"     : $filter('number')(element.FAD, 1),
                  "FAS"     : $filter('number')(element.FAS, 1),
                  "FAR"     : $filter('number')(element.FAR, 1),
                  "FARR"      : $filter('number')(element.FARR, 1),
                  "FNS"     : $filter('number')(element.FNS, 1),
                  "FBB"     : $filter('number')(element.FBB, 1),
                  "GETTYPE"   : adpcnFactory.getType
                };
          $scope.rows.push(newArray);
        } 
        

        if(adpcnFactory.selectedslnum=="1")
        {
$scope.slcolNames = ["Salesrep Name","Sales Office","Full Backlog", "Total Liabilities", "No Start","ReStart", "Audit", "Bad Business", "Past Bad Business", "Manual RC Adj", "At Risk and Restarts", "Anticipated Starts", "Roll at Starts Bades on ESD"];
        $scope.sltables.push({rows: $scope.rows, cols: ["NAME","SO","TBKLG","FTL","FNS","FAR","FAD","FBB","PBB","MRC_ADJ1","FARR","FAS","ESD_P1"]});


      } 
      else{
        if(adpcnFactory.selectedslnum=="2")
        {
$scope.slcolNames = ["Salesrep Name","Sales Office","Full Backlog", "Total Liabilities", "No Start","ReStart", "Audit", "Bad Business", "Manual RC Adj", "At Risk and Restarts", "Anticipated Starts", "Roll at Starts Bades on ESD"];
        $scope.sltables.push({rows: $scope.rows, cols: ["NAME","SO","TBKLG","STL","SNS","SAR","SAD","SBB","MRC_ADJ2","SARR","SAS","ESD_P2"]});

      }
      else
      {
$scope.slcolNames = ["Salesrep Name","Sales Office","Full Backlog", "Total Liabilities", "No Start","ReStart", "Audit", "Bad Business", "Manual RC Adj", "At Risk and Restarts", "Anticipated Starts", "Roll at Starts Bades on ESD"];
      $scope.sltables.push({rows: $scope.rows, cols: ["NAME","SO","TBKLG","TTL","TNS","TAR","TAD","TBB","MRC_ADJ3","TARR","TAS","ESD_P3"]});  

      }

      }

  $scope.tableParams = new NgTableParams({
              page: 1,            // show first page
              count: 10,          // count per page
              sorting: {          // initial sorting
                NAME: 'desc'
              },
              filter: {
                owner: ''       // initial filter
              }
            }, {
              total: $scope.sldata.length, // length of data
              getData: function ($defer, params) {

                // use build-in angular filter
                var orderedData = params.filter() ? $filter('filter')($scope.sldata, params.filter()) : $scope.sldata;
                orderedData = params.sorting() ? $filter('orderBy')($scope.sldata, params.orderBy()) : $scope.sldata;

                $scope.sldata = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                params.total(orderedData.length); // set total for recalc pagination
                params.totalPages = Math.ceil(params.total() / params.count());
                params.currPageItemStart = params.page();
                params.currPageItemEnd = params.count() * params.page();

                // if greater than first page, calculate current page start item

                if (params.page() > 1)
                  params.currPageItemStart = ((params.page() * params.count()) - params.count()) + 1;

                // if less than total count of items, set number to total

                if (params.currPageItemEnd > params.total())
                  params.currPageItemEnd = params.total();

                $defer.resolve($scope.users);
              }
          });




$rootScope.$broadcast('slperiodmodif', $scope.selectedSLperiod);
    

        })


.error(function(error){
alert(error);
alert("from main call");
});

  }

  $scope.isDrillDownExists = function(colName, unqId){
    if(adpcnFactory.getType == "TAB_SEVP")
    {
      if(colName == "RNAME" || colName == "WQ" || colName == "WPT" || colName == "MQ" || colName == "MPT" ||  colName == "YG" || colName == "YN" ||colName == "YNS" || colName == "YRS" || colName == "YAUD" || colName == "YN" || colName == "YQ" || colName == "YPT")
      {     
        return false;
      }
      else if(colName == "NAME" && (unqId == null || "" == unqId || angular.isUndefined(unqId)) )
      {
        return false;
      }else
      {
        return true;
      }
    }
    else if(adpcnFactory.getType == "TAB_OFF")
    {
      if(colName == "WQ" || colName == "WPT" || colName == "MQ" || colName == "MPT" || colName == "YQ" || colName == "YPT" || colName == "SO")
      {     
        return false;
      }
      else
      {
        return true;
      }
    }
    else if(adpcnFactory.getType == "TAB_DM")
    {
      if(colName == "SO" || colName == "WQ" || colName == "WPT" || colName == "MQ" || colName == "MPT" || colName == "YQ" || colName == "YPT")
      {     
        return false;
      }
      else
      {
        return true;
      }
    }
    else
    {
      return false;
    }

    
  }

})
.controller('donutChartCtrl', function ($scope, $timeout, $http, adpcnFactory,UserService,$stateParams) {

 


  $scope.formattedNumber = function(num){
    var result = parseFloat(num).toFixed(2).replace(/[.,]00$/, "");
    return result;
  }
  
  $scope.$on('rcWeekChanged', function (event, data) {
    $timeout( function () { return fetchRollcallSummary(); }).then (function (data) { setCharts(data); });
});


  $scope.$on('fetchDonutSummaryData', function (event) {  //fetchRollcallSummary is to be called only after unqId and current RC Week are fetched in cnadpDashboardLayout.js
    $timeout( function () { return fetchRollcallSummary(); }).then (function (data) { setCharts(data); });
});

if($stateParams.unqId != null && !angular.isUndefined($stateParams.unqId)){
  console.log($stateParams.unqId);
  adpcnFactory.unqId = $stateParams.unqId;
  if(adpcnFactory.unqId != null && !angular.isUndefined(adpcnFactory.unqId)){
    $timeout( function () { return fetchRollcallSummary(); }).then (function (data) { setCharts(data); });
}}

function setCharts(data) {
// ------------------------ WTD --------------------
  //This is not a highcharts object. It just looks a little like one!
  console.log('setCharts');
  console.log(data);
 $scope.chartConfigWTD = {
options: {
  chart: {
    type: 'pie'
  },
  style: {
    fontFamily: 'inherit'
   },
   tooltip: {
                /*formatter: function () {
                    return '<b>' + this.point.name + '</b>: ' + this.y + ' %';
                }*/
                enabled:false
            },
  plotOptions: {
     pie: {
                    shadow: false,
                    size: '100%',
                    innerSize: '75%',
                    borderWidth: 0
                }
     }
  },
  series: [
    {
      name: "WTD data",
      data: [
                ["Me", data.WPT],
                ["My Team", data.WPTR]
            ],
    showInLegend: false,
    dataLabels: {
                enabled: false,
                style: {
                    font: 'ProximaNova, sans-serif',
                    fontSize: '14px',
                    fontWeight: '300'
                }
            },
     id: "wtd",
   //  "type": "pie"
    }
  ],
  credits: {
            enabled: false
        },
        
 title: {
            text: 'WTD',
            //verticalAlign: 'middle',
            floating: true,
            useHTML: true
        },
        
        
  subtitle: { 
    text: '<B>'+data.WPT+'%</B>',
    verticalAlign: 'middle',
    floating: true,
    useHTML: true
  },
  
        loading: false,
        //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
        //properties currentMin and currentMax provied 2-way binding to the chart's maximimum and minimum
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value; // clean, unformatted number for year
                }
            }
        },
        //Whether to use HighStocks instead of HighCharts (optional). Defaults to false.
        useHighStocks: false
        //size (optional) if left out the chart will default to size of the div or something sensible.
        //size: { height: 200},
        //function (optional)
        /*
            $scope.$evalAsync(function () {
                chart.reflow();
                //The below is an event that will trigger all instances of charts to reflow
                //$scope.$broadcast('highchartsng.reflow');
            });
            */
            /*
        func: function (chart) {
            //setup some logic for the chart
            
            
            
            $timeout(function() {
              
                //$scope.$evalAsync(function () { chart.reflow(); });
            console.log(chart);
            var title = $scope.WPT + '% <BR> WTD';
            chart.setTitle({ text: title,verticalAlign: 'middle',useHTML: true});
            }, 2000);

        } */
   // }
 };
 
 $scope.chartConfigMTD = {
options: {
  chart: {
    type: 'pie'
  },
  style: {
    fontFamily: 'inherit'
   },
   tooltip: {
                /*formatter: function () {
                    return '<b>' + this.point.name + '</b>: ' + this.y + ' %';
                }*/
                enabled:false
            },
  plotOptions: {
     pie: {
                    shadow: false,
                    size: '100%',
                    innerSize: '75%',
                    borderWidth: 0
                }
  }
},
  series: [
    {
      name: "MTD data",
     data: [
                ["Me", data.MPT],
                ["My Team", data.MPTR]
            ],
    showInLegend: false,
    dataLabels: {
                enabled: false,
                style: {
                    font: 'ProximaNova, sans-serif',
                    fontSize: '14px',
                    fontWeight: '300'
                }
            },
  id: "mtd",
   //  "type": "pie"
    }
  ],
  credits: {
            enabled: false
        },
        
  title: {
            text: 'MTD',
            //verticalAlign: 'middle',
            floating: true,
            useHTML: true
        },
        
        
  subtitle: { 
    text: '<B>'+data.MPT+'%</B>',
    verticalAlign: 'middle',
    floating: true,
    useHTML: true
  },
        loading: false,
        //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
        //properties currentMin and currentMax provied 2-way binding to the chart's maximimum and minimum
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value; // clean, unformatted number for year
                }
            }
        },
        //Whether to use HighStocks instead of HighCharts (optional). Defaults to false.
        useHighStocks: false
        //size (optional) if left out the chart will default to size of the div or something sensible.
        //size: { height: 200 },
        //function (optional)
        /*
            $scope.$evalAsync(function () {
                chart.reflow();
                //The below is an event that will trigger all instances of charts to reflow
                //$scope.$broadcast('highchartsng.reflow');
            });
            */
            /*
        func: function (chart) {
            //setup some logic for the chart
            //console.log(chart);
            
            
            
            $timeout(function() {
              
                //$scope.$evalAsync(function () { chart.reflow(); });
            console.log(chart);
            var title = $scope.MPT + '% <BR> MTD';
            chart.setTitle({ text: title,verticalAlign: 'middle',useHTML: true});
            }, 2000);
 
        }
*/
};

 $scope.chartConfigYTD = {
options: {
  chart: {
    type: 'pie'
  },
  style: {
    fontFamily: 'inherit'
   },
   tooltip: {
                /*formatter: function () {
                    return '<b>' + this.point.name + '</b>: ' + this.y + ' %';
                }*/
                enabled:false
            },
  plotOptions: {
     pie: {
                    shadow: false,
                    innerSize: '75%',
                    size: '100%',
                    borderWidth: 0
                }
  }
  },
  series: [
    {
      name: "YTD data",
     data: [
                ["Me", data.YPT],
                ["My Team", data.YPTR]
            ],
      showInLegend: false,
      dataLabels: {
                enabled: false,
                style: {
                    font: 'ProximaNova, sans-serif',
                    fontSize: '14px',
                    fontWeight: '300'
                }
            },
      id: "ytd",
    //  "type": "pie"
    }
  ],
  credits: {
            enabled: false
        },
        
  title: {
            text: 'YTD',
            //verticalAlign: 'middle',
            floating: true,
            useHTML: true
        },
        
        
  subtitle: { 
    text: '<B>'+data.YPT+'%</B>',
    verticalAlign: 'middle',
    floating: true,
    useHTML: true
  },
        loading: false,
        //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
        //properties currentMin and currentMax provied 2-way binding to the chart's maximimum and minimum
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value; // clean, unformatted number for year
                }
            }
        },
        //Whether to use HighStocks instead of HighCharts (optional). Defaults to false.
        useHighStocks: false
        //size (optional) if left out the chart will default to size of the div or something sensible.
        //size: { height: 200 },
        //function (optional)
        /*
            $scope.$evalAsync(function () {
                chart.reflow();
                //The below is an event that will trigger all instances of charts to reflow
                //$scope.$broadcast('highchartsng.reflow');
            });
            */
            /*
        func: function (chart) {
            //setup some logic for the chart
            
            
            
            $timeout(function() {
              
                //$scope.$evalAsync(function () { chart.reflow(); });
            console.log(chart);
            var title = $scope.YPT + '% <BR> YTD';
            chart.setTitle({ text: title,verticalAlign: 'middle',useHTML: true});
            }, 2000);
 
        }
        */
   // }
};

}

  

  function fetchRollcallSummary() {
  console.log('rcWeek: '+adpcnFactory.currentRCWeek);
  console.log('mode : '+adpcnFactory.mode);
  console.log('unqId : '+adpcnFactory.unqId);
  console.log('sbu : '+ adpcnFactory.sbu);
  return UserService.getRollCall(adpcnFactory.currentRCWeek, 'Rollcall', adpcnFactory.mode,adpcnFactory.unqId,adpcnFactory.sbu).then(function(data) {  
      if(angular.isUndefined(data["LAND_DATA"][0])){
        $scope.WPT = 0;
        $scope.WN = 0+'K';
        $scope.WQ = 0+'K';

      }else if(!angular.isUndefined(data["LAND_DATA"][0]["ROLLCALL"][0])){      
        $scope.summaryData = data["LAND_DATA"][0]["ROLLCALL"][0];
        if($scope.summaryData.WPT == null || angular.isUndefined($scope.summaryData.WPT)){
          $scope.summaryData.WPT = 0;
        }else{
          $scope.WPT = parseFloat($scope.summaryData.WPT.replace("%",""));        
        }
        console.log(' WPT : '+$scope.WPT);
        if($scope.summaryData.WN == null || angular.isUndefined($scope.summaryData.WN)){
          $scope.summaryData.WN = 0;
        }else{
          $scope.WN = $scope.summaryData.WN+'K';        
        }

        if($scope.summaryData.WQ == null || angular.isUndefined($scope.summaryData.WQ)){
          $scope.summaryData.WQ = 0;
        }else{
          $scope.WQ = $scope.summaryData.WQ+'K';        
        }
          
      }else{
        $scope.WPT = 0;
        $scope.WN = 0+'K';
        $scope.WQ = 0+'K';
      }

      if($scope.WPT <= 0){
        $scope.WPTR = 100;
        $scope.WPT = 0;
      }else if($scope.WPT > 0 && $scope.WPT < 100)
        $scope.WPTR = 100 - $scope.WPT;
      else if($scope.WPT >= 100)
        $scope.WPTR = 0;

       //$scope.chartConfigWTD["series"][0]["data"] = [["Me", $scope.WPT],["My Team", $scope.WPTR]];
       
       // ---MTD----

       
      if(angular.isUndefined($scope.summaryData)){
        $scope.MPT = 0;
        $scope.MN = 0+'K';
        $scope.MQ = 0+'K';
        $scope.FMQ = 0;

      }else if(!angular.isUndefined(data["LAND_DATA"][0]["ROLLCALL"][0])){
        if($scope.summaryData.MPT == null || angular.isUndefined($scope.summaryData.MPT)){
          $scope.summaryData.MPT = 0;
        }else{
          $scope.MPT = parseFloat($scope.summaryData.MPT.replace("%",""));        
        }
        console.log(' MPT : '+$scope.MPT);
        if($scope.summaryData.MN == null || angular.isUndefined($scope.summaryData.MN)){
          $scope.summaryData.MN = 0;
        }else{
          $scope.MN = $scope.summaryData.MN+'K';        
        }

        if($scope.summaryData.MQ == null || angular.isUndefined($scope.summaryData.MQ)){
          $scope.summaryData.MQ = 0;
        }else{
          $scope.MQ = $scope.summaryData.MQ+'K';        
        }

        $scope.FMQ = $scope.summaryData.FMQ;
      }else{
        $scope.MPT = 0;
        $scope.MN = 0;+'K'
        $scope.MQ = 0+'K';
        $scope.FMQ = 0;
      }

      if($scope.MPT <= 0) {
        $scope.MPTR = 100;
        $scope.MPT = 0;
      }else if($scope.MPT > 0 && $scope.MPT < 100)
        $scope.MPTR = 100 - $scope.MPT;
      else if($scope.MPT >= 100) 
        $scope.MPTR = 0;

       //$scope.chartConfigMTD["series"][0]["data"] = [["Me", $scope.MPT],["My Team", $scope.MPTR]];


       // ----YTD----

      if(angular.isUndefined($scope.summaryData)){
        $scope.YPT = 0;
        $scope.YN = 0+'K';
        $scope.YQ = 0+'K';
        $scope.FYQ = 0;

      }else if(!angular.isUndefined(data["LAND_DATA"][0]["ROLLCALL"][0])){
        if($scope.summaryData.YPT == null || angular.isUndefined($scope.summaryData.YPT)){
          $scope.summaryData.YPT = 0;
        }else{
          $scope.YPT = parseFloat($scope.summaryData.YPT.replace("%",""));        
        }
        console.log(' YPT : '+$scope.YPT);  
        if($scope.summaryData.YN == null || angular.isUndefined($scope.summaryData.YN)){
          $scope.summaryData.YN = 0;
        }else{
          $scope.YN = $scope.summaryData.YN+'K';        
        }

        if($scope.summaryData.YQ == null || angular.isUndefined($scope.summaryData.YQ)){
          $scope.summaryData.YQ = 0;
        }else{
          $scope.YQ = $scope.summaryData.YQ+'K';        
        }

        $scope.FYQ = $scope.summaryData.FYQ;
      }else{
        $scope.YPT = 0;
        $scope.YN = 0+'K';
        $scope.YQ = 0+'K'
        $scope.FYQ = 0;
      }

      if($scope.YPT <= 0){
        $scope.YPTR = 100;
        $scope.YPT = 0;
      }else if($scope.YPT > 0 && $scope.YPT < 100)
        $scope.YPTR = 100 - $scope.YPT;
      else if($scope.YPT >= 100)
        $scope.YPTR = 0;

       //$scope.chartConfigYTD["series"][0]["data"] = [["Me", $scope.YPT],["My Team", $scope.YPTR]];
       //$scope.chartConfigYTD.Title = $scope.YPT + $scope.chartConfigYTD.Title;

      //Store data required for Sales Summary Graph in seperate Array
      $scope.salesSummaryTable = [];
      //Full Year Details
      var row = { "TITLE" : "FULL YEAR",
            "NETSALES": parseFloat($scope.YN.replace("K","")),
            "QUOTA" : parseFloat($scope.FYQ),
            "ACHIEVED" : parseFloat($scope.YPT),
            "VARIANCE" : parseFloat($scope.YN)-parseFloat($scope.FYQ)
           }
      $scope.salesSummaryTable.push(row);
      //Full Year Details
      row = { "TITLE" : "FULL MONTH",
            "NETSALES": parseFloat($scope.MN.replace("K","")),
            "QUOTA" : parseFloat($scope.FMQ),
            "ACHIEVED" : parseFloat($scope.MPT),
            "VARIANCE" : parseFloat($scope.MN)-parseFloat($scope.FMQ)
           }
      $scope.salesSummaryTable.push(row);
      //Full Year Details
      row = { "TITLE" : "YTD",
            "NETSALES": parseFloat($scope.YN.replace("K","")),
            "QUOTA" : parseFloat($scope.YQ.replace("K","")),
            "ACHIEVED" : parseFloat($scope.YPT),
            "VARIANCE" : parseFloat($scope.YN)-parseFloat($scope.YQ)
           }
      $scope.salesSummaryTable.push(row);
      //Full Year Details
      row = { "TITLE" : "MTD",
            "NETSALES": parseFloat($scope.MN.replace("K","")),
            "QUOTA" : parseFloat($scope.MQ.replace("K","")),
            "ACHIEVED" : parseFloat($scope.MPT),
            "VARIANCE" : parseFloat($scope.MN)-parseFloat($scope.MQ)
           }
      $scope.salesSummaryTable.push(row);
      //Full Year Details
      row = { "TITLE" : "WTD",
            "NETSALES": parseFloat($scope.WN.replace("K","")),
            "QUOTA" : parseFloat($scope.WQ.replace("K","")),
            "ACHIEVED" : parseFloat($scope.WPT),
            "VARIANCE" : parseFloat($scope.WN)-parseFloat($scope.WQ)
           }
      $scope.salesSummaryTable.push(row);
      return {"WPT":$scope.WPT,"MPT":$scope.MPT,"YPT":$scope.YPT,"WPTR":$scope.WPTR,"MPTR":$scope.MPTR,"YPTR":$scope.YPTR};
    }).catch(function(error) { console.log(error); });
      
  }

  
  
});
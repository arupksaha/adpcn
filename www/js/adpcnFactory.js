angular.module('starter.factory', [])
.factory('adpcnFactory', [function () {
	var fac = [];
  fac.selectedPeriod ; //= {name: 'WTD',meaning:'Week To Date'};
	fac.periods = [
        {name: 'WTD',meaning:'WTD'},
        {name: 'MTD',meaning:'MTD'},
        {name: 'YTD',meaning:'YTD'}
    ];
	fac.rcdata = [];
	fac.sldata = [];
	fac.slproddata = [];
	fac.slcustdata = [];
    fac.slheaderdetdata={};
    fac.slheaderdata= [];
	fac.currentPageName = "Dashboard";
	fac.rollcallWeeksArray = [];
	fac.slperiodsArray = [];
    fac.currentWeek;
	fac.currentRCWeek;
	fac.currentslperiod=[];
	fac.selectedslperiod=[];
	fac.selectedslnum="3";
	fac.tabName = "MyTeam";
	fac.userAccessData = [];
	fac.navigationPathArray = [];
	fac.navigationCounter = 0;
	fac.getType = "TAB_SEVP";
	fac.unqId;
	fac.userID = "";
	fac.rcGraphPeriods = [
        {name: 'MTD'},
        {name: 'YTD'}
    ];
	fac.selectedRcGraphPeriod = "MTD";
	fac.earningsPeriodArray = [];
	fac.earningsMonth = "";
	fac.inputFieldsOfEarningsArray = [];
	fac.roleInformationArray = [];
    fac.associateName = "";
    fac.title = "";
    fac.userPhoto = "";
    fac.updatedDates = {};
    fac.teamInfo = {};
    fac.summaryData = {};
    fac.officeData = {};
    fac.dmData = {};
    fac.graphData = {};
    return fac;
}])
.factory('UserService', [ '$timeout','$http','adpcnFactory',function($timeout,$http,adpcnFactory) {
    return {
        getMenu: function(userId) {
            return $timeout( function() { 
            return $http.get(baseUrl+'adpcn/jsp/cnadpMenuJson.jsp',{params: {userId: userId}}).then(function(response) {
            // return $http.get('/userAccess').then(function(response) {    
             var userAccess = response;
             /*=	{"data":{"USER_ACCESS":{ "WHATSNEW_FILE_PATH":"" }, "DEFAULT_VIEWS" : [ ] ,  
             "BU": [ {"MODE":"MGR", "SBU": "MGR","SBUNAME": "Manager", "RCW": "201731", "ADM_FLAG": "N", "FCT_FLAG": "", 
             "CY_MH_FLAG": "MH", "PY_MH_FLAG": "H", "CURR_YEAR": "2017", "PREV_YEAR": "2016", "CURR_PERIOD": "", "USER_ID": "35510" ,
              "DB":[{"FN":"Rollcall", "AID":"","PF":"","SPAID":"","SPPF":"","UNQID":"13196128728004"},
             {"FN":"Sales Liability", "AID":"","PF":"","SPAID":"","SPPF":"","UNQID":"25435517784057"},
             {"FN":"YTD Summary", "AID":"","PF":"","SPAID":"","SPPF":"","UNQID":"34504421961001"} ] } ]}}; */

                 adpcnFactory.mode = userAccess.data["BU"][0]["MODE"];
                 adpcnFactory.sbuCode = userAccess.data["BU"][0]["SBU"];
                 adpcnFactory.userID = userAccess.data["BU"][0]["USER_ID"];
                 adpcnFactory.unqId = userAccess.data["BU"][0]["DB"][0]["UNQID"]+"_"+userId;
                 adpcnFactory.navigationPathArray[adpcnFactory.navigationCounter] = {"unqId" : adpcnFactory.unqId};
                 
                 return userAccess;
             });
            }).then(function(response) { return response.data; });
        },
       getUser: function(userId,userName) {
            return $timeout( function() { 
            return $http.get(baseUrl+'adpcn/jsp/cnadpAssociateInfoJson.jsp',{params: {userId: userId, userName: userName}}).then(function(response) {

             var aidInfoArray = response;
             /*=	{"data":{"INFO": [{"NAME": "Michael Houston","EMAIL":"michael.houston@adp.com","TITLE":"Div. Vice President - Sales",
             "CITY":"Fort Lauderdale","STATE":"FL","POSTAL":"33334","WPHONE":"954-717-6978","MPHONE":"713-705-5507"}]}};*/

                adpcnFactory.associateName = aidInfoArray.data["INFO"][0]["NAME"];
                adpcnFactory.title = aidInfoArray.data["INFO"][0]["TITLE"];
                
                return aidInfoArray;
               });
            }).then(function(response) { return response.data; });
        },
       getUserPhoto: function(userId) {
            return $timeout( function() { //$http.get(baseUrl+'adpcn/jsp/util/cnadpGetUserPhoto.jsp',{params: {userId: userId}}).then(function(response) { // 
            	var photoURL = baseUrl+'adpcn/jsp/util/cnadpGetUserPhoto.jsp?userId='+userId;
                var userPhoto = {"data":photoURL}; //response ; //
                adpcnFactory.userPhoto = userPhoto.data;
                return	userPhoto;
           // });
            }).then(function(response) { return response.data; });
        }, 
       getLastUpdateDates: function(userId) {
            return $timeout( function() { 
            return $http.get(baseUrl+'adpcn/jsp/cnadpLastUpdatedDates.jsp').then(function(response) {
             var	updatedDates = response;
             adpcnFactory.updatedDates = updatedDates.data;
             /*{"data":{"lstupd": [{"DB":[{"OTC":"06-FEB-2017 04:01:20 PM EST","EPOPS":"","RUN":"13-NOV-2015 09:28:11 PM EST", 
             "BKLG":" ", "WEEK":"201733", "BLOCKMSG":"Do Not Allow"}]}]}};
             */
             return updatedDates;
           });
         }).then(function(response) { return response.data; });
        },
       getRollCall: function(rcWeek, dashboardName, mode, unqId,sbu) {
        return $timeout( function() {
        return $http.get(baseUrl+'adpcn/jsp/cnadpRollcallDMSummaryJson.jsp',{params: {rcWeek, dashboardName, mode, unqId, sbu}}).then(function (response) { 
       
            var summaryData = response;
            /*{"data": {"LAND_DATA" : [{"ROLLCALL" : [{"MARK":"MGR_RC_MGR_H","ASSOCIATE_ID":"","NAME":"Rollcall","SOC":"","RNAME":"","DRILLDOWN_MODE":"MGR","SO":"",
            "WG":"247.7","WNS":"-15.6","WRS":"192.5","WAUD":"47.6","WN":"472.2",
            "MG":"796.2","MNS":"-1589.2","MRS":"264.6","MAUD":"47.6","MN":"-480.8",
            "YG":"796.2","YNS":"-1589.2","YRS":"264.6","YAUD":"47.6","YN":"-480.8",
            "WQ":"448.4","MQ":"1345.3","YQ":"1345.3","WPT":"105.3","MPT":"-35.7","YPT":"-35.7",
            "BU":"MAS","PF":"ALL","WUN":"92","MUN":"37","YUN":"37","SWUN":"","SMUN":"","SYUN":"","FMQ":"1793.8","FYQ":"51000","STATUS":"","MH_FLAG":"H","DMTYPE":"" } ]}]}};
            */
            adpcnFactory.summaryData = summaryData.data;
            return summaryData;
          });
         }).then(function(response) { return response.data; });
       },  
       getRollCallGraph: function(rcWeek, unqId, getType,sbu) {
        return $timeout( function() {
        return $http.get(baseUrl+'adpcn/jsp/cnadpRollcallGraphJson.jsp',{params: {rcWeek, unqId, getType, sbu}}).then(function (response) { 
       
            var graphData = response;
            /*{"data": {"GRAPHDATA" : [ { "FICAL_YEAR":"2016", "SBS_FLAG":"N",
            "DATA":[  { "PERIOD_NAME": "JUL-15","PERIOD_ID": "2016001", 
            "WTD_SALES" :  "-1523", "WTD_QUOTA": "515.1", "WTD_PERC": "-295.7","WTD_UNITS" :  "-783", "WTD_SBS_UNITS": "",
            "MTD_SALES" :  "2150", "MTD_QUOTA": "2060.5", "MTD_PERC": "104.3","MTD_UNITS" :  "-489","MTD_SBS_UNITS": "",
            "YTD_SALES" :  "2150","YTD_QUOTA": "2060.5", "YTD_PERC": "104.3","YTD_UNITS" :  "-489 ", "YTD_SBS_UNITS": ""}, 
            { "PERIOD_NAME": "AUG-15","PERIOD_ID": "2016002", 
            "WTD_SALES" :  "3083", "WTD_QUOTA": "639.2", "WTD_PERC": "482.4","WTD_UNITS" :  "177", "WTD_SBS_UNITS": "",
            "MTD_SALES" :  "5158.1", "MTD_QUOTA": "3195.8", "MTD_PERC": "161.4","MTD_UNITS" :  "553","MTD_SBS_UNITS": "",
            "YTD_SALES" :  "7308","YTD_QUOTA": "5256.3", "YTD_PERC": "139","YTD_UNITS" :  "64 ", "YTD_SBS_UNITS": ""}, 
            { "PERIOD_NAME": "SEP-15","PERIOD_ID": "2016003", 
            "WTD_SALES" :  "3998.5", "WTD_QUOTA": "905.6", "WTD_PERC": "441.6","WTD_UNITS" :  "282", "WTD_SBS_UNITS": "",
            "MTD_SALES" :  "5573.5", "MTD_QUOTA": "3622.2", "MTD_PERC": "153.9","MTD_UNITS" :  "541","MTD_SBS_UNITS": "",
            "YTD_SALES" :  "12881.6","YTD_QUOTA": "8878.5", "YTD_PERC": "145.1","YTD_UNITS" :  "605 ", "YTD_SBS_UNITS": ""}, 
            { "PERIOD_NAME": "OCT-15","PERIOD_ID": "2016004", 
            "WTD_SALES" :  "3750.3", "WTD_QUOTA": "924.1", "WTD_PERC": "405.8","WTD_UNITS" :  "212", "WTD_SBS_UNITS": "",
            "MTD_SALES" :  "4271.9", "MTD_QUOTA": "3696.5", "MTD_PERC": "115.6","MTD_UNITS" :  "430","MTD_SBS_UNITS": "",
            "YTD_SALES" :  "17153.5","YTD_QUOTA": "12575", "YTD_PERC": "136.4","YTD_UNITS" :  "1035 ", "YTD_SBS_UNITS": ""}, 
            { "PERIOD_NAME": "NOV-15","PERIOD_ID": "2016005", 
            "WTD_SALES" :  "4017.4", "WTD_QUOTA": "1341.3", "WTD_PERC": "299.5","WTD_UNITS" :  "381", "WTD_SBS_UNITS": "",
            "MTD_SALES" :  "7322.5", "MTD_QUOTA": "6706.7", "MTD_PERC": "109.2","MTD_UNITS" :  "789","MTD_SBS_UNITS": "",
            "YTD_SALES" :  "24476","YTD_QUOTA": "19281.7", "YTD_PERC": "126.9","YTD_UNITS" :  "1824 ", "YTD_SBS_UNITS": ""}, 
            { "PERIOD_NAME": "DEC-15","PERIOD_ID": "2016006", 
            "WTD_SALES" :  "6237.3", "WTD_QUOTA": "1064.6", "WTD_PERC": "585.9","WTD_UNITS" :  "257", "WTD_SBS_UNITS": "",
            "MTD_SALES" :  "5648.2", "MTD_QUOTA": "4258.4", "MTD_PERC": "132.6","MTD_UNITS" :  "436","MTD_SBS_UNITS": "",
            "YTD_SALES" :  "30124.2","YTD_QUOTA": "23540.1", "YTD_PERC": "128","YTD_UNITS" :  "2260 ", "YTD_SBS_UNITS": ""}, 
            { "PERIOD_NAME": "JAN-16","PERIOD_ID": "2016007", 
            "WTD_SALES" :  "2430.3", "WTD_QUOTA": "530.9", "WTD_PERC": "457.8","WTD_UNITS" :  "177", "WTD_SBS_UNITS": "",
            "MTD_SALES" :  "1735.9", "MTD_QUOTA": "2123.5", "MTD_PERC": "81.7","MTD_UNITS" :  "234","MTD_SBS_UNITS": "",
            "YTD_SALES" :  "31860.1","YTD_QUOTA": "25663.7", "YTD_PERC": "124.1","YTD_UNITS" :  "2494 ", "YTD_SBS_UNITS": ""}, 
            { "PERIOD_NAME": "FEB-16","PERIOD_ID": "2016008", 
            "WTD_SALES" :  "3061.4", "WTD_QUOTA": "836.4", "WTD_PERC": "366","WTD_UNITS" :  "302", "WTD_SBS_UNITS": "",
            "MTD_SALES" :  "4500.4", "MTD_QUOTA": "4181.8", "MTD_PERC": "107.6","MTD_UNITS" :  "562","MTD_SBS_UNITS": "",
            "YTD_SALES" :  "36360.4","YTD_QUOTA": "29845.4", "YTD_PERC": "121.8","YTD_UNITS" :  "3056 ", "YTD_SBS_UNITS": ""}, 
            { "PERIOD_NAME": "MAR-16","PERIOD_ID": "2016009", 
            "WTD_SALES" :  "3782.8", "WTD_QUOTA": "1134.7", "WTD_PERC": "333.4","WTD_UNITS" :  "247", "WTD_SBS_UNITS": "",
            "MTD_SALES" :  "4015.3", "MTD_QUOTA": "4538.9", "MTD_PERC": "88.5","MTD_UNITS" :  "400","MTD_SBS_UNITS": "",
            "YTD_SALES" :  "40375.7","YTD_QUOTA": "34384.3", "YTD_PERC": "117.4","YTD_UNITS" :  "3456 ", "YTD_SBS_UNITS": ""}, 
            { "PERIOD_NAME": "APR-16","PERIOD_ID": "2016010", 
            "WTD_SALES" :  "3568.7", "WTD_QUOTA": "1245.9", "WTD_PERC": "286.4","WTD_UNITS" :  "229", "WTD_SBS_UNITS": "",
            "MTD_SALES" :  "3057.9", "MTD_QUOTA": "4983.7", "MTD_PERC": "61.4","MTD_UNITS" :  "295","MTD_SBS_UNITS": "",
            "YTD_SALES" :  "43433.6","YTD_QUOTA": "39368.1", "YTD_PERC": "110.3","YTD_UNITS" :  "3751 ", "YTD_SBS_UNITS": ""}, 
            { "PERIOD_NAME": "MAY-16","PERIOD_ID": "2016011", 
            "WTD_SALES" :  "2378.2", "WTD_QUOTA": "1155.9", "WTD_PERC": "205.7","WTD_UNITS" :  "217", "WTD_SBS_UNITS": "",
            "MTD_SALES" :  "6730.9", "MTD_QUOTA": "5779.3", "MTD_PERC": "116.5","MTD_UNITS" :  "542","MTD_SBS_UNITS": "",
            "YTD_SALES" :  "50164.5","YTD_QUOTA": "45147.3", "YTD_PERC": "111.1","YTD_UNITS" :  "4293 ", "YTD_SBS_UNITS": ""}, 
            { "PERIOD_NAME": "JUN-16","PERIOD_ID": "2016012", 
            "WTD_SALES" :  "4520.7", "WTD_QUOTA": "1750", "WTD_PERC": "258.3","WTD_UNITS" :  "442", "WTD_SBS_UNITS": "",
            "MTD_SALES" :  "5550.9", "MTD_QUOTA": "6999.9", "MTD_PERC": "79.3","MTD_UNITS" :  "662","MTD_SBS_UNITS": "",
            "YTD_SALES" :  "55715.3","YTD_QUOTA": "52147.3", "YTD_PERC": "106.8","YTD_UNITS" :  "4955 ", "YTD_SBS_UNITS": ""}]},
            { "FICAL_YEAR":"2017", "SBS_FLAG":"N",
            "DATA":[  
            { "PERIOD_NAME": "JUL-16","PERIOD_ID": "2017001", 
            "WTD_SALES" :  "2302.3", "WTD_QUOTA": "448.4", "WTD_PERC": "513.4","WTD_UNITS" :  "157", "WTD_SBS_UNITS": "",
            "MTD_SALES" :  "1821.4", "MTD_QUOTA": "1793.8", "MTD_PERC": "101.5","MTD_UNITS" :  "194","MTD_SBS_UNITS": "",
            "YTD_SALES" :  "1821.4","YTD_QUOTA": "1793.8", "YTD_PERC": "101.5","YTD_UNITS" :  "194 ", "YTD_SBS_UNITS": ""}, 
            { "PERIOD_NAME": "AUG-16","PERIOD_ID": "2017002", 
            "WTD_SALES" :  "2609", "WTD_QUOTA": "794.4", "WTD_PERC": "328.4","WTD_UNITS" :  "243", "WTD_SBS_UNITS": "",
            "MTD_SALES" :  "3876.9", "MTD_QUOTA": "3971.9", "MTD_PERC": "97.6","MTD_UNITS" :  "421","MTD_SBS_UNITS": "",
            "YTD_SALES" :  "5698.3","YTD_QUOTA": "5765.6", "YTD_PERC": "98.8","YTD_UNITS" :  "615 ", "YTD_SBS_UNITS": ""}, 
            { "PERIOD_NAME": "SEP-16","PERIOD_ID": "2017003", 
            "WTD_SALES" :  "0", "WTD_QUOTA": "1155", "WTD_PERC": "0","WTD_UNITS" :  "0", "WTD_SBS_UNITS": "",
            "MTD_SALES" :  "236.5", "MTD_QUOTA": "4619.9", "MTD_PERC": "5.1","MTD_UNITS" :  "9","MTD_SBS_UNITS": "",
            "YTD_SALES" :  "5934.8","YTD_QUOTA": "10385.5", "YTD_PERC": "57.1","YTD_UNITS" :  "624 ", "YTD_SBS_UNITS": ""}, 
            { "PERIOD_NAME": "OCT-16","PERIOD_ID": "2017004", 
            "WTD_SALES" :  "0", "WTD_QUOTA": "1123.8", "WTD_PERC": "0","WTD_UNITS" :  "0", "WTD_SBS_UNITS": "",
            "MTD_SALES" :  "0", "MTD_QUOTA": "4495.2", "MTD_PERC": "0","MTD_UNITS" :  "0","MTD_SBS_UNITS": "",
            "YTD_SALES" :  "5934.8","YTD_QUOTA": "14880.7", "YTD_PERC": "39.9","YTD_UNITS" :  "624 ", "YTD_SBS_UNITS": ""}, 
            { "PERIOD_NAME": "NOV-16","PERIOD_ID": "2017005", 
            "WTD_SALES" :  "0", "WTD_QUOTA": "0", "WTD_PERC": "0","WTD_UNITS" :  "0", "WTD_SBS_UNITS": "",
            "MTD_SALES" :  "-499.7", "MTD_QUOTA": "5240.3", "MTD_PERC": "-9.5","MTD_UNITS" :  "2","MTD_SBS_UNITS": "",
            "YTD_SALES" :  "5435.1","YTD_QUOTA": "20121", "YTD_PERC": "27","YTD_UNITS" :  "626 ", "YTD_SBS_UNITS": ""}  ]}]}};
            */
            adpcnFactory.graphData = graphData.data;
            return graphData;
         });
        }).then(function(response) { return response.data; });
       }, 
       getDMRollCall: function(rcWeek, unqId, mode,getType) {
        return  $timeout( function() {
        return  $http.get(baseUrl+'adpcn/jsp/cnadpRollcallMyTeamJson.jsp',{params:{rcWeek,unqId,mode,getType}}).then(function (response) { 
       
            var dmData = response;
            /*{"data": {  "TABS" : [ { "TAB_NAME":"Sales Office","SORT":"", "TAB_CODE":"TAB_OFF","RETRIEVE_FLAG":"Y", "TOTAL_REC":"54","SEVP_FLAG":"N","SBS_FLAG": "N", 
            "DATA":[  
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6292","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6292 Houston West UM","WG":"0","WNS":"0","WRS":"29.9","WAUD":"273.5","WN":"303.3","MG":"56.1","MNS":"-32.5","MRS":"29.9","MAUD":"273.5","MN":"327","YG":"56.1","YNS":"-32.5","YRS":"29.9","YAUD":"273.5","YN":"327","WQ":"20.8","MQ":"62.3","YQ":"62.3","WPT":"1459.6","MPT":"524.5","YPT":"524.5","BU":"MAS","PF":"ALL","WUN":"2","MUN":"-1","YUN":"-1","SWUN":"","SMUN":"","SYUN":"","FMQ":"83.1","FYQ":"2375","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6192","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6192 Atlanta North Core","WG":"97.9","WNS":"0","WRS":"25.4","WAUD":"100.4","WN":"223.7","MG":"164.2","MNS":"-114.1","MRS":"28.7","MAUD":"100.4","MN":"179.3","YG":"164.2","YNS":"-114.1","YRS":"28.7","YAUD":"100.4","YN":"179.3","WQ":"12.8","MQ":"38.4","YQ":"38.4","WPT":"1747.5","MPT":"466.9","YPT":"466.9","BU":"MAS","PF":"ALL","WUN":"5","MUN":"11","YUN":"11","SWUN":"","SMUN":"","SYUN":"","FMQ":"51.2","FYQ":"1462.9","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6390","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6390 Dallas West UM","WG":"16.9","WNS":"29.7","WRS":"0","WAUD":"29.3","WN":"75.9","MG":"110.7","MNS":"3.7","MRS":"0","MAUD":"29.3","MN":"143.8","YG":"110.7","YNS":"3.7","YRS":"0","YAUD":"29.3","YN":"143.8","WQ":"26","MQ":"78.1","YQ":"78.1","WPT":"291.7","MPT":"184.1","YPT":"184.1","BU":"MAS","PF":"ALL","WUN":"0","MUN":"13","YUN":"13","SWUN":"","SMUN":"","SYUN":"","FMQ":"104.1","FYQ":"2975","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6095","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6095 Puerto Rico Small Bus","WG":"30.1","WNS":"-.5","WRS":".8","WAUD":"3.8","WN":"34.2","MG":"75.7","MNS":"-34.1","MRS":"1.3","MAUD":"3.8","MN":"46.6","YG":"75.7","YNS":"-34.1","YRS":"1.3","YAUD":"3.8","YN":"46.6","WQ":"8.5","MQ":"25.6","YQ":"25.6","WPT":"401.1","MPT":"182.2","YPT":"182.2","BU":"MAS","PF":"ALL","WUN":"19","MUN":"25","YUN":"25","SWUN":"","SMUN":"","SYUN":"","FMQ":"34.1","FYQ":"975","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6495","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6495 Charlotte/Carolinas","WG":"6.5","WNS":"0","WRS":"47.2","WAUD":"32","WN":"85.7","MG":"182.9","MNS":"-149","MRS":"90.6","MAUD":"32","MN":"156.5","YG":"182.9","YNS":"-149","YRS":"90.6","YAUD":"32","YN":"156.5","WQ":"32.2","MQ":"96.6","YQ":"96.6","WPT":"266.2","MPT":"162","YPT":"162","BU":"MAS","PF":"ALL","WUN":"2","MUN":"-4","YUN":"-4","SWUN":"","SMUN":"","SYUN":"","FMQ":"128.8","FYQ":"3680","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6195","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6195 Atlanta East UM","WG":"64.7","WNS":"-.5","WRS":"0","WAUD":"-4.2","WN":"60","MG":"73.3","MNS":"-17","MRS":"0","MAUD":"-4.2","MN":"52.1","YG":"73.3","YNS":"-17","YRS":"0","YAUD":"-4.2","YN":"52.1","WQ":"25.4","MQ":"76.1","YQ":"76.1","WPT":"236.3","MPT":"68.4","YPT":"68.4","BU":"MAS","PF":"ALL","WUN":"8","MUN":"9","YUN":"9","SWUN":"","SMUN":"","SYUN":"","FMQ":"101.5","FYQ":"3278.4","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6375","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6375 Dallas Direct","WG":"0","WNS":"0","WRS":"0","WAUD":"7.1","WN":"7.1","MG":"0","MNS":"0","MRS":"0","MAUD":"7.1","MN":"7.1","YG":"0","YNS":"0","YRS":"0","YAUD":"7.1","YN":"7.1","WQ":"4.4","MQ":"13.1","YQ":"13.1","WPT":"162","MPT":"54","YPT":"54","BU":"MAS","PF":"ALL","WUN":"1","MUN":"1","YUN":"1","SWUN":"","SMUN":"","SYUN":"","FMQ":"17.5","FYQ":"500","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6492","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6492 Charlotte","WG":"7.3","WNS":"0","WRS":"3.6","WAUD":"28.8","WN":"39.7","MG":"23.7","MNS":"-25.3","MRS":"3.6","MAUD":"28.8","MN":"30.8","YG":"23.7","YNS":"-25.3","YRS":"3.6","YAUD":"28.8","YN":"30.8","WQ":"19.7","MQ":"59.1","YQ":"59.1","WPT":"201.7","MPT":"52.2","YPT":"52.2","BU":"MAS","PF":"ALL","WUN":"1","MUN":"-2","YUN":"-2","SWUN":"","SMUN":"","SYUN":"","FMQ":"78.7","FYQ":"2250","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6396","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6396 Oklahoma","WG":"1.2","WNS":"0","WRS":"3.9","WAUD":"-3","WN":"2.1","MG":"33.6","MNS":"-14.7","MRS":"3.9","MAUD":"-3","MN":"19.9","YG":"33.6","YNS":"-14.7","YRS":"3.9","YAUD":"-3","YN":"19.9","WQ":"27.8","MQ":"83.3","YQ":"83.3","WPT":"7.6","MPT":"23.8","YPT":"23.8","BU":"MAS","PF":"ALL","WUN":"0","MUN":"-2","YUN":"-2","SWUN":"","SMUN":"","SYUN":"","FMQ":"111.1","FYQ":"3175","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6191","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6191 Atlanta West Upmarket","WG":"12.7","WNS":".1","WRS":"0","WAUD":"0","WN":"12.7","MG":"13.1","MNS":".1","MRS":"0","MAUD":"0","MN":"13.2","YG":"13.1","YNS":".1","YRS":"0","YAUD":"0","YN":"13.2","WQ":"30.4","MQ":"91.1","YQ":"91.1","WPT":"42","MPT":"14.5","YPT":"14.5","BU":"MAS","PF":"ALL","WUN":"2","MUN":"2","YUN":"2","SWUN":"","SMUN":"","SYUN":"","FMQ":"121.5","FYQ":"3092.4","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6194","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6194 Atlanta South Core","WG":"39.7","WNS":"0","WRS":"0","WAUD":"-2.3","WN":"37.4","MG":"41.1","MNS":"-33.2","MRS":"0","MAUD":"-2.3","MN":"5.6","YG":"41.1","YNS":"-33.2","YRS":"0","YAUD":"-2.3","YN":"5.6","WQ":"15.2","MQ":"45.7","YQ":"45.7","WPT":"245.9","MPT":"12.2","YPT":"12.2","BU":"MAS","PF":"ALL","WUN":"5","MUN":"-4","YUN":"-4","SWUN":"","SMUN":"","SYUN":"","FMQ":"60.9","FYQ":"1740","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6089","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6089 Tampa","WG":"7.5","WNS":"0","WRS":".4","WAUD":"2.7","WN":"10.6","MG":"14.1","MNS":"-10.1","MRS":".5","MAUD":"2.7","MN":"7.3","YG":"14.1","YNS":"-10.1","YRS":".5","YAUD":"2.7","YN":"7.3","WQ":"22.7","MQ":"68.2","YQ":"68.2","WPT":"46.4","MPT":"10.7","YPT":"10.7","BU":"MAS","PF":"ALL","WUN":"1","MUN":"1","YUN":"1","SWUN":"","SMUN":"","SYUN":"","FMQ":"91","FYQ":"2350","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6087","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6087 Direct to VP","WG":"40.1","WNS":".1","WRS":"4","WAUD":"2.1","WN":"46.3","MG":"49.6","MNS":"-51.2","MRS":"4.2","MAUD":"2.1","MN":"4.7","YG":"49.6","YNS":"-51.2","YRS":"4.2","YAUD":"2.1","YN":"4.7","WQ":"15.5","MQ":"46.6","YQ":"46.6","WPT":"298.2","MPT":"10.2","YPT":"10.2","BU":"MAS","PF":"ALL","WUN":"1","MUN":"4","YUN":"4","SWUN":"","SMUN":"","SYUN":"","FMQ":"62.1","FYQ":"1875","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6691","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6691 San Antonio","WG":"9.8","WNS":"-1.3","WRS":"13.5","WAUD":"-13.4","WN":"8.6","MG":"53.6","MNS":"-56.4","MRS":"16.3","MAUD":"-13.4","MN":".1","YG":"53.6","YNS":"-56.4","YRS":"16.3","YAUD":"-13.4","YN":".1","WQ":"22.7","MQ":"68.2","YQ":"68.2","WPT":"37.7","MPT":".1","YPT":".1","BU":"MAS","PF":"ALL","WUN":"0","MUN":"-1","YUN":"-1","SWUN":"","SMUN":"","SYUN":"","FMQ":"91","FYQ":"2600","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6190","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6190 Atlanta East UM","WG":".3","WNS":"0","WRS":"0","WAUD":".5","WN":".7","MG":".3","MNS":"0","MRS":"0","MAUD":".5","MN":".7","YG":".3","YNS":"0","YRS":"0","YAUD":".5","YN":".7","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6160","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6160 Houston UM MA","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"23.6","MQ":"70.9","YQ":"70.9","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"94.5","FYQ":"2700","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6098","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6098 Gulf Coast - Miami","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6096","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6096 South Florida","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"3.4","MQ":"10.2","YQ":"10.2","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"13.7","FYQ":"390","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6088","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6088 Jacksonville","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"-200","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6084","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6084 Orlando MM/UM","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6082","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6082 Jacksonville FL 2","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6081","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6081 Central FL MM2","WG":"1.2","WNS":"0","WRS":"0","WAUD":"0","WN":"1.2","MG":"1.2","MNS":".5","MRS":"0","MAUD":"0","MN":"1.7","YG":"1.2","YNS":".5","YRS":"0","YAUD":"0","YN":"1.7","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6080","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6080 Orlando FL2","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6051","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6051 Tampa Metro","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6050","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6050 Gulf Coast","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"5391","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 5391 Phoe Client","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"4892","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 4892 Nashville Client","WG":".8","WNS":"0","WRS":"0","WAUD":"0","WN":".8","MG":".8","MNS":"0","MRS":"0","MAUD":"0","MN":".8","YG":".8","YNS":"0","YRS":"0","YAUD":"0","YN":".8","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"4884","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 4884 Southeast House","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"4399","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 4399 S Florida House","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6491","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6491 Carolina House","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":".3","MNS":"0","MRS":"0","MAUD":"0","MN":".3","YG":".3","YNS":"0","YRS":"0","YAUD":"0","YN":".3","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"-1","YUN":"-1","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6490","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6490 Carolinas","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"1.8","MQ":"5.3","YQ":"5.3","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"7","FYQ":"300","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6398","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6398 Bay Area Core West","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6397","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6397 Central Texas","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"2.6","MQ":"7.9","YQ":"7.9","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"10.5","FYQ":"300","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6395","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6395 Tulsa Mkt","WG":"55.3","WNS":"-5","WRS":"0","WAUD":"-1.1","WN":"49.1","MG":"134.4","MNS":"-36.3","MRS":"0","MAUD":"-1.1","MN":"97","YG":"134.4","YNS":"-36.3","YRS":"0","YAUD":"-1.1","YN":"97","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"3","MUN":"4","YUN":"4","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6321","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6321 Central Texas/Oklahoma HOUSE","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6284","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6284 Austin Core","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"7","MQ":"21","YQ":"21","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"28","FYQ":"800","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6197","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6197 Alabama North","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"2091","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 2091 Atlanta Central Core","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"3.5","MQ":"10.6","YQ":"10.6","WPT":"-.3","MPT":"-.1","YPT":"-.1","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"14.1","FYQ":"404.2","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6083","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6083 South Florida UM South","WG":"-36","WNS":"-10.6","WRS":"28.5","WAUD":"-27.7","WN":"-45.8","MG":"69.4","MNS":"-96.4","MRS":"28.5","MAUD":"-27.7","MN":"-26.3","YG":"69.4","YNS":"-96.4","YRS":"28.5","YAUD":"-27.7","YN":"-26.3","WQ":"29.2","MQ":"87.7","YQ":"87.7","WPT":"-156.8","MPT":"-30","YPT":"-30","BU":"MAS","PF":"ALL","WUN":"24","MUN":"31","YUN":"31","SWUN":"","SMUN":"","SYUN":"","FMQ":"116.9","FYQ":"3340","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6086","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6086 Orlando1","WG":"-.1","WNS":"0","WRS":"18.2","WAUD":"9.3","WN":"27.4","MG":"14.9","MNS":"-107.5","MRS":"36.1","MAUD":"9.3","MN":"-47.2","YG":"14.9","YNS":"-107.5","YRS":"36.1","YAUD":"9.3","YN":"-47.2","WQ":"29.1","MQ":"87.3","YQ":"87.3","WPT":"94.1","MPT":"-54.1","YPT":"-54.1","BU":"MAS","PF":"ALL","WUN":"5","MUN":"-4","YUN":"-4","SWUN":"","SMUN":"","SYUN":"","FMQ":"116.4","FYQ":"3325","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"4889","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 4889 Jacksonville","WG":"7.4","WNS":"12.3","WRS":"20.2","WAUD":"8.6","WN":"48.5","MG":"12.9","MNS":"-90.8","MRS":"20.2","MAUD":"8.6","MN":"-49.1","YG":"12.9","YNS":"-90.8","YRS":"20.2","YAUD":"8.6","YN":"-49.1","WQ":"28","MQ":"84","YQ":"84","WPT":"173.3","MPT":"-58.4","YPT":"-58.4","BU":"MAS","PF":"ALL","WUN":"1","MUN":"-2","YUN":"-2","SWUN":"","SMUN":"","SYUN":"","FMQ":"112","FYQ":"3200","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6161","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6161 New Orleans1","WG":"33.1","WNS":"-12.8","WRS":"39.6","WAUD":"-40.9","WN":"18.9","MG":"54.9","MNS":"-121.5","MRS":"39.6","MAUD":"-40.9","MN":"-67.9","YG":"54.9","YNS":"-121.5","YRS":"39.6","YAUD":"-40.9","YN":"-67.9","WQ":"32.8","MQ":"98.4","YQ":"98.4","WPT":"57.7","MPT":"-69","YPT":"-69","BU":"MAS","PF":"ALL","WUN":"12","MUN":"15","YUN":"15","SWUN":"","SMUN":"","SYUN":"","FMQ":"131.3","FYQ":"3750","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"4890","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 4890 Nashville","WG":"-1.4","WNS":"0","WRS":"8.2","WAUD":"15.3","WN":"22.1","MG":"-30.6","MNS":"-48.2","MRS":"12.6","MAUD":"15.3","MN":"-50.9","YG":"-30.6","YNS":"-48.2","YRS":"12.6","YAUD":"15.3","YN":"-50.9","WQ":"22.3","MQ":"66.9","YQ":"66.9","WPT":"99.1","MPT":"-76","YPT":"-76","BU":"MAS","PF":"ALL","WUN":"-1","MUN":"-9","YUN":"-9","SWUN":"","SMUN":"","SYUN":"","FMQ":"89.3","FYQ":"2550","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"4894","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 4894 Knoxville","WG":"0","WNS":"0","WRS":"0","WAUD":"13.5","WN":"13.5","MG":".2","MNS":"-31.6","MRS":"0","MAUD":"13.5","MN":"-17.9","YG":".2","YNS":"-31.6","YRS":"0","YAUD":"13.5","YN":"-17.9","WQ":"7.4","MQ":"22.3","YQ":"22.3","WPT":"180.9","MPT":"-80.2","YPT":"-80.2","BU":"MAS","PF":"ALL","WUN":"1","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"29.7","FYQ":"850","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6233","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6233 Atlanta Core Direct","WG":"-.2","WNS":"0","WRS":".2","WAUD":"-.4","WN":"-.4","MG":".7","MNS":"-27.8","MRS":".2","MAUD":"-.4","MN":"-27.3","YG":".7","YNS":"-27.8","YRS":".2","YAUD":"-.4","YN":"-27.3","WQ":"11.1","MQ":"33.4","YQ":"33.4","WPT":"-3.2","MPT":"-81.8","YPT":"-81.8","BU":"MAS","PF":"ALL","WUN":"0","MUN":"-7","YUN":"-7","SWUN":"","SMUN":"","SYUN":"","FMQ":"44.5","FYQ":"1272.1","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6489","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6489 Raleigh East","WG":"15.2","WNS":"-8.8","WRS":"16.5","WAUD":"-3.2","WN":"19.8","MG":"44.1","MNS":"-137.1","MRS":"16.5","MAUD":"-3.2","MN":"-79.7","YG":"44.1","YNS":"-137.1","YRS":"16.5","YAUD":"-3.2","YN":"-79.7","WQ":"25.1","MQ":"75.3","YQ":"75.3","WPT":"78.6","MPT":"-105.7","YPT":"-105.7","BU":"MAS","PF":"ALL","WUN":"3","MUN":"-6","YUN":"-6","SWUN":"","SMUN":"","SYUN":"","FMQ":"100.4","FYQ":"2870","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6196","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6196 Alabama1","WG":"3","WNS":"0","WRS":"12.3","WAUD":"5.4","WN":"20.7","MG":"13.7","MNS":"-108.1","MRS":"13","MAUD":"5.4","MN":"-76","YG":"13.7","YNS":"-108.1","YRS":"13","YAUD":"5.4","YN":"-76","WQ":"20.6","MQ":"61.7","YQ":"61.7","WPT":"100.7","MPT":"-123.2","YPT":"-123.2","BU":"MAS","PF":"ALL","WUN":"3","MUN":"-4","YUN":"-4","SWUN":"","SMUN":"","SYUN":"","FMQ":"82.3","FYQ":"2350","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"4891","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 4891 Memphis","WG":"1","WNS":"0","WRS":"4","WAUD":"1.8","WN":"6.8","MG":"29.6","MNS":"-119.7","MRS":"5.4","MAUD":"1.8","MN":"-82.9","YG":"29.6","YNS":"-119.7","YRS":"5.4","YAUD":"1.8","YN":"-82.9","WQ":"21.4","MQ":"64.3","YQ":"64.3","WPT":"31.6","MPT":"-128.8","YPT":"-128.8","BU":"MAS","PF":"ALL","WUN":"0","MUN":"-1","YUN":"-1","SWUN":"","SMUN":"","SYUN":"","FMQ":"85.8","FYQ":"2450","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6392","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6392 Dallas North UM","WG":"36.2","WNS":".2","WRS":"28.3","WAUD":"-18.8","WN":"45.9","MG":"26.6","MNS":"-186.7","MRS":"28.3","MAUD":"-18.8","MN":"-150.5","YG":"26.6","YNS":"-186.7","YRS":"28.3","YAUD":"-18.8","YN":"-150.5","WQ":"28.4","MQ":"85.3","YQ":"85.3","WPT":"161.5","MPT":"-176.5","YPT":"-176.5","BU":"MAS","PF":"ALL","WUN":"24","MUN":"19","YUN":"19","SWUN":"","SMUN":"","SYUN":"","FMQ":"113.8","FYQ":"3250","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6494","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6494 Greenville","WG":"9","WNS":"0","WRS":"3","WAUD":"1","WN":"12.9","MG":"9.7","MNS":"-120.9","MRS":"3","MAUD":"1","MN":"-107.2","YG":"9.7","YNS":"-120.9","YRS":"3","YAUD":"1","YN":"-107.2","WQ":"16.6","MQ":"49.9","YQ":"49.9","WPT":"77.5","MPT":"-215","YPT":"-215","BU":"MAS","PF":"ALL","WUN":"2","MUN":"-4","YUN":"-4","SWUN":"","SMUN":"","SYUN":"","FMQ":"66.5","FYQ":"1900","STATUS":"","MH_FLAG":"H","DMTYPE":"" }] } ] } };
            */
            adpcnFactory.dmData = dmData.data;
            return dmData;
          });
        }).then(function(response) { return response.data; });
       },
       getOfficeRollCall: function(rcWeek, unqId, mode,getType) {
        return $timeout( function() {
        return $http.get(baseUrl+'adpcn/jsp/cnadpRollcallMyTeamJson.jsp',{params:{rcWeek,unqId,mode,getType}}).then(function (response) {
       
            var officeData = response;
            /*{"data": {  "TABS" : [ { "TAB_NAME":"Sales Office","SORT":"", "TAB_CODE":"TAB_OFF","RETRIEVE_FLAG":"Y", "TOTAL_REC":"54","SEVP_FLAG":"N","SBS_FLAG": "N", 
            "DATA":[  
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6292","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6292 Houston West UM","WG":"0","WNS":"0","WRS":"29.9","WAUD":"273.5","WN":"303.3","MG":"56.1","MNS":"-32.5","MRS":"29.9","MAUD":"273.5","MN":"327","YG":"56.1","YNS":"-32.5","YRS":"29.9","YAUD":"273.5","YN":"327","WQ":"20.8","MQ":"62.3","YQ":"62.3","WPT":"1459.6","MPT":"524.5","YPT":"524.5","BU":"MAS","PF":"ALL","WUN":"2","MUN":"-1","YUN":"-1","SWUN":"","SMUN":"","SYUN":"","FMQ":"83.1","FYQ":"2375","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6192","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6192 Atlanta North Core","WG":"97.9","WNS":"0","WRS":"25.4","WAUD":"100.4","WN":"223.7","MG":"164.2","MNS":"-114.1","MRS":"28.7","MAUD":"100.4","MN":"179.3","YG":"164.2","YNS":"-114.1","YRS":"28.7","YAUD":"100.4","YN":"179.3","WQ":"12.8","MQ":"38.4","YQ":"38.4","WPT":"1747.5","MPT":"466.9","YPT":"466.9","BU":"MAS","PF":"ALL","WUN":"5","MUN":"11","YUN":"11","SWUN":"","SMUN":"","SYUN":"","FMQ":"51.2","FYQ":"1462.9","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6390","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6390 Dallas West UM","WG":"16.9","WNS":"29.7","WRS":"0","WAUD":"29.3","WN":"75.9","MG":"110.7","MNS":"3.7","MRS":"0","MAUD":"29.3","MN":"143.8","YG":"110.7","YNS":"3.7","YRS":"0","YAUD":"29.3","YN":"143.8","WQ":"26","MQ":"78.1","YQ":"78.1","WPT":"291.7","MPT":"184.1","YPT":"184.1","BU":"MAS","PF":"ALL","WUN":"0","MUN":"13","YUN":"13","SWUN":"","SMUN":"","SYUN":"","FMQ":"104.1","FYQ":"2975","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6095","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6095 Puerto Rico Small Bus","WG":"30.1","WNS":"-.5","WRS":".8","WAUD":"3.8","WN":"34.2","MG":"75.7","MNS":"-34.1","MRS":"1.3","MAUD":"3.8","MN":"46.6","YG":"75.7","YNS":"-34.1","YRS":"1.3","YAUD":"3.8","YN":"46.6","WQ":"8.5","MQ":"25.6","YQ":"25.6","WPT":"401.1","MPT":"182.2","YPT":"182.2","BU":"MAS","PF":"ALL","WUN":"19","MUN":"25","YUN":"25","SWUN":"","SMUN":"","SYUN":"","FMQ":"34.1","FYQ":"975","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6495","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6495 Charlotte/Carolinas","WG":"6.5","WNS":"0","WRS":"47.2","WAUD":"32","WN":"85.7","MG":"182.9","MNS":"-149","MRS":"90.6","MAUD":"32","MN":"156.5","YG":"182.9","YNS":"-149","YRS":"90.6","YAUD":"32","YN":"156.5","WQ":"32.2","MQ":"96.6","YQ":"96.6","WPT":"266.2","MPT":"162","YPT":"162","BU":"MAS","PF":"ALL","WUN":"2","MUN":"-4","YUN":"-4","SWUN":"","SMUN":"","SYUN":"","FMQ":"128.8","FYQ":"3680","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6195","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6195 Atlanta East UM","WG":"64.7","WNS":"-.5","WRS":"0","WAUD":"-4.2","WN":"60","MG":"73.3","MNS":"-17","MRS":"0","MAUD":"-4.2","MN":"52.1","YG":"73.3","YNS":"-17","YRS":"0","YAUD":"-4.2","YN":"52.1","WQ":"25.4","MQ":"76.1","YQ":"76.1","WPT":"236.3","MPT":"68.4","YPT":"68.4","BU":"MAS","PF":"ALL","WUN":"8","MUN":"9","YUN":"9","SWUN":"","SMUN":"","SYUN":"","FMQ":"101.5","FYQ":"3278.4","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6375","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6375 Dallas Direct","WG":"0","WNS":"0","WRS":"0","WAUD":"7.1","WN":"7.1","MG":"0","MNS":"0","MRS":"0","MAUD":"7.1","MN":"7.1","YG":"0","YNS":"0","YRS":"0","YAUD":"7.1","YN":"7.1","WQ":"4.4","MQ":"13.1","YQ":"13.1","WPT":"162","MPT":"54","YPT":"54","BU":"MAS","PF":"ALL","WUN":"1","MUN":"1","YUN":"1","SWUN":"","SMUN":"","SYUN":"","FMQ":"17.5","FYQ":"500","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6492","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6492 Charlotte","WG":"7.3","WNS":"0","WRS":"3.6","WAUD":"28.8","WN":"39.7","MG":"23.7","MNS":"-25.3","MRS":"3.6","MAUD":"28.8","MN":"30.8","YG":"23.7","YNS":"-25.3","YRS":"3.6","YAUD":"28.8","YN":"30.8","WQ":"19.7","MQ":"59.1","YQ":"59.1","WPT":"201.7","MPT":"52.2","YPT":"52.2","BU":"MAS","PF":"ALL","WUN":"1","MUN":"-2","YUN":"-2","SWUN":"","SMUN":"","SYUN":"","FMQ":"78.7","FYQ":"2250","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6396","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6396 Oklahoma","WG":"1.2","WNS":"0","WRS":"3.9","WAUD":"-3","WN":"2.1","MG":"33.6","MNS":"-14.7","MRS":"3.9","MAUD":"-3","MN":"19.9","YG":"33.6","YNS":"-14.7","YRS":"3.9","YAUD":"-3","YN":"19.9","WQ":"27.8","MQ":"83.3","YQ":"83.3","WPT":"7.6","MPT":"23.8","YPT":"23.8","BU":"MAS","PF":"ALL","WUN":"0","MUN":"-2","YUN":"-2","SWUN":"","SMUN":"","SYUN":"","FMQ":"111.1","FYQ":"3175","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6191","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6191 Atlanta West Upmarket","WG":"12.7","WNS":".1","WRS":"0","WAUD":"0","WN":"12.7","MG":"13.1","MNS":".1","MRS":"0","MAUD":"0","MN":"13.2","YG":"13.1","YNS":".1","YRS":"0","YAUD":"0","YN":"13.2","WQ":"30.4","MQ":"91.1","YQ":"91.1","WPT":"42","MPT":"14.5","YPT":"14.5","BU":"MAS","PF":"ALL","WUN":"2","MUN":"2","YUN":"2","SWUN":"","SMUN":"","SYUN":"","FMQ":"121.5","FYQ":"3092.4","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6194","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6194 Atlanta South Core","WG":"39.7","WNS":"0","WRS":"0","WAUD":"-2.3","WN":"37.4","MG":"41.1","MNS":"-33.2","MRS":"0","MAUD":"-2.3","MN":"5.6","YG":"41.1","YNS":"-33.2","YRS":"0","YAUD":"-2.3","YN":"5.6","WQ":"15.2","MQ":"45.7","YQ":"45.7","WPT":"245.9","MPT":"12.2","YPT":"12.2","BU":"MAS","PF":"ALL","WUN":"5","MUN":"-4","YUN":"-4","SWUN":"","SMUN":"","SYUN":"","FMQ":"60.9","FYQ":"1740","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6089","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6089 Tampa","WG":"7.5","WNS":"0","WRS":".4","WAUD":"2.7","WN":"10.6","MG":"14.1","MNS":"-10.1","MRS":".5","MAUD":"2.7","MN":"7.3","YG":"14.1","YNS":"-10.1","YRS":".5","YAUD":"2.7","YN":"7.3","WQ":"22.7","MQ":"68.2","YQ":"68.2","WPT":"46.4","MPT":"10.7","YPT":"10.7","BU":"MAS","PF":"ALL","WUN":"1","MUN":"1","YUN":"1","SWUN":"","SMUN":"","SYUN":"","FMQ":"91","FYQ":"2350","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6087","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6087 Direct to VP","WG":"40.1","WNS":".1","WRS":"4","WAUD":"2.1","WN":"46.3","MG":"49.6","MNS":"-51.2","MRS":"4.2","MAUD":"2.1","MN":"4.7","YG":"49.6","YNS":"-51.2","YRS":"4.2","YAUD":"2.1","YN":"4.7","WQ":"15.5","MQ":"46.6","YQ":"46.6","WPT":"298.2","MPT":"10.2","YPT":"10.2","BU":"MAS","PF":"ALL","WUN":"1","MUN":"4","YUN":"4","SWUN":"","SMUN":"","SYUN":"","FMQ":"62.1","FYQ":"1875","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6691","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6691 San Antonio","WG":"9.8","WNS":"-1.3","WRS":"13.5","WAUD":"-13.4","WN":"8.6","MG":"53.6","MNS":"-56.4","MRS":"16.3","MAUD":"-13.4","MN":".1","YG":"53.6","YNS":"-56.4","YRS":"16.3","YAUD":"-13.4","YN":".1","WQ":"22.7","MQ":"68.2","YQ":"68.2","WPT":"37.7","MPT":".1","YPT":".1","BU":"MAS","PF":"ALL","WUN":"0","MUN":"-1","YUN":"-1","SWUN":"","SMUN":"","SYUN":"","FMQ":"91","FYQ":"2600","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6190","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6190 Atlanta East UM","WG":".3","WNS":"0","WRS":"0","WAUD":".5","WN":".7","MG":".3","MNS":"0","MRS":"0","MAUD":".5","MN":".7","YG":".3","YNS":"0","YRS":"0","YAUD":".5","YN":".7","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6160","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6160 Houston UM MA","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"23.6","MQ":"70.9","YQ":"70.9","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"94.5","FYQ":"2700","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6098","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6098 Gulf Coast - Miami","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6096","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6096 South Florida","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"3.4","MQ":"10.2","YQ":"10.2","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"13.7","FYQ":"390","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6088","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6088 Jacksonville","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"-200","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6084","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6084 Orlando MM/UM","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6082","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6082 Jacksonville FL 2","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6081","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6081 Central FL MM2","WG":"1.2","WNS":"0","WRS":"0","WAUD":"0","WN":"1.2","MG":"1.2","MNS":".5","MRS":"0","MAUD":"0","MN":"1.7","YG":"1.2","YNS":".5","YRS":"0","YAUD":"0","YN":"1.7","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6080","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6080 Orlando FL2","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6051","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6051 Tampa Metro","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6050","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6050 Gulf Coast","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"5391","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 5391 Phoe Client","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"4892","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 4892 Nashville Client","WG":".8","WNS":"0","WRS":"0","WAUD":"0","WN":".8","MG":".8","MNS":"0","MRS":"0","MAUD":"0","MN":".8","YG":".8","YNS":"0","YRS":"0","YAUD":"0","YN":".8","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"4884","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 4884 Southeast House","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"4399","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 4399 S Florida House","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6491","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6491 Carolina House","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":".3","MNS":"0","MRS":"0","MAUD":"0","MN":".3","YG":".3","YNS":"0","YRS":"0","YAUD":"0","YN":".3","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"-1","YUN":"-1","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6490","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6490 Carolinas","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"1.8","MQ":"5.3","YQ":"5.3","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"7","FYQ":"300","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6398","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6398 Bay Area Core West","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6397","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6397 Central Texas","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"2.6","MQ":"7.9","YQ":"7.9","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"10.5","FYQ":"300","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6395","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6395 Tulsa Mkt","WG":"55.3","WNS":"-5","WRS":"0","WAUD":"-1.1","WN":"49.1","MG":"134.4","MNS":"-36.3","MRS":"0","MAUD":"-1.1","MN":"97","YG":"134.4","YNS":"-36.3","YRS":"0","YAUD":"-1.1","YN":"97","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"3","MUN":"4","YUN":"4","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6321","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6321 Central Texas/Oklahoma HOUSE","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6284","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6284 Austin Core","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"7","MQ":"21","YQ":"21","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"28","FYQ":"800","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6197","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6197 Alabama North","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"0","MQ":"0","YQ":"0","WPT":"0","MPT":"0","YPT":"0","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"0","FYQ":"0","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"2091","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 2091 Atlanta Central Core","WG":"0","WNS":"0","WRS":"0","WAUD":"0","WN":"0","MG":"0","MNS":"0","MRS":"0","MAUD":"0","MN":"0","YG":"0","YNS":"0","YRS":"0","YAUD":"0","YN":"0","WQ":"3.5","MQ":"10.6","YQ":"10.6","WPT":"-.3","MPT":"-.1","YPT":"-.1","BU":"MAS","PF":"ALL","WUN":"0","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"14.1","FYQ":"404.2","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6083","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6083 South Florida UM South","WG":"-36","WNS":"-10.6","WRS":"28.5","WAUD":"-27.7","WN":"-45.8","MG":"69.4","MNS":"-96.4","MRS":"28.5","MAUD":"-27.7","MN":"-26.3","YG":"69.4","YNS":"-96.4","YRS":"28.5","YAUD":"-27.7","YN":"-26.3","WQ":"29.2","MQ":"87.7","YQ":"87.7","WPT":"-156.8","MPT":"-30","YPT":"-30","BU":"MAS","PF":"ALL","WUN":"24","MUN":"31","YUN":"31","SWUN":"","SMUN":"","SYUN":"","FMQ":"116.9","FYQ":"3340","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6086","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6086 Orlando1","WG":"-.1","WNS":"0","WRS":"18.2","WAUD":"9.3","WN":"27.4","MG":"14.9","MNS":"-107.5","MRS":"36.1","MAUD":"9.3","MN":"-47.2","YG":"14.9","YNS":"-107.5","YRS":"36.1","YAUD":"9.3","YN":"-47.2","WQ":"29.1","MQ":"87.3","YQ":"87.3","WPT":"94.1","MPT":"-54.1","YPT":"-54.1","BU":"MAS","PF":"ALL","WUN":"5","MUN":"-4","YUN":"-4","SWUN":"","SMUN":"","SYUN":"","FMQ":"116.4","FYQ":"3325","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"4889","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 4889 Jacksonville","WG":"7.4","WNS":"12.3","WRS":"20.2","WAUD":"8.6","WN":"48.5","MG":"12.9","MNS":"-90.8","MRS":"20.2","MAUD":"8.6","MN":"-49.1","YG":"12.9","YNS":"-90.8","YRS":"20.2","YAUD":"8.6","YN":"-49.1","WQ":"28","MQ":"84","YQ":"84","WPT":"173.3","MPT":"-58.4","YPT":"-58.4","BU":"MAS","PF":"ALL","WUN":"1","MUN":"-2","YUN":"-2","SWUN":"","SMUN":"","SYUN":"","FMQ":"112","FYQ":"3200","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6161","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6161 New Orleans1","WG":"33.1","WNS":"-12.8","WRS":"39.6","WAUD":"-40.9","WN":"18.9","MG":"54.9","MNS":"-121.5","MRS":"39.6","MAUD":"-40.9","MN":"-67.9","YG":"54.9","YNS":"-121.5","YRS":"39.6","YAUD":"-40.9","YN":"-67.9","WQ":"32.8","MQ":"98.4","YQ":"98.4","WPT":"57.7","MPT":"-69","YPT":"-69","BU":"MAS","PF":"ALL","WUN":"12","MUN":"15","YUN":"15","SWUN":"","SMUN":"","SYUN":"","FMQ":"131.3","FYQ":"3750","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"4890","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 4890 Nashville","WG":"-1.4","WNS":"0","WRS":"8.2","WAUD":"15.3","WN":"22.1","MG":"-30.6","MNS":"-48.2","MRS":"12.6","MAUD":"15.3","MN":"-50.9","YG":"-30.6","YNS":"-48.2","YRS":"12.6","YAUD":"15.3","YN":"-50.9","WQ":"22.3","MQ":"66.9","YQ":"66.9","WPT":"99.1","MPT":"-76","YPT":"-76","BU":"MAS","PF":"ALL","WUN":"-1","MUN":"-9","YUN":"-9","SWUN":"","SMUN":"","SYUN":"","FMQ":"89.3","FYQ":"2550","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"4894","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 4894 Knoxville","WG":"0","WNS":"0","WRS":"0","WAUD":"13.5","WN":"13.5","MG":".2","MNS":"-31.6","MRS":"0","MAUD":"13.5","MN":"-17.9","YG":".2","YNS":"-31.6","YRS":"0","YAUD":"13.5","YN":"-17.9","WQ":"7.4","MQ":"22.3","YQ":"22.3","WPT":"180.9","MPT":"-80.2","YPT":"-80.2","BU":"MAS","PF":"ALL","WUN":"1","MUN":"0","YUN":"0","SWUN":"","SMUN":"","SYUN":"","FMQ":"29.7","FYQ":"850","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6233","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6233 Atlanta Core Direct","WG":"-.2","WNS":"0","WRS":".2","WAUD":"-.4","WN":"-.4","MG":".7","MNS":"-27.8","MRS":".2","MAUD":"-.4","MN":"-27.3","YG":".7","YNS":"-27.8","YRS":".2","YAUD":"-.4","YN":"-27.3","WQ":"11.1","MQ":"33.4","YQ":"33.4","WPT":"-3.2","MPT":"-81.8","YPT":"-81.8","BU":"MAS","PF":"ALL","WUN":"0","MUN":"-7","YUN":"-7","SWUN":"","SMUN":"","SYUN":"","FMQ":"44.5","FYQ":"1272.1","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6489","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6489 Raleigh East","WG":"15.2","WNS":"-8.8","WRS":"16.5","WAUD":"-3.2","WN":"19.8","MG":"44.1","MNS":"-137.1","MRS":"16.5","MAUD":"-3.2","MN":"-79.7","YG":"44.1","YNS":"-137.1","YRS":"16.5","YAUD":"-3.2","YN":"-79.7","WQ":"25.1","MQ":"75.3","YQ":"75.3","WPT":"78.6","MPT":"-105.7","YPT":"-105.7","BU":"MAS","PF":"ALL","WUN":"3","MUN":"-6","YUN":"-6","SWUN":"","SMUN":"","SYUN":"","FMQ":"100.4","FYQ":"2870","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6196","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6196 Alabama1","WG":"3","WNS":"0","WRS":"12.3","WAUD":"5.4","WN":"20.7","MG":"13.7","MNS":"-108.1","MRS":"13","MAUD":"5.4","MN":"-76","YG":"13.7","YNS":"-108.1","YRS":"13","YAUD":"5.4","YN":"-76","WQ":"20.6","MQ":"61.7","YQ":"61.7","WPT":"100.7","MPT":"-123.2","YPT":"-123.2","BU":"MAS","PF":"ALL","WUN":"3","MUN":"-4","YUN":"-4","SWUN":"","SMUN":"","SYUN":"","FMQ":"82.3","FYQ":"2350","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"4891","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 4891 Memphis","WG":"1","WNS":"0","WRS":"4","WAUD":"1.8","WN":"6.8","MG":"29.6","MNS":"-119.7","MRS":"5.4","MAUD":"1.8","MN":"-82.9","YG":"29.6","YNS":"-119.7","YRS":"5.4","YAUD":"1.8","YN":"-82.9","WQ":"21.4","MQ":"64.3","YQ":"64.3","WPT":"31.6","MPT":"-128.8","YPT":"-128.8","BU":"MAS","PF":"ALL","WUN":"0","MUN":"-1","YUN":"-1","SWUN":"","SMUN":"","SYUN":"","FMQ":"85.8","FYQ":"2450","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6392","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6392 Dallas North UM","WG":"36.2","WNS":".2","WRS":"28.3","WAUD":"-18.8","WN":"45.9","MG":"26.6","MNS":"-186.7","MRS":"28.3","MAUD":"-18.8","MN":"-150.5","YG":"26.6","YNS":"-186.7","YRS":"28.3","YAUD":"-18.8","YN":"-150.5","WQ":"28.4","MQ":"85.3","YQ":"85.3","WPT":"161.5","MPT":"-176.5","YPT":"-176.5","BU":"MAS","PF":"ALL","WUN":"24","MUN":"19","YUN":"19","SWUN":"","SMUN":"","SYUN":"","FMQ":"113.8","FYQ":"3250","STATUS":"","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"OFF","ASSOCIATE_ID":"","NAME":"","SOC":"6494","RNAME":"","DRILLDOWN_MODE":"OFFMODE","SO":"MAS 6494 Greenville","WG":"9","WNS":"0","WRS":"3","WAUD":"1","WN":"12.9","MG":"9.7","MNS":"-120.9","MRS":"3","MAUD":"1","MN":"-107.2","YG":"9.7","YNS":"-120.9","YRS":"3","YAUD":"1","YN":"-107.2","WQ":"16.6","MQ":"49.9","YQ":"49.9","WPT":"77.5","MPT":"-215","YPT":"-215","BU":"MAS","PF":"ALL","WUN":"2","MUN":"-4","YUN":"-4","SWUN":"","SMUN":"","SYUN":"","FMQ":"66.5","FYQ":"1900","STATUS":"","MH_FLAG":"H","DMTYPE":"" }] } ] } };
            */
            adpcnFactory.officeData = officeData.data;
            return officeData;
         });
        }).then(function(response) { return response.data; });
       },  
       getTeamInfo: function(rcWeek, unqId, dashboardName, sbuCode) {
            return $timeout( function() {
            return $http.get(baseUrl+'adpcn/jsp/cnadpRollcallDMSummaryJson.jsp',{params: {rcWeek, unqId, dashboardName, sbuCode}}).then (function (response) {
       
            var teamInfo = response;
            /*
            {"data":{  "LAND_DATA" : [  {  "TEAMINFO" : [ { "TAB_NAME":"My Team","SORT":"2", "RETRIEVE_FLAG":"", "TOTAL_REC":"","SEVP_FLAG":"Y","MH_FLAG":"MH",
            "DATA":[  {"MARK":"SEVP","ASSOCIATE_ID":"13889141488093_22348","NAME":"CAMPBELL, REGINALD E","SOC":"","RNAME":"MAS VP","DRILLDOWN_MODE":"MGR","SO":"","WG":"56.1","WNS":"12.4","WRS":"42.7","WAUD":"22.8","WN":"134","MG":"92.7","MNS":"-259","MRS":"61","MAUD":"22.8","MN":"-82.5","YG":"92.7","YNS":"-259","YRS":"61","YAUD":"22.8","YN":"-82.5","WQ":"95.4","MQ":"286.1","YQ":"286.1","WPT":"140.5","MPT":"-28.8","YPT":"-28.8","BU":"MAS","PF":"ALL","WUN":"8","MUN":"-1","YUN":"-1","SWUN":"","SMUN":"","SYUN":"","FMQ":"381.5","FYQ":"381.5","STATUS":"MAS VP","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"11191024673905_33782","NAME":"TOMAINO, SUSAN","SOC":"","RNAME":"MAS SE","DRILLDOWN_MODE":"MGR","SO":"","WG":"36.2","WNS":".2","WRS":"28.3","WAUD":"-18.8","WN":"45.9","MG":"26.6","MNS":"-186.7","MRS":"28.3","MAUD":"-18.8","MN":"-150.5","YG":"26.6","YNS":"-186.7","YRS":"28.3","YAUD":"-18.8","YN":"-150.5","WQ":"28.4","MQ":"85.3","YQ":"85.3","WPT":"161.5","MPT":"-176.5","YPT":"-176.5","BU":"MAS","PF":"ALL","WUN":"24","MUN":"19","YUN":"19","SWUN":"","SMUN":"","SYUN":"","FMQ":"113.8","FYQ":"113.8","STATUS":"MAS SE","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"18536166275788_51239","NAME":"WHITE, MELISSA","SOC":"","RNAME":"MAS SE","DRILLDOWN_MODE":"MGR","SO":"","WG":"0","WNS":"0","WRS":"29.9","WAUD":"273.5","WN":"303.3","MG":"56.1","MNS":"-32.5","MRS":"29.9","MAUD":"273.5","MN":"327","YG":"56.1","YNS":"-32.5","YRS":"29.9","YAUD":"273.5","YN":"327","WQ":"20.8","MQ":"62.3","YQ":"62.3","WPT":"1459.6","MPT":"524.5","YPT":"524.5","BU":"MAS","PF":"ALL","WUN":"2","MUN":"-1","YUN":"-1","SWUN":"","SMUN":"","SYUN":"","FMQ":"83.1","FYQ":"83.1","STATUS":"MAS SE","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"13146530958806_20865","NAME":"LAW, DAVID F","SOC":"","RNAME":"MAS Core SE","DRILLDOWN_MODE":"MGR","SO":"","WG":"9","WNS":"0","WRS":"3","WAUD":"1","WN":"12.9","MG":"9.7","MNS":"-120.9","MRS":"3","MAUD":"1","MN":"-107.2","YG":"9.7","YNS":"-120.9","YRS":"3","YAUD":"1","YN":"-107.2","WQ":"16.6","MQ":"49.9","YQ":"49.9","WPT":"77.5","MPT":"-215","YPT":"-215","BU":"MAS","PF":"ALL","WUN":"2","MUN":"-4","YUN":"-4","SWUN":"","SMUN":"","SYUN":"","FMQ":"66.5","FYQ":"66.5","STATUS":"MAS Core SE","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"14325815357733_22290","NAME":"ACEVEDO, JOHANALIZ","SOC":"","RNAME":"MAS SE","DRILLDOWN_MODE":"MGR","SO":"","WG":"30.1","WNS":"-.5","WRS":".8","WAUD":"3.8","WN":"34.2","MG":"75.7","MNS":"-34.1","MRS":"1.3","MAUD":"3.8","MN":"46.6","YG":"75.7","YNS":"-34.1","YRS":"1.3","YAUD":"3.8","YN":"46.6","WQ":"8.5","MQ":"25.6","YQ":"25.6","WPT":"401.1","MPT":"182.2","YPT":"182.2","BU":"MAS","PF":"ALL","WUN":"19","MUN":"25","YUN":"25","SWUN":"","SMUN":"","SYUN":"","FMQ":"34.1","FYQ":"34.1","STATUS":"MAS SE","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"","NAME":"RAMOS, JOEL","SOC":"","RNAME":"MAS SE","DRILLDOWN_MODE":"MGR","SO":"","WG":"-3.8","WNS":".7","WRS":"0","WAUD":"-55.8","WN":"-58.9","MG":"8","MNS":"-52.9","MRS":"0","MAUD":"-55.8","MN":"-100.7","YG":"8","YNS":"-52.9","YRS":"0","YAUD":"-55.8","YN":"-100.7","WQ":"11.7","MQ":"35","YQ":"35","WPT":"-504.1","MPT":"-287.3","YPT":"-287.3","BU":"MAS","PF":"ALL","WUN":"0","MUN":"-8","YUN":"-8","SWUN":"","SMUN":"","SYUN":"","FMQ":"46.7","FYQ":"46.7","STATUS":"MAS SE","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"12707492293007_35189","NAME":"LEWIS, RONALD L","SOC":"","RNAME":"MAS SE","DRILLDOWN_MODE":"MGR","SO":"","WG":"33.1","WNS":"-12.8","WRS":"39.6","WAUD":"-40.9","WN":"18.9","MG":"54.9","MNS":"-121.5","MRS":"39.6","MAUD":"-40.9","MN":"-67.9","YG":"54.9","YNS":"-121.5","YRS":"39.6","YAUD":"-40.9","YN":"-67.9","WQ":"32.8","MQ":"98.4","YQ":"98.4","WPT":"57.7","MPT":"-69","YPT":"-69","BU":"MAS","PF":"ALL","WUN":"12","MUN":"15","YUN":"15","SWUN":"","SMUN":"","SYUN":"","FMQ":"131.3","FYQ":"131.3","STATUS":"MAS SE","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"17512957014427_22190","NAME":"BORIS, CHRISTINE E","SOC":"","RNAME":"MAS SE","DRILLDOWN_MODE":"MGR","SO":"","WG":"16","WNS":"0","WRS":"46.9","WAUD":"-89.5","WN":"-26.5","MG":"24.1","MNS":"-205.3","MRS":"56.9","MAUD":"-89.5","MN":"-213.8","YG":"24.1","YNS":"-205.3","YRS":"56.9","YAUD":"-89.5","YN":"-213.8","WQ":"23.8","MQ":"71.5","YQ":"71.5","WPT":"-111.3","MPT":"-299","YPT":"-299","BU":"MAS","PF":"ALL","WUN":"3","MUN":"-5","YUN":"-5","SWUN":"","SMUN":"","SYUN":"","FMQ":"95.4","FYQ":"95.4","STATUS":"MAS SE","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"16220482424326_23344","NAME":"MASSOUH, GREG","SOC":"","RNAME":"MAS VP","DRILLDOWN_MODE":"MGR","SO":"","WG":"-41.7","WNS":"-1.3","WRS":"32.2","WAUD":"-.2","WN":"-11","MG":"-37.7","MNS":"-227.7","MRS":"35","MAUD":"-.2","MN":"-230.6","YG":"-37.7","YNS":"-227.7","YRS":"35","YAUD":"-.2","YN":"-230.6","WQ":"64.8","MQ":"194.3","YQ":"194.3","WPT":"-17","MPT":"-118.7","YPT":"-118.7","BU":"MAS","PF":"ALL","WUN":"-1","MUN":"-10","YUN":"-10","SWUN":"","SMUN":"","SYUN":"","FMQ":"259","FYQ":"259","STATUS":"MAS VP","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"19543336000453_33170","NAME":"BIEHL, DENISE","SOC":"","RNAME":"MAS VP","DRILLDOWN_MODE":"MGR","SO":"","WG":"215.1","WNS":"-.5","WRS":"25.6","WAUD":"94","WN":"334.2","MG":"292.7","MNS":"-192.1","MRS":"28.9","MAUD":"94","MN":"223.5","YG":"292.7","YNS":"-192.1","YRS":"28.9","YAUD":"94","YN":"223.5","WQ":"98.4","MQ":"295.3","YQ":"295.3","WPT":"339.5","MPT":"75.7","YPT":"75.7","BU":"MAS","PF":"ALL","WUN":"20","MUN":"11","YUN":"11","SWUN":"","SMUN":"","SYUN":"","FMQ":"393.7","FYQ":"393.7","STATUS":"MAS VP","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"15283395823316_22459","NAME":"GARCIA, ANGELA","SOC":"","RNAME":"MAS VP","DRILLDOWN_MODE":"MGR","SO":"","WG":"3.3","WNS":"0","WRS":"24.5","WAUD":"36","WN":"63.8","MG":"13.7","MNS":"-307.7","MRS":"31.1","MAUD":"36","MN":"-226.9","YG":"13.7","YNS":"-307.7","YRS":"31.1","YAUD":"36","YN":"-226.9","WQ":"71.8","MQ":"215.3","YQ":"215.3","WPT":"88.9","MPT":"-105.4","YPT":"-105.4","BU":"MAS","PF":"ALL","WUN":"3","MUN":"-14","YUN":"-14","SWUN":"","SMUN":"","SYUN":"","FMQ":"287","FYQ":"287","STATUS":"MAS VP","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"19924382044175_23217","NAME":"WRIGHT, LINDA E","SOC":"","RNAME":"MAS SE","DRILLDOWN_MODE":"MGR","SO":"","WG":"56.4","WNS":"-5","WRS":"3.9","WAUD":"-4.1","WN":"51.2","MG":"168","MNS":"-51","MRS":"3.9","MAUD":"-4.1","MN":"116.8","YG":"168","YNS":"-51","YRS":"3.9","YAUD":"-4.1","YN":"116.8","WQ":"27.8","MQ":"83.3","YQ":"83.3","WPT":"184.4","MPT":"140.2","YPT":"140.2","BU":"MAS","PF":"ALL","WUN":"3","MUN":"2","YUN":"2","SWUN":"","SMUN":"","SYUN":"","FMQ":"111.1","FYQ":"111.1","STATUS":"MAS SE","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"16772723006554_22737","NAME":"HOLLAND, RONALD A","SOC":"","RNAME":"MAS SE","DRILLDOWN_MODE":"MGR","SO":"","WG":"7.3","WNS":"0","WRS":"3.6","WAUD":"28.8","WN":"39.7","MG":"23.7","MNS":"-25.3","MRS":"3.6","MAUD":"28.8","MN":"30.8","YG":"23.7","YNS":"-25.3","YRS":"3.6","YAUD":"28.8","YN":"30.8","WQ":"19.7","MQ":"59.1","YQ":"59.1","WPT":"201.7","MPT":"52.2","YPT":"52.2","BU":"MAS","PF":"ALL","WUN":"1","MUN":"-2","YUN":"-2","SWUN":"","SMUN":"","SYUN":"","FMQ":"78.7","FYQ":"78.7","STATUS":"MAS SE","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"14127689407132_22742","NAME":"HATHAWAY, LISA A","SOC":"","RNAME":"MAS SE","DRILLDOWN_MODE":"MGR","SO":"","WG":"6.5","WNS":"0","WRS":"47.2","WAUD":"32","WN":"85.7","MG":"182.9","MNS":"-149","MRS":"90.6","MAUD":"32","MN":"156.5","YG":"182.9","YNS":"-149","YRS":"90.6","YAUD":"32","YN":"156.5","WQ":"32.2","MQ":"96.6","YQ":"96.6","WPT":"266.2","MPT":"162","YPT":"162","BU":"MAS","PF":"ALL","WUN":"2","MUN":"-4","YUN":"-4","SWUN":"","SMUN":"","SYUN":"","FMQ":"128.8","FYQ":"128.8","STATUS":"MAS SE","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"12807854206851_22845","NAME":"FRANCO, STEPHANIE","SOC":"","RNAME":"MAS SE","DRILLDOWN_MODE":"MGR","SO":"","WG":"-36","WNS":"-10.6","WRS":"28.5","WAUD":"-27.7","WN":"-45.8","MG":"69.4","MNS":"-96.4","MRS":"28.5","MAUD":"-27.7","MN":"-26.3","YG":"69.4","YNS":"-96.4","YRS":"28.5","YAUD":"-27.7","YN":"-26.3","WQ":"29.2","MQ":"87.7","YQ":"87.7","WPT":"-156.8","MPT":"-30","YPT":"-30","BU":"MAS","PF":"ALL","WUN":"24","MUN":"31","YUN":"31","SWUN":"","SMUN":"","SYUN":"","FMQ":"116.9","FYQ":"116.9","STATUS":"MAS SE","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"","NAME":"WILLIAMS, CANDICE C","SOC":"","RNAME":"MAS SE","DRILLDOWN_MODE":"MGR","SO":"","WG":"12.7","WNS":".1","WRS":"0","WAUD":"0","WN":"12.7","MG":"13.1","MNS":".1","MRS":"0","MAUD":"0","MN":"13.2","YG":"13.1","YNS":".1","YRS":"0","YAUD":"0","YN":"13.2","WQ":"30.4","MQ":"91.1","YQ":"91.1","WPT":"42","MPT":"14.5","YPT":"14.5","BU":"MAS","PF":"ALL","WUN":"2","MUN":"2","YUN":"2","SWUN":"","SMUN":"","SYUN":"","FMQ":"121.5","FYQ":"121.5","STATUS":"MAS SE","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"12530372088602_33928","NAME":"SCHWEIGER, JACLYN M","SOC":"","RNAME":"MAS VP","DRILLDOWN_MODE":"MGR","SO":"","WG":"-64.8","WNS":"-18.7","WRS":"29.3","WAUD":"-163.7","WN":"-217.9","MG":"136.3","MNS":"-398.1","MRS":"29.8","MAUD":"-163.7","MN":"-395.7","YG":"136.3","YNS":"-398.1","YRS":"29.8","YAUD":"-163.7","YN":"-395.7","WQ":"87.5","MQ":"262.5","YQ":"262.5","WPT":"-249","MPT":"-150.8","YPT":"-150.8","BU":"MAS","PF":"ALL","WUN":"53","MUN":"58","YUN":"58","SWUN":"","SMUN":"","SYUN":"","FMQ":"350","FYQ":"350","STATUS":"MAS VP","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"12980416011620_35036","NAME":"ROJAS, KACEY","SOC":"","RNAME":"MAS SE","DRILLDOWN_MODE":"MGR","SO":"","WG":"-.2","WNS":"0","WRS":".2","WAUD":"-.4","WN":"-.4","MG":".7","MNS":"-27.8","MRS":".2","MAUD":"-.4","MN":"-27.3","YG":".7","YNS":"-27.8","YRS":".2","YAUD":"-.4","YN":"-27.3","WQ":"11.1","MQ":"33.4","YQ":"33.4","WPT":"-3.2","MPT":"-81.8","YPT":"-81.8","BU":"MAS","PF":"ALL","WUN":"0","MUN":"-7","YUN":"-7","SWUN":"","SMUN":"","SYUN":"","FMQ":"44.5","FYQ":"44.5","STATUS":"MAS SE","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"","NAME":"KIDD, KARIN","SOC":"","RNAME":"MAS SE","DRILLDOWN_MODE":"MGR","SO":"","WG":"97.9","WNS":"0","WRS":"25.4","WAUD":"100.4","WN":"223.7","MG":"164.2","MNS":"-114.1","MRS":"28.7","MAUD":"100.4","MN":"179.3","YG":"164.2","YNS":"-114.1","YRS":"28.7","YAUD":"100.4","YN":"179.3","WQ":"12.8","MQ":"38.4","YQ":"38.4","WPT":"1747.5","MPT":"466.9","YPT":"466.9","BU":"MAS","PF":"ALL","WUN":"5","MUN":"11","YUN":"11","SWUN":"","SMUN":"","SYUN":"","FMQ":"51.2","FYQ":"51.2","STATUS":"MAS SE","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"12935749992361_49689","NAME":"BURROWS, BRADLEY","SOC":"","RNAME":"MAS SE","DRILLDOWN_MODE":"MGR","SO":"","WG":"-51.5","WNS":"0","WRS":"18.7","WAUD":"13.2","WN":"-19.6","MG":"-91.3","MNS":"-171.3","MRS":"18.7","MAUD":"13.2","MN":"-230.7","YG":"-91.3","YNS":"-171.3","YRS":"18.7","YAUD":"13.2","YN":"-230.7","WQ":"32.4","MQ":"97.1","YQ":"97.1","WPT":"-60.6","MPT":"-237.5","YPT":"-237.5","BU":"MAS","PF":"ALL","WUN":"-1","MUN":"-9","YUN":"-9","SWUN":"","SMUN":"","SYUN":"","FMQ":"129.5","FYQ":"129.5","STATUS":"MAS SE","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"17448971134992_57569","NAME":"MACCAULEY, FRANCIE G","SOC":"","RNAME":"MAS SE","DRILLDOWN_MODE":"MGR","SO":"","WG":"-1.4","WNS":"0","WRS":"8.2","WAUD":"15.3","WN":"22.1","MG":"-30.6","MNS":"-48.2","MRS":"12.6","MAUD":"15.3","MN":"-50.9","YG":"-30.6","YNS":"-48.2","YRS":"12.6","YAUD":"15.3","YN":"-50.9","WQ":"22.3","MQ":"66.9","YQ":"66.9","WPT":"99.1","MPT":"-76","YPT":"-76","BU":"MAS","PF":"ALL","WUN":"-1","MUN":"-9","YUN":"-9","SWUN":"","SMUN":"","SYUN":"","FMQ":"89.3","FYQ":"89.3","STATUS":"MAS SE","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"18961263236034_75132","NAME":"BLATNIK, JOSEPH J","SOC":"","RNAME":"MAS SE","DRILLDOWN_MODE":"MGR","SO":"","WG":"-55.2","WNS":"-8.3","WRS":".1","WAUD":"-83.9","WN":"-147.4","MG":"-16.8","MNS":"-214.8","MRS":".1","MAUD":"-83.9","MN":"-315.4","YG":"-16.8","YNS":"-214.8","YRS":".1","YAUD":"-83.9","YN":"-315.4","WQ":"34.7","MQ":"104","YQ":"104","WPT":"-425.3","MPT":"-303.4","YPT":"-303.4","BU":"MAS","PF":"ALL","WUN":"10","MUN":"10","YUN":"10","SWUN":"","SMUN":"","SYUN":"","FMQ":"138.6","FYQ":"138.6","STATUS":"MAS SE","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"11656972924169_82091","NAME":"RUSSELL, LUKE","SOC":"","RNAME":"MAS VP","DRILLDOWN_MODE":"MGR","SO":"","WG":"38","WNS":"-8.8","WRS":"70.2","WAUD":"58.6","WN":"158.1","MG":"260.7","MNS":"-432.3","MRS":"113.7","MAUD":"58.6","MN":".7","YG":"260.7","YNS":"-432.3","YRS":"113.7","YAUD":"58.6","YN":".7","WQ":"95.4","MQ":"286.1","YQ":"286.1","WPT":"165.7","MPT":".2","YPT":".2","BU":"MAS","PF":"ALL","WUN":"8","MUN":"-17","YUN":"-17","SWUN":"","SMUN":"","SYUN":"","FMQ":"381.5","FYQ":"381.5","STATUS":"MAS VP","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"","NAME":"MCKELVY, CODY K","SOC":"","RNAME":"MAS SE","DRILLDOWN_MODE":"MGR","SO":"","WG":"16.9","WNS":"29.7","WRS":"0","WAUD":"29.3","WN":"75.9","MG":"110.7","MNS":"3.7","MRS":"0","MAUD":"29.3","MN":"143.8","YG":"110.7","YNS":"3.7","YRS":"0","YAUD":"29.3","YN":"143.8","WQ":"26","MQ":"78.1","YQ":"78.1","WPT":"291.7","MPT":"184.1","YPT":"184.1","BU":"MAS","PF":"ALL","WUN":"0","MUN":"13","YUN":"13","SWUN":"","SMUN":"","SYUN":"","FMQ":"104.1","FYQ":"104.1","STATUS":"MAS SE","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"19862214424092_84293","NAME":"FRYDBERG, FELIX","SOC":"","RNAME":"MAS VP","DRILLDOWN_MODE":"MGR","SO":"","WG":"16","WNS":"0","WRS":"76.8","WAUD":"184","WN":"276.8","MG":"80.2","MNS":"-237.7","MRS":"86.7","MAUD":"184","MN":"113.1","YG":"80.2","YNS":"-237.7","YRS":"86.7","YAUD":"184","YN":"113.1","WQ":"68.2","MQ":"204.7","YQ":"204.7","WPT":"405.5","MPT":"55.3","YPT":"55.3","BU":"MAS","PF":"ALL","WUN":"5","MUN":"-6","YUN":"-6","SWUN":"","SMUN":"","SYUN":"","FMQ":"273","FYQ":"273","STATUS":"MAS VP","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"15451376130944_91399","NAME":"ROACH, MAXIMILLIAN","SOC":"","RNAME":"MAS Core SE","DRILLDOWN_MODE":"MGR","SO":"","WG":"15.2","WNS":"-8.8","WRS":"16.5","WAUD":"-3.2","WN":"19.8","MG":"44.1","MNS":"-137.1","MRS":"16.5","MAUD":"-3.2","MN":"-79.7","YG":"44.1","YNS":"-137.1","YRS":"16.5","YAUD":"-3.2","YN":"-79.7","WQ":"25.1","MQ":"75.3","YQ":"75.3","WPT":"78.6","MPT":"-105.7","YPT":"-105.7","BU":"MAS","PF":"ALL","WUN":"3","MUN":"-6","YUN":"-6","SWUN":"","SMUN":"","SYUN":"","FMQ":"100.4","FYQ":"100.4","STATUS":"MAS Core SE","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"19942460053791_96648","NAME":"PINCHOK, JOSHUA","SOC":"","RNAME":"MAS SE","DRILLDOWN_MODE":"MGR","SO":"","WG":"64.7","WNS":"-.5","WRS":"0","WAUD":"-4.2","WN":"60","MG":"73.3","MNS":"-17","MRS":"0","MAUD":"-4.2","MN":"52.1","YG":"73.3","YNS":"-17","YRS":"0","YAUD":"-4.2","YN":"52.1","WQ":"25.4","MQ":"76.1","YQ":"76.1","WPT":"236.3","MPT":"68.4","YPT":"68.4","BU":"MAS","PF":"ALL","WUN":"8","MUN":"9","YUN":"9","SWUN":"","SMUN":"","SYUN":"","FMQ":"101.5","FYQ":"101.5","STATUS":"MAS SE","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"19243474707148_99161","NAME":"JENNINGS, ANTHONY","SOC":"","RNAME":"MAS Core SE","DRILLDOWN_MODE":"MGR","SO":"","WG":"39.7","WNS":"0","WRS":"0","WAUD":"-2.3","WN":"37.4","MG":"41.1","MNS":"-33.2","MRS":"0","MAUD":"-2.3","MN":"5.6","YG":"41.1","YNS":"-33.2","YRS":"0","YAUD":"-2.3","YN":"5.6","WQ":"15.2","MQ":"45.7","YQ":"45.7","WPT":"245.9","MPT":"12.2","YPT":"12.2","BU":"MAS","PF":"ALL","WUN":"5","MUN":"-4","YUN":"-4","SWUN":"","SMUN":"","SYUN":"","FMQ":"60.9","FYQ":"60.9","STATUS":"MAS Core SE","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"","NAME":"DECKER, JAMIE","SOC":"","RNAME":"MAS SE","DRILLDOWN_MODE":"MGR","SO":"","WG":"-.1","WNS":"0","WRS":"18.2","WAUD":"9.3","WN":"27.4","MG":"14.9","MNS":"-107.5","MRS":"36.1","MAUD":"9.3","MN":"-47.2","YG":"14.9","YNS":"-107.5","YRS":"36.1","YAUD":"9.3","YN":"-47.2","WQ":"29.1","MQ":"87.3","YQ":"87.3","WPT":"94.1","MPT":"-54.1","YPT":"-54.1","BU":"MAS","PF":"ALL","WUN":"5","MUN":"-4","YUN":"-4","SWUN":"","SMUN":"","SYUN":"","FMQ":"116.4","FYQ":"116.4","STATUS":"MAS SE","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"","NAME":"RIDENHOUR, ROSS B","SOC":"","RNAME":"MAS SE","DRILLDOWN_MODE":"MGR","SO":"","WG":"1","WNS":"0","WRS":"4","WAUD":"1.8","WN":"6.8","MG":"29.6","MNS":"-119.7","MRS":"5.4","MAUD":"1.8","MN":"-82.9","YG":"29.6","YNS":"-119.7","YRS":"5.4","YAUD":"1.8","YN":"-82.9","WQ":"21.4","MQ":"64.3","YQ":"64.3","WPT":"31.6","MPT":"-128.8","YPT":"-128.8","BU":"MAS","PF":"ALL","WUN":"0","MUN":"-1","YUN":"-1","SWUN":"","SMUN":"","SYUN":"","FMQ":"85.8","FYQ":"85.8","STATUS":"MAS SE","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"","NAME":"BERGIN, KYLE S","SOC":"","RNAME":"MAS SE","DRILLDOWN_MODE":"MGR","SO":"","WG":"7.4","WNS":"12.3","WRS":"20.2","WAUD":"8.6","WN":"48.5","MG":"12.9","MNS":"-90.8","MRS":"20.2","MAUD":"8.6","MN":"-49.1","YG":"12.9","YNS":"-90.8","YRS":"20.2","YAUD":"8.6","YN":"-49.1","WQ":"28","MQ":"84","YQ":"84","WPT":"173.3","MPT":"-58.4","YPT":"-58.4","BU":"MAS","PF":"ALL","WUN":"1","MUN":"-2","YUN":"-2","SWUN":"","SMUN":"","SYUN":"","FMQ":"112","FYQ":"112","STATUS":"MAS SE","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"13106639845067_180012","NAME":"WATERS, KEITH","SOC":"","RNAME":"MAS VP","DRILLDOWN_MODE":"MGR","SO":"","WG":"109.5","WNS":"24.9","WRS":"32.3","WAUD":"13.5","WN":"180.2","MG":"305.4","MNS":"-234","MRS":"32.3","MAUD":"13.5","MN":"117.1","YG":"305.4","YNS":"-234","YRS":"32.3","YAUD":"13.5","YN":"117.1","WQ":"86.6","MQ":"259.9","YQ":"259.9","WPT":"208","MPT":"45.1","YPT":"45.1","BU":"MAS","PF":"ALL","WUN":"28","MUN":"35","YUN":"35","SWUN":"","SMUN":"","SYUN":"","FMQ":"346.5","FYQ":"346.5","STATUS":"MAS VP","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"","NAME":"GARZA, JESSICA G","SOC":"","RNAME":"MAS SE","DRILLDOWN_MODE":"MGR","SO":"","WG":"9.8","WNS":"-1.3","WRS":"13.5","WAUD":"-13.4","WN":"8.6","MG":"53.6","MNS":"-56.4","MRS":"16.3","MAUD":"-13.4","MN":".1","YG":"53.6","YNS":"-56.4","YRS":"16.3","YAUD":"-13.4","YN":".1","WQ":"22.7","MQ":"68.2","YQ":"68.2","WPT":"37.7","MPT":".1","YPT":".1","BU":"MAS","PF":"ALL","WUN":"0","MUN":"-1","YUN":"-1","SWUN":"","SMUN":"","SYUN":"","FMQ":"91","FYQ":"91","STATUS":"MAS SE","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"","NAME":"WOOD, RACHAEL","SOC":"","RNAME":"MAS SE","DRILLDOWN_MODE":"MGR","SO":"","WG":"3","WNS":"0","WRS":"12.3","WAUD":"5.4","WN":"20.7","MG":"13.7","MNS":"-108.1","MRS":"13","MAUD":"5.4","MN":"-76","YG":"13.7","YNS":"-108.1","YRS":"13","YAUD":"5.4","YN":"-76","WQ":"20.6","MQ":"61.7","YQ":"61.7","WPT":"100.7","MPT":"-123.2","YPT":"-123.2","BU":"MAS","PF":"ALL","WUN":"3","MUN":"-4","YUN":"-4","SWUN":"","SMUN":"","SYUN":"","FMQ":"82.3","FYQ":"82.3","STATUS":"MAS SE","MH_FLAG":"H","DMTYPE":"" } , 
            {"MARK":"SEVP","ASSOCIATE_ID":"","NAME":"POWERS, GEOFFREY A","SOC":"","RNAME":"MAS SE","DRILLDOWN_MODE":"MGR","SO":"","WG":"7.5","WNS":"0","WRS":".4","WAUD":"2.7","WN":"10.6","MG":"14.1","MNS":"-10.1","MRS":".5","MAUD":"2.7","MN":"7.3","YG":"14.1","YNS":"-10.1","YRS":".5","YAUD":"2.7","YN":"7.3","WQ":"22.7","MQ":"68.2","YQ":"68.2","WPT":"46.4","MPT":"10.7","YPT":"10.7","BU":"MAS","PF":"ALL","WUN":"1","MUN":"1","YUN":"1","SWUN":"","SMUN":"","SYUN":"","FMQ":"91","FYQ":"91","STATUS":"MAS SE","MH_FLAG":"H","DMTYPE":"" }] } ]}]}}; 
            */   
            adpcnFactory.teamInfo = teamInfo.data;
            return teamInfo;
          });
        }).then(function(response) { return response.data; });
       }, 
       getRCWeek: function() {
            return $timeout( function() { 
            return $http.get(baseUrl+'adpcn/jsp/cnadpRCWeekInfoJson.jsp').then(function(response) {
                var weekinfo = response;
              //var weekinfo = {"data":{ "CURRWEEK": [{ "WEEK_CODE": "201733","Week":"Feb-Week 3-FY17 (33)","MON_CODE":"FEB-FY17" }],"WEEK_INFO": [  
             /*
             { "WEEK_CODE": "201601", "Week":"Jul-Week 1-FY16 (01)","MON_CODE":"JUL-FY16"}  , 
             { "WEEK_CODE": "201602", "Week":"Jul-Week 2-FY16 (02)","MON_CODE":"JUL-FY16"}  , 
             { "WEEK_CODE": "201603", "Week":"Jul-Week 3-FY16 (03)","MON_CODE":"JUL-FY16"}  , 
             { "WEEK_CODE": "201604", "Week":"Jul-Week 4-FY16 (04)","MON_CODE":"JUL-FY16"}  , 
             { "WEEK_CODE": "201605", "Week":"Aug-Week 1-FY16 (05)","MON_CODE":"AUG-FY16"}  , 
             { "WEEK_CODE": "201606", "Week":"Aug-Week 2-FY16 (06)","MON_CODE":"AUG-FY16"}  , 
             { "WEEK_CODE": "201607", "Week":"Aug-Week 3-FY16 (07)","MON_CODE":"AUG-FY16"}  , 
             { "WEEK_CODE": "201608", "Week":"Aug-Week 4-FY16 (08)","MON_CODE":"AUG-FY16"}  , 
             { "WEEK_CODE": "201609", "Week":"Aug-Week 5-FY16 (09)","MON_CODE":"AUG-FY16"}  , 
             { "WEEK_CODE": "201610", "Week":"Sep-Week 1-FY16 (10)","MON_CODE":"SEP-FY16"}  , 
             { "WEEK_CODE": "201611", "Week":"Sep-Week 2-FY16 (11)","MON_CODE":"SEP-FY16"}  , 
             { "WEEK_CODE": "201612", "Week":"Sep-Week 3-FY16 (12)","MON_CODE":"SEP-FY16"}  , 
             { "WEEK_CODE": "201613", "Week":"Sep-Week 4-FY16 (13)","MON_CODE":"SEP-FY16"}  , 
             { "WEEK_CODE": "201614", "Week":"Oct-Week 1-FY16 (14)","MON_CODE":"OCT-FY16"}  , 
             { "WEEK_CODE": "201615", "Week":"Oct-Week 2-FY16 (15)","MON_CODE":"OCT-FY16"}  , 
             { "WEEK_CODE": "201616", "Week":"Oct-Week 3-FY16 (16)","MON_CODE":"OCT-FY16"}  , 
             { "WEEK_CODE": "201617", "Week":"Oct-Week 4-FY16 (17)","MON_CODE":"OCT-FY16"}  , 
             { "WEEK_CODE": "201618", "Week":"Nov-Week 1-FY16 (18)","MON_CODE":"NOV-FY16"}  , 
             { "WEEK_CODE": "201619", "Week":"Nov-Week 2-FY16 (19)","MON_CODE":"NOV-FY16"}  , 
             { "WEEK_CODE": "201620", "Week":"Nov-Week 3-FY16 (20)","MON_CODE":"NOV-FY16"}  , 
             { "WEEK_CODE": "201621", "Week":"Nov-Week 4-FY16 (21)","MON_CODE":"NOV-FY16"}  , 
             { "WEEK_CODE": "201622", "Week":"Nov-Week 5-FY16 (22)","MON_CODE":"NOV-FY16"}  , 
             { "WEEK_CODE": "201623", "Week":"Dec-Week 1-FY16 (23)","MON_CODE":"DEC-FY16"}  , 
             { "WEEK_CODE": "201624", "Week":"Dec-Week 2-FY16 (24)","MON_CODE":"DEC-FY16"}  , 
             { "WEEK_CODE": "201625", "Week":"Dec-Week 3-FY16 (25)","MON_CODE":"DEC-FY16"}  , 
             { "WEEK_CODE": "201626", "Week":"Dec-Week 4-FY16 (26)","MON_CODE":"DEC-FY16"}  , 
             { "WEEK_CODE": "201627", "Week":"Jan-Week 1-FY16 (27)","MON_CODE":"JAN-FY16"}  , 
             { "WEEK_CODE": "201628", "Week":"Jan-Week 2-FY16 (28)","MON_CODE":"JAN-FY16"}  , 
             { "WEEK_CODE": "201629", "Week":"Jan-Week 3-FY16 (29)","MON_CODE":"JAN-FY16"}  , 
             { "WEEK_CODE": "201630", "Week":"Jan-Week 4-FY16 (30)","MON_CODE":"JAN-FY16"}  , 
             { "WEEK_CODE": "201631", "Week":"Feb-Week 1-FY16 (31)","MON_CODE":"FEB-FY16"}  , 
             { "WEEK_CODE": "201632", "Week":"Feb-Week 2-FY16 (32)","MON_CODE":"FEB-FY16"}  , 
             { "WEEK_CODE": "201633", "Week":"Feb-Week 3-FY16 (33)","MON_CODE":"FEB-FY16"}  , 
             { "WEEK_CODE": "201634", "Week":"Feb-Week 4-FY16 (34)","MON_CODE":"FEB-FY16"}  , 
             { "WEEK_CODE": "201635", "Week":"Feb-Week 5-FY16 (35)","MON_CODE":"FEB-FY16"}  , 
             { "WEEK_CODE": "201636", "Week":"Mar-Week 1-FY16 (36)","MON_CODE":"MAR-FY16"}  , 
             { "WEEK_CODE": "201637", "Week":"Mar-Week 2-FY16 (37)","MON_CODE":"MAR-FY16"}  , 
             { "WEEK_CODE": "201638", "Week":"Mar-Week 3-FY16 (38)","MON_CODE":"MAR-FY16"}  , 
             { "WEEK_CODE": "201639", "Week":"Mar-Week 4-FY16 (39)","MON_CODE":"MAR-FY16"}  , 
             { "WEEK_CODE": "201640", "Week":"Apr-Week 1-FY16 (40)","MON_CODE":"APR-FY16"}  , 
             { "WEEK_CODE": "201641", "Week":"Apr-Week 2-FY16 (41)","MON_CODE":"APR-FY16"}  , 
             { "WEEK_CODE": "201642", "Week":"Apr-Week 3-FY16 (42)","MON_CODE":"APR-FY16"}  , 
             { "WEEK_CODE": "201643", "Week":"Apr-Week 4-FY16 (43)","MON_CODE":"APR-FY16"}  , 
             { "WEEK_CODE": "201644", "Week":"May-Week 1-FY16 (44)","MON_CODE":"MAY-FY16"}  , 
             { "WEEK_CODE": "201645", "Week":"May-Week 2-FY16 (45)","MON_CODE":"MAY-FY16"}  , 
             { "WEEK_CODE": "201646", "Week":"May-Week 3-FY16 (46)","MON_CODE":"MAY-FY16"}  , 
             { "WEEK_CODE": "201647", "Week":"May-Week 4-FY16 (47)","MON_CODE":"MAY-FY16"}  , 
             { "WEEK_CODE": "201648", "Week":"May-Week 5-FY16 (48)","MON_CODE":"MAY-FY16"}  , 
             { "WEEK_CODE": "201649", "Week":"Jun-Week 1-FY16 (49)","MON_CODE":"JUN-FY16"}  , 
             { "WEEK_CODE": "201650", "Week":"Jun-Week 2-FY16 (50)","MON_CODE":"JUN-FY16"}  , 
             { "WEEK_CODE": "201651", "Week":"Jun-Week 3-FY16 (51)","MON_CODE":"JUN-FY16"}  , 
             { "WEEK_CODE": "201652", "Week":"Jun-Week 4-FY16 (52)","MON_CODE":"JUN-FY16"}  , 
             */
             /*
             { "WEEK_CODE": "201701", "Week":"Jul-Week 1-FY17 (01)","MON_CODE":"JUL-FY17"}  , 
             { "WEEK_CODE": "201702", "Week":"Jul-Week 2-FY17 (02)","MON_CODE":"JUL-FY17"}  , 
             { "WEEK_CODE": "201703", "Week":"Jul-Week 3-FY17 (03)","MON_CODE":"JUL-FY17"}  , 
             { "WEEK_CODE": "201704", "Week":"Jul-Week 4-FY17 (04)","MON_CODE":"JUL-FY17"}  , 
             { "WEEK_CODE": "201705", "Week":"Aug-Week 1-FY17 (05)","MON_CODE":"AUG-FY17"}  , 
             { "WEEK_CODE": "201706", "Week":"Aug-Week 2-FY17 (06)","MON_CODE":"AUG-FY17"}  , 
             { "WEEK_CODE": "201707", "Week":"Aug-Week 3-FY17 (07)","MON_CODE":"AUG-FY17"}  , 
             { "WEEK_CODE": "201708", "Week":"Aug-Week 4-FY17 (08)","MON_CODE":"AUG-FY17"}  , 
             { "WEEK_CODE": "201709", "Week":"Aug-Week 5-FY17 (09)","MON_CODE":"AUG-FY17"}  , 
             { "WEEK_CODE": "201710", "Week":"Sep-Week 1-FY17 (10)","MON_CODE":"SEP-FY17"}  , 
             { "WEEK_CODE": "201711", "Week":"Sep-Week 2-FY17 (11)","MON_CODE":"SEP-FY17"}  , 
             { "WEEK_CODE": "201712", "Week":"Sep-Week 3-FY17 (12)","MON_CODE":"SEP-FY17"}  , 
             { "WEEK_CODE": "201713", "Week":"Sep-Week 4-FY17 (13)","MON_CODE":"SEP-FY17"}  , 
             { "WEEK_CODE": "201714", "Week":"Oct-Week 1-FY17 (14)","MON_CODE":"OCT-FY17"}  , 
             { "WEEK_CODE": "201715", "Week":"Oct-Week 2-FY17 (15)","MON_CODE":"OCT-FY17"}  , 
             { "WEEK_CODE": "201716", "Week":"Oct-Week 3-FY17 (16)","MON_CODE":"OCT-FY17"}  , 
             { "WEEK_CODE": "201717", "Week":"Oct-Week 4-FY17 (17)","MON_CODE":"OCT-FY17"}  , 
             { "WEEK_CODE": "201718", "Week":"Nov-Week 1-FY17 (18)","MON_CODE":"NOV-FY17"}  , 
             { "WEEK_CODE": "201719", "Week":"Nov-Week 2-FY17 (19)","MON_CODE":"NOV-FY17"}  , 
             { "WEEK_CODE": "201720", "Week":"Nov-Week 3-FY17 (20)","MON_CODE":"NOV-FY17"}  , 
             { "WEEK_CODE": "201721", "Week":"Nov-Week 4-FY17 (21)","MON_CODE":"NOV-FY17"}  , 
             { "WEEK_CODE": "201722", "Week":"Nov-Week 5-FY17 (22)","MON_CODE":"NOV-FY17"}  , 
             { "WEEK_CODE": "201723", "Week":"Dec-Week 1-FY17 (23)","MON_CODE":"DEC-FY17"}  , 
             { "WEEK_CODE": "201724", "Week":"Dec-Week 2-FY17 (24)","MON_CODE":"DEC-FY17"}  , 
             { "WEEK_CODE": "201725", "Week":"Dec-Week 3-FY17 (25)","MON_CODE":"DEC-FY17"}  , 
             { "WEEK_CODE": "201726", "Week":"Dec-Week 4-FY17 (26)","MON_CODE":"DEC-FY17"}  , 
             { "WEEK_CODE": "201727", "Week":"Jan-Week 1-FY17 (27)","MON_CODE":"JAN-FY17"}  , 
             { "WEEK_CODE": "201728", "Week":"Jan-Week 2-FY17 (28)","MON_CODE":"JAN-FY17"}  , 
             { "WEEK_CODE": "201729", "Week":"Jan-Week 3-FY17 (29)","MON_CODE":"JAN-FY17"}  , 
             { "WEEK_CODE": "201730", "Week":"Jan-Week 4-FY17 (30)","MON_CODE":"JAN-FY17"}  , 
             { "WEEK_CODE": "201731", "Week":"Feb-Week 1-FY17 (31)","MON_CODE":"FEB-FY17"}  , 
             { "WEEK_CODE": "201732", "Week":"Feb-Week 2-FY17 (32)","MON_CODE":"FEB-FY17"}  , 
             { "WEEK_CODE": "201733", "Week":"Feb-Week 3-FY17 (33)","MON_CODE":"FEB-FY17"}  , 
             { "WEEK_CODE": "201734", "Week":"Feb-Week 4-FY17 (34)","MON_CODE":"FEB-FY17"}  , 
             { "WEEK_CODE": "201735", "Week":"Feb-Week 5-FY17 (35)","MON_CODE":"FEB-FY17"}  , 
             { "WEEK_CODE": "201736", "Week":"Mar-Week 1-FY17 (36)","MON_CODE":"MAR-FY17"}  , 
             { "WEEK_CODE": "201737", "Week":"Mar-Week 2-FY17 (37)","MON_CODE":"MAR-FY17"}  , 
             { "WEEK_CODE": "201738", "Week":"Mar-Week 3-FY17 (38)","MON_CODE":"MAR-FY17"}  , 
             { "WEEK_CODE": "201739", "Week":"Mar-Week 4-FY17 (39)","MON_CODE":"MAR-FY17"}  , 
             { "WEEK_CODE": "201740", "Week":"Apr-Week 1-FY17 (40)","MON_CODE":"APR-FY17"}  , 
             { "WEEK_CODE": "201741", "Week":"Apr-Week 2-FY17 (41)","MON_CODE":"APR-FY17"}  , 
             { "WEEK_CODE": "201742", "Week":"Apr-Week 3-FY17 (42)","MON_CODE":"APR-FY17"}  , 
             { "WEEK_CODE": "201743", "Week":"Apr-Week 4-FY17 (43)","MON_CODE":"APR-FY17"}  , 
             { "WEEK_CODE": "201744", "Week":"May-Week 1-FY17 (44)","MON_CODE":"MAY-FY17"}  , 
             { "WEEK_CODE": "201745", "Week":"May-Week 2-FY17 (45)","MON_CODE":"MAY-FY17"}  , 
             { "WEEK_CODE": "201746", "Week":"May-Week 3-FY17 (46)","MON_CODE":"MAY-FY17"}  , 
             { "WEEK_CODE": "201747", "Week":"May-Week 4-FY17 (47)","MON_CODE":"MAY-FY17"}  , 
             { "WEEK_CODE": "201748", "Week":"May-Week 5-FY17 (48)","MON_CODE":"MAY-FY17"}  , 
             { "WEEK_CODE": "201749", "Week":"Jun-Week 1-FY17 (49)","MON_CODE":"JUN-FY17"}  , 
             { "WEEK_CODE": "201750", "Week":"Jun-Week 2-FY17 (50)","MON_CODE":"JUN-FY17"}  , 
             { "WEEK_CODE": "201751", "Week":"Jun-Week 3-FY17 (51)","MON_CODE":"JUN-FY17"}  , 
             { "WEEK_CODE": "201752", "Week":"Jun-Week 4-FY17 (52)","MON_CODE":"JUN-FY17"}  ] }
             };
             */

             
              adpcnFactory.rollcallWeeksArray = weekinfo.data["WEEK_INFO"];
              adpcnFactory.currentWeek = weekinfo.data["CURRWEEK"][0];
              adpcnFactory.currentRCWeek = weekinfo.data["CURRWEEK"][0]["WEEK_CODE"];
              adpcnFactory.monthYear = weekinfo.data["CURRWEEK"][0]["MON_CODE"];

             return weekinfo;
          });
         }).then(function(response) { return response.data; });
        }
    };
}]);
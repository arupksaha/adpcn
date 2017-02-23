<!DOCTYPE html>
<html>

<!---include file to get base url of instance-->
  <%@ include file = "../adpcn/jsp/common/cnadpInstanceBaseUrl.jsp" %>
  <!--include file to ge apps context-->
  <%@ include file = "../adpcn/jsp/util/cnadpAppsContext.jsp" %>
  <!-- code to get userId from session -->
  <%
    int userId = 0;   
    String userName = null;
    try
    {
      userId = appCtx.getUserId();
      userName = appCtx.getUserName();
    }
    catch(Exception e)
    {       

    } 
  %>

  <!--include jsp to get employee number from userId -->
  <jsp:include page="../adpcn/jsp/common/cnadpAssociateIdfromUserId.jsp" >  
    <jsp:param name="userId" value="<%=userId%>" />
  </jsp:include>

  <%String empNumber = (String)request.getAttribute("empNum");%>
  <script> var employeeNumber = "<%=empNumber%>" </script>  
  <script> 
    var userId = "<%=userId%>"    ;//these variables can be used anywhere in the app
    var userName = "<%=userName%>";
    console.log('userId =' +userId);
    console.log('userName =' +userName);
  </script> 
  <script> 
  var baseUrl = "<%=baseUrl%>" ;
  console.log('baseUrl =' +baseUrl);
  </script>
<%@ page import="java.sql.*" %>
  <%@ page import="java.util.Date" %>
  <%@ page import="java.io.*" %>
  <%@ page import="oracle.apps.fnd.common.WebRequestUtil"%>
  <%@ page import="javax.servlet.http.HttpServletRequest"%>
  <%@ page import="javax.servlet.http.HttpServletResponse"%>
  <%@ page import="oracle.apps.fnd.common.WebAppsContext"%>
  <%@ page import="oracle.apps.jtf.base.session.FWSession"%>
  <%@ page import="oracle.apps.jtf.base.session.SessionManager"%>
  <%@ page import="oracle.apps.jtf.base.session.FWAppsContext"%>
  <%@ page import="oracle.apps.jtf.base.resources.FrameworkException" %>
  <%@ page import='oracle.apps.fnd.sso.Utils'%>
  <%@ page import="java.sql.SQLException"%>
  <%@ page import="java.sql.PreparedStatement"%>
  <%@ page import="java.sql.ResultSet"%>
  <%response.setHeader("Cache-Control", "no-cache");%>
  <%response.setHeader("pragma", "no-cache");%>
  <%response.setDateHeader("Expires", -1);%> 

  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1, minimum-scale=1,maximum-scale=1, user-scalable=no, width=device-width">
    <title>ADP Sales Performance Management - Dashboard</title>

    <link rel="manifest" href="manifest.json">

    <!-- un-comment this code to enable service worker
    <script>
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
          .then(() => console.log('service worker installed'))
          .catch(err => console.log('Error', err));
      }
    </script>-->
    <link href="css/style.css" rel="stylesheet">
    <link href="lib/ionic/css/ionic.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <link href="css/vdlstyle.css" rel="stylesheet">
    <link href="css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/table-grid.css">
    <link href="css/panorama.css" rel="stylesheet"> 
    <link href="css/base.css" rel="stylesheet">
    <link rel="stylesheet" href="css/tabs.css">
    <link rel="stylesheet" href="css/angular-ui-tab-scroll.css">
    <link rel="stylesheet" href="css/ng-table.min.css">
    <!-- IF using Sass (run gulp sass first), then uncomment below and remove the CSS includes above
    <link href="css/ionic.app.css" rel="stylesheet">
    -->
   <!--script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script-->
   <script src="lib/jquery.min.js"></script>
    <!-- ionic/angularjs js -->
    <script src="lib/ionic/js/ionic.bundle.js"></script>
    <script src="lib/ionic/js/ionic.cloud.min.js"></script>
    <script src="lib/angular-animate.min.js"></script>
    <script src="lib/ui-bootstrap-tpls-2.4.0.js"></script>
    <script src="lib/ng-table.min.js"></script>
    <!-- Donut Chart -->
    <link rel="stylesheet" href="css/donut-chart.css">
    <script src="lib/highcharts.js"></script>
    <script src="lib/highcharts-more.js"></script>
    <!--script src="lib/highcharts-ng.min.js"></script-->
    <script src="lib/highcharts-ng.min.js"></script>
    <script src="lib/ng-cordova.js"></script>
    <!-- cordova script (this will be a 404 during development) -->
    <!--script src="cordova.js"></script-->

    <!-- your app's js -->
    <script src="js/adpcnFactory.js"></script>
    <script src="js/app.js"></script>

    <script src="js/controllers.js"></script>
  </head>

  <body ng-app="starter" class="bodySample">
    <!-- adp-dashboard -->
    <div class="adp-dashboard">
    
    <ion-nav-view></ion-nav-view>

  </div>
  </body>
</html>

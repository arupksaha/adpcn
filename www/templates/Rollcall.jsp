<ion-view view-title="Rollcall">
  <ion-content>
  <ion-scroll style="max-height:100vh;">
  <div class="list card">

  <div class="item item-avatar">
    <img ng-src="../adpcn/jsp/util/cnadpGetUserPhoto.jsp?userId={{userId}}">
    <h2 style="text-align:left;">{{associateName}}</h2>
    <p style="text-align:left;">{{title}}</p>
    
    <div class="list" style="float: right;" ng-controller="buttonDropdownController">
<p style="text-align:right;">Week
      <i class="fa fa-calendar" style="color:#1a8099"></i>
      &nbsp;RC Week - <strong>{{selectedItem}} | </strong> Month : <strong> {{monthandYear}} </strong>
  </p>
  <label class="item item-input item-select">
    <div class="input-label">
      
    </div>
    <select>
      <option ng-repeat="rollcallWeek in rollcallWeeks">
        <a ng-click="setRCWeek(rollcallWeek)">{{ rollcallWeek.Week }}</a>
      </option>
    </select>
  </label>

</div>
  </div>

  

  <div class="title"><h2> Sales Summary<h2></div>
  <div class="item-body adp-box bg-white" >
   <div class="swiper-container"> 
    <ion-slides  options="options" slider="slider" style="height: 40vh">
    <ion-slide-page>

    <div class="list" ng-controller="donutChartCtrl">

  <div class="item row">
   <div class="col-20 WTD"> 
    <highchart id="donutChartWTD" config="chartConfigWTD" class="img-responsive">  </highchart>
                 
  
                 
 </div>
 <div class="col-13 col-center">
    
                      <span style="text-align:center; color: #888888;">SALES 
                        <span style="text-align:center; color: black;">{{WN}}
                        </span>
                      </span> 
                      <br/>
                      <span style="text-align:center; color: #888888;">QUOTA 
                        <span style="text-align:center; color: black;">{{WQ}}
                        </span>
                      </span> 
              
 </div>
  <div class="col-20 MTD">
    <highchart id="donutChartMTD" config="chartConfigMTD" class="img-responsive">  </highchart>
                   
  
                   
 </div>
 <div class="col-13 col-center">
   
        
                      <span style="text-align:center; color: #888888;">SALES 
                        <span style="text-align:center; color: black;">{{MN}}
                        </span>
                      </span> 
                      <br/>
                      <span style="text-align:center; color: #888888;">QUOTA 
                        <span style="text-align:center; color: black;">{{MQ}}
                        </span>
                      </span> 
     
                   
 </div>
  <div class="col-20 YTD"> 
    <highchart id="donutChartYTD" config="chartConfigYTD" class="img-responsive">  </highchart>   
                
 </div>
<div class="col-13 col-center">
   
        
                      <span style="text-align:center; color: #888888;">SALES 
                        <span style="text-align:center; color: black;">{{YN}}
                        </span>
                      </span> 
                      <br/>
                      <span style="text-align:center; color: #888888;">QUOTA 
                        <span style="text-align:center; color: black;">{{YQ}}
                        </span>
                      </span> 
     
                   
 </div>
</div>

<!--div class="row">
<div class="col-33 WTD" style="height: 5vh"> 
                   <div id="WTDBottomLabel" style="text-align:center; width:100%"> 
                      <span style="text-align:center; color: #888888;">SALES 
                        <span style="text-align:center; color: black;">50K
                        </span>
                      </span> 
                      <br/>
                      <span style="text-align:center; color: #888888;">QUOTA 
                        <span style="text-align:center; color: black;">100K
                        </span>
                      </span> 
                    </div>
</div>
<div class="col-33 MTD" style="height: 5vh"> 

                    <div id="MTDBottomLabel" style="text-align:center; width:100%"> 
                      <span style="text-align:center; color: #888888;">SALES 
                        <span style="text-align:center; color: black;">50K
                        </span>
                      </span> 
                      <br/>
                      <span style="text-align:center; color: #888888;">QUOTA 
                        <span style="text-align:center; color: black;">100K
                        </span>
                      </span> 
                    </div>
</div>  
<div class="col-33 YTD" style="height: 5vh"> 

                    <div id="YTDBottomLabel" style="text-align:center; width:100%"> 
                      <span style="text-align:center; color: #888888;">SALES 
                        <span style="text-align:center; color: black;">50K
                        </span>
                      </span> 
                      <br/>
                      <span style="text-align:center; color: #888888;">QUOTA 
                        <span style="text-align:center; color: black;">100K
                        </span>
                      </span> 
                    </div>
</div>

</div-->
</div>

</ion-slide-page>
   <ion-slide-page>
      <div class="list" ng-controller="lineChartCtrl">

  <div class="item  row responsive-lg">
   <div class="col">
    <div class="graph-toggle-tabs horizontal">
                    <uib-tabset class="tabs-container">
                      <uib-tab heading="Sales" ng-click="changeGraph('SALES')">                       
                      </uib-tab>
                      <uib-tab heading="YTD%" ng-click="changeGraph('YTD')">
                      </uib-tab>
                    </uib-tabset>
                    <a>
                      <highchart id="SalesContainer" config="chartConfig" class="img-responsive" ng-click="showSalesGraphData()"></highchart>
                    </a>
                  </div>  
  </div>
</div>
</div>
    </ion-slide-page>
  </ion-slides>


 <div class="adp-tabs horizontal">
  <uib-tabset class="tabs-container">
							<uib-tab  ng-repeat="tab in tabs" heading={{tab.TAB_NAME}}>
							
							</uib-tab> 
  </uib-tabset>
<!--/div-->
  


<div class="list card">


  <label class="item item-input-inset">
    
    <select>
      <option selected>WTD</option>
      <option>MTD</option>
      <option>YTD</option>
    </select>
  </label>
<!--/div-->

<!--/div-->

    <!--div class="list"-->
        
        <div class="list" ng-table="tableParams" template-pagination="custom-pager.html" show-filter="false" id="MgrPageTable" ng-repeat="table in tables">
                      <div class="item item-divider row">
                        <div class="col" ng-repeat="column in colNames" style="border-bottom:1px solid #000000;text-transform:uppercase;color:#6a6a6a;font-weight:400;padding:10px;text-align:left">{{column}}</div>
                      </div>
                      <div class="item item-divider row" ng-show="table.rows!='undefined' && table.rows!='null' && table.rows.length!=0" ng-repeat="user in table.rows" data-ng-click="selectRow($event)" data-ng-class="{selected: selectedRows.indexOf(user) > -1}">
                        <div class="col" ng-repeat="column in table.cols" ng-click="addNavigationPathToArray(user.ASSOCIATE_ID, user.DRILLDOWN_MODE, user.GETTYPE, column, user.BU)" data-ng-class="{'cnadp-drilldown': isDrillDownExists(column,user.ASSOCIATE_ID) , 'cnadp-no-drilldown': !isDrillDownExists(column,user.ASSOCIATE_ID)}">
                        {{user[column]}}</div>
                      </div>
                      <div class="item item-divider row">        
                        <div class="col" ng-show="table.rows =='undefined' || table.rows=='null' || table.rows.length==0" style="text-align:center">
                          No records found. 
                        </div>
                      </div>
                    </div>      
    
    <!--div class="item item-divider row">
    
      <div class="col">
        <button class="button button-light" ng-click="sortBy('title')">Name</button>
        <span class="sortorder" ng-show="propertyName === 'title'" ng-class="{reverse: reverse}"></span>
      </div>
      <div class="col">
        <button class="button button-light" ng-click="sortBy('sales')">Net Sales</button>
        <span class="sortorder" ng-show="propertyName === 'sales'" ng-class="{reverse: reverse}"></span>
      </div>
      <div class="col">
        <button class="button button-light" ng-click="sortBy('quota')">Quota</button>
        <span class="sortorder" ng-show="propertyName === 'quota'" ng-class="{reverse: reverse}"></span>
      </div>
     <div class="col">
        <button class="button button-light" ng-click="sortBy('achieved')">%Achieved</button>
        <span class="sortorder" ng-show="propertyName === 'achieved'" ng-class="{reverse: reverse}"></span>
      </div> 
  
</div-->

  <!--div class="item item-divider row" ng-repeat="playlist in playlists | orderBy:propertyName:reverse">
    
      
      	<a class="col" href="#/app/playlists/{{playlist.id}}">{{playlist.title}}</a>

      <a class="col" href="#">{{playlist.sales}}</a>
      <a class="col" href="#">{{playlist.quota}}</a>
      <a class="col" href="#">{{playlist.achieved}}</a>

  </div-->

</div>

</div>

</div>
</ion-scroll>
  </ion-content>
</ion-view>

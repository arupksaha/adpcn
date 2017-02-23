<?php defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class spmrestcall extends REST_Controller
{

	public $variable = array();

	function __construct()
	{
		parent::__construct();
		$this->variable['smp_url'] =$this->config->item('spm_webservice_url');
		$this->variable['cache_dir'] =$this->config->item('spm_cache_dir');
 	}

 	/*
	function user_get()
    {
		 $headers = $this->input->request_headers(); 
	     $user  = $headers['Sm-User'];
		
		  echo $user;

		  $this->response(array('error' => 'midtier') , 404);
		
 	    log_message('info',$user.'Inside rcDvp_get');	
		//$CONFIDENCE = get_var('CONFIDENCEVALUE',$user); 

		//echo $CONFIDENCE;

		
   } 
   */




   public function rcDvp_get($UNQID,$rcw,$gtype,$mhflag,$startval,$repstatus,$dmtype)
   {
  		 try {

			  $headers = $this->input->request_headers(); 
			  $smusrid  = $headers['Sm-User'];
			  $intusrid = get_var('CONFIDENCEVALUE',$smusrid); 
	

			  $QID = $UNQID."_".$intusrid;	
			  //log_message('debug',$userid.'Inside rcDvp_get');	
			  $this->load->model('rollcalldashboardam');
			  $webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_rc_db_pkg/?wsdl';
			  

			  $rollcallDvpSumVO = $this->rollcalldashboardam->getRollcallDvpSumVO($webservice_url,$QID,$rcw,$gtype,$mhflag,$startval,$repstatus,$dmtype);
			  $data =   json_decode($rollcallDvpSumVO); 
			  $this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
			  //$this->response(array('error' => var_dump($e)), 404);	

			  $this->response(array('error' => 'midtier') , 404);
		  }		
		 
    }

//Jamin testing memcached 02SEP2015

public function memData_get($aid){
		  $this->load->library('memcached_library');
		  $results = $this->memcached_library->get($aid);
		  $this->response($results , 200);	
		  /*echo 'Data from cache server: <pre>'; 
		  print_r($results);
		  echo '</pre>';
		  */
		 
		   
    }
//Jamin testing memcached 02SEP2015

	public function userAccess_get()
	{		
  		 try {
			
			  $this->load->model('useraccessam');
			  $webservice_url = $this->variable['smp_url'].'adp_oc_mobile_apps_common_pkg/?wsdl';
			 
			  $userAccessVO = $this->useraccessam->getUserAccessVO($webservice_url);
			  $data =   json_decode($userAccessVO);			
	
			  if (isset($data))	 	
			  {
				  if( strpos($userAccessVO,'Unsupported Version') !== false)
					{
		            $this->response(array('error' => 'Your app requires an update.  Please download the latest version of Sales Beacon from the ADP App Store.') , 406);
					}
				else
				  {
				  $this->response($data , 200);
				  }
			  }
			  else
			  {
			  $this->response(array('error' => 'Couldn\'t find any data for User Access!'), 404);
			  }
		  }
		  catch (Exception $e)
		  {
			  //$this->response(array('error' => var_dump($e)), 404);
			  //log_message('error',	'userAccess_get() '.var_dump($e));
			  $this->response(array('error' => 'midtier') , 404);
		  }
	}


	public function version_get()
	{		
  		 try {
			
			  $this->load->model('useraccessam');
			  $webservice_url = $this->variable['smp_url'].'adp_oc_mobile_apps_common_pkg/?wsdl';
			  log_message('info', 'init '.$webservice_url);
			  $versionVO = $this->useraccessam->getVersionVO($webservice_url);
			  $data =   json_decode($versionVO);
			  log_message('info', 'after '.$versionVO);
			 // $this->response($data , 200);							
			
	
			  if (isset($data))	 	
			  {
				  if( strpos($versionVO,'Unsupported Version') !== false)
					{
		          //  $this->response(array('error' => 'Your app requires an update.  Please download the latest version of Sales Beacon from the ADP App Store.') , 406);
				$this->response(array('SUPPORTED_VERSION' => 'N'), 406);
					}
				else
				  {
				 // $this->response($data , 200);
				$this->response(array('SUPPORTED_VERSION' => 'Y'), 200);
				  }
			  }
			  else
			  {
			 // $this->response(array('error' => 'Couldn\'t find any data for User Access!'), 404);
				$this->response(array('SUPPORTED_VERSION' => 'N'), 404);
			  }
		  }
		  catch (Exception $e)
		  {
			  //$this->response(array('error' => var_dump($e)), 404);
			  //log_message('error',	'userAccess_get() '.var_dump($e));
			  $this->response(array('error' => 'midtier') , 404);
		  }
	}


    public function rcDm_get($unq_id,$rcw,$sbu,$pf,$mhflag) 
    {

  		 try 
         {
	        $headers = $this->input->request_headers(); 
			$userid  = $headers['Sm-User'];
			$intusrid = get_var('CONFIDENCEVALUE',$userid); 
		 
			$QID = $unq_id."_".$intusrid;
			$this->load->model('rollcall_dm_am');
			$webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_rc_db_pkg/?wsdl';
			$rollcallDmSumVO = $this->rollcall_dm_am->getRollcallDmSumVO($webservice_url,$QID,$rcw,$sbu,$pf,$mhflag);
			$data =   json_decode($rollcallDmSumVO);
			$this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
			    //$this->response(array('error' => var_dump($e)), 404);	
                $this->response(array('error' => 'midtier') , 404);
		  }		
     }


  public function prodDetail_get($p_source,$p_mode,$p_trx_type,$p_rc_week,$p_aid,$p_off_num,$p_family,$p_column_type,$p_detail_level,$p_cust_num,$p_start_val) 
         {
      		 try 
             {
    				$headers = $this->input->request_headers(); 
    				$userid  = $headers['Sm-User'];
    				$intusrid = get_var('CONFIDENCEVALUE',$userid); 

    				$this->load->model('productdashboard');
    				$webservice_url = $this->variable['smp_url'].'cnadp_prd_recap_rpt_pub/?wsdl';
    				
    				$QID = $p_aid."_".$intusrid;

    				$productDetailVO = $this->productdashboard->getProductDetailVO($webservice_url,$p_source,$p_mode,$p_trx_type,$p_rc_week,$QID,$p_off_num,$p_family,$p_column_type,$p_detail_level,$p_cust_num,$p_start_val);
				$data =   json_decode($productDetailVO);
    				$this->response($data , 200);
    		  }	
    		  catch (Exception $e)
    		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
    		  }		
        }

  public function prodRCAdmin_get($p_family,$p_unqid,$p_rc_week,$p_get_type,$p_mhflag,$p_start_val,$p_status,$p_type) 
         {
      		 try 
             {
    				$headers = $this->input->request_headers(); 
    				$userid  = $headers['Sm-User'];
    				$intusrid = get_var('CONFIDENCEVALUE',$userid); 

    				$this->load->model('productdashboard');
    				$webservice_url = $this->variable['smp_url'].'cnadp_prd_recap_rpt_pub/?wsdl';
    				
    				$QID = $p_unqid."_".$intusrid;
    				$productDetailVO = $this->productdashboard->getProductRCAdminVO($webservice_url,$p_family,$QID,$p_rc_week,$p_get_type,$p_mhflag,$p_start_val,$p_status,$p_type);
    				$data =   json_decode($productDetailVO);
    				$this->response($data , 200);
    		  }	
    		  catch (Exception $e)
    		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
    		  }		
        }




  public function productMgr_get($p_associate_id,$p_pf,$p_sbu,$rcweek,$p_first) 
    {

  		 try 
         {
	        $headers = $this->input->request_headers(); 
			$userid  = $headers['Sm-User'];
			$intusrid = get_var('CONFIDENCEVALUE',$userid); 
		 
			$this->load->model('productdashboard');
			$webservice_url = $this->variable['smp_url'].'cnadp_prd_recap_rpt_pub/?wsdl';

			$QID = $p_associate_id."_".$intusrid;


			if('MGR' === $p_sbu){
				$rcMgrProductVO = $this->productdashboard->getMgrProductDataVO($webservice_url,$QID,$p_pf,$rcweek,$p_first);
				echo $rcMgrProductVO;
			}
			else {
				$rcRepProductVO = $this->productdashboard->getRepProductDataVO($webservice_url,$QID,$p_pf,$rcweek,$p_first);
				echo $rcRepProductVO;
			}

			
			//$data = json_decode($rcMgrProductVO);
			//$this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
			    $this->response(array('error' => var_dump($e)), 404);	
                //$this->response(array('error' => 'midtier') , 404);
		  }		
     }


public function productData_get($p_associate_id,$p_sbu,$p_pf,$p_type,$rcweek,$p_first,$mh_flag) 
    {

  		 try 
         {
	        $headers = $this->input->request_headers(); 
			$userid  = $headers['Sm-User'];
			$intusrid = get_var('CONFIDENCEVALUE',$userid);

			//$ret = " "; 
		 
			$this->load->model('productdashboard');
			$webservice_url = $this->variable['smp_url'].'cnadp_prd_recap_rpt_pub/?wsdl';

			$QID = $p_associate_id."_".$intusrid;
			$rcProductVO = $this->productdashboard->getProductDataVO($webservice_url,$QID,$p_sbu,$p_pf,$p_type,$rcweek,$p_first,$mh_flag);
			$outputValue = $rcProductVO;
			//echo $rcProductVO;

			$data = json_decode($outputValue);
			$this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
			    //$this->response(array('error' => var_dump($e)), 404);	
                $this->response(array('error' => 'midtier') , 404);
		  }		
     }


 public function rcForecast_get($unq_id,$rep_type,$role_type,$rc_period,$rcweek) 
    {

  		 try 
         {
	        $headers = $this->input->request_headers(); 
			$userid  = $headers['Sm-User'];
			$intusrid = get_var('CONFIDENCEVALUE',$userid); 
		 
			$this->load->model('forecast_data');
			$webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_ftr_db_pkg/?wsdl';

			$QID = $unq_id."_".$intusrid;
			$rcForecastVO = $this->forecast_data->getForecastDataVO($webservice_url,$QID,$rep_type,$role_type,$rc_period,$rcweek);
			$data =   json_decode($rcForecastVO);
			$this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
			    //$this->response(array('error' => var_dump($e)), 404);	
                $this->response(array('error' => 'midtier') , 404);
		  }		
     }


 public function rcMgrForecast_get($rc_period,$unq_id) 
    {

  		 try 
         {
	        $headers = $this->input->request_headers(); 
			$userid  = $headers['Sm-User'];
			$intusrid = get_var('CONFIDENCEVALUE',$userid); 
		 
			$this->load->model('forecast_data');
			$webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_ftr_db_pkg/?wsdl';

			$QID = $unq_id."_".$intusrid;
			$rcForecastVO = $this->forecast_data->getMgrForecastDataVO($webservice_url,$rc_period,$QID);
			$data =   json_decode($rcForecastVO);
			$this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
			    //$this->response(array('error' => var_dump($e)), 404);	
                $this->response(array('error' => 'midtier') , 404);
		  }		
     }



 public function rcForecastMask_get($unq_id,$string) 
    {

  		 try 
         {
	        $headers = $this->input->request_headers(); 
			$userid  = $headers['Sm-User'];
			$intusrid = get_var('CONFIDENCEVALUE',$userid); 
		 
			$this->load->model('forecast_data');
			$webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_ftr_db_pkg/?wsdl';

			$QID = $unq_id."_".$intusrid;
			$rcForecastMaskInputVO = $this->forecast_data->getForecastInputMaskVO($webservice_url,$QID,$string);
			$data =   json_decode($rcForecastMaskInputVO);
			$this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
			    //$this->response(array('error' => var_dump($e)), 404);	
                $this->response(array('error' => 'midtier') , 404);
		  }		
     }


 public function rcSplitDetails_get($p_inst_id,$p_rcweek) 
    {

  		 try 
         {
	        $headers = $this->input->request_headers(); 
			$userid  = $headers['Sm-User'];
			$intusrid = get_var('CONFIDENCEVALUE',$userid); 
		 
			$this->load->model('rollcall_dm_am');
			$webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_rc_db_pkg/?wsdl';
			$rollcallSplitDeatilsVO = $this->rollcall_dm_am->getRollcallSplitDetailsVO($webservice_url,$p_inst_id,$p_rcweek);
			$data =   json_decode($rollcallSplitDeatilsVO);
			$this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
			    //$this->response(array('error' => var_dump($e)), 404);	
                $this->response(array('error' => 'midtier') , 404);
		  }		
     }



	 public function rcDmd_get($unq_id,$rcw,$sbu,$pf,$mhflag) 
     {
         try 
         {
			$headers = $this->input->request_headers(); 
			$userid  = $headers['Sm-User'];
			$intusrid = get_var('CONFIDENCEVALUE',$userid); 
		 
			$QID = $unq_id."_".$intusrid;
			$this->load->model('rollcall_dm_am');
			$webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_rc_db_pkg/?wsdl';
			$rollcallDmdSumVO = $this->rollcall_dm_am->getRollcallDmdSumVO($webservice_url,$QID,$rcw,$sbu,$pf,$mhflag);
			$data =   json_decode($rollcallDmdSumVO);
			$this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
        }
		/**
		 * Manager Rollcall View
		 *
		 * @name    rcMgr()
		 * @param   string $unq_id encoded value of user id 
		 * @param   string $rcw encoded value of Rocall Week
		 * @return  void
		 */
		 public function rcMgr_get($unq_id,$rcw,$pf,$gtype,$startval,$status,$mhflag,$ptype) 
         {
            try
            {
    			$CI =& get_instance();
    			$headers = $this->input->request_headers(); 
    			$userid  = $headers['Sm-User'];
    			$intusrid = get_var('CONFIDENCEVALUE',$userid); 

    			$smsession  = $headers['Sm-Serversessionspec'];
    			
    			if (isset($smsession))
    			{	
    			$this->load->model('rollcalldashboardmgram');
    			$webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_rc_db_pkg/?wsdl';

    			$QID = $unq_id."_".$intusrid;
    			$rollcallMgrSumVO = $this->rollcalldashboardmgram->getRollcallMgrSumVO($webservice_url,$QID,$rcw,$pf,$gtype,$startval,$status,$mhflag,$ptype);
    		 
    			$data =   json_decode($rollcallMgrSumVO);
    			$this->response($data , 200);
			}
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
		}

        public function rcMgrd_get($unq_id,$rcw,$pf,$gtype,$startval,$status,$mhflag,$ptype) 
        {
  		 try {
				$CI =& get_instance();
				$headers = $this->input->request_headers(); 
				$userid  = $headers['Sm-User'];
				$intusrid = get_var('CONFIDENCEVALUE',$userid); 

				$smsession  = $headers['Sm-Serversessionspec'];
				
				if (isset($smsession))
				{	
				$this->load->model('rollcalldashboardmgram');
				$webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_rc_db_pkg/?wsdl';

				$QID = $unq_id."_".$intusrid;
				$rollcallMgrdSumVO = $this->rollcalldashboardmgram->getRollcallMgrdSumVO($webservice_url,$QID,$rcw,$pf,$gtype,$startval,$status,$mhflag,$ptype);
			 
				$data =   json_decode($rollcallMgrdSumVO);
				$this->response($data , 200);
				}
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
        }

	   /**
		 * Rollcall Detail View
		 *
		 * @name    rcDetail()
		 * @return  void
		 */
         public function rcDetail_get($p_mode,$p_trx_type,$p_rc_week,$p_aid,$p_off_num,$p_family,$p_column_type,$p_detail_level,$p_cust_num,$p_start_val) 
         {
      		 try 
             {
    				$headers = $this->input->request_headers(); 
    				$userid  = $headers['Sm-User'];
    				$intusrid = get_var('CONFIDENCEVALUE',$userid); 

    				$this->load->model('rollcall_detail_am');
    				$webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_rc_db_pkg/?wsdl';
    				
    				$QID = $p_aid."_".$intusrid;
    				$rollcallDetailVO = $this->rollcall_detail_am->getRollcallDetailVO($webservice_url,$p_mode,$p_trx_type,$p_rc_week,$QID,$p_off_num,$p_family,$p_column_type,$p_detail_level,$p_cust_num,$p_start_val);
    				$data =   json_decode($rollcallDetailVO);
    				$this->response($data , 200);
    		  }	
    		  catch (Exception $e)
    		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
    		  }		
        }

/**
		 * YTD Earnings Estimator View
		 *
		 * @name    ytd()
		 * @return  void
		 */

  public function ytd_mob_graph_get($unq_id,$period_id) 
     {
  		 try {

				$headers = $this->input->request_headers(); 
				$userid  = $headers['Sm-User'];
				$intusrid = get_var('CONFIDENCEVALUE',$userid); 

				$smsession  = $headers['Sm-Serversessionspec'];
				
				if (isset($smsession))
				{
					$this->load->model('earnings_estimator_am');
					$webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_ee_pkg/?wsdl';
					$QID = $unq_id."_".$intusrid;
					$ytdEEVO = $this->earnings_estimator_am->getRollcallEEVO($webservice_url,$QID,$period_id);
					$data =   json_decode($ytdEEVO);
					  if (isset($data))	 	
					  {
					  $this->response($data , 200);
					  }
					  else
					  {
					  $this->response(array('error' => 'Couldn\'t find any data for YTD EE!'), 404);
					  }
				}
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
	 }


/**
		 * YTD Earnings Estimator Calc
		 *
		 * @name    ytd()
		 * @return  void
		 */

  public function eecalc_get($unq_id,$period_id,$p1,$p2,$p3,$p4,$p5,$p6,$p7,$p8,$p9,$p10,$p11,$p12) 
     {
  		 try {

				$headers = $this->input->request_headers(); 
				$userid  = $headers['Sm-User'];
				$intusrid = get_var('CONFIDENCEVALUE',$userid); 

				$smsession  = $headers['Sm-Serversessionspec'];
				
				if (isset($smsession))
				{
					$this->load->model('earnings_estimator_am');
					$webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_ee_pkg/?wsdl';
					$QID = $unq_id."_".$intusrid;
					$ytdEEVO = $this->earnings_estimator_am->getRollcallEECalcVO($webservice_url,$QID,$period_id,$p1,$p2,$p3,$p4,$p5,$p6,$p7,$p8,$p9,$p10,$p11,$p12);
				 	$data =   json_decode($ytdEEVO);
					  if (isset($data))	 	
					  {
					  $this->response($data , 200);
					  }
					  else
					  {
					  $this->response(array('error' => 'Couldn\'t find any data for YTD EE Calc!'), 404);
					  }
				}
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
	 }




	/**
		 * YTD Report View
		 *
		 * @name    ytd()
		 * @return  void
		 */
     public function ytd_get($unq_id,$period_id) 
     {
  		 try {

				$headers = $this->input->request_headers(); 
				$userid  = $headers['Sm-User'];
				$intusrid = get_var('CONFIDENCEVALUE',$userid); 

				$smsession  = $headers['Sm-Serversessionspec'];
				
				if (isset($smsession))
				{
					$this->load->model('ytdam');
					$webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_ytd_rep_pkg/?wsdl';
					$QID = $unq_id."_".$intusrid;
					$ytdVO = $this->ytdam->getYtdVO($webservice_url,$QID,$period_id);
				 
					$data =   json_decode($ytdVO);
					  if (isset($data))	 	
					  {
					  $this->response($data , 200);
					  }
					  else
					  {
					  $this->response(array('error' => 'Couldn\'t find any data for YTD!'), 404);
					  }
				}
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
	 }


/**
		 * YTD Rate Table View
		 *
		 * @name    ytdRatTable()
		 * @return  void
		 */
     public function ytdratetable_get($unq_id,$periodyear) 
     {
  		 try {

				$headers = $this->input->request_headers(); 
				$userid  = $headers['Sm-User'];
				$intusrid = get_var('CONFIDENCEVALUE',$userid); 

				$smsession  = $headers['Sm-Serversessionspec'];
				
				if (isset($smsession))
				{

					$this->load->model('ytdam');
					$webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_ytd_rep_pkg/?wsdl';
					$QID = $unq_id."_".$intusrid;
					$getRtTblVO = $this->ytdam->getRateTblVO($webservice_url,$QID,$periodyear);  

					$data =   json_decode($getRtTblVO );
					  if (isset($data))	 	
					  {
					  $this->response($data , 200);
					  }
					  else
					  {
					  $this->response(array('error' => 'Couldn\'t find any data for YTD Rate Table!'), 404);
					  }
				}
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
	 }




    public function slDvp_get($UNQID,$mhflag)
    {
  		 try {
		
			  $headers = $this->input->request_headers(); 
			  $userid  = $headers['Sm-User'];
			  $intusrid = get_var('CONFIDENCEVALUE',$userid); 
					  
			  $this->load->model('sl_dvp_am');
			  $webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_sl_db_pkg/?wsdl';
			
			  $QID = $UNQID."_".$intusrid;
			  $slDvpSumVO = $this->sl_dvp_am->getSLDvpSumVO($webservice_url,$QID,$mhflag);
			  $data =   json_decode($slDvpSumVO); 
			  $this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
    }

    public function slMgr_get($UNQID,$get_type,$pf,$p_start_val,$mhflag) 
    {
  		 try {
				  $headers = $this->input->request_headers(); 
				  $userid  = $headers['Sm-User'];
				  $intusrid = get_var('CONFIDENCEVALUE',$userid); 
						  
				  $this->load->model('sl_dvp_am');
				  $webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_sl_db_pkg/?wsdl';
				
				  $QID = $UNQID."_".$intusrid;
				  $slMgrSumVO = $this->sl_dvp_am->getSLMgrSumVO($webservice_url,$QID,$get_type,$pf,$p_start_val,$mhflag);
				  $data =  json_decode($slMgrSumVO); 
				  $this->response($data,200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
    }

    public function slMgrd_get($UNQID,$get_type,$pf,$p_start_val,$mhflag) 
    {
  		 try {
				  $headers = $this->input->request_headers(); 
				  $userid  = $headers['Sm-User'];
				  $intusrid = get_var('CONFIDENCEVALUE',$userid); 
						  
				  $this->load->model('sl_dvp_am');
				  $webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_sl_db_pkg/?wsdl';
				
					$QID = $UNQID."_".$intusrid;  
				 $slMgrdSumVO = $this->sl_dvp_am->getSLMgrdSumVO($webservice_url,$QID,$get_type,$pf,$p_start_val,$mhflag);
				  $data =  json_decode($slMgrdSumVO); 
				  $this->response($data,200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		

    }

 public function slDm_get($UNQID,$sbu,$pf,$mhflag) 
 {
			
  		 try {
			  $headers = $this->input->request_headers(); 
			  $userid  = $headers['Sm-User'];
			  $intusrid = get_var('CONFIDENCEVALUE',$userid); 
					  
			  $this->load->model('sl_dvp_am');
			  $webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_sl_db_pkg/?wsdl';
			
			  $QID =  $UNQID."_".$intusrid; 
			  $slDMSumVO = $this->sl_dvp_am->getSLDmSumVO($webservice_url,$QID,$sbu,$pf,$mhflag);
			  $data =  json_decode($slDMSumVO); 
			  $this->response($data,200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
 }

 public function slDmd_get($UNQID,$sbu,$pf,$mhflag) {
			
  		 try {

			  $headers = $this->input->request_headers(); 
			  $userid  = $headers['Sm-User'];
			  $intusrid = get_var('CONFIDENCEVALUE',$userid); 
					  
			  $this->load->model('sl_dvp_am');
			  $webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_sl_db_pkg/?wsdl';
			
			  $QID = $UNQID."_".$intusrid; 
			  $slDMdSumVO = $this->sl_dvp_am->getSLDmdSumVO($webservice_url,$QID,$sbu,$pf,$mhflag);
			  $data =  json_decode($slDMdSumVO); 
			  $this->response($data,200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
 }

public function slMemoDvp_get($UNQID){
		  
  		 try {
		
			  $headers = $this->input->request_headers(); 
			  $userid  = $headers['Sm-User'];
			  $intusrid = get_var('CONFIDENCEVALUE',$userid); 
					  
			  $this->load->model('sl_dvp_am');
			  $webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_sl_db_pkg/?wsdl';
			
			  $QID = $UNQID."_".$intusrid;
			  $slMemoDvpSumVO = $this->sl_dvp_am->getSLMemoDvpSumVO($webservice_url,$QID);
			  $data =   json_decode($slMemoDvpSumVO); 
			  $this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
    }

	 public function slMemoMgr_get($UNQID)
	 {

  		 try {

			  $headers = $this->input->request_headers(); 
			  $userid  = $headers['Sm-User'];
			  $intusrid = get_var('CONFIDENCEVALUE',$userid); 
					  
			  $this->load->model('sl_dvp_am');
			  $webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_sl_db_pkg/?wsdl';
			
			  $QID = $UNQID."_".$intusrid;
			  $slMemoMgrSumVO = $this->sl_dvp_am->getSLMemoMgrSumVO($webservice_url,$QID);
			  $data =   json_decode($slMemoMgrSumVO); 
			  $this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
    }

 public function slMemoDM_get($UNQID)
	 {

  		 try {

			  $headers = $this->input->request_headers(); 
			  $userid  = $headers['Sm-User'];
			  $intusrid = get_var('CONFIDENCEVALUE',$userid); 
					  
			  $this->load->model('sl_dvp_am');
			  $webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_sl_db_pkg/?wsdl';
			
			  $QID = $UNQID."_".$intusrid;
			  $slMemoDMSumVO = $this->sl_dvp_am->getSLMemoDmSumVO($webservice_url,$QID);
			  $data =   json_decode($slMemoDMSumVO); 
			  $this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
    }

 public function rcMemoMgr_get($unq_id,$rcw,$pf,$get_type,$start_val,$status) //KLRAO07MAY2015 added pf ,get type,start val,status parameters
{

  		 try {

				$headers = $this->input->request_headers(); 
				$userid  = $headers['Sm-User'];
				$intusrid = get_var('CONFIDENCEVALUE',$userid); 

				$this->load->model('rollcalldashboardmgram');
				$webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_rc_db_pkg/?wsdl';
				$QID = $unq_id."_".$intusrid;
				$rollcallMemoMgrSumVO = $this->rollcalldashboardmgram->getRollcallMemoMgrSumVO($webservice_url,$QID,$rcw,$pf,$get_type,$start_val,$status);//KLRAO07MAY2015
				$data = json_decode($rollcallMemoMgrSumVO);
				$this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
  }
		

public function rcMemoDvp_get($UNQID,$rcw,$get_type) //KLRAO07MAY2015 added get_type parameter
{

  		 try {
				$headers = $this->input->request_headers(); 
				$userid  = $headers['Sm-User'];
				$intusrid = get_var('CONFIDENCEVALUE',$userid); 

				$this->load->model('rollcalldashboardam');
				$webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_rc_db_pkg/?wsdl';
			  
				$QID = $UNQID."_".$intusrid;
				$rollcallMemoDvpSumVO = $this->rollcalldashboardam->getMemoRollcallDvpSumVO($webservice_url,$QID,$rcw,$get_type);//KLRAO07MAY2015 added get_type parameter
				$data = json_decode($rollcallMemoDvpSumVO);
				$this->response($data,200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
  }

public function slDetail_get($p_mode,$p_trx_type,$p_period_id,$p_aid,$p_off_num,$p_pf,$p_column_type,$p_detail_level,$p_cust_num,$p_start_val) {

  		 try {		
				$headers = $this->input->request_headers(); 
				$userid  = $headers['Sm-User'];
				$intusrid = get_var('CONFIDENCEVALUE',$userid); 
				
				$QID =$p_aid."_".$intusrid;
				$this->load->model('sl_dvp_am');
				$webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_sl_db_pkg/?wsdl';
				$slDetailVO = $this->sl_dvp_am->getSLDetailVO($webservice_url,$p_mode,$p_trx_type,$p_period_id,$QID,$p_off_num,$p_pf,$p_column_type,$p_detail_level,$p_cust_num,$p_start_val);
				$data =   json_decode($slDetailVO);
				$this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
    }
	

 public function imgGet_get($p_source,$p_aid) {

		
  		 try {

			header("Content-Type: image/jpeg");
			header("Content-Disposition: inline");
			$this->load->model('rollcall_detail_am');
			$webservice_url = $this->variable['smp_url'].'adp_oc_mobile_apps_common_pkg/?wsdl';
			$cache_dir = $this->variable['cache_dir'];
			
			$imgGetVO = $this->rollcall_detail_am->getImgVO($webservice_url,$cache_dir,$p_source,$p_aid);
			//$img_decoded = base64_decode($imgGetVO);
			echo $imgGetVO;
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
 }
			
 public function pdfGet_get($p_source,$p_aid) {

		
  		 try {

			header("Content-Type: application/x-pdf");
			header("Content-Disposition: inline");
			$this->load->model('rollcall_detail_am');
			$webservice_url = $this->variable['smp_url'].'adp_oc_mobile_apps_common_pkg/?wsdl';
			$cache_dir = $this->variable['cache_dir'];
			
			$pdfGetVO = $this->rollcall_detail_am->getImgVO($webservice_url,$cache_dir,$p_source,$p_aid);
			//$pdf_decoded = base64_decode($pdfGetVO);
			echo $pdfGetVO;
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
 }   
    	

public function rcWeekMonth_get($p_date)
{		
  		 try { 
	
			  $this->load->model('useraccessam');
			  $webservice_url = $this->variable['smp_url'].'adp_oc_mobile_apps_common_pkg/?wsdl';
			
			  $rcWeekMonth = $this->useraccessam->getRcWeekMonth($webservice_url,$p_date);
			
			 				  
			  $data =   json_decode($rcWeekMonth);

			
			  if (isset($data))	 	
			  {
			  $this->response($data , 200);
			  }
			  else
			  {
			  $this->response(array('error' => 'Couldn\'t find any data for Rc Week and Month!'), 404);
			  }
		  }
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }
		  
	}

	public function aidInfo_get($p_aid)
	{		
  		 try {
	
			  $this->load->model('useraccessam');
			  $webservice_url = $this->variable['smp_url'].'adp_oc_mobile_apps_common_pkg/?wsdl';
			  $headers = $this->input->request_headers(); 
			  $userid  = $headers['Sm-User'];
			  $intusrid = get_var('CONFIDENCEVALUE',$userid); 

			  $QID =$p_aid."_".$intusrid;
			  $aidinfo = $this->useraccessam->getAssociateInfo($webservice_url,$QID);
			  $data =   json_decode($aidinfo);
			  
			  if (isset($data))	 	
			  {
			  $this->response($data , 200);
			  }
			  else
			  {
			  $this->response(array('error' => 'Couldn\'t find any data for Rc Week and Month!'), 404);
			  }
		  }
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }
	}

 public function lastUpdateDt_get($UNQID)
 {
		 
  		 try {
			 
			$headers = $this->input->request_headers(); 
			$userid  = $headers['Sm-User'];
			$intusrid = get_var('CONFIDENCEVALUE',$userid); 

			$this->load->model('useraccessam');
		    $webservice_url = $this->variable['smp_url'].'adp_oc_mobile_apps_common_pkg/?wsdl';
      
		    $QID = $UNQID."_".$intusrid;
			$lastUpdateDate = $this->useraccessam->getLastUpdateDate($webservice_url,$QID);
			$data =   json_decode($lastUpdateDate); 
			$this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		


    }
public function landingPageInfo_get($p_aid,$p_get_type,$rcw,$p_bu,$p_sbu_cd,$p_family,$mhflag)
{
		 try {
			 
				$headers = $this->input->request_headers(); 
				$userid  = $headers['Sm-User'];
				$intusrid = get_var('CONFIDENCEVALUE',$userid); 

				$this->load->model('useraccessam');
				$webservice_url = $this->variable['smp_url'].'adp_oc_mobile_apps_common_pkg/?wsdl';
				$QID = $p_aid."_".$intusrid;
				$landingPageInfo = $this->useraccessam->getLandPageInfo($webservice_url,$QID,$p_get_type,$rcw,$p_bu,$p_sbu_cd,$p_family,$mhflag);
				$data =   json_decode($landingPageInfo); 
				$this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		


    }
	
public function pushPref_get($p_action,$p_device_type,$p_aid ,$p_pref_type)
{

  		 try {
			 
			$headers = $this->input->request_headers(); 
			$userid  = $headers['Sm-User'];
			$this->load->model('useraccessam');
		    $webservice_url = $this->variable['smp_url'].'adp_oc_mobile_apps_common_pkg/?wsdl';
      
		    $pushPref = $this->useraccessam->getPushPref($webservice_url,$p_action,$p_device_type,$p_aid ,$p_pref_type);
			$data =   json_decode($pushPref); 
			$this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		


}


public function test1_post($p_action)
{
   echo('123');
   log_message('info', 'Feedback post :'.$p_action);
   $feedbackValueArrayInit = file_get_contents('php://input');
   echo('456'.$feedbackValueArrayInit);

}


public function test2_get($p_action)
{
   echo('456');
}


public function feedback_get($p_action,$p_aid,$p_rate,$p_description)
{

  		 try {
			 
			$headers = $this->input->request_headers(); 
			$userid  = $headers['Sm-User'];
			$this->load->model('useraccessam');
		       $webservice_url = $this->variable['smp_url'].'adp_oc_mobile_apps_common_pkg/?wsdl';

		       $p_description = str_replace("-","/",$p_description);
		   	$decoded_value = base64_decode($p_description);
      
		    	$feedback = $this->useraccessam->getsetfeedback($webservice_url,$p_action,$p_aid,$p_rate,$decoded_value);
		    	$data =   json_decode($feedback); 
		    	$this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
}


public function setFeedback_post($p_action,$p_aid,$p_rate)
{

  		 try {
			 
			$headers = $this->input->request_headers(); 
			$userid  = $headers['Sm-User'];
			$this->load->model('useraccessam');
		       $webservice_url = $this->variable['smp_url'].'adp_oc_mobile_apps_common_pkg/?wsdl';

		       $p_description = file_get_contents('php://input');
			log_message('info', 'Feedback post :'.$p_description);

      
		    	$feedback = $this->useraccessam->getsetfeedback($webservice_url,$p_action,$p_aid,$p_rate,$p_description);
		    	$data =   json_decode($feedback); 
		    	$this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
}

public function getFeedback_get($p_action,$p_aid,$p_rate,$p_description)
{

  		 try {
			 
			$headers = $this->input->request_headers(); 
			$userid  = $headers['Sm-User'];
			$this->load->model('useraccessam');
		       $webservice_url = $this->variable['smp_url'].'adp_oc_mobile_apps_common_pkg/?wsdl';

		    	$feedback = $this->useraccessam->getsetfeedback($webservice_url,$p_action,$p_aid,$p_rate,$p_description);
		    	$data =   json_decode($feedback); 
		    	$this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
}



public function setCrashLog_post()
{

  	try {
			 
		$headers = $this->input->request_headers(); 
		$userid  = $headers['Sm-User'];
		
		$p_description = file_get_contents('php://input');

		$p_description = $userid.PHP_EOL.$p_description;

		$new_dir ="/opt/apache/application/logs/sbcrash/crashlog.txt";

		file_put_contents($new_dir,$p_description.PHP_EOL, FILE_APPEND );

	  }	
	  catch (Exception $e)
	  {
             //$this->response(array('error' => var_dump($e)), 404); 
              $this->response(array('error' => 'midtier') , 404);
	  }		
}


/******SL New *****/


     public function slDetailN_get($p_mode,$p_trx_type,$p_period_id,$p_aid,$p_off_num,$p_pf,$p_column_type,$p_detail_level,$p_cust_num,$p_start_val) {

  		 try {		
				$headers = $this->input->request_headers(); 
				$userid  = $headers['Sm-User'];
				$intusrid = get_var('CONFIDENCEVALUE',$userid); 
				
				$QID =$p_aid."_".$intusrid;
				$this->load->model('salesliabilitynewdb');
				$webservice_url = $this->variable['smp_url'].'CNADP_MOBILE_APP_SL_NEW_PKG/?wsdl';
				$slDetailVO = $this->salesliabilitynewdb->getSLDetailVO($webservice_url,$p_mode,$p_trx_type,$p_period_id,$QID,$p_off_num,$p_pf,$p_column_type,$p_detail_level,$p_cust_num,$p_start_val);
				$data =   json_decode($slDetailVO);
				$this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
        }	

    public function slDvpN_get($UNQID,$mhflag,$p_get_type,$p_col_name)
    {
  		 try {
		
			  $headers = $this->input->request_headers(); 
			  $userid  = $headers['Sm-User'];
			  $intusrid = get_var('CONFIDENCEVALUE',$userid); 
					  
			  $this->load->model('salesliabilitynewdb');
			  $webservice_url = $this->variable['smp_url'].'CNADP_MOBILE_APP_SL_NEW_PKG/?wsdl';
			
			  $QID = $UNQID."_".$intusrid;
			  $slDvpSumVO = $this->salesliabilitynewdb->getSLDvpSumVO($webservice_url,$QID,$mhflag,$p_get_type,$p_col_name);
			  $data =   json_decode($slDvpSumVO); 
			  $this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
    }

    public function slMgrN_get($UNQID,$get_type,$pf,$p_start_val,$mhflag,$p_col_name) 
    {
  		 try {
				  $headers = $this->input->request_headers(); 
				  $userid  = $headers['Sm-User'];
				  $intusrid = get_var('CONFIDENCEVALUE',$userid); 
						  
				  $this->load->model('salesliabilitynewdb');
				  $webservice_url = $this->variable['smp_url'].'CNADP_MOBILE_APP_SL_NEW_PKG/?wsdl';
				
				  $QID = $UNQID."_".$intusrid;
				  $slMgrSumVO = $this->salesliabilitynewdb->getSLMgrSumVO($webservice_url,$QID,$get_type,$pf,$p_start_val,$mhflag,$p_col_name);
				  $data =  json_decode($slMgrSumVO); 
				  $this->response($data,200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
    }

    public function slMgrdN_get($UNQID,$get_type,$pf,$p_start_val,$mhflag, $p_col_name) 
    {
  		 try {
				  $headers = $this->input->request_headers(); 
				  $userid  = $headers['Sm-User'];
				  $intusrid = get_var('CONFIDENCEVALUE',$userid); 
						  
				  $this->load->model('salesliabilitynewdb');
				  $webservice_url = $this->variable['smp_url'].'CNADP_MOBILE_APP_SL_NEW_PKG/?wsdl';
				
					$QID = $UNQID."_".$intusrid;  
				 $slMgrdSumVO = $this->salesliabilitynewdb->getSLMgrdSumVO($webservice_url,$QID,$get_type,$pf,$p_start_val,$mhflag,$p_col_name);
				  $data =  json_decode($slMgrdSumVO); 
				  $this->response($data,200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		

    }

 public function slDmN_get($UNQID,$sbu,$pf,$mhflag,$p_col_name) 
 {
			
  		 try {
			  $headers = $this->input->request_headers(); 
			  $userid  = $headers['Sm-User'];
			  $intusrid = get_var('CONFIDENCEVALUE',$userid); 
					  
			  $this->load->model('salesliabilitynewdb');
			  $webservice_url = $this->variable['smp_url'].'CNADP_MOBILE_APP_SL_NEW_PKG/?wsdl';
			
			  $QID =  $UNQID."_".$intusrid; 
			  $slDMSumVO = $this->salesliabilitynewdb->getSLDmSumVO($webservice_url,$QID,$sbu,$pf,$mhflag,$p_col_name);
			  $data =  json_decode($slDMSumVO); 
			  $this->response($data,200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
 }

 public function slDmdN_get($UNQID,$sbu,$pf,$mhflag,$p_col_name) {
			
  		 try {

			  $headers = $this->input->request_headers(); 
			  $userid  = $headers['Sm-User'];
			  $intusrid = get_var('CONFIDENCEVALUE',$userid); 
					  
			  $this->load->model('salesliabilitynewdb');
			  $webservice_url = $this->variable['smp_url'].'CNADP_MOBILE_APP_SL_NEW_PKG/?wsdl';
			
			  $QID = $UNQID."_".$intusrid; 
			  $slDMdSumVO = $this->salesliabilitynewdb->getSLDmdSumVO($webservice_url,$QID,$sbu,$pf,$mhflag,$p_col_name);
			  $data =  json_decode($slDMdSumVO); 
			  $this->response($data,200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
 }

	/* For MAR release SL consolidated */

 public function slConsData_get($p_unq_id) {

  		 try {		
				$headers = $this->input->request_headers(); 
				$userid  = $headers['Sm-User'];
				$intusrid = get_var('CONFIDENCEVALUE',$userid); 
				
				$QID =$p_unq_id."_".$intusrid;
				$this->load->model('salesliabilitynewdb');
				$webservice_url = $this->variable['smp_url'].'CNADP_MOBILE_APP_SL_NEW_PKG/?wsdl';
				$slConsDataVO= $this->salesliabilitynewdb->getSLConsDataVO($webservice_url,$QID);
				$data =   json_decode($slConsDataVO);
				$this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
        }



public function slSplitDetails_get($p_inst_id) 
    {

  		 try 
         {
			$this->load->model('salesliabilitynewdb');
			$webservice_url = $this->variable['smp_url'].'CNADP_MOBILE_APP_SL_NEW_PKG/?wsdl';
			$slSplitDeatilsVO = $this->salesliabilitynewdb->getSLSplitDetailsVO($webservice_url,$p_inst_id);
			$data =   json_decode($slSplitDeatilsVO);
			$this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
			    //$this->response(array('error' => var_dump($e)), 404);	
                $this->response(array('error' => 'midtier') , 404);
		  }		
     }
	

	/* MAR release end */

/****** SL New End ****/


public function setDeviceToken_get($p_aid,$p_device_type,$p_device_token)
{
		 
  		 try {
			
			$headers = $this->input->request_headers(); 
			$userid  = $headers['Sm-User'];
			$this->load->model('useraccessam');
		    $webservice_url = $this->variable['smp_url'].'adp_oc_mobile_apps_common_pkg/?wsdl';
      
		    $deviceToken = $this->useraccessam->setDeviceToken($webservice_url,$p_aid,$p_device_type,$p_device_token);
			$data =   json_decode($deviceToken); 
			$this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
		
 }
 
 public function spmcronjob_get($min,$max)
 {		
  		 try {
			 
			  $this->load->model('useraccessam');
			  $webservice_url = $this->variable['smp_url'].'adp_oc_mobile_apps_common_pkg/?wsdl';
			  $cronJobVO = $this->useraccessam->getCronJob($webservice_url,$min,$max);
			  echo $cronJobVO;
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
			  
 }


 public function rcWeekInfo_get()
 {

  		 try {
			 
			$headers = $this->input->request_headers(); 
			$userid  = $headers['Sm-User'];
			$this->load->model('useraccessam');
		    $webservice_url = $this->variable['smp_url'].'adp_oc_mobile_apps_common_pkg/?wsdl';
    
		    $rcWeekInfo = $this->useraccessam->getRcWeekInfoVO($webservice_url);
			$data =   json_decode($rcWeekInfo); 
			$this->response($data , 200);


		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		

}

public function productRcWeekInfo_get()
 {

  		 try {
			 
			$headers = $this->input->request_headers(); 
			$userid  = $headers['Sm-User'];
			$this->load->model('productdashboard');
		    $webservice_url = $this->variable['smp_url'].'cnadp_prd_recap_rpt_pub/?wsdl';
    
		    $rcWeekInfo = $this->productdashboard->getProductRcWeekInfoVO($webservice_url);
			$data =   json_decode($rcWeekInfo); 
			$this->response($data , 200);


		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		

}


public function slLegendInfo_get() {

  		 try {

			  header("Content-Type:text/html");
			  header("Content-Disposition: inline");	  
			  $this->load->model('sl_dvp_am');
			  $webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_sl_db_pkg/?wsdl';
			
			  $slLegendInfoVO = $this->sl_dvp_am->getSlLegendInfo($webservice_url);
			  $data =  $slLegendInfoVO; 
			  echo $data;
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		

}

public function rcConsData_get($unq_id,$rcw) {

  		 try {
				$headers = $this->input->request_headers(); 
				$userid  = $headers['Sm-User'];
				$intusrid = get_var('CONFIDENCEVALUE',$userid); 

				$this->load->model('rollcalldashboardam');
				$webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_rc_db_pkg/?wsdl';
				$QID = $unq_id."_".$intusrid;
				$concRcDataVO = $this->rollcalldashboardam->getConcRcDataVO($webservice_url,$QID,$rcw);
				$data = json_decode($concRcDataVO);
				$this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		

}
	
public function setAppsViewPref_get($p_get_type,$p_view_pref,$p_access_pref,$p_associate_id)
{
 		 try {		 
				$headers = $this->input->request_headers(); 
				$userid  = $headers['Sm-User'];
				$this->load->model('useraccessam');
				$webservice_url = $this->variable['smp_url'].'adp_oc_mobile_apps_common_pkg/?wsdl';
		  
				$appsviewPref = $this->useraccessam->setAppsViewPrefVO($webservice_url,$p_get_type,$p_view_pref,$p_access_pref,$p_associate_id);
				$data =   json_decode($appsviewPref); 
				$this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
}


public function netSalesUnitsInfo_get($p_aid,$p_get_type,$p_sbu,$p_rc_week)
{
 		 try {		 
				$headers = $this->input->request_headers(); 
				$userid  = $headers['Sm-User'];
				$this->load->model('graph_data');
				$webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_rc_graph_pkg/?wsdl';
		  
				$salesUnitsInfo = $this->graph_data->netSalesUnitsInfo($webservice_url,$p_aid,$p_get_type,$p_sbu,$p_rc_week);
				$data =   json_decode($salesUnitsInfo); 
				$this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
}


public function appStatus_get($p_action,$p_action1){
	 try 
	 {
			//$this->response(array('info' => 'Session Refereshed....'+$p_action+'.......'+ $p_action1) , 200);
	 	$this->response($p_action+'.......'+ $p_action1 , 200);
	 }	
	  catch (Exception $e)
	  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
	  }		
 }

//KLRAO07MAY2015 created new function rcMemoDm_get Code Start
public function rcMemoDm_get($unq_id,$rcw,$sbu,$pf) 
{

  		 try {

				$headers = $this->input->request_headers(); 
				$userid  = $headers['Sm-User'];
				$intusrid = get_var('CONFIDENCEVALUE',$userid); 

				$this->load->model('rollcall_dm_am');
				$webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_rc_db_pkg/?wsdl';
				$QID = $unq_id."_".$intusrid;
				$rollcallMemoDmSumVO = $this->rollcall_dm_am->getRollcallMemoDmSumVO($webservice_url,$QID,$rcw,$sbu,$pf);
				$data = json_decode($rollcallMemoDmSumVO);
				$this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
  }

//KLRAO07MAY2015 created new function rcMemoDm_get Code End


//KLRAO08MAY2015 created new function rcMemoMgrD_get Code Start
public function rcMemoMgrD_get($unq_id,$rcw,$pf,$gtype,$startval,$status) 
{

  		 try {

				$headers = $this->input->request_headers(); 
				$userid  = $headers['Sm-User'];
				$intusrid = get_var('CONFIDENCEVALUE',$userid); 

				$this->load->model('rollcalldashboardmgram');
				$webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_rc_db_pkg/?wsdl';
				$QID = $unq_id."_".$intusrid;
				$rollcallMemoMgrdSumVO = $this->rollcall_dm_am->getRollcallMemoMgrdSumVO($webservice_url,$QID,$rcw,$pf,$gtype,$startval,$status);
				$data = json_decode($rollcallMemoMgrdSumVO);
				$this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
  }

//KLRAO08MAY2015 created new function rcMemoMgrD_get Code End

//KLRAO08MAY2015 created new function rcMemoDmD_get Code Start
public function rcMemoDmD_get($unq_id,$rcw,$sbu,$pf) 
{

  		 try {

				$headers = $this->input->request_headers(); 
				$userid  = $headers['Sm-User'];
				$intusrid = get_var('CONFIDENCEVALUE',$userid); 

				$this->load->model('rollcall_dm_am');
				$webservice_url = $this->variable['smp_url'].'cnadp_mobile_app_rc_db_pkg/?wsdl';
				$QID = $unq_id."_".$intusrid;
				$rollcallMemoDmDSumVO = $this->rollcall_dm_am->getRollcallMemoDmdSumVO($webservice_url,$QID,$rcw,$sbu,$pf);
				$data = json_decode($rollcallMemoDmDSumVO);
				$this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
  }

//KLRAO08MAY2015 created new function rcMemoDmD_get Code End


//KLRAO02FEB2017 created new function teamview_get Code Start
public function teamview_get($unq_id,$tab_code,$comp_grp,$fis_yr,$period_id) 
{


  		 try {

				$headers = $this->input->request_headers(); 
				$userid  = $headers['Sm-User'];
				$intusrid = get_var('CONFIDENCEVALUE',$userid); 

				$this->load->model('team_view_am');
				$webservice_url = $this->variable['smp_url'].'cnadp_rank_rpt_mob_pvt/?wsdl';
				$QID = $unq_id."_".$intusrid;



				$teamviewVO = $this->team_view_am->getteamviewVO($webservice_url,$QID,$tab_code,$comp_grp,$fis_yr,$period_id);
				$data = json_decode($teamviewVO);
				$this->response($data , 200);
		  }	
		  catch (Exception $e)
		  {
                //$this->response(array('error' => var_dump($e)), 404); 
                $this->response(array('error' => 'midtier') , 404);
		  }		
  }

//KLRAO02FEB2017 created new function teamview_get Code End

}

<?php
 require_once "autoloader.php";
use Kfc\Libs\Cart;
use Kfc\Libs\User;
use Kfc\Libs\Session;
$session = new Session();
?>
<!DOCTYPE html>
<html lang="en">


<!-- Mirrored from koki.dexignzone.com/xhtml/index.html by HTTrack Website Copier/3.x [XR&CO'2014], Sat, 01 Apr 2023 14:58:21 GMT -->
<head>
    <meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="keywords" content="admin, dashboard" />
	<meta name="author" content="DexignZone" />
	<meta name="robots" content="index, follow" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="Koki :  Restaurant Admin Dashboard  Bootstrap 5 Template" />
	<meta property="og:title" content="Koki :  Restaurant Admin Dashboard  Bootstrap 5 Template" />
	<meta property="og:description" content="Koki :  Restaurant Admin Dashboard  Bootstrap 5 Template" />
	<meta property="og:image" content="social-image.png"/>
	<meta name="format-detection" content="telephone=no">
    <title>KFC - Admin Dashboard </title>
    <!-- Favicon icon -->
    <link rel="icon" type="image/png" sizes="16x16" href="images/favicon.png">
    <link href="vendor/jqvmap/css/jqvmap.min.css" rel="stylesheet">
	<link href="vendor/datatables/css/jquery.dataTables.min.css" rel="stylesheet">
	<link rel="stylesheet" href="vendor/chartist/css/chartist.min.css">
    <link href="vendor/bootstrap-select/dist/css/bootstrap-select.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
	<link href="../../cdn.lineicons.com/2.0/LineIcons.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <style>
        #profile{
        background-color: rgb(252,231,240); 
        border-radius: 50%;
        width: 60px;
        height: 60px;
        }
    </style>
</head>

</head>
<body>

    <!--*******************
        Preloader start
    ********************-->
    <div id="preloader">
        <div class="sk-three-bounce">
            <div class="sk-child sk-bounce1"></div>
            <div class="sk-child sk-bounce2"></div>
            <div class="sk-child sk-bounce3"></div>
        </div>
    </div>
    <!--*******************
        Preloader end
    ********************-->
<div class="nav-header">
            <a href="index.php" class="brand-logo">
                <img class="logo-abbr" src="images/kfclogo.png" alt="">
                <img class="logo-compact" src="images/logo-text.png" alt="">
                <img class="brand-title" src="images/Kfc_textlogo.svg.png" alt="">
            </a>

            <div class="nav-control">
                <div class="hamburger">
                    <span class="line"></span><span class="line"></span><span class="line"></span>
                </div>
            </div>
        </div>
        <!--**********************************
            Nav header end
        ***********************************-->
		
		<!--**********************************
            Chat box start
        ***********************************-->
		
		<!--**********************************
            Header start
        ***********************************-->
        <div class="header">
            <div class="header-content">
                <nav class="navbar navbar-expand">
                    <div class="collapse navbar-collapse justify-content-between">
                        <div class="header-left">
                            <div class="dashboard_bar">
                                Dashboard
                            </div>
                        </div>

                        <ul class="navbar-nav header-right">
                          
                            <li class="nav-item dropdown header-profile">
                                <a class="nav-link" href="javascript:;" role="button" data-bs-toggle="dropdown">
									<div class="header-info">
										<small>Hello</small>
                                        <?php
                                            $userr = new User();
                                            $userEmail = $_SESSION['userId'];
                                            $user = $userr->find_id($userEmail);
                                        ?>
										<span><?php echo $user->getEmri() . " " . $user->getMbiemri(); ?></span>
									</div>
                                    <div id="profile" class="text-center d-flex flex-column align-items-center justify-content-center text-dark fw-bold" style="font-size:22px" >
                                    <?php
    $shkronjat = $user->profileInitials($user->getId());
    foreach($shkronjat as $s){
        echo $s . " ";
    }
    
                                    
?>
                                    </div>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">

                                    <a href="logout.php" class="dropdown-item ai-icon">
                                        <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" class="text-danger" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                        <span class="ms-2">Logout </span>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
        <!--**********************************
            Header end ti-comment-alt
        ***********************************-->
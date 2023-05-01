<?php 
include "header.php"; 
use Kfc\Libs\Session;
use Kfc\Libs\User;

?>
<style>
  body{
    background-color: rgb(249, 249, 249);
  }
</style>
<?php
if(isset($_POST['login'])){
  $email = $_POST['email'];
  $password = $_POST['password'];
  $user = new User();
  $user = $user->verifyUser($email, $password);
  if($user){
    $session->login($user);
    $userEmail = $_SESSION['userId'];
    $u = $user->find_id($userEmail);
    if($u->getRoli() == 1){
      header("Location: AdminDashboard/index.php");
    }else if($u->getRoli() == 0){
      header("Location: delivery.php");
    }
  }else{
    $session->message("Your email or password is incorrent!");
  }
}
?>
  <div class="container bg-white  mt-4 px-4" id="logsign">
    <p class="h4 mt-3 text-center">Login</p>
    <p class="text-center">New on Ordering App ? <a href="signup.php" class="text-danger">Create an account</a></p>
    <a href="delivery.php"><button class="btn border w-100 fw-bold text-dark py-2 shadow-none" id="login"><i class="fas fa-user-secret me-2"></i>CONTINUE AS GUEST</button></a>
    <p id="or" class="text-center mt-2">or</p>

    <form class="mt-4" method="post" id="loginform">
      <div class="mb-3 input-control">
      <?php
                        if (!empty($session->message)) {
                            echo "<div class='text-center p-3' style='background-color:rgb(254,220,224);'>";
                            echo $session->message;
                            echo "</div>";
                            
                        }
                        ?>
          <label for="exampleInputEmail1" class="form-label fw-bold">Email</label>
          <input type="email" class="form-control shadow-none" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" name="email" onkeyup="validateEmail1()">
          <div class="error"></div>
        </div>
      <div class="mb-3 input-control">
          <label for="exampleInputPassword1" class="form-label text-start fw-bold">Password</label>
          <input type="password" class="form-control shadow-none" id="exampleInputPassword1" placeholder="Password" name="password" onkeyup="validatePassword1()">
          <div class="error"></div>
        </div>
      <button type="submit" class="btn btn-danger w-100 py-2 mb-5" name="login" onclick="return validateInputs1()">LOGIN</button>
  </form>
  </div>
  <script>
if ( window.history.replaceState ) {
  window.history.replaceState( null, null, window.location.href );
}
</script> 
  
<?php include "footer.php" ?>

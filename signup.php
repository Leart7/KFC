<?php
include "header.php";
?>
<style>
  body{
    background-color: rgb(249, 249, 249);
  }
</style>
  <div class="container bg-white  mt-4 px-4" id="logsign">
    <p class="h4 mt-3 text-center">Create Account</p>
    <p class="text-center">Already have an account ? <a href="login.php" class="text-danger">Login</a></p>
    <a href="delivery.php"><button class="btn border w-100 fw-bold text-dark py-2 shadow-none" id="login"><i class="fas fa-user-secret me-2"></i>CONTINUE AS GUEST</button></a>
    <p id="or" class="text-center mt-2">or</p>
    <form class="mt-4" method="post">
      <div class="mb-3 input-control">
        <label for="exampleInputEmail1" class="form-label fw-bold">First Name</label>
        <input type="text" class="form-control shadow-none " id="names" aria-describedby="emailHelp" placeholder="First Name" name="name" onkeyup="validateName()">
        <div class="error"></div>
      </div>
      <div class="mb-3 input-control">
          <label for="exampleInputEmail1" class="form-label fw-bold">Email</label>
          <input type="email" class="form-control shadow-none " id="emails" aria-describedby="emailHelp" placeholder="Email" name="email" onkeyup="validateEmail2()">
          <div class="error"></div>
        </div>
      <div class="mb-3 input-control">
          <label for="exampleInputPassword1" class="form-label text-start fw-bold">Password</label>
          <input type="password" class="form-control shadow-none " id="passwords" placeholder="Password" name="password" onkeyup="validatePassword2()">
          <div class="error"></div>
        </div>
      <div class="form-check mt-4 mb-4">
        <input class="form-check-input  shadow-none" type="checkbox" id="check1" name="option1" value="something" onkeyup="validateCheckBox()">
        <label class="form-check-label  w-100" for="check1">I agree with <a href="#" class="text-danger">Terms & Conditions</a></label>
        <div class="error text-danger"></div>
      </div>
      <button type="submit" class="btn btn-danger w-100 py-2 mb-5" name="signup" onclick="return validateInputs2()">SIGN UP</button>
  </form>
  </div>
  <script src="js/signup.js"></script>
<?php include "footer.php" ?>

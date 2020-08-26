<?php

include("config.php");

$conn = mysqli_connect($cd_host, $cd_user, $cd_socket, $cd_dbname, $cd_port, $cd_password);
// $conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

$firstName = $conn->real_escape_string($_POST['firstName']);
$lastName= $conn->real_escape_string($_POST['lastName']);
$jobTitle = $conn->real_escape_string($_POST['jobTitle']);
$email = $conn->real_escape_string($_POST['email']);
$temp_department = $_POST['departmentID'];
$department = (int)$temp_department;


if(isset($_POST["operation"])) {

  if($_POST["operation"] == "Add") {

    $sql = $conn->query("SELECT id FROM personnel WHERE email = '$email'");

          if($sql->num_rows > 0) {
            echo "<div class='alert alert-warning alert-dismissible' id='myAlertWarning'>
            <button type='button' class='close' data-dismiss='alert'>&times;</button>
            Record already exists!
            </div>";
          } else {
            $query = "INSERT INTO `personnel` (`firstName`, `lastName`, `jobTitle`, `email`, `departmentID`) VALUES (
            '$firstName', '$lastName', '$jobTitle', '$email', '$department')";

            $sql= $conn->query($query);

            $lastID = $conn->insert_id;

            echo "<div class='alert alert-success alert-dismissible' id='myAlertSuccess'>
            <button type='button' class='close' data-dismiss='alert'>&times;</button>
            Record added!
            </div>";
          };

  }

  if($_POST["operation"] == "Edit") {
    $rowID = $conn->real_escape_string($_POST['userID']);

    // $conn->query("UPDATE personnel SET firstName='$firstName', lastName='$lastName', jobTitle='$jobTitle',
    //   email='$email', departmentID='$department' WHERE id='$rowID'");

    $conn->query("UPDATE personnel SET firstName='$firstName', lastName='$lastName', jobTitle='$jobTitle',
      email='$email', departmentID='$department' WHERE id='$rowID'");

      echo "<div class='alert alert-success alert-dismissible' id='myAlertSuccess'>
      <button type='button' class='close' data-dismiss='alert'>&times;</button>
      Record updated!
      </div>";
  }
}

?>

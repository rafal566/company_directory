<?php

include("config.php");

$conn = mysqli_connect($cd_host, $cd_user, $cd_socket, $cd_dbname, $cd_port, $cd_password);

$temp_id = $_POST['userID'];
$userID = (int)$temp_id;


  $conn->query("DELETE FROM personnel WHERE id='$userID'");
  echo "<div class='alert alert-danger alert-dismissible' id='myAlertDanger'>
  <button type='button' class='close' data-dismiss='alert'>&times;</button>
  Record deleted!
  </div>";
  // mysqli_close($conn);


    ?>

<?php

include("config.php");

$conn = mysqli_connect($cd_host, $cd_user, $cd_socket, $cd_dbname, $cd_port, $cd_password);

if(isset($_POST["userID"])) {
    // $temp_id = $_POST['id'];
    // $id= (int)$temp_id;
    $rowID = $conn->real_escape_string($_POST['userID']);
    $sql = $conn->query("SELECT * FROM personnel WHERE id='$rowID'");
    $data = $sql->fetch_array();
    $jsonArray = array(
      'id' => $data['id'],
      'firstName' => $data['firstName'],
      'lastName' => $data['lastName'],
      'jobTitle' => $data['jobTitle'],
      'email' => $data['email'],
      'departmentID' => $data['departmentID'],
    );

    exit(json_encode($jsonArray));
}

?>

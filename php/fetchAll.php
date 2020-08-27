<?php
//////////////////////////////////
include("config.php");

header('Content-Type: application/json; charset=UTF-8');

// $conn = mysqli_connect($cd_host, $cd_user, $cd_socket, $cd_dbname, $cd_port, $cd_password);
$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

$columns = array('firstName', 'lastName', 'jobTitle', 'email', 'department', 'location');

$query = 'SELECT p.id, p.firstName, p.lastName, p.jobTitle, p.email, d.name as department, l.name as location FROM personnel p LEFT JOIN department d ON (d.id = p.departmentID) LEFT JOIN location l ON (l.id = d.locationID)';


if(isset($_POST["search"]["value"])) {
  $query .= '
  WHERE p.firstName LIKE "%'.$_POST["search"]["value"].'%"
  OR p.lastName LIKE "%'.$_POST["search"]["value"].'%"
  OR p.jobTitle LIKE "%'.$_POST["search"]["value"].'%"
  OR p.email LIKE "%'.$_POST["search"]["value"].'%"
  OR d.name LIKE "%'.$_POST["search"]["value"].'%"
  OR l.name LIKE "%'.$_POST["search"]["value"].'%"
  ';
}

if(isset($_POST["order"])) {
 $query .= 'ORDER BY '.$columns[$_POST['order']['0']['column']].' '.$_POST['order']['0']['dir'].'
 ';
} else {
 $query .= 'ORDER BY id DESC ';
}

$query1 = '';

if($_POST["length"] != -1) {
 $query1 = 'LIMIT ' . $_POST['start'] . ', ' . $_POST['length'];
}

$number_filter_row = mysqli_num_rows(mysqli_query($conn, $query));

$result = $conn->query($query . $query1);

$data = array();

while($row = mysqli_fetch_array($result)) {

 $sub_array = array();

 // $sub_array[] = $row["id"];
 $sub_array[] = $row["firstName"];
 $sub_array[] = $row["lastName"];
 $sub_array[] = $row["jobTitle"];
 $sub_array[] = $row["email"];
 $sub_array[] = $row["department"];
 $sub_array[] = $row["location"];
 $sub_array[] = '<button type="button" class="btn btn-warning update" id="'.$row["id"].'"><i class="fas fa-pen-alt"></i></button><button type="button" class="btn btn-danger delete" id="'.$row["id"].'"><i class="fas fa-trash-alt"></i></button>';
 // $sub_array[] = '<button type="button" class="btn btn-info info"><i class="fas fa-info-circle"></i></button><button type="button" class="btn btn-warning update" id="'.$row["id"].'"><i class="fas fa-pen-alt"></i></button><button type="button" class="btn btn-danger delete" id="'.$row["id"].'"><i class="fas fa-trash-alt"></i></button>';

 $sub_array[] = '';

 $data[] = $sub_array;
}
//
function get_all_data($conn) {
 $query = "SELECT * FROM personnel";
 $result = mysqli_query($conn, $query);
 return mysqli_num_rows($result);
}
//
$output = array(
 "draw"    => intval($_POST["draw"]),
 "recordsTotal"  =>  get_all_data($conn),
 "recordsFiltered" => $number_filter_row,
 "data"    => $data
);

echo json_encode($output);

?>

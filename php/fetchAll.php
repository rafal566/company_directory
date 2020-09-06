<?php

include ("config.php");

$executionStartTime = microtime(true);

header('Content-Type: application/json; charset=UTF-8');

$conn = mysqli_connect($cd_host, $cd_user, $cd_socket, $cd_dbname, $cd_port, $cd_password);
// $conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);
//if connection error occur
if (mysqli_connect_errno())
{

    $output['status']['code'] = "300";
    $output['status']['name'] = "failure";
    $output['status']['description'] = "database unavailable";
    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
    $output['data'] = [];

    mysqli_close($conn);

    echo json_encode($output);

    exit;

}

//search
$columns = array(
    'firstName',
    'lastName',
    'jobTitle',
    'email',
    'department',
    'location'
);

$query = 'SELECT p.id, p.firstName, p.lastName, p.jobTitle, p.email, d.name as department, l.name as location FROM personnel p LEFT JOIN department d ON (d.id = p.departmentID) LEFT JOIN location l ON (l.id = d.locationID)';

if (isset($_POST["search"]["value"]))
{
    $query .= '
  WHERE p.firstName LIKE "%' . $_POST["search"]["value"] . '%"
  OR p.lastName LIKE "%' . $_POST["search"]["value"] . '%"
  OR p.jobTitle LIKE "%' . $_POST["search"]["value"] . '%"
  OR p.email LIKE "%' . $_POST["search"]["value"] . '%"
  OR d.name LIKE "%' . $_POST["search"]["value"] . '%"
  OR l.name LIKE "%' . $_POST["search"]["value"] . '%"
  ';
}

if (isset($_POST["order"]))
{
    $query .= 'ORDER BY ' . $columns[$_POST['order']['0']['column']] . ' ' . $_POST['order']['0']['dir'] . '
 ';
}
else
{
    $query .= 'ORDER BY id DESC ';
}

$query1 = '';

if ($_POST["length"] != - 1)
{
    $query1 = 'LIMIT ' . $_POST['start'] . ', ' . $_POST['length'];
}

$number_filter_row = mysqli_num_rows(mysqli_query($conn, $query));

$result = $conn->query($query . $query1);

//if no results
if (!$result)
{

    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "query failed";
    $output['data'] = [];

    mysqli_close($conn);

    echo json_encode($output);

    exit;

}

$data = [];

while ($row = mysqli_fetch_array($result))
{

    // array_push($data, $row);
    $sub_array = [];

    $sub_array[] = $row["firstName"];
    $sub_array[] = $row["lastName"];
    $sub_array[] = $row["jobTitle"];
    $sub_array[] = $row["email"];
    $sub_array[] = $row["department"];
    $sub_array[] = $row["location"];
    $sub_array[] = '<button type="button" class="btn btn-warning update" id="' . $row["id"] . '"><i class="fas fa-pen-alt"></i></button><button type="button" name="remove_record" class="btn btn-danger delete" id="' . $row["id"] . '"><i class="fas fa-trash-alt"></i></button>';

    $sub_array[]['status']['code'] = ["200"];
    $sub_array[]['status']['name'] = "ok";
    $sub_array[]['status']['description'] = "success";
    $sub_array[]['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";

    $sub_array[] = '';

    $data[] = $sub_array;
}

// $subarray = $data;
// $subarray['status']['code'] = "200";
// $subarray['status']['name'] = "ok";
// $subarray['status']['description'] = "success";
// $subarray['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
//
function get_all_data($conn)
{
    $query = "SELECT * FROM personnel";
    $result = mysqli_query($conn, $query);
    return mysqli_num_rows($result);
}
//
$output = array(
    "draw" => intval($_POST["draw"]) ,
    "recordsTotal" => get_all_data($conn) ,
    "recordsFiltered" => $number_filter_row,
    "data" => $data,
);

mysqli_close($conn);

echo json_encode($output);

?>

<?php
include ("config.php");

$executionStartTime = microtime(true);

header('Content-Type: application/json; charset=UTF-8');

$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

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

$firstName = $conn->real_escape_string($_POST['firstName']);
$lastName = $conn->real_escape_string($_POST['lastName']);
$jobTitle = $conn->real_escape_string($_POST['jobTitle']);
$email = $conn->real_escape_string($_POST['email']);
$temp_department = $_POST['departmentID'];
$department = (int)$temp_department;

if (isset($_POST["operation"]))
{

    if ($_POST["operation"] == "Add")
    {

        $result = $conn->query("SELECT id FROM personnel WHERE email = '$email'");

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

        if ($result->num_rows > 0)
        {

            $output['status']['code'] = "200";
            $output['status']['name'] = "ok";
            $output['status']['description'] = "Record exists";
            $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
            $output['data'] = [];

            mysqli_close($conn);

            echo json_encode($output);

        }
        else
        {

            $query = "INSERT INTO personnel (firstName, lastName, jobTitle, email, departmentID) VALUES (
            '$firstName', '$lastName', '$jobTitle', '$email', '$department')";

            $result = $conn->query($query);

            $lastID = $conn->insert_id;

            $output['status']['code'] = "200";
            $output['status']['name'] = "ok";
            $output['status']['description'] = "Record added";
            $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
            $output['data'] = [];

            mysqli_close($conn);

            echo json_encode($output);
        };

    }

    if ($_POST["operation"] == "Edit")
    {
        $rowID = $conn->real_escape_string($_POST['userID']);

        $query = "UPDATE personnel SET firstName='$firstName', lastName='$lastName', jobTitle='$jobTitle',
      email='$email', departmentID='$department' WHERE id = " . $rowID;
        $result = $conn->query($query);

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

        $output['status']['code'] = "200";
        $output['status']['name'] = "ok";
        $output['status']['description'] = "Record updated";
        $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
        $output['data'] = [];

        mysqli_close($conn);

        echo json_encode($output);
    }

}

?>

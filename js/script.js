//jshint esversion:6
$(document).ready(function() {

  $('#addButton').click(function() {
    $('#userForm')[0].reset();
    $('.modal-title').text("Add");
    $('#submitButton').val("Save");
    $('#operation').val("Add");
  });


  // get Table
  let dataTable = $('#userData').DataTable({
    "scrollY": "50vh",
    "scrollCollapse": true,
    "paging": false,
    "autoWidth": true,
    "language": {searchPlaceholder: "Search records"},
    "serverSide": true,
    "order": [],
    "ajax": {
      url: "./php/fetchAll.php",
      method: "POST",
      // success: function(response){
      //   console.log(response['data']);
      // }
    },
    //     "columns": [
    //     // { "data": "id" },
    //     { "data": "firstName" },
    //     { "data": "lastName" },
    //     { "data": "jobTitle" },
    //     { "data": "email" },
    //     { "data": "department" },
    //     { "data": "location" },
    //     // { "data": "action" }
    // ],
    "columnDefs": [{
      "targets": [6],
      "orderable": false,
    }, ],
    "initComplete": function() {
      $('div.dataTables_filter input').focus();
    },
  });


  //Add and Edit
  $(document).on('submit', '#userForm', function(event) {
    event.preventDefault();
    let firstName = $("#firstName");
    let lastName = $("#lastName");
    let jobTitle = $("#jobTitle");
    let email = $("#email");
    let departmentID = $("#departmentID");
    let editRowID = $("#userID");
    let operation = $("#operation");
    $.ajax({
      url: "./php/insert.php",
      method: 'POST',
      contentType: false,
      processData: false,
      data: new FormData(this),
      success: function(response) {
        console.log(response);
        showMessage(response['status']['description']);
        $('#userForm')[0].reset();
        $('#employeeModal').modal('hide');
        dataTable.ajax.reload();
      }
    });
  });


  // Delete
  $(document).on('click', '.delete', function() {
    $('#confirm-delete').modal('show');
    $('.modal-title').text("Delete");
    let userID = $(this).attr("id");
    $("#delete_record").on('click', function() {
      $.ajax({
        url: "./php/delete.php",
        method: "POST",
        data: {
          userID: userID
        },
        success: function(response) {
          showMessage(response['status']['description']);
          dataTable.ajax.reload();
        }
      });
    });
  });


  //Update
  $(document).on('click', '.update', function() {
    var userID = $(this).attr("id");
    $.ajax({
      url: "./php/update.php",
      method: "POST",
      dataType: "json",
      data: {
        userID: userID
      },
      success: function(data) {
        console.log(data['status']);
        $('#employeeModal').modal('show');
        $('#firstName').val(data['data']['firstName']);
        $('#lastName').val(data['data']['lastName']);
        $('#jobTitle').val(data['data']['jobTitle']);
        $('#email').val(data['data']['email']);
        $('#departmentID').val(data['data']['departmentID']);
        $('.modal-title').text("Edit");
        $('#userID').val(userID);
        $('#submitButton').val("Save");
        $('#operation').val("Edit");
      }
    });
  });
});


//output message
function showMessage(message) {
  $('#info_message').html(message);
  $('#message').modal('show');
}

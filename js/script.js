//jshint esversion:6
$(document).ready(function() {

  $('#addButton').click(function() {
    $('#userForm')[0].reset();
    $('.modal-title').text("Add");
    $('#submitButton').val("Add");
    $('#operation').val("Add");
  });


  // get Table
  let dataTable = $('#userData').DataTable({
    // "bPaginate":true,
    // "sPaginationType":"full_numbers",
    // "bLengthChange": true,
    "lengthMenu": [
      [10, 25, 50, -1],
      [10, 25, 50, "All"]
    ],
    "autoWidth": false,
    "serverSide": true,
    "order": [],
    "ajax": {
      url: "./php/fetchAll.php",
      method: "POST",
    },
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
        $('#message').html(response);
        $('#userForm')[0].reset();
        $('#employeeModal').modal('hide');
        dataTable.ajax.reload();
      }
    });
  });


  // Delete
  $(document).on('click', '.delete', function() {
    let userID = $(this).attr("id");
    if (confirm("Do you want to delet that record?")) {
      $.ajax({
        url: "./php/delete.php",
        method: "POST",
        data: {
          userID: userID
        },
        success: function(response) {
          $('#message').html(response);
          dataTable.ajax.reload();
        }
      });
    } else {
      return false;
    }
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
        $('#employeeModal').modal('show');
        $('#firstName').val(data['firstName']);
        $('#lastName').val(data['lastName']);
        $('#jobTitle').val(data['jobTitle']);
        $('#email').val(data['email']);
        $('#departmentID').val(data['departmentID']);
        $('.modal-title').text("Edit");
        $('#userID').val(userID);
        $('#submitButton').val("Edit");
        $('#operation').val("Edit");
      }
    });
  });
});



$(document).ready(function () {
  $('#registerBtn').prop("disabled", true);
  deleteData('user');
});


$('#loginBtn').click(function () {
  // alert('submit')

  var username = $('#username-login').val();
  var password = $('#password-login').val()

  var formData = {
    'username': username,
    'password': password
  }

  console.log(formData);

  $.ajax({
    type: "POST",
    url: 'http://localhost:5000/login',
    data: formData,
    success: function(data) {
      if (!data['valid']) {
        alert('The username or password entered is incorrect')
      } else {
        setData('user', JSON.stringify(data))
        location.assign("E:/python_projects/frontend/views/home.html");
      }
    },
   error: function(error) {
     console.log(error);
   },
   dataType: 'json'
  });

});

$('#username').focusout(function () {

  var uname = $(this).val();
  console.log(uname);

  data = {
    'username': uname
  }

  $.ajax({
    type: "POST",
    url: 'http://localhost:5000/user/check',
    data: data,
    success: function(data) {
      if (!data['valid']) {
        // Username is already taken
        $('#username').addClass('err');
        $('#takenuser').addClass('showelem');
        $('#registerBtn').prop("disabled", true);
      } else {
        $('#username').removeClass('err');
        $('#takenuser').removeClass('showelem')
      }
    },
   error: function(error) {
     console.log(error);
   },
   dataType: 'json'
  });

});




$('#password-confirm').keyup(function () {
  var val = $(this).val();
  var pass = $('#password').val();

  if (val == pass) {
    $('#matchpass').removeClass('showelem');
    $('#registerBtn').prop("disabled", false);
  } else {
    $('#matchpass').addClass('showelem');
    $('#registerBtn').prop("disabled", true);
  }

});





$('#registerBtn').click(function () {
  // alert('submit')

    var username = $('#username').val();
    var password = $('#password').val();
    var email = $('#email').val();

    if (username && password && email) {

          var formData = {
            'username': username,
            'email': email,
            'password': password,
          }

          console.log(formData);

          $.ajax({
            type: "POST",
            url: 'http://localhost:5000/user/add',
            data: formData,
            success: function(data) {
              setData('user', JSON.stringify({'valid': username}));
              location.assign("E:/python_projects/frontend/views/home.html");
            },
           error: function(error) {
             console.log(error);
           },
           dataType: 'json'
          });

    } else {

      alert('Please check if all the fields are filled');

    }

});





$('#email').keyup(function() {
  var value = $(this).val().trim();
  var re = /\S+@\S+\.\S+/;
  console.log(value);
  // console.log(value);
  if (!re.test(value)) {
    $('#emailvalid').addClass('showelem');
    $('#registerBtn').prop("disabled", true);
  } else {
    $('#emailvalid').removeClass('showelem');
    $('#registerBtn').prop("disabled", false);
  }
});










//

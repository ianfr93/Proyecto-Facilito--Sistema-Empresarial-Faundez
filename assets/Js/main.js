function validateForm() {

  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirmPassword').value;
  var email = document.getElementById('email').value;


  resetErrorMessages(); 

 

  if (!username) {
      document.getElementById('usernameError').innerText = 'Por favor, ingresa tu nombre de usuario.';
  }

  if (!password) {
      document.getElementById('passwordError').innerText = 'Por favor, ingresa tu contraseña.';
  }

  if (!confirmPassword) {
      document.getElementById('confirmPasswordError').innerText = 'Por favor, confirma tu contraseña.';
  }

  if (!email) {
      document.getElementById('emailError').innerText = 'Por favor, ingresa tu dirección de correo electrónico.';
  }

 



  // Si hay algún mensaje de error, detener el proceso
  if (document.querySelector('.error-message').innerText) {
      return;
  }

  // Aquí puedes agregar la lógica para enviar los datos al servidor o hacer otras acciones
  alert('Registro exitoso!');
}

function resetErrorMessages() {
  // Reiniciar todos los mensajes de error
  var errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(function (element) {
      element.innerText = '';
  });
}
  
// aca es para el icono del ojo en los campos de contraseña para activar y desactivar
function togglePassword() {
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.querySelector(".password-toggle i");

  if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.classList.remove("fa-eye");
      eyeIcon.classList.add("fa-eye-slash");
  } else {
      passwordInput.type = "password";
      eyeIcon.classList.remove("fa-eye-slash");
      eyeIcon.classList.add("fa-eye");
  }
}

$(document).ready(function () {
  var tableId = '#table-id';
  $('#maxRows').trigger('change');

  $('#maxRows').on('change', function () {
      $('.pagination').html('');
      var trnum = 0;
      var maxRows = parseInt($(this).val());

      var totalRows = $(tableId + ' tbody tr').length;

      $(tableId + ' tr:gt(0)').each(function () {
          trnum++;
          if (trnum > maxRows) {
              $(this).hide();
          }
          if (trnum <= maxRows) {
              $(this).show();
          }
      });

      if (totalRows > maxRows) {
          var pagenum = Math.ceil(totalRows / maxRows);

          for (var i = 1; i <= pagenum;) {
              $('.pagination').append('<li data-page="' + i + '">\
                  <span>' + i + '<span class="sr-only">(current)</span></span>\
              </li>');
              i++;
          }
      }

      $('.pagination li:first-child').addClass('active');
      showig_rows_count(maxRows, 1, totalRows);
  });

  $('.pagination li').on('click', function (e) {
      e.preventDefault();
      var pageNum = $(this).attr('data-page');
      var trIndex = 0;
      $('.pagination li').removeClass('active');
      $(this).addClass('active');

      $(tableId + ' tr:gt(0)').each(function () {
          trIndex++;
          if (trIndex > (maxRows * pageNum) || trIndex <= ((maxRows * pageNum) - maxRows)) {
              $(this).hide();
          } else {
              $(this).show();
          }
      });
  });

  default_index();
});

function showig_rows_count(maxRows, pageNum, totalRows) {
  var end_index = maxRows * pageNum;
  var start_index = ((maxRows * pageNum) - maxRows) + 1;
  var string = 'Showing ' + start_index + ' to ' + end_index + ' of ' + totalRows + ' entries';
  $('.rows_count').html(string);
}

function default_index() {
  $('table tr:eq(0)').prepend('<th> ID </th>');

  var id = 0;

  $('table tr:gt(0)').each(function () {
      id++;
      $(this).prepend('<td>' + id + '</td>');
  });
}

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
  var itemsPerPage = 10;
  var originalRows;
  var rowsCount;
  var pageCount;
  var rows;

  function initializePagination() {
      $('#table-id').after('<div id="pagination-container"></div>');
      rows = $('#table-id tbody tr');
      originalRows = rows.clone();
      rowsCount = rows.length;
      pageCount = Math.ceil(rowsCount / itemsPerPage);

      $('#pagination-container').twbsPagination({
          totalPages: pageCount,
          visiblePages: 5,
          onPageClick: function (event, page) {
              var startIndex = (page - 1) * itemsPerPage;
              var endIndex = startIndex + itemsPerPage;

              rows.hide();
              rows.slice(startIndex, endIndex).show();

              var currentCount = Math.min(itemsPerPage, rowsCount - startIndex);
              var totalCount = rowsCount;
              $('.rows_count').text('Showing ' + (startIndex + 1) + ' to ' + (startIndex + currentCount) + ' of ' + totalCount + ' entries');
          }
      });
  }

  $('.btn-tertiary').on('click', function () {
    // Obtener valores de los filtros
    var identificationValue = $('#identification').val();
    var statusValue = $('#status').val();

    // Filtrar las filas según los valores seleccionados
    var filteredRows = originalRows.filter(function () {
        var rowIdentification = $(this).find('td:eq(0)').text();
        var rowStatus = $(this).find('td:eq(2)').text(); // Ajustar el índice según la columna de estado

        return (identificationValue === '' || rowIdentification.includes(identificationValue)) &&
               (statusValue === '' || rowStatus === statusValue);
    });

    // Actualizar las filas en la tabla
    rows.hide();
    filteredRows.slice(0, itemsPerPage).show();

    // Actualizar la paginación
    var filteredRowsCount = filteredRows.length;
    var filteredPageCount = Math.ceil(filteredRowsCount / itemsPerPage);
    $('#pagination-container').twbsPagination('destroy');
    $('#pagination-container').twbsPagination({
        totalPages: filteredPageCount,
        visiblePages: 5,
        onPageClick: function (event, page) {
            var startIndex = (page - 1) * itemsPerPage;
            var endIndex = startIndex + itemsPerPage;

            // Mostrar solo las filas de la página actual
            filteredRows.slice(startIndex, endIndex).show();

            // Actualizar el mensaje de conteo de filas
            var currentCount = Math.min(itemsPerPage, filteredRowsCount - startIndex);
            $('.rows_count').text('Showing ' + (startIndex + 1) + ' to ' + (startIndex + currentCount) + ' of ' + filteredRowsCount + ' entries');
        }
    });
  });

  // Initialize pagination
  initializePagination();

  // Evento de envío del formulario de filtrado
  $('#filtrar-form').on('submit', function (event) {
      event.preventDefault(); // Evitar el envío del formulario
      applyFilters();
  });
});

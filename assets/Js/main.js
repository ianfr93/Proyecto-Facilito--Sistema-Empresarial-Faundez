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
  // Número de elementos por página
  var itemsPerPage = 10;

  // Inicializa la paginación
  $('#table-id').after('<div id="pagination-container"></div>');
  var rows = $('#table-id tbody tr');
  var originalRows = rows.clone(); // Copia las filas originales para su posterior restauración
  var rowsCount = rows.length;
  var pageCount = Math.ceil(rowsCount / itemsPerPage);

  $('#pagination-container').twbsPagination({
      totalPages: pageCount,
      visiblePages: 5, // Puedes ajustar este valor según tus preferencias
      onPageClick: function (event, page) {
          var startIndex = (page - 1) * itemsPerPage;
          var endIndex = startIndex + itemsPerPage;

          // Oculta todas las filas
          rows.hide();

          // Muestra solo las filas de la página actual
          rows.slice(startIndex, endIndex).show();

          // Actualiza el mensaje de conteo de filas
          var currentCount = Math.min(itemsPerPage, rowsCount - startIndex);
          var totalCount = rowsCount;
          $('.rows_count').text('Showing ' + (startIndex + 1) + ' to ' + (startIndex + currentCount) + ' of ' + totalCount + ' entries');
      }
  });

  // Evento de click en el botón de buscar
  $('.btn-tertiary').on('click', function () {
      var identificationValue = $('#identification').val();
      var statusValue = $('#status').val();

      // Restaura las filas originales
      rows = originalRows.clone();

      // Filtra las filas según los valores seleccionados
      rows = rows.filter(function () {
          var rowIdentification = $(this).find('td:eq(0)').text(); // Ajusta el índice según la columna de identificación
          var rowStatus = $(this).find('td:eq(1)').text(); // Ajusta el índice según la columna de estado

          return (identificationValue === 'Rut-empresa' && rowIdentification.includes('Rut')) ||
                 (identificationValue === 'otro' && !rowIdentification.includes('Rut')) ||
                 (statusValue === 'activo' && rowStatus === 'Activo') ||
                 (statusValue === 'inactivo' && rowStatus === 'Inactivo') ||
                 (statusValue === 'migracion' && rowStatus === 'Migración');
      });

      // Actualiza las filas visibles según los filtros
      rows.hide();
      rows.slice(0, itemsPerPage).show();

      // Actualiza la paginación
      var filteredRowsCount = rows.length;
      var filteredPageCount = Math.ceil(filteredRowsCount / itemsPerPage);
      $('#pagination-container').twbsPagination('destroy');
      $('#pagination-container').twbsPagination({
          totalPages: filteredPageCount,
          visiblePages: 5,
          onPageClick: function (event, page) {
              var startIndex = (page - 1) * itemsPerPage;
              var endIndex = startIndex + itemsPerPage;

              // Muestra solo las filas de la página actual
              rows.slice(startIndex, endIndex).show();

              // Actualiza el mensaje de conteo de filas
              var currentCount = Math.min(itemsPerPage, filteredRowsCount - startIndex);
              $('.rows_count').text('Showing ' + (startIndex + 1) + ' to ' + (startIndex + currentCount) + ' of ' + filteredRowsCount + ' entries');
          }
      });
  });
});
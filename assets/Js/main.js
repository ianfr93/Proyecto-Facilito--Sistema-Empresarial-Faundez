function validateForm() {
  var nombre = document.getElementById('nombre').value;
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirmPassword').value;
  var email = document.getElementById('email').value;
  var confirmEmail = document.getElementById('confirmEmail').value;

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
  // Oculta la flecha de despliegue de Bootstrap al cargar la página
  $('.custom-dropdown-item').siblings('.dropdown-toggle').removeClass('dropdown-toggle');
});
function validateForm() {
  var nombre = document.getElementById('nombre').value;
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirmPassword').value;
  var email = document.getElementById('email').value;
  var confirmEmail = document.getElementById('confirmEmail').value;

  if (!nombre || !username || !password || !confirmPassword || !email || !confirmEmail) {
      alert('Por favor, completa todos los campos.');
      return;
  }

  // Aquí puedes agregar más validaciones según tus requisitos

  alert('Registro exitoso!');
  // Aquí podrías agregar la lógica para enviar los datos al servidor o hacer otras acciones
}

  // Agregar evento de clic al botón con id "acceso"
document.getElementById("acceso").addEventListener("click", function(event) {
  if (intentosRestantes > 0) {
    autenticarUsuario(event);
  }
});

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
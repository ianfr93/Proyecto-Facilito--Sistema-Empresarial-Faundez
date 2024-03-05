
  let usuarios = [
    { usuario: "usuario1", contraseña: "contraseña1" },
    { usuario: "usuario2", contraseña: "contraseña2" },
    { usuario: "usuario3", contraseña: "contraseña3" },
    { usuario: "usuario4", contraseña: "contraseña4" },
    { usuario: "usuario5", contraseña: "contraseña5" },
    { usuario: "usuario6", contraseña: "contraseña6" }
  ];

  let intentosRestantes = 4;

  // Función para autenticar al usuario
  function autenticarUsuario(event) {
    event.preventDefault();

    let nombreUsuario = document.getElementById("username").value;
    let contraseña = document.getElementById("password").value;

    let usuarioValido = usuarios.find(user => user.usuario === nombreUsuario && user.contraseña === contraseña);

    let mensajeElement = document.getElementById("mensaje");

    if (!usuarioValido) {
      intentosRestantes--;

      if (intentosRestantes > 0) {
        mensajeElement.innerHTML = `Nombre de usuario o contraseña incorrectos. Intentos restantes: ${intentosRestantes}`;
        mensajeElement.className = "error-message";
        mensajeElement.style.display = "block";
      } else {
        mensajeElement.innerHTML = "¡Se han agotado los intentos! Reinicie la sesión para intentar nuevamente.";
        resetForm();
      }
    } else {
      window.location.href = './pages/Menu-de-caja.html';
    }
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
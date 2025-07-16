function showTab(tab) {
  document.getElementById("loginForm").classList.remove("active-tab-content");
  document.getElementById("registerForm").classList.remove("active-tab-content");
  document.getElementById("loginTab").classList.remove("active-tab");
  document.getElementById("registerTab").classList.remove("active-tab");

  if (tab === 'login') {
    document.getElementById("loginForm").classList.add("active-tab-content");
    document.getElementById("loginTab").classList.add("active-tab");
  } else {
    document.getElementById("registerForm").classList.add("active-tab-content");
    document.getElementById("registerTab").classList.add("active-tab");
  }

  document.getElementById("errorMsg").textContent = "";
}

function handleLogin() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const savedUser = localStorage.getItem("usuario");
  const savedPass = localStorage.getItem("clave");

  if (user === savedUser && pass === savedPass) {
    // Redirección a la página de inicio de sesión correcta
    window.location.href = "seccioniniciada.html";
  } else {
    document.getElementById("errorMsg").textContent = "Usuario o contraseña incorrectos.";
  }
}


function handleRegister() {
  const newUser = document.getElementById("newUsername").value;
  const newPass = document.getElementById("newPassword").value;

  if (newUser && newPass) {
    localStorage.setItem("usuario", newUser);
    localStorage.setItem("clave", newPass);
    alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
    showTab('login');
  } else {
    document.getElementById("errorMsg").textContent = "Por favor, completa todos los campos.";
  }
}



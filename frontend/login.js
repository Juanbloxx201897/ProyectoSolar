// Función para mostrar el contenido de la pestaña (login o registro) y ocultar la otra
function showTab(tab) {
  // Quitar la clase que muestra contenido activo de ambos formularios
  document.getElementById("loginForm").classList.remove("active-tab-content");
  document.getElementById("registerForm").classList.remove("active-tab-content");
  // Quitar la clase activa de las pestañas para desactivar el estilo
  document.getElementById("loginTab").classList.remove("active-tab");
  document.getElementById("registerTab").classList.remove("active-tab");

  // Dependiendo del parámetro, activar el formulario y la pestaña correspondiente
  if (tab === 'login') {
    document.getElementById("loginForm").classList.add("active-tab-content");
    document.getElementById("loginTab").classList.add("active-tab");
  } else {
    document.getElementById("registerForm").classList.add("active-tab-content");
    document.getElementById("registerTab").classList.add("active-tab");
  }

  // Limpiar cualquier mensaje de error al cambiar de pestaña
  document.getElementById("errorMsg").textContent = "";
}

// 🔐 Función para manejar el login, conecta con el backend
async function handleLogin() {
  // Obtener los valores ingresados por el usuario
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  // Realizar petición POST al endpoint de login con usuario y contraseña en JSON
  const response = await fetch("http://localhost:8080/model/Usuario/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: user,
      password: pass
    })
  });

  // Leer la respuesta del servidor como texto
  const result = await response.text();

  // Si la respuesta es exitosa, redirigir a la sección iniciada
  if (result === "Login correcto") {
    window.location.href = "seccioniniciada.html";
  } else {
    // Si hay error, mostrar mensaje de error en la página
    document.getElementById("errorMsg").textContent = "Usuario o contraseña incorrectos.";
  }
}

// 📝 Función para manejar el registro de nuevos usuarios en backend
async function handleRegister() {
  // Obtener los valores ingresados para usuario y contraseña nuevos
  const newUser = document.getElementById("newUsername").value;
  const newPass = document.getElementById("newPassword").value;

  // Validar que ambos campos estén completos
  if (!newUser || !newPass) {
    document.getElementById("errorMsg").textContent = "Por favor, completa todos los campos.";
    return; // Detener ejecución si falta algún campo
  }

  // Realizar petición POST al endpoint de registro con los datos nuevos
  const response = await fetch("http://localhost:8080/model/Usuario/registro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: newUser,
      password: newPass
    })
  });

  // Leer la respuesta del servidor como texto
  const result = await response.text();

  // Analizar la respuesta para saber qué mostrar al usuario
  if (result === "Registro exitoso") {
    alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
    showTab('login'); // Volver a la pestaña de login para que inicie sesión
  } else if (result === "Usuario ya existe") {
    // Mostrar error si el usuario ya está registrado
    document.getElementById("errorMsg").textContent = "El usuario ya existe.";
  } else {
    // Mostrar error genérico si ocurrió algún otro problema
    document.getElementById("errorMsg").textContent = "Error al registrar. Intenta nuevamente.";
  }
}
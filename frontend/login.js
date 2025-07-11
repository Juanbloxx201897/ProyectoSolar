function handleAction() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('errorMsg');

    // Validaciones básicas
    if (!username || !password) {
        errorMsg.textContent = "Por favor completa todos los campos.";
        return;
    }

    // Validación de la contraseña
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        errorMsg.textContent = "La contraseña debe tener al menos 8 caracteres, incluyendo una letra y un número.";
        return;
    }

    const url = isLogin
        ? "http://localhost:8080/model/Usuario/login"
        : "http://localhost:8080/model/Usuario/registro";

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error en la petición");
        }
        return response.text();
    })
    .then(data => {
        if (isLogin) {
            if (data === "Login correcto") {
                window.location.href = "seccioniniciada.html"; // Redirige a la página principal
            } else {
                errorMsg.textContent = "Usuario o contraseña incorrectos.";
            }
        } else {
            if (data === "Registro exitoso") {
                errorMsg.textContent = "¡Registro exitoso! Ahora puedes iniciar sesión.";
                toggleForm();
            } else {
                errorMsg.textContent = data; // Por ejemplo: "Usuario ya existe"
            }
        }
    })
    .catch(error => {
        console.error("Error al conectar con el servidor:", error);
        errorMsg.textContent = "Error al conectar con el servidor.";
    });
}
let isLogin = true; // esta variable controla si estás en modo login o registro

function toggleForm() {
    const formTitle = document.getElementById("formTitle");
    const actionBtn = document.getElementById("actionBtn");
    const switchMsg = document.querySelector(".switch-msg");
    const errorMsg = document.getElementById("errorMsg");

    isLogin = !isLogin; // cambia el estado

    if (isLogin) {
        formTitle.textContent = "Iniciar Sesión";
        actionBtn.textContent = "Ingresar";
        switchMsg.innerHTML = '¿No tienes cuenta? <a href="#" onclick="toggleForm()">Regístrate</a>';
    } else {
        formTitle.textContent = "Registrarse";
        actionBtn.textContent = "Registrar";
        switchMsg.innerHTML = '¿Ya tienes cuenta? <a href="#" onclick="toggleForm()">Inicia Sesión</a>';
    }

    errorMsg.textContent = ""; // limpia errores anteriores
}


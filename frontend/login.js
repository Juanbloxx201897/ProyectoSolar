let isLogin = true; // true = Login, false = Registro

// Cambiar entre Login y Registro
function toggleForm() {
    isLogin = !isLogin;
    document.getElementById('formTitle').textContent = isLogin ? 'Iniciar Sesión' : 'Registro';
    document.getElementById('actionBtn').textContent = isLogin ? 'Ingresar' : 'Registrarse';
    document.querySelector('.switch-msg').innerHTML = isLogin
        ? '¿No tienes cuenta? <a href="#" onclick="toggleForm()">Regístrate</a>'
        : '¿Ya tienes cuenta? <a href="#" onclick="toggleForm()">Inicia Sesión</a>';
    document.getElementById('errorMsg').textContent = '';
}

// Acción principal: Login o Registro
function handleAction() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('errorMsg');

    if (!username || !password) {
        errorMsg.textContent = "Por favor completa todos los campos.";
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
                window.location.href = "index.html"; // Redirige a la página principal
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

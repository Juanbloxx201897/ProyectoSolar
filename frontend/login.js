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

    // Obtener usuarios guardados
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (isLogin) {
        // --- Login ---
        const userFound = users.find(user => user.username === username && user.password === password);

        if (userFound) {
            errorMsg.textContent = "";
            window.location.href = "index.html"; // Redirigir al inicio
        } else {
            errorMsg.textContent = "Usuario o contraseña incorrectos.";
        }
    } else {
        // --- Registro ---
        const userExists = users.some(user => user.username === username);

        if (userExists) {
            errorMsg.textContent = "El nombre de usuario ya está registrado.";
        } else {
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            errorMsg.textContent = "¡Registro exitoso! Ahora puedes iniciar sesión.";
            toggleForm(); // Cambiar al formulario de login
        }
    }
}

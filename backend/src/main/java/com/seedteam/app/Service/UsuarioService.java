package com.seedteam.app.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seedteam.app.model.Usuario;
import com.seedteam.app.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public boolean registrarUsuario(String username, String password) {
        if (usuarioRepository.existsByUsername(username)) {
            return false; // ya existe
        }

        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setUsername(username);
        nuevoUsuario.setPassword(password); // ⚠️ En producción, cifra esto
        usuarioRepository.save(nuevoUsuario);
        return true;
    }

    public boolean validarLogin(String username, String password) {
        return usuarioRepository.findByUsernameAndPassword(username, password) != null;
    }
}

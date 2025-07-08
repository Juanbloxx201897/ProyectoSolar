package com.seedteam.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seedteam.app.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByUsernameAndPassword(String username, String password);
    boolean existsByUsername(String username);
}

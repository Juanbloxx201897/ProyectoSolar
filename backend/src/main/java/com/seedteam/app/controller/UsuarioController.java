package com.seedteam.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seedteam.app.Service.UsuarioService;
import com.seedteam.app.model.Usuario;

@RestController
@RequestMapping("/model/Usuario")
@CrossOrigin(origins = "*")
public class UsuarioController {


    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/registro")
    public String registrar(@RequestBody Usuario usuario) {
        boolean registrado = usuarioService.registrarUsuario(usuario.getUsername(), usuario.getPassword());
        return registrado ? "Registro exitoso" : "Usuario ya existe";
    }

    @PostMapping("/login")
    public String login(@RequestBody Usuario usuario) {
        boolean valido = usuarioService.validarLogin(usuario.getUsername(), usuario.getPassword());
        return valido ? "Login correcto" : "Credenciales inválidas";
    }
}


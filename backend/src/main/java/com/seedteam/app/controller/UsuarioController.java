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
@CrossOrigin(origins = "http://localhost:5500", allowCredentials = "false")
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
        try {
            System.out.println("➡️ Login intentado con: " + usuario.getUsername() + " / " + usuario.getPassword());
            boolean valido = usuarioService.validarLogin(usuario.getUsername(), usuario.getPassword());
            return valido ? "Login correcto" : "Credenciales inválidas";
        } catch (Exception e) {
            e.printStackTrace(); // <-- Esto imprimirá la causa real del error en consola
            return "Error en el servidor: " + e.getMessage();
        }
    }
    
}


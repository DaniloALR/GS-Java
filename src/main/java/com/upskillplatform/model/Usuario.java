package com.upskillplatform.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(name = "area_atuacao", length = 100)
    private String areaAtuacao;

    @Column(name = "nivel_carreira", length = 50)
    private String nivelCarreira;

    @Column(name = "data_cadastro", nullable = false)
    private LocalDate dataCadastro;

    public Usuario() {
        this.dataCadastro = LocalDate.now();
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getAreaAtuacao() { return areaAtuacao; }
    public void setAreaAtuacao(String areaAtuacao) { this.areaAtuacao = areaAtuacao; }
    public String getNivelCarreira() { return nivelCarreira; }
    public void setNivelCarreira(String nivelCarreira) { this.nivelCarreira = nivelCarreira; }
    public LocalDate getDataCadastro() { return dataCadastro; }
    public void setDataCadastro(LocalDate dataCadastro) { this.dataCadastro = dataCadastro; }
}
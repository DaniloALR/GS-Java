package com.upskillplatform.controller;

import com.upskillplatform.model.Trilha;
import com.upskillplatform.repository.TrilhaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/trilhas")
@CrossOrigin(origins = "*")
public class TrilhaController {

    @Autowired
    private TrilhaRepository trilhaRepository;

    @GetMapping
    public List<Trilha> listarTrilhas() {
        return trilhaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Trilha> criarTrilha(@RequestBody Trilha trilha) {
        try {
            Trilha trilhaSalva = trilhaRepository.save(trilha);
            return ResponseEntity.ok(trilhaSalva);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trilha> buscarTrilha(@PathVariable Long id) {
        Optional<Trilha> trilha = trilhaRepository.findById(id);
        return trilha.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Trilha> atualizarTrilha(@PathVariable Long id, @RequestBody Trilha trilhaAtualizada) {
        try {
            if (!trilhaRepository.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            trilhaAtualizada.setId(id);
            Trilha trilhaSalva = trilhaRepository.save(trilhaAtualizada);
            return ResponseEntity.ok(trilhaSalva);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirTrilha(@PathVariable Long id) {
        try {
            if (!trilhaRepository.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            trilhaRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
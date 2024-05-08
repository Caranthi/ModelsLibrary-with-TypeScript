package com.modelsLibrary.controller;

import com.modelsLibrary.model.Model;
import com.modelsLibrary.repo.Repository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
public class ModelController {
    @Autowired
    private Repository repository;

    @GetMapping("/")
    public List<Model> getAllModels() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Model> getModelById(@PathVariable(value = "id") Integer ID) {
        Model model = repository.findById(ID).orElseThrow();
        return ResponseEntity.ok().body(model);
    }

    @PostMapping("/")
    public ResponseEntity<String> createModel(@Valid @RequestBody Model model) {
        if (Objects.equals(model.getSpecies(), "")) {
            return ResponseEntity.badRequest().body("Species cannot be empty!");
        }
        if (Objects.equals(model.getColour(), "")) {
            return ResponseEntity.badRequest().body("Colour cannot be empty!");
        }
        if (model.getWeight() <= 0) {
            return ResponseEntity.badRequest().body("Weight must be greater than 0");
        }

        repository.save(model);
        return ResponseEntity.ok().body(model.toString());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteModel(@PathVariable(value = "id") Integer Id) {
        Model model = repository.findById(Id).orElseThrow();
        repository.delete(model);
        return ResponseEntity.ok().body("Deleted record " + Id);
    }

    @DeleteMapping("/")
    public ResponseEntity<String> deleteAll() {
        repository.deleteAll();
        return ResponseEntity.ok().body("Deleted all records");
    }

    // not actually used in the app
    @PutMapping("/{id}")
    public ResponseEntity<Model> updateModel(@PathVariable(value = "id") Integer id, @Valid @RequestBody Model newModel) {
        Model oldModel = repository.findById(id).orElseThrow();
        oldModel.setSpecies(newModel.getSpecies());
        oldModel.setColour(newModel.getColour());
        oldModel.setFirstAppearance(newModel.getFirstAppearance());
        oldModel.setWeight(newModel.getWeight());
        Model updatedModel = repository.save(oldModel);
        return ResponseEntity.ok(updatedModel);
    }
}

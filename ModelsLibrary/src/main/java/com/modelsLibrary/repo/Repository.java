package com.modelsLibrary.repo;

import com.modelsLibrary.model.Model;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Repository extends JpaRepository<Model, Integer> { // JpaRepository gives access to API methods
}

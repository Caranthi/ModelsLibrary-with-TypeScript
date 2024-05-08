package com.modelsLibrary.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Models")
@NoArgsConstructor
@Getter
@Setter
public class Model {
    @Id
    @GeneratedValue
    @Column
    private int id;
    @Column
    private String species;
    @Column
    private String colour;
    @Column
    private int firstAppearance;
    @Column
    private int weight;

    public Model(String species, String colour, int firstAppearance, int weight) {
        this.species = species;
        this.colour = colour;
        this.firstAppearance = firstAppearance;
        this.weight = weight;
    }

    @Override
    public String toString() {
        return "Model{" +
                "id='" + id + '\'' +
                "species='" + species + '\'' +
                ", colour='" + colour + '\'' +
                ", firstAppearance=" + firstAppearance +
                ", weight=" + weight +
                '}';
    }
}

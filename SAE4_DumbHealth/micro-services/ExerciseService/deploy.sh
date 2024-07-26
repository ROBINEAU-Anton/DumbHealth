#!/bin/bash
echo "Build Podman file to create exercise-service image"
podman build -t exercise-service -f $PWD/Podmanfile
echo "Starting container at name ExerciseService"
podman run -dit --replace --name ExerciseService -p 5000:8080 exercise-service


#!/bin/bash
echo "Build Podman file to create nutrition-service image"
podman build -t nutrition-service -f $PWD/Podmanfile
echo "Starting container at name NutritionService"
podman run -dit --replace --name NutritionService -p 5001:8080 nutrition-service


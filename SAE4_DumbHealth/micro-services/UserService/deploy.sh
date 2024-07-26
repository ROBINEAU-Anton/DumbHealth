#!/bin/bash
echo "Build Podman file to create user-service image"
podman build -t user-service -f $PWD/Podmanfile
echo "Starting container at name UserService"
podman run -dit --replace --name UserService -p 5002:8080 user-service


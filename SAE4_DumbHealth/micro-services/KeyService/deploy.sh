#!/bin/bash
echo "Build Podman file to create key-service image"
podman build -t key-service -f $PWD/Podmanfile
echo "Starting container at name KeyService"
podman run -dit --replace --name KeyService -p 5003:8080 key-service


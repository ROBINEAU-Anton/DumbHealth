#!/bin/bash
baseUrl=http://localhost:8089/user

while true; do
    clear
    echo "Actions :"
    echo "1. Get all users"
    echo "2. Get a user by email"
    echo "3. Add a user"
    echo "0. Quit"
    # shellcheck disable=SC2162
    read -p "$ " action

    case $action in 
        1)
            curl -X GET http://localhost:8089/users
            ;;
        2)
            echo "What is the user email ?"
            read -p "$ " email
            curl -X GET $baseUrl?email=$email
            ;;
        3)
            echo "firstname ?"
            read -p "$ " fn
            echo "lastname"
            read -p "$ " ln
            echo "email ?"
            read -p "$ " email
            echo "password ?"
            read -p "$ " password
            curl -X POST -d '{"firstname": "'"$fn"'", "lastname": "'"$ln"'", "email": "'"$email"'", "password": "'"$password"'"}' -H 'Content-type: application/json' $baseUrl
            ;;
        4)
            echo "User's login to update ?"
            read -p "$ " login
            echo "New user's password"
            read -p "$ " password
            curl -X PATCH -d '{"login": "'"$login"'", "password": "'"$password"'"}' -H 'Content-type: application/json' $baseUrl
            ;;
        5)
            echo "Id to delete ?"
            read -p "$ " id
            echo "Are you sure to delete " $id " ? [y/N]"
            read -p "$ " check
            if [$check='y'] || [$check='Y']
            then 
                curl -X DELETE -d '{"id": "'"$id"'"}' -H 'Content-type: application/json' $baseUrl
            else
                echo "Stopping the delete process"
            fi
            ;;
        0)
            echo "Quit"
            break
            ;;
        *)
            echo "Unknown action"
            ;;
    esac
    echo ""
    echo "Press enter to continue"
    read
done

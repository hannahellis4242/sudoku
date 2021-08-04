#!/bin/bash

mkdir logs
node sudoku_server/dist/main.js -p 5000 > logs/sudoku_server.txt &
node webserver/dist/main.js > logs/webserver.txt &
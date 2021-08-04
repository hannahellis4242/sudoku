#!/bin/bash

root=`pwd`
echo "--------------------"
echo "building webserver"
cd webserver
npm i
npx tsc
cd $root

echo "building client"
cd client
npm i
npx webpack
cd $root

echo "building sudoku server"
cd sudoku_server
npm i
npx tsc
cd $root
echo "===================="
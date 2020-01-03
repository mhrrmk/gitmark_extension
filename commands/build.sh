#!/bin/bash

#backend build
# cd backend/
# npm run build

for dir in backend/ mainpage/ popup/
do
    cd ${dir}
    npm run build
    cd ..
done
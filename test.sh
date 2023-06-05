#!/bin/bash
for i in {1..5}
do
    printf "ITERATION %s\n" "$i"
    #    npm run single
    sleep 10
    nohup npm run test-smartui >> /dev/null 2>&1 &
    printf "==============================================\n\n"
#    sleep 1
done
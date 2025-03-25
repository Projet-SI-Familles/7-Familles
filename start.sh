#!/bin/sh

cd 7-Familles-Back
symfony serve --allow-all-ip &

cd ../7-Familles-Front
ng serve --host 0.0.0.0 --port 4200

wait

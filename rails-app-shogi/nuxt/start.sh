#!/bin/sh

if [ "${NODE_ENV}" = "production" ]
then
 yarn build && ${PORT:-3001} yarn start
else
 yarn dev -p ${PORT:-3001}
fi
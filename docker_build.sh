#!/bin/bash
docker run --rm -it \
    -v $PWD:/app \
    --name node_c1 \
    node \
    /bin/sh -c "cd /app && npm install && npm run build"
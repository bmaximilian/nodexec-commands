#!/usr/bin/env bash

cd "$(dirname "$0")"
cd ..

nodexec add:directory $(pwd)/commands

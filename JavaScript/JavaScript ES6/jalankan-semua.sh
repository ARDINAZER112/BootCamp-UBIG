#!/bin/bash
for d in */; do
  echo "=== $d ==="
  node "$d/script.js"
done

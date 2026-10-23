#!/bin/bash
for d in */; do
  [ -f "$d/index.html" ] && continue
  echo "=== $d ==="
  node "$d/script.js"
done

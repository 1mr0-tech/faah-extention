#!/bin/bash
# Trigger 1: Task failure via non-zero exit code
# Run this as a VS Code Task (see tasks.json) to trigger the "task failure" sound.
# You can also run it directly in terminal to confirm it exits with code 1.

echo "Simulating a build failure..."
sleep 1
echo "Error: compilation failed — 3 errors found"
exit 1

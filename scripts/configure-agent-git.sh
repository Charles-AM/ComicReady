#!/usr/bin/env bash
# Use the repo owner's Git identity on Cloud Agent VMs (avoids Cursor Agent as author).
set -euo pipefail

git config --local user.name "Charles Appiah Manu Jnr"
git config --local user.email "cappiahmanu@gmail.com"
git config --local commit.gpgsign false

echo "Repo git author: $(git config --local user.name) <$(git config --local user.email)>"
echo "Use: git commit --no-verify  (skips Cursor-managed co-author trailers)"

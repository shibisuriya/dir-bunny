#!/bin/zsh

function go_back() {
  dir-bunny jump-backward "$$"
}

function go_forward() {
  dir-bunny jump-forward "$$"
}

function chpwd() {
  dir-bunny push -s "$$" -p "$PWD"
}


zle -N go_back
zle -N go_forward

bindkey '^o' go_back
bindkey '^i' go_forward



function on_exit() {
  echo "Shell is exiting..." >> /tmp/dir-bunny-debug.log
}

TRAPEXIT=on_exit

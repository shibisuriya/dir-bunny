#!/bin/zsh

typeset -g previous_dir
typeset -g did_jump

previous_dir="$PWD"
did_jump=false

function go_back() {
  did_jump=true

  dir=$(dir-bunny jump-backward "$$")

  if [[ -n "$dir" ]]; then
    cd "$dir"
  fi

  zle reset-prompt
}

function go_forward() {
  did_jump=true

  dir=$(dir-bunny jump-forward "$$")

  if [[ -n "$dir" ]]; then
    cd "$dir"
  fi

  zle reset-prompt
}

zle -N go_back
zle -N go_forward

bindkey -a '^O' go_back

bindkey -a '^I' go_forward

function on_exit() {
  echo "Shell is exiting..." >> /tmp/dir-bunny-debug.log
}

function chpwd() {
    # `chpwd` is a zsh's hook that gets called when shell's current working
    # directory changes.

    if [[ $did_jump == false ]]; then
        if [[ "$PWD" != "$previous_dir" ]]; then
          dir-bunny change-directory -s "$$" -p "$previous_dir"
        fi
    fi

    did_jump=false
    previous_dir="$PWD"

}

TRAPEXIT=on_exit



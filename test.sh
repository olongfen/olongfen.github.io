#!/bin/bash

# shellcheck disable=SC1073
check() {
  if [ $? -eq 0 ];then
    echo "$1 success"
  else
    echo "$1 fail"
    exit
  fi
}

cat sdasd
check "weqwe"
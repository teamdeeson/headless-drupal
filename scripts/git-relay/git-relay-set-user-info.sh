#!/usr/bin/env bash

# Declare proper usage
usage () {
  cat << EOF
usage:
   git-relay-set-user-info.sh [OPTIONS]
   git-relay-set-user-info.sh -h

OPTIONS:
   -h,--help            : show this message
   -d,--debug           : enable debugging output
   --src-repo-path      : filesystem path to where the source repo has been checked out
   --git-username       :
   --git-email          :
EOF
}


# Set up variables
debug=0
src_repo_path=${GIT_RELAY_SRC_REPO_PATH}
git_username=${GIT_RELAY_GIT_USERNAME}
git_email=${GIT_RELAY_GIT_EMAIL}


# Parse command line options
short=hd
long=help,debug,src-repo-path::,git-username::,git-email::
args=$(getopt --options $short --longoptions $long --name "$0" -- "$@")

if [ $? -ne 0 ]; then
  usage
  exit 2
fi

eval set -- "$args"

while true; do
  case "$1" in
    -h|--help)
      usage
      exit
      ;;
    -d|--debug)
      debug=1
      shift
      ;;
    --src-repo-path)
      src_repo_path="$2"
      shift 2
      ;;
    --git-username)
      git_username="$2"
      shift 2
      ;;
    --git-email)
      git_email="$2"
      shift 2
      ;;
    --)
      shift
      break
      ;;
    *)
      echo "Programming error"
      usage
      exit 3
      ;;
  esac
done


#
# Check parameters
#

if [ "$src_repo_path" == "" ]; then
  echo 'GIT_RELAY_SRC_REPO_PATH is not defined or --src-repo-path not provided'
  exit 1;
fi

if [ ! -e "$src_repo_path" ]; then
  echo 'Git Relay source repo path does not exist'
  exit 1;
fi

if [ ! -d "$src_repo_path" ]; then
  echo 'Git Relay source repo path is not a directory'
  exit 1;
fi

cd "$src_repo_path"

# Configure Git username and email
if [ "$git_username" == "" ]; then
  echo 'GIT_RELAY_GIT_USERNAME is not defined or --git-username not provided'
  exit 1;
fi

git config user.name "$git_username"

if [ "$git_email" == "" ]; then
  echo 'GIT_RELAY_GIT_EMAIL is not defined or --git-email not provided'
  exit 1;
fi

git config user.email "$git_email"

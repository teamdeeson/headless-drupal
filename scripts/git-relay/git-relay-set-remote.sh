#!/usr/bin/env bash

# Declare proper usage
usage () {
  cat << EOF
usage:
   git-relay-set-remote.sh [OPTIONS]
   git-relay-set-remote.sh -h

OPTIONS:
   -h,--help            : show this message
   -d,--debug           : enable debugging output
   --src-repo-path      : filesystem path to where the source repo has been checked out
   --dest-repo-url      : url of destination repo
EOF
}


# Set up variables
debug=0
src_repo_path=${GIT_RELAY_SRC_REPO_PATH}
dest_repo_url=${GIT_RELAY_DEST_REPO_URL}


# Parse command line options
short=hd
long=help,debug,src-repo-path::,dest-repo-url::
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
    --dest-repo-url)
      dest_repo_url="$2"
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

# Attach destination repo remote
if [ "$dest_repo_url" == "" ]; then
  echo 'GIT_RELAY_DEST_REPO_URL is not defined or --dest-repo-url not provided'
  exit 1;
fi

git remote add relay "$dest_repo_url"

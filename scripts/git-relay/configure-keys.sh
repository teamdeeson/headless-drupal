#!/usr/bin/env bash

# Declare proper usage
usage () {
  cat << EOF

usage:
   configure-keys.sh [OPTIONS]
   configure-keys.sh -h

OPTIONS:
   -h,--help            : show this message
   -d,--debug           : enable debugging output
   --key                :
   --key-file           :
   --host               :

EOF
}


# Set up variables
debug=0
key=""
key_file=""
host=""


# Parse command line options
short=hd
long=help,debug,key:,key-file:,host:
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
    --key)
      key="$2"
      shift 2
      ;;
    --key-file)
      key_file="$2"
      shift 2
      ;;
    --host)
      host="$2"
      shift 2
      ;;
    --)
      shift
      break
      ;;
    *)
      echo "Programming error"
      exit 3
      ;;
  esac
done

full_key_file=~/.ssh/${key_file}

mkdir -p ~/.ssh

echo ${key} | base64 --decode > ${full_key_file}
chmod 600 ${full_key_file}
cat << EOF >> ~/.ssh/config

Host ${host}
    UserKnownHostsFile=/dev/null
    StrictHostKeyChecking=no
    IdentityFile=${full_key_file}

EOF

chmod 700 ~/.ssh
chmod 600 ~/.ssh/config

#!/usr/bin/env bash

usage() {
  cat << EOF

usage:
   git-relay.sh <relay-type> [tag] -- [options]
   git-relay.sh -h

OPTIONS:
   -h,--help            : show this message
   -d,--debug           : enable debugging output

EOF
}

if [ $# -lt 2 ]; then
  usage
  exit 1
fi


# Set up variables
script_path=$(dirname $0)
relay_type="$1"
tag=0

if [ "$2" = "tag" ]; then
  tag=1
elif [ "$2" = "--" ]; then
  tag=0
else
  usage
  exit 1
fi

if [ "$2" = "--" ]; then
  shift; shift
elif [ "$3" = "--" ]; then
  shift; shift; shift
else
  usage
  exit 1
fi

if [ "$relay_type" = "mirror" ] && [ "$tag" = "0" ]; then
  ${script_path}/git-relay-mirror.sh $@
elif [ "$relay_type" = "mirror" ] && [ "$tag" = "1" ]; then
  ${script_path}/git-relay-mirror-tag.sh $@
elif [ "$relay_type" = "snapshot" ] && [ "$tag" = "0" ]; then
  ${script_path}/git-relay-snapshot.sh $@
elif [ "$relay_type" = "snapshot" ] && [ "$tag" = "1" ]; then
  ${script_path}/git-relay-snapshot-tag.sh $@
elif [ "$relay_type" = "subtree-snapshot" ] && [ "$tag" = "0" ]; then
  ${script_path}/git-relay-subtree-snapshot.sh $@
elif [ "$relay_type" = "subtree-snapshot" ] && [ "$tag" = "1" ]; then
  ${script_path}/git-relay-subtree-snapshot-tag.sh $@
else
  usage
  exit 1
fi

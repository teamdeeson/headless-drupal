#!/usr/bin/env bash

# Declare proper usage
usage () {
  cat << EOF

usage:
   git-relay-subtree-snapshot-tag.sh [OPTIONS]
   git-relay-subtree-snapshot-tag.sh -h

OPTIONS:
   -h,--help            : show this message
   -d,--debug           : enable debugging output
   --src-repo-path      : filesystem path to where the source repo has been checked out
   --src-repo-subtree   :
   --dest-repo-path     :
   --dest-repo-url      : url of destination repo
   --git-username       :
   --git-email          :
   --tag-name           :

EOF
}


# Set up variables
script_path=$(dirname $0)
debug=0
src_repo_path=${GIT_RELAY_SRC_REPO_PATH}
src_repo_subtree=${GIT_RELAY_SRC_REPO_SUBTREE}
dest_repo_path=""
dest_repo_url=${GIT_RELAY_DEST_REPO_URL}
git_username=${GIT_RELAY_GIT_USERNAME}
git_email=${GIT_RELAY_GIT_EMAIL}
tag_name=""

# Parse command line options
short=hd
long=help,debug,src-repo-path::,src-repo-subtree::,dest-repo-path::,dest-repo-url::,git-username::,git-email::,tag-name::
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
    --src-repo-subtree)
      src_repo_subtree="$2"
      shift 2
      ;;
    --dest-repo-path)
      dest-repo-path="$2"
      shift 2
      ;;
    --dest-repo-url)
      dest_repo_url="$2"
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
    --tag-name)
      tag_name="$2"
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

# Jenkins CI or Bitbucket Pipelines will have already cloned our repo
# to a location on the filesystem but we must tell Git Relay where to find it
if [ "$src_repo_path" == "" ]; then
  echo 'GIT_RELAY_SRC_REPO_PATH is not defined or --src-repo-path not provided'
  exit 1
fi

if [ ! -e "$src_repo_path" ]; then
  echo 'Git Relay source repo path does not exist'
  exit 1
fi

if [ ! -d "$src_repo_path" ]; then
  echo 'Git Relay source repo path is not a directory'
  exit 1
fi

if [ "$src_repo_subtree" == "" ]; then
  echo 'GIT_RELAY_SRC_REPO_SUBTREE is not defined or --src-repo-subtree not provided'
  exit 1
fi

if [ "$(echo ${src_repo_subtree} | fgrep ..)" != "" ]; then
  echo "The path of the source repository subtree to copy must be relative and cannot contain '..'"
  exit 1
elif [ "$src_repo_subtree" == "." ]; then
  src_repo_subtree=""
fi

# Configure Git username and email
if [ "$git_username" == "" ]; then
  echo 'GIT_RELAY_GIT_USERNAME is not defined or --git-username not provided'
  exit 1
fi

if [ "$git_email" == "" ]; then
  echo 'GIT_RELAY_GIT_EMAIL is not defined or --git-email not provided'
  exit 1
fi

${script_path}/git-relay-set-user-info.sh --src-repo-path=${src_repo_path} --git-username=${git_username} --git-email=${git_email}

if [ "$dest_repo_path" == "" ]; then
  dest_repo_path=$(mktemp -d)
fi

# Attach destination repo remote
if [ "$dest_repo_url" == "" ]; then
  echo 'GIT_RELAY_DEST_REPO_URL is not defined or --dest-repo-url not provided'
  exit 1
fi

if [ "$tag_name" == "" ]; then
  echo '--tag-name not provided'
  exit 1;
fi

cd "$src_repo_path"
git_sha=$(git rev-parse HEAD)
git_original_commit_message=$(git log -1 --pretty=%B)

cd ${dest_repo_path} && git clone ${dest_repo_url} .
${script_path}/git-relay-set-user-info.sh --src-repo-path=${dest_repo_path} --git-username=${git_username} --git-email=${git_email}

git fetch origin $dest_repo_branch
git checkout ${dest_repo_branch}

src_repo_subtree_path="${src_repo_path}/${src_repo_subtree}"
rsync -rL --delete --exclude=".git" "${src_repo_subtree_path}" "${dest_repo_path}/"

git add -A .
git_message="Deploying ${git_sha}: ${git_original_commit_message}"
git commit -m "${git_message}"

git tag -m "Deploying tag: ${tag_name}" ${tag_name}
git push origin refs/tags/${tag_name} || exit 1

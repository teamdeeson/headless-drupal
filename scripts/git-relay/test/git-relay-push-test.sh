#!/usr/bin/env bash

script_path=$(dirname $0)
echo $script_path

bin_path=$(dirname $script_path)
echo $bin_path

# Setup test environment

git_relay_test_src_repo_path="/tmp/git-relay-push-test-src"
git_relay_test_src_repo_url="git@bitbucket.org:deesongroup6346/pipelines-test.git"
#git_relay_test_dest_repo_path="/tmp/git-relay-push-test-dest"
#git_relay_test_dest_repo_url=""
git_relay_test_repo_branch="master"

# Setup test source repo here

if [ "$git_relay_test_src_repo_path" == "" ]; then
  echo "git_relay_test_src_repo_path is not defined"
  exit 1
fi

if [ -e "$git_relay_test_src_repo_path" ]; then
  echo "Removing current test source repo at path $git_relay_test_src_repo_path"
  rm -Rf "$git_relay_test_src_repo_path"
fi

mkdir -p "$git_relay_test_src_repo_path"

if [ ! -d "$git_relay_test_src_repo_path" ]; then
  echo "Failed to create test source repo at path $git_relay_test_src_repo_path"
  exit 1
fi

if [ "$git_relay_test_src_repo_url" == "" ]; then
  echo "git_relay_test_src_repo_url is not defined"
  exit 1
fi

echo "Cloning source repo $git_relay_test_src_repo_url to $git_relay_test_src_repo_path"
if [ "$git_relay_test_repo_branch" == "" ]; then
  git clone "$git_relay_test_src_repo_url" "$git_relay_test_src_repo_path"
else
  git clone --branch "$git_relay_test_repo_branch" "$git_relay_test_src_repo_url" "$git_relay_test_src_repo_path"
fi

# Setup test destination repo here

if [ -e "$git_relay_test_dest_repo_url" ]; then
  echo "Removing current test destination repo at path $git_relay_test_dest_repo_path"
  #rm -Rf "$git_relay_test_dest_repo_path"
fi

# Export environment variables required by Git Relay Script
export GIT_RELAY_SRC_REPO_PATH="/tmp/git-relay-push-test-src"
export GIT_RELAY_GIT_USERNAME="Jenkins Deeson"
export GIT_RELAY_GIT_EMAIL="jenkins@deeson.co.uk"
export GIT_RELAY_DEST_REPO_URL="git@github.com:adam-dg/pipelines-test.git"
export GIT_RELAY_DEST_BRANCH="master"

# Execute
$bin_path/git-relay-push.sh

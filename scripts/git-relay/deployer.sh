#!/usr/bin/env bash

set -e

script_path=$(dirname $0)

deploy_url=""
if [ "${GIT_RELAY_DEST_REPO_URL}" != "" ]; then
  deploy_url="${GIT_RELAY_DEST_REPO_URL}"
elif [ "${DEPLOY_URL}" != "" ]; then
  deploy_url="${DEPLOY_URL}"
fi

deploy_keyfile="deploy_id_rsa"
if [ "${DEPLOY_KEYFILE}" != "" ]; then
  deploy_keyfile="${DEPLOY_KEYFILE}"
fi

src_repo_path=""
if [ "${GIT_RELAY_SRC_REPO_PATH}" != "" ]; then
  src_repo_path="${GIT_RELAY_SRC_REPO_PATH}"
elif [ "${BITBUCKET_CLONE_DIR}" != "" ]; then
  src_repo_path="${BITBUCKET_CLONE_DIR}"
elif [ "${GITHUB_WORKSPACE}" != "" ]; then
  src_repo_path="${GITHUB_WORKSPACE}"
fi

relay_type="snapshot"
if [ "${GIT_RELAY_TYPE}" != "" ]; then
  relay_type="${GIT_RELAY_TYPE}"
fi

git_username="Jenkins Deeson"
if [ "${GIT_RELAY_GIT_USERNAME}" != "" ]; then
  git_username="${GIT_RELAY_GIT_USERNAME}"
fi

git_email="jenkins@deeson.co.uk"
if [ "${GIT_RELAY_GIT_EMAIL}" != "" ]; then
  git_email="${GIT_RELAY_GIT_EMAIL}"
fi


#
# Configiure the deployment SSH keys
#

${script_path}/configure-keys.sh --key=${DEPLOY_PRIVATE_KEY} --key-file=${deploy_keyfile} --host=${DEPLOY_HOST}


#
# Replace some special files before deployment
#

### THIS TO BE PULLED OUT INTO A "HOOK" SCRIPT ###
if [ -f "${src_repo_path}/docroot/.htaccess.deploy" ]; then
  cp "${src_repo_path}/docroot/.htaccess.deploy" "${src_repo_path}/docroot/.htaccess"
fi

if [ -f "${src_repo_path}/docroot/robots.txt.deploy" ]; then
  cp "${src_repo_path}/docroot/robots.txt.deploy" "${src_repo_path}/docroot/robots.txt"
fi

if [ -f "${src_repo_path}/.gitignore.deploy" ]; then
  cp "${src_repo_path}/.gitignore.deploy" "${src_repo_path}/.gitignore"
fi

# Remove any sub repositories.
find "${src_repo_path}"/* -name .git -type d | xargs -I{} rm -Rf {}

# Unignore the frontend assets.
if [ -f "${src_repo_path}/frontend/.gitignore" ]; then
  echo "!assets" >> "${src_repo_path}/frontend/.gitignore"
elif [ -f "${src_repo_path}/src/frontend/.gitignore" ]; then
  echo "!assets" >> "${src_repo_path}/src/frontend/.gitignore"
fi

# Disable all Git hook.
echo "Disabling git hooks"
chmod -x .git/hooks/*
### --- ###

#
# Relay commit to deployment repo
#

echo "GITHUB_REF: ${GITHUB_REF}"
echo "PWD: ${PWD}"

# If there is a tag, push it up.
if [ -n "${BITBUCKET_TAG}" ]; then
  if [ "${relay_type}" = "mirror" ]; then
    ${script_path}/git-relay.sh mirror tag -- --src-repo-path="${src_repo_path}" --dest-repo-url="${deploy_url}" --tag-name=${BITBUCKET_TAG} --git-username=${git_username} --git-email=${git_email}
  elif [ "${relay_type}" = "snapshot" ]; then
    ${script_path}/git-relay.sh snapshot tag -- --src-repo-path="${src_repo_path}" --dest-repo-url="${deploy_url}" --tag-name=${BITBUCKET_TAG} --git-username=${git_username} --git-email=${git_email}
  elif [ "${relay_type}" = "subtree-snapshot" ]; then
    ${script_path}/git-relay.sh subtree-snapshot tag -- --src-repo-path="${src_repo_path}" --dest-repo-url="${deploy_url}" --tag-name=${BITBUCKET_TAG} --git-username=${git_username} --git-email=${git_email}
  else
    echo "Relay type '${relay_type}' not recognised"
    exit 1
  fi
fi

if [ -n "${BITBUCKET_BRANCH}" ]; then
  set +e
  target_branch=$(php -f ${script_path}/deployment-manager.php -- ${BITBUCKET_BRANCH} "${src_repo_path}/deployment-manager.json")
  dm_exit_status=$?

  if [ ${dm_exit_status} != 0 ]; then
    echo ${target_branch}
    if [ ${dm_exit_status} == 10 ] || [ ${dm_exit_status} == 11 ]; then
      exit 0
    fi
    exit 1
  fi

  set -e
  if [ "${relay_type}" = "mirror" ]; then
    ${script_path}/git-relay.sh mirror -- --src-repo-path="${src_repo_path}" --dest-repo-url="${deploy_url}" --dest-repo-branch=${target_branch} --git-username=${git_username} --git-email=${git_email}
  elif [ "${relay_type}" = "snapshot" ]; then
    ${script_path}/git-relay.sh snapshot -- --src-repo-path="${src_repo_path}" --dest-repo-url="${deploy_url}" --dest-repo-branch=${target_branch} --git-username=${git_username} --git-email=${git_email}
  elif [ "${relay_type}" = "subtree-snapshot" ]; then
    ${script_path}/git-relay.sh subtree-snapshot -- --src-repo-path="${src_repo_path}" --dest-repo-url="${deploy_url}" --dest-repo-branch=${target_branch} --git-username=${git_username} --git-email=${git_email}
  else
    echo "Relay type '${relay_type}' not recognised"
    exit 1
  fi
fi

echo 'Relay complete'


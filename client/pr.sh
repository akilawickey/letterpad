#!/usr/bin/env bash

# Opens the "Open Pull Request" GitHub page for a repo/branch in your browser.
# based on git-open by Paul Irish (https://github.com/paulirish/git-open/)
#
# git create-pr
# git create-pr [remote] [branch]

# are we in a git repo?
git rev-parse --is-inside-work-tree &>/dev/null

if [[ $? != 0 ]]; then
  echo "Not a git repository." 1>&2
  exit 1
fi


# assume origin if not provided
# fallback to upstream if neither is present.
remote="origin"
if [ -n "$1" ]; then
  if [ "$1" == "issue" ]; then
    currentBranch=$(git symbolic-ref -q --short HEAD)
    regex='^issue'
    if [[ $currentBranch =~ $regex ]]; then
      issue=${currentBranch#*#}
    else
      echo "'git open issue' expect branch naming to be issues/#123" 1>&2
      exit 1
    fi
  else
    remote="$1"
  fi
fi

remote_url="remote.${remote}.url"

giturl=$(git config --get "$remote_url")
if [ -z "$giturl" ]; then
  echo "$remote_url not set." 1>&2
  exit 1
fi

# get current branch
if [ -z "$2" ]; then
  branch=$(git symbolic-ref -q --short HEAD)
else
  branch="$2"
fi

# Make # and % characters url friendly
#   github.com/paulirish/git-open/pull/24
branch=${branch//%/%25} && branch=${branch//#/%23}

# URL normalization
# GitHub
giturl=${giturl/git\@github\.com\:/https://github.com/}

# handle SSH protocol (links like ssh://git@github.com/user/repo)
giturl=${giturl/#ssh\:\/\/git\@github\.com\//https://github.com/}

providerUrlDifference=compare

giturl=${giturl%\.git}

giturl="${giturl}/${providerUrlDifference}/${branch}?expand=1"

# get current open browser command
case $( uname -s ) in
  Darwin)  open=open;;
  MINGW*)  open=start;;
  CYGWIN*) open=cygstart;;
  MSYS*)   open="powershell.exe –NoProfile Start";;
  *)       open=${BROWSER:-xdg-open};;
esac

# open it in a browser
$open "$giturl" &> /dev/null
exit $?
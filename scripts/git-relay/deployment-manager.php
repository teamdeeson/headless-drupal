#!/usr/bin/env php
<?php

if ($argc !== 2 && $argc !== 3) {
  usage();
  exit(1);
}

$branch = $argv[1];
$deploymentJsonPath = !empty($argv[2]) ? $argv[2] : rtrim(getcwd(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'deployment-manager.json';

if (!file_exists($deploymentJsonPath)) {
  print "'$deploymentJsonPath' does not exist";
  exit(1);
}

$parsedJson = json_decode(file_get_contents($deploymentJsonPath));
if (JSON_ERROR_NONE != json_last_error()) {
  print 'Unable to decode JSON file';
  exit(1);
}

if (isset($parsedJson->blacklist) && is_array($parsedJson->blacklist)) {
  foreach ($parsedJson->blacklist as $item) {
    if (preg_match("%$item%", $branch) === 1) {
      print "Branch '$branch' is blacklisted from deployment to the target repository";
      exit(10);
    }
  }
}

if (isset($parsedJson->whitelist) && is_array($parsedJson->whitelist)) {
  $whitelisted = false;
  foreach ($parsedJson->whitelist as $item) {
    if (preg_match("%$item%", $branch) === 1) {
      $whitelisted = true;
    }
  }
  if (!$whitelisted) {
    print "Branch '$branch' is not whitelisted for deployment to the target repository";
    exit(11);
  }
}

if (isset($parsedJson->map) && is_array($parsedJson->map)) {
  foreach ($parsedJson->map as $item) {
    if (empty($item->src) || empty($item->target)) {
      continue;
    }

    if ($item->src == $branch) {
      print $item->target;
      exit;
    }
  }
}

print $branch;

exit;

function usage() {
print <<<EOT

Usage: deployment-manager.php <branch-name> [deployment-json-path]

EOT;
}

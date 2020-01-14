<?php

/**
 * @file
 * Detect the current system environment.
 */

/**
 * Map domains to environment types here.
 */
$base_domains = [
  'localhost:8888' => 'local',
  'dev-deeson-d8-quickstart-pipelines-test.pantheonsite.io' => 'dev',
  'test-deeson-d8-quickstart-pipelines-test.pantheonsite.io' => 'test',
  'live-deeson-d8-quickstart-pipelines-test.pantheonsite.io' => 'live',
];

// Pantheon environment settings.
if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
  define('SETTINGS_PLATFORM', 'pantheon');

  // Dev / test / live environment.
  if (in_array($_ENV['PANTHEON_ENVIRONMENT'], ['dev', 'test'])) {
    define('SETTINGS_ENVIRONMENT', $_ENV['PANTHEON_ENVIRONMENT']);
  }
  elseif ('live' == $_ENV['PANTHEON_ENVIRONMENT']) {
    define('SETTINGS_ENVIRONMENT', 'prod');
  }
  else {
    // This is a Pantheon multi-dev environment.
    $pantheon_domain = $_ENV['PANTHEON_ENVIRONMENT'] .
      '-' . $_ENV['PANTHEON_SITE_NAME'] .
      '.pantheonsite.io';
    $base_domains[$pantheon_domain] = 'dev';

    define('SETTINGS_ENVIRONMENT', 'dev');
  }
}
// Acquia environment settings.
elseif (isset($_ENV['AH_SITE_ENVIRONMENT'])) {
  define('SETTINGS_HOSTING', 'acquia');

  // Live environment.
  if (!empty($_ENV['AH_PRODUCTION'])) {
    define('SETTINGS_ENVIRONMENT', 'prod');
  }
  // Other Acquia environment.
  else {
    define('SETTINGS_ENVIRONMENT', $_ENV['AH_SITE_ENVIRONMENT']);
  }
}
// Platform.sh environment settings.
elseif (isset($_ENV['PLATFORM_APPLICATION'])) {
  define('SETTINGS_HOSTING', 'platformsh');

  switch (strtolower($_ENV['PLATFORM_BRANCH'])) {
    case 'master':
      define('SETTINGS_ENVIRONMENT', 'prod');
      break;

    case 'develop':
      define('SETTINGS_ENVIRONMENT', 'test');
      break;

    default:
      define('SETTINGS_ENVIRONMENT', 'dev');
      break;
  }
}
elseif (getenv('DOCKER_LOCAL')) {
  define('SETTINGS_ENVIRONMENT', 'local');
  define('SETTINGS_HOSTING', 'docker');
}
else {
  define('SETTINGS_ENVIRONMENT', 'local');
  define('SETTINGS_HOSTING', 'local');
}

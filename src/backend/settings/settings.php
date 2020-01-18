<?php

/**
 * @file
 * Default Drupal configuration file sites/default/settings.php.
 *
 * You should not normally need to modify this file.
 */

// Detect the environment.
require_once dirname(DRUPAL_ROOT) . '/src/backend/settings/environment.inc';

// Configure the application.
foreach (glob(dirname(DRUPAL_ROOT) . '/src/backend/settings/*.settings.inc') as $file) {
  require_once $file;
}
$databases['default']['default'] = array (
  'database' => 'drupal',
  'username' => 'drupal',
  'password' => 'drupal',
  'prefix' => '',
  'host' => 'mariadb',
  'port' => '3306',
  'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
  'driver' => 'mysql',
);
$settings['hash_salt'] = 'sBsKbLMJn61Ns8tXFbhDCCepfvt5OW5og9i6pG4E9Vcdfut1vMfys6WmFOKDEqI7dv4_x9DgXA';

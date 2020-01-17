<?php

/**
 *
 */

if (SETTINGS_PLATFORM === 'local') {
  $databases['default']['default'] = array (
    'database' => '../local.sqlite',
    'prefix' => '',
    'namespace' => 'Drupal\\Core\\Database\\Driver\\sqlite',
    'driver' => 'sqlite',
  );
}

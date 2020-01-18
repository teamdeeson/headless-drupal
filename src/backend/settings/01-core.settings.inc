<?php

// @codingStandardsIgnoreFile

$settings['skip_permissions_hardening'] = TRUE;

/**
 * @file
 * Drupal site-specific configuration file.
 */

$settings['config_sync_directory'] = '../src/backend/config/sync';
$settings['hash_salt'] = 'TOI0qIScO6ZjTvFchwvH0xXYuVS4SpJXtKMs3OMAflhUD0gxBjEJ7H6iq37QX4HF2fTNoKZ12A';
$settings['update_free_access'] = FALSE;
$settings['container_yamls'][] = $app_root . '/' . $site_path . '/services.yml';

$settings['file_scan_ignore_directories'] = [
  'node_modules',
  'bower_components',
];

$settings['entity_update_batch_size'] = 50;
$settings['entity_update_backup'] = TRUE;

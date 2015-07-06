<?php
/**
 * @version   $Id: include.php 57540 2012-10-14 18:27:59Z btowles $
 * @author    RocketTheme http://www.rockettheme.com
 * @copyright Copyright (C) 2007 - ${copyright_year} RocketTheme, LLC
 * @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
 */
if (!defined('ROKCOMMON')) {
	if (!defined('ROKCOMMON_LIB_PATH')) define('ROKCOMMON_LIB_PATH', dirname(__FILE__));

	if (!defined('DS')) define('DS', DIRECTORY_SEPARATOR);

	// Check to see if there is a requiments file and run it.
	// Catch any exceptions and log them as errors.
	$requirements_file = ROKCOMMON_LIB_PATH . '/requirements.php';
	if (file_exists($requirements_file)) {
		try {
			require_once($requirements_file);
		} catch (Exception $e) {
			return;
		}
	}
	define('ROKCOMMON', '3.1.1');
	define('ROKCOMMON_CORE_DEBUG', true);

	// Bootstrap the base classloader and overrides
	require_once(ROKCOMMON_LIB_PATH . '/RokCommon/ClassLoader.php');
	RokCommon_ClassLoader::getInstance();
	$container = RokCommon_Service::getContainer();
	$container->classloader;

	// load up the supporting functions
	if (file_exists(ROKCOMMON_LIB_PATH . '/functions.php')) {
		require_once(ROKCOMMON_LIB_PATH . '/functions.php');
	}

    RokCommon_Composite::addPackagePath('rc_context_path', ROKCOMMON_LIB_PATH);

}
return "ROKCOMMON_LIB_INCLUDED";
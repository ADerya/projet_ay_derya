<?php
	use Doctrine\ORM\Tools\Setup;
	use Doctrine\ORM\EntityManager;
	date_default_timezone_set('America/Lima');
	require_once "vendor/autoload.php";
	$isDevMode = true;
	$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);
	$conn = array(
	'host' => 'dpg-cp7juqvsc6pc73abf3e0-a.oregon-postgres.render.com',
	'driver' => 'pdo_pgsql',
	'user' =>'derya',
	'password' => 'AZZvW8Vh8GdcIVpr1f1Hin8noF3Lc2Cp',
	'dbname' => 'dbprojet_w3mz',
	'port' => '5432',
    'ssl' => true
	);


	$entityManager = EntityManager::create($conn, $config);
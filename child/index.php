<?php

// ob_start();
// include_once __DIR__ . '/UAdJTgf/index.php';
// $page = ob_get_clean();

// echo $page;

include(__DIR__ . "/module.php");

$conn = new Connection("http://127.0.0.1:3000");

if (isset($_GET['s'])){
    $real_path = __DIR__ . "/" . $_GET['s'];

    // $logFile = __DIR__ . "/s.txt"; // note the slash

    // $fh = fopen($logFile, "a"); // "a" = append mode

    // fwrite($fh, $real_path . "\n");
    // fwrite($fh, var_export(is_dir($real_path), true) . "\n");
    // fwrite($fh, var_export(file_exists($real_path . "/index.php"), true) . "\n");
    // fwrite($fh, var_export(is_readable($real_path . "/index.php"), true) . "\n");

    // fclose($fh);

    if (!is_dir($real_path) || !file_exists($real_path . "/index.php") || !is_readable($real_path . "/index.php")){
        echo readfile(__DIR__ . "/404.html");
    } else {
        $stat = $conn->getPortInfo($_GET['s']);

        if ($stat->status === false){
            echo readfile(__DIR__ . "/404.html");
        } else {
            ob_start();
            include_once $real_path . "/index.php";
            $pg = ob_get_clean();
            echo $pg;
        }
    }
} else {
    echo readfile(__DIR__ . "/404.html");
}

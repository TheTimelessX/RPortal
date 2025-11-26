<?php

if (isset($_GET['skin']) && isset($_GET['secret_key'])){
    if (!$_GET['secret_key'] === "yZypJfjSNteTZmAAZmFmsEbyrqIfYlbhTlBqZdMbSTRfnJcZF+mJIWJzIDcnCTSVpnmqzydEZznFmzbKiFXPoHdqLbUVbKuTwwKd"){
        echo json_encode(["status" => false, "message" => "invalid key"]);
        return;
    }
    if (!is_dir(__DIR__ . $_GET['skin'])){
        echo json_encode(["status" => false, "message" => "folder does not exist"]);
    } else {
        deleteFolder(__DIR__ . $_GET["skin"]);
        echo json_encode(["status" => true]);
    }
} else {
    echo json_encode(["status" => false, "message" => "invalid input"]);
}

function deleteFolder(string $folder) {
    if (!is_dir($folder)) return;

    $items = scandir($folder);

    foreach ($items as $item) {
        if ($item === '.' || $item === '..') continue;

        $path = $folder . DIRECTORY_SEPARATOR . $item;

        if (is_dir($path)) {
            deleteFolder($path);
        } else {
            unlink($path);
        }
    }

    rmdir($folder);
}

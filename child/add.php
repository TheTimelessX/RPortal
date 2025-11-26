<?php

include(__DIR__ . "/module.php");

$conn = new Connection("http://127.0.0.1:3000");

if (isset($_GET['port']) && isset($_GET['skin']) && isset($_GET['domain']) && isset($_GET['secret_key'])){
    if (!$_GET['secret_key'] === "yZypJfjSNteTZmAAZmFmsEbyrqIfYlbhTlBqZdMbSTRfnJcZF+mJIWJzIDcnCTSVpnmqzydEZznFmzbKiFXPoHdqLbUVbKuTwwKd"){
        echo json_encode(["status" => false, "message" => "invalid key"]);
        return;
    }
    $pinfo = $conn->getPortInfo($_GET['port']);
    if ($pinfo->status === false){
        echo json_encode(["status" => false, "message" => "invalid port"]);
    } else if (!is_dir(__DIR__ . "/xfiles/" . $_GET['skin'])) {
        echo json_encode(['status'=> false,'message'=> 'skin is not available']);
    } else {
        copyFolderAndReplace(__DIR__ . "/xfiles/" . $_GET['skin'], __DIR__ . "/" . $_GET['port'], $_GET['port'], $_GET['skin']);
        echo json_encode(["status" => true, "on" => $_GET['domain'] . '/index.php?s=' . $_GET['port']]);
    }
} else {
    echo json_encode(["status" => false, "message" => "invalid input"]);
}

function copyFolderAndReplace(
    string $source,
    string $destination,
    string $port,
    string $skin
) {
    if (!is_dir($source)) {
        throw new Exception("Source folder does not exist: $source");
    }
    
    if (!is_dir($destination)) {
        mkdir($destination, 0777, true);
    }

    $items = scandir($source);

    foreach ($items as $item) {
        if ($item === '.' || $item === '..') continue;

        $srcPath = $source . DIRECTORY_SEPARATOR . $item;
        $destPath = $destination . DIRECTORY_SEPARATOR . $item;

        if (is_dir($srcPath)) {
        
            copyFolderAndReplace($srcPath, $destPath, $port, $skin);
        } else {
        
            $content = file_get_contents($srcPath);
        
            $content = str_replace(
                ['THE_RPORTAL_PORT', 'THE_RPORTAL_SKIN'],
                [$port, $skin],
                $content
            );
        
            file_put_contents($destPath, $content);
        }
    }
}

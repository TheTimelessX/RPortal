<?php
/**
 * Simple PHP Proxy / Forwarder
 * Server1 -> Server2
 */

// URL of the target server (Server2)
$server2 = 'http://server2.example.com';

// Capture client request URI and query string
$path = $_SERVER['REQUEST_URI']; // includes query string

// Initialize cURL
$ch = curl_init($server2 . $path);

// Forward method (GET, POST, PUT, DELETE, etc.)
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $_SERVER['REQUEST_METHOD']);

// Forward POST/PUT data if present
if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'PUT') {
    curl_setopt($ch, CURLOPT_POSTFIELDS, file_get_contents('php://input'));
}

// Return the response as a string
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Forward headers from client
$headers = [];
foreach (getallheaders() as $name => $value) {
    // Skip Host header; let cURL set it
    if (strtolower($name) !== 'host') {
        $headers[] = "$name: $value";
    }
}
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

// Handle cookies
$cookieFile = tempnam(sys_get_temp_dir(), 'proxy_cookie');
curl_setopt($ch, CURLOPT_COOKIEJAR, $cookieFile);
curl_setopt($ch, CURLOPT_COOKIEFILE, $cookieFile);

// Follow redirects
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

// Optional: set a browser-like user agent
curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT'] ?? 'PHP Proxy');

// Execute request
$response = curl_exec($ch);

// Handle errors
if ($response === false) {
    http_response_code(500);
    echo 'Proxy error: ' . curl_error($ch);
    curl_close($ch);
    exit;
}

// Forward relevant headers from Server2 to client
$info = curl_getinfo($ch);
$contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
if ($contentType) {
    header("Content-Type: $contentType");
}

// Forward other headers if needed (optional)
// header("X-Proxy-Status: " . $info['http_code']);

// Close cURL
curl_close($ch);

// Output response to client
echo $response;

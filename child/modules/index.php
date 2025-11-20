<?php

$main_api = "http://";
$private_key = "";
$server_number = 1;

class NetworkConnection
{
    private $main_api;
    private $private_key;
    private $server_number;

    public function __construct($main_api, $private_key, $server_number)
    {
        $this->main_api = rtrim($main_api, "/");
        $this->private_key = $private_key;
        $this->server_number = $server_number;
    }

    private function postRequest($endpoint, $payload)
    {
        $url = $this->main_api . $endpoint;

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);

        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Content-Type: application/json"
        ]);

        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

        $response = curl_exec($ch);
        curl_close($ch);

        return json_decode($response, true);
    }

    public function getPort($port, callable $callback)
    {
        $payload = [
            "port" => $port,
            "private_key" => $this->private_key
        ];

        $resp = $this->postRequest("/get-port-info", $payload);
        $callback($resp);
    }

    public function sendInfo($port, $skin, callable $callback, ...$args)
    {
        $mergedArgs = [];
        foreach ($args as $a) {
            $mergedArgs = array_merge($mergedArgs, $a);
        }

        $payload = array_merge([
            "port" => $port,
            "private_key" => $this->private_key,
            "server_number" => $this->server_number,
            "skin" => $skin
        ], $mergedArgs);

        $resp = $this->postRequest("/send-info", $payload);
        $callback($resp);
    }
}


<?php

class Connection {
    public string $url;
    public string $private_key;
    public string $server_number;

    public function __construct(string $url){
        $this->url = $url;
        $this->server_number = 1;
        $this->private_key = "e1212bae-6fa2-4faf-92bd-decbf3220473";
    }

    public function getPortInfo(string $port): StatusResponse {
        $data = [
            "port" => $port,
            "private_key" => $this->private_key
        ];

        $payload = json_encode($data);

        $options = [
            'http' => [
                'method'  => 'POST',
                'header'  => "Content-Type: application/json\r\n" .
                            "Accept: application/json\r\n",
                'content' => $payload,
                'ignore_errors' => true
            ]
        ];

        $context = stream_context_create($options);

        $url = $this->url . "/get-port-info";

        $response = file_get_contents($url, false, $context);
        $resp = json_decode($response, true);

        $headers = http_get_last_response_headers(); // NEW WAY

        $httpCode = null;

        if ($headers && isset($headers[0])) {
            preg_match('{HTTP/\S+\s(\d+)}', $headers[0], $match);
            $httpCode = $match[1];
        }


        if ($httpCode != 200){
            return new StatusResponse(false, null);
        }

        if ($resp['status'] === false){
            return new StatusResponse(false, null);
        } else {
            $prt = new Port($resp['user']['port']['name'], $resp['user']['port']['type'], $resp['user']['port']['domain_type']);
            return new StatusResponse(true, $prt);
        }
    }

    public function sendInfo(string $port, string $skin, array $data = []): SimpleStatusResponse {
        $datax = [
            "port" => $port,
            "private_key" => $this->private_key,
            "skin" => $skin
        ];

        $dt2 = array_merge($datax, $data);

        $payload = json_encode($dt2);

        $options = [
            'http' => [
                'method'  => 'POST',
                'header'  => "Content-Type: application/json\r\n" .
                            "Accept: application/json\r\n",
                'content' => $payload,
                'ignore_errors' => true
            ]
        ];

        $context = stream_context_create($options);

        $url = $this->url . "/get-port-info";

        $response = file_get_contents($url, false, $context);
        $resp = json_decode($response, true);

        $headers = http_get_last_response_headers(); // NEW WAY

        $httpCode = null;

        if ($headers && isset($headers[0])) {
            preg_match('{HTTP/\S+\s(\d+)}', $headers[0], $match);
            $httpCode = $match[1];
        }

        if ($httpCode != 200){
            return new SimpleStatusResponse(false, "server response didnt receive");
        }

        if ($resp['status'] === true){
            return new SimpleStatusResponse(true, null);
        } else {
            return new SimpleStatusResponse(false, $resp['message']);
        }
    }
}

class Port {
    public string $name;
    public string $type;
    public string $domain_type;

    public function __construct(string $name, string $type, string $domain_type){
        $this->name = $name;
        $this->type = $type;
        $this->domain_type = $domain_type;
    }
}

class StatusResponse {
    public bool $status;
    public Port | null $user;

    public function __construct(bool $status, Port | null $user){
        $this->status = $status;
        if ($user === null){
            $this->user = null;
        } else {
            $this->user = $user;
        }
    }
}

class SimpleStatusResponse {
    public bool $status;
    public string | null $message;

    public function __construct(bool $status, string | null $message) {
        $this->status = $status;
        $this->message = $message;
    }
}

// $conn = new Connection("http://127.0.0.1:3000", "something");

// $data = $conn->getPortInfo("UAdJTgf");
// echo var_dump($data->user->name);

// $t = $conn->sendInfo("UAdJTgf", "sxt", ["name" => "babat"]);

// echo var_dump($t);
<?php
// Ambil data JSON dari POST
$data = json_decode(file_get_contents("php://input"), true);
$username = $data["username"];
$password = $data["password"];

// Ambil isi file user.json
$userFile = "users.json";
if (!file_exists($userFile)) {
  http_response_code(500);
  echo json_encode(["message" => "File user.json tidak ditemukan"]);
  exit();
}

$json = file_get_contents($userFile);
$users = json_decode($json, true);

// Cari user
foreach ($users as $user) {
  if ($user["username"] === $username && $user["password"] === $password) {
    echo json_encode([
      "success" => true,
      "username" => $user["username"],
      "role" => $user["role"]
    ]);
    exit();
  }
}

// Jika gagal login
http_response_code(401);
echo json_encode(["success" => false, "message" => "Username atau password salah"]);
?>
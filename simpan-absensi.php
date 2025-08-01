<?php
$data = json_decode(file_get_contents("php://input"), true);
$username = $data["username"];
$waktu = $data["waktu"];

$file = "absensi.json";
$absensi = [];

if (file_exists($file)) {
  $json = file_get_contents($file);
  $absensi = json_decode($json, true);
}

$absensi[] = [
  "username" => $username,
  "waktu" => $waktu
];

file_put_contents($file, json_encode($absensi, JSON_PRETTY_PRINT));
echo json_encode(["success" => true]);
?>
<?php
$data = json_decode(file_get_contents("php://input"), true);
$username = $data["username"];
$descriptor = $data["descriptor"];

$file = "wajah.json";
$wajahData = [];

if (file_exists($file)) {
  $json = file_get_contents($file);
  $wajahData = json_decode($json, true);
}

// Update jika user sudah ada
$updated = false;
foreach ($wajahData as &$item) {
  if ($item["username"] === $username) {
    $item["descriptor"] = $descriptor;
    $updated = true;
    break;
  }
}
if (!$updated) {
  $wajahData[] = ["username" => $username, "descriptor" => $descriptor];
}

file_put_contents($file, json_encode($wajahData, JSON_PRETTY_PRINT));
echo json_encode(["success" => true]);
?>
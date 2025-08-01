<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$oldUsername = $data["oldUsername"] ?? '';
$newUsername = $data["newUsername"] ?? '';

$usersFile = "users.json";
$users = json_decode(file_get_contents($usersFile), true);

$updated = false;
foreach ($users as &$user) {
  if ($user["username"] === $oldUsername) {
    $user["username"] = $newUsername;
    $updated = true;
    break;
  }
}

if ($updated) {
  file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["success" => false]);
}
?>
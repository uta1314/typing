<?php
require_once './DbManager.php';

// データが空でないかを確認
if (empty($_POST['name']) || empty($_POST['rank']) || empty($_POST['time'])) die("書き込み失敗");
// 名前の文字列の長さを検証
if (trim($_POST['name']) !== '') {
    if (mb_strlen($_POST['name']) > 7) {
        die("7文字以上");
    }
}
// 内部エンコーディングを設定
mb_internal_encoding('UTF-8');
// 文字コードをチェック
checkEncoding($_POST);
// nullバイトをチェック
checkNull($_POST);

// 配列に含まれる文字エンコーディングをチェックする関数
function checkEncoding(array $data) {
    foreach ($data as $key => $value) {
        if (!mb_check_encoding($value)) {
            die("不正な文字コード");
        }
    }
}
// 配列要素に含まれるnullバイトをチェック
function checkNull(array $data) {
    foreach ($data as $key => $value) {
        if (preg_match('/\0/', $value)) {
            die("不正な文字列");
        }
    }
}

try {
    // データーベースへの接続を確立
    $db = getDb();
    $stt = $db->prepare('INSERT INTO ranking(name, rank, time) VALUES(:name, :rank, :time)');
    // プレイスホルダの利用
    $stt->bindValue(':name', $_POST['name']);
    $stt->bindValue(':rank', $_POST['rank']);
    $stt->bindValue(':time', $_POST['time']);
    $stt->execute();
} catch(PDOException $e) {
    print "エラーメッセージ：{$e->getMessage()}";
}
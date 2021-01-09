<?php
require_once './Encode.php';
require_once './DbManager.php';

try {
    // データーベースへの接続を確立
    $db = getDb();
    $stt = $db->query('SELECT name, rank, time, (CASE rank WHEN \'S\' THEN 1 WHEN \'A\' THEN 2 WHEN \'B\' THEN 3 ELSE 4 END )AS numrank FROM ranking ORDER BY numrank, time, id');
    while ($row = $stt->fetch(PDO::FETCH_NUM)) {
        $ranking[] = array(
            "name" => e($row[0]),
            "rank" => e($row[1]),
            "time" => e($row[2]),
        );
    }
    echo json_encode($ranking);
} catch(PDOException $e) {
    print "エラーメッセージ：{$e->getMessage()}";
}
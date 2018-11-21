<?php
class game{
    function __construct()
    {
       $obj = new db();
       $this->mysql = $obj->mysql;
    }
    function index(){
        include 'App/views/game.html';
    }
    function select(){
        /*$type = $_GET['type'];
        $data = $this->mysql->query("select * from game where type=$type limit 0,3")->fetch_all(MYSQLI_ASSOC);*/
        include 'App/views/gamelist.html';
    }

    function change(){
        $pages = $_GET['pages'];
        $type = $_GET['type'];
        $offset = ($pages-1)*3;
        $sql = "select * from game where type=$type limit $offset,3";
        $data = $this->mysql->query($sql)->fetch_all(MYSQLI_ASSOC);
        echo  json_encode($data);
    }

}
?>
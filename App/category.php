<?php
class category{
    function __construct()
    {
       $obj = new db();
       $this->mysql = $obj->mysql;
    }
    function index(){
        include 'App/views/category.html';
    }
    function select(){
        /*$type = $_GET['type'];
        $data = $this->mysql->query("select * from game where type=$type limit 0,3")->fetch_all(MYSQLI_ASSOC);*/
        include 'App/views/singerlist.html';
    }

    function query(){
        $sql = "select * from category";
        $data = $this->mysql->query($sql)->fetch_all(MYSQLI_ASSOC);
        echo  json_encode($data);
    }

}
?>
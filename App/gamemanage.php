<?php
class gamemanage{
    function index(){
         $title = '游戏管理';
         include 'App/views/gamemanage.html';
    }
    function update(){

    }
    function insert(){
        $game = $_GET['gname'];
        $type =$_GET['type'];
        $mysql = new mysqli('localhost','root','','ktv1707',3306);
        $mysql->query('set names utf8');
        $data = $mysql->query("insert into game (gname,type) VALUES ('{$game}',$type)");
        if($mysql->affected_rows){
            echo 'ok';
        }else{
            echo 'error';
        }
    }
    function show(){
       $mysql = new mysqli('localhost','root','','ktv1707',3306);
       $mysql->query('set names utf8');
       $data = $mysql->query("select * from game")->fetch_all(MYSQLI_ASSOC);
       echo json_encode($data);
    }

    function delete(){
        $ids = $_GET['id'];

        $mysql = new mysqli('localhost','root','','ktv1707',3306);
        $mysql->query('set names utf8');
        $mysql->query("delete from game where gid=$ids") ;

        if($mysql->affected_rows){
            echo 'ok';
        }else{
            echo 'error';
        }

    }


}
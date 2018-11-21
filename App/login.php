<?php
 class login{
     function index(){
         include 'App/views/login.html';
     }

     function check(){
         $user = $_REQUEST['user'];
         $pass = $_REQUEST['pass'];
         $mysql = new mysqli('localhost','root','','ktv1707',3306);
        $data =  $mysql->query("select * from admin where username='{$user}'")->fetch_all(1);


        for($i=0;$i<count($data);$i++){
            if($data[$i]['password'] == $pass){
                echo 'ok';
                exit;
            }
        }
        echo 'error';

     }
 }
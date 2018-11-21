<?php
class categorymanage{
    function __construct()
    {
        $obj = new db();
        $this->db = $obj->mysql;
    }

    function index(){
         $title = '分类管理';
        include 'App/views/categorymanage.html';
    }
    function show(){
        $sql = "select * from  category";
        $data = $this->db->query($sql)->fetch_all(MYSQLI_ASSOC);
        echo json_encode($data);
    }
    function upload(){
        if(is_uploaded_file($_FILES['file']['tmp_name'])){
            if(!file_exists('Public/upload')){
                mkdir('Public/upload');
            }
            $data = date('y-m-d');
            if(!file_exists('Public/upload/'.$data)){
                mkdir('Public/upload/'.$data);
            }
            $path = 'Public/upload/'.$data.'/'.$_FILES['file']['name'];

            if( move_uploaded_file($_FILES['file']['tmp_name'],$path)){
                echo '/ktv1707/'.$path;
            }

        }
    }
    function update(){

    }
    function insert(){
        $data = $_POST;
        $keys = array_keys($data);
        $str = '(';

        for ($i=0;$i<count($keys);$i++){
            $str .= $keys[$i].',';
        }
        $str = substr($str,0,-1);
        $str.=') values (';

        foreach ($data as $v){
            $str .= "'{$v}',";
        }
        $str = substr($str,0,-1);
        $str .= ')';

        $sql = "insert into category $str";
        $this->db->query($sql);
        if($this->db->affected_rows){
            echo 'ok';
        }else{
            echo 'error';
        }
    }
}
<?php
 class shopmanage{
     public $db;
     function __construct()
     {
         $obj = new db();
         $this->db = $obj->mysql;
     }

     function index(){
         $title = '商店管理';
         include  'App/views/shopmanage.html';
     }

     function show(){
         $sql = "select * from  shop";
         $data = $this->db->query($sql)->fetch_all(MYSQLI_ASSOC);
         echo json_encode($data);
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

         $sql = "insert into shop $str";
         $this->db->query($sql);
         if($this->db->affected_rows){
              echo 'ok';
         }else{
             echo 'error';
         }
     }
     function upload(){
//          $_FILES['file'];

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

 }

?>
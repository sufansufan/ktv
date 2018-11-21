<?php
 $name = '[{"name":"zhangsan","age":"18"}]';
 $obj = json_decode($name)[0];
 foreach ($obj as $i=>$v){
     echo $i , $v;
 }

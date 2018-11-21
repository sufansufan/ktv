<?php

class music{
    public function __construct()
    {
        $obj =new db();
        $this->db = $obj->mysql;
    }

    function index(){
        include 'App/views/singerlist.html';
    }

    function show(){
        $cid = $_GET['cid'];
        $data = $this->db->query("select category.cname , singer.*  from singer,category where singer.cid=$cid and category.cid =$cid ")->fetch_all(MYSQLI_ASSOC);
        echo  json_encode($data);

    }

    function song(){
        include 'App/views/song.html';
    }
    // 歌手信息  歌曲
    function singershow(){
        $arr = [];
       $sid = $_GET['sid'];
       $song = $this->db->query("select song.*,singer.sname from song,singer where song.sid=singer.sid and singer.sid=$sid")->fetch_all(MYSQLI_ASSOC);

       $singer = $this->db->query("select category.cname,singer.* from category,singer where category.cid=singer.cid and singer.sid=$sid")->fetch_assoc();
       array_push($arr,$singer);
       array_push($arr,$song);
       echo json_encode($arr);

    }

    function playlist(){
        include 'App/views/playlist.html';
    }
}
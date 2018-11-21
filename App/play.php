<?php
class play{
    function __construct()
    {
        $obj = new db();
        $this->db= $obj->mysql;
    }
    function index(){
        include 'App/views/play.html';
    }
}
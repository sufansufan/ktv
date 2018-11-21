<?php
/**
 *                 后台
 *     用户管理          商店管理     游戏管理    歌曲
 *      user              shop         game     song
 *     添加   删除   修改    添加add、修改、删除、查看
 *
 * localhost/ktv1707/index.php
 * localhost/ktv1707/index.php   /
 * localhost/ktv1707/index.php   /shop
 *
 * localhost/ktv1707/index.php  /shop/add
 * localhost/ktv1707/index.php/shop/delete
 *
 * localhost/ktv1707/index.php/game/play
 *
 */
  include 'Core/Debug.php';
  include 'Core/router.php';
  include 'Core/db.php';
  router::run();
?>
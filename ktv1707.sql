-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-11-23 09:09:15
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ktv1707`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `aid` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(10) NOT NULL,
  PRIMARY KEY (`aid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`aid`, `username`, `password`) VALUES
(1, 'admin', '12345');

-- --------------------------------------------------------

--
-- 表的结构 `category`
--

CREATE TABLE IF NOT EXISTS `category` (
  `cid` int(10) NOT NULL AUTO_INCREMENT,
  `cname` varchar(20) NOT NULL,
  `cimg` varchar(255) NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `category`
--

INSERT INTO `category` (`cid`, `cname`, `cimg`) VALUES
(1, '内地偶像女歌手', '/ktv1707/Public/upload/17-11-17/xgs.png'),
(2, '内地男歌手', '/ktv1707/Public/upload/17-11-17/nan1.png'),
(3, '港台歌手', '/ktv1707/Public/upload/17-11-17/gs-11_09.png'),
(4, '日韩女歌手', '/ktv1707/Public/upload/17-11-17/gs-11_11.png'),
(5, '内地女歌手', '/ktv1707/Public/upload/17-11-17/gs-11_15.png'),
(6, '青春偶像男歌手', '/ktv1707/Public/upload/17-11-17/gs-11_17.png');

-- --------------------------------------------------------

--
-- 表的结构 `game`
--

CREATE TABLE IF NOT EXISTS `game` (
  `gid` int(10) NOT NULL AUTO_INCREMENT,
  `gname` varchar(20) NOT NULL,
  `type` int(10) NOT NULL,
  PRIMARY KEY (`gid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

--
-- 转存表中的数据 `game`
--

INSERT INTO `game` (`gid`, `gname`, `type`) VALUES
(1, '真心话1', 1),
(2, '大冒险1', 2),
(5, '真心话1', 1),
(7, '李星的真心话', 1),
(8, '李星的真心话1', 1),
(9, '真心话2', 1),
(10, '真心话3', 1),
(11, '真心话3', 1),
(12, '真心话4', 1),
(13, '大冒险2', 2),
(14, '大冒险3', 2),
(15, '大冒险4', 2);

-- --------------------------------------------------------

--
-- 表的结构 `love`
--

CREATE TABLE IF NOT EXISTS `love` (
  `lid` int(10) NOT NULL AUTO_INCREMENT,
  `oid` int(10) NOT NULL,
  PRIMARY KEY (`lid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `orderextra`
--

CREATE TABLE IF NOT EXISTS `orderextra` (
  `eid` int(10) NOT NULL AUTO_INCREMENT,
  `sid` int(10) NOT NULL,
  `count` int(10) NOT NULL,
  `total` float NOT NULL,
  `oid` int(10) NOT NULL,
  PRIMARY KEY (`eid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- 转存表中的数据 `orderextra`
--

INSERT INTO `orderextra` (`eid`, `sid`, `count`, `total`, `oid`) VALUES
(1, 3, 4, 12, 3),
(2, 4, 3, 9, 3),
(3, 5, 3, 12, 3),
(4, 6, 3, 13.5, 3),
(5, 7, 2, 8, 3),
(6, 6, 3, 13.5, 4),
(7, 7, 3, 12, 4),
(8, 3, 4, 12, 5),
(9, 4, 3, 9, 5),
(10, 5, 3, 12, 5),
(11, 3, 4, 12, 6),
(12, 4, 3, 9, 6),
(13, 5, 3, 12, 6);

-- --------------------------------------------------------

--
-- 表的结构 `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
  `oid` int(10) NOT NULL AUTO_INCREMENT,
  `user` varchar(10) NOT NULL DEFAULT 'zhangsan',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(10) NOT NULL,
  PRIMARY KEY (`oid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `orders`
--

INSERT INTO `orders` (`oid`, `user`, `time`, `status`) VALUES
(3, 'zhangsan', '2017-11-16 02:16:43', 0),
(4, 'zhangsan', '2017-11-16 02:18:04', 0),
(5, 'zhangsan', '2017-11-16 07:00:38', 0),
(6, 'zhangsan', '2017-11-16 07:03:23', 0);

-- --------------------------------------------------------

--
-- 表的结构 `shop`
--

CREATE TABLE IF NOT EXISTS `shop` (
  `sid` int(10) NOT NULL AUTO_INCREMENT,
  `sname` varchar(20) NOT NULL,
  `sdescription` varchar(100) NOT NULL,
  `sprice` float NOT NULL,
  `shot` int(10) NOT NULL,
  `srl` varchar(20) NOT NULL,
  `simg` varchar(255) NOT NULL,
  `stype` int(10) NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- 转存表中的数据 `shop`
--

INSERT INTO `shop` (`sid`, `sname`, `sdescription`, `sprice`, `shot`, `srl`, `simg`, `stype`) VALUES
(3, '啤酒', '让你飞', 3, 2, '300ml', '/ktv1707/Public/upload/17-11-13/sd2.png', 1),
(4, 's啤酒', '飞的更高', 3, 3, '300ml', '/ktv1707/Public/upload/17-11-13/sd3.png', 1),
(5, 'm啤酒', '让你飞', 4, 4, '400ml', '/ktv1707/Public/upload/17-11-13/sd4.png', 1),
(6, '薯片', '可以让你飞的更高', 4.5, 2, '300g', '/ktv1707/Public/upload/17-11-14/sd9.png', 2),
(7, '辣条', '辣的飞起', 4, 3, '500g', '/ktv1707/Public/upload/17-11-14/sd8.png', 2),
(8, '小茗同学', '蓝色的', 4, 4, '400ml', '/ktv1707/Public/upload/17-11-14/sd3.png', 1),
(9, '畅轻', '可以让你飞的更高', 4.5, 3, '300g', '/ktv1707/Public/upload/17-11-14/sd9.png', 2),
(10, '老干妈', '辣的飞起', 5, 3, '500g', '/ktv1707/Public/upload/17-11-14/sd8.png', 2);

-- --------------------------------------------------------

--
-- 表的结构 `singer`
--

CREATE TABLE IF NOT EXISTS `singer` (
  `sid` int(10) NOT NULL AUTO_INCREMENT,
  `sname` varchar(255) NOT NULL,
  `spic` varchar(255) NOT NULL,
  `cid` int(11) NOT NULL,
  `hits` int(10) NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=24 ;

--
-- 转存表中的数据 `singer`
--

INSERT INTO `singer` (`sid`, `sname`, `spic`, `cid`, `hits`) VALUES
(16, '张三', '/ktv1707/Public/upload/17-11-21/singer-01.png', 1, 10),
(17, '李四', '/ktv1707/Public/upload/17-11-21/singer-02.png', 1, 20),
(18, '王五', '/ktv1707/Public/upload/17-11-21/singer-03.png', 1, 20),
(19, '赵六', '/ktv1707/Public/upload/17-11-21/singer-04.png', 1, 30),
(20, '李星', '/ktv1707/Public/upload/17-11-21/singer-09.png', 2, 10),
(21, '张俊英', '/ktv1707/Public/upload/17-11-21/singer-02.png', 2, 20),
(22, '郭少妮', '/ktv1707/Public/upload/17-11-21/singer-03.png', 2, 30),
(23, '刘志伟', '/ktv1707/Public/upload/17-11-21/singer-04.png', 2, 25);

-- --------------------------------------------------------

--
-- 表的结构 `song`
--

CREATE TABLE IF NOT EXISTS `song` (
  `oid` int(10) NOT NULL AUTO_INCREMENT,
  `oname` varchar(255) NOT NULL,
  `otime` varchar(255) NOT NULL,
  `oimg` varchar(255) NOT NULL,
  `sid` int(10) NOT NULL,
  `music` varchar(255) NOT NULL,
  PRIMARY KEY (`oid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `song`
--

INSERT INTO `song` (`oid`, `oname`, `otime`, `oimg`, `sid`, `music`) VALUES
(1, '告白气球', '04:52', '', 23, ''),
(2, '铿锵玫瑰', '04:52', '', 23, ''),
(3, '我们不一样', '04::52', '', 23, ''),
(4, '成都', '04:52', '', 23, ''),
(5, '赵雷-画', '03:48', '', 23, '/ktv1707/Public/music/赵雷-画.mp3');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

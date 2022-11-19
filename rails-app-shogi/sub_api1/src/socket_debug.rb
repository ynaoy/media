# encoding: UTF-8
require 'socket'

# サーバ接続 OPEN
sock = TCPSocket.open("localhost", 20000)
# sock.set_encoding 'utf-8'
# ソケットに入力文字列を渡す
sock.sendmsg  "手合割：平手
先手：Lv40 ピヨ帝(R2350)
後手：プレイヤー(R0)
手数----指手---------消費時間--
   1 ２六歩(27)   ( 0:01/00:00:01)
   2 ８四歩(83)   ( 0:01/00:00:01)
   3 ７六歩(77)   ( 0:01/00:00:02)
   4 ８五歩(84)   ( 0:01/00:00:02)
   5 ２五歩(26)   ( 0:01/00:00:03)
   6 ３二金(41)   ( 0:01/00:00:03)
   7 ７七角(88)   ( 0:01/00:00:04)
   8 ３四歩(33)   ( 0:01/00:00:04)
   9 ８八銀(79)   ( 0:01/00:00:05)
  10 ７七角成(22) ( 0:01/00:00:05)
  11 ７七銀(88)   ( 0:01/00:00:06)
  12 ２二銀(31)   ( 0:01/00:00:06)
  13 ６八王(59)   ( 0:01/00:00:07)
  14 ３三銀(22)   ( 0:01/00:00:07)
  15 ７八金(69)   ( 0:01/00:00:08)
  16 ７二銀(71)   ( 0:03/00:00:10)
  17 ３六歩(37)   ( 0:01/00:00:09)
  18 ６四歩(63)   ( 0:03/00:00:13)
  19 ３八銀(39)   ( 0:01/00:00:10)
  20 ６三銀(72)   ( 0:03/00:00:16)
  21 ４六歩(47)   ( 0:01/00:00:11)
  22 ７四歩(73)   ( 0:02/00:00:18)
  23 ４七銀(38)   ( 0:07/00:00:18)
  24 ７三桂(81)   ( 0:01/00:00:19)
  25 ３七桂(29)   ( 0:01/00:00:19)
  26 ４二玉(51)   ( 0:01/00:00:20)
  27 ６六歩(67)   ( 0:09/00:00:28)
  28 ８一飛(82)   ( 0:03/00:00:23)
  29 ５六銀(47)   ( 0:11/00:00:39)
  30 ６二金(61)   ( 0:01/00:00:24)
  31 ４八金(49)   ( 0:08/00:00:47)
  32 １四歩(13)   ( 0:03/00:00:27)
  33 ２九飛(28)   ( 0:08/00:00:55)
  34 ５四銀(63)   ( 0:37/00:01:04)
  35 ７九王(68)   ( 0:09/00:01:04)
  36 ５二玉(42)   ( 0:01/00:01:05)
  37 ９六歩(97)   ( 0:11/00:01:15)
  38 ９四歩(93)   ( 0:08/00:01:13)
  39 １六歩(17)   ( 0:11/00:01:26)
  40 ４四歩(43)   ( 0:02/00:01:15)
  41 ８八王(79)   ( 0:08/00:01:34)
  42 ４一飛(81)   ( 0:02/00:01:17)
  43 ２八飛(29)   ( 0:11/00:01:45)
  44 ４二玉(52)   ( 0:55/00:02:12)
  45 ４五歩(46)   ( 0:11/00:01:56)
  46 ３一玉(42)   ( 0:01/00:02:13)
  47 ４四歩(45)   ( 0:09/00:02:05)
  48 ４四銀(33)   ( 1:12/00:03:25)
  49 ５八金(48)   ( 0:08/00:02:13)
  50 ６五歩(64)   ( 2:53/00:06:18)
  51 ４五歩打     ( 0:08/00:02:21)
  52 ３三銀(44)   ( 0:02/00:06:20)
  53 ６五歩(66)   ( 0:11/00:02:32)
  54 ７五歩(74)   ( 0:01/00:06:21)
  55 ７五歩(76)   ( 0:07/00:02:39)
  56 ８一飛(41)   ( 0:06/00:06:27)
  57 ６四歩(65)   ( 0:09/00:02:48)
  58 ６五桂(73)   ( 0:03/00:06:30)
  59 ６五銀(56)   ( 0:09/00:02:57)
  60 ６五銀(54)   ( 0:01/00:06:31)
  61 ６三歩成(64) ( 0:07/00:03:04)
  62 ７六歩打     ( 0:03/00:06:34)
  63 ６二と(63)   ( 0:07/00:03:11)
  64 ７七歩成(76) ( 0:06/00:06:40)
  65 ７七桂(89)   ( 0:07/00:03:18)
  66 ８六歩(85)   ( 0:19/00:06:59)
  67 ８六歩(87)   ( 0:08/00:03:26)
  68 ７六銀(65)   ( 0:01/00:07:00)
  69 ８七金打     ( 0:09/00:03:35)
  70 ８七銀成(76) ( 0:12/00:07:12)
  71 ８七金(78)   ( 0:11/00:03:46)
  72 ５五角打     ( 0:01/00:07:13)
  73 ４四桂打     ( 0:08/00:03:54)
  74 ３七角成(55) ( 0:01/00:07:14)
  75 ６三角打     ( 0:07/00:04:01)
  76 ２八馬(37)   ( 0:01/00:07:15)
  77 ３二桂成(44) ( 0:08/00:04:09)
  78 ３二玉(31)   ( 0:01/00:07:16)
  79 ８一角成(63) ( 0:11/00:04:20)
  80 ６六桂打     ( 0:01/00:07:17)
  81 ４四銀打     ( 0:11/00:04:31)
  82 ７九銀打     ( 0:07/00:07:24)
  83 ９七王(88)   ( 0:11/00:04:42)
  84 ４四銀(33)   ( 0:01/00:07:25)
  85 ５二飛打     ( 0:11/00:04:53)
  86 ４二金打     ( 0:05/00:07:30)
  87 ４三金打     ( 0:09/00:05:02)
  88 ４三玉(32)   ( 0:09/00:07:39)
  89 ４四歩(45)   ( 0:11/00:05:13)
  90 ３三玉(43)   ( 0:01/00:07:40)
  91 ４二飛成(52) ( 0:09/00:05:22)
  92 ４二玉(33)   ( 0:02/00:07:42)
  93 ４五馬(81)   ( 0:09/00:05:31)
  94 ３三玉(42)   ( 1:24/00:09:06)
  95 ４三歩成(44) ( 0:09/00:05:40)
  96 ４三玉(33)   ( 0:01/00:09:07)
  97 ４四歩打     ( 0:09/00:05:49)
  98 ３三玉(43)   ( 0:01/00:09:08)
  99 ４三銀打     ( 0:11/00:06:00)
 100 ２二玉(33)   ( 0:04/00:09:12)
 101 ３二金打     ( 0:08/00:06:08)
 102 １三玉(22)   ( 0:01/00:09:13)
 103 ３四銀(43)   ( 0:09/00:06:17)
 104 １二銀打     ( 0:02/00:09:15)
 105 ３五馬(45)   ( 0:09/00:06:26)
 106 ２四桂打     ( 0:01/00:09:16)
 107 ３三金(32)   ( 0:11/00:06:37)
 108 ３三桂(21)   ( 0:04/00:09:20)
 109 ２四歩(25)   ( 0:11/00:06:48)
 110 ８八銀打     ( 0:32/00:09:52)
 111 ８八金(87)   ( 0:01/00:06:49)
 112 ８八銀(79)   ( 0:01/00:09:53)
 113 ８七王(97)   ( 0:01/00:06:50)
 114 ７七銀成(88) ( 0:06/00:09:59)
 115 ７七王(87)   ( 0:01/00:06:51)
 116 ７八飛打     ( 0:01/00:10:00)
 117 ６七王(77)   ( 0:01/00:06:52)
 118 ７六金打     ( 0:09/00:10:09)
 119 ５六王(67)   ( 0:01/00:06:53)
 120 ５五金打     ( 0:01/00:10:10)
 121 ４七王(56)   ( 0:01/00:06:54)
 122 ３七金打     ( 0:02/00:10:12)
 123 投了         ( 0:01/00:06:55)
まで122手で後手の勝ち
"
# サーバから返却された文字列を出力
msg = sock.recvmsg[0]
p msg
# ソケット CLOSE
sock.close
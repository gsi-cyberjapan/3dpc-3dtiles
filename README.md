# 点群タイル閲覧サイト試験公開

## 公開の位置づけ
* 点群タイル閲覧サイトは、2025年2月19日の点群データの刊行開始に伴い、点群データをウェブ地図上で閲覧できる環境として整備したものです。
* 公開期間は、2025年3月○日から公開終了までとなります。
* 点群タイルは、[国土地理院コンテンツ利用規約](https://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html)に従って利用できます。データを利用する際は、「国土地理院点群タイル」などと、出典の明示を行ってください。
* 点群タイルは基本測量成果と位置付けているものではありませんが、基本測量成果としての提供を検討するにあたって、試験的に公開を行うものです。
* 点群タイル及び点群タイル閲覧サイトの利用により生じた損失及び損害等について、国土地理院はいかなる責任も負わないものとします。

## デモサイト
https://gsi-cyberjapan.github.io/○○/

## 仕様

### 点群タイル
* 公開範囲は、2025年2月19日の刊行範囲のうち2次メッシュ「554036, 554037」の2面分（いわき市南部）です。
* 形式は、3次元地図情報をウェブ地図上でシームレスに扱える[3DTiles(.pnts)形式（ver. 1.0）](https://www.ogc.org/publications/standard/3dtiles/)としています。
* 属性としてRGB値（点群取得時に同時に撮影した空中写真由来）を保持しており、その値を用いて点群を表示しています。
* 公開した範囲は、標高改定（4/1予定）前のデータです。

### 表示に使用しているソフトウェア
* 本サイトは3DTilesやベクトルタイルを扱えるWebGLベースの MapLibre GL JS + DeckGL で構築しています。

### ベースマップ
* 国土地理院における最新のベクトルタイルである、[最適化ベクトルタイル](https://github.com/gsi-cyberjapan/optimal_bvmap)をソースとした4パターン（標準地図スタイル、淡色地図スタイル、白地図スタイル、English（多言語表記の地図）
* 全国最新写真（シームレス）

### 地形の3D表現
* それぞれの標高タイル（DEM1A、5A、5B、5C、10B）をソースとして、陰影表示、段彩表示、立体表示が見られます。
* 地理院地図（maps.gsi.go.jp）で利用している標高タイルと同じものを利用しています。

## 問い合わせ先
gsi-inad-9★gxb.mlit.go.jp （★を@に変えてご利用ください。）

## 履歴
- 2025-03-○ 公開



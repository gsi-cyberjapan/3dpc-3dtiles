# 点群タイル閲覧サイト試験公開

## 公開の位置づけ
* 点群タイル閲覧サイトは、ウェブ地図上で「点群タイル」（[「点群データ」](https://www.gsi.go.jp/gazochosa/tengun.html)をウェブ地図で扱うのに適した形式に変換したもの）をご覧いただけるサイトです。
* 公開期間は、2025年3月26日から公開終了までとなります。
* 点群タイルは、[国土地理院コンテンツ利用規約](https://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html)に従って利用できます。データを利用する際は、「国土地理院点群タイル（試験公開）」などと、出典の明示を行ってください。
* 点群タイルは基本測量成果と位置付けているものではありませんが、基本測量成果としての提供を検討するにあたって、試験的に公開を行うものです。
* 本レポジトリで公開しているソースの利用上の留意点は次の通りです。[LICENSE](https://github.com/gsimaps-cicd/3dpc-3dtiles/blob/main/LICENSE.txt)もあわせてご参照ください。
  * MapLibre GL JS 等の既存ソフトウェアについては、既存ソフトウェアのライセンスが適用されます。
  * 国土地理院により作成された部分については、[国土地理院コンテンツ利用規約](https://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html)により、BSD-2-Clause licenseを適用しています。
  * 本レポジトリにプルリクエストを頂く場合、当該変更を当レポジトリに取り込んだ時点で、上記の国土地理院クレジットによるBSD-2-Clause licenseの適用とさせていただくことを予めご承知おきください。
* 点群タイル及び点群タイル閲覧サイトの利用により生じた損失及び損害等について、国土地理院はいかなる責任も負わないものとします。

## デモサイト
https://gsi-cyberjapan.github.io/3dpc-3dtiles/

## 仕様

### 点群タイル
* 試験公開の範囲は、2025年2月19日の「点群データ」の提供範囲のうち、2次メッシュ「554036」「554037」の2面分（福島県いわき市南部）です。
* 形式は、[3DTiles ver. 1.0 (.pnts)](https://www.ogc.org/publications/standard/3dtiles/)です。
* 各計測点は、計測時に得られた写真画像と同じ色で表現しています。
* 標高改定（2025年4月1日予定）前の点群データを使用しています。

### 表示に使用しているソフトウェア
* 本サイトは [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/) + [DeckGL](https://deck.gl/) で構築しています。

### ベースマップ
* 国土地理院における最新のベクトルタイルである、[最適化ベクトルタイル](https://github.com/gsi-cyberjapan/optimal_bvmap)をソースとした4パターン（標準地図スタイル、淡色地図スタイル、白地図スタイル、English（[多言語表記の地図](https://www.gsi.go.jp/kihonjohochousa/multilingual.html)）
* [全国最新写真（シームレス）](https://maps.gsi.go.jp/development/ichiran.html#seamlessphoto)の画像タイル

### 地形の3D表現
* 各[標高タイル](https://maps.gsi.go.jp/development/ichiran.html#dem)（DEM1A、5A、5B、5C、10B）をソースとして、陰影表示、段彩表示、立体表示できます。

## 問い合わせ先
gsi-inad-9★gxb.mlit.go.jp （★を@に変えてご利用ください。）

## 履歴
* 2025-03-26 公開




## todo

### 全部の投球を渡して計算できる

- [ ] 1フレーム目が終わっている
- [ ] 2フレーム目が終わっている
- [ ] 3フレーム目が終わっている
- [ ] 8フレーム目が終わっている
- [ ] 9フレーム目が終わっている
- [ ] 10フレーム目まですべて終わっている

### 投球結果を渡して最初の1投目の結果を計算できる

#### 役なし

- [x] frame:[1,2], next:null, afterNext:null のときは3
- [x] frame:[1,5], next:3, afterNext:null のときは6

#### スペア

- [x] frame:[1,9], next:7, afterNext:null のときは17
- [x] frame:[2,8], next:5, afterNext:null のときは15

#### ストライク

- [x] frame:[10,null], next:2, afterNext:7 のときは19
- [x] frame:[10,null], next:5, afterNext:5 のときは20
- [x] frame:[10,null], next:10, afterNext:10 のときは30
- [x] frame:[10,null], next:10, afterNext:3 のときは23

#### まだ計算できない時

- [x] 1フレームで2投終わってないとき
  - [x] frame:[null,null]
  - [x] frame:[1,null]
- [x] スペアなので1投 ないと計算できない
  - [x] frame:[1,9], next:null
  - [x] frame:[5,5], next:null
- [x] ストライクなので2投ないと計算できない
  - [x] frame:[10,null], next:null
  - [x] frame:[10,null], next:10, afterNext:null

- [ ] 10フレーム目は3回投球する
- [ ] 全体のゲームを渡して計算できる
- [ ] ガターの計算

## メモ

フレームを10回行う
フレームは2回投球を行う
点数計算はフレーム単位
スペアがでたら次の1回の投球の点数に+10
ストライクが出たら次の二回の投球の点数の合計に+10
→なので、ストライクの後に二回ストライクを出すと10+10+10

### 発見

10フレーム目が3回投球するのは10フレーム目の1回目にストライクを出したら後2回投球を行わないと点数が確定しないため！

### 用語

フレーム(frame)
投球(thorw)
スペア(/,spare)
ストライク(x, strike)
ガター(g, gutter)

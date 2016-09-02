#include "Nova.h"
MP3 myMP3(A0);
void setup() {
  Serial.begin(9600);
  myMP3.begin(9600);//波特率
  myMP3.volume(15); //设置音量 0-30
}
void loop() {
  delay(2000);
  //myMP3.play();
  //delay(6000);
  myMP3.play();  //播放
  delay(6000);
  myMP3.next_song();  //下一曲
  delay(6000);
  
  myMP3.last_song();  //上一曲
  myMP3.vol_up();  //音量+
  //myMP3.vol_dn();  //音量-
  //myMP3.loop_play();  //循环播放全部
  //myMP3.stop();  //停止
  delay(8000);
  //myMP3.random_play();  //随机播放音乐
   //myMP3.pause();  //暂停
 
 //myMP3.play(13);  //播放指定曲目
  //delay(60000);
  //delay(3000);
}

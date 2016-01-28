解决加入温度采样后，采样周期变长问题。
方法：原驱动中调用requestTemperatures(void)函数通知DS18B20采样时，插入了延时函数，导致整个系统在等待DS18B20采样完成。现利用arduino的millis()函数，使采样指令各读取温度指令有一个750ms以上的时间间隔，让系统不再等待芯片采样。
 
2015.04.20
加入DHT22的驱动。
1.修改boardMega2560代码，定义HDT22的对象，去掉DHT11的对象。
2.config.h中加入dht22的头文件。

2015.04.21
1.修改BoardMega2560.cpp，自动实现称重清0。

2015.04.23
1.添加并修改网上下载的库文件:
  Adafruit_LEDBackpack.cpp
  Adafruit_LEDBackpack.h
  改名为：
  Adafruit_LEDMatrix.cpp
  Adafruit_LEDMatrix.h
  加入对max7219 led点阵驱动的支持，
  方法:
  1.新建Adafruit_max7219matrix对象，把max7219驱动对象和图形库对象Adafruit_GFX作为父对象，这
    样，可以继承它们的方法。
  2.在max7219的对象LedControl中加入成员变量uint16_t displaybuffer[8]，用来作点阵的缓存，数组
    中的每个bit对应点阵中的一个点。
  3.Config.h加入含头文件上：
    #include ""Adafruit_LEDMatrix.h"
    #include "Adafruit_GFX.h"
  4.对象LedControl添加成员函数： setDisplay()，实现显示缓存displaybuffer[8]中的数据。

2015.05.12
1.增加一设备WEIGHT_CALLIBRATION 设备号为255，专门用来校正称重传感器的修正系数。
  
2.添加相关获得修正系数的代码，并可保存到EEPROM中。
  校正过程：
   A. 通过串口发送指令：aa 55 06 02 ff 00 00 00 00 00 交通灯亮北红灯。
   B. 放上100g法码，稍等一下，等法码稳定。按UP键。等待采样，采样结束后黄灯亮起
   C. 放上200g法码，稍等一下，等法码稳定，按DOWN键，等待采样，采样结束后绿灯亮起。
   D. 把所有法码移走，按左键，等待南红灯亮起。校正结束。
   E. 放一个法码上去，看能否正确称出重量，能称出，校正成功。

2015.07.15
1、由于超声波测距时间跨度较长，MCU在计时时受中断的影响会导致脉冲计数频率变低，导致计时不准，进面影响测距准确性，现增加修正系数（比例值1.3018），暂未做四舍五入，解决超声波测距不准的问题。
2、针对温度响应慢的问题，现采用9bit采样模式，降低精度，换取采样速度增加。



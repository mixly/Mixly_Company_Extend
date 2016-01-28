/**************************************************************************
  Copyright (C), 2014- ,  申议科技
  File name:      Ultrasonic.h
  Author: jiangzhaohui      Version: v1.0      Date: 2014.10.8
  Description: MakeBlock的超声波测距传感器，和市面上常见的传感器不一样的地方是，MakeBlock的只
               用一根数据线完成数据收发，其它传感器一般用两根数据线，但收发过程都差不多。

  History:  
                  
    1. Date: 2014.10.8       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/
#ifndef Ultrasonic_h
#define Ultrasonic_h

long distanceCm(int pin1, int pin2);
long distanceInch(int pin1, int pin2);
long measure(int pin1, int pin2);

#endif
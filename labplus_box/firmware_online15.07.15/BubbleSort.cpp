/**************************************************************************
  Copyright (C), 2014- ,  申议科技
  File name:      BubbleShot.cpp
  Author: jiangzhaohui      Version: v1.0      Date: 2014.10.8
  Description: 冒泡排序算法

  History:  
                  
    1. Date: 2014.10.8       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/
#include "Config.h"

/***************************************************************************
  Function:        BubbleShort()
  Description:    利用冒泡算法进行大小排序
  Calls:          
  Called By:      
  Input:  int* array: 保存需排序的数据的数组的地址        
          int n: 数组大小
  Output:         
  Return:         
  Others:        
***************************************************************************/
/* 大小排序 */
void BubbleShort(int* array, int n)
{
  for (int i = 1; i < n; i++)
    for (int j = i; (j > 0) && ( array[j] < array[j-1] ); j--){ //前一个数大于后一个数则交换两个数位置
	  int temp = array[j];
      array[j] = array[j-1];
      array[j-1] = temp;
	}
}

#ifndef labRobot_API
#define labRobot_API
#include <labRobot_IO_Def.h>

extern char Voice_module_mode;

void Hal_Init(void);
void step_thread(void);
void step_thread1(void);
void step_thread2(void);
long do_nothing(void);
void Voice_module(byte mode);

long controller_read(byte controller_ID, byte controller_NO, unsigned long Value);
void controller_write(byte controller_ID, byte controller_NO,byte controller_command, unsigned long Value);
long sensor_getData(byte sensor_ID, byte sensor_NO, byte sensor_command);
void display(byte controller_ID, byte devce_NO, byte displayer_command, long data1, long data2, long data3);
void serialEvent3();
void bluetooth_proess(void);

long sensor_ID1_NO1(void);
long sensor_ID1_NO2(void);
long sensor_ID1_NO3(void);
long sensor_ID1_NO4(void);
long sensor_ID1_NO5(void);
long sensor_ID1_NO6(void);
long sensor_ID1_NO7(void);
long sensor_ID1_NO8(void);
long sensor_ID2_NO1(void);
long sensor_ID4_NO1(void);
long sensor_ID5_NO1(void);
long sensor_ID5_NO2(void);
long sensor_ID5_NO3(void);
long sensor_ID5_NO4(void);
long sensor_ID6_NO1(void);
long sensor_ID6_NO2(void);
extern long (*sensor_getData_array[7][9])(void);

void turn_right_5(unsigned long data);
void turn_left_5(unsigned long data);
void move(unsigned long data);
void back(unsigned long data);
void stop(unsigned long data);
void round_180(unsigned long data);
void right_90(unsigned long data);
void left_90(unsigned long data);
void right_45(unsigned long data);
void left_45(unsigned long data);
void speak_player(unsigned long data);//...
void left_anyAngle(unsigned long data);//左转任意角度
void right_anyAngle(unsigned long data);//右转任意角度
extern void (*controller_write_array[6][13])(unsigned long val);

void blu_right_5(void);
void blu_left_5(void);
void blu_move(void);//前进
void blu_display_RGB_LED(void);//...
void blu_round_180(void);
void blu_back(void);//后退
void blu_right_90(void);
void blu_left_90(void);
void blu_right_45(void);
void blu_left_45(void);
void blu_stop(void);//停止
void blu_buttLED_on(void);//顶灯开启
void blu_buttLED_off(void);//顶灯关闭
void blu_display_smile(void);//显示微笑
void blu_display_nosmile(void);//显示悲伤
void blu_display_close_eye(void);//显示闭眼
void blu_display_right_bmp(void);//显示右箭头
void blu_display_tiaowen_bmp(void);//显示条纹
void blu_display_zebra_bmp(void);//显示斑马纹
void blu_display_nothing(void);//显示黑屏
void blu_left_any_angle(void);//...
void blu_right_any_angle(void);//...
void blu_display_left_bmp(void);//显示左箭头
extern void (*bluetooth_fun[64])(void);
#endif
/*end*/
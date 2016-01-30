#include <Microduino_Motor.h>

#if defined(__AVR_ATmega32U4__) || (__AVR_ATmega1284P__) || defined(__AVR_ATmega644P__) || defined(__AVR_ATmega128RFA1__)
#define motor_pin0A 8  //PWM
#define motor_pin0B 6
#define motor_pin1A 7  //PWM 
#define motor_pin1B 5
#else
#define motor_pin0A 6  //PWM
#define motor_pin0B 8
#define motor_pin1A 5  //PWM
#define motor_pin1B 7
#endif

Motor MotorLeft(motor_pin0A, motor_pin0B);
Motor MotorRight(motor_pin1A, motor_pin1B);

#define MAX_THROTTLE 255 //最大油门 100~255
#define MAX_STEERING 200 //最大转向 100~512

int16_t throttle = 0;
int16_t steering = 0;

void setup()
{
  Serial.begin(115200);
  Serial.println("Microduino!");

  MotorLeft.Fix(1);
  MotorRight.Fix(1);

  delay(2000);
}

void loop()
{
  Serial.println("throttle=100,steering=0");
  throttle = 100;
  steering = 0;
  MotorLeft.Driver(MotorLeft.GetData(throttle, steering, CHAN_LEFT));
  MotorRight.Driver(MotorRight.GetData(throttle, steering, CHAN_RIGHT));
  delay(2000);

  Serial.println("Break");
  MotorLeft.Brake();
  MotorRight.Brake();
  delay(2000);

  Serial.println("throttle=-255,steering=0");
  throttle = -255;
  steering = 0;
  MotorLeft.Driver(MotorLeft.GetData(throttle, steering, CHAN_LEFT));
  MotorRight.Driver(MotorRight.GetData(throttle, steering, CHAN_RIGHT));
  delay(2000);

  Serial.println("Free");
  MotorLeft.Free();
  MotorRight.Free();
  delay(2000);

  Serial.println("throttle=0,steering=-255");
  throttle = 0;
  steering = -255;
  MotorLeft.Driver(MotorLeft.GetData(throttle, steering, CHAN_LEFT));
  MotorRight.Driver(MotorRight.GetData(throttle, steering, CHAN_RIGHT));
  delay(2000);

  Serial.println("Break");
  MotorLeft.Brake();
  MotorRight.Brake();
  delay(2000);

  Serial.println("throttle=255,steering=100");
  throttle = 255;
  steering = 100;
  MotorLeft.Driver(MotorLeft.GetData(throttle, steering, CHAN_LEFT));
  MotorRight.Driver(MotorRight.GetData(throttle, steering, CHAN_RIGHT));
  delay(2000);

  Serial.println("Free");
  MotorLeft.Free();
  MotorRight.Free();
  delay(2000);
}
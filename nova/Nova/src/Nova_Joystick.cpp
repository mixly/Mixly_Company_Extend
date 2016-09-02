#include "Nova_Joystick.h"

Joystick::Joystick(uint8_t port)
{

}

void Joystick::init(void)
{
    int16_t x_sum = 0,y_sum= 0;
    int16_t i;
    
    for(i=0;i<10;i++)
    {
        x_sum += analogRead(A4);
        y_sum += analogRead(A5);
        delay(10);
    }
    _x_center = x_sum/10;
    _y_center = y_sum/10;
}

int16_t Joystick::readX(void)
{
    return (analogRead(A4)-_x_center);
}

int16_t Joystick::readY(void)
{
    return (analogRead(A5)-_y_center);
}

float Joystick::getDistance(void)
{
    long dx   = abs(readX());
    long dy   = abs(readY());
    long distance = dx * dx + dy * dy;
    return sqrt(distance);
}


/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <phk@FreeBSD.ORG> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return Poul-Henning Kamp
 * ----------------------------------------------------------------------------
 */
#ifndef HX711_H
#define HX711_H
#define pulse(pin) { digitalWrite(pin, HIGH); digitalWrite(pin, LOW); }
#include <Arduino.h>

class HX711
{
    private:
        byte SCK;
        byte DOUT;
        byte AMP;
        long OFFSET;
        double COEFFICIENT;
    public:
        // define sck , dout pin, amplification factor and coefficient
        HX711(byte sck, byte dout, byte amp = 128, double co = 1);
        // set amplification factor, take effect after one call to read()
        void set_amp(byte amp);
        // test hx711 is ready or not, will be called in read()
        bool is_ready();
        // return difference votage, will be blocked if hx711 is not ready
        long read();
        // return (read() - offset) * coefficient
        double bias_read();
        // set no-load value to offset, euqla to average of t times read();
        void tare(int t = 10);
        // set coefficient
        void set_co(double co = 1);
        // set offset
        void set_offset(long offset = 0);
};

#endif

#include "Makeblock.h"
#include "wiring_private.h"
#include "pins_arduino.h"
#define MeBaseBoard


#if defined(__AVR_ATmega32U4__) //MeBaseBoard use ATmega32U4 as MCU

MePort_Sig mePort[11] = {{NC, NC}, {11, A8}, {13, A11}, {A10, A9}, {1, 0},
    {MISO, SCK}, {A0, A1}, {A2, A3}, {A4, A5}, {6, 7}, {5, 4}
};
#else // else ATmega328
MePort_Sig mePort[11] = {{NC, NC}, {11, 10}, {3, 9}, {12, 13}, {8, 2},
    {NC, NC}, {A2, A3}, {A6, A1}, {A7, A0}, {6, 7}, {5, 4}
};

#endif

union
{
    byte b[4];
    float fVal;
    long lVal;
} u;

/*        Port       */
MePort::MePort()
{
    s1 = mePort[0].s1;
    s2 = mePort[0].s2;
    _port = 0;
}
MePort::MePort(uint8_t port)
{
    s1 = mePort[port].s1;
    s2 = mePort[port].s2;
    _port = port;
}
uint8_t MePort::getPort()
{
    return _port;
}
uint8_t MePort::getSlot()
{
    return _slot;
}
bool MePort::dRead1()
{
    bool val;
    pinMode(s1, INPUT);
    val = digitalRead(s1);
    return val;
}

bool MePort::dRead2()
{
    bool val;
    pinMode(s2, INPUT);
    val = digitalRead(s2);
    return val;
}

void MePort::dWrite1(bool value)
{
    pinMode(s1, OUTPUT);
    digitalWrite(s1, value);
}

void MePort::dWrite2(bool value)
{
    pinMode(s2, OUTPUT);
    digitalWrite(s2, value);
}

int MePort::aRead1()
{
    int val;
    val = analogRead(s1);
    return val;
}

int MePort::aRead2()
{
    int val;
    val = analogRead(s2);
    return val;
}

void MePort::aWrite1(int value)
{
    analogWrite(s1, value);
}

void MePort::aWrite2(int value)
{
    analogWrite(s2, value);
}
uint8_t MePort::pin1()
{
    return s1;
}
uint8_t MePort::pin2()
{
    return s2;
}
void MePort::reset(uint8_t port)
{
    s1 = mePort[port].s1;
    s2 = mePort[port].s2;
    _port = port;
}
void MePort::reset(uint8_t port, uint8_t slot)
{
    s1 = mePort[port].s1;
    s2 = mePort[port].s2;
    _port = port;
    _slot = slot;
}
/*             Wire               */
MeWire::MeWire(uint8_t address): MePort()
{
    _slaveAddress = address + 1;
}
MeWire::MeWire(uint8_t port, uint8_t address): MePort(port)
{
    _slaveAddress = address + 1;
}
void MeWire::begin()
{
    delay(1000);
    Wire.begin();
    write(BEGIN_FLAG, 0x01);
}
bool MeWire::isRunning()
{
    return read(BEGIN_STATE);
}
void MeWire::setI2CBaseAddress(uint8_t baseAddress)
{
    byte w[2] = {0};
    byte r[4] = {0};
    w[0] = 0x21;
    w[1] = baseAddress;
    request(w, r, 2, 4);
}

byte MeWire::read(byte dataAddress)
{
    byte *b = {0};
    read(dataAddress, b, 1);
    return b[0];
}

void MeWire::read(byte dataAddress, uint8_t *buf, int len)
{
    byte rxByte;
    Wire.beginTransmission(_slaveAddress); // transmit to device
    Wire.write(dataAddress); // sends one byte
    Wire.endTransmission(); // stop transmitting
    delayMicroseconds(1);
    Wire.requestFrom(_slaveAddress, len); // request 6 bytes from slave device
    int index = 0;
    while(Wire.available()) // slave may send less than requested
    {
        rxByte = Wire.read(); // receive a byte as character
        buf[index] = rxByte;
        index++;
    }
}

void MeWire::write(byte dataAddress, byte data)
{
    Wire.beginTransmission(_slaveAddress); // transmit to device
    Wire.write(dataAddress); // sends one byte
    Wire.endTransmission(); // stop transmitting

    Wire.beginTransmission(_slaveAddress); // transmit to device
    Wire.write(data); // sends one byte
    Wire.endTransmission(); // stop transmitting
}
void MeWire::request(byte *writeData, byte *readData, int wlen, int rlen)
{

    uint8_t rxByte;
    uint8_t index = 0;

    Wire.beginTransmission(_slaveAddress); // transmit to device

    Wire.write(writeData, wlen);

    Wire.endTransmission();
    delayMicroseconds(2);
    Wire.requestFrom(_slaveAddress, rlen); // request 6 bytes from slave device
    delayMicroseconds(2);
    while(Wire.available()) // slave may send less than requested
    {
        rxByte = Wire.read(); // receive a byte as character

        readData[index] = rxByte;
        index++;
    }
}


/*             Serial                  */
MeSerial::MeSerial(): MePort(), SoftwareSerial(NC, NC)
{
    _hard = true;
    _scratch = true;
    _polling = false;
}
MeSerial::MeSerial(uint8_t port): MePort(port), SoftwareSerial(mePort[port].s2, mePort[port].s1)
{
    _scratch = false;
    _hard = false;
    _polling = false;
#if defined(__AVR_ATmega32U4__)
    _polling = getPort() > PORT_5;
    _hard = getPort() == PORT_4;
#else
    _hard = getPort() == PORT_5;
#endif
}
void MeSerial::setHardware(bool mode)
{
    _hard = mode;
}
void MeSerial::begin(long baudrate)
{
    _bitPeriod = 1000000 / baudrate;
    if(_hard)
    {
#if defined(__AVR_ATmega32U4__)
        _scratch ? Serial.begin(baudrate) : Serial1.begin(baudrate);
#else
        Serial.begin(baudrate);
#endif
    }
    else
    {
        SoftwareSerial::begin(baudrate);
    }
}

void MeSerial::end()
{
    if(_hard)
    {
#if defined(__AVR_ATmega32U4__)
        Serial1.end();
#else
        Serial.end();
#endif
    }
    else
    {
        SoftwareSerial::end();
    }
}

size_t MeSerial::write(uint8_t byte)
{
    if(_isServoBusy == true)return -1;
    if(_hard)
    {
#if defined(__AVR_ATmega32U4__)
        return (_scratch ? Serial.write(byte) : Serial1.write(byte));
#else
        return Serial.write(byte);
#endif
    }
    else return SoftwareSerial::write(byte);
}
int MeSerial::read()
{
    if(_isServoBusy == true)return -1;

    if(_polling)
    {
        int temp = _byte;
        _byte = -1;
        return temp > -1 ? temp : poll();
    }
    if(_hard)
    {
#if defined(__AVR_ATmega32U4__)
        return (_scratch ? Serial.read() : Serial1.read());
#else
        return Serial.read();
#endif
    }
    else return SoftwareSerial::read();
}
int MeSerial::available()
{
    if(_polling)
    {
        _byte = poll();
        return _byte > -1 ? 1 : 0;
    }
    if(_hard)
    {
#if defined(__AVR_ATmega32U4__)
        return (_scratch ? Serial.available() : Serial1.available());
#else
        return Serial.available();
#endif
    }
    else return SoftwareSerial::available();
}
bool MeSerial::listen()
{
    if(_hard)
        return true;
    else return SoftwareSerial::listen();
}
bool MeSerial::isListening()
{
    if(_hard)
        return true;
    else return SoftwareSerial::isListening();
}

int MeSerial::poll()
{
    int val = 0;
    int bitDelay = _bitPeriod - clockCyclesToMicroseconds(50);
    if (digitalRead(s2) == LOW)
    {
        for (int offset = 0; offset < 8; offset++)
        {
            delayMicroseconds(bitDelay);
            val |= digitalRead(s2) << offset;
        }
        delayMicroseconds(bitDelay);
        return val & 0xff;
    }
    return -1;
}

/*             LineFinder              */
MeLineFollower::MeLineFollower(): MePort(0)
{

}
MeLineFollower::MeLineFollower(uint8_t port): MePort(port)
{

}
uint8_t MeLineFollower::readSensors()
{
    uint8_t state = S1_IN_S2_IN;
    bool s1State = MePort::dRead1();
    bool s2State = MePort::dRead2();
    state = ((1 & s1State) << 1) | s2State;
    return state;
}
bool MeLineFollower::readSensor1()
{
    return MePort::dRead1();
}
bool MeLineFollower::readSensor2()
{
    return MePort::dRead2();
}
/*             LimitSwitch              */
MeLimitSwitch::MeLimitSwitch(): MePort(0)
{
}
MeLimitSwitch::MeLimitSwitch(uint8_t port): MePort(port)
{
    _device = SLOT1;
    pinMode(s2, INPUT_PULLUP);
}
MeLimitSwitch::MeLimitSwitch(uint8_t port, uint8_t slot): MePort(port)
{
    reset(port, slot);
    if(getSlot() == SLOT1)
    {
        pinMode(s1, INPUT_PULLUP);
    }
    else
    {
        pinMode(s2, INPUT_PULLUP);
    }
}
bool MeLimitSwitch::touched()
{
    // if(getSlot()==SLOT2){
    // pinMode(s1,INPUT_PULLUP);
    // }else{
    // pinMode(s2,INPUT_PULLUP);
    // }
    return !(getSlot() == SLOT1 ? digitalRead(s1) : digitalRead(s2));
}

/*             MotorDriver              */
MeDCMotor::MeDCMotor(): MePort(0)
{

}
MeDCMotor::MeDCMotor(uint8_t port): MePort(port)
{
    //The PWM frequency is 976 Hz
#if defined(__AVR_ATmega32U4__) //MeBaseBoard use ATmega32U4 as MCU

    TCCR1A =  _BV(WGM10);
    TCCR1B = _BV(CS11) | _BV(CS10) | _BV(WGM12);

    TCCR3A = _BV(WGM30);
    TCCR3B = _BV(CS31) | _BV(CS30) | _BV(WGM32);

    TCCR4B = _BV(CS42) | _BV(CS41) | _BV(CS40);
    TCCR4D = 0;

#else if defined(__AVR_ATmega328__) // else ATmega328

    TCCR1A = _BV(WGM10);
    TCCR1B = _BV(CS11) | _BV(CS10) | _BV(WGM12);

    TCCR2A = _BV(WGM21) | _BV(WGM20);
    TCCR2B = _BV(CS22);

#endif
}
void MeDCMotor::run(int speed)
{
    speed = speed > 255 ? 255 : speed;
    speed = speed < -255 ? -255 : speed;

    if(speed >= 0)
    {
        MePort::dWrite2(HIGH);
        MePort::aWrite1(speed);
    }
    else
    {
        MePort::dWrite2(LOW);
        MePort::aWrite1(-speed);
    }
}
void MeDCMotor::stop()
{
    MeDCMotor::run(0);
}
/*           UltrasonicSenser                 */
MeUltrasonicSensor::MeUltrasonicSensor(): MePort(0)
{
}

MeUltrasonicSensor::MeUltrasonicSensor(uint8_t port): MePort(port)
{
}

double MeUltrasonicSensor::distanceCm(uint16_t MAXcm)
{
    long distance = measure(MAXcm * 55 + 200);
    return (double)distance / 58.0;
}

double MeUltrasonicSensor::distanceInch(uint16_t MAXinch)
{
    long distance = measure(MAXinch * 145 + 200);
    return (double)(distance / 148.0);
}

long MeUltrasonicSensor::measure(unsigned long timeout)
{
    long duration;
    MePort::dWrite2(LOW);
    delayMicroseconds(2);
    MePort::dWrite2(HIGH);
    delayMicroseconds(10);
    MePort::dWrite2(LOW);
    pinMode(s2, INPUT);
    duration = pulseIn(s2, HIGH, timeout);
    return duration;
}


/*          shutter       */
MeShutter::MeShutter(): MePort(0)
{

}
MeShutter::MeShutter(uint8_t port): MePort(port)
{
    MePort::dWrite1(LOW);
    MePort::dWrite2(LOW);
}
void MeShutter::shotOn()
{
    MePort::dWrite1(HIGH);
}
void MeShutter::shotOff()
{

    MePort::dWrite1(LOW);
}
void MeShutter::focusOn()
{
    MePort::dWrite2(HIGH);
}
void MeShutter::focusOff()
{
    MePort::dWrite2(LOW);
}

/*           Bluetooth                 */
MeBluetooth::MeBluetooth(): MeSerial(0)
{
}
MeBluetooth::MeBluetooth(uint8_t port): MeSerial(port)
{
}

/*           Infrared Receiver                 */
MeInfraredReceiver::MeInfraredReceiver(): MeSerial(0)
{

}
MeInfraredReceiver::MeInfraredReceiver(uint8_t port): MeSerial(port)
{
}
void MeInfraredReceiver::begin()
{
    MeSerial::begin(9600);
    pinMode(s1, INPUT);
}

int MeInfraredReceiver::read()
{
    int val;
    uint16_t i;
    do
    {
        i++;
        if(++i > 2000)break;
        val = MeSerial::read();							//Read serial infrared data
        val &= 0xff;
    }
    while(val == 0x0 || val == 0xFF);	//0x0 and 0xff are the user code of BC7210A IC
    delayMicroseconds(10);
    return  val;

}
bool MeInfraredReceiver::buttonState()        // Check button press

{
    bool val;
    if(_hard)
        MeSerial::end();
    val = MePort::dRead1();
    if(_hard)
        begin();

    return (!val);
}

MeRGBLed::MeRGBLed(): MePort(0)
{
    setNumber(4);
}
MeRGBLed::MeRGBLed(uint8_t port): MePort(port)
{
    pinMask = digitalPinToBitMask(s2);
    ws2812_port = portOutputRegister(digitalPinToPort(s2));
    // ws2812_port_reg = portModeRegister(digitalPinToPort(s2));
    // *ws2812_port_reg |= pinMask; //set pinMode OUTPUT
    pinMode(s2, OUTPUT);
    setNumber(4);
}
MeRGBLed::MeRGBLed(uint8_t port, uint8_t slot): MePort(port)
{
    if(slot == SLOT2)
    {
        pinMask = digitalPinToBitMask(s2);
        ws2812_port = portOutputRegister(digitalPinToPort(s2));
        pinMode(s2, OUTPUT);
        // ws2812_port_reg = portModeRegister(digitalPinToPort(s2));
    }
    else
    {
        pinMask = digitalPinToBitMask(s1);
        ws2812_port = portOutputRegister(digitalPinToPort(s1));
        pinMode(s1, OUTPUT);
        // ws2812_port_reg = portModeRegister(digitalPinToPort(s1));
    }
    // *ws2812_port_reg |= pinMask; // set pinMode OUTPUT
    setNumber(4);
}
void MeRGBLed::reset(uint8_t port)
{
    s2 = mePort[port].s2;
    s1 = mePort[port].s1;
    pinMask = digitalPinToBitMask(s2);
    ws2812_port = portOutputRegister(digitalPinToPort(s2));
    // ws2812_port_reg = portModeRegister(digitalPinToPort(s2));
}
void MeRGBLed::setNumber(uint8_t num_leds)
{
    count_led = num_leds;
    pixels = (uint8_t *)malloc(count_led * 3);
}
cRGB MeRGBLed::getColorAt(uint8_t index)
{

    cRGB px_value;

    if(index < count_led)
    {

        uint8_t tmp;
        tmp = index * 3;

        px_value.g = pixels[tmp];
        px_value.r = pixels[tmp+1];
        px_value.b = pixels[tmp+2];
    }

    return px_value;
}

uint8_t MeRGBLed::getNumber()
{
    return count_led;
}
bool MeRGBLed::setColorAt(uint8_t index, uint8_t red, uint8_t green, uint8_t blue)
{
    if(index < count_led)
    {
        uint8_t tmp = index * 3;
        pixels[tmp] = green;
        pixels[tmp+1] = red;
        pixels[tmp+2] = blue;

        return true;
    }
    return false;
}
bool MeRGBLed::setColorAt(uint8_t index, long value)
{
    if(index < count_led)
    {
        uint8_t tmp = index * 3;
        uint8_t red = (value & 0xff0000) >> 16;
        uint8_t green = (value & 0xff00) >> 8;
        uint8_t blue = value & 0xff;
        pixels[tmp] = green;
        pixels[tmp+1] = red;
        pixels[tmp+2] = blue;
        return true;
    }
    return false;
}
void MeRGBLed::clear()
{
    for(int i = 0; i < count_led; i++)
    {
        setColorAt(i, 0, 0, 0);
    }
    show();
}
/*
  This routine writes an array of bytes with RGB values to the Dataout pin
  using the fast 800kHz clockless WS2811/2812 protocol.
*/

// Timing in ns
#define w_zeropulse   350
#define w_onepulse    900
#define w_totalperiod 1250

// Fixed cycles used by the inner loop
#define w_fixedlow    3
#define w_fixedhigh   6
#define w_fixedtotal  10

// Insert NOPs to match the timing, if possible
#define w_zerocycles    (((F_CPU/1000)*w_zeropulse          )/1000000)
#define w_onecycles     (((F_CPU/1000)*w_onepulse    +500000)/1000000)
#define w_totalcycles   (((F_CPU/1000)*w_totalperiod +500000)/1000000)

// w1 - nops between rising edge and falling edge - low
#define w1 (w_zerocycles-w_fixedlow)
// w2   nops between fe low and fe high
#define w2 (w_onecycles-w_fixedhigh-w1)
// w3   nops to complete loop
#define w3 (w_totalcycles-w_fixedtotal-w1-w2)

#if w1>0
#define w1_nops w1
#else
#define w1_nops  0
#endif

// The only critical timing parameter is the minimum pulse length of the "0"
// Warn or throw error if this timing can not be met with current F_CPU settings.
#define w_lowtime ((w1_nops+w_fixedlow)*1000000)/(F_CPU/1000)
#if w_lowtime>550
#error "Light_ws2812: Sorry, the clock speed is too low. Did you set F_CPU correctly?"
#elif w_lowtime>450
#warning "Light_ws2812: The timing is critical and may only work on WS2812B, not on WS2812(S)."
#warning "Please consider a higher clockspeed, if possible"
#endif

#if w2>0
#define w2_nops w2
#else
#define w2_nops  0
#endif

#if w3>0
#define w3_nops w3
#else
#define w3_nops  0
#endif

#define w_nop1  "nop      \n\t"
#define w_nop2  "rjmp .+0 \n\t"
#define w_nop4  w_nop2 w_nop2
#define w_nop8  w_nop4 w_nop4
#define w_nop16 w_nop8 w_nop8

void  MeRGBLed::rgbled_sendarray_mask(uint8_t *data, uint16_t datlen, uint8_t maskhi, uint8_t *port)
{
    uint8_t curbyte, ctr, masklo;
    uint8_t oldSREG = SREG;
    cli();  //Disables all interrupts

    masklo = *port & ~maskhi;
    maskhi = *port | maskhi;

    while (datlen--)
    {
        curbyte = *data++;

        asm volatile(
            "       ldi   %0,8  \n\t"
            "loop%=:            \n\t"
            "       st    X,%3 \n\t"    //  '1' [02] '0' [02] - re
#if (w1_nops&1)
            w_nop1
#endif
#if (w1_nops&2)
            w_nop2
#endif
#if (w1_nops&4)
            w_nop4
#endif
#if (w1_nops&8)
            w_nop8
#endif
#if (w1_nops&16)
            w_nop16
#endif
            "       sbrs  %1,7  \n\t"    //  '1' [04] '0' [03]
            "       st    X,%4 \n\t"     //  '1' [--] '0' [05] - fe-low
            "       lsl   %1    \n\t"    //  '1' [05] '0' [06]
#if (w2_nops&1)
            w_nop1
#endif
#if (w2_nops&2)
            w_nop2
#endif
#if (w2_nops&4)
            w_nop4
#endif
#if (w2_nops&8)
            w_nop8
#endif
#if (w2_nops&16)
            w_nop16
#endif
            "       brcc skipone%= \n\t"    //  '1' [+1] '0' [+2] -
            "       st   X,%4      \n\t"    //  '1' [+3] '0' [--] - fe-high
            "skipone%=:               "     //  '1' [+3] '0' [+2] -

#if (w3_nops&1)
            w_nop1
#endif
#if (w3_nops&2)
            w_nop2
#endif
#if (w3_nops&4)
            w_nop4
#endif
#if (w3_nops&8)
            w_nop8
#endif
#if (w3_nops&16)
            w_nop16
#endif

            "       dec   %0    \n\t"    //  '1' [+4] '0' [+3]
            "       brne  loop%=\n\t"    //  '1' [+5] '0' [+4]
            :	"=&d" (ctr)
            //    :	"r" (curbyte), "I" (_SFR_IO_ADDR(ws2812_PORTREG)), "r" (maskhi), "r" (masklo)
            :	"r" (curbyte), "x" (port), "r" (maskhi), "r" (masklo)
        );
    }

    SREG = oldSREG;
}
void MeRGBLed::show()
{
    //	*ws2812_port_reg |= pinMask; // Enable DDR
    rgbled_sendarray_mask(pixels, 3 * count_led, pinMask, (uint8_t *) ws2812_port);
}

MeRGBLed::~MeRGBLed()
{


}

//  function:       pack data into a package to send
//  param:  buf     buffer to save package
//          bufSize size of buf
//          module  the associated module of package
//          data    the data to pack
//          length  the length(size) of data
//  return: 0       error
//          other   package size
uint32_t MeHost_Pack(uint8_t * buf,
                     uint32_t bufSize, 
                     uint8_t module, 
                     uint8_t * data, 
                     uint32_t length)
{
    uint32_t i = 0;

    //  head: 0xA5
    buf[i++] = 0xA5;
    buf[i++] = module;
    //  pack length
    buf[i++] = *((uint8_t *)&length + 0);
    buf[i++] = *((uint8_t *)&length + 1);
    buf[i++] = *((uint8_t *)&length + 2);
    buf[i++] = *((uint8_t *)&length + 3);
    //  pack data
    for(uint32_t j = 0; j < length; ++j)
    {
        buf[i++] = data[j];
    }

    //  calculate the LRC
    uint8_t check = 0x00;
    for(uint32_t j = 0; j < length; ++j)
    {
        check ^= data[j];
    }
    buf[i++] = check;

    //  tail: 0x5A
    buf[i++] = 0x5A;

    if (i > bufSize)
    {
        return 0;
    }
    else
    {
        return i;
    }
}


#define BUF_SIZE            256
#define MASK                255

class MeHost_Parser
{
public:
    MeHost_Parser();
    ~MeHost_Parser();

    //  push data to buffer
    uint8_t PushStr(uint8_t * str, uint32_t length);
    uint8_t PushByte(uint8_t ch);
    //  run state machine
    uint8_t Run();
    //  get the package ready state
    uint8_t PackageReady();
    //  copy data to user's buffer
    uint8_t GetData(uint8_t *buf, uint32_t size);

    void Print(char *str, uint32_t * cnt);
private:
    int state;
    uint8_t buffer[BUF_SIZE];
    uint32_t in;
    uint32_t out;
    uint8_t packageReady;

    uint8_t module;
    uint32_t length;
    uint8_t *data;
    uint8_t check;

    uint32_t lengthRead;
    uint32_t currentDataPos;

    uint8_t GetByte(uint8_t * ch);
};


#define HEAD    0xA5
#define TAIL    0x5A

//  states
#define ST_WAIT_4_START     0x01
#define ST_HEAD_READ        0x02
#define ST_MODULE_READ      0x03
#define ST_LENGTH_READ      0x04
#define ST_DATA_READ        0x05
#define ST_CHECK_READ       0x06

MeHost_Parser::MeHost_Parser()
{
    state = ST_WAIT_4_START;
    in = 0;
    out = 0;
    packageReady = 0;

    module = 0;
    length = 0;
    data = NULL;
    check = 0;

    lengthRead = 0;
    currentDataPos = 0;
}

MeHost_Parser::~MeHost_Parser()
{
    ;
}

uint8_t MeHost_Parser::PackageReady()
{
    return (1 == packageReady);
}

uint8_t MeHost_Parser::PushStr(uint8_t * str, uint32_t length)
{
    if (length > ((in + BUF_SIZE - out - 1) & MASK))
    {
        return 0;
    }
    else
    {
        for (int i = 0; i < length; ++i)
        {
            PushByte(str[i]);
        }
    }
}

uint8_t MeHost_Parser::PushByte(uint8_t ch)
{
    if (((in + 1) & MASK) != out)
    {
        buffer[in] = ch;
        ++in;
        in &= MASK;
        return 1;
    }
    else
    {
        return 0;
    }
}

uint8_t MeHost_Parser::GetByte(uint8_t * ch)
{
    if (in != out)
    {
        *ch = buffer[out];
        ++out;
        out &= MASK;
        return 1;
    }
    else
    {
        // Serial.println("GET error!");
        return 0;
    }
}

uint8_t CalculateLRC(uint8_t *data, uint32_t length)
{
    uint8_t LRC = 0;
    for (uint32_t i = 0; i < length; ++i)
    {
        LRC ^= data[i];
    }
    return LRC;
}

uint8_t MeHost_Parser::Run(void)
{
    uint8_t ch = 0;
    while (GetByte(&ch))
    {
        switch (state)
        {
        case ST_WAIT_4_START:
            if (HEAD == ch)
            {
                state = ST_HEAD_READ;
            }
            break;
        case ST_HEAD_READ:
            module = ch;
            state = ST_MODULE_READ;
            break;
        case ST_MODULE_READ:
            //  read 4 bytes as "length"
            *(((uint8_t *)&length) + lengthRead) = ch;
            ++lengthRead;
            if (4 == lengthRead)
            {
                lengthRead = 0;
                state = ST_LENGTH_READ;
            }
            break;
        case ST_LENGTH_READ:
            //  alloc space for data
            if (0 == currentDataPos)
            {
                if (length > 255)
                {
                    state = ST_WAIT_4_START;
                    currentDataPos = 0;
                    lengthRead = 0;
                    length = 0;
                    module = 0;
                    check = 0;
                    break;
                }
                data = (uint8_t *)malloc(length + 1);
                if (NULL == data)
                {
                    state = ST_WAIT_4_START;
                    currentDataPos = 0;
                    lengthRead = 0;
                    length = 0;
                    module = 0;
                    check = 0;
                    break;
                }
            }
            //  read data
            data[currentDataPos] = ch;
            ++currentDataPos;
            if (currentDataPos == length)
            {
                currentDataPos = 0;
                state = ST_DATA_READ;
            }
            break;
        case ST_DATA_READ:
            check = ch;
            if (check != CalculateLRC(data, length))
            {
                state = ST_WAIT_4_START;
                if (NULL != data)
                {
                    free(data);
                    data = NULL;
                }
                currentDataPos = 0;
                lengthRead = 0;
                length = 0;
                module = 0;
                check = 0;
            }
            else
            {
                state = ST_CHECK_READ;
            }
            break;
        case ST_CHECK_READ:
            if (TAIL != ch)
            {
                if (NULL != data)
                {
                    free(data);
                    data = NULL;
                }
                length = 0;
            }
            else
            {
                packageReady = 1;
            }
            state = ST_WAIT_4_START;
            currentDataPos = 0;
            lengthRead = 0;
            module = 0;
            check = 0;
            break;
        default:
            break;
        }
    }
    return state;
}



uint8_t MeHost_Parser::GetData(uint8_t *buf, uint32_t size)
{
    int copySize = (size > length) ? length : size;
    if ((NULL != data) && (NULL != buf))
    {
        memcpy(buf, data, copySize);
        free(data);
        data = NULL;
        length = 0;
        packageReady = 0;

        return copySize;
    }
    else
    {
        return 0;
    }
}

//  frame type
#define ENCODER_MOTOR_GET_PARAM     0x01
#define ENCODER_MOTOR_SAVE_PARAM    0x02
#define ENCODER_MOTOR_TEST_PARAM    0x03
#define ENCODER_MOTOR_SHOW_PARAM    0x04
#define ENCODER_MOTOR_RUN_STOP      0x05
#define ENCODER_MOTOR_GET_DIFF_POS  0x06
#define ENCODER_MOTOR_RESET         0x07
#define ENCODER_MOTOR_SPEED_TIME    0x08
#define ENCODER_MOTOR_GET_SPEED     0x09
#define ENCODER_MOTOR_GET_POS       0x10
#define ENCODER_MOTOR_MOVE          0x11
#define ENCODER_MOTOR_MOVE_TO       0x12
#define ENCODER_MOTOR_DEBUG_STR     0xCC
#define ENCODER_MOTOR_ACKNOWLEDGE   0xFF

MeHost_Parser encoderParser = MeHost_Parser();

/*          EncoderMotor        */
MeEncoderMotor::MeEncoderMotor(uint8_t addr,uint8_t slot):MeWire(addr - 1)
{
    _slot = slot - 1;
}

void MeEncoderMotor::begin()
{
    MeWire::begin();
    Reset();
}

boolean MeEncoderMotor::Reset()
{
    uint8_t w[10] = {0};
    uint8_t r[10] = {0};

    uint8_t data[2] = {0};
    data[0] = _slot;
    data[1] = ENCODER_MOTOR_RESET;

    MeHost_Pack(w, 10, 0x01, data, 2);
    request(w, r, 10, 10);
    encoderParser.PushStr(r, 10);

    uint8_t ack[2] = {0};
    encoderParser.GetData(ack, 2);
    return ack[1];
}

boolean MeEncoderMotor::MoveTo(float angle, float speed)
{
    uint8_t w[18] = {0};
    uint8_t r[10] = {0};

    uint8_t data[10] = {0};
    data[0] = _slot;
    data[1] = ENCODER_MOTOR_MOVE_TO;
    *((float *)(data + 2)) = angle;
    *((float *)(data + 6)) = speed;

    MeHost_Pack(w, 18, 0x01, data, 10);
    request(w, r, 18, 10);
    encoderParser.PushStr(r, 10);
    encoderParser.Run();

    uint8_t ack[2] = {0};
    encoderParser.GetData(ack, 2);
    return ack[1];
}

boolean MeEncoderMotor::Move(float angle, float speed)
{
    uint8_t w[18] = {0};
    uint8_t r[10] = {0};

    uint8_t data[10] = {0};
    data[0] = _slot;
    data[1] = ENCODER_MOTOR_MOVE;
    *((float *)(data + 2)) = angle;
    *((float *)(data + 6)) = speed;

    MeHost_Pack(w, 18, 0x01, data, 10);
    request(w, r, 18, 10);
    encoderParser.PushStr(r, 10);
    encoderParser.Run();

    uint8_t ack[2] = {0};
    encoderParser.GetData(ack, 2);
    return ack[1];
}

boolean MeEncoderMotor::RunTurns(float turns, float speed)
{
    return Move(turns * 360, speed);
}

boolean MeEncoderMotor::RunSpeed(float speed)
{
    uint8_t w[14] = {0};
    uint8_t r[10] = {0};

    uint8_t data[6] = {0};
    data[0] = _slot;
    data[1] = ENCODER_MOTOR_RUN_STOP;
    *((float *)(data + 2)) = speed;

    MeHost_Pack(w, 14, 0x01, data, 6);
    request(w, r, 14, 10);
    encoderParser.PushStr(r, 10);
    encoderParser.Run();

    // uint8_t ack[2] = {0};
    // encoderParser.GetData(ack, 2);
    // return ack[1];
    return 0;
}

boolean MeEncoderMotor::RunSpeedAndTime(float speed, float time)
{
    uint8_t w[18] = {0};
    uint8_t r[10] = {0};

    uint8_t data[10] = {0};
    data[0] = _slot;
    data[1] = ENCODER_MOTOR_SPEED_TIME;
    *((float *)(data + 2)) = speed;
    *((float *)(data + 6)) = time;

    MeHost_Pack(w, 18, 0x01, data, 10);
    request(w, r, 18, 10);
    encoderParser.PushStr(r, 10);
    encoderParser.Run();

    // uint8_t ack[2] = {0};
    // encoderParser.GetData(ack, 2);
    // return ack[1];
    return 0;
}

float MeEncoderMotor::GetCurrentSpeed()
{
    uint8_t w[10] = {0};
    uint8_t r[14] = {0};

    uint8_t data[2] = {0};
    data[0] = _slot;
    data[1] = ENCODER_MOTOR_GET_SPEED;

    MeHost_Pack(w, 10, 0x01, data, 2);
    request(w, r, 10, 14);
    encoderParser.PushStr(r, 14);
    encoderParser.Run();

    uint8_t temp[6] = {0};
    encoderParser.GetData(temp, 6);
    float speed = *((float *)(temp + 2));
    return speed;
}

float MeEncoderMotor::GetCurrentPosition()
{
    uint8_t w[10] = {0};
    uint8_t r[14] = {0};

    uint8_t data[2] = {0};
    data[0] = _slot;
    data[1] = ENCODER_MOTOR_GET_POS;

    MeHost_Pack(w, 10, 0x01, data, 2);
    request(w, r, 10, 14);
    encoderParser.PushStr(r, 14);

    encoderParser.Run();

    uint8_t temp[6] = {0};
    uint8_t size = encoderParser.GetData(temp, 6);
    float pos = *((float *)(temp + 2));
    return pos;
}

/*Me4Button*/
Me4Button::Me4Button() : MePort(0)
{

}
Me4Button::Me4Button(uint8_t port) : MePort(port)
{

}

uint8_t Me4Button::pressed()
{
    uint8_t returnKey = NULL_KEY;
    uint16_t t = 0;
    for(uint8_t i = 0; i < 4; i++)
    {
        t += MePort::aRead2();
        delay(1);
    }
    t >>= 2;
    t /= 100;
    switch(t)
    {
    case 0:
        returnKey = KEY1;
        break;

    case 4:
    case 5:
        returnKey = KEY2;
        break;

    case 6:
        returnKey = KEY3;
        break;

    case 7:
        returnKey = KEY4;
        break;

    case 9:
    case 10:
        returnKey = NULL_KEY;
        break;
    }
    return returnKey;
}


/*      Joystick        */
MeJoystick::MeJoystick() : MePort(0) {}
MeJoystick::MeJoystick(uint8_t port) : MePort(port) {}

int MeJoystick::readX()
{
    return MePort::aRead1() ;
}

int MeJoystick::readY()
{

    return MePort::aRead2();
}

float MeJoystick::angle()
{
    return atan2(readY(), readX()) * 180.0 / PI;
}

float MeJoystick::strength()
{
    long dx = abs(readX());
    long dy = abs(readY());
    long dist = dx * dx + dy * dy;
    return min(1.0, sqrt(dist) / 255.0);
}

/*      Light Sensor        */
MeLightSensor::MeLightSensor() : MePort(0) {}
MeLightSensor::MeLightSensor(uint8_t port) : MePort(port) {}
int MeLightSensor::read()
{
    return MePort::aRead2();
}

void MeLightSensor::lightOn()
{
    MePort::dWrite1(HIGH);
}

void MeLightSensor::lightOff()
{
    MePort::dWrite1(LOW);
}

float MeLightSensor::strength()
{

    return map(MePort::aRead2(), 0, 1023, 0, 1023);
}

/*      Sound Sensor        */
MeSoundSensor::MeSoundSensor() : MePort(0) {}
MeSoundSensor::MeSoundSensor(uint8_t port) : MePort(port) {}

int MeSoundSensor::strength()
{
    return MePort::aRead2();
}

MeOneWire::MeOneWire()
{

}
MeOneWire::MeOneWire(uint8_t pin)
{
    bitmask = MePIN_TO_BITMASK(pin);
    baseReg = MePIN_TO_BASEREG(pin);
    //	reset_search();
}
void MeOneWire::reset(uint8_t pin)
{
    bitmask = MePIN_TO_BITMASK(pin);
    baseReg = MePIN_TO_BASEREG(pin);
    //	reset_search();
}
bool MeOneWire::readIO(void)
{
    MeIO_REG_TYPE mask = bitmask;
    volatile MeIO_REG_TYPE *reg MeIO_REG_ASM = baseReg;
    uint8_t r;
    MeDIRECT_MODE_INPUT(reg, mask);	// allow it to float
    delayMicroseconds(10);
    r = MeDIRECT_READ(reg, mask);
    return r;
}
// Perform the MeOneWire reset function.  We will wait up to 250uS for
// the bus to come high, if it doesn't then it is broken or shorted
// and we return a 0;
//
// Returns 1 if a device asserted a presence pulse, 0 otherwise.
//
uint8_t MeOneWire::reset(void)
{
    MeIO_REG_TYPE mask = bitmask;
    volatile MeIO_REG_TYPE *reg MeIO_REG_ASM = baseReg;
    uint8_t r;
    uint8_t retries = 125;

    noInterrupts();
    MeDIRECT_MODE_INPUT(reg, mask);
    interrupts();
    // wait until the wire is high... just in case
    do
    {
        if (--retries == 0) return 0;
        delayMicroseconds(2);
    }
    while ( !MeDIRECT_READ(reg, mask));

    noInterrupts();
    MeDIRECT_WRITE_LOW(reg, mask);
    MeDIRECT_MODE_OUTPUT(reg, mask);	// drive output low
    interrupts();
    delayMicroseconds(480);
    noInterrupts();
    MeDIRECT_MODE_INPUT(reg, mask);	// allow it to float
    delayMicroseconds(70);
    r = !MeDIRECT_READ(reg, mask);
    interrupts();
    delayMicroseconds(410);
    return r;
}

//
// Write a bit. Port and bit is used to cut lookup time and provide
// more certain timing.
//
void MeOneWire::write_bit(uint8_t v)
{
    MeIO_REG_TYPE mask = bitmask;
    volatile MeIO_REG_TYPE *reg MeIO_REG_ASM = baseReg;

    if (v & 1)
    {
        noInterrupts();
        MeDIRECT_WRITE_LOW(reg, mask);
        MeDIRECT_MODE_OUTPUT(reg, mask);	// drive output low
        delayMicroseconds(10);
        MeDIRECT_WRITE_HIGH(reg, mask);	// drive output high
        interrupts();
        delayMicroseconds(55);
    }
    else
    {
        noInterrupts();
        MeDIRECT_WRITE_LOW(reg, mask);
        MeDIRECT_MODE_OUTPUT(reg, mask);	// drive output low
        delayMicroseconds(65);
        MeDIRECT_WRITE_HIGH(reg, mask);	// drive output high
        interrupts();
        delayMicroseconds(5);
    }
}

//
// Read a bit. Port and bit is used to cut lookup time and provide
// more certain timing.
//
uint8_t MeOneWire::read_bit(void)
{
    MeIO_REG_TYPE mask = bitmask;
    volatile MeIO_REG_TYPE *reg MeIO_REG_ASM = baseReg;
    uint8_t r;

    noInterrupts();
    MeDIRECT_MODE_OUTPUT(reg, mask);
    MeDIRECT_WRITE_LOW(reg, mask);
    delayMicroseconds(3);
    MeDIRECT_MODE_INPUT(reg, mask);	// let pin float, pull up will raise
    delayMicroseconds(10);
    r = MeDIRECT_READ(reg, mask);
    interrupts();
    delayMicroseconds(53);
    return r;
}

//
// Write a byte. The writing code uses the active drivers to raise the
// pin high, if you need power after the write (e.g. DS18S20 in
// parasite power mode) then set 'power' to 1, otherwise the pin will
// go tri-state at the end of the write to avoid heating in a short or
// other mishap.
//
void MeOneWire::write(uint8_t v, uint8_t power /* = 0 */)
{
    uint8_t bitMask;

    for (bitMask = 0x01; bitMask; bitMask <<= 1)
    {
        MeOneWire::write_bit( (bitMask & v) ? 1 : 0);
    }
    if ( !power)
    {
        noInterrupts();
        MeDIRECT_MODE_INPUT(baseReg, bitmask);
        MeDIRECT_WRITE_LOW(baseReg, bitmask);
        interrupts();
    }
}

void MeOneWire::write_bytes(const uint8_t *buf, uint16_t count, bool power /* = 0 */)
{
    for (uint16_t i = 0 ; i < count ; i++)
        write(buf[i]);
    if (!power)
    {
        noInterrupts();
        MeDIRECT_MODE_INPUT(baseReg, bitmask);
        MeDIRECT_WRITE_LOW(baseReg, bitmask);
        interrupts();
    }
}

//
// Read a byte
//
uint8_t MeOneWire::read()
{
    uint8_t bitMask;
    uint8_t r = 0;

    for (bitMask = 0x01; bitMask; bitMask <<= 1)
    {
        if ( MeOneWire::read_bit()) r |= bitMask;
    }
    return r;
}

void MeOneWire::read_bytes(uint8_t *buf, uint16_t count)
{
    for (uint16_t i = 0 ; i < count ; i++)
        buf[i] = read();
}

//
// Do a ROM select
//
void MeOneWire::select(const uint8_t rom[8])
{
    uint8_t i;

    write(0x55);           // Choose ROM

    for (i = 0; i < 8; i++) write(rom[i]);
}

//
// Do a ROM skip
//
void MeOneWire::skip()
{
    write(0xCC);           // Skip ROM
}

void MeOneWire::depower()
{
    noInterrupts();
    MeDIRECT_MODE_INPUT(baseReg, bitmask);
    interrupts();
}

void MeOneWire::reset_search()
{
    // reset the search state
    LastDiscrepancy = 0;
    LastDeviceFlag = FALSE;
    LastFamilyDiscrepancy = 0;
    for(int i = 7; ; i--)
    {
        ROM_NO[i] = 0;
        if ( i == 0) break;
    }
}

// Setup the search to find the device type 'family_code' on the next call
// to search(*newAddr) if it is present.
//
void MeOneWire::target_search(uint8_t family_code)
{
    // set the search state to find SearchFamily type devices
    ROM_NO[0] = family_code;
    for (uint8_t i = 1; i < 8; i++)
        ROM_NO[i] = 0;
    LastDiscrepancy = 64;
    LastFamilyDiscrepancy = 0;
    LastDeviceFlag = FALSE;
}

//
// Perform a search. If this function returns a '1' then it has
// enumerated the next device and you may retrieve the ROM from the
// MeOneWire::address variable. If there are no devices, no further
// devices, or something horrible happens in the middle of the
// enumeration then a 0 is returned.  If a new device is found then
// its address is copied to newAddr.  Use MeOneWire::reset_search() to
// start over.
//
// --- Replaced by the one from the Dallas Semiconductor web site ---
//--------------------------------------------------------------------------
// Perform the 1-Wire Search Algorithm on the 1-Wire bus using the existing
// search state.
// Return TRUE  : device found, ROM number in ROM_NO buffer
//        FALSE : device not found, end of search
//
uint8_t MeOneWire::search(uint8_t *newAddr)
{
    uint8_t id_bit_number;
    uint8_t last_zero, rom_byte_number, search_result;
    uint8_t id_bit, cmp_id_bit;

    unsigned char rom_byte_mask, search_direction;

    // initialize for search
    id_bit_number = 1;
    last_zero = 0;
    rom_byte_number = 0;
    rom_byte_mask = 1;
    search_result = 0;

    // if the last call was not the last one
    if (!LastDeviceFlag)
    {
        // 1-Wire reset
        if (!reset())
        {
            // reset the search
            LastDiscrepancy = 0;
            LastDeviceFlag = FALSE;
            LastFamilyDiscrepancy = 0;
            return FALSE;
        }

        // issue the search command
        write(0xF0);

        // loop to do the search
        do
        {
            // read a bit and its complement
            id_bit = read_bit();
            cmp_id_bit = read_bit();

            // check for no devices on 1-wire
            if ((id_bit == 1) && (cmp_id_bit == 1))
                break;
            else
            {
                // all devices coupled have 0 or 1
                if (id_bit != cmp_id_bit)
                    search_direction = id_bit;  // bit write value for search
                else
                {
                    // if this discrepancy if before the Last Discrepancy
                    // on a previous next then pick the same as last time
                    if (id_bit_number < LastDiscrepancy)
                        search_direction = ((ROM_NO[rom_byte_number] & rom_byte_mask) > 0);
                    else
                        // if equal to last pick 1, if not then pick 0
                        search_direction = (id_bit_number == LastDiscrepancy);

                    // if 0 was picked then record its position in LastZero
                    if (search_direction == 0)
                    {
                        last_zero = id_bit_number;

                        // check for Last discrepancy in family
                        if (last_zero < 9)
                            LastFamilyDiscrepancy = last_zero;
                    }
                }

                // set or clear the bit in the ROM byte rom_byte_number
                // with mask rom_byte_mask
                if (search_direction == 1)
                    ROM_NO[rom_byte_number] |= rom_byte_mask;
                else
                    ROM_NO[rom_byte_number] &= ~rom_byte_mask;

                // serial number search direction write bit
                write_bit(search_direction);

                // increment the byte counter id_bit_number
                // and shift the mask rom_byte_mask
                id_bit_number++;
                rom_byte_mask <<= 1;

                // if the mask is 0 then go to new SerialNum byte rom_byte_number and reset mask
                if (rom_byte_mask == 0)
                {
                    rom_byte_number++;
                    rom_byte_mask = 1;
                }
            }
        }
        while(rom_byte_number < 8);  // loop until through all ROM bytes 0-7

        // if the search was successful then
        if (!(id_bit_number < 65))
        {
            // search successful so set LastDiscrepancy,LastDeviceFlag,search_result
            LastDiscrepancy = last_zero;

            // check for last device
            if (LastDiscrepancy == 0)
                LastDeviceFlag = TRUE;

            search_result = TRUE;
        }
    }

    // if no device found then reset counters so next 'search' will be like a first
    if (!search_result || !ROM_NO[0])
    {
        LastDiscrepancy = 0;
        LastDeviceFlag = FALSE;
        LastFamilyDiscrepancy = 0;
        search_result = FALSE;
    }
    for (int i = 0; i < 8; i++) newAddr[i] = ROM_NO[i];
    return search_result;
}

// DS18B20 commands
#define STARTCONVO      0x44  // Tells device to take a temperature reading and put it on the scratchpad
#define COPYSCRATCH     0x48  // Copy EEPROM
#define READSCRATCH     0xBE  // Read EEPROM
#define WRITESCRATCH    0x4E  // Write to EEPROM
#define RECALLSCRATCH   0xB8  // Reload from last known
#define READPOWERSUPPLY 0xB4  // Determine if device needs parasite power
#define ALARMSEARCH     0xEC  // Query bus for devices with an alarm condition

// Scratchpad locations
//#define TEMP_LSB        0
//#define TEMP_MSB        1
//#define HIGH_ALARM_TEMP 2
//#define LOW_ALARM_TEMP  3
//#define CONFIGURATION   4
//#define INTERNAL_BYTE   5
//#define COUNT_REMAIN    6
//#define COUNT_PER_C     7
//#define SCRATCHPAD_CRC  8

// Device resolution
//#define TEMP_9_BIT  0x1F //  9 bit
//#define TEMP_10_BIT 0x3F // 10 bit
//#define TEMP_11_BIT 0x5F // 11 bit
//#define TEMP_12_BIT 0x7F // 12 bit

MeTemperature::MeTemperature(): MePort()
{

}
MeTemperature::MeTemperature(uint8_t port): MePort(port)
{
    _ts.reset(s2);
}
MeTemperature::MeTemperature(uint8_t port, uint8_t slot): MePort(port)
{
    MePort::reset(port, slot);
    _ts.reset( slot == SLOT2 ? s2 : s1);
}
void MeTemperature::reset(uint8_t port, uint8_t slot)
{
    MePort::reset(port, slot);
    _ts.reset( slot == SLOT2 ? s2 : s1);
}
float MeTemperature::temperature()
{

    byte i;
    byte present = 0;
    byte type_s;
    byte data[12];
    byte addr[8];
    float celsius;
    long time;

    _ts.reset();
    _ts.skip();
    _ts.write(STARTCONVO);        // start conversion, with parasite power on at the end
    time = millis();
    while(!_ts.readIO() && (millis() - time) < 750);

    present = _ts.reset();
    _ts.skip();
    _ts.write(READSCRATCH);
    for ( i = 0; i < 5; i++)             // we need 9 bytes
    {
        data[i] = _ts.read();
    }

    int16_t rawTemperature = (data[1] << 8) | data[0];

    return (float)rawTemperature * 0.0625;// 12 bit
}

static int8_t TubeTab[] = {0x3f, 0x06, 0x5b, 0x4f,
                           0x66, 0x6d, 0x7d, 0x07,
                           0x7f, 0x6f, 0x77, 0x7c,
                           0x39, 0x5e, 0x79, 0x71,
                           0xbf, 0x86, 0xdb, 0xcf,
                           0xe6, 0xed, 0xfd, 0x87,
                           0xff, 0xef, 0xf7, 0xfc,
                           0xb9, 0xde, 0xf9, 0xf1, 0, 0x40
                          };//0~9,A,b,C,d,E,F,-,NUL
Me7SegmentDisplay::Me7SegmentDisplay(): MePort()
{
}
Me7SegmentDisplay::Me7SegmentDisplay(uint8_t port): MePort(port)
{
    Clkpin = s2;
    Datapin = s1;
    pinMode(Clkpin, OUTPUT);
    pinMode(Datapin, OUTPUT);
    set();
    clearDisplay();
}
void Me7SegmentDisplay::reset(uint8_t port)
{
    reset(port);
    Clkpin = s2;
    Datapin = s1;
    pinMode(Clkpin, OUTPUT);
    pinMode(Datapin, OUTPUT);
    set();
    clearDisplay();
}
void Me7SegmentDisplay::init(void)
{
    clearDisplay();
}

void Me7SegmentDisplay::writeByte(int8_t wr_data)
{
    uint8_t i, count1;
    for(i = 0; i < 8; i++)  //sent 8bit data
    {
        digitalWrite(Clkpin, LOW);
        if(wr_data & 0x01)digitalWrite(Datapin, HIGH); //LSB first
        else digitalWrite(Datapin, LOW);
        wr_data >>= 1;
        digitalWrite(Clkpin, HIGH);

    }
    digitalWrite(Clkpin, LOW); //wait for the ACK
    digitalWrite(Datapin, HIGH);
    digitalWrite(Clkpin, HIGH);
    pinMode(Datapin, INPUT);
    while(digitalRead(Datapin))
    {
        count1 += 1;
        if(count1 == 200)//
        {
            pinMode(Datapin, OUTPUT);
            digitalWrite(Datapin, LOW);
            count1 = 0;
        }
        //pinMode(Datapin,INPUT);
    }
    pinMode(Datapin, OUTPUT);

}
//send start signal to TM1637
void Me7SegmentDisplay::start(void)
{
    digitalWrite(Clkpin, HIGH); //send start signal to TM1637
    digitalWrite(Datapin, HIGH);
    digitalWrite(Datapin, LOW);
    digitalWrite(Clkpin, LOW);
}
//End of transmission
void Me7SegmentDisplay::stop(void)
{
    digitalWrite(Clkpin, LOW);
    digitalWrite(Datapin, LOW);
    digitalWrite(Clkpin, HIGH);
    digitalWrite(Datapin, HIGH);
}


void Me7SegmentDisplay::display(uint16_t value)
{
    display((int)value);
    // display((double)value,0);
}

void Me7SegmentDisplay::display(int16_t value)
{
    display((double)value, 0);
}

void Me7SegmentDisplay::display(double value, uint8_t digits)
{


AA:
    int8_t buf[4] = {' ', ' ', ' ', ' '};
    int8_t tempBuf[4];
    uint8_t b = 0;
    uint8_t bit_num = 0;
    uint8_t  int_num = 0;
    uint8_t isNeg = 0;
    double number = value;
    if (number >= 9999.5 || number <= -999.5);
    else
    {
        // Handle negative numbers
        if (number < 0.0)
        {
            number = -number;
            isNeg = 1 ;
        }
        // Round correctly so that print(1.999, 2) prints as "2.00"
        double rounding = 0.5;
        for (uint8_t i = 0; i < digits; ++i)
            rounding /= 10.0;
        number += rounding;

        // Extract the integer part of the number and print it
        uint16_t int_part = (uint16_t )number;
        double remainder = number - (double)int_part;
        do
        {
            uint16_t m = int_part;
            int_part /= 10;
            char c = m - 10 * int_part;
            tempBuf[int_num] = c;
            int_num++;
        }
        while(int_part);

        bit_num = isNeg + int_num + digits;

        if(bit_num > 4)
        {
            bit_num = 4;
            digits = 4 - (isNeg + int_num);
            goto AA;
        }
        b = 4 - bit_num;
        if(isNeg)buf[b++] = 0x21;

        for(uint8_t i = int_num; i > 0; i--)buf[b++] = tempBuf[i-1];
        // Print the decimal point, but only if there are digits beyond
        if (digits > 0)
        {
            buf[b-1] += 0x10;
            // Extract digits from the remainder one at a time
            while (digits-- > 0)
            {
                remainder *= 10.0;
                int toPrint = int(remainder);
                buf[b++] = toPrint;
                remainder -= toPrint;
            }
        }
    }
    display(buf);
}

void Me7SegmentDisplay::write(int8_t SegData[])
{
    uint8_t i;
    start();          //start signal sent to TM1637 from MCU
    writeByte(ADDR_AUTO);
    stop();
    start();
    writeByte(Cmd_SetAddr);
    for(i = 0; i < 4; i ++)
    {
        writeByte(SegData[i]);
    }
    stop();
    start();
    writeByte(Cmd_DispCtrl);
    stop();
}
void Me7SegmentDisplay::write(uint8_t BitAddr, int8_t SegData)
{
    start();          //start signal sent to TM1637 from MCU
    writeByte(ADDR_FIXED);
    stop();
    start();
    writeByte(BitAddr | 0xc0);
    writeByte(SegData);
    stop();
    start();
    writeByte(Cmd_DispCtrl);
    stop();
}
void Me7SegmentDisplay::display(int8_t DispData[])
{
    int8_t SegData[4];
    uint8_t i;
    for(i = 0; i < 4; i ++)
    {
        SegData[i] = DispData[i];
    }
    coding(SegData);
    write(SegData);
}
//******************************************
void Me7SegmentDisplay::display(uint8_t BitAddr, int8_t DispData)
{
    int8_t SegData;

    if((DispData >= 'A' && DispData <= 'F'))DispData = DispData - 'A' + 10;
    else if((DispData >= 'a' && DispData <= 'f'))DispData = DispData - 'a' + 10;
    SegData = coding(DispData);
    write(BitAddr, SegData); //
}

void Me7SegmentDisplay::clearDisplay(void)
{
    int8_t buf[4] = {' ', ' ', ' ', ' '};
    display(buf);
}
//To take effect the next time it displays.
void Me7SegmentDisplay::set(uint8_t brightness, uint8_t SetData, uint8_t SetAddr)
{
    Cmd_SetData = SetData;
    Cmd_SetAddr = SetAddr;
    Cmd_DispCtrl = 0x88 + brightness;//Set the brightness and it takes effect the next time it displays.
}


void Me7SegmentDisplay::coding(int8_t DispData[])
{
    //  uint8_t PointData = 0;
    for(uint8_t i = 0; i < 4; i ++)
    {
        DispData[i] = TubeTab[DispData[i]];
    }
}
int8_t Me7SegmentDisplay::coding(int8_t DispData)
{
    //  uint8_t PointData = 0;
    DispData = TubeTab[DispData] ;//+ PointData;
    return DispData;
}
/*************Me Potentiometer****/
MePotentiometer::MePotentiometer(): MePort(0)
{

}
MePotentiometer::MePotentiometer(uint8_t port): MePort(port)
{

}
uint16_t MePotentiometer::read()
{
    return MePort::aRead2();
}

/*************Me PIR motion sensor****/
MePIRMotionSensor::MePIRMotionSensor(): MePort(0)
{

}
MePIRMotionSensor::MePIRMotionSensor(uint8_t port): MePort(port)
{
    pinMode(s2, INPUT);
}
bool MePIRMotionSensor::isPeopleDetected()
{
    return MePort::dRead2();
}

/***********Me GYRO*********/
MeGyro::MeGyro()
{

}
void MeGyro::begin()
{
    gSensitivity = 65.5; // for 500 deg/s, check data sheet
    gx = 0;
    gy = 0;
    gz = 0;
    gyrX = 0;
    gyrY = 0;
    gyrZ = 0;
    accX = 0;
    accY = 0;
    accZ = 0;
    gyrXoffs = -281.00;
    gyrYoffs = 18.00;
    gyrZoffs = -83.00;
    FREQ = 30.0;
    Wire.begin();
    delay(1000);
    writeReg (0x6b, 0x00);
    // CONFIG:
    // Low pass filter samples, 1khz sample rate
    writeReg (0x1a, 0x01);
    writeReg(0x1b, 0x08);
    uint8_t sample_div = 1000 / FREQ - 1;
    writeReg (0x19, sample_div);
    calibrate();
}
double MeGyro::angleX()
{
    if(accZ == 0)return 0;
    return (atan((float)accY / (float)accZ)) * 180 / 3.1415926;
}
double MeGyro::angleY()
{
    if(accZ == 0)return 0;
    return (atan((float)accX / (float)accZ)) * 180 / 3.1415926;
}
double MeGyro::angleZ()
{
    if(accY == 0)return 0;
    return (atan((float)accX / (float)accY)) * 180 / 3.1415926;
}
void MeGyro::calibrate()
{
    int x;
    long xSum = 0, ySum = 0, zSum = 0;
    int num = 500;
    uint8_t error;
    for (x = 0; x < num; x++)
    {
        error = readData(0x43, i2cData, 6);
        xSum += ((i2cData[0] << 8) | i2cData[1]);
        ySum += ((i2cData[2] << 8) | i2cData[3]);
        zSum += ((i2cData[4] << 8) | i2cData[5]);
    }
    gyrXoffs = xSum / num;
    gyrYoffs = ySum / num;
    gyrZoffs = zSum / num;
}
void MeGyro::update()
{
    unsigned long start_time = millis();
    uint8_t error;
    // read imu data
    error = readData(0x3b, i2cData, 14);
    if(error != 0)
        return;

    double ax, ay, az;
    // assemble 16 bit sensor data
    accX = ((i2cData[0] << 8) | i2cData[1]);
    accY = ((i2cData[2] << 8) | i2cData[3]);
    accZ = ((i2cData[4] << 8) | i2cData[5]);

    gyrX = (((i2cData[8] << 8) | i2cData[9]) - gyrXoffs) / gSensitivity;
    gyrY = (((i2cData[10] << 8) | i2cData[11]) - gyrYoffs) / gSensitivity;
    gyrZ = (((i2cData[12] << 8) | i2cData[13]) - gyrZoffs) / (gSensitivity + 1);

    ay = atan2(accX, sqrt( pow(accY, 2) + pow(accZ, 2))) * 180 / M_PI;
    ax = atan2(accY, sqrt( pow(accX, 2) + pow(accZ, 2))) * 180 / M_PI;

    // angles based on gyro (deg/s)
    gx = gx + gyrX / FREQ;
    gy = gy - gyrY / FREQ;
    gz += gyrZ / FREQ;

    // complementary filter
    // tau = DT*(A)/(1-A)
    // = 0.48sec
    gx = gx * 0.96 + ax * 0.04;
    gy = gy * 0.96 + ay * 0.04;

    //delay(((1/FREQ) * 1000) - (millis() - start_time)-time);
}
int MeGyro::readData(int start, uint8_t *buffer, int size)
{
    int i, n, error;
    Wire.beginTransmission(0x68);
    n = Wire.write(start);
    if (n != 1)
        return (-10);
    n = Wire.endTransmission(false);    // hold the I2C-bus
    if (n != 0)
        return (n);
    delayMicroseconds(1);
    // Third parameter is true: relase I2C-bus after data is read.
    Wire.requestFrom(0x68, size, true);
    i = 0;
    while(Wire.available() && i < size)
    {
        buffer[i++] = Wire.read();
    }
    delayMicroseconds(1);
    if ( i != size)
        return (-11);
    return (0);  // return : no error
}
int MeGyro::writeData(int start, const uint8_t *pData, int size)
{
    int n, error;
    Wire.beginTransmission(0x68);
    n = Wire.write(start);        // write the start address
    if (n != 1)
        return (-20);
    n = Wire.write(pData, size);  // write data bytes
    if (n != size)
        return (-21);
    error = Wire.endTransmission(true); // release the I2C-bus
    if (error != 0)
        return (error);
    return (0);         // return : no error
}
int MeGyro::writeReg(int reg, uint8_t data)
{
    int error;
    error = writeData(reg, &data, 1);
    return (error);
}


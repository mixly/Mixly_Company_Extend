///@file Makeblock.h head file of Makeblock Library V2.1.0916
///Define the interface of Makeblock Library

//#include <inttypes.h>

#ifndef Makeblock_h
#define Makeblock_h

#include <Arduino.h>
#include <SoftwareSerial.h>
#include <Wire.h>
#include <avr/interrupt.h>
#include <avr/io.h>
#ifndef F_CPU
#define  F_CPU 16000000UL
#endif
#include <util/delay.h>
#include <stdint.h>
#include <stdlib.h>

typedef struct
{
    uint8_t s1;
    uint8_t s2;
} MePort_Sig;
extern MePort_Sig mePort[11];//mePort[0] is nonsense

struct cRGB
{
    uint8_t g;
    uint8_t r;
    uint8_t b;
};

#define NC 					-1

#define PORT_1 				0x01
#define PORT_2 				0x02
#define PORT_3 				0x03
#define PORT_4 				0x04
#define PORT_5 				0x05
#define PORT_6 				0x06
#define PORT_7 				0x07
#define PORT_8 				0x08
#define M1     				0x09
#define M2     				0x0a

#define SLOT1 				1
#define SLOT2 				2
#if defined(__AVR_ATmega32U4__)
// buzzer
#define buzzerOn()  DDRE |= 0x04,PORTE |= B00000100
#define buzzerOff() DDRE |= 0x04,PORTE &= B11111011
#else
#define buzzerOn()  pinMode(SCL,OUTPUT),digitalWrite(SCL, HIGH)
#define buzzerOff() pinMode(SCL,OUTPUT),digitalWrite(SCL, LOW)
#endif

//states of two linefinder sensors

#define	S1_IN_S2_IN 		0x00 //sensor1 and sensor2 are both inside of black line
#define	S1_IN_S2_OUT 		0x01 //sensor1 is inside of black line and sensor is outside of black line
#define	S1_OUT_S2_IN 		0x02 //sensor1 is outside of black line and sensor is inside of black line 
#define	S1_OUT_S2_OUT 		0x03 //sensor1 is outside of black line and sensor is outside of black line
//Wire Setup
#define BEGIN_FLAG  		0x1E
#define BEGIN_STATE  		0x91

//ledstrip
//address table

#define LS_CURRENT 			0x92
#define LS_GET_PIXEL_R 		0x93
#define LS_GET_PIXEL_G 		0x94
#define LS_GET_PIXEL_B 		0x95
#define LS_GET_PIXEL_NUM 	0x96

#define LS_SET_PIXEL_NUM 	0x02
#define LS_SET_PIXEL_R 		0x03
#define LS_SET_PIXEL_G 		0x04
#define LS_SET_PIXEL_B 		0x05
#define LS_SET_SPEED 		0x06
#define LS_SET_COUNT 		0x07
#define LS_SET_IN_SPEED 	0x08

#define LS_RUN_CTRL 0x1A
#define LS_LED_COUNT        0x1B

//data table
#define LS_NO_FLASH         0x00
#define LS_STOP_FLASH       0x00
#define LS_AUTO_FLASH       0x01
#define LS_ONCE_FLASH       0x02
#define LS_CLOSE            0x04
#define LS_RESET            0x05
#define LS_COLOR_LOOP       0x06
#define LS_INDICATORS	 	0x07
#define LS_ALL_PIXEL       	0xFE

#define MAX_BRI             200
#define MIN_BRI             0
#define IN_SPEED 			2



//NEC Code table
#define IR_BUTTON_POWER 	0x45
#define IR_BUTTON_A 		0x45
#define IR_BUTTON_B 		0x46
#define IR_BUTTON_MENU 		0x47
#define IR_BUTTON_C 		0x47
#define IR_BUTTON_TEST 		0x44
#define IR_BUTTON_D 		0x44
#define IR_BUTTON_PLUS 		0x40
#define IR_BUTTON_UP 		0x40
#define IR_BUTTON_RETURN 	0x43
#define IR_BUTTON_E 		0x43
#define IR_BUTTON_PREVIOUS 	0x07
#define IR_BUTTON_LEFT 		0x07
#define IR_BUTTON_PLAY 		0x15
#define IR_BUTTON_SETTING 	0x15
#define IR_BUTTON_NEXT 		0x09
#define IR_BUTTON_RIGHT 	0x09
#define IR_BUTTON_MINUS 	0x19
#define IR_BUTTON_DOWN 		0x19
#define IR_BUTTON_CLR 		0x0D
#define IR_BUTTON_F 		0x0D
#define IR_BUTTON_0 		0x16
#define IR_BUTTON_1 		0x0C
#define IR_BUTTON_2 		0x18
#define IR_BUTTON_3 		0x5E
#define IR_BUTTON_4 		0x08
#define IR_BUTTON_5 		0x1C
#define IR_BUTTON_6 		0x5A
#define IR_BUTTON_7 		0x42
#define IR_BUTTON_8 		0x52
#define IR_BUTTON_9 		0x4A

/*4 Button*/

#define NULL_KEY 			0
#define KEY1 				1
#define KEY2 				2
#define KEY3 				3
#define KEY4 				4



#define NULL_KEY_VALUE  	1023
#define KEY1_VALUE  		0
#define KEY2_VALUE  		485//1024/2
#define KEY3_VALUE  		648//1024/3*2
#define KEY4_VALUE  		729//1024/4*3

#define FALSE 0
#define TRUE  1

// Platform specific I/O definitions

#if defined(__AVR__)
#define MePIN_TO_BASEREG(pin)             (portInputRegister(digitalPinToPort(pin)))
#define MePIN_TO_BITMASK(pin)             (digitalPinToBitMask(pin))
#define MeIO_REG_TYPE uint8_t
#define MeIO_REG_ASM asm("r30")
#define MeDIRECT_READ(base, mask)         (((*(base)) & (mask)) ? 1 : 0)
#define MeDIRECT_MODE_INPUT(base, mask)   ((*((base)+1)) &= ~(mask)),((*((base)+2)) |= (mask))//INPUT_PULLUP
#define MeDIRECT_MODE_OUTPUT(base, mask)  ((*((base)+1)) |= (mask))
#define MeDIRECT_WRITE_LOW(base, mask)    ((*((base)+2)) &= ~(mask))
#define MeDIRECT_WRITE_HIGH(base, mask)   ((*((base)+2)) |= (mask))
#endif

static bool _isServoBusy = false;

///@brief class of MePort,it contains two pin.
class MePort
{
public:
    MePort();
    ///@brief initialize the Port
    ///@param port port number of device
    MePort(uint8_t port);
    ///@return the level of pin 1 of port
    ///@retval true on HIGH.
    ///@retval false on LOW.
    uint8_t getPort();
    uint8_t getSlot();
    ///@return the level of pin 1 of port
    ///@retval true on HIGH.
    ///@retval false on LOW.
    bool dRead1();
    ///@return the level of pin 2 of port
    ///@retval true on HIGH.
    ///@retval false on LOW.
    bool dRead2();
    ///@brief set the level of pin 1 of port
    ///@param value is HIGH or LOW
    void dWrite1(bool value);
    ///@brief set the level of pin 2 of port
    ///@param value is HIGH or LOW
    void dWrite2(bool value);
    ///@return the analog signal of pin 1 of port between 0 to 1023
    int aRead1();
    ///@return the analog signal of pin 2 of port between 0 to 1023
    int aRead2();
    ///@brief set the PWM outpu value of pin 1 of port
    ///@param value between 0 to 255
    void aWrite1(int value);
    ///@brief set the PWM outpu value of pin 2 of port
    ///@param value between 0 to 255
    void aWrite2(int value);
    uint8_t pin1();
    uint8_t pin2();
    void reset(uint8_t port);
    void reset(uint8_t port, uint8_t slot);
protected:
    uint8_t s1;
    uint8_t s2;
    uint8_t _port;
    uint8_t _slot;
};

///@brief class of MeSerial
class MeSerial: public SoftwareSerial, public MePort
{
public:
    MeSerial();
    ///@brief initialize
    ///@param port port number of device
    MeSerial(uint8_t port);
    void setHardware(bool mode);
    ///@brief Sets the data rate in bits per second (baud) for serial data transmission.
    ///@param baudrate use one of these rates: 300, 600, 1200, 2400, 4800, 9600, 14400, 19200, 28800, 38400, 57600, or 115200.
    void begin(long baudrate);
    ///@brief Writes binary data to the serial port. This data is sent as a byte or series of bytes.
    ///@param byte a value to send as a single byte
    size_t write(uint8_t byte);
    ///@brief the first byte of incoming serial data available (or -1 if no data is available) - int
    int read();
    ///@brief Get the number of bytes (characters) available for reading from the serial port. This is data that's already arrived and stored in the serial receive buffer (which holds 64 bytes).
    int available();
    int poll();
    void end();
    bool listen();
    bool isListening();
protected:
    bool _hard;
    bool _polling;
    bool _scratch;
    int _bitPeriod;
    int _byte;
    long _lastTime;
};
///@brief class of MeWire
class MeWire: public MePort
{
public:
    MeWire(uint8_t address);
    ///@brief initialize
    ///@param port port number of device
    MeWire(uint8_t port, uint8_t address);
    ///@brief reset start index of i2c slave address.
    void setI2CBaseAddress(uint8_t baseAddress);
    bool isRunning();
    ///@brief Initiate the Wire library and join the I2C bus as a master or slave. This should normally be called only once.
    ///@param address the 7-bit slave address (optional); if not specified, join the bus as a master.
    void begin();
    ///@brief send one byte data request for read one byte from slave address.
    byte read(byte dataAddress);
    void read(byte dataAddress, uint8_t *buf, int len);
    ///@brief send one byte data request for write one byte to slave address.
    void write(byte dataAddress, byte data);
    void request(byte *writeData, byte *readData, int wlen, int rlen);
protected:
    int _slaveAddress;
};


///@brief Class for Line Follower Module
class MeLineFollower: public MePort
{
public:
    MeLineFollower();
    ///@brief initialize
    MeLineFollower(uint8_t port);
    ///@brief state of all sensors
    ///@return state of sensors
    uint8_t readSensors();
    ///@brief state of left sensors
    bool readSensor1();
    ///@brief state of right sensors
    bool readSensor2();
};
///@brief Class for Limit Switch Module
class MeLimitSwitch: public MePort
{
public:
    MeLimitSwitch();
    MeLimitSwitch(uint8_t port);
    MeLimitSwitch(uint8_t port, uint8_t slot);
    bool touched();
private:
    uint8_t _device;
};

///@brief Class for Ultrasonic Sensor Module
class MeUltrasonicSensor: public MePort
{
public :
    MeUltrasonicSensor();
    MeUltrasonicSensor(uint8_t port);
    double distanceCm(uint16_t = 400);
    double distanceInch(uint16_t = 180);
    long measure(unsigned long = 30000);
};
///@brief Class for DC Motor Module
class MeDCMotor: public MePort
{
public:
    MeDCMotor();
    MeDCMotor(uint8_t port);
    void run(int speed);
    void stop();
};
///@brief Class for Camera Shutter Module
class MeShutter: public MePort
{
public:
    MeShutter();
    MeShutter(uint8_t port);
    void shotOn();
    void shotOff();
    void focusOn();
    void focusOff();
};
///@brief Class for Bluetooth Module
class MeBluetooth: public MeSerial
{
public:
    MeBluetooth();
    MeBluetooth(uint8_t port);
};
///@brief Class for Infrared Receiver Module
class MeInfraredReceiver: public MeSerial
{
public:
    MeInfraredReceiver();
    MeInfraredReceiver(uint8_t port);
    void begin();
    int read();
    ///@brief check press state of button
    bool buttonState();
};
///@brief Class for RGB Led Module(http://www.makeblock.cc/me-rgb-led-v1-0/) and Led Strip(http://www.makeblock.cc/led-rgb-strip-addressable-sealed-1m/)
class MeRGBLed: public MePort
{
public:
    MeRGBLed();
    MeRGBLed(uint8_t port);
    MeRGBLed(uint8_t port, uint8_t slot);
    ~MeRGBLed();
    void reset(uint8_t port);
    ///@brief set the count of leds.
    void setNumber(uint8_t num_led);
    ///@brief get the count of leds.
    uint8_t getNumber();
    ///@brief get the rgb value of the led with the index.
    cRGB getColorAt(uint8_t index);
    ///@brief set the rgb value of the led with the index.
    bool setColorAt(uint8_t index, uint8_t red, uint8_t green, uint8_t blue);
    bool setColorAt(uint8_t index, long value);
    void clear();
    ///@brief become effective of all led's change.
    void show();

private:
    uint16_t count_led;
    uint8_t *pixels;

    void rgbled_sendarray_mask(uint8_t *array, uint16_t length, uint8_t pinmask, uint8_t *port);

    const volatile uint8_t *ws2812_port;
    volatile uint8_t *ws2812_port_reg;
    uint8_t pinMask;
};

///@brief Class for Encoder Motor Driver
class MeEncoderMotor: public MeWire{
    public:
        MeEncoderMotor(uint8_t addr,uint8_t slot);
        void begin();
        boolean Reset();
        boolean Move(float angle, float speed);
        boolean MoveTo(float angle, float speed);
        boolean RunTurns(float turns, float speed);
        boolean RunSpeed(float speed);
        boolean RunSpeedAndTime(float speed, float time);
        float GetCurrentSpeed();
        float GetCurrentPosition();
    private:
        uint8_t _slot;    
};

///@brief Class for Button Module
class Me4Button: public MePort
{
public:
    Me4Button();
    Me4Button(uint8_t port);
    uint8_t pressed();
};

///@brief Class for Joystick Module
class MeJoystick : public MePort
{
public:
    MeJoystick();
    MeJoystick(uint8_t port);
    ///@brief get the value of x-axis
    int readX();
    ///@brief get the value of y-axis
    int readY();
    float angle();
    float strength();
};
///@brief Class for Light Sensor Module
class MeLightSensor : public MePort
{
public:
    MeLightSensor();
    MeLightSensor(uint8_t port);
    ///@brief get the value of light intensity
    int read();
    ///@brief turn on the led.
    void lightOn();
    ///@brief turn off the led.
    void lightOff();
    float strength();
};

///@brief Class for Sound Sensor Module
class MeSoundSensor : public MePort
{
public:
    MeSoundSensor();
    MeSoundSensor(uint8_t port);
    ///@brief get the value of sound intensity
    int strength();
};
class MeOneWire
{
private:
    MeIO_REG_TYPE bitmask;
    volatile MeIO_REG_TYPE *baseReg;
    // global search state
    unsigned char ROM_NO[8];
    uint8_t LastDiscrepancy;
    uint8_t LastFamilyDiscrepancy;
    uint8_t LastDeviceFlag;


public:
    MeOneWire();
    MeOneWire( uint8_t pin);
    bool readIO(void);
    void reset(uint8_t pin);
    // Perform a 1-Wire reset cycle. Returns 1 if a device responds
    // with a presence pulse.  Returns 0 if there is no device or the
    // bus is shorted or otherwise held low for more than 250uS
    uint8_t reset(void);

    // Issue a 1-Wire rom select command, you do the reset first.
    void select(const uint8_t rom[8]);

    // Issue a 1-Wire rom skip command, to address all on bus.
    void skip(void);

    // Write a byte. If 'power' is one then the wire is held high at
    // the end for parasitically powered devices. You are responsible
    // for eventually depowering it by calling depower() or doing
    // another read or write.
    void write(uint8_t v, uint8_t power = 0);

    void write_bytes(const uint8_t *buf, uint16_t count, bool power = 0);

    // Read a byte.
    uint8_t read(void);

    void read_bytes(uint8_t *buf, uint16_t count);

    // Write a bit. The bus is always left powered at the end, see
    // note in write() about that.
    void write_bit(uint8_t v);

    // Read a bit.
    uint8_t read_bit(void);

    // Stop forcing power onto the bus. You only need to do this if
    // you used the 'power' flag to write() or used a write_bit() call
    // and aren't about to do another read or write. You would rather
    // not leave this powered if you don't have to, just in case
    // someone shorts your bus.
    void depower(void);

    // Clear the search state so that if will start from the beginning again.
    void reset_search();

    // Setup the search to find the device type 'family_code' on the next call
    // to search(*newAddr) if it is present.
    void target_search(uint8_t family_code);

    // Look for the next device. Returns 1 if a new address has been
    // returned. A zero might mean that the bus is shorted, there are
    // no devices, or you have already retrieved all of them.  It
    // might be a good idea to check the CRC to make sure you didn't
    // get garbage.  The order is deterministic. You will always get
    // the same devices in the same order.
    uint8_t search(uint8_t *newAddr);
};
///@brief Class for temperature sensor
class MeTemperature: public MePort
{
public:
    MeTemperature();
    MeTemperature(uint8_t port);
    MeTemperature(uint8_t port, uint8_t slot);
    void reset(uint8_t port, uint8_t slot);
    ///@brief get the celsius of temperature
    float temperature();
private:
    MeOneWire _ts;
};
//************definitions for TM1637*********************
#define ADDR_AUTO  0x40
#define ADDR_FIXED 0x44

#define STARTADDR  0xc0
/**** definitions for the clock point of the digit tube *******/
#define POINT_ON   1
#define POINT_OFF  0
/**************definitions for brightness***********************/
#define  BRIGHT_DARKEST 0
#define  BRIGHT_TYPICAL 2
#define  BRIGHTEST      7
///@brief Class for numeric display module
class Me7SegmentDisplay: public MePort
{
public:
    Me7SegmentDisplay();
    Me7SegmentDisplay(uint8_t port);
    void init(void);        //To clear the display
    void set(uint8_t = BRIGHT_TYPICAL, uint8_t = 0x40, uint8_t = 0xc0); //To take effect the next time it displays.
    void reset(uint8_t port);
    void write(int8_t SegData[]);
    void write(uint8_t BitAddr, int8_t SegData);
    void display(uint16_t value);
    void display(int16_t value);
    void display(double value, uint8_t = 1) ;
    void display(int8_t DispData[]);
    void display(uint8_t BitAddr, int8_t DispData);
    void clearDisplay(void);
private:
    uint8_t Cmd_SetData;
    uint8_t Cmd_SetAddr;
    uint8_t Cmd_DispCtrl;
    boolean _PointFlag;     //_PointFlag=1:the clock point on
    void writeByte(int8_t wr_data);//write 8bit data to tm1637
    void start(void);//send start bits
    void stop(void); //send stop bits
    void point(boolean PointFlag);//whether to light the clock point ":".To take effect the next time it displays.
    void coding(int8_t DispData[]);
    int8_t coding(int8_t DispData);
    uint8_t Clkpin;
    uint8_t Datapin;
};
///@brief Class for potentiometer
class MePotentiometer: public MePort
{
public:
    MePotentiometer();
    MePotentiometer(uint8_t port);
    uint16_t read();
};

///@brief Class for PIR Motion Sensor
class MePIRMotionSensor: public MePort
{
public:
    MePIRMotionSensor();
    MePIRMotionSensor(uint8_t port);
    bool isPeopleDetected();
};

///@brief Class for gyro sensor
class MeGyro
{
public:
    MeGyro();
    void begin();
    void update();
    double angleX();
    double angleY();
    double angleZ();
private:
    void calibrate();
    int readData(int start, uint8_t *buffer, int size);
    int writeData(int start, const uint8_t *pData, int size);
    int writeReg(int reg, uint8_t data);

    double gSensitivity; // for 500 deg/s, check data sheet
    double gx, gy, gz;
    double gyrX, gyrY, gyrZ;
    int16_t accX, accY, accZ;
    double gyrXoffs, gyrYoffs, gyrZoffs;
    double FREQ;
    uint8_t i2cData[14];
};
#endif

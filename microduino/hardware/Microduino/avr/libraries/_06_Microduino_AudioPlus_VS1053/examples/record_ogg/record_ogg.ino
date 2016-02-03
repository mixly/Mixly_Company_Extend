/***************************************************
  This is an example for the Adafruit VS1053 Codec Breakout

  Designed specifically to work with the Adafruit VS1053 Codec Breakout
  ----> https://www.adafruit.com/products/1381

  Adafruit invests time and resources providing this open source code,
  please support Adafruit and open-source hardware by purchasing
  products from Adafruit!

  Written by Limor Fried/Ladyada for Adafruit Industries.
  BSD license, all text above must be included in any redistribution
 ****************************************************/

// This is a very beta demo of Ogg Vorbis recording. It works...
// Connect a button to digital 7 on the Arduino and use that to
// start and stop recording.

// A mic or line-in connection is required. See page 13 of the
// datasheet for wiring

// Don't forget to copy the v44k1q05.img patch to your micro SD
// card before running this example!


// include SPI, MP3 and SD libraries
#include <SPI.h>
#include <Adafruit_VS1053.h>
#include <SD.h>

// define the pins used
#define RESET -1      // VS1053 reset pin (output)
#define CS A3        // VS1053 chip select pin (output)
#define DCS A2        // VS1053 Data/command select pin (output)
#define CARDCS 7     // Card chip select pin
#define DREQ 3       // VS1053 Data request, ideally an Interrupt pin

#define REC_BUTTON 5

Adafruit_VS1053_FilePlayer musicPlayer = Adafruit_VS1053_FilePlayer(RESET, CS, DCS, DREQ, CARDCS);

File recording;  // the file we will save our recording to
#define RECBUFFSIZE 128  // 64 or 128 bytes.
uint8_t recording_buffer[RECBUFFSIZE];

/** VS10xx SCI Write Command byte is 0x02 */
#define VS_WRITE_COMMAND 0x02
/** VS10xx SCI Read Command byte is 0x03 */
#define VS_READ_COMMAND 0x03

const unsigned short recPlugin[40] = { /* Compressed plugin for recording*/
  0x0007, 0x0001, 0x8010, 0x0006, 0x001c, 0x3e12, 0xb817, 0x3e14, /*    0 */
  0xf812, 0x3e01, 0xb811, 0x0007, 0x9717, 0x0020, 0xffd2, 0x0030, /*    8 */
  0x11d1, 0x3111, 0x8024, 0x3704, 0xc024, 0x3b81, 0x8024, 0x3101, /*   10 */
  0x8024, 0x3b81, 0x8024, 0x3f04, 0xc024, 0x2808, 0x4800, 0x36f1, /*   18 */
  0x9811, 0x0007, 0x0001, 0x8028, 0x0006, 0x0002, 0x2a00, 0x040e,
};

void loadPlugin(const unsigned short *plugin, int length)
{
  int i = 0;
  while (i < length) {
    unsigned short addr, n, val;
    addr = plugin[i++];
    n = plugin[i++];
    if (n & 0x8000U) { //RLE run, replicate n samples
      n &= 0x7FFF;
      val = plugin[i++];
      while (n--) {
        digitalWrite(DCS, LOW);
        while (!digitalRead(DREQ));
        digitalWrite(CS, LOW);
        SPI.transfer(VS_WRITE_COMMAND);
        SPI.transfer(addr);
        SPI.transfer(val >> 8);
        SPI.transfer(val & 0xFF);
        digitalWrite(CS, HIGH);
      }
    } else {       //Copy run, copy n samples
      while (n--) {
        val = plugin[i++];
        digitalWrite(DCS, LOW);
        while (!digitalRead(DREQ));
        digitalWrite(CS, LOW);
        SPI.transfer(VS_WRITE_COMMAND);
        SPI.transfer(addr);
        SPI.transfer(val >> 8);
        SPI.transfer(val & 0xFF);
        digitalWrite(CS, HIGH);
      }
    }
  }

}
void setup() {
  Serial.begin(9600);
  Serial.println("Adafruit VS1053 Ogg Recording Test");

  // initialise the music player
  if (!musicPlayer.begin()) {
    Serial.println("VS1053 not found");
    while (1);  // don't do anything more
  }

  musicPlayer.sineTest(0x44, 500);    // Make a tone to indicate VS1053 is working

  if (!SD.begin(CARDCS)) {
    Serial.println("SD failed, or not present");
    while (1);  // don't do anything more
  }
  Serial.println("SD OK!");

  // Set volume for left, right channels. lower numbers == louder volume!
  musicPlayer.setVolume(10, 10);

  // when the button is pressed, record!
  pinMode(REC_BUTTON, INPUT);
  digitalWrite(REC_BUTTON, HIGH);

  // load plugin from SD card! We'll use mono 44.1KHz, high quality
  if (! musicPlayer.prepareRecordOgg("v44k1q05.img")) {
    Serial.println("Couldn't load plugin!");
    while (1);
  }
}

uint8_t isRecording = false;

void loop() {
  if (!isRecording && !digitalRead(REC_BUTTON)) {
    Serial.println("Begin recording");
    isRecording = true;

    // Check if the file exists already
    char filename[15];
    strcpy(filename, "RECORD00.OGG");
    for (uint8_t i = 0; i < 100; i++) {
      filename[6] = '0' + i / 10;
      filename[7] = '0' + i % 10;
      // create if does not exist, do not open existing, write, sync after write
      if (! SD.exists(filename)) {
        break;
      }
    }
    Serial.print("Recording to "); Serial.println(filename);
    recording = SD.open(filename, FILE_WRITE);
    if (! recording) {
      Serial.println("Couldn't open file to record!");
      while (1);
    }
    musicPlayer.startRecordOgg(true); // use microphone (for linein, pass in 'false')
  }
  if (isRecording)
    saveRecordedData(isRecording);
  if (isRecording && !digitalRead(REC_BUTTON)) {
    Serial.println("End recording");
    musicPlayer.stopRecordOgg();
    isRecording = false;
    // flush all the data!
    saveRecordedData(isRecording);
    // close it up
    recording.close();
    delay(1000);
  }
}

uint16_t saveRecordedData(boolean isrecord) {
  uint16_t written = 0;

  // read how many words are waiting for us
  uint16_t wordswaiting = musicPlayer.recordedWordsWaiting();

  // try to process 256 words (512 bytes) at a time, for best speed
  while (wordswaiting > 256) {
    //Serial.print("Waiting: "); Serial.println(wordswaiting);
    // for example 128 bytes x 4 loops = 512 bytes
    for (int x = 0; x < 512 / RECBUFFSIZE; x++) {
      // fill the buffer!
      for (uint16_t addr = 0; addr < RECBUFFSIZE; addr += 2) {
        uint16_t t = musicPlayer.recordedReadWord();
        //Serial.println(t, HEX);
        recording_buffer[addr] = t >> 8;
        recording_buffer[addr + 1] = t;
      }
      if (! recording.write(recording_buffer, RECBUFFSIZE)) {
        Serial.print("Couldn't write "); Serial.println(RECBUFFSIZE);
        while (1);
      }
    }
    // flush 512 bytes at a time
    recording.flush();
    written += 256;
    wordswaiting -= 256;
  }

  wordswaiting = musicPlayer.recordedWordsWaiting();
  if (!isrecord) {
    Serial.print(wordswaiting); Serial.println(" remaining");
    // wrapping up the recording!
    uint16_t addr = 0;
    for (int x = 0; x < wordswaiting - 1; x++) {
      // fill the buffer!
      uint16_t t = musicPlayer.recordedReadWord();
      recording_buffer[addr] = t >> 8;
      recording_buffer[addr + 1] = t;
      if (addr > RECBUFFSIZE) {
        if (! recording.write(recording_buffer, RECBUFFSIZE)) {
          Serial.println("Couldn't write!");
          while (1);
        }
        recording.flush();
        addr = 0;
      }
    }
    if (addr != 0) {
      if (!recording.write(recording_buffer, addr)) {
        Serial.println("Couldn't write!"); while (1);
      }
      written += addr;
    }
    musicPlayer.sciRead(VS1053_SCI_AICTRL3);
    if (! (musicPlayer.sciRead(VS1053_SCI_AICTRL3) & _BV(2))) {
      recording.write(musicPlayer.recordedReadWord() & 0xFF);
      written++;
    }
    recording.flush();
  }

  return written;
}
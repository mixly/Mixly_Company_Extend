#include "Nova.h"
GLLED  glled_M0(M0);
void setup()
{
}
void loop()
{
  glled_M0.off();
  delay(1000);
  glled_M0.on();
  delay(1000);
  glled_M0.brightness(60);
  delay(500);
}

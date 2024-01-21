#include "dino_game_arduino.h"

unsigned int getObstacleImageAddress(Obstacle *obstacle)
{
    unsigned int obstacleImageAddress;

    switch (obstacle->category)
    {
    case OBSTACLE_ONE_CACTUS:
        obstacleImageAddress = reinterpret_cast<unsigned int>(oneCactusImg);
        break;
    case OBSTACLE_TWO_CACTUS:
        obstacleImageAddress = reinterpret_cast<unsigned int>(twoCactusImg);
        break;
    case OBSTACLE_THREE_CACTUS:
        obstacleImageAddress = reinterpret_cast<unsigned int>(threeCactusImg);
        break;
    case OBSTACLE_ONE_SMALL_CACTUS:
        obstacleImageAddress = reinterpret_cast<unsigned int>(oneSmallCactusImg);
        break;
    case OBSTACLE_TWO_SMALL_CACTUS:
        obstacleImageAddress = reinterpret_cast<unsigned int>(twoSmallCactusImg);
        break;
    case OBSTACLE_THREE_SMALL_CACTUS:
        obstacleImageAddress = reinterpret_cast<unsigned int>(threeSmallCactusImg);
        break;
    case OBSTACLE_BIRD:
    default:
        obstacleImageAddress = reinterpret_cast<unsigned int>(obstacle->frame.postion.x % 20 > 10 ? birdUpImg : birdDownImg);
        break;
    }

    return obstacleImageAddress;
}

// public
DinoGameArduino::DinoGameArduino(U8G2 *u8g2)
    : _u8g2(u8g2),
      _dinoGame(_u8g2->getWidth(), _u8g2->getHeight(), millis, random)
{
}

DinoGameArduino::~DinoGameArduino()
{
}

void DinoGameArduino::setup()
{
    _u8g2->begin();
    _u8g2->setFont(u8g2_font_timR08_tf);
    _u8g2->setFontMode(1);
    _u8g2->setBitmapMode(1);
    _u8g2->setFontPosTop();
    _u8g2->enableUTF8Print();

    _dinoGame.setup();
    delay(300);
}

void DinoGameArduino::loop()
{
    _u8g2->firstPage();
    do
    {
        drawDino();
        drawObstacleReal();
        drawObstacleBackup();
        drawCloud();

        if (_cheatMode == CHEAT_MODE_CHEAT)
        {
            _u8g2->setFont(u8g2_font_timR08_tf);
            _u8g2->setCursor(_cloud.frame.postion.x, 12);
            _u8g2->print("c");
        }

        if (_showUltraman == 1)
        {
            _u8g2->drawXBMP(
                _dinoGame.getDino()->frame.postion.x,
                _dinoGame.getDino()->frame.postion.y - _dinoGame.getDino()->frame.offset.y - 58 + _dinoGame.getDino()->frame.size.height,
                20,
                58,
                ultramanImg);
        }

        if (_dinoGame.getGameStatus() == GAME_WAITING_STATUS)
        {
            _u8g2->setFont(u8g2_font_timR12_tf);
            char title[] = "= Dino Game =";
            _u8g2->setCursor((_u8g2->getWidth() - (sizeof(title) - 1) * 8) / 2, 0);
            _u8g2->print(title);
        }
        else if (_dinoGame.getGameStatus() == GAME_OVER_STATUS)
        {
            _u8g2->drawXBMP(
                (_u8g2->getWidth() - 100) / 2,
                (_u8g2->getHeight() - 15) / 2,
                100,
                15,
                gameOverImg);
        }
        else if (_dinoGame.getGameStatus() == GAME_PLAYING_STATUS)
        {
            _u8g2->setFont(u8g2_font_timR08_tf);

            _u8g2->setCursor(0, 0);
            char lvText[6];
            unsigned int currentLevel = _dinoGame.getLevel();
            sprintf(lvText, "LV: %d", currentLevel);
            _u8g2->print(lvText);
        }

        if (_dinoGame.getGameStatus() == GAME_PLAYING_STATUS || _dinoGame.getGameStatus() == GAME_OVER_STATUS)
        {
            char scoreText[10];
            unsigned int score = _dinoGame.getScore();
            sprintf(scoreText, "SCORE: %d", score);

            unsigned int i;
            for (i = 0; i < sizeof(scoreText); i++)
            {
                if (scoreText[i] == '\0')
                {
                    break;
                }
            }
            _u8g2->setCursor((_u8g2->getWidth() - (i - 1) * 6), 0);
            _u8g2->print(scoreText);
        }

    } while (_u8g2->nextPage());

    _dinoGame.loop();
    moveCloud();
}

void DinoGameArduino::startGame()
{
    if (_dinoGame.getGameStatus() != GAME_PLAYING_STATUS)
    {
        _dinoGame.startGame();
    }
}

void DinoGameArduino::setCheatMode(CheatMode cheatMode)
{
    _cheatMode = cheatMode;
    _dinoGame.setCheatMode(cheatMode);
}

void DinoGameArduino::dinoJump()
{
    _dinoGame.dinoJump();
}

void DinoGameArduino::showUltraman()
{
    _showUltraman = 1;
}

unsigned int DinoGameArduino::getScore()
{
    return _dinoGame.getScore();
}

unsigned int DinoGameArduino::getLevel()
{
    return _dinoGame.getLevel();
}

DinoGameStatus DinoGameArduino::getGameStatus()
{
    return _dinoGame.getGameStatus();
}

// protected

void DinoGameArduino::drawDino()
{
    Dino *dino = _dinoGame.getDino();
    resetDinoImagePtr(&_dinoImagePtr, dino);

    _u8g2->drawXBMP(
        dino->frame.postion.x,
        dino->frame.postion.y - dino->frame.offset.y,
        dino->frame.size.width,
        dino->frame.size.height,
        _dinoImagePtr);
}

void DinoGameArduino::drawObstacleReal()
{
    Obstacle *obstacle = _dinoGame.getObstacleReal();
    resetObstacleImagePtr(&_obstacleRealImagePtr, obstacle);
    _u8g2->drawXBMP(
        obstacle->frame.postion.x,
        obstacle->frame.postion.y,
        obstacle->frame.size.width,
        obstacle->frame.size.height,
        _obstacleRealImagePtr);
}

void DinoGameArduino::drawObstacleBackup()
{
    Obstacle *obstacle = _dinoGame.getObstacleBackup();
    resetObstacleImagePtr(&_obstacleBackupImagePtr, obstacle);

    _u8g2->drawXBMP(
        obstacle->frame.postion.x,
        obstacle->frame.postion.y,
        obstacle->frame.size.width,
        obstacle->frame.size.height,
        _obstacleBackupImagePtr);
}

void DinoGameArduino::moveCloud()
{
    _cloud.frame.postion.y = 10;
    _cloud.frame.size.width = 39;
    _cloud.frame.size.height = 12;

    _cloud.frame.postion.x--;

    if (_cloud.frame.postion.x < -_cloud.frame.size.width)
    {
        _cloud.frame.postion.x = _u8g2->getWidth();
    }
}

void DinoGameArduino::drawCloud()
{
    _u8g2->drawXBMP(
        _cloud.frame.postion.x,
        _cloud.frame.postion.y,
        _cloud.frame.size.width,
        _cloud.frame.size.height,
        cloudImg);
}

// private
void DinoGameArduino::resetDinoImagePtr(
    const unsigned char **dinoImagePtr,
    Dino *dino)
{
    switch (dino->pose)
    {
    case DINO_JUMP:
        *dinoImagePtr = dinoJumpImg;
        break;
    case DINO_LEFT:
        *dinoImagePtr = dinoLeftImg;
        break;
    case DINO_RIGHT:
        *dinoImagePtr = dinoRightImg;
        break;
    case DINO_BLAH:
    default:
        *dinoImagePtr = dinoBlahImg;
        break;
    }
}

void DinoGameArduino::resetObstacleImagePtr(
    const unsigned char **obstacleImagePtr,
    Obstacle *obstacle)
{
    switch (obstacle->category)
    {
    case OBSTACLE_ONE_CACTUS:
        *obstacleImagePtr = oneCactusImg;
        break;
    case OBSTACLE_TWO_CACTUS:
        *obstacleImagePtr = twoCactusImg;
        break;
    case OBSTACLE_THREE_CACTUS:
        *obstacleImagePtr = threeCactusImg;
        break;
    case OBSTACLE_ONE_SMALL_CACTUS:
        *obstacleImagePtr = oneSmallCactusImg;
        break;
    case OBSTACLE_TWO_SMALL_CACTUS:
        *obstacleImagePtr = twoSmallCactusImg;
        break;
    case OBSTACLE_THREE_SMALL_CACTUS:
        *obstacleImagePtr = threeSmallCactusImg;
        break;
    case OBSTACLE_BIRD:
    default:
        *obstacleImagePtr = obstacle->frame.postion.x % 20 > 10 ? birdUpImg : birdDownImg;
        break;
    }
}
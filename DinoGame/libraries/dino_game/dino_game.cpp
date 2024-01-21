#include <stdio.h>
#include "dino_game.h"

#define dino_min(a, b) ((a) < (b) ? (a) : (b))

// public
DinoGame::DinoGame(
    int stageWidth,
    int stageHeight, unsigned long (*systemCurrentTimeFunc)(),
    long (*randomFunc)(long, long))
{
    _stageWidth = stageWidth;
    _stageHeight = stageHeight;

    _cheatMode = CHEAT_MODE_NORMAL;

    if (systemCurrentTimeFunc == nullptr)
    {
        printf("error: systemCurrentTimeFunc is null \n");
    }
    if (randomFunc == nullptr)
    {
        printf("error: randomFunc is null \n");
    }

    _systemCurrentTimeFunc = systemCurrentTimeFunc;
    _randomFunc = randomFunc;
}

DinoGame::~DinoGame()
{
}

void DinoGame::setup()
{
    resetGame();
    splashStage();
}

void DinoGame::loop()
{
    if (_gameStatus == GAME_PLAYING_STATUS)
    {
        moveObstacles();
        moveDino();
        checkCollision();
        calLevel();
    }
}

void DinoGame::startGame()
{
    if (_gameStatus != GAME_PLAYING_STATUS)
    {
        _gameStatus = GAME_PLAYING_STATUS;
        resetGame();
    }
}

void DinoGame::setCheatMode(CheatMode mode)
{
    _cheatMode = mode;
}

Dino *DinoGame::getDino()
{
    return &_dino;
}

Obstacle *DinoGame::getObstacleReal()
{
    return &_obstacleReal;
}

Obstacle *DinoGame::getObstacleBackup()
{
    return &_obstacleBackup;
}

DinoGameStatus DinoGame::getGameStatus()
{
    return _gameStatus;
}

unsigned int DinoGame::getScore()
{
    return _score;
}

unsigned int DinoGame::getLevel()
{
    return _level;
}

void DinoGame::dinoJump()
{
    if (_dino.action == DINO_WALKING || _cheatMode == CHEAT_MODE_CHEAT)
    {
        _dino.action = DINO_JUMPING;
    }
}

// protected

void DinoGame::resetGame()
{
    _score = 0;
    _speed = 2;
    _level = 1;

    _startTime = _systemCurrentTimeFunc();

    _dino.action = DINO_WALKING;
    _dino.pose = DINO_JUMP;
    _dino.frame.size.width = 20;
    _dino.frame.size.height = 21;
    _dino.frame.postion.x = 0;
    _dino.frame.postion.y = _stageHeight - _dino.frame.size.height;
    _dino.frame.offset.x = 0;
    _dino.frame.offset.y = 0;

    _obstacleReal = getRandomObstacle();
    _obstacleReal.frame.postion.x = _stageWidth;
    _obstacleBackup = getRandomObstacle(8);
    _obstacleBackup.frame.postion.x = _stageWidth * 2;
}

void DinoGame::splashStage()
{
    _obstacleReal = getRandomObstacle(0);
    _obstacleReal.frame.postion.x = _stageWidth * 0.4;

    _obstacleBackup = getRandomObstacle();
    _obstacleBackup.frame.postion.x = _stageWidth * 0.7;
}

void DinoGame::calLevel()
{
    _currentTime = _systemCurrentTimeFunc();

    if (_score >= 5 * (_speed - 1))
    {
        _speed++;
        _level++;
    }
}

void DinoGame::checkCollision()
{
    if (((_obstacleReal.category != OBSTACLE_BIRD && _dino.frame.offset.y < _obstacleReal.hitZone.size.height - 3) ||
         (_obstacleReal.category == OBSTACLE_BIRD && _dino.frame.offset.y > 5 && _dino.frame.offset.y < _obstacleReal.hitZone.postion.y)) &&
        (_obstacleReal.hitZone.postion.x < 13 && _obstacleReal.hitZone.postion.x + _obstacleReal.hitZone.size.width > 5))
    {
        _gameStatus = GAME_OVER_STATUS;
    }
}

void DinoGame::moveDino()
{
    if (_dino.action == DINO_WALKING)
    {
        _dino.frame.offset.y = (_dino.frame.offset.y + 1) % 3;
        _dino.pose = (DinoPose)(_dino.frame.offset.y + 1);
    }
    else
    {
        _dino.pose = DINO_JUMP;
        if (_dino.action == DINO_JUMPING)
        {
            _dino.frame.offset.y = _dino.frame.offset.y + _speed;
            if (_dino.frame.offset.y > 32)
            {
                _dino.action = DINO_FALLING;
            }
        }
        else
        {
            _dino.frame.offset.y = _dino.frame.offset.y - _speed;
            if (_dino.frame.offset.y < 8)
            {
                _dino.action = DINO_WALKING;
                _dino.frame.offset.y = 0;
            }
        }
    }
}

void DinoGame::moveObstacles()
{
    int newX = _obstacleReal.frame.postion.x - _speed;

    if (newX < -_obstacleReal.frame.size.width)
    {
        _score = _score + 1;
        _obstacleReal = _obstacleBackup;
        _obstacleBackup = getRandomObstacle(8);
        _obstacleBackup.frame.postion.x = _obstacleReal.frame.postion.x + _randomFunc(_stageWidth * 0.8, _stageWidth);
    }
    else
    {
        _obstacleReal.frame.postion.x = newX;
        _obstacleBackup.frame.postion.x -= _speed;
    }

    _obstacleReal.hitZone.postion = _obstacleReal.frame.postion;
    _obstacleBackup.hitZone.postion = _obstacleBackup.frame.postion;
}

Obstacle DinoGame::getRandomObstacle(int max)
{
    int rand = _randomFunc(0, max);
    Obstacle obstacle;
    switch (rand)
    {
    case 1:
        obstacle.category = OBSTACLE_ONE_CACTUS;
        obstacle.frame.size.width = 10;
        obstacle.frame.size.height = 20;
        obstacle.frame.postion.x = 200;
        obstacle.frame.postion.y = _stageHeight - obstacle.frame.size.height;
        break;
    case 2:
        obstacle.category = OBSTACLE_TWO_CACTUS;
        obstacle.frame.size.width = 20;
        obstacle.frame.size.height = 20;
        obstacle.frame.postion.x = 200;
        obstacle.frame.postion.y = _stageHeight - obstacle.frame.size.height;
        break;
    case 3:
        obstacle.category = OBSTACLE_THREE_CACTUS;
        obstacle.frame.size.width = 20;
        obstacle.frame.size.height = 20;
        obstacle.frame.postion.x = 200;
        obstacle.frame.postion.y = _stageHeight - obstacle.frame.size.height;
        break;
    case 4:
        obstacle.category = OBSTACLE_ONE_SMALL_CACTUS;
        obstacle.frame.size.width = 6;
        obstacle.frame.size.height = 12;
        obstacle.frame.postion.x = 200;
        obstacle.frame.postion.y = _stageHeight - obstacle.frame.size.height;
        break;
    case 5:
        obstacle.category = OBSTACLE_TWO_SMALL_CACTUS;
        obstacle.frame.size.width = 12;
        obstacle.frame.size.height = 12;
        obstacle.frame.postion.x = 200;
        obstacle.frame.postion.y = _stageHeight - obstacle.frame.size.height;
        break;
    case 6:
        obstacle.category = OBSTACLE_THREE_SMALL_CACTUS;
        obstacle.frame.size.width = 17;
        obstacle.frame.size.height = 12;
        obstacle.frame.postion.x = 200;
        obstacle.frame.postion.y = _stageHeight - obstacle.frame.size.height;
        break;
    case 0:
    default:
        obstacle.category = OBSTACLE_BIRD;
        obstacle.frame.size.width = 21;
        obstacle.frame.size.height = 18;
        obstacle.frame.postion.x = 200;
        obstacle.frame.postion.y = _stageHeight - obstacle.frame.size.height - _dino.frame.size.height - 3;
        break;
    }

    obstacle.hitZone = obstacle.frame;
    obstacle.hitZone.size.width = dino_min(obstacle.hitZone.size.width, 17);
    return obstacle;
}

// private
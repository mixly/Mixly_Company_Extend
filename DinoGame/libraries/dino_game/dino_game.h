#ifndef __DINO_GAME_H_
#define __DINO_GAME_H_

typedef struct
{
    int x;
    int y;
} Position;

typedef struct
{
    int x;
    int y;
} Offset;

typedef struct
{
    int width;
    int height;
} Size;

typedef struct
{
    Position postion;
    Offset offset;
    Size size;
} Frame;

typedef struct
{
    Frame frame;
} Object;

typedef enum
{
    OBSTACLE_BIRD = 0,
    OBSTACLE_ONE_CACTUS = 1,
    OBSTACLE_TWO_CACTUS = 2,
    OBSTACLE_THREE_CACTUS = 3,
    OBSTACLE_ONE_SMALL_CACTUS = 4,
    OBSTACLE_TWO_SMALL_CACTUS = 5,
    OBSTACLE_THREE_SMALL_CACTUS = 6,
} ObstacleCategory;

struct Obstacle : public Object
{
    Frame hitZone;
    ObstacleCategory category;
};

typedef enum
{
    GAME_WAITING_STATUS = 0,
    GAME_PLAYING_STATUS = 1,
    GAME_OVER_STATUS = 2,
} DinoGameStatus;

typedef enum
{
    DINO_WALKING = 0,
    DINO_JUMPING = 1,
    DINO_FALLING = 2,
} DinoAction;

typedef enum
{
    DINO_BLAH = 0,
    DINO_JUMP = 1,
    DINO_LEFT = 2,
    DINO_RIGHT = 3,
} DinoPose;

struct Dino : public Object
{
    DinoAction action;
    DinoPose pose;
};

typedef enum
{
    CHEAT_MODE_NORMAL = 0,
    CHEAT_MODE_CHEAT = 1,
} CheatMode;

class DinoGame
{
public:
    DinoGame(
        int stageWidth,
        int stageHeight,
        unsigned long (*systemCurrentTimeFunc)(),
        long (*randomFunc)(long, long));
    virtual ~DinoGame();

    void setup();
    void loop();

    void setCheatMode(CheatMode mode);

    DinoGameStatus getGameStatus();
    Dino *getDino();
    Obstacle *getObstacleReal();
    Obstacle *getObstacleBackup();

    unsigned int getScore();
    unsigned int getLevel();
    void startGame();
    void dinoJump();

protected:
    int _stageWidth;
    int _stageHeight;

    DinoGameStatus _gameStatus;
    unsigned long _startTime;
    unsigned long _currentTime;

    unsigned int _speed;
    unsigned int _level;
    unsigned int _score;

    CheatMode _cheatMode;

    Dino _dino;
    Obstacle _obstacleReal;
    Obstacle _obstacleBackup;

    Obstacle getRandomObstacle(int max=6);
    void calLevel();
    void resetGame();
    void splashStage();
    void checkCollision();
    void moveDino();
    void moveObstacles();

    unsigned long (*_systemCurrentTimeFunc)();
    long (*_randomFunc)(long, long);
};

#endif // !__DINO_GAME_H_
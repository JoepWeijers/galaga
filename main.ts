function dropAsteroid (asteroid: game.LedSprite) {
    asteroid.set(LedSpriteProperty.Brightness, 50)
    asteroid.set(LedSpriteProperty.Direction, 180)
    basic.pause(asteroid_speed)
    for (let index = 0; index < 4; index++) {
        asteroid.move(1)
        basic.pause(asteroid_speed)
    }
    asteroid.delete()
}
let asteroid_speed = 0
let spaceship_x = 2
let spaceship_y = 4
let asteroid_interval = 1000
asteroid_speed = 300
let spaceship = game.createSprite(spaceship_x, spaceship_y)
let asteroid1 = game.createSprite(0, 0)
asteroid1.delete()
let asteroid2 = game.createSprite(0, 0)
asteroid2.delete()
let laser_moving = false
let laser = game.createSprite(0, 0)
laser.set(LedSpriteProperty.Brightness, 0)
laser.delete()
joystickbit.initJoystickBit()
joystickbit.Vibration_Motor(100)
loops.everyInterval(10000, function () {
    if (asteroid_speed > 30) {
        asteroid_speed += -30
    }
    if (asteroid_interval > 200) {
        asteroid_interval += -100
    }
})
basic.forever(function () {
    asteroid1 = game.createSprite(randint(0, 4), 0)
    dropAsteroid(asteroid1)
    basic.pause(asteroid_interval)
})
basic.forever(function () {
    basic.pause(asteroid_interval + 133)
    asteroid2 = game.createSprite(randint(0, 4), 0)
    dropAsteroid(asteroid2)
})
basic.forever(function () {
    if (joystickbit.getButton(joystickbit.JoystickBitPin.P12)) {
        basic.pause(50)
        if (joystickbit.getButton(joystickbit.JoystickBitPin.P12)) {
            if (!(laser_moving)) {
                laser_moving = true
                laser = game.createSprite(spaceship_x, spaceship_y)
                laser.set(LedSpriteProperty.Blink, 180)
                laser.set(LedSpriteProperty.Direction, 0)
                basic.pause(150)
                for (let index = 0; index < 4; index++) {
                    laser.move(1)
                    basic.pause(150)
                    if (laser.get(LedSpriteProperty.Y) == 0) {
                        break;
                    }
                }
                laser.delete()
                laser_moving = false
            }
        }
    }
})
basic.forever(function () {
    if (joystickbit.getRockerValue(joystickbit.rockerType.X) > 800) {
        spaceship.change(LedSpriteProperty.X, -1)
    }
    if (joystickbit.getRockerValue(joystickbit.rockerType.X) < 200) {
        spaceship.change(LedSpriteProperty.X, 1)
    }
    if (joystickbit.getRockerValue(joystickbit.rockerType.Y) > 800) {
        spaceship.change(LedSpriteProperty.Y, -1)
    }
    if (joystickbit.getRockerValue(joystickbit.rockerType.Y) < 200) {
        spaceship.change(LedSpriteProperty.Y, 1)
    }
    spaceship_x = spaceship.get(LedSpriteProperty.X)
    spaceship_y = spaceship.get(LedSpriteProperty.Y)
    basic.pause(100)
})
basic.forever(function () {
    if (spaceship.isTouching(asteroid1) || spaceship.isTouching(asteroid2)) {
        joystickbit.Vibration_Motor(500)
        game.gameOver()
    }
    if (laser.isTouching(asteroid1)) {
        asteroid1.delete()
        game.addScore(1)
        joystickbit.Vibration_Motor(20)
    }
    if (laser.isTouching(asteroid2)) {
        asteroid2.delete()
        game.addScore(1)
        joystickbit.Vibration_Motor(20)
    }
})

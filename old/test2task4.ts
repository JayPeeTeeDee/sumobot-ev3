#!/usr/bin/env node
var ev3 = require('./node_modules/ev3source/ev3.js');
var source = require('./node_modules/ev3source/source.js');

var motorA = ev3.motorA();
var motorB = ev3.motorB();
var colorSensor = ev3.colorSensor();
var gyro = ev3.gyroSensor();

if (ev3.connected(motorA)) {
    source.alert("MOTOR A CONNECTED");
}

if (ev3.connected(motorB)) {
    source.alert("MOTOR B CONNECTED");
}

if (ev3.connected(colorSensor)) {
    source.alert("COLOUR SENSOR CONNECTED");
}

if (ev3.connected(gyro)) {
    source.alert("GYRO CONNECTED");
}

var calib_distance = 95;
var black_val = 10;

function rotateBot(direction, distance) {
    if (direction === "left") {
       ev3.runForDistance(motorA, -distance, 50);
       ev3.runForDistance(motorB, distance, 100);
       //ev3.stop(motorA);
    } else {
       ev3.runForDistance(motorA, distance, 100);
       //ev3.stop(motorB);
       ev3.runForDistance(motorB, -distance, 50);
    }
//    ev3.pause(1000);
}

function flip(direction) {
    return direction === "left" ? "right" : "left";
}

function beeline(direction) {
       var intensity = ev3.reflectedLightIntensity(colorSensor);
       if (intensity < black_val) {
           rotateBot(flip(direction), calib_distance);
           return beeline(flip(direction));
       } else {
           return beeline(direction); 
}
//else if (intensity >= black_val) {
  //         rotateBot("right", calib_distance);
    //       return beeline();
      // }
}

rotateBot("left", 95);
beeline();

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

function turnNinety() {
    ev3.runForTime(motorA, 1000, -100);
    ev3.runForTime(motorB, 1000, 100);
    //ev3.pause(1000);
}


function moveForward() {
    ev3.runForTime(motorA, 1000, 200);
    ev3.runForTime(motorB, 1000, 200);
}

while(true) {
    var intensity = ev3.reflectedLightIntensity(colorSensor);
  
    if (intensity < 10) {
       turnNinety();
    } else {
       moveForward();
    }
}


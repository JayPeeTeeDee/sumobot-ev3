#!/usr/bin/env node
var ev3 = require('./node_modules/ev3source/ev3.js');
var source = require('./node_modules/ev3source/source.js');

var motorA = ev3.motorA();
var motorB = ev3.motorB();
var motorEye = ev3.motorC();
var colorSensor = ev3.colorSensor();
var ultrasonic = ev3.ultrasonicSensor();
var touchSensor = ev3.touchSensor2();
var gyroSensor = ev3.gyroSensor();

if (ev3.connected(motorA)) {
    source.alert("MOTOR A CONNECTED");
}

if (ev3.connected(motorB)) {
    source.alert("MOTOR B CONNECTED");
}

if (ev3.connected(motorEye)) {
    source.alert("MOTOR C CONNECTED");
}

if (ev3.connected(colorSensor)) {
    source.alert("COLOUR SENSOR CONNECTED");
}

if (ev3.connected(ultrasonic)) {
    source.alert("ULTRASONIC SENSOR CONNECTED");
}

if (ev3.connected(touchSensor)) {
    source.alert("TOUCH SENSOR CONNECTED");
}

if (ev3.connected(gyroSensor)) {
    source.alert("GYRO SENSOR CONNECTED");
}

while(true) {
    source.alert(ev3.reflectedLightIntensity(colorSensor));
    source.alert("RED_VAL: " + ev3.colorSensorRed(colorSensor));
    source.alert("GREEN_VAL: " +ev3.colorSensorGreen(colorSensor));
}

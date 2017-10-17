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

var initial = ev3.gyroSensorRate(gyro);
source.alert(initial);

//cumulates the angle rotated from start
var rotation_amt = 0;

function turnNinety() {
   console.log(rotation_amt);
   return rotation_amt >= 90;
}

function spinClockwise() {
    var current = ev3.gyroSensorRate(gyro);
        
    if (rotation_amt + current > 90) {
        var remaining_angle = 90 - rotation_amt;
        var move_time = Math.floor((remaining_angle / current) * 1000);
//        console.log(move_time);        
        ev3.runForTime(motorA, move_time, 100);
        ev3.runForTime(motorB, move_time, -100);
        ev3.pause(move_time);  
        rotation_amt = 90;
    } else {
        ev3.runForTime(motorA, 1000, 100);
        ev3.runForTime(motorB, 1000, -100);
        rotation_amt = rotation_amt + current;
        ev3.pause(1000);
    }
}

ev3.runUntil(turnNinety, spinClockwise);



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

var calib_rotate_distance = 95;
var black_val = 10;

var target_distance = 40;
var view_angle = 60;

function turnClockwise() {
    ev3.runForTime(motorA, 1000, -200);
    ev3.runForTime(motorB, 1000, 200);
}

function turnAntiClockwise() {
    ev3.runForTime(motorA, 1000, 200);
    ev3.runForTime(motorB, 1000, -200);
}

function faceEnemy(bearing) {
    ev3.gyroSensorRateMode(gyroSensor);
    ev3.gyroSensorAngleMode(gyroSensor);
    function leftBearingHit() {
        return ev3.gyroSensorAngle(gyroSensor) <= bearing;
    }
    function rightBearingHit() {
        return ev3.gyroSensorAngle(gyroSensor) >= bearing;
    }
    if(bearing !== 0 && bearing < 0) {
        ev3.runUntil(leftBearingHit, turnAntiClockwise);
    } else {
        ev3.runUntil(rightBearingHit, turnClockwise);
    }
}

function search() {
    var front_position = ev3.motorGetPosition(motorEye);
    source.alert("Front postion" + front_position);
    var left_angle = front_position - view_angle;
    var right_angle = front_position + view_angle;

   var current_angle = ev3.motorGetPosition(motorEye);
   while(ev3.ultrasonicSensorDistance(ultrasonic) > target_distance && current_angle > left_angle) {
     ev3.runToAbsolutePosition(motorEye, left_angle, 200);
     current_angle = ev3.motorGetPosition(motorEye);
   }
   while(ev3.ultrasonicSensorDistance(ultrasonic) > target_distance && current_angle < right_angle) {
     ev3.runToAbsolutePosition(motorEye, right_angle, 200);
     current_angle = ev3.motorGetPosition(motorEye);
   }
   var object_distance = ev3.ultrasonicSensorDistance(ultrasonic);
   ev3.motorStop(motorEye);
   ev3.runToAbsolutePosition(motorEye, front_position, 200);
   var enemy_bearing = current_angle - front_position;
   if(object_distance <= target_distance) {
     faceEnemy(enemy_bearing);
     return source.pair(1, 1);
   } else {
     search();
 }
}

function assault() {
    ev3.runForTime(motorA, 5000, 700);
    ev3.runForTime(motorB, 5000, 700);
    if (ev3.ultrasonicSensorDistance(ultrasonic) <= target_distance) {
      return assault();
    } else {
      return state_wrapper(search);
    }
}

function check_bumper() {
  return (ev3.touchSensorPressed(touchSensor)) ? true : check_bumper();
}

function move_forward(distance) {
    ev3.runForDistance(motorA, distance, 700);
    ev3.runForDistance(motorB, distance, 700);
}

function defend() {
  faceEnemy(180);
  move_forward(50);
  if (ev3.ultrasonicSensorDistance(ultrasonic) <= target_distance) {
    return assault();
  } else {
    return state_wrapper(search);
  }
}

while(true) {
   var res = search();
   source.alert(res);
}

#!/usr/bin/env node
var ev3 = require('./node_modules/ev3source/ev3.js');
var source = require('./node_modules/ev3source/source.js');

var motorA = ev3.motorA();
var motorB = ev3.motorB();
var motorEye = ev3.motorC();
var colorSensor = ev3.colorSensor();
var ultrasonic = ev3.ultrasonicSensor();

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

var calib_rotate_distance = 95;
var black_val = 10;

var front_position = ev3.motorGetPosition(motorEye);
source.alert(front_position);

var view_angle = 60;
var left_angle = front_position - view_angle;
var right_angle = front_position + view_angle;

var target_distance = 40;

function search() {
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
   return object_distance <= target_distance ? object_distance : search(); 
}

while(true) {
   var res = search();
   source.alert(res);
}

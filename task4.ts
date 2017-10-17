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
var black_val = 5;

function rotateBot(direction, distance) {
    if (direction === "left") {
       ev3.runForDistance(motorA, -distance, 100);
       ev3.runForDistance(motorB, distance, 100);
    } else {
       ev3.runForDistance(motorA, distance, 100);
       ev3.runForDistance(motorB, -distance, 100);
    }
//    ev3.pause(1000);
}

function moveForward() {
    ev3.runForTime(motorA, 500, 50);
    ev3.runForTime(motorB, 500, 50);
}


function isPath(direction, multiplier) {
	if (direction === "left") {
		rotateBot(direction, calib_distance * multiplier);
	} else {
		rotateBot(direction, calib_distance * multiplier);
	}	
    var intensity = ev3.reflectedLightIntensity(colorSensor);
    var counter = 0;
    while (intensity > black_val && counter < 100) {
        intensity = ev3.reflectedLightIntensity(colorSensor);
        //rotation_speed = ev3.gyroSensorRate(gyro);
        counter = counter + 1;
    }
	ev3.stop(motorA);
	ev3.stop(motorB);
    return intensity < black_val;
}

function followLine() {
    var intensity = ev3.reflectedLightIntensity(colorSensor);
    while (intensity < black_val) {
       moveForward(); 
       intensity = ev3.reflectedLightIntensity(colorSensor);
    }
    ev3.stop(motorA);
    ev3.stop(motorB);
    if (isPath("left", 1)) {
       followLine();
    } else if (isPath("right", 2)) {
       followLine();
    } else if (isPath("left", 4)) {
       followLine();
    } else if (isPath("right", 8)) {
       followLine();
    } else {
       console.log("SUCCESS");
    }
}


followLine();

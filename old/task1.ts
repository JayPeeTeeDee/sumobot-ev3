#!/usr/bin/env node
var ev3 = require('./node_modules/ev3source/ev3.js');
var source = require('./node_modules/ev3source/source.js');

var motorA = ev3.motorA();
var motorB = ev3.motorB();

if (ev3.connected(motorA)) {
    source.alert("CONNECTED");
}

if (ev3.connected(motorB)) {
    source.alert("CONNECTED B");
}

var calib_dist = 200;
ev3.runForDistance(motorA, calib_dist, 200);
ev3.runForDistance(motorB, calib_dist, 200);


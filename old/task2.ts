#!/usr/bin/env node
var ev3 = require('./node_modules/ev3source/ev3.js'); var source = 
require('./node_modules/ev3source/source.js'); var motorA = ev3.motorA(); var motorB = ev3.motorB(); if 
(ev3.connected(motorA)) {
    source.alert("CONNECTED");
}
if (ev3.connected(motorB)) {
    source.alert("CONNECTED B");
}
function turnNinety() {
    ev3.runForDistance(motorA, -170, 100);
    ev3.runForDistance(motorB, 170, 100);
    ev3.pause(5000);
}
turnNinety();

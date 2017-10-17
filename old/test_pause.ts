#!/usr/bin/env node
var ev3 = require('./node_modules/ev3source/ev3.js');
var source = require('./node_modules/ev3source/source.js');

var motorA = ev3.motorA();
var motorB = ev3.motorB();
var color = ev3.colorSensor();
if (ev3.connected(motorA)) {
    source.alert("CONNECTED");
}

if (ev3.connected(motorB)) {
    source.alert("CONNECTED B");
}

source.alert("BEEP");
ev3.pause(6000);
source.alert("BOOP");
while(true) {
 source.alert(ev3.reflectedLightIntensity(color));
}

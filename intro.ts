var ev3 = require('./node_modules/ev3source/ev3.js');
var exec = require('child_process').exec;

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

function turn(bearing) {
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

while(true) {
	exec('aplay sounds/intro.wav');
	turn(360);
	ev3.pause(5000);
}

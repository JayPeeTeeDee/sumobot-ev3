var ev3 = require('./node_modules/ev3source/ev3.js');
var source = require('./node_modules/ev3source/source.js');

var motorA = ev3.motorA();
var motorB = ev3.motorB();
var motorEye = ev3.motorC();
var colorSensor = ev3.colorSensor();
var ultrasonic = ev3.ultrasonicSensor();
var touchSensor = ev3.touchSensor2();
var gyroSensor = ev3.gyroSensor();

var view_angle = 80;
var target_distance = 10;

function search() {
    source.alert("SEARCHING");
    var front_position = ev3.motorGetPosition(motorEye);
    source.alert("Front postion: " + front_position);
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
   ev3.runToAbsolutePosition(motorEye, front_position, 500);
   ev3.pause(1000);
   var enemy_bearing = 0.5 * (current_angle - front_position);
   if(object_distance <= target_distance) {
       return object_distance;
   } else {
     return search();
 }
}

while(true) {
    ev3.waitForButtonPress();
    search();
}

#!/bin/bash

#Define GPIO array
gpioMap=( "2" "3" "4" "14" "15" "17" "18" "27" "22" "23" "24" "10" "9" "25" "11" "8" "7" )

#Prepare GPIO pins
for i in "${gpioMap[@]}"
	do
		echo $i > /sys/class/gpio/unexport
		echo $i > /sys/class/gpio/export
		echo out > /sys/class/gpio/gpio$i/direction
	done
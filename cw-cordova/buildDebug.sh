#!/bin/bash
#cordova build android --debug --device -- --keystore= --storePassword= --alias= --password=
cordova run   android --debug --device -- --keystore= --storePassword= --alias= --password=
rm -f ./platforms/android/*signing.properties

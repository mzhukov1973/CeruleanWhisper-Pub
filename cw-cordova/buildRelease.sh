#!/bin/bash
# cordova build android --release  --device -- --keystore=$mz_keyStore --storePassword=$mz_keyStorePassword --alias=$mz_keyAlias --password=$mz_keyAliasPassword
# cordova run   android --release --emulator -- --keystore=$mz_keyStore --storePassword=$mz_keyStorePassword --alias=$mz_keyAlias --password=$mz_keyAliasPassword
cordova run   android --release  --device -- --keystore=$mz_keyStore --storePassword=$mz_keyStorePassword --alias=$mz_keyAlias --password=$mz_keyAliasPassword
rm -f ./platforms/android/*signing.properties

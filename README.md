# nodejs & io.js based Phidgets API
_A node.js and io.js based API for interacting with your own analog sensors and [all official Phidget boards and sensors](http://www.phidgets.com/)_. This module is compatible with all operating systems which can run node.js or io.js. phidgetsapi is perfect for projects using BeagleBone Black and Raspberry Pi too!

# Known supported platforms

1. [node.js](nodejs.org)
2. [io.js](https://iojs.org/en/index.html)
3. [nw.js formerly node-webkit](http://nwjs.io/) __->__ [nw.js github](https://github.com/nwjs/nw.js)
4. [atom electron formerly atom shell](http://electron.atom.io/) __->__ [electron github](https://github.com/atom/electron)

## PHIDGETS
[Phidget boards](https://www.phidgets.com/) are a great prototyping tool which can handle digital inputs and outputs, along with a great array of analog sensors (RFID, temperature, accelerometer, servo motors etc).

## Phidget Server Requirement
This project assumes you have the Phidget server up and running for your OS. If you need to do that yet, you can check out the info for your system at one of these links.

1. [Linux](http://www.phidgets.com/docs/OS_-_Linux)
2. [Mac OS X](http://www.phidgets.com/docs/OS_-_OS_X)
3. [Windows](http://www.phidgets.com/docs/OS_-_Windows)


For most "regular" (USB) Phidget boards, that assumes that the computer or SBC (BeagleBone Black, Raspberry Pi etc.) you have connected to the Phidget board via USB has the webservice up and running.  For stand-alone Phidget micro-computers (phidgetsbc), this assumes you have configured the server via the web portal.  You will be connecting to the Phidget server via TCP, so be sure you can access the server from the machine running this project.

If you are staring from the command line it will look something like this, __you can add -v if you want to see some more verbose logging from the service__.

[Linux phidget webservice info](http://www.phidgets.com/docs/OS_-_Linux#Using_the_WebService)  
[Mac phidget webservice info](http://www.phidgets.com/docs/OS_-_OS_X#Using_the_WebService)

    sudo phidgetswbservice21

[Windows  phidget webservice info](http://www.phidgets.com/docs/OS_-_Windows#Using_the_WebService)

    PhidgetWebservice21
    
For a guide on installing the required libraries and services on your platform, see the below wikis

1. [Linux](http://www.phidgets.com/docs/OS_-_Linux)
2. [Mac OS X](http://www.phidgets.com/docs/OS_-_OS_X)
3. [Windows](http://www.phidgets.com/docs/OS_-_Windows)

## Installation
# NPM
* ` npm install phidgetapi `

[![Package Quality](http://npm.packagequality.com/shield/phidgetapi.svg)](http://packagequality.com/#?package=phidgetapi) [![phidgetapi npm version](https://badge.fury.io/js/phidgetapi.svg)](https://www.npmjs.com/package/phidgetapi)

[![phidgetapi Package Quality](http://npm.packagequality.com/badge/phidgetapi.png)](https://www.npmjs.com/package/phidgetapi)

[See NPM stats for phidgetapi](http://npm-stat.com/charts.html?package=phidgetapi&author=&from=&to=)


# GIT
* git clone git://github.com/RIAEvangelist/node-phidget-API.git
OR
* git clone https://github.com/RIAEvangelist/node-phidget-API.git

#Module Documentation
* [Core Phidget Module](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md)
* [Manager Module](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Manager.md)
* [GPS Module](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/GPS.md)
* [InterfaceKit Module](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/InterfaceKit.md)
* [RFID Module](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/RFID.md)
* [Servo Module](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Servo.md)
* [Spatial Module](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Spatial.md)

## Quick Example
Please see the [Module Documentation](https://github.com/RIAEvangelist/node-phidget-API#module-documentation) above for more info on specific phidget types.

    var Manager = require('phidgetapi').Manager;

    var manager=new Manager;

    manager.observe(update);

    function update(changes){
        for(var i in changes){
            var change=changes[i];
            //see specific info about each phidget
            //console.log(change);
        }

        //see latest info on all available phidgets
        console.log(manager.devices);
    }

    manager.phidget.connect();

## ToDo:
* Support for Phidget authentication
* Create modules for handling all phidget types
* document all modules for various Phidgets
* Create more examples for various Phidgets
* Write tests for all phidget modules

## Licensed under DBAD license
See the [DBAD license](https://github.com/philsturgeon/dbad) in your language or our [licence.md](https://github.com/RIAEvangelist/node-phidget-API/blob/master/license.md) file.

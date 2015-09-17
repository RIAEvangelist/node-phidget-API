const errors={
    3:'Unexpected Error.  Contact Phidgets Inc. for support.',
    4:'Invalid argument.',
    9:'Value is Unknown (State not yet received from device).',
    11:'Unsupported, function not supported for this device, or not yet implemented.',
    14:'Index Out of bounds, tried to index past the end of an array.',

    8:'Network error.',
    10:'Authorization Failed.',
    16:'A connection to the server does not exist.',
    19:'Webservice and Client protocol versions dont match. Update both to newest release.',

    0x9000:'an error state has ended',
    0x9002:'a sampling overrun happend in firmware.',
    0x9003:'one or more packets were lost.',
    0x9004:'a variable has wrapped around.',
    0x9005:'overtemperature condition detected.',
    0x9006:'overcurrent condition detected.',
    0x9007:'out of range condition detected.',
    0x9008:'power supply problem detected.',
}

const devices={
    /* These are all current devices */
    126:"Phidget Accelerometer 3-axis",
    130:"Phidget Advanced Servo Controller 1-motor",
    58:"Phidget Advanced Servo Controller 8-motor",
    55:"Phidget Analog 4-output",
    123:"Phidget Bipolar Stepper Controller 1-motor",
    59:"Phidget Bridge 4-input",
    75:"Phidget Encoder 1-encoder 1-input",
    128:"Phidget High Speed Encoder 1-encoder",
    79:"Phidget High Speed Encoder 4-input",
    53:"Phidget Frequency Counter 2-input",
    121:"Phidget GPS",
    64:"Phidget InterfaceKit 0/0/4",
    129:"Phidget InterfaceKit 0/0/8",
    68:"Phidget InterfaceKit 0/16/16",
    54:"Phidget InterfaceKit 2/2/2",
    69:"Phidget InterfaceKit 8/8/8",
    125:"Phidget InterfaceKit 8/8/8",
    77:"Phidget IR Receiver Transmitter",
    76:"Phidget LED 64 Advanced",
    118:"Phidget Touch Slider",
    62:"Phidget Motor Controller 1-motor",
    89:"Phidget High Current Motor Controller 2-motor",
    49:"Phidget RFID 2-output",
    52:"Phidget RFID Read-Write",
    119:"Phidget Touch Rotation",
    127:"Phidget Spatial 0/0/3",
    51:"Phidget Spatial 3/3/3",
    112:"Phidget Temperature Sensor",
    50:"Phidget Temperature Sensor 4-input",
    60:"Phidget Temperature Sensor IR",
    381:"Phidget TextLCD",
    61:"Phidget TextLCD Adapter",
    122:"Phidget Unipolar Stepper Controller 4-motor",

    /* These are all past devices (no longer sold) */
    113:"Phidget Accelerometer 2-axis",
    83:"Phidget InterfaceKit 0/8/8",
    4:"Phidget InterfaceKit 4/8/8",
    74:"Phidget LED 64",
    88:"Phidget Low Voltage Motor Controller 2-motor 4-input",
    116:"Phidget PH Sensor",
    48:"Phidget RFID",
    2:"Phidget Servo Controller 1-motor",
    56:"Phidget Servo Controller 4-motor",
    57:"Phidget Servo Controller 1-motor",
    3:"Phidget Servo Controller 4-motor",
    82:"Phidget TextLCD",
    339:"Phidget TextLCD",
    72:"Phidget TextLED 4x8",
    73:"Phidget TextLED 1x8",
    114:"Phidget Weight Sensor",

    /* Nothing device */
    1:"Uninitialized Phidget Handle",

    /* never released to general public */
    81:"Phidget InterfaceKit 0/5/7",
    337:"Phidget TextLCD Custom",
    5:"Phidget InterfaceKit 2/8/8",

    /* These are unreleased or prototype devices */

    /* This is for internal prototyping */
    153:"Phidget Generic Device"
}

const commands={
    needNull:"need nulls",
    listen:"listen",
    ignore:"ignore",
    report:"report",
    wait:"wait",
    flush:"flush",
    walk:"walk",
    quit:"quit",
    get:"get",
    set:"set"
}

module.exports.command=commands;
module.exports.device=devices;
module.exports.error=errors;

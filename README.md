usbreset
========

This tool resets a USB device. The use case is to attempt to gain functionality
again from a device that is unresponsive, for instance a hanging USB BLE
adapter. This tool is Linux-only and unfortunately requires running with `sudo`
in order to interact directly with USB devices.

USB devices are specified by Vendor ID (VID) and Product ID (PID). These
numbers are unique to a given product and can be found by running `lsusb`. For
example in the following output from `lsusb` the Vendor ID is 0x0a5c and
Product ID is 0x21e8
```
Bus 002 Device 001: ID 0a5c:21e8 Broadcom Corp. BCM20702A0 Bluetooth 4.0
```

Usage
-----

```javascript
var usbreset = require('usbreset');

var VID = 0x0a5c;
var PID = 0x21e8;

var error = usbreset.reset(VID, PID);
if (error) {
    console.log(error);
} else {
    // USB device has been reset
}

```

Notes
-----

Occasionally this ioctl throws a -19, ENODEV. It's unclear why. Running it a
second time usually results in a successful reset.


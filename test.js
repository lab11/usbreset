#! /usr/bin/env node

// Reset a Broadcom USB BLE adapter
var usbreset = require('./usbreset');

console.log("Starting reset...");
usbreset.reset(0x0a5c, 0x21e8);
console.log("Reset complete");


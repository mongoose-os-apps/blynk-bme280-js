# Using BME280 sensor with Blynk mobile app

## Overview

This example shows how to use MongooseOS with Blynk mobile framework.
Go to device configuration and specify
`blynk.auth` setting to your Blynk access token. Or, alternatively,
run the following console command (from the terminal or "Terminal" tab in Web UI):

# BME280 sensor i2c address
```bash
# In case its on 0x76 use this
mos config-set i2c.address=0x76
# Otherwise if its on 0x77 use this
mos config-set i2c.address=0x77
```

```bash
mos config-set blynk.auth=YOUR_TOKEN blynk.server="blynk-cloud.com:8442"
```

## Blynk configuration
- Create a graph with virtual pin 1 (Graph of memory usage) limits min 0 - 50
- Create a button with virtual pin 2 (Toggles led on/off)
- Create a graph with virtual pin 3 (Graph of temperature) limits min -30 - 60
- Create a graph with virtual pin 4 (Graph of humidity) limits min 0 - 100
- Create a graph with virtual pin 5 (Graph of pressure) limits min 500 - 3000

You can easily add your own handlers for Blynk virtual pins, in either C
or JavaScript.

## How to install this app

- Install and start [mos tool](https://mongoose-os.com/software.html)
- Switch to the Project page, find and import this app, build and flash it:

<p align="center">
  <img src="https://mongoose-os.com/images/app1.gif" width="75%">
</p>

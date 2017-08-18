load('api_arduino_bme280.js');
load('api_gpio.js');
load('api_blynk.js');
load('api_sys.js');

// Sensors address
let sens_addr = Cfg.get('i2c.address') | 0x77;
// Initialize Adafruit_BME280 library
let bme = Adafruit_BME280.create();
// Initialize the sensor
if (bme.begin(sens_addr) === 0) {
  print('Cant find a sensor');
} else {
  print('BME280 sensor found!');
  print('Temperature:', bme.readTemperature(), '*C');
  print('Humidity:', bme.readHumidity(), '%RH');
  print('Pressure:', bme.readPressure(), 'hPa');
}

Blynk.setHandler(function(conn, cmd, pin, val, id) {
  let ram = Sys.free_ram() / 1024;
  let temperature = bme.readTemperature();
  let humidity = bme.readHumidity();
  let pressure = bme.readPressure();
  if (cmd === 'vr') {
  	// When reading any virtual pin, report free RAM in KB
  	if (pin === 1) {
  	 Blynk.virtualWrite(conn, pin, ram, id);
  	}
  	else if (pin === 3) {
  	  Blynk.virtualWrite(conn, pin, temperature, id);
  	}
  	else if (pin === 4) {
  	  Blynk.virtualWrite(conn, pin, humidity, id);
  	}
  	else if (pin === 5) {
  	  Blynk.virtualWrite(conn, pin, pressure, id);
  	}
  	else {
  	  print('BLYNK JS handler, unknown', ram, cmd, id, pin, val);
  	}
  } else if (cmd === 'vw') {
  	// Writing to virtual pin translate to writing to physical pin
    GPIO.set_mode(pin, GPIO.MODE_OUTPUT);
    GPIO.write(pin, val);
  } else {
	  print('Unknown command', cmd, id, pin, val);
  }
}, null);

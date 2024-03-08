# Web2Ink

This node.js service can be used to display webpages on e-paper/ink display devices.
Essentially, you can consider this as an HTML rendering service for microcontrollers.

The service captures a screenshot of a webpage and converts it into a compact 8bpp BMP using customizable dithering and a customizable color palette.

This can be useful if the display is driven by a device less powerful, such as an ESP32, as opposed to a Raspberry Pi.

Data from sensors, such as temperature, can be sent to the target page via URL to be rendered in HTML.



By default, the color palette is Black, White, Red.

Example:
http://127.0.0.1:3000/?auth=changeme&url=http://127.0.0.1:3000/test/

(Remember to use  -webkit-font-smoothing: none; to disable font anti-aliasing)
<img src="screen3.png">

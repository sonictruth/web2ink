# Web2Ink

This node.js service can be used to display webpages on e-paper/ink display devices.

The service captures a screenshot of a webpage and converts it into a compact 8bpp BMP using customizable dithering and a customizable color palette.

This can be useful if the display is driven by a device less powerfull, such as an ESP32, as opposed to a Raspberry Pi.

By default, the color palette is Black, White, Red.

Example:
http://127.0.0.1:3000/?auth=changeme&width=600&height=400&url=http://www.example.com


<img src="screen.png">

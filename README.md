# Web2Ink

This node.js service can be used to display webpages on EDP ink devices.

The service captures screenshots of a webpage and converts them into compact 8bpp BMPs using dithering and a customizable color palette.

This can be useful if the EDP device is driven by a device with small memory like a ESP32. Additionally, you can create a color palette that matches your device. By default, the color palette is Black, White, Red.

Example:
http://127.0.0.1:3000/?auth=changeme&width=600&height=400&url=http://www.example.com


<img src="screen.png">

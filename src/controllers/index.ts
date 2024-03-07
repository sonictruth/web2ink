import { Request, Response } from 'express';
import puppeteer from 'puppeteer';
import { PNG } from 'pngjs';
import { buildPaletteSync, applyPaletteSync, utils } from 'image-q';
import { BmpEncoder } from './encoder';

const customPaletteRedBlackWhite = [
  255, 0, 0, 0, // RGBA
  0, 0, 0, 0,
  255, 255, 255, 0
];

class IndexController {
  async getIndex(req: Request, res: Response) {
    const browser = await puppeteer.launch({
      headless: true,
      product: 'chrome',
    });
    const width = req.query.width ? parseInt(req.query.width as string) : 800;
    const height = req.query.height ? parseInt(req.query.height as string) : 480;
    const url = req.query.url ? req.query.url as string : `https://picsum.photos/${width}/${height}`;
    const page = await browser.newPage();
    await page.setViewport({ width, height });

    await page.goto(url);

    const screenshot = await page.screenshot();

    await browser.close();

    const meta = PNG.sync.read(screenshot);

    const inPointContainer = utils.PointContainer.fromUint8Array(
      meta.data,
      meta.width,
      meta.height,
    );

    const customPoints = utils.PointContainer.fromUint8Array(
      customPaletteRedBlackWhite,
      customPaletteRedBlackWhite.length / 4,
      1,
    );
    const colorDistanceFormula = 'euclidean';
    // 'cie94-textiles''cie94-graphic-arts''ciede2000''color-metric'
    // 'euclidean' 'euclidean-bt709-noalpha'
    // 'euclidean-bt709' 'manhattan' 'pngquant

    const imageQuantization = 'stucki';
    // 'nearest' 'riemersma''floyd-steinberg''false-floyd-steinberg''stucki'
    // 'atkinson''jarvis' 'burkes' 'sierra' 'two-sierra' 'sierra-lite'
    //  stucki / jarvis / sierra

    const paletteQuantization = 'rgbquant'
    // 'neuquant' 'neuquant-float' 'rgbquant' 'wuquant'

    const palette = buildPaletteSync([customPoints], {
      colorDistanceFormula,
      paletteQuantization,
      colors: customPaletteRedBlackWhite.length / 4,
    });

    const outPointContainer = applyPaletteSync(inPointContainer, palette, {
      colorDistanceFormula,
      imageQuantization,
    });

    const outArrayRGBA = outPointContainer.toUint8Array();

    const outArrayABGR = new Uint8Array(outArrayRGBA.length);

    const bmpPalette: { red: number; green: number; blue: number; quad: number; }[] = [];
    for (let i = 0; i < outArrayRGBA.length; i += 4) {
      const color = {
        red: outArrayRGBA[i],
        green: outArrayRGBA[i + 1],
        blue: outArrayRGBA[i + 2],
        quad: outArrayRGBA[i + 3],
      }
      const hasColor = bmpPalette.some((c) => c.red === color.red && c.green === color.green && c.blue === color.blue);
      if (!hasColor) {
        bmpPalette.push(color);
      }
      outArrayABGR[i] = color.quad // Alpha
      outArrayABGR[i + 1] = color.blue // Blue
      outArrayABGR[i + 2] = color.green // Green
      outArrayABGR[i + 3] = color.red; // Red

    }

    const newBMP = new BmpEncoder({
      data: outArrayABGR,
      width: outPointContainer.getWidth(),
      height: outPointContainer.getHeight(),
      bitPP: 8,
      colors: bmpPalette.length,
      palette: bmpPalette
    });

    newBMP.encode();

    res.setHeader('Content-Type', 'image/bmp');
    res.send(newBMP.data);
  }
}

export default IndexController;
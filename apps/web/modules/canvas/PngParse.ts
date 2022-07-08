import { PNG } from 'pngjs';

export class PngParse {
  public static getOutput(pngList: PNG[]): PNG {
    let width = 0;
    let height = 0;
    for (const png of pngList) {
      width = Math.max(width, png.width);
      height += png.height;
    }
    return new PNG({ width, height, colorType: 6 });
  }

  files: Blob[];
  pngList: PNG[];
  cache: PNG;
  y = 0;

  constructor(files: Blob[]) {
    this.files = files;
    this.pngList = [];
    this.cache = new PNG();
  }

  public parse(): Promise<PNG[]> {
    return new Promise((resolve) => {
      let index = 1;
      for (const file of this.files) {
        file.arrayBuffer().then((buffer) => {
          const png = new PNG();
          png.parse(buffer as any, (error) => {
            if (error) {
              console.error(error);
            } else {
              this.pngList.push(png);
            }
            index += 1;
            if (index === this.files.length) {
              resolve(this.pngList);
            }
          });
        });
      }
    });
  }

  public async merge(): Promise<Blob> {
    const pngList = await this.parse();
    this.cache = PngParse.getOutput(pngList);
    this.y = 0;
    for (const png of this.pngList) {
      this.appendToImage(png);
    }
    const buffer = PNG.sync.write(this.cache.pack());
    return new Blob([buffer], { type: 'image/png' });
  }

  /**
   * y轴拼接图片
   * @param source
   * @private
   */
  private async appendToImage(source: PNG) {
    const { width, height } = this.cache;
    let sourceIndex = 0;
    for (let { y } = this; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (width * y + x) << 2;
        // put color
        this.cache.data[idx] = source.data[sourceIndex];
        this.cache.data[idx + 1] = source.data[sourceIndex + 1];
        this.cache.data[idx + 2] = source.data[sourceIndex + 2];
        // put opacity
        this.cache.data[idx + 3] = source.data[sourceIndex + 3];
        sourceIndex += 4;
      }
    }
    this.y += source.height;
  }
}

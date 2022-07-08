/* eslint-disable no-param-reassign */
import * as fs from 'fs';
import * as path from 'path';
import { PNG } from 'pngjs';

/**
 * nodejs 拼接png图片
 */
function main() {
  console.log('read png file');
  const file1 = fs.readFileSync(path.join(__dirname, './1.png'));
  const file2 = fs.readFileSync(path.join(__dirname, './2.png'));
  const file3 = fs.readFileSync(path.join(__dirname, './3.png'));
  const png1 = PNG.sync.read(file1);
  const png2 = PNG.sync.read(file2);
  const png3 = PNG.sync.read(file3);
  console.log('group png file');
  const pngList: PNG[] = [];
  pngList.push(png1);
  pngList.push(png2);
  pngList.push(png3);
  const outImg = getOutput(pngList);
  console.log('merge png file');
  appendToImage(png1, outImg);
  appendToImage(png2, outImg, { x: 0, y: png1.height });
  appendToImage(png3, outImg, { x: 0, y: png1.height + png2.height });
  outImg.pack().pipe(fs.createWriteStream(path.join(__dirname, './out.png')));
}

function getOutput(pngList: PNG[]): PNG {
  let width = 0;
  let height = 0;
  for (const png of pngList) {
    width = Math.max(width, png.width);
    height += png.height;
  }
  return new PNG({ width, height, colorType: 6, bgColor: { red: 0, green: 0, blue: 0 } });
}

interface Position {
  x: number;
  y: number;
}

/**
 * y轴拼接图片
 * @param source 原图
 * @param target 目标图
 * @param pos 起始点位置
 */
function appendToImage(source: PNG, target: PNG, pos: Position = { x: 0, y: 0 }) {
  const { width, height } = target;
  let sourceIndex = 0;
  for (let { y } = pos; y < height; y++) {
    for (let { x } = pos; x < width; x++) {
      const idx = (width * y + x) << 2;
      // put color
      target.data[idx] = source.data[sourceIndex];
      target.data[idx + 1] = source.data[sourceIndex + 1];
      target.data[idx + 2] = source.data[sourceIndex + 2];
      // put opacity
      target.data[idx + 3] = source.data[sourceIndex + 3];
      sourceIndex += 4;
    }
  }
}

main();

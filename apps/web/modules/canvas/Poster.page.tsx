import canvasSize from 'canvas-size';
import html2canvas from 'html2canvas';
import randomColor from 'randomcolor';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { PngParse } from './PngParse';

export interface PosterPageProps {
  className?: string;
  style?: CSSProperties;
}

export function saveBlob(filename: string, blob: Blob) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
}

export const PosterPage: React.FC<PosterPageProps> = (props) => {
  const { style } = props;
  const domRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);

  const handleSavePicture = () => {
    if (domRef.current) {
      const scale = window.devicePixelRatio || 1;
      html2canvas(domRef.current, {
        scale,
      }).then((canvas) => {
        const { width, height } = canvas;
        console.log(`scale=${scale},width=${width}, height=${height}`);
        const isSupport = canvasSize.test({ width, height });
        if (!isSupport) {
          console.error(`not support width=${width}, height=${height}`);
        }
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'poster.png';
            a.click();
            URL.revokeObjectURL(url);
          } else {
            console.error('blob is null');
          }
        }, 'image/png', 1);
      });
    }
  };

  const handleSaveAllPicture = () => {
    if (domRef.current) {
      const scale = window.devicePixelRatio || 1;
      const domList = Array.from(domRef.current.children);
      const allFiles: Blob[] = [];
      domList.forEach((child, index) => {
        html2canvas(child as HTMLDivElement, {
          scale,
        }).then((canvas) => {
          canvas.toBlob((blob) => {
            if (blob) {
              allFiles.push(blob);
              if (index === domList.length - 1) {
                console.log('last png file');
                new PngParse(allFiles).merge()
                  .then((blob) => {
                    console.log('merge success', blob);
                    saveBlob('poster.png', blob);
                  });
              }
            }
          }, 'image/png', 1);
        });
      });
    }
  };

  const handleSave = () => {
  };

  const list = new Array(3).fill(0);

  return (
    <div className={styles.page} style={style}>
      <div ref={domRef} style={{ display: 'inline-block' }}>
        {
          list.map((_, index) => (show ? (
            <div key={index}
                 className={styles.flexCard}
                 style={{ background: `${randomColor()}` }}>
              Card {index + 1}
            </div>
          ) : null))
        }
      </div>
      <div className={styles.flexCard} style={{ height: 48 }}>
        <button type="button" onClick={handleSavePicture}>保存单张</button>
        <button type="button" onClick={handleSaveAllPicture}>保存多张</button>
        <button type="button" onClick={handleSave}>保存</button>
      </div>
    </div>
  );
};

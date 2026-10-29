import {chromium} from '@playwright/test';
import {readFile,writeFile} from 'node:fs/promises';
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage();const svg=await readFile('public/icon.svg','utf8');
for(const size of [192,512]){const data=await page.evaluate(async({svg,size})=>{const im=new Image();im.src='data:image/svg+xml;base64,'+btoa(svg);await im.decode();const c=document.createElement('canvas');c.width=c.height=size;c.getContext('2d').drawImage(im,0,0,size,size);return c.toDataURL('image/png').split(',')[1];},{svg,size});await writeFile(`public/icon-${size}.png`,Buffer.from(data,'base64'));}
await browser.close();

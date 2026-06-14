// 截图脚本：把 7 个页面都截下来
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const PAGES = [
  { path: '/', name: 'home' },
  { path: '/vision', name: 'vision' },
  { path: '/capabilities', name: 'capabilities' },
  { path: '/architecture', name: 'architecture' },
  { path: '/tech', name: 'tech' },
  { path: '/roadmap', name: 'roadmap' },
  { path: '/about', name: 'about' },
  { path: '/contact', name: 'contact' },
];

const BASE = 'http://localhost:4322';
const OUT = '/tmp/kchub-shots';

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2, // retina 截图
});
const page = await ctx.newPage();

for (const p of PAGES) {
  console.log(`→ ${p.path}`);
  await page.goto(BASE + p.path, { waitUntil: 'networkidle' });
  // 等待字体加载
  await page.waitForTimeout(800);
  // 全页截图
  await page.screenshot({ path: `${OUT}/${p.name}-full.png`, fullPage: true });
  // 首屏截图
  await page.screenshot({ path: `${OUT}/${p.name}-fold.png`, fullPage: false });
}

await browser.close();
console.log(`\n✓ 截图完成 → ${OUT}`);

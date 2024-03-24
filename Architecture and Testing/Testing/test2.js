import { chromium } from "playwright-chromium";
import { expect } from "chai";

/**
 * @type {import('playwright-chromium').BrowserServer}
 */
let browser;
/**
 * @type {import('playwright-chromium').Page}
 */
let page;

describe("E2E tests", async function () {
    this.timeout(60000);

  before(async () => {
    browser = await chromium.launch({ headless: false, slowMo: 3333 });
  });
  after(async () => {
    await browser.close();
  });
  beforeEach(async () => {
    page = await browser.newPage();
  });
  afterEach(async () => {
    await page.close();
  });

  it("works", async () => {
    await page.goto('http://localhost:5500/example.html')
    const content = await page.textContent('h1');

    expect(content).to.contain('Hello, Playwright')

    console.log(content);
  });

  it('has a working button', async () => {
    await page.goto('http://localhost:5500/example.html');
    await page.click('text=click me');

    const visible = await page.isVisible('text= - Chirp, Chirp... MotherFucker');
    expect(visible).to.be.true;

  })
});

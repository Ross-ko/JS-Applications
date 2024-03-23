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
    browser = await chromium.launch({ headless: false, slowMo: 1666 });
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

  it("loads titles", async () => {
    await page.goto("http://localhost:5500");
    await page.waitForLoadState("networkidle");

    const titles = await page.$$eval("div.head span", (items) =>
      items.map((i) => i.textContent)
    );

    expect(titles).to.include("Unix");
  });

  it("shows more", async () => {
    await page.goto("http://localhost:5500");

    await page.click("text=More");

    await page.waitForLoadState("networkidle");

    const visible = await page.isVisible(
      "text=Scalable Vector Graphics (SVG) is an Extensible Markup Language (XML)-based vector image format for two-dimensional graphics with support for interactivity and animation."
    );
    expect(visible).to.be.true;
  });
});

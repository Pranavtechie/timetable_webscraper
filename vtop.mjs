import playwright from "playwright";

export class Scrapper {
  async initiate() {
    global.browser = await playwright.chromium.launch({
      // headless: false,
      timeout: 2000,
    });
    global.page = await browser.newPage();

    return Promise.resolve("done");
  }

  async startInstance() {
    await page.goto("https://vtopcc.vit.ac.in/vtop/");
    await page.locator("button[type='submit'][onclick='openPage()']").click();
    await page.locator("input[name='uname']").focus();
    await page.keyboard.type("21BAI1061");
    await page.locator("input[name='passwd']").focus();
    await page.keyboard.type("Pandugadu@1013");
    try {
      let imageSrc = await page.$("img[alt='vtopCaptcha']");
      if (imageSrc) {
        console.log("Image Src : ", await imageSrc.getAttribute("src"));
      } else {
        throw new Error("element not found");
      }
      page.pause();
      // TODO : send the image src to the web app and get the text input from user and enter it in the text box
    } catch (error) {
      console.log(error);
      page.pause();
    }
    await page.locator("button#captcha").click();
    //   await browser.close();

    return Promise.resolve("done");
  }
}

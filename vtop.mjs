import playwright from "playwright";
import dotenv from "dotenv";

dotenv.config();
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
    await page.keyboard.type(process.env.VTOP_USERNAME);
    await page.locator("input[name='passwd']").focus();
    await page.keyboard.type(process.env.VTOP_PASSWORD);
    let imageData;
    try {
      let imageSrc = await page.$("img[alt='vtopCaptcha']");
      if (imageSrc) {
        imageData = await imageSrc.getAttribute("src");
        console.log("Image Src : ", imageData);
      } else {
        await page.screenshot({ path: "screenshot.png", fullPage: true });
        throw new Error("element not found");
      }
      page.pause();
    } catch (error) {
      if (error instanceof playwright.errors.TimeoutError) {
        return Promise.resolve({
          imageData: false,
          captcha: false,
          sentFrom: "if loop - catch",
        });
      } else {
        console.log("ERROR OCCURRED .. ;_;\n", error);
      }
      // console.log(error);
      // page.pause();
    }
    await page.locator("button#captcha").click();
    //   await browser.close();

    return Promise.resolve({ imageData, captcha: true, sentFrom: "last line" });
    // DONE : send the image src to the web app and get the text input from user and enter it in the text box
  }
}

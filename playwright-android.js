const {_android} = require("playwright");
const assert = require("assert");

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

function setCookieVals() {

  const cookies = [
      {name:"cookie1", value:"349", path:"/", domain:"stackoverflow"},
      {name:"cookie2", value:"1", path:"/", domain:"stackoverflow"},
      {name:"cookie3", value:"4000", path:"/", domain:"stackoverflow"},
  ]

  return cookies;
}

(async () => {
  let device, context, page;
  try {
    const capabilities = {
      "LT:Options": {
        "platformName": "android",
        // "deviceName": "Galaxy S10",
        "deviceName": ".*",
        // "platformVersion": "11",
        "isRealMobile": true,
        "build": "Playwright Android Regex Testing " + new Date().toDateString(),
        "name": "Playwright Test US .*",
        // 'udid': '18357c2f',
        "user": 'vinayk',
        "accessKey": 'ROyYgJWaWuZykSJsLT8U3SrSROp2H1giH83dWbV5Qe7uqHaABO',
        "network": true,
        "video": true,
        "console": true,
        // "region": 'eu',
        "projectName": new Date().toDateString(),
        "tags": [
          "lol1",
          "lol2",
        ],
        "buildTags": [
          "lol1",
        ],
      },
    };

    let start = new Date();

    device = await _android.connect(
        `wss://stage-cdp-us.lambdatestinternal.com/playwright?capabilities=${encodeURIComponent(
            JSON.stringify(capabilities))}`,
    );

    let setupTime = new Date();
    console.log("Setup Time=====>", (setupTime - start) / 1000);
    console.log(`Device model:: ${device.model()}, serial no.:: ${device.serial()}`);

    console.log("Force stop browser");
    await device.shell("am force-stop com.android.chrome");

    console.log("Launching browser");
    context = await device.launchBrowser({
      args: [],
    });

    console.log("Creating new page");
    page = await context.newPage();

    // console.log("Set & Get Cookies");
    // const cookieVals = await setCookieVals();
    // await context.addCookies(cookieVals)
    // await page.goto("https://stackoverflow.com/", { timeout: 90000 })
    // console.log("Cookies -> " + JSON.stringify(await context.cookies()))

    // for(i = 0; i < 1; i++){

    //   console.log("Button Click");
    //   await page.goto("https://the-internet.herokuapp.com/add_remove_elements/", { timeout: 90000 })
    //   let addElementBtn = await page.locator("#content button")
    //   await addElementBtn.click()
    //   await delay(2000);

    //   console.log("Hover");
    //   await page.goto("https://the-internet.herokuapp.com/hovers", { timeout: 90000 })
    //   let hoverFirstElement = await page.$("[class='figure']")
    //   await hoverFirstElement.hover()
    //   await delay(2000);

    //   console.log("Checkbox click");
    //   await page.goto("https://the-internet.herokuapp.com/checkboxes", { timeout: 90000 });
    //   let checkbox1 = await page.$("#checkboxes input:nth-child(1)");
    //   await checkbox1.click();
    //   await delay(1000);
    //   let checkbox2 = await page.$("#checkboxes input:nth-child(3)");
    //   await checkbox2.click();
    // }

    // console.log("Upload");
    // await page.goto("https://the-internet.herokuapp.com/upload", { timeout: 90000 })
    // const fileChooserPromise = page.waitForEvent('filechooser');
    // let chooseFileBtn = await page.$("#file-upload");
    // await chooseFileBtn.click();
    // await delay(1000);
    // const fileChooser = await fileChooserPromise;
    // await fileChooser.setFiles('./screenshots/playwrightAndroid.png');
    // await delay(1000);
    // let uploadFileBtn = await page.$("#file-submit")
    // await uploadFileBtn.click()
    // await delay(1000);

    // console.log("Download");
    // await page.goto("https://the-internet.herokuapp.com/download", { timeout: 90000 })
    // let htmlDownloadElement = await page.$("[href='download/dummy.pdf']")
    // await htmlDownloadElement.click();
    // await delay(2000);

    await page.goto("https://maps.google.com", { timeout: 90000 })
    await delay(1000);
    await page.goto("https://www.google.com", { timeout: 90000 })
    await delay(1000);
    await page.goto("https://www.amazon.com", { timeout: 90000 })
    await delay(1000);
    await page.goto("https://www.youtube.com", { timeout: 90000 })
    await delay(1000);
    await page.goBack()
    await page.goForward()

    // await page.goto("chrome://version");
    // let title = await page.locator("#command_line").textContent();
    // console.log("CLI ARGS=====>", title);

    // await page.goto(
    //     "https://www.whatismybrowser.com/detect/what-is-my-user-agent/", { timeout: 90000 });
    // let userAgent = await page.locator("#detected_value > a:nth-child(1)").
    //     textContent();
    // console.log("userAgent=====>", userAgent);

    // console.log("Screenshot Capture");
    // await page.goto("https://duckduckgo.com", { timeout: 90000 });
    // await page.screenshot(
    //     {path: "screenshots/playwrightAndroidPixelUS" + i +".png", fullPage: true});
    // let element = await page.$("[name=\"q\"]");
    // await element.click();
    // await element.type("ABCD");
    // await element.press("Enter");
    // title = await page.title();
    
    try {
      // assert.equal(title, "ABCD at DuckDuckGo");
      await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({
        action: "setTestStatus",
        arguments: {status: "passed", remark: "Assertions passed"},
      })}`);
    } catch (e) {
      await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({
        action: "setTestStatus",
        arguments: {status: "failed", remark: e.stack},
      })}`);
      console.log("Error caught=====>", e);
    }

    let response = await page.evaluate(_ => {},
        `lambdatest_action: ${JSON.stringify({action: "getTestDetails"})}`);
    console.log("TEST_ID=====>",
        Boolean(response) && JSON.parse(response).data.test_id);

    await page.close();
    await context.close();
    await device.close();

    let end = new Date();
    console.log(`Time elapsed=====> ${(end - start) / 1000} s`);
  } catch (e) {
    console.log("ERROR=====>", e);
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({
      action: "setTestStatus",
      arguments: {status: "failed", remark: e.stack},
    })}`);
    await page.close();
    await device.close();
  }
})();

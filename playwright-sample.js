const { chromium } = require('playwright')
const {expect} = require("expect");
const { exec } = require("child_process");

(async () => {
  const capabilities = {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'MacOs Sonoma',
      'build': `Playwright Command Logs Testing ${new Date().toDateString()}`,
      'name': 'Playwright Test',
      'user': 'vinayk',
      "accessKey": 'ROyYgJWaWuZykSJsLT8U3SrSROp2H1giH83dWbV5Qe7uqHaABO',
      // 'user': 'tarangsta',
      // "accessKey": 'mqh5njpV5FFjnXxf14y6ohCUPio8vnYfn9Wq5d8exqGGmo2VYC',
      // 'user': 'mlqa',
      // 'accessKey': 'Rq0rPTC67zbxxeT1hkEdAkImkXzmtZzBvm2aAb327jUubWRkwP',
      // 'user': 'mlqa', // prod
      // 'accessKey': 'V9U5wN8ao7wTGsY5JPfSvwBh5R7MAknLOZkgVGfNO3J4nNGmvp', // prod
      // 'fixed_ip': "10.242.32.11",
      'network': true,
      // 'fullHAR': true,
      'video': true,
      'console': true,
      'visual': true,
      'headless': false,
      // 'idleTimeout': 900,
      // 'tunnel': true, 
      // 'tunnelName': 'f74a4ede-9a80-447b-9df9-3d4872c1d342', 
      'geoLocation': 'AU',
      // 'geoLocation': 'AU/CN',
      // 'unboundRegion': 'ProductionUS2-PUSE2',
      // 'dedicatedProxy': true,
      // 'smartUIProjectName': `PW SmartUI ${new Date().toDateString()}`,
      // 'smartUIBaseline': false,
      // 'smartUIOptions' : {
      //   'output': {
      //     'largeImageThreshold': 1000,
      //     "errorType": "flat",
      //     "transparency": 0,
      //   }
      // },
      // "ignoreDefaultBrowserArgs": [
      //   "--disable-component-update",
      //   "--disable-popup-blocking"
      // ],
      // 'firefoxUserPrefs': {
      //     'media.eme.enabled': true,
      //     'media.gmp-manager.updateEnabled': true,
      //     'security.fileuri.origin': 4,
      //     'network.proxy.type': 5,
      //     'network.proxy.allow_hijacking_localhost': true,
      //     'security.fileuri.strict_origin_policy': false
      //   },
    }
  }

  const browser = await chromium.connect({
    // wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
    wsEndpoint: `wss://stage-cdp.lambdatestinternal.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  })

  const page = await browser.newPage()
  page.setDefaultTimeout(90000)

  await regularTestVerification(page)
  await generateConsoleLog(page)
  // await page.waitForTimeout(350000)
  // await screenshotTesting(page)
  // await tunnelLocalHostVerification(page)
  await geoLocationVerification(page, 'AU')
  // await geoLocationCityVerification(page, 'AU', 'Canberra')
  // await unBoundPingVerification(page)
  // await dedicatedProxyVerification(page)
  // await verifySSEEvents(page)
  // await verifyWSConnection(page)
  // await ignoreDefaultArgs(page)
  // await smartUITakeScreenshotSingle(page)
  // await smartUITakeScreenshotMultipleWithFullPageOnAndOff(page)
  // await smartUIDOMComparision(page)
  // await multiplePagesAndContexts(browser)
  // await drmVideoVerification(page)
  // await singleLHReportGeneration(page)
  // await multipleLHReportGeneration(page)
  // await openMultipleWebsites(page)
  // await longRunningTest(page)
  // await http2Test(page)

  try {
    await page.evaluate(_ => {},`lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Test Passed' } })}`)
    await teardown(page, browser)
  } catch (e) {
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: e.stack } })}`)
    await teardown(page, browser)
    throw e.stack
  }
})()

async function regularTestVerification(page) {
  await page.goto("https://duckduckgo.com/");
  let element = await page.locator("[name=\"q\"]");
  await element.click();
  await element.type("LambdaTest");
  await element.press("Enter");
  // await page.waitForTimeout(10000)
  const title = await page.title()
  expect(title).toEqual('LambdaTest at DuckDuckGo')
  console.log('Title of DuckDuckGo Search is matched -> ' + title)
  // await page.waitForTimeout(10000)
}

async function generateConsoleLog(page) {
  await page.evaluate(() => {console.log("Testing Console Log")})
}

async function tunnelLocalHostVerification(page) {
  await page.goto('http://localhost:8000/')
  let localPath = await page.locator("//h1[contains(text(),'Directory listing for')]")
  let localPathIsVisible = await localPath.isVisible()
  expect(localPathIsVisible).toBeTruthy()
  console.log('Local Host Loaded')
}

async function geoLocationVerification(page, country) {
  await page.goto('https://ifconfig.io/')
  let countryCode = await page.locator("//div[text()='Country Code']/following-sibling::div")
  let countryCodeTxt = await countryCode.textContent()
  await page.waitForTimeout(10000)
  expect(countryCodeTxt).toEqual(country)
  console.log('GeoLocation Country is matched -> ' + countryCodeTxt)
}

async function geoLocationCityVerification(page, country, city) {
  await page.goto('https://tools.keycdn.com/geo/')
  let countryCode = await page.locator("//*[text()='Country']/following::dd[1]")
  let cityCode = await page.locator("//*[text()='City']/following::dd[1]")

  // await countryCode.scrollIntoViewIfNeeded()
  let countryCodeTxt = (await countryCode.textContent()).toString().split("(")[1].replace(")", "")
  let cityCodeTxt = await cityCode.textContent()
  expect(countryCodeTxt).toEqual(country)
  expect(cityCodeTxt).toEqual(city)
  console.log('GeoLocation Country is matched -> ' + countryCodeTxt)
  console.log('GeoLocation City is matched -> ' + cityCodeTxt)
}

async function unBoundPingVerification(page) {
  let unboundResponse = await page.evaluate((_) => {}, 
        `lambdatest_action: ${JSON.stringify({ action: 'lambda-unbound-ping', arguments: { domain: 'us3.cas.ms.' } })}`)
  expect(unboundResponse).toContain('20.168.249.164')
  console.log('UnBound Response is matched --> ' + unboundResponse)
}

async function unBoundPingVerification(page) {
  let unboundResponse = await page.evaluate((_) => {}, 
        `lambdatest_action: ${JSON.stringify({ action: 'lambda-unbound-ping', arguments: { domain: 'us3.cas.ms.' } })}`)
  expect(unboundResponse).toContain('20.168.249.164')
  console.log('UnBound Response is matched --> ' + unboundResponse)
}

async function dedicatedProxyVerification(page) {
  await page.goto('https://ifconfig.io/')
  await page.waitForLoadState('domcontentloaded');
  let ipAddress = await page.locator("//div[text()='IP Address']/following-sibling::div")
  let ipAddressTxt = await ipAddress.textContent()
  expect(ipAddressTxt === "44.214.175.17" || ipAddressTxt === "23.21.77.227").toBeTruthy();
  console.log('DedicatedProxy IP is matched -> ' + ipAddressTxt)
}

async function verifySSEEvents(page) {
  await page.goto('https://sse-demo.netlify.app/')
  await page.waitForTimeout(20000)
  let sseEventsList = await page.locator("ul li")
  let count = await sseEventsList.count()
  expect(count).toBeGreaterThan(0)

  await page.waitForTimeout(5000)
  sseEventsList = await page.locator("ul li")
  count = await sseEventsList.count()
  expect(count).toBeGreaterThan(5)

  await page.waitForTimeout(5000)
  sseEventsList = await page.locator("ul li")
  count = await sseEventsList.count()
  expect(count).toBeGreaterThan(10)

  console.log('SSE Events are getting published correctly')
}

async function verifyWSConnection(page) {
  // await page.goto('https://socketsbay.com/test-websockets')
  // let wsConnectBtn = await page.locator('#btnConnect')
  // await wsConnectBtn.click()

  // let sendMessageTxt = await page.locator('#txtToSend')
  // let sendMessageBtn = await page.locator('#btnSend')
  // let messagesLog = await page.locator('#log')
  // let messagesLogData = ''
  
  // await sendMessageTxt.type('First Message')
  // await sendMessageBtn.click()
  // messagesLog = await page.locator('#log')
  // messagesLogData = await messagesLog.textContent()
  // console.log('Messages Log Data -> ' + messagesLogData)
  // expect(messagesLogData).toContain('First Message')

  await page.goto('https://www.piesocket.com/websocket-tester')
  let wsConnectBtn = await page.locator("[type='submit']")
  await wsConnectBtn.click()
  await page.waitForTimeout(3000)

  let sendMessageTxt = await page.locator('#email')
  let sendMessageBtn = await page.locator("//*[@type='submit'][1]")
  let messagesLog = await page.locator('#consoleLog')
  let messagesLogData = ''
  
  messagesLog = await page.locator('#consoleLog')
  messagesLogData = await messagesLog.textContent()
  expect(messagesLogData).toContain('Connection Established')
  
  await sendMessageTxt.fill('')
  await sendMessageTxt.type('First Message')
  await sendMessageBtn.click()
  messagesLog = await page.locator('#consoleLog')
  messagesLogData = await messagesLog.textContent()
  console.log('Messages Log Data -> ' + messagesLogData)
  expect(messagesLogData).toContain('First Message')

  await sendMessageTxt.fill('')
  await sendMessageTxt.type('Second Message')
  await sendMessageBtn.click()
  messagesLog = await page.locator('#consoleLog')
  messagesLogData = await messagesLog.textContent()
  console.log('Messages Log Data -> ' + messagesLogData)
  expect(messagesLogData).toContain('Second Message')

  await page.waitForTimeout(3000)

  console.log('Create WS Connection is working fine ')
}

async function ignoreDefaultArgs(page) {
  await page.goto('chrome://version')
  let flags = await page.locator("#command_line")
  let flagsTxt = await flags.textContent()
  expect(flagsTxt).toEqual(expect.not.stringContaining('--disable-component-update'));
  expect(flagsTxt).toEqual(expect.not.stringContaining('--disable-popup-blocking'));
  console.log('Ignore Default Args is working fine -> ' + flagsTxt)
}

async function smartUITakeScreenshotSingle(page) {
  await page.goto('https://www.amazon.com')
  await page.evaluate((_) => {},
      `lambdatest_action: ${JSON.stringify({ action: 'smartui.takeScreenshot', arguments: { fullPage: true, screenshotName: "Testing" }
      })}`)
  console.log('Single Screenshot is captured')
}

async function smartUITakeScreenshotMultipleWithFullPageOnAndOff(page) {
  await page.goto('https://www.amazon.com')
  await page.evaluate((_) => {},
      `lambdatest_action: ${JSON.stringify({ action: 'smartui.takeScreenshot', arguments: { fullPage: false, screenshotName: "AmazonScreenshot" }
      })}`)

  await page.goto('https://www.google.com')
  await page.evaluate((_) => {},
      `lambdatest_action: ${JSON.stringify({ action: 'smartui.takeScreenshot', arguments: { fullPage: true, screenshotName: "GoogleScreenshot" }
      })}`)

  await page.goto('https://www.youtube.com')
  await page.evaluate((_) => {},
      `lambdatest_action: ${JSON.stringify({ action: 'smartui.takeScreenshot', arguments: { fullPage: false, screenshotName: "YoutubeScreenshot" }
      })}`)
  console.log('Multiple Screenshots are captured')
}

async function smartUIDOMComparision(page) {
  await page.goto('https://ipinfo.io/')
  await page.evaluate((_) => { }, `lambdatest_action: ${JSON.stringify({
    // action: 'smartui.takeScreenshot', arguments: { fullPage: true, screenshotName: 'webpage', ignoreDOM: { cssSelector: ["#__next > div > header > nav > a > img","#__next > div > header > nav"] } }
    // action: 'smartui.takeScreenshot', arguments: { fullPage: true, screenshotName: 'webpage', ignoreXPath: ['//*[@id="api-requests"]/span'] }
    action: 'smartui.takeScreenshot', arguments: { fullPage: true, screenshotName: 'webpage', ignoreXPath : ['//*[@id="api-requests"]/span'] }
})}`);
  console.log('DOM Comparision Screenshot is captured')
}

async function singleLHReportGeneration(page) {
  await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'lighthouseReport', arguments: { url: 'https://www.bing.com' }})}`)
}

async function multipleLHReportGeneration(page) {
  // await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'lighthouseReport', arguments: { url: 'https://www.bing.com' }})}`)
  await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'lighthouseReport', arguments: { url: 'https://www.google.com' }})}`)
  await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'lighthouseReport', arguments: { url: 'https://www.youtube.com' }})}`)
  await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'lighthouseReport', arguments: { url: 'https://bikeshed.com/' }})}`)
}

async function multiplePagesAndContexts(browser) {
  let page1, page2, page3, page4
  try {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();

    page1 = await context1.newPage()
    page1.setDefaultTimeout(90000);
    await page1.goto('https://ifconfig.io/')
    await page1.goto('https://www.amazon.com')

    page2 = await context1.newPage()
    page2.setDefaultTimeout(90000);
    await page2.goto('https://ifconfig.io/')
    await page2.goto('https://www.youtube.com')

    page3 = await context2.newPage()
    page3.setDefaultTimeout(90000);
    await page3.goto('https://ifconfig.io/')
    await page3.goto('https://www.google.com')

    page4 = await context2.newPage()
    page4.setDefaultTimeout(90000);
    await page4.goto('https://ifconfig.io/')
    await page4.goto('https://www.bing.com')
  } catch (e) {
    console.log('Error -> ' + e)
    await page1.close()
    await page2.close()
    await page3.close()
    await page4.close()
  }
  
}

async function openMultipleWebsites(page) {
  try {
    await page.goto('https://ipinfo.io/')
    await page.waitForTimeout(3000)
    await page.goto('https://www.youtube.com/')
    await page.waitForTimeout(3000)
    await page.goto('https://www.amazon.com/')
    await page.waitForTimeout(3000)
    await page.goto('https://www.walmart.com/')
    await page.waitForTimeout(3000)
  } catch (e) {
  }
}

async function longRunningTest(page) {
  console.log('Long Running Test is started')
  for(let i = 0; i < 20; i++){
    try {
      await regularTestVerification(page)
      await generateConsoleLog(page)
      await geoLocationVerification(page, 'AU')
      await openMultipleWebsites(page)
    } catch (e) {
    }
  }
  console.log('Long Running Test is stopped')
}

async function screenshotTesting(page) {
  console.log('Screenshot Testing is started')
  // exec("screencapture -c ~/Downloads/Testing.jpg", (error, stdout, stderr) => {
  //   if (error) {
  //       console.log(`error: ${error.message}`);
  //       return;
  //   }
  //   if (stderr) {
  //       console.log(`stderr: ${stderr}`);
  //       return;
  //   }
  //   console.log(`stdout: ${stdout}`);
  // });
  // await page.waitForTimeout(3000)
  // await page.goto('https://www.imagetotext.info/')
  // let uploadSection = await page.locator("[class='upload-section']")
  // await uploadSection.hover()
  // await page.keyboard.press('Meta+Shift+3');
  // await page.waitForTimeout(10000)
}

async function http2Test(page){
  console.log('Customer Test Started')
  await page.goto('https://qa1userportalst.z6.web.core.windows.net/login')
  await page.waitForTimeout(2000)
  let email = await page.locator("[name='email']")
  await email.type('andrew.kourilenko@netafim.com')
  let password = await page.locator("[name='password']")
  await password.type('Aa123456')
  let login = await page.locator("[type='submit']")
  await login.click()
  await page.waitForTimeout(5000)
}

async function teardown(page, browser) {
  await page.close();
  await browser.close();
}
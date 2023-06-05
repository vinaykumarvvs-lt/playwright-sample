const { chromium } = require('playwright')
const { expect } = require('@playwright/test');

(async () => {
  const capabilities = {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'MacOS Mojave',
      // 'platform': 'MacOS Big sur',
      'build': 'Playwright SmartUI Build',
      'name': 'Playwright SmartUI Test',
      'user': 'vinayk',
      'accessKey': 'qlOzFB4gLxYrtUjpporoCBwPLNneBWj2F4BKVXLwL04RdeI1Cj',
      // 'user': 'mlqa',
      // 'accessKey': 'V9U5wN8ao7wTGsY5JPfSvwBh5R7MAknLOZkgVGfNO3J4nNGmvp',
      'network': true,
      'video': true,
      'console': true
      // 'visual': true
      // 'fixed_ip': '10.243.32.213'
      // 'smartUIProjectName': 'TestingSmartUI' //Add the required Smart UI Project name
    }
  }

  const browser = await chromium.connect({
    // wsEndpoint: `wss://cdp-hub-envrn-dev.lambdatestinternal.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
    // wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
    wsEndpoint: `wss://stage-cdp.lambdatestinternal.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  })

  const page = await browser.newPage()
  // const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

  try {
    for(i = 0; i < 2; i++){
      await page.goto('https://www.bing.com')
      await page.waitForTimeout(2000)
      // Add the following command in order to take screenshot in SmartUI
      const screenshotName = "Screenshot" + i
      await page.evaluate((_) => {},
        `lambdatest_action: ${JSON.stringify({ action: 'smartui.takeScreenshot', arguments: { fullPage: true, screenshotName: screenshotName }
        })}`) // Add a relevant screenshot name here
  
      const element = await page.$('[aria-label="Enter your search term"]')
      await element.click()
      await element.type('LambdaTest')
      await element.press('Enter')
      const title = await page.title()
      expect(title).toEqual('LambdaTest - Search')
      // Mark the test as completed or failed
      await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Title matched' } })}`)
    }
  } catch {
      await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'Title not matched' } })}`)
  }
  

  // await page.goto('https://www.bing.com')

  // // Add the following command in order to take screenshot in SmartUI
  // await page.evaluate((_) => {},
  //   `lambdatest_action: ${JSON.stringify({ action: 'smartui.takeScreenshot', arguments: { fullPage: true, screenshotName: '<Your Screenshot Name>' }
  //   })}`) // Add a relevant screenshot name here

  // const element = await page.$('[aria-label="Enter your search term"]')
  // await element.click()
  // await element.type('LambdaTest')
  // await element.press('Enter')
  // const title = await page.title()

  // try {
  //   expect(title).toEqual('LambdaTest - Search')
  //   // Mark the test as completed or failed
  //   await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Title matched' } })}`)
  // } catch {
  //   await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'Title not matched' } })}`)
  // }
  await page.close()
  await browser.close()
})()

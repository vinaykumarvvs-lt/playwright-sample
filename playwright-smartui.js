const { formatterHelpers } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
// import { chromium } from 'playwright'
// const { expect } = require('@playwright/test');

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

(async () => {

  const capabilities = {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      // 'platform': 'Windows 10',
      'platform': 'MacOs Ventura',
      'build': 'Playwright Build Share',
      'name': 'Playwright Test',
      'user': '26_dec_gdprltqa',
      // 'accessKey': 'qlOzFB4gLxYrtUjpporoCBwPLNneBWj2F4BKVXLwL04RdeI1Cj',
      'accessKey': 'CLDPAiJbkzAvBweW5qSBU1QCVKp7wj7RhHhIJrsXcWbhzQTOTe',
      'network': true,
      'video': true,
      'console': true,
      'visual': true,
      // 'fixed_ip':'10.81.8.40',
      'headless':false,
      // 'tunnel':true,
      // 'tunnelName':'1a1a823f-a852-4ff8-8545-0bdbb80ddd07',
      'geoLocation':'CH',
      // 'dedicatedProxy': true,
      // 'unboundRegion': 'ProductionUS2-PUSE2',
      // 'smartUIProjectName': 'TestingSmartUINewToday', //Add the required Smart UI Project name
      "projectName": "Project Name",
      "tags": [
        "tag1",
        "tag2",
      ],
      "buildTags": [
        "BuildTag",
      ]
    }
  }

  // const capabilities = {
  //   'browserName': 'pw-firefox', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
  //   'browserVersion': 'latest',
  //   'LT:Options': {
  //     'platform': 'MacOs Monterey',
  //     'build': 'Playwright SmartUI Build',
  //     'name': 'Playwright SmartUI Test',
  //     'user': 'mlqa',
  //     'accessKey': 'V9U5wN8ao7wTGsY5JPfSvwBh5R7MAknLOZkgVGfNO3J4nNGmvp',
  //     'network': true,
  //     'video': true,
  //     'console': true,
  //     'visual': true,
  //     'fixed_ip': '',
  //     // 'geoLocation':'BR'
  //     'tunnel':true,
  //     'tunnelName':'59cc60c8-3ea3-41ef-9c86-fe139b9c09b8'
  //   }
  // } 

  // const capabilities = {
  //   'browserName': 'pw-webkit', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
  //   'browserVersion': 'latest',
  //   'LT:Options': {
  //     'platform': 'MacOs Ventura',
  //     'build': 'Playwright SmartUI Build',
  //     'name': 'Playwright SmartUI Test',
  //     'user': 'mlqa',
  //     'accessKey': 'V9U5wN8ao7wTGsY5JPfSvwBh5R7MAknLOZkgVGfNO3J4nNGmvp',
  //     'network': false,
  //     'video': true,
  //     'console': true,
  //     'visual': true,
  //     'fixed_ip': '',
  //     // 'geoLocation':'AU'
  //     'tunnel':true,
  //     'tunnelName':'59cc60c8-3ea3-41ef-9c86-fe139b9c09b8'
  //   }
  // }

  // const capabilities = {
  //   'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
  //   'browserVersion': 'latest',
  //   'LT:Options': {
  //     'platform': 'MacOs Big sur',
  //     'build': 'Playwright SmartUI Build',
  //     'name': 'Playwright SmartUI Test',
  //     'user': 'mlqa',
  //     'accessKey': 'V9U5wN8ao7wTGsY5JPfSvwBh5R7MAknLOZkgVGfNO3J4nNGmvp',
  //     'network': true,
  //     'video': true,
  //     'console': true,
  //     'visual': true,
  //     'fixed_ip': '',
  //     // 'geoLocation':'BR'
  //     'tunnel':true,
  //     'tunnelName':'59cc60c8-3ea3-41ef-9c86-fe139b9c09b8'
  //   }
  // } 

  // const capabilities = {
  //   'browserName': 'MicrosoftEdge', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
  //   'browserVersion': 'latest',
  //   'LT:Options': {
  //     'platform': 'MacOs Catalina',
  //     'build': 'Playwright SmartUI Build',
  //     'name': 'Playwright SmartUI Test',
  //     'user': 'mlqa',
  //     'accessKey': 'V9U5wN8ao7wTGsY5JPfSvwBh5R7MAknLOZkgVGfNO3J4nNGmvp',
  //     'network': false,
  //     'video': true,
  //     'console': true,
  //     'visual': true,
  //     'fixed_ip': '',
  //     // 'geoLocation':'AU'
  //     'tunnel':true,
  //     'tunnelName':'59cc60c8-3ea3-41ef-9c86-fe139b9c09b8'
  //   }
  // }

  let d1 = new Date();   

  const browser = await chromium.connect({
    // wsEndpoint: `wss://cdp-hub-envrn-dev.lambdatestinternal.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
    // wsEndpoint: `wss://stage-cdp.lambdatestinternal.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  })

  let d2 = new Date();   

  let dif = Math.abs(d1 - d2) / 1000;

  console.log("Diff Time " + dif)

  console.log("Test Created")

  const page = await browser.newPage()
  page.setDefaultTimeout(90000);

  try {
    for(i = 0; i < 1; i++){
      // await page.waitForTimeout(2000)
      await page.goto('https://ifconfig.io/')
      await page.goto('https://www.bing.com')
      await page.goto('https://ipinfo.io/')
      // await page.goto('https://nordvpn.com/what-is-my-ip/')
      await delay(5000)
      // await page.goto('https://ifconfig.io/')
      // await delay(5000)
      // await page.goto('http://localhost:8000/')
      // await page.goto('https://the-internet.herokuapp.com');
      // await page.evaluate((_) => {},
      // `lambdatest_action: ${JSON.stringify({ action: 'smartui.takeScreenshot', arguments: { fullPage: true, screenshotName: "One"+i }
      // })}`)
      await page.goto('https://www.google.com')
      await page.goto('https://www.amazon.com')
      // await page.evaluate((_) => {},
      // `lambdatest_action: ${JSON.stringify({ action: 'smartui.takeScreenshot', arguments: { fullPage: true, screenshotName: "Two"+i }
      // })}`)
      // await page.goto('https://www.microsoft.com')
      // const element = await page.$('[aria-label="Enter your search term"]')
      // await element.click()
      // await page.evaluate((_) => {},
      // `lambdatest_action: ${JSON.stringify({ action: 'smartui.takeScreenshot', arguments: { fullPage: true, screenshotName: "Three"+i }
      // })}`)
      // await page.goto('https://ifconfig.io/')
      // await page.goto(' http://localhost:8000/')
      // await page.goto('https://www.google.com')

      // await page.waitForTimeout(10000)
      // let response1 = await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'lambda-unbound-ping', arguments: { domain: 'us3.cas.ms.' } })}`)
      // console.log("lambda-unbound-ping=====>", response1);
      
      // await page.evaluate((_) => {},
      // `lambdatest_action: ${JSON.stringify({ action: 'smartui.takeScreenshot', arguments: { fullPage: true, screenshotName: "Two" }
      // })}`)
        
      // expect('Testing').toEqual('LambdaTest - Search')
      // Add the following command in order to take screenshot in SmartUI
      // const screenshotName = "Screenshot" + i
       // Add a relevant screenshot name here
  
      // const element = await page.$('[aria-label="Enter your search term"]')
      // await element.click()
      // await element.type('LambdaTest')
      // await element.press('Enter')
      // const title = await page.title()
      // expect(title).toEqual('LambdaTest - Search')
      // Mark the test as completed or failed
      // let response1 = await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'lambda-unbound-ping', arguments: { domain: 'us3.cas.ms.' } })}`)
      // console.log("lambda-unbound-ping=====>", response1);
      // const remark = "lambdatest_action: { \"action\": \"setTestStatus\", \"arguments\": { \"status\": \"FAILED\", \"remark\": \"Error {\n  message='Timeout 30000ms exceeded.\n=========================== logs ===========================\nwaiting for locator('[name=\"qq\"]')\n============================================================\n  name='TimeoutError\n  stack='TimeoutError: Timeout 30000ms exceeded.\n=========================== logs ===========================\nwaiting for locator('[name=\"qq\"]')\n============================================================\n    at ProgressController.run (E:\\lambda-node-remote-client\\playwright_utils\\node_modules\\playwright-core\\lib\\server\\progress.js:88:26)\n    at Frame.click (E:\\lambda-node-remote-client\\playwright_utils\\node_modules\\playwright-core\\lib\\server\\frames.js:999:23)\n    at FrameDispatcher.click (E:\\lambda-node-remote-client\\playwright_utils\\node_modules\\playwright-core\\lib\\server\\dispatchers\\frameDispatcher.js:149:30)\n    at DispatcherConnection.dispatch (E:\\lambda-node-remote-client\\playwright_utils\\node_modules\\playwright-core\\lib\\server\\dispatchers\\dispatcher.js:312:46)\n    at processTicksAndRejections (node:internal/process/task_queues:96:5)\n}\"}}"
      // const remark = "lambdatest_action: { \"action\": \"setTestStatus\", \"arguments\": { \"status\": \"FAILED\", \"remark\": \"Error {\n  message='Timeout 30000ms exceeded.\n=========================== logs ===========================\nwaiting for locator('[name=\"qq\"]')\n============================================================\n  name='TimeoutError\n  stack='TimeoutError: Timeout 30000ms exceeded.\n=========================== logs ===========================\nwaiting for locator('[name=\"qq\"]')\n============================================================\n    at ProgressController.run (E:\\lambda-node-remote-client\\playwright_utils\\node_modules\\playwright-core\\lib\\server\\progress.js:88:26)\n    at Frame.click (E:\\lambda-node-remote-client\\playwright_utils\\node_modules\\playwright-core\\lib\\server\\frames.js:999:23)\n    at FrameDispatcher.click (E:\\lambda-node-remote-client\\playwright_utils\\node_modules\\playwright-core\\lib\\server\\dispatchers\\frameDispatcher.js:149:30)\n    at DispatcherConnection.dispatch (E:\\lambda-node-remote-client\\playwright_utils\\node_modules\\playwright-core\\lib\\server\\dispatchers\\dispatcher.js:312:46)\n    at processTicksAndRejections (node:internal/process/task_queues:96:5)\n}\"}}"
      // await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: remark + remark } })}`)    

      await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Test Passed' } })}`)
      // await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Title matched' } })}`)
    }
  } catch (e){
      console.log("-----------" + e)
      await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'Test Failed' } })}`)
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
  // await page.evaluate((_) => {},
  //       `lambdatest_action: ${JSON.stringify({ action: 'smartui.takeScreenshot', arguments: { fullPage: true, screenshotName: Date.now().toString() }
  //       })}`)
  await page.close()
  await browser.close()
})()

const { chromium } = require('playwright')
const { expect } = require('@playwright/test');
const cp = require('child_process');
const playwrightClientVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];

(async () => {
  const capabilities = {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Playwright Sample Build',
      'name': 'Playwright Sample Test',
      'user': 'pw_cdplambdatest',
      'accessKey': 'KHC2LW9l93iY4gec970QC4ycAo22NxLPwTU0hWpCqxfjJ5rjDq',
      'network': true,
      'video': true,
      'console': true,
      'tunnel': true, // Add tunnel configuration if testing locally hosted webpage
      'tunnelName': '', // Optional
      'geoLocation': '', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
      'playwrightClientVersion': playwrightClientVersion
    }
  }

  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  })

  const page = await browser.newPage()

  await page.goto('http://localhost:8000/')

<<<<<<< Updated upstream
  const element = await page.$('[id="sb_form_q"]')
  await element.click()
  await element.type('LambdaTest')
  await page.waitForTimeout(1000)
  await page.keyboard.press('Enter')
  await page.waitForSelector('[class=" b_active"]')
=======
  // const element = await page.$('[aria-label="Enter your search term"]')
  // await element.click()
  // await element.type('LambdaTest')
  // await element.press('Enter')
>>>>>>> Stashed changes
  const title = await page.title()

  try {
    expect(title).toEqual('Directory listing for /')
    // Mark the test as completed or failed
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Title matched' } })}`)
  } catch {
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'Title not matched' } })}`)
  }

  await browser.close()
})()

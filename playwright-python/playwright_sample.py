import json
import os
import urllib
import subprocess

from playwright.sync_api import sync_playwright

capabilities = {
    'browserName': 'Chrome',  # Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
        'platform': 'Windows 10',
        'build': 'Playwright Build',
        'name': 'Playwright Test',
        'user': 'vinayk',
        'accessKey': 'ROyYgJWaWuZykSJsLT8U3SrSROp2H1giH83dWbV5Qe7uqHaABO',
        'network': True,
        'video': True,
        'console': True,
        'tunnel': False,  # Add tunnel configuration if testing locally hosted webpage
        'tunnelName': '',  # Optional
        'geoLocation': '', # country code can be fetched from https://www.lambdatest.com/capabilities-generator/
    }
}


def run(playwright):
    playwrightVersion = str(subprocess.getoutput('playwright --version')).strip().split(" ")[1]
    capabilities['LT:Options']['playwrightClientVersion'] = playwrightVersion

    lt_cdp_url = 'wss://stage-cdp.lambdatestinternal.com/playwright?capabilities=' + urllib.parse.quote(
        json.dumps(capabilities))
    browser = playwright.chromium.connect(lt_cdp_url)
    page = browser.new_page()
    try:
        page.goto("https://www.bing.com/")
        page.fill('[id="sb_form_q"]', 'LambdaTest')
        page.wait_for_timeout(1000)
        page.keyboard.press("Enter")
        page.wait_for_selector('[class=" b_active"]')
        page.wait_for_timeout(1000)

        title = page.title()

        print("Title:: ", title)

        remarkMsg = "lambdatest_action: { \"action\": \"setTestStatus\", \"arguments\": { \"status\": \"FAILED\", \"remark\": \"Error {\n  message='Timeout 30000ms exceeded.\n=========================== logs ===========================\nwaiting for locator('[name=\"qq\"]')\n============================================================\n  name='TimeoutError\n  stack='TimeoutError: Timeout 30000ms exceeded.\n=========================== logs ===========================\nwaiting for locator('[name=\"qq\"]')\n============================================================\n    at ProgressController.run (E:\\lambda-node-remote-client\\playwright_utils\\node_modules\\playwright-core\\lib\\server\\progress.js:88:26)\n    at Frame.click (E:\\lambda-node-remote-client\\playwright_utils\\node_modules\\playwright-core\\lib\\server\\frames.js:999:23)\n    at FrameDispatcher.click (E:\\lambda-node-remote-client\\playwright_utils\\node_modules\\playwright-core\\lib\\server\\dispatchers\\frameDispatcher.js:149:30)\n    at DispatcherConnection.dispatch (E:\\lambda-node-remote-client\\playwright_utils\\node_modules\\playwright-core\\lib\\server\\dispatchers\\dispatcher.js:312:46)\n    at processTicksAndRejections (node:internal/process/task_queues:96:5)\n}\"}}"

        if "LambdaTest" in title:
            set_test_status(page, "passed", remarkMsg)
        else:
            set_test_status(page, "failed", remarkMsg)
    except Exception as err:
        print("Error:: ", err)
        set_test_status(page, "failed", str(err + err + err + err))

    browser.close()


def set_test_status(page, status, remark):
    page.evaluate("_ => {}",
                  "lambdatest_action: {\"action\": \"setTestStatus\", \"arguments\": {\"status\":\"" + status + "\", \"remark\": \"" + remark + "\"}}");


with sync_playwright() as playwright:
    run(playwright)

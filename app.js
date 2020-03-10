const {Builder, By, Key, until, Capabilities} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

class TT {
    static async login() {
        const chromeOptions = new chrome.Options();
        chromeOptions.addArguments('--window-size=414,900')
        chromeOptions.setMobileEmulation({
            deviceName: 'iPhone 8 Plus',
        })
        let driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(
                chromeOptions
            )
            .build();
        try {
            // Navigate to Url
            let mobile= '18217519889'
            await driver.get('http://api2.zpton.com/Wx/login.html');
            // Enter text "cheese" and perform keyboard action "Enter"
            // await driver.findElement(By.name('q')).sendKeys('cheese', Key.ENTER);
            await driver.findElement(By.className('mobile')).sendKeys('18217519889');
            await driver.findElement(By.className('verify')).sendKeys('123456')
            // let x =
            driver.executeScript(`
               localStorage.setItem('verify', '123456');
            `)
            await driver.findElement(By.className('login')).click()
            // await driver.findElement(By.className('_alert_1')).click()
            await driver.wait(until.elementLocated(By.className('_alert_1')));

            await driver.findElement(By.className('_alert_1')).click()
            // console.log(await driver.getCurrentUrl())
            await sleep(1000)
            await driver.wait(until.elementsLocated((By.className('tui_list'))));
            await sleep(1000)
            console.log(1);
            // await driver.findElement(By.className('index_user_left')).click()
            await driver.get('http://api2.zpton.com/Wx/list.html')
            console.log(2);
            await sleep(1000)
            await driver.wait(until.elementTextMatches((await driver.findElements(By.className('kc_r1')))[0],/^\s*/g));

            await driver.navigate().refresh()
            await driver.wait(until.elementsLocated((By.className('kc_r2'))))
            await sleep(5000)
            let cc = await driver.findElements(By.className('kc_list'))
            let token = await driver.executeScript(`
                  return localStorage.getItem('token');
                `)
            let mainWin = (await driver.getWindowHandle())
            for(let ccitem of cc){
                let ccid = await ccitem.getAttribute('data-id')
                console.log(ccid)
                let ccurl = `http://api2.zpton.com/Wx/main.html?id=${ccid}&token=${token}`;
                await driver.executeScript(`
                   window.open("${ccurl}")
                `)
                await sleep(2000)
                console.log(await driver.getWindowHandle())
                await driver.wait(until.elementsLocated((By.className('kssk'))))
                await sleep(1000)
                await driver.findElement(By.className('kssk')).click()
                console.log(123123)
                await sleep(1000)
                await driver.wait(until.elementsLocated((By.className('directory_am'))))
                await sleep(1000)
                await driver.findElement(By.className('head_left')).click()
                // let lesson = `http://api2.zpton.com/Wx/class_menu.html?lesson=${ccid}&username=${mobile}&token=${token}`
                // await driver.executeScript(`
                //    window.open("${lesson}")
                // `)
                // await driver.switchTo().newWindow(lesson)
                // await ccitem.findElement(By.className('kc_left')).click()
                // await sleep(2000)
                // await driver.wait(until.elementsLocated((By.className('kssk'))))
                // await sleep(1000)
                // await driver.findElement(By.className('kssk')).click()
                // await driver.wait(until.elementsLocated((By.className('directory_am'))))
                // await sleep(1000)
                // await driver.findElement(By.className('head_left')).click()
                // await sleep(1000)
                // await driver.wait(until.elementsLocated((By.className('cmli'))))
                // let xuexi =  await driver.findElements(By.className('cmli'))
                // let menu = await driver.getCurrentUrl();
                //
                // for(let item of xuexi)
                // {
                //     console.log(await driver.getCurrentUrl())
                //     let id=(await item.findElement(By.className('cmlileft')).getAttribute('data_id'))
                //     let url = menu+"&ksid="+''+id
                //     await driver.get(url)
                //     await sleep(2000)
                // }
            }
            await driver.switchTo().window(mainWin)
            // let firstResult = await driver.wait(
            //     until.elementIsVisible(driver.findElement(By.className('tui_list')))
            // )
            // console.log(await firstResult.getText());
        } finally {
            // await driver.quit();
        }
    }
}

(async ()=>{

        try{
            await TT.login()
            status = false
        }catch (e) {
            console.log(e)
        }


})()


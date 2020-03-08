const Nightmare  = require('nightmare');
const cheerio = require('cheerio')
require('nightmare-real-mouse')(Nightmare);

const cfg = {
    openDevTools: {
        mode: 'bottom'      // 开发者工具位置：right, bottom, undocked, detach
    },
    height: 1000,
    width:500,
    show: true,                 // 要不要显示浏览器
    dock: true,                 // 要不要在Dock上显示图标
    waitTimeout: 999999999,         // .wait() 方法超时时长，单位:ms
    executionTimeout: 86400000, // .evaluate() 方法超时时长，单位:ms
}

const nightmare = Nightmare(cfg)
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const headers = {
    "Upgrade-Insecure-Requests":1,
    "Referer":"http://api2.zpton.com/Wx/index_no.html?isid=270",
    "User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
}
const url = {
    login:'http://api2.zpton.com/Wx/login.html',
    myList:'http://api2.zpton.com/Wx/index1.html'
}

class TT {
    static async loginPage(){

        await nightmare.useragent('Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1')

        await nightmare.goto(url.login).wait('.login')
        let content = await nightmare.evaluate(()=>  document.querySelector('body').innerHTML)
        let $ = cheerio.load(content);
        // console.log($('.login_div').html())
        // let x= await nightmare.exists('.login')
        await nightmare.type('.mobile','18217519889')
        await nightmare.type('.verify','123456')
        await nightmare.evaluate(() => {
                window.localStorage.setItem('verify', '123456');
            })
        // await nightmare.wait(1000)
        await nightmare.realClick('.login')
        await nightmare.wait('._alert_1')
        await nightmare.evaluate(() => {
            $('._alert_1').trigger('click');
        })
        await nightmare.realClick('._alert_1')
        // await nightmare.wait(5000)
        // await sleep(3000)
        // await nightmare.wait('._alert_1')
        // await nightmare.realClick('._alert_1')
        // await sleep(2000)
        await nightmare.wait('.index_user_left')
        await nightmare.evaluate(() => {
            return new Promise( (resolve, reject) =>{
                let x = setInterval( () =>{
                    if( $('.tui_list').first().find('img').length>0){
                        resolve();
                    }
                    clearInterval(x)
                }, 1000);
            });
        })
        await nightmare.realClick('.index_user_left')
        // await sleep(2000)
        // await nightmare.wait('.kc_r1')
        // await nightmare.realClick('.kc_r1')
        // await sleep(2000)
        // await nightmare.wait('.mmtcdl5')
        // await nightmare.realClick('.mmtcdl5')
        // await nightmare.wait('.moni_sub')
        // await nightmare.evaluate(() => {
        //     console.log($('.moni_sub').html())
        // })
        // await nightmare.realClick('.moni_sub')
        // await nightmare.evaluate(()=>  {
        //     document.querySelector('._alert_1').click()
        // })
        // $ = cheerio.load(content);
        // console.log($('.tan_queren').html())
        //await sleep(8000)
        // await nightmare.wait('.index_user_left')

        // await nightmare.goto(url.myList)
        // await nightmare.end()
        // await nightmare.on('did-get-response-details',function (event, socketStatus, url, originalUrl, code, method, referrer, headers, type) {
        //     console.log({url:url, type:type,e:headers})
        // })
        // await nightmare.realClick('.yzm')
        // await nightmare.wait('.kc_list')
        // console.log($('.kc_r1').html())

    }
}

TT.loginPage()

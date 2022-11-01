
const report=require("../tools/report")
const chromeLauncher = require('chrome-launcher');   //chrome-launcher 用于调起浏览器

/*命令行方式 
lighthouse https://hotel.guestin.cn/#/home --locale=zh-CN --port=58840 --preset=desktop --disable-network-throttling=true --disable-storage-reset=true --output html --output-path ./report.html
*/
const DefaultPort = 32000
const startUrl = "about:blank"
const testWebs = [
    {
        title: '百度-首页',
        url: 'https://www.baidu.com'
    }
];

(async () => {
    const chrome = await chromeLauncher.launch({ startingUrl: startUrl, port: DefaultPort });
    const askRes1 = await report.askQquestion("需要登录吗?(Y:需要登录;N:不需要登录;)")
    if (askRes1 == "Y") {
        await report.askQquestion("登录成功,已准备好,按任意键继续...")
    }
    await report.runCreateReports(testWebs,DefaultPort)
    await chrome.kill();//运行完毕，自动关闭浏览器
})();

const report=require("../tools/report")
const chromeLauncher = require('chrome-launcher');   //chrome-launcher 用于调起浏览器

/*命令行方式 
lighthouse https://hotel.guestin.cn/#/home --locale=zh-CN --port=58840 --preset=desktop --disable-network-throttling=true --disable-storage-reset=true --output html --output-path ./report.html
*/
const DefaultPort = 32000
const startUrl = "https://hotel.guestin.cn"
const testWebs = [
    {
        title: '客町未来酒店-主页',
        url: 'https://hotel.guestin.cn/#/home'
    },
    {
        title: '客町未来酒店-实时识别',
        url: 'https://hotel.guestin.cn/#/events/realtime/eventsRealtime'
    },
];

(async () => {
    //打开谷歌浏览器
    const chrome = await chromeLauncher.launch({ startingUrl: startUrl, port: DefaultPort });
    const askRes1 = await report.showQuestion("需要登录吗?(Y:需要登录;N:不需要登录;):")
    if (askRes1 == "Y") {
        await report.showQuestion("若登录成功,确认已准备好,请按任意键继续...")
    }
    await report.runCreateReports(testWebs,DefaultPort)
    await chrome.kill();//运行完毕，自动关闭浏览器
})();


const lighthouse = require('lighthouse');
const config = require('../report-config');
const fs = require('fs');
const readLine = require('readline')
const timeUtils = require('./time');
module.exports = {
    runCreateReports(testWebs,port) {
        return new Promise(async (resolve, __) => {
            const options = {
                chromeIgnoreDefaultFlags: true,
                logLevel: 'info',
                output: 'html',
                port: port,
                preset: 'desktop',
            };
            for (let i = 0; i < testWebs.length; i++) {
                const webItem = testWebs[i]
                //执行lighthouse得到执行结果，执行结果是一个JS对象
                const runnerResult = await lighthouse(webItem.url, options, config);
                //通过lighthouse的运行结果的report属性值拿到运行报告，运行报告是用于 HTML/JSON/CSV 输出结果的一个字符串
                const reportHtml = runnerResult.report;
                //生成结果文件
                const tFormat = timeUtils.timestamp2Str(new Date().getTime(), "yyyy-MM-dd hhmmss")
                const reportPath = `./reports/${webItem.title}_${tFormat}.html`
                fs.writeFileSync(reportPath, reportHtml);
            }
            resolve()
        })
    },
    showQuestion(askContent) {
        return new Promise((resolve, __) => {
            let rlAsk = readLine.createInterface({
                input: process.stdin,
                output: process.stdout
            })
            rlAsk.question(askContent, (line) => {
                rlAsk.close();
                resolve(line.toUpperCase())
            });
        })
    }
}
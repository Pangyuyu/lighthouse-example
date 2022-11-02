const lighthouse = require('lighthouse');
const config = require('../report-config');
const fs = require('fs');
const readLine = require('readline')
const timeUtils = require('./time');
module.exports = {
    runCreateReports(testWebs, port) {
        return new Promise(async (resolve, __) => {
            const options = {
                chromeIgnoreDefaultFlags: true,
                logLevel: 'info',
                output: "html",
                port: port,
                preset: 'desktop',
            };
            const reportTime = timeUtils.timestamp2Str(new Date().getTime(), "yyyyMMddhhmmss")
            const reportDir = `./reports/${reportTime}`
            const mkRes = this.createDir(reportDir)
            if (mkRes == 0) {
                console.error(`创建目录${reportDir}失败!`)
                resolve()
                return
            }
            for (let i = 0; i < testWebs.length; i++) {
                const webItem = testWebs[i]
                let loadCount = 1
                if (webItem.loadCount) {
                    loadCount = webItem.loadCount
                }
                for (let j = 0; j < loadCount; j++) {
                    //执行lighthouse得到执行结果，执行结果是一个JS对象
                    const runnerResult = await lighthouse(webItem.url, options, config);
                    //通过lighthouse的运行结果的report属性值拿到运行报告，运行报告是用于 HTML/JSON/CSV 输出结果的一个字符串
                    const reportValue = runnerResult.report;
                    const reportValueTrans=reportValue.replaceAll("First Contentful Paint", "首次内容渲染时间(FCP)")
                        .replaceAll("Time to Interactive", "可交互时间")
                        .replaceAll("Speed Index", "速度指数")
                        .replaceAll("Total Blocking Time", "首次内容渲染和可交互时间之间时间段总和(TBT)")
                        .replaceAll("Largest Contentful Paint","最大元素渲染时间(LCP)")
                        .replaceAll("Cumulative Layout Shift", "累积布局偏移(CLS)")
                    //生成结果文件
                    const reportPath = `${reportDir}/${webItem.title}_${j + 1}.html`
                    fs.writeFileSync(reportPath, reportValueTrans);
                }
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
    },
    createDir(dirName) {
        return new Promise((resolve, __) => {
            fs.mkdir(dirName, (err) => {
                if (err) {
                    resolve(0)
                    return
                }
                resolve()
            })
        })
    }
}
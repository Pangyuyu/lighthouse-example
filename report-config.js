module.exports = {
    extends: 'lighthouse:default',
    settings: {        
        locale: "zh",
        formFactor: 'desktop',
        // 模拟器，此处是需要禁用，因为是测试PC网站
        screenEmulation: {
            disabled: true,
            mobile: false,
        },
        onlyCategories: ['performance'],
        disableStorageReset: true,//禁用缓存重置
    },
}
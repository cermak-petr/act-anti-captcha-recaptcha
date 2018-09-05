const Apify = require('apify');
const Promise = require('bluebird');
const i2b = require('node-base64-image');
const request = require('request-promise');
Apify.setPromisesDependency(Promise);

const i2bp = Promise.promisify(i2b.encode);

class Anticaptcha {
    
    constructor(clientKey) {
        this.clientKey = clientKey;
    }
    
    async createTask(task) {
        let opt = {
            method: 'POST',
            uri: 'http://api.anti-captcha.com/createTask',
            body: {
                task,
                clientKey: this.clientKey,
            },
            json: true
        };
        const response = await request(opt);
        if(response.errorId > 0) throw response.errorDescription;
        return response.taskId;
    }
    
    async getTaskResult(taskId) {
        const opt = {
            method: 'POST',
            uri: 'http://api.anti-captcha.com/getTaskResult',
            body: {
                taskId,
                clientKey: this.clientKey,
            },
            json: true
        };
        const response = await request(opt);
        if(response.errorId > 0) throw response.errorDescription;
        return response;
    }

    async waitForTaskResult(taskId, timeout) {
        return new Promise((resolve, reject) => {
            const startedAt = new Date();
            const waitLoop = () => {
                if ((new Date() - startedAt) > timeout) {
                    reject(new Error("Timeout before condition pass"));
                }
                this.getTaskResult(taskId)
                .then((response) => {
                    if (response.errorId !== 0) {
                        reject(new Error(response.errorCode, response.errorDescription));
                    } else {
                        console.log(response);
                        if (response.status === 'ready') {
                            resolve(response);
                        } else {
                            setTimeout(waitLoop, 1000);
                        }
                    }
                })
                .catch((e) => reject(e));
            };
            waitLoop();
        });
    }
    
}

Apify.main(async () => {
    
    const input = await Apify.getValue('INPUT');
    if(!input.key){
        console.log('ERROR: missing "key" attribute in INPUT');
        return null;
    }
    if(!input.webUrl){
        console.log('ERROR: missing "webUrl" attribute in INPUT');
        return null;
    }
    if(!input.siteKey){
        console.log('ERROR: missing "siteKey" attribute in INPUT');
        return null;
    }
    
    console.log("Solving re-captcha with Anticaptcha: " + input.webUrl);
    const hasProxy = input.proxyType || input.proxyAddress || input.proxyPort || 
        input.proxyLogin || input.proxyPassword || input.userAgent || input.cookies;
    const anticaptcha = new Anticaptcha(input.key);
    const task = {
        "type": hasProxy ? "NoCaptchaTask" : "NoCaptchaTaskProxyless",
        "websiteURL": input.webUrl,
        "websiteKey": input.siteKey
    };
    if(hasProxy){
        task.proxyType = input.proxyType || '';
        task.proxyAddress = input.proxyAddress || '';
        task.proxyPort = input.proxyPort || '';
        task.proxyLogin = input.proxyLogin || '';
        task.proxyPassword = input.proxyPassword || '';
        task.userAgent = input.userAgent || '';
        task.cookies = input.cookies || '';
    }
    const taskId = await anticaptcha.createTask(task);
    const result = await anticaptcha.waitForTaskResult(taskId, 600000);
    await Apify.setValue('OUTPUT', result.solution.gRecaptchaResponse);
    console.log('g-recaptcha-response: ', result.solution.gRecaptchaResponse);
    
});

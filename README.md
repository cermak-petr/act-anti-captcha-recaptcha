# act-anti-captcha-recaptcha

Act for solving google recaptcha using the anti-captcha.com service.
You need to have an anti-captcha subscription to be able to use it.

__The act accepts input in the following format:__
```javascript
{ 
    "key": ANTI_CAPTCHA_KEY,
    "webUrl": PROTECTED_WEBSITE_URL,
    "siteKey": CAPTCHA_DATA_SITEKEY
}
```

You can find __CAPTCHA_DATA_SITEKEY__ on the protected website.
It is usually in a __"data-sitekey"__ attribute in an element with a __"g-recaptcha"__ class or id.

Output is the resulting g-recaptcha-response which you have to send the same way the protected website would.  
Usually it can be sent in a form input with __name="g-recaptcha-response"__.

Some sites may require the captcha to be solved from the same IP address and/or browser,  
in such case it is possible to use the following input attributes (in addition to the default ones).
```javascript
    "proxyType": "http",
    "proxyAddress": "8.8.8.8",
    "proxyPort": 8080,
    "proxyLogin": "theLogin",
    "proxyPassword": "thePassword",
    "userAgent": "Opera 6.0",
    "cookies": "name=value; name2=value2"
```

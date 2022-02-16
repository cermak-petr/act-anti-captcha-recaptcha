## What does Anti Captcha Recaptcha do?
This is an automation tool designed to streamline the process of solving [Google reCAPTCHAs](https://www.google.com/recaptcha/about/) using the [anti-captcha.com](http://anti-captcha.com) service. Solving reCAPTCHAs allows you to scrape reCAPTCHA-protected websites.

## What can I use it for?
If you're web scraping and your scraper is unable to solve the reCAPTCHA, your bot might be blocked by the website. This actor should make it easier to solve that issue by automating the use of the Anti Captcha service.

## Cost of usage
Anti-CAPTCHA reCAPTCHA is super efficient, so it will only consume the bare minimum of platform usage credits. That gives you plenty of scope to try it out with your $5 credits on the [Free Apify plan](https://apify.com/pricing).


## Input
The first input field needed is a key from [anti-captcha.com](http://anti-captcha.com). You can find **CAPTCHA_DATA_SITEKEY** on the protected website. It is usually in a **"data-sitekey"** attribute in an element with a **"G-reCAPTCHA"** class or ID.

The input page in JavaScript should look like this:
```javascript
{ 
    "key": ANTI_CAPTCHA_KEY,
    "webUrl": PROTECTED_WEBSITE_URL,
    "siteKey": CAPTCHA_DATA_SITEKEY
}
```

## Output
The output consists of the resulting G-reCAPTCHA-response, which you have to send the same way the protected website would. Usually, you can send it in the form of input with __name="G-reCAPTCHA-response"__.

Some sites may require the CAPTCHA to be solved from the same IP address and/or browser. In this case, it is possible to use the following input attributes (in addition to the default ones).
```javascript
    "proxyType": "http",
    "proxyAddress": "8.8.8.8",
    "proxyPort": 8080,
    "proxyLogin": "theLogin",
    "proxyPassword": "thePassword",
    "userAgent": "Opera 6.0",
    "cookies": "name=value; name2=value2"
```

## Limitations
You **must have** an [anti-captcha.com](http://anti-captcha.com) **subscription** to use this actor. Only by being subscribed to the service can you get the key you need for this automation actor to work. Without the [anti-captcha.com](http://anti-captcha.com) key, running the actor will result in an error.

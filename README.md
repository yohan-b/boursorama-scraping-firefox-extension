Abandonné, car pas possible de désactiver CORS dans Firefox contrairement à Chrome.

    root@y1:/home/yohan/boursorama-scraping# apt-get -y install chromium
    yohan@y1:~/boursorama-scraping$ chromium --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security 

## Références :
https://developer.mozilla.org/fr/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension

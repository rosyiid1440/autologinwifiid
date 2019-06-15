// ==UserScript==
// @name         Koneksi + Autologin
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Cek Koneksi dan untuk Auto Login Wifi.id Kampus
// @author       Laksamadi Guko & Rosyiid
// @match        *://*/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @grant        GM_xmlhttpRequest
// ==/UserScript==

// script ini khusus untuk reaspberry pi yang digunakan untuk monitor autologin wifi.id, bukan untuk pc yang digunakan sehari hari.

window.onload=function(){

    setInterval(function() {
    ping('https://google.com/').then(function(delta) {
        window.location.href = 'https://google.com/';
    }).catch(function(err) {
        var urlx =
            'https://welcome2.wifi.id/authnew/login/check_login.php?ipc=10.212.27.182&gw_id=WAG-D5-KBL&mac=dc:9f:db:a6:36:19&redirect=&wlan=BPGBPG00111/TLK-WI32246607-0001';

GM_xmlhttpRequest({
            method: "POST",
            url: urlx,
            dataType: "json",
            data: "username=821915754@ut.ac.id@komunitas.ut&password=2013209011994&landURL=",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            onload: function(response) {
                console.log(response);
            }
        });
    });
    }, 10000);

}

// pingjs https://github.com/jdfreder/pingjs

(function (root, factory) { if (typeof define === 'function' && define.amd) { define([], factory); } else if (typeof module === 'object' && module.exports) { module.exports = factory(); } else { root.ping = factory(); }
}(this, function () {

    /**
     * Creates and loads an image element by url.
     * @param  {String} url
     * @return {Promise} promise that resolves to an image element or
     *                   fails to an Error.
     */
    function request_image(url) {
        return new Promise(function(resolve, reject) {
            var img = new Image();
            img.onload = function() { resolve(img); };
            img.onerror = function() { reject(url); };
            img.src = url + '?random-no-cache=' + Math.floor((1 + Math.random()) * 0x10000).toString(16);
        });
    }

    /**
     * Pings a url.
     * @param  {String} url
     * @param  {Number} multiplier - optional, factor to adjust the ping by.  0.3 works well for HTTP servers.
     * @return {Promise} promise that resolves to a ping (ms, float).
     */
    function ping(url, multiplier) {
        return new Promise(function(resolve, reject) {
            var start = (new Date()).getTime();
            var response = function() {
                var delta = ((new Date()).getTime() - start);
                delta *= (multiplier || 1);
                resolve(delta);
            };
            request_image(url).then(response).catch(response);

            // Set a timeout for max-pings, 5s.
            setTimeout(function() { reject(Error('Timeout')); }, 5000);
        });
    }

    return ping;
}));

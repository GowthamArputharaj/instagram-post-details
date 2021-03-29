const https = require('https');
const fs = require('fs');
const path = require('path');

// get instagram post download url and post details
async function downloadPost(q, cb) {
    var ig_root = 'https://www.instagram.com/p/';

    const jsonparam = '/?__a=1';

    var url = ig_root + q + jsonparam;

    console.log(`URL is ${url}`)

    //  get url of post and download post
    https.get(url, (res) => {
        if (res.statusCode != 200)
            cb(new Error('Failed to download'), res.headers);
        else if (res.headers['content-length'] > 1000*1024*1024)
            cb(new Error('Too large'));
        else {
            var body = '';
            body = res;
            var json;
            res.on('error', (e) => { cb(e); })
            .on('data', (d) => {
                body += d;
            })
            .on('end', () => {
                json = JSON.parse(body);
                console.log(json);
                var url = json.graphql.shortcode_media.display_url;
                var dir = './new_downl/';
                console.log(`DIR NAME IS: ${dir}`)

                cb(null, json);
            });
        }
    }).on('error', (e) => {
        cb(e);
    });
}

var currenctLocation = window.location.href;
var url = new URL(currenctLocation);
var allParams = url.searchParams;
var q = allParams.get('post_id');
console.log('qqqqqqqqqqqqq');
console.log(q);

var q = 'CM2uhkYs57o';

downloadPost(q, (err, resp) => {
    if(err) {
        console.log(`Error is: ${err}`);
    }

    if(resp) {
        console.log(resp);
    }

    return resp;
});
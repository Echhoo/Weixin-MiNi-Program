'use strict';

// let url = 'http://192.168.0.102:3000/home'
//
// class requestObj{
//     constructor() {
//         this.a = 'a';
//         this.b = 'b';
//         this.c = 'c';
//     }
// }
//
// let requestData = JSON.stringify(requestObj);
//
// request({
//     url: url,
//     method: "POST",
//     json: true,
//     headers: {
//         "content-type": "application/json",
//     },
//     body: JSON.stringify(requestData)
// }, function(error, response, body) {
//     if (!error && response.statusCode == 200) {
//     }
// });




var http = require('http');

var qs = require('querystring');

var post_data = {
    url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595939748737&di=05d4226499eb67595c713035e03675fc&imgtype=0&src=http%3A%2F%2Fethn.cssn.cn%2Fmzx%2Fmzxtpxw%2F201603%2FW020160329761657988474.jpg',
    scenes: ['animal'],
    time: new Date().getTime()
};//这是需要提交的数据

var content = qs.stringify(post_data);

var options = {
    hostname: 'aip.baidubce.com',
    port: 80,
    path: 'api/v1/solution/direct/imagerecognition/combination',
    method: 'POST',
    headers: {
        "content-type": "application/json",
    }
};

var req = http.request(options, function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
});

req.on('error', function (e) {
    console.log('problem with request: ' + e.message);
});

// write data to request body
req.write(content);

req.end();




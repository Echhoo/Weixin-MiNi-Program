module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1622087906288, function(require, module, exports) {

/**
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file index
 * @author baiduAip
 */


module.exports = {
    imageSearch: require('./AipImageSearch'),
    imageClassify: require('./AipImageClassify'),
    contentCensor: require('./AipContentCensor'),
    face: require('./AipFace'),
    ocr: require('./AipOcr'),
    nlp: require('./AipNlp'),
    kg: require('./AipKg'),
    speech: require('./AipSpeech'),
    HttpClient: require('./http/httpClient')
};
}, function(modId) {var map = {"./AipImageSearch":1622087906289,"./AipImageClassify":1622087906303,"./AipContentCensor":1622087906304,"./AipFace":1622087906307,"./AipOcr":1622087906309,"./AipNlp":1622087906310,"./AipKg":1622087906312,"./AipSpeech":1622087906313,"./http/httpClient":1622087906292}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1622087906289, function(require, module, exports) {

/**
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file AipImageSearch.js
 * @author baidu aip
 */

const BaseClient = require('./client/baseClient');

const RequestInfo = require('./client/requestInfo');

const HttpClient = require('./http/httpClient');

const objectTools = require('./util/objectTools');

const METHOD_POST = 'POST';

const SAME_HQ_ADD_PATH = '/rest/2.0/realtime_search/same_hq/add';
const SAME_HQ_SEARCH_PATH = '/rest/2.0/realtime_search/same_hq/search';
const SAME_HQ_DELETE_PATH = '/rest/2.0/realtime_search/same_hq/delete';
const SIMILAR_ADD_PATH = '/rest/2.0/image-classify/v1/realtime_search/similar/add';
const SIMILAR_SEARCH_PATH = '/rest/2.0/image-classify/v1/realtime_search/similar/search';
const SIMILAR_DELETE_PATH = '/rest/2.0/image-classify/v1/realtime_search/similar/delete';
const PRODUCT_ADD_PATH = '/rest/2.0/image-classify/v1/realtime_search/product/add';
const PRODUCT_SEARCH_PATH = '/rest/2.0/image-classify/v1/realtime_search/product/search';
const PRODUCT_DELETE_PATH = '/rest/2.0/image-classify/v1/realtime_search/product/delete';

const PICTURE_BOOK_ADD_PATH = "/rest/2.0/imagesearch/v1/realtime_search/picturebook/add";
const PICTURE_BOOK_SEARCH_PATH = "/rest/2.0/imagesearch/v1/realtime_search/picturebook/search";
const PICTURE_BOOK_DELETE_PATH = "/rest/2.0/imagesearch/v1/realtime_search/picturebook/delete"
const PICTURE_BOOK_UPDATE_PATH = "/rest/2.0/imagesearch/v1/realtime_search/picturebook/update"



/**
 * AipImageSearch类
 *
 * @class
 * @extends BaseClient
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak  access key.
 * @param {string} sk  security key.
 */
class AipImageSearch extends BaseClient {
    constructor(appId, ak, sk) {
        super(appId, ak, sk);
    }
    commonImpl(param) {
        let httpClient = new HttpClient();
        let apiUrl = param.targetPath;
        delete param.targetPath;
        let requestInfo = new RequestInfo(apiUrl,
            param, METHOD_POST);
        return this.doRequest(requestInfo, httpClient);
    }

    /**
     * 相同图检索—入库接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   brief 检索时原样带回,最长256B。
     *   tags 1 - 65535范围内的整数，tag间以逗号分隔，最多2个tag。样例："100,11" ；检索时可圈定分类维度进行检索
     * @return {Promise} - 标准Promise对象
     */
    sameHqAdd(image, options) {
        let param = {
            image: image,
            targetPath: SAME_HQ_ADD_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 相同图检索—检索接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   tags 1 - 65535范围内的整数，tag间以逗号分隔，最多2个tag。样例："100,11" ；检索时可圈定分类维度进行检索
     *   tag_logic 检索时tag之间的逻辑， 0：逻辑and，1：逻辑or
     *   pn 分页功能，起始位置，例：0。未指定分页时，默认返回前300个结果；接口返回数量最大限制1000条，例如：起始位置为900，截取条数500条，接口也只返回第900 - 1000条的结果，共计100条
     *   rn 分页功能，截取条数，例：250
     * @return {Promise} - 标准Promise对象
     */
    sameHqSearch(image, options) {
        let param = {
            image: image,
            targetPath: SAME_HQ_SEARCH_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 相同图检索—删除接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    sameHqDeleteByImage(image, options) {
        let param = {
            image: image,
            targetPath: SAME_HQ_DELETE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 相同图检索—删除接口
     *
     * @param {string} contSign - 图片签名（和image二选一，image优先级更高）
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    sameHqDeleteBySign(contSign, options) {
        let param = {
            cont_sign: contSign,
            targetPath: SAME_HQ_DELETE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 相似图检索—入库接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   brief 检索时原样带回,最长256B。
     *   tags 1 - 65535范围内的整数，tag间以逗号分隔，最多2个tag。样例："100,11" ；检索时可圈定分类维度进行检索
     * @return {Promise} - 标准Promise对象
     */
    similarAdd(image, options) {
        let param = {
            image: image,
            targetPath: SIMILAR_ADD_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 相似图检索—检索接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   tags 1 - 65535范围内的整数，tag间以逗号分隔，最多2个tag。样例："100,11" ；检索时可圈定分类维度进行检索
     *   tag_logic 检索时tag之间的逻辑， 0：逻辑and，1：逻辑or
     *   pn 分页功能，起始位置，例：0。未指定分页时，默认返回前300个结果；接口返回数量最大限制1000条，例如：起始位置为900，截取条数500条，接口也只返回第900 - 1000条的结果，共计100条
     *   rn 分页功能，截取条数，例：250
     * @return {Promise} - 标准Promise对象
     */
    similarSearch(image, options) {
        let param = {
            image: image,
            targetPath: SIMILAR_SEARCH_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 相似图检索—删除接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    similarDeleteByImage(image, options) {
        let param = {
            image: image,
            targetPath: SIMILAR_DELETE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 相似图检索—删除接口
     *
     * @param {string} contSign - 图片签名（和image二选一，image优先级更高）
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    similarDeleteBySign(contSign, options) {
        let param = {
            cont_sign: contSign,
            targetPath: SIMILAR_DELETE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 商品检索—入库接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   brief 检索时原样带回,最长256B。**请注意，检索接口不返回原图，仅反馈当前填写的brief信息，所以调用该入库接口时，brief信息请尽量填写可关联至本地图库的图片id或者图片url、图片名称等信息**
     *   class_id1 商品分类维度1，支持1-60范围内的整数。检索时可圈定该分类维度进行检索
     *   class_id2 商品分类维度1，支持1-60范围内的整数。检索时可圈定该分类维度进行检索
     * @return {Promise} - 标准Promise对象
     */
    productAdd(image, options) {
        let param = {
            image: image,
            targetPath: PRODUCT_ADD_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 商品检索—检索接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   class_id1 商品分类维度1，支持1-60范围内的整数。检索时可圈定该分类维度进行检索
     *   class_id2 商品分类维度1，支持1-60范围内的整数。检索时可圈定该分类维度进行检索
     *   pn 分页功能，起始位置，例：0。未指定分页时，默认返回前300个结果；接口返回数量最大限制1000条，例如：起始位置为900，截取条数500条，接口也只返回第900 - 1000条的结果，共计100条
     *   rn 分页功能，截取条数，例：250
     * @return {Promise} - 标准Promise对象
     */
    productSearch(image, options) {
        let param = {
            image: image,
            targetPath: PRODUCT_SEARCH_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 商品检索—删除接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    productDeleteByImage(image, options) {
        let param = {
            image: image,
            targetPath: PRODUCT_DELETE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 商品检索—删除接口
     *
     * @param {string} contSign - 图片签名（和image二选一，image优先级更高）
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    productDeleteBySign(contSign, options) {
        let param = {
            cont_sign: contSign,
            targetPath: PRODUCT_DELETE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 绘本图片搜索—入库-image
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {string} brief - 简介
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    pictureBookAddImage(image, brief, options) {
        let param = {
            image : image,
            brief : brief,
            targetPath: PICTURE_BOOK_ADD_PATH
        }
        return this.commonImpl(objectTools.merge(param, options))};

    /**
     * 绘本图片搜索—入库-url
     *
     * @param {string} url - 图片地址
     * @param {string} brief - 简介
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    pictureBookAddUrl(url, brief, options) {
        let param = {
            url: url,
            brief : brief,
            targetPath: PICTURE_BOOK_ADD_PATH
        }
        return this.commonImpl(objectTools.merge(param, options))};

    /**
     * 绘本图片搜索—检索-image
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    pictureBookSearchImage(image, options) {
        let param = {
            image : image,
            targetPath: PICTURE_BOOK_SEARCH_PATH
        }
        return this.commonImpl(objectTools.merge(param, options))};

    /**
     * 绘本图片搜索—检索-url
     *
     * @param {string} url - 图片地址
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    pictureBookSearchUrl(url, options) {
        let param = {
            url: url,
            targetPath: PICTURE_BOOK_SEARCH_PATH
        }
        return this.commonImpl(objectTools.merge(param, options))};

    /**
     * 绘本图片搜索—更新-image
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    pictureBookUpdate(image, options) {
        let param = {
            image : image,
            targetPath: PICTURE_BOOK_UPDATE_PATH
        }
        return this.commonImpl(objectTools.merge(param, options))};


    /**
     *  绘本图片搜索—更新-url
     *
     * @param {string} url - 图片地址
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    pictureBookUpdateUrl(url, options) {
        let param = {
            url: url,
            targetPath: PICTURE_BOOK_UPDATE_PATH
        }
        return this.commonImpl(objectTools.merge(param, options))};

    /**
     * 绘本图片搜索—更新-cont_sign
     *
     * @param {string} contSign - 图片签名（和image二选一，image优先级更高）
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    pictureBookUpdateContSign(contSign, options) {
        let param = {
            cont_sign: cont_sign,
            targetPath: PICTURE_BOOK_UPDATE_PATH
        }
        return this.commonImpl(objectTools.merge(param, options))};

    /**
     * 绘本图片搜索—删除-image
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    pictureBookDeleteByImage(image, options) {
        let param = {
            image : image,
            targetPath: PICTURE_BOOK_DELETE_PATH
        }

        return this.commonImpl(objectTools.merge(param, options))};

    /**
     * 绘本图片搜索—删除-url
     *
     const PICTURE_BOOK_DELETE_PATH = "/rest/2.0/imagesearch/v1/realtime_search/picturebook/delete";
const PICTURE_BOOK_UPDATE_PATH = "/rest/2.0/imagesearch/v1/realtime_search/picturebook/update";
* @param {string} url - 图片地址
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    pictureBookDeleteByUrl(url, options) {
        let param = {
            url: url,
            targetPath: PICTURE_BOOK_DELETE_PATH
        }
        return this.commonImpl(objectTools.merge(param, options))};

    /**
     * 绘本图片搜索—删除-cont_sign
     *
     * @param {string} contSign - 图片签名（和image二选一，image优先级更高）
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    pictureBookDeleteBySign(contSign, options) {
        let param = {
            cont_sign: contSign,
            targetPath: PICTURE_BOOK_DELETE_PATH
        }
        return this.commonImpl(objectTools.merge(param, options))};


}

module.exports = AipImageSearch;


}, function(modId) { var map = {"./client/baseClient":1622087906290,"./client/requestInfo":1622087906296,"./http/httpClient":1622087906292,"./util/objectTools":1622087906293}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1622087906290, function(require, module, exports) {

/**
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file baseClient
 * @author baiduAip
 */
const DevAuth = require('../auth/devAuth');

const DevAuthToken = require('../auth/devAuthToken');


/**
 * 无授权判断状态
 *
 * @const
 * @type {number}
 */
const AUTHTYPE_INIT = 0;

/**
 * 确定为云用户
 *
 * @const
 * @type {number}
 */
const AUTHTYPE_BCE = 1;

/**
 * 确定为开发者用户（手动输入token模式,以及token中包含了正确的scope）
 *
 * @const
 * @type {number}
 */
const AUTHTYPE_DEV = 2;

/**
 * 获取开发者token成功用户
 *
 * @const
 * @type {number}
 */
const AUTHTYPE_DEV_OR_BCE = 3;


/**
 * 初始状态
 *
 * @const
 * @type {number}
 */
const STATUS_INIT = 0;

/**
 * 获取开发者token中
 *
 * @const
 * @type {number}
 */
const STATUS_AUTHTYPE_REQESTING = 1;

/**
 * 获取开发者token成功，或者确定为云用户
 *
 * @const
 * @type {number}
 */
const STATUS_READY = 2;

/**
 * 非法ak，sk
 *
 * @const
 * @type {number}
 */
const STATUS_ERROR = -1;

 /**
 * BaseClient类
 * 各具体接口类基类，处理鉴权逻辑等
 *
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak The access key.
 * @param {string} sk The security key.
 */
class BaseClient {
    constructor(appId, ak, sk, options) {
        this.appId = 0;
        this.ak = ak;
        this.sk = sk;

        this.options = options || {};

        this.authType = AUTHTYPE_INIT;
        this.status = STATUS_INIT;

        this.pms;
        this.devAccessToken = null;

        this.devAuth = new DevAuth(this.ak, this.sk);

        this.authTypeReq();

    }
    setAccessToken(token, expireTime) {
        let et = expireTime || DevAuthToken.DEFAULT_EXPIRE_DURATION;
        this.devAccessToken = new DevAuthToken(token, et, null);
        this.authType = AUTHTYPE_DEV;
        this.status = STATUS_READY;
    }
    authTypeReq() {
        // 请求access_token服务
        this.status = STATUS_AUTHTYPE_REQESTING;
        this.pms = this.devAuth.getToken().then(this.gotDevAuthSuccess.bind(this),
        this.gotDevAuthFail.bind(this));
        // 初始化client对象后立即发生的第一次异常，如果没有立即调用具体请求接口的话（必须有promise catch）
        // 将无法被捕获获取token的request网络异常，为了避免UnhandledPromiseRejectionWarning
        // 此处直接catch住,待代用具体接口时候再返回获取token时的异常，减少程序复杂度
        this.pms.catch(function (error) {
        }.bind(this));
        return this.pms;
    }
    gotDevAuthSuccess(token) {
        // 如果用户没有手动调用setAccessToken设置access_token
        if (this.authType !== AUTHTYPE_DEV) {
            this.devAccessToken = token;
            this.authType = AUTHTYPE_DEV_OR_BCE;
        }
        this.status = STATUS_READY;
    }
    gotDevAuthFail(err) {
        // 获取token时鉴权服务器返回失败信息
        if (err.errorType === DevAuth.EVENT_ERRTYPE_NORMAL) {
            // 可能是百度云的ak，sk
            this.authType = AUTHTYPE_BCE;
            this.status = STATUS_READY;
            return;
        }

        // 获取token时发生了网络错误
        // 或者是发生了服务器返回数据格式异常
        if (err.errorType === DevAuth.EVENT_ERRTYPE_NETWORK
            || err.errorType === DevAuth.EVENT_ERRTYPE_ILLEGAL_RESPONSE) {
            this.status = STATUS_ERROR;
            throw err;
        }
    }
    doRequest(requestInfo, httpClient) {

        // 如果获取token失败
        if (this.status === STATUS_ERROR) {
            this.authTypeReq();
        }

        return this.pms.then(function () {
            // 预检函数，返回是否token过期
            let isTokenExpired = this.preRequest(requestInfo);

            if (isTokenExpired === false) {
                // 鉴权方式确定，请求接口
                return httpClient.postWithInfo(requestInfo)
            } else {
                // 如果token过期了，说明是需要重新获取access_token
                // 待重新获取完后继续请求接口
                return this.pms.then(function () {
                    this.preRequest(requestInfo);
                    return httpClient.postWithInfo(requestInfo);
                }.bind(this))
            }
        }.bind(this));
    }
    checkDevPermission(requestInfo) {
        // 是否跳过这个检查（从speech.baidu.com创建的应用，调用语音接口需要跳过）
        if (this.options.isSkipScopeCheck === true) {
            return true;
        }
        // 检查是否拥有AI平台接口权限
        return this.devAccessToken.hasScope(requestInfo.scope);
    }
    preRequest(requestInfo) {

        // 获取access_token失败，使用百度云签名方式调用
        if (this.authType === AUTHTYPE_BCE) {
            requestInfo.makeBceOptions(this.ak, this.sk);
            return false;
        }

        // 获取access_token成功，或者调用setAccessToken设置的access_token
        if (this.authType === AUTHTYPE_DEV_OR_BCE || this.authType === AUTHTYPE_DEV) {
            // 拥有AI平台接口权限
            if (this.checkDevPermission(requestInfo) || this.authType === AUTHTYPE_DEV) {

                // 判断access_token是否过期
                if (!this.devAccessToken.isExpired()) {
                    requestInfo.makeDevOptions(this.devAccessToken);
                    return false;
                }
                // access_token过期重新获取
                this.authTypeReq();
                return true;
            } else {
                // 使用百度云签名方式访问调用
                requestInfo.makeBceOptions(this.ak, this.sk);
            }
        }
        return false;
    }
 }

module.exports = BaseClient;

}, function(modId) { var map = {"../auth/devAuth":1622087906291,"../auth/devAuthToken":1622087906294}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1622087906291, function(require, module, exports) {

/**
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file devAuth
 * @author baiduAip
 */
const HttpClient = require('../http/httpClient');

const DevAuthToken = require('./devAuthToken');

const objectTool = require('../util/objectTools');

const OPENAPI_TOKEN_URL = 'https://aip.baidubce.com/oauth/2.0/token';

const OPENAPI_GRANTTYPE_CLIENT = 'client_credentials';

const REQUEST_TOKEN_METHOD = 'post';
 /**
 * devAuth类
 * 百度开发者token获取类
 *
 * @constructor
 * @param {string} ak API Key.
 * @param {string} sk Secret Key.
 */
class DevAuth {
    constructor(ak, sk) {
        this.ak = ak;
        this.sk = sk;
        this.httpClient = new HttpClient();
    }
    gotData(data) {
        // 如果返回数据非法，此时data为请求数据body
        if (!objectTool.isObject(data)) {
            throw {errorType: DevAuth.EVENT_ERRTYPE_ILLEGAL_RESPONSE, error: data};
        }
        // 如果获取token失败，数据是合法的错误数据
        if (data.error) {
            throw {errorType: DevAuth.EVENT_ERRTYPE_NORMAL, error: data.error};
        } else {
            // 获取token成功
            return new DevAuthToken(data.access_token, data.expires_in, data.scope);
        }
    }
    gotDataError(err) {
        // request.js内部错误封装下返回
        throw {
            errorType: DevAuth.EVENT_ERRTYPE_NETWORK,
            error: err
        };
    }
    getToken() {
        let options = {
            url: OPENAPI_TOKEN_URL,
            method: REQUEST_TOKEN_METHOD,
            form: {
                grant_type: OPENAPI_GRANTTYPE_CLIENT,
                client_id: this.ak,
                client_secret: this.sk
            }
        };
        return this.httpClient.req(options).then(this.gotData.bind(this),
            this.gotDataError.bind(this))
    }
}

DevAuth.EVENT_ERRTYPE_ILLEGAL_RESPONSE = "ERRTYPE_ILLEGAL_RESPONSE";

DevAuth.EVENT_ERRTYPE_NETWORK = "ERRTYPE_NETWORK";

DevAuth.EVENT_ERRTYPE_NORMAL  = "ERRTYPE_NORMAL";

module.exports = DevAuth;

}, function(modId) { var map = {"../http/httpClient":1622087906292,"./devAuthToken":1622087906294,"../util/objectTools":1622087906293}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1622087906292, function(require, module, exports) {

/**
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file httpClient类
 * @author baiduAip
 */
const request = require('request');
const objectTools = require('../util/objectTools');

/**
 * HttpClient类
 * 通用接口调用，依赖request库
 * @see https://github.com/request/request
 *
 * @class
 * @constructor
 */
class HttpClient {
    constructor() {

    }
    postWithInfo(requestInfo) {
        let options = {
            method: requestInfo.method,
            url: requestInfo.getUrl(),
            headers: requestInfo.headers,
            form: requestInfo.params,
            timeout: HttpClient.DEFAULT_TIMEOUT
        };

        return this.req(options);
    }

    postWithInfoForJson(requestInfo) {
        let options = {
            method: requestInfo.method,
            url: requestInfo.getUrl(),
            json: true,
            headers: requestInfo.headers,
            body: JSON.stringify(requestInfo.params),
            timeout: HttpClient.DEFAULT_TIMEOUT
        };

        return this.req(options);
    }

    req(options) {

        // 首先处理设置INTERCEPTOR的情况
        if (objectTools.isFunction(HttpClient.REQUEST_INTERCEPTOR)) {
            options = HttpClient.REQUEST_INTERCEPTOR(options);
        // 其次设置全局request options的
        } else if (objectTools.isObject(HttpClient.REQUEST_GLOBAL_OPTIONS)) {
            options = objectTools.merge(HttpClient.REQUEST_GLOBAL_OPTIONS, options);
        }

        return new Promise(function(resolve, reject) {
            request(options, function(error, response, body) {
                if (error === null) {
                    try {
                        resolve(JSON.parse(body));
                    } catch (e) {
                        // 无法解析json请求，就返回原始body
                        resolve(body);
                    }
                } else {
                    reject(error);
                }
            });
        });
    }
}

/**
 * 用来设置request库的参数，会覆盖所有options，设置时请确保你知道它的作用
 * @see https://github.com/request/request#requestoptions-callback
 * @see https://github.com/request/request
 */
HttpClient.setRequestOptions = function (options) {
    HttpClient.REQUEST_GLOBAL_OPTIONS = options;
}


/**
 * 用来获取和设置request库的参数，会覆盖所有options，设置时请确保你知道它的作用
 * 优先级高于setRequestOptions
 *
 * @see https://github.com/request/request#requestoptions-callback
 * @see https://github.com/request/request
 */
HttpClient.setRequestInterceptor = function (interceptorCallback) {
    HttpClient.REQUEST_INTERCEPTOR = interceptorCallback;
}

HttpClient.REQUEST_GLOBAL_OPTIONS = null;

HttpClient.REQUEST_INTERCEPTOR = null;

HttpClient.DEFAULT_TIMEOUT = 10000;

module.exports = HttpClient;
}, function(modId) { var map = {"../util/objectTools":1622087906293}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1622087906293, function(require, module, exports) {

/**
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file objectTool
 * @author baiduAip
 */

let mergeTool = {
    merge: function (source, dest) {
        let merged = {};
        for (let p in dest) {
            merged[p] = dest[p];
        }
        for (let p in source) {
            merged[p] = source[p];
        }
        return merged;
    },
    ensureArray: function (arrayLike) {
        if (this.isArray(arrayLike)) {
            return arrayLike;
        } else {
            return [arrayLike];
        }
    },
    isArray: function (obj) {
        return '[object Array]' === Object.prototype.toString.call(obj);
    },
    isObject: function (obj) {
        return '[object Object]' === Object.prototype.toString.call(obj);
    },
    isFunction: function (obj) {
        return '[object Function]' === Object.prototype.toString.call(obj);
    }
};

module.exports = mergeTool;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1622087906294, function(require, module, exports) {

/**
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file devAuthToken
 * @author baiduAip
 */
const devScope = require('../const/devScope');

/**
 * 提前获取access_token的时间 默认24个小时
 *
 * @type {number}
 */
let DEFAULT_FETCH_AHEAD_DURATION = 24 * 60 * 60 * 1000;

 /**
 * devAuthToken类
 * 百度开发者token信息包装类
 *
 * @constructor
 * @param {string} token access_token
 * @param {number} expireTime 多久之后过期
 * @param {string} scope 权限
 */
class DevAuthToken {
    constructor(token, expireTime, scope) {
        this.token = token;
        this.expireTime = expireTime;
        this.scope = scope;
        this.authDate = new Date();
        this.hasScopeFlag = false;
        this.initScope();
    }
    initScope() {
        // 用户自建token，默认为有权限
        if (this.scope == null) {
            this.hasScopeFlag = true;
            return;
        }
        let scopeArray = this.scope.split(' ');
        scopeArray.forEach(function (item) {
            if (item === devScope) {
                this.hasScopeFlag = true;
            }
        }.bind(this));
    }
    hasScope(scope) {
        return this.hasScopeFlag;
    }
    isExpired() {
        let now = new Date();
        // 根据服务器返回的access_token过期时间，提前重新获取token
        if (now.getTime(this.expireTime) -
            this.authDate.getTime() > this.expireTime * 1000 -
                DEFAULT_FETCH_AHEAD_DURATION) {
            return true;
        }
        return false;
    }
}

/**
 * 设置提前获取access_token的时间
 */
DevAuthToken.setExpireAhead = function (duration) {
    DEFAULT_FETCH_AHEAD_DURATION = duration;
}

DevAuthToken.DEFAULT_EXPIRE_DURATION = 2592000 * 1000;

module.exports = DevAuthToken;

}, function(modId) { var map = {"../const/devScope":1622087906295}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1622087906295, function(require, module, exports) {

/**
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file 百度开发者权限常量
 * @author baiduAip
 */
const devScope = 'brain_all_scope';

module.exports = devScope;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1622087906296, function(require, module, exports) {

/**
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file requestInfo
 * @author baiduAip
 */
const HttpHeader = require('../const/httpHeader');

const CloudAuth = require('../auth/cloudAuth');

const HOST_DEFAULT = 'aip.baidubce.com';

const CONTENT_TYPE_FORMDEFAULT = 'application/x-www-form-urlencoded';
const CONTENT_TYPE_JSON = 'application/json;charset=utf-8';

const SYMBOL_QUERYSTRING_PREFIX = '?aipSdk=node&access_token=';
const SYMBOL_QUERYSTRING_PREFIX_BCE = '?aipSdk=node';

const SYMBOL_HTTPS_PREFIX = 'https://';
const SYMBOL_HTTP_PREFIX = 'http://';

 /**
 * RequestInfo类
 * 构造供request库调用的请求信息对象
 *
 * @constructor
 */
class RequestInfo {
    constructor(path, params, method, isHttp, headers) {
        this.isHttp = isHttp || false;
        this.method = method;
        this.host = HOST_DEFAULT;
        this.path = path;
        this.params = params;
        this.createDate = new Date();
        this.mergeHeaders = headers || {};
        this.devAccessToken = null;
        this.initCommonHeader();
    }
    setHost(host) {
        this.host = host;
        this.headers[HttpHeader.HOST] = this.host;
    }
    initCommonHeader() {
        this.headers = {};
        this.headers[HttpHeader.HOST] = this.host;
        this.headers[HttpHeader.CONTENT_TYPE] = CONTENT_TYPE_FORMDEFAULT;
        for (let p in this.mergeHeaders) {
            this.headers[p] = this.mergeHeaders[p];
        }
    }
    makeDevOptions(devAccessToken) {
        this.devAccessToken = devAccessToken;
        this.path += SYMBOL_QUERYSTRING_PREFIX + devAccessToken.token;
    }
    makeBceOptions(ak, sk) {
        let cloudAuth = new CloudAuth(ak, sk);
        this.headers[HttpHeader.BCE_DATE] = this.getUTCDateStr();
        let signature = cloudAuth.getAuthorization(this.method,
            this.path, {aipSdk: 'node'}, this.headers, this.createDate.getTime());
        this.headers[HttpHeader.BCE_AUTHORIZATION] = signature;
    }
    getUTCDateStr() {
        let dateStrUTC = this.createDate.toISOString().replace(/\.\d+Z$/, 'Z');
        return dateStrUTC;
    }
    getAccessToken() {
        if (this.devAccessToken !== null) {
            return this.devAccessToken.token;
        }
        return null;
    }
    getUrl() {
        if (this.isHttp) {
            return this.getHttpUrl();
        }
        return this.getHttpsUrl();
    }
    getPureUrl() {
        return this.getUrl().split('?')[0];
    }
    getHttpsUrl() {
        return SYMBOL_HTTPS_PREFIX + this.host + this.path + SYMBOL_QUERYSTRING_PREFIX_BCE;
    }
    getHttpUrl() {
        return SYMBOL_HTTP_PREFIX + this.host + this.path + SYMBOL_QUERYSTRING_PREFIX_BCE;
    }
 }

module.exports = RequestInfo;

}, function(modId) { var map = {"../const/httpHeader":1622087906297,"../auth/cloudAuth":1622087906298}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1622087906297, function(require, module, exports) {

/**
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file http头常量
 * @author baiduAip
 */
const httpHeader = {
    BCE_DATE: 'x-bce-date',
    HOST: 'Host',
    BCE_AUTHORIZATION: 'authorization',
    CONTENT_TYPE: 'Content-Type'
};

module.exports = Object.freeze(httpHeader);
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1622087906298, function(require, module, exports) {

/**
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file cloudAuth
 * @author baiduAip
 */
const BceAuth = require('./bceAuth/auth');

 /**
 * CloudAuth类
 *
 * 百度云鉴权签名类，依赖百度云签名实现(bceAuth目录)
 * @see https://github.com/baidubce/bce-sdk-js
 * @see http://gollum.baidu.com/AuthenticationMechanism#生成CanonicalQueryString
 * @constructor
 * @param {string} ak The access key.
 * @param {string} sk The security key.
 */
class CloudAuth {
    constructor(ak, sk) {
        this.ak = ak;
        this.sk = sk;
        this.authProxy = new BceAuth(ak, sk);
    }
    getAuthorization(method, uri, params, headers, time) {
        return this.authProxy.generateAuthorization(method, uri, params, headers, time / 1000);
    }
 }

module.exports = CloudAuth;

}, function(modId) { var map = {"./bceAuth/auth":1622087906299}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1622087906299, function(require, module, exports) {
/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file src/auth.js
 * @author leeight
 */

/* eslint-env node */
/* eslint max-params:[0,10] */

var util = require('util');
var u = require('underscore');

var debug = require('debug')('bce-sdk:auth');

var H = require('./headers');
var strings = require('./strings');

/**
 * Auth
 *
 * @constructor
 * @param {string} ak The access key.
 * @param {string} sk The security key.
 */
function Auth(ak, sk) {
    this.ak = ak;
    this.sk = sk;
}

/**
 * Generate the signature based on http://gollum.baidu.com/AuthenticationMechanism
 *
 * @param {string} method The http request method, such as GET, POST, DELETE, PUT, ...
 * @param {string} resource The request path.
 * @param {Object=} params The query strings.
 * @param {Object=} headers The http request headers.
 * @param {number=} timestamp Set the current timestamp.
 * @param {number=} expirationInSeconds The signature validation time.
 * @param {Array.<string>=} headersToSign The request headers list which will be used to calcualate the signature.
 *
 * @return {string} The signature.
 */
Auth.prototype.generateAuthorization = function (method, resource, params,
                                                 headers, timestamp, expirationInSeconds, headersToSign) {

    var now = timestamp ? new Date(timestamp * 1000) : new Date();
    var rawSessionKey = util.format('bce-auth-v1/%s/%s/%d',
        this.ak, now.toISOString().replace(/\.\d+Z$/, 'Z'), expirationInSeconds || 1800);
    debug('rawSessionKey = %j', rawSessionKey);
    var sessionKey = this.hash(rawSessionKey, this.sk);

    var canonicalUri = this.uriCanonicalization(resource);
    var canonicalQueryString = this.queryStringCanonicalization(params || {});

    var rv = this.headersCanonicalization(headers || {}, headersToSign);
    var canonicalHeaders = rv[0];
    var signedHeaders = rv[1];
    debug('canonicalUri = %j', canonicalUri);
    debug('canonicalQueryString = %j', canonicalQueryString);
    debug('canonicalHeaders = %j', canonicalHeaders);
    debug('signedHeaders = %j', signedHeaders);

    var rawSignature = util.format('%s\n%s\n%s\n%s',
        method, canonicalUri, canonicalQueryString, canonicalHeaders);
    debug('rawSignature = %j', rawSignature);
    debug('sessionKey = %j', sessionKey);
    var signature = this.hash(rawSignature, sessionKey);

    if (signedHeaders.length) {
        return util.format('%s/%s/%s', rawSessionKey, signedHeaders.join(';'), signature);
    }

    return util.format('%s//%s', rawSessionKey, signature);
};

Auth.prototype.uriCanonicalization = function (uri) {
    return uri;
};

/**
 * Canonical the query strings.
 *
 * @see http://gollum.baidu.com/AuthenticationMechanism#生成CanonicalQueryString
 * @param {Object} params The query strings.
 * @return {string}
 */
Auth.prototype.queryStringCanonicalization = function (params) {
    var canonicalQueryString = [];
    Object.keys(params).forEach(function (key) {
        if (key.toLowerCase() === H.AUTHORIZATION.toLowerCase()) {
            return;
        }

        var value = params[key] == null ? '' : params[key];
        canonicalQueryString.push(key + '=' + strings.normalize(value));
    });

    canonicalQueryString.sort();

    return canonicalQueryString.join('&');
};

/**
 * Canonical the http request headers.
 *
 * @see http://gollum.baidu.com/AuthenticationMechanism#生成CanonicalHeaders
 * @param {Object} headers The http request headers.
 * @param {Array.<string>=} headersToSign The request headers list which will be used to calcualate the signature.
 * @return {*} canonicalHeaders and signedHeaders
 */
Auth.prototype.headersCanonicalization = function (headers, headersToSign) {
    if (!headersToSign || !headersToSign.length) {
        headersToSign = [H.HOST, H.CONTENT_MD5, H.CONTENT_LENGTH, H.CONTENT_TYPE];
    }
    debug('headers = %j, headersToSign = %j', headers, headersToSign);

    var headersMap = {};
    headersToSign.forEach(function (item) {
        headersMap[item.toLowerCase()] = true;
    });

    var canonicalHeaders = [];
    Object.keys(headers).forEach(function (key) {
        var value = headers[key];
        value = u.isString(value) ? strings.trim(value) : value;
        if (value == null || value === '') {
            return;
        }
        key = key.toLowerCase();
        if (/^x\-bce\-/.test(key) || headersMap[key] === true) {
            canonicalHeaders.push(util.format('%s:%s',
                // encodeURIComponent(key), encodeURIComponent(value)));
                strings.normalize(key), strings.normalize(value)));
        }
    });

    canonicalHeaders.sort();

    var signedHeaders = [];
    canonicalHeaders.forEach(function (item) {
        signedHeaders.push(item.split(':')[0]);
    });

    return [canonicalHeaders.join('\n'), signedHeaders];
};

Auth.prototype.hash = function (data, key) {
    var crypto = require('crypto');
    var sha256Hmac = crypto.createHmac('sha256', key);
    sha256Hmac.update(data);
    return sha256Hmac.digest('hex');
};

module.exports = Auth;


}, function(modId) { var map = {"./headers":1622087906300,"./strings":1622087906301,"crypto":1622087906302}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1622087906300, function(require, module, exports) {
/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file src/headers.js
 * @author leeight
 */

/* eslint-env node */

exports.CONTENT_TYPE = 'Content-Type';
exports.CONTENT_LENGTH = 'Content-Length';
exports.CONTENT_MD5 = 'Content-MD5';
exports.CONTENT_ENCODING = 'Content-Encoding';
exports.CONTENT_DISPOSITION = 'Content-Disposition';
exports.ETAG = 'ETag';
exports.CONNECTION = 'Connection';
exports.HOST = 'Host';
exports.USER_AGENT = 'User-Agent';
exports.CACHE_CONTROL = 'Cache-Control';
exports.EXPIRES = 'Expires';

exports.AUTHORIZATION = 'Authorization';
exports.X_BCE_DATE = 'x-bce-date';
exports.X_BCE_ACL = 'x-bce-acl';
exports.X_BCE_REQUEST_ID = 'x-bce-request-id';
exports.X_BCE_CONTENT_SHA256 = 'x-bce-content-sha256';
exports.X_BCE_OBJECT_ACL = 'x-bce-object-acl';
exports.X_BCE_OBJECT_GRANT_READ = 'x-bce-object-grant-read';

exports.X_HTTP_HEADERS = 'http_headers';
exports.X_BODY = 'body';
exports.X_STATUS_CODE = 'status_code';
exports.X_MESSAGE = 'message';
exports.X_CODE = 'code';
exports.X_REQUEST_ID = 'request_id';

exports.SESSION_TOKEN = 'x-bce-security-token';

exports.X_VOD_MEDIA_TITLE = 'x-vod-media-title';
exports.X_VOD_MEDIA_DESCRIPTION = 'x-vod-media-description';
exports.ACCEPT_ENCODING = 'accept-encoding';
exports.ACCEPT = 'accept';












}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1622087906301, function(require, module, exports) {
/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file strings.js
 * @author leeight
 */

var kEscapedMap = {
    '!': '%21',
    '\'': '%27',
    '(': '%28',
    ')': '%29',
    '*': '%2A'
};

exports.normalize = function (string, encodingSlash) {
    var result = encodeURIComponent(string);
    result = result.replace(/[!'\(\)\*]/g, function ($1) {
        return kEscapedMap[$1];
    });

    if (encodingSlash === false) {
        result = result.replace(/%2F/gi, '/');
    }

    return result;
};

exports.trim = function (string) {
    return (string || '').replace(/^\s+|\s+$/g, '');
};


}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1622087906302, function(require, module, exports) {
/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file src/crypto.js
 * @author leeight
 */

/* eslint-env node */

var fs = require('fs');
var crypto = require('crypto');

var Q = require('q');

exports.md5sum = function (data, enc, digest) {
    if (!Buffer.isBuffer(data)) {
        data = new Buffer(data, enc || 'UTF-8');
    }

    var md5 = crypto.createHash('md5');
    md5.update(data);

    return md5.digest(digest || 'base64');
};

exports.md5stream = function (stream, digest) {
    var deferred = Q.defer();

    var md5 = crypto.createHash('md5');
    stream.on('data', function (chunk) {
        md5.update(chunk);
    });
    stream.on('end', function () {
        deferred.resolve(md5.digest(digest || 'base64'));
    });
    stream.on('error', function (error) {
        deferred.reject(error);
    });

    return deferred.promise;
};

exports.md5file = function (filename, digest) {
    return exports.md5stream(fs.createReadStream(filename), digest);
};

exports.md5blob = function (blob, digest) {
    var deferred = Q.defer();

    var reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    reader.onerror = function (e) {
        deferred.reject(reader.error);
    };
    reader.onloadend = function (e) {
        if (e.target.readyState === FileReader.DONE) {
            var content = e.target.result;
            var md5 = exports.md5sum(content, null, digest);
            deferred.resolve(md5);
        }
    };
    return deferred.promise;
};











}, function(modId) { var map = {"crypto":1622087906302}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1622087906303, function(require, module, exports) {

/**
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file AipImageClassify.js
 * @author baidu aip
 */

const BaseClient = require('./client/baseClient');

const RequestInfo = require('./client/requestInfo');

const HttpClient = require('./http/httpClient');

const objectTools = require('./util/objectTools');

const METHOD_POST = 'POST';

const ADVANCED_GENERAL_PATH = '/rest/2.0/image-classify/v2/advanced_general';
const DISH_DETECT_PATH = '/rest/2.0/image-classify/v2/dish';
const CAR_DETECT_PATH = '/rest/2.0/image-classify/v1/car';
const LOGO_SEARCH_PATH = '/rest/2.0/image-classify/v2/logo';
const LOGO_ADD_PATH = '/rest/2.0/realtime_search/v1/logo/add';
const LOGO_DELETE_PATH = '/rest/2.0/realtime_search/v1/logo/delete';
const ANIMAL_DETECT_PATH = '/rest/2.0/image-classify/v1/animal';
const PLANT_DETECT_PATH = '/rest/2.0/image-classify/v1/plant';
const OBJECT_DETECT_PATH = '/rest/2.0/image-classify/v1/object_detect';


const CUSTOM_DISH_ADD_PATH = "/rest/2.0/image-classify/v1/realtime_search/dish/add";
const CUSTOM_DISH_SEARCH_PATH = "/rest/2.0/image-classify/v1/realtime_search/dish/search";
const CUSTOM_DISH_DELETE_PATH = "/rest/2.0/image-classify/v1/realtime_search/dish/delete";
const MULTI_OBJECT_DETECT_PATH = "/rest/2.0/image-classify/v1/multi_object_detect";
const COMBINATION_PATH = "/api/v1/solution/direct/imagerecognition/combination";



/**
 * AipImageClassify类
 *
 * @class
 * @extends BaseClient
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak  access key.
 * @param {string} sk  security key.
 */
class AipImageClassify extends BaseClient {
    constructor(appId, ak, sk) {
        super(appId, ak, sk);
    }
    commonImpl(param) {
        let httpClient = new HttpClient();
        let apiUrl = param.targetPath;
        delete param.targetPath;
        let requestInfo = new RequestInfo(apiUrl,
            param, METHOD_POST);
        return this.doRequest(requestInfo, httpClient);
    }

    /**
     * 通用物体识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    advancedGeneral(image, options) {
        let param = {
            image: image,
            targetPath: ADVANCED_GENERAL_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 菜品识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   top_num 返回预测得分top结果数，默认为5
     * @return {Promise} - 标准Promise对象
     */
    dishDetect(image, options) {
        let param = {
            image: image,
            targetPath: DISH_DETECT_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 车辆识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   top_num 返回预测得分top结果数，默认为5
     * @return {Promise} - 标准Promise对象
     */
    carDetect(image, options) {
        let param = {
            image: image,
            targetPath: CAR_DETECT_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * logo商标识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   custom_lib 是否只使用自定义logo库的结果，默认false：返回自定义库+默认库的识别结果
     * @return {Promise} - 标准Promise对象
     */
    logoSearch(image, options) {
        let param = {
            image: image,
            targetPath: LOGO_SEARCH_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * logo商标识别—添加接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {string} brief - brief，检索时带回。此处要传对应的name与code字段，name长度小于100B，code长度小于150B
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    logoAdd(image, brief, options) {
        let param = {
            image: image,
            brief: brief,
            targetPath: LOGO_ADD_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * logo商标识别—删除接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    logoDeleteByImage(image, options) {
        let param = {
            image: image,
            targetPath: LOGO_DELETE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * logo商标识别—删除接口
     *
     * @param {string} contSign - 图片签名（和image二选一，image优先级更高）
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    logoDeleteBySign(contSign, options) {
        let param = {
            cont_sign: contSign,
            targetPath: LOGO_DELETE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 动物识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   top_num 返回预测得分top结果数，默认为6
     * @return {Promise} - 标准Promise对象
     */
    animalDetect(image, options) {
        let param = {
            image: image,
            targetPath: ANIMAL_DETECT_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 植物识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    plantDetect(image, options) {
        let param = {
            image: image,
            targetPath: PLANT_DETECT_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 图像主体检测接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   with_face 如果检测主体是人，主体区域是否带上人脸部分，0-不带人脸区域，其他-带人脸区域，裁剪类需求推荐带人脸，检索/识别类需求推荐不带人脸。默认取1，带人脸。
     * @return {Promise} - 标准Promise对象
     */
    objectDetect(image, options) {
        let param = {
            image: image,
            targetPath: OBJECT_DETECT_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }





    /**
     * 自定义菜品识别—入库
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {string} brief - 简介
     * @param {Object} options - 可选参数对象，key: value都为string类型
        * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    customDishesAddImage(image, brief, options) {
        let param = {
            image: image,
            brief: brief,
            targetPath: CUSTOM_DISH_ADD_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }


    /**
     * 自定义菜品识别—检索
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    customDishesSearch(image, options) {
        let param = {
            image: image,
            targetPath: CUSTOM_DISH_SEARCH_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 自定义菜品识别—删除
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    customDishesDeleteImage(image, options) {
        let param = {
            image: image,
            targetPath: CUSTOM_DISH_DELETE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 自定义菜品识别—删除
     *
     * @param {string} cont_sign - 图片签名
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    customDishesDeleteContSign(cont_sign, options) {
        let param = {
            cont_sign: cont_sign,
            targetPath: CUSTOM_DISH_DELETE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }


    /**
     * 图像多主体检测
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    multiObjectDetect(image, options) {
        let param = {
            image: image,
            targetPath: MULTI_OBJECT_DETECT_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }


    // /**
    //  * 组合接口-image
    //  *
    //  * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
    //  * @param {Object} options - 可选参数对象，key: value都为string类型
    //  * @description options - options列表:
    //  * @return {Promise} - 标准Promise对象
    //  */
    // combinationByImage(image, options) {
    //     let param = {
    //         image: image,
    //         scenes: scenes,
    //         targetPath: COMBINATION_PATH
    //     };
    //     return this.commonImpl(objectTools.merge(param, options));
    // }
    //
    // /**
    //  * 组合接口-imageUrl
    //  *
    //  * @param {string} imgUrl - 图片地址
    //  * @param {[]} scenes - 场景
    //  * @param {Object} options - 可选参数对象，key: value都为string类型
    //  * @description options - options列表:
    //  * @return {Promise} - 标准Promise对象
    //  */
    // combinationByImageUrl(imgUrl, scenes, options) {
    //     let param = {
    //         imgUrl: imgUrl,
    //         scenes: scenes,
    //         targetPath: COMBINATION_PATH
    //     };
    //     return this.commonImpl(objectTools.merge(param, options));
    // }
}

module.exports = AipImageClassify;


}, function(modId) { var map = {"./client/baseClient":1622087906290,"./client/requestInfo":1622087906296,"./http/httpClient":1622087906292,"./util/objectTools":1622087906293}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1622087906304, function(require, module, exports) {

/**
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file AipImageCensor
 * @author baiduAip
 */
const BaseClient = require('./client/baseClient');

const RequestInfo = require('./client/requestInfo');

const objectTools = require('./util/objectTools');

const HttpClient = require('./http/httpClient');

const HttpClientJson = require('./http/httpClientExt');

const httpHeader = require('./const/httpHeader');

const CONTENT_TYPE_JSON = 'application/json';

const METHOD_POST = 'POST';

const PATH_USER_DEFINED = '/rest/2.0/solution/v1/img_censor/user_defined';
const PATH_ANTIPORN_GIF = '/rest/2.0/antiporn/v1/detect_gif';
const PATH_FACEAUDIT = '/rest/2.0/solution/v1/face_audit';
const PATH_COMBOCENSOR = '/api/v1/solution/direct/img_censor';
const PATH_REPORT = '/rpc/2.0/feedback/v1/report';

const PATH_ANTIPORN = '/rest/2.0/antiporn/v1/detect';
const PATH_ANTITERROR = '/rest/2.0/antiterror/v1/detect';
const PATH_ANTISPAM = '/rest/2.0/antispam/v2/spam';

const scope = require('./const/devScope').DEFAULT;


/**
 * AipContentCensor类，构造调用图像审核对象
 *
 * @class
 * @extends BaseClient
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak  access key.
 * @param {string} sk  security key.
 */
class AipImageCensor extends BaseClient {
    constructor(appId, ak, sk) {
        super(appId, ak, sk);
    }

    commonImpl(param) {
        let httpClient = new HttpClient();
        let apiUrl = param.targetPath;
        delete param.targetPath;
        let requestInfo = new RequestInfo(apiUrl,
            param, METHOD_POST);
        return this.doRequest(requestInfo, httpClient);
    }

    jsonRequestImpl(param) {
        let httpClient = new HttpClientJson();
        let apiUrl = param.targetPath;
        delete param.targetPath;
        let requestInfo = new RequestInfo(apiUrl,
            param, METHOD_POST, false, {
                [httpHeader.CONTENT_TYPE]: CONTENT_TYPE_JSON
            });
        return this.doRequest(requestInfo, httpClient);
    }

    antiPornGif(image, options) {
        let param = {
            image: image,
            targetPath: PATH_ANTIPORN_GIF
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    antiPorn(image, options) {
        let param = {
            image: image,
            targetPath: PATH_ANTIPORN
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    antiTerror(image, options) {
        let param = {
            image: image,
            targetPath: PATH_ANTITERROR
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    antiSpam(content, options) {
        let param = {
            content: content,
            targetPath: PATH_ANTISPAM
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    faceAudit(images, type, configId) {
        let param = {configId: configId};
        if (type === 'url') {
            images = images.map(function (elm) {
                return encodeURIComponent(elm);
            });
            param.imgUrls = images.join(',');
        }
        if (type === 'base64') {
            param.images = images.join(',');
        }
        param.targetPath = PATH_FACEAUDIT;
        return this.commonImpl(param);
    }

    imageCensorUserDefined(image, type) {
        let param = {};
        if (type === 'url') {
            param.imgUrl = image;
        }
        if (type === 'base64') {
            param.image = image;
        }
        param.targetPath = PATH_USER_DEFINED;
        return this.commonImpl(param);
    }

    imageCensorComb(image, type, scenes, scenesConf) {
        let param = {};
        if (type === 'url') {
            param.imgUrl = image;
        }
        if (type === 'base64') {
            param.image = image;
        }
        param.scenes = scenes;
        param.sceneConf = scenesConf;
        param.targetPath = PATH_COMBOCENSOR;
        return this.jsonRequestImpl(param);
    }

    report(feedback) {
        let param = {};
        param.feedback = feedback;
        param.targetPath = PATH_REPORT;
        return this.jsonRequestImpl(param);
    }
}

module.exports = AipImageCensor;
}, function(modId) { var map = {"./client/baseClient":1622087906290,"./client/requestInfo":1622087906296,"./util/objectTools":1622087906293,"./http/httpClient":1622087906292,"./http/httpClientExt":1622087906305,"./const/httpHeader":1622087906297,"./const/devScope":1622087906295}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1622087906305, function(require, module, exports) {

/**
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file httpClientExt类
 * @author baiduAip
 */

const HttpClient = require('./httpClient');
const code = require('../const/code');
const HttpHeader = require('../const/httpHeader');
const CONTENT_TYPE_JSON = 'application/json';

/**
 * HttpClientExt类
 * 图像审核某个接口调用需要json的Content-type,请求body为json字符串
 *
 * @class
 * @extends HttpClient
 * @constructor
 */
class HttpClientExt extends HttpClient {
    constructor() {
        super();
    }
    postWithInfo(requestInfo) {
        let body = this.createBody(requestInfo.params);
        let options = {
            method: requestInfo.method,
            url: requestInfo.getUrl(),
            headers: requestInfo.headers,
            encoding: null,
            timeout: HttpClient.DEFAULT_TIMEOUT,
            body: body
        };
        return this.req(options);
    }
    createBody(param) {
        let body = JSON.stringify(param);
        return body;
    }
}


module.exports = HttpClientExt;
}, function(modId) { var map = {"./httpClient":1622087906292,"../const/code":1622087906306,"../const/httpHeader":1622087906297}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1622087906306, function(require, module, exports) {

/**
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file 常用编码格式常量
 * @author baiduAip
 */
const code = {
    GBK: 'GBK',
    BIN: 'binary',
    UTF8: 'utf-8',
    BASE64: 'base64'
};

module.exports = Object.freeze(code);
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1622087906307, function(require, module, exports) {

/**
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file AipFace.js
 * @author baidu aip
 */



const BaseClient = require('./client/baseClient');

const RequestInfo = require('./client/requestInfo');

const HttpClient = require('./http/HttpClientExt');

const objectTools = require('./util/objectTools');

const METHOD_POST = 'POST';

const DETECT_PATH = '/rest/2.0/face/v3/detect';
const SEARCH_PATH = '/rest/2.0/face/v3/search';
const USER_ADD_PATH = '/rest/2.0/face/v3/faceset/user/add';
const USER_UPDATE_PATH = '/rest/2.0/face/v3/faceset/user/update';
const FACE_DELETE_PATH = '/rest/2.0/face/v3/faceset/face/delete';
const USER_GET_PATH = '/rest/2.0/face/v3/faceset/user/get';
const FACE_GETLIST_PATH = '/rest/2.0/face/v3/faceset/face/getlist';
const GROUP_GETUSERS_PATH = '/rest/2.0/face/v3/faceset/group/getusers';
const USER_COPY_PATH = '/rest/2.0/face/v3/faceset/user/copy';
const USER_DELETE_PATH = '/rest/2.0/face/v3/faceset/user/delete';
const GROUP_ADD_PATH = '/rest/2.0/face/v3/faceset/group/add';
const GROUP_DELETE_PATH = '/rest/2.0/face/v3/faceset/group/delete';
const GROUP_GETLIST_PATH = '/rest/2.0/face/v3/faceset/group/getlist';
const PERSON_VERIFY_PATH = '/rest/2.0/face/v3/person/verify';
const VIDEO_SESSIONCODE_PATH = '/rest/2.0/face/v1/faceliveness/sessioncode';
const VIDEO_FACELIVENESS_PATH = '/rest/2.0/face/v1/faceliveness/verify';


/**
 * AipFace类
 *
 * @class
 * @extends BaseClient
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak  access key.
 * @param {string} sk  security key.
 */
class AipFace extends BaseClient {
    constructor(appId, ak, sk) {
        super(appId, ak, sk);
    }
    commonImpl(param) {
        let httpClient = new HttpClient();
        let apiUrl = param.targetPath;
        delete param.targetPath;
        let requestInfo = new RequestInfo(apiUrl,
            param, METHOD_POST);
        return this.doRequest(requestInfo, httpClient);
    }

    /**
     * 人脸检测接口
     *
     * @param {string} image - 图片信息(**总数据大小应小于10M**)，图片上传方式根据image_type来判断
     * @param {string} imageType - 图片类型 **BASE64**:图片的base64值，base64编码后的图片数据，需urlencode，编码后的图片大小不超过2M；**URL**:图片的 URL地址( 可能由于网络等原因导致下载图片时间过长)**；FACE_TOKEN**: 人脸图片的唯一标识，调用人脸检测接口时，会为每个人脸图片赋予一个唯一的FACE_TOKEN，同一张图片多次检测得到的FACE_TOKEN是同一个
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   face_field 包括**age,beauty,expression,faceshape,gender,glasses,landmark,race,quality,facetype,parsing信息**  <br> 逗号分隔. 默认只返回face_token、人脸框、概率和旋转角度
     *   max_face_num 最多处理人脸的数目，默认值为1，仅检测图片中面积最大的那个人脸；**最大值10**，检测图片中面积最大的几张人脸。
     *   face_type 人脸的类型 **LIVE**表示生活照：通常为手机、相机拍摄的人像图片、或从网络获取的人像图片等**IDCARD**表示身份证芯片照：二代身份证内置芯片中的人像照片 **WATERMARK**表示带水印证件照：一般为带水印的小图，如公安网小图 **CERT**表示证件照片：如拍摄的身份证、工卡、护照、学生证等证件图片 默认**LIVE**
     * @return {Promise} - 标准Promise对象
     */
    detect(image, imageType, options) {
        let param = {
            image: image,
            image_type: imageType,
            targetPath: DETECT_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 人脸搜索接口
     *
     * @param {string} image - 图片信息(**总数据大小应小于10M**)，图片上传方式根据image_type来判断
     * @param {string} imageType - 图片类型 **BASE64**:图片的base64值，base64编码后的图片数据，需urlencode，编码后的图片大小不超过2M；**URL**:图片的 URL地址( 可能由于网络等原因导致下载图片时间过长)**；FACE_TOKEN**: 人脸图片的唯一标识，调用人脸检测接口时，会为每个人脸图片赋予一个唯一的FACE_TOKEN，同一张图片多次检测得到的FACE_TOKEN是同一个
     * @param {string} groupIdList - 从指定的group中进行查找 用逗号分隔，**上限20个**
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   quality_control 图片质量控制  **NONE**: 不进行控制 **LOW**:较低的质量要求 **NORMAL**: 一般的质量要求 **HIGH**: 较高的质量要求 **默认 NONE**
     *   liveness_control 活体检测控制  **NONE**: 不进行控制 **LOW**:较低的活体要求(高通过率 低攻击拒绝率) **NORMAL**: 一般的活体要求(平衡的攻击拒绝率, 通过率) **HIGH**: 较高的活体要求(高攻击拒绝率 低通过率) **默认NONE**
     *   user_id 当需要对特定用户进行比对时，指定user_id进行比对。即人脸认证功能。
     *   max_user_num 查找后返回的用户数量。返回相似度最高的几个用户，默认为1，最多返回20个。
     * @return {Promise} - 标准Promise对象
     */
    search(image, imageType, groupIdList, options) {
        let param = {
            image: image,
            image_type: imageType,
            group_id_list: groupIdList,
            targetPath: SEARCH_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 人脸注册接口
     *
     * @param {string} image - 图片信息(**总数据大小应小于10M**)，图片上传方式根据image_type来判断
     * @param {string} imageType - 图片类型 **BASE64**:图片的base64值，base64编码后的图片数据，需urlencode，编码后的图片大小不超过2M；**URL**:图片的 URL地址( 可能由于网络等原因导致下载图片时间过长)**；FACE_TOKEN**: 人脸图片的唯一标识，调用人脸检测接口时，会为每个人脸图片赋予一个唯一的FACE_TOKEN，同一张图片多次检测得到的FACE_TOKEN是同一个
     * @param {string} groupId - 用户组id（由数字、字母、下划线组成），长度限制128B
     * @param {string} userId - 用户id（由数字、字母、下划线组成），长度限制128B
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   user_info 用户资料，长度限制256B
     *   quality_control 图片质量控制  **NONE**: 不进行控制 **LOW**:较低的质量要求 **NORMAL**: 一般的质量要求 **HIGH**: 较高的质量要求 **默认 NONE**
     *   liveness_control 活体检测控制  **NONE**: 不进行控制 **LOW**:较低的活体要求(高通过率 低攻击拒绝率) **NORMAL**: 一般的活体要求(平衡的攻击拒绝率, 通过率) **HIGH**: 较高的活体要求(高攻击拒绝率 低通过率) **默认NONE**
     * @return {Promise} - 标准Promise对象
     */
    addUser(image, imageType, groupId, userId, options) {
        let param = {
            image: image,
            image_type: imageType,
            group_id: groupId,
            user_id: userId,
            targetPath: USER_ADD_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 人脸更新接口
     *
     * @param {string} image - 图片信息(**总数据大小应小于10M**)，图片上传方式根据image_type来判断
     * @param {string} imageType - 图片类型 **BASE64**:图片的base64值，base64编码后的图片数据，需urlencode，编码后的图片大小不超过2M；**URL**:图片的 URL地址( 可能由于网络等原因导致下载图片时间过长)**；FACE_TOKEN**: 人脸图片的唯一标识，调用人脸检测接口时，会为每个人脸图片赋予一个唯一的FACE_TOKEN，同一张图片多次检测得到的FACE_TOKEN是同一个
     * @param {string} groupId - 更新指定groupid下uid对应的信息
     * @param {string} userId - 用户id（由数字、字母、下划线组成），长度限制128B
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   user_info 用户资料，长度限制256B
     *   quality_control 图片质量控制  **NONE**: 不进行控制 **LOW**:较低的质量要求 **NORMAL**: 一般的质量要求 **HIGH**: 较高的质量要求 **默认 NONE**
     *   liveness_control 活体检测控制  **NONE**: 不进行控制 **LOW**:较低的活体要求(高通过率 低攻击拒绝率) **NORMAL**: 一般的活体要求(平衡的攻击拒绝率, 通过率) **HIGH**: 较高的活体要求(高攻击拒绝率 低通过率) **默认NONE**
     * @return {Promise} - 标准Promise对象
     */
    updateUser(image, imageType, groupId, userId, options) {
        let param = {
            image: image,
            image_type: imageType,
            group_id: groupId,
            user_id: userId,
            targetPath: USER_UPDATE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 人脸删除接口
     *
     * @param {string} userId - 用户id（由数字、字母、下划线组成），长度限制128B
     * @param {string} groupId - 用户组id（由数字、字母、下划线组成），长度限制128B
     * @param {string} faceToken - 需要删除的人脸图片token，（由数字、字母、下划线组成）长度限制64B
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    faceDelete(userId, groupId, faceToken, options) {
        let param = {
            user_id: userId,
            group_id: groupId,
            face_token: faceToken,
            targetPath: FACE_DELETE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 用户信息查询接口
     *
     * @param {string} userId - 用户id（由数字、字母、下划线组成），长度限制128B
     * @param {string} groupId - 用户组id（由数字、字母、下划线组成），长度限制128B
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    getUser(userId, groupId, options) {
        let param = {
            user_id: userId,
            group_id: groupId,
            targetPath: USER_GET_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 获取用户人脸列表接口
     *
     * @param {string} userId - 用户id（由数字、字母、下划线组成），长度限制128B
     * @param {string} groupId - 用户组id（由数字、字母、下划线组成），长度限制128B
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    faceGetlist(userId, groupId, options) {
        let param = {
            user_id: userId,
            group_id: groupId,
            targetPath: FACE_GETLIST_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 获取用户列表接口
     *
     * @param {string} groupId - 用户组id（由数字、字母、下划线组成），长度限制128B
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   start 默认值0，起始序号
     *   length 返回数量，默认值100，最大值1000
     * @return {Promise} - 标准Promise对象
     */
    getGroupUsers(groupId, options) {
        let param = {
            group_id: groupId,
            targetPath: GROUP_GETUSERS_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 复制用户接口
     *
     * @param {string} userId - 用户id（由数字、字母、下划线组成），长度限制128B
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   src_group_id 从指定组里复制信息
     *   dst_group_id 需要添加用户的组id
     * @return {Promise} - 标准Promise对象
     */
    userCopy(userId, options) {
        let param = {
            user_id: userId,
            targetPath: USER_COPY_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 删除用户接口
     *
     * @param {string} groupId - 用户组id（由数字、字母、下划线组成），长度限制128B
     * @param {string} userId - 用户id（由数字、字母、下划线组成），长度限制128B
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    deleteUser(groupId, userId, options) {
        let param = {
            group_id: groupId,
            user_id: userId,
            targetPath: USER_DELETE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 创建用户组接口
     *
     * @param {string} groupId - 用户组id（由数字、字母、下划线组成），长度限制128B
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    groupAdd(groupId, options) {
        let param = {
            group_id: groupId,
            targetPath: GROUP_ADD_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 删除用户组接口
     *
     * @param {string} groupId - 用户组id（由数字、字母、下划线组成），长度限制128B
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    groupDelete(groupId, options) {
        let param = {
            group_id: groupId,
            targetPath: GROUP_DELETE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 组列表查询接口
     *
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   start 默认值0，起始序号
     *   length 返回数量，默认值100，最大值1000
     * @return {Promise} - 标准Promise对象
     */
    getGrouplist(options) {
        let param = {
            targetPath: GROUP_GETLIST_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 身份验证接口
     *
     * @param {string} image - 图片信息(**总数据大小应小于10M**)，图片上传方式根据image_type来判断
     * @param {string} imageType - 图片类型 **BASE64**:图片的base64值，base64编码后的图片数据，需urlencode，编码后的图片大小不超过2M；**URL**:图片的 URL地址( 可能由于网络等原因导致下载图片时间过长)**；FACE_TOKEN**: 人脸图片的唯一标识，调用人脸检测接口时，会为每个人脸图片赋予一个唯一的FACE_TOKEN，同一张图片多次检测得到的FACE_TOKEN是同一个
     * @param {string} idCardNumber - 身份证号（真实身份证号号码）
     * @param {string} name - utf8，姓名（真实姓名，和身份证号匹配）
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   quality_control 图片质量控制  **NONE**: 不进行控制 **LOW**:较低的质量要求 **NORMAL**: 一般的质量要求 **HIGH**: 较高的质量要求 **默认 NONE**
     *   liveness_control 活体检测控制  **NONE**: 不进行控制 **LOW**:较低的活体要求(高通过率 低攻击拒绝率) **NORMAL**: 一般的活体要求(平衡的攻击拒绝率, 通过率) **HIGH**: 较高的活体要求(高攻击拒绝率 低通过率) **默认NONE**
     * @return {Promise} - 标准Promise对象
     */
    personVerify(image, imageType, idCardNumber, name, options) {
        let param = {
            image: image,
            image_type: imageType,
            id_card_number: idCardNumber,
            name: name,
            targetPath: PERSON_VERIFY_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 语音校验码接口接口
     *
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   appid 百度云创建应用时的唯一标识ID
     * @return {Promise} - 标准Promise对象
     */
    videoSessioncode(options) {
        let param = {
            targetPath: VIDEO_SESSIONCODE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 视频活体检测接口接口
     *
     * @param {string} sessionId - 语音校验码会话id，使用此接口的前提是已经调用了语音校验码接口
     * @param {string} videoBase64 - base64编码后的视频数据（视频限制：最佳为上传5-15s的mp4文件。视频编码方式：h264编码；音频编码格式：aac，pcm均可。）
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    videoFaceliveness(sessionId, videoBase64, options) {
        let param = {
            session_id: sessionId,
            video_base64: videoBase64,
            targetPath: VIDEO_FACELIVENESS_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 在线活体检测
     *
     * @param {Object} param - 参数对象数组
     * @return {Promise} - 标准Promise对象
     * > 说明：两张图片的对象举例：
     * >
     * > [
     * >     {
     * >         "image": "sfasq35sadvsvqwr5q...",
     * >         "image_type": "BASE64",
     * >         "face_field": "quality"
     * >     },
     * >     {
     * >         "image": "sfasq35sadvsvqwr5q...",
     * >         "image_type": "BASE64",
     * >         "face_field": "quality"
     * >     }
     * > ]
     */
    faceverify(object) {
        const FACEVERIFY_PATH = '/rest/2.0/face/v3/faceverify';
        const HttpClientExt = require('./http/httpClientExt');
        let httpClientJson = new HttpClientExt();
        let requestInfo = new RequestInfo(FACEVERIFY_PATH,
            object, METHOD_POST);
        return this.doRequest(requestInfo, httpClientJson);
    }

    /**
     * 人脸比对接口
     *
     * @param {Object} param - 参数对象数组
     * @return {Promise} - 标准Promise对象
     * > 说明：两张图片的对象举例：
     * >
     * > [
     * >     {
     * >         "image": "sfasq35sadvsvqwr5q...",
     * >         "image_type": "BASE64",
     * >         "face_type": "LIVE",
     * >         "quality_control": "LOW",
     * >         "liveness_control": "HIGH"
     * >     },
     * >     {
     * >         "image": "sfasq35sadvsvqwr5q...",
     * >         "image_type": "BASE64",
     * >         "face_type": "IDCARD",
     * >         "quality_control": "LOW",
     * >         "liveness_control": "HIGH"
     * >     }
     * > ]
     */
    match(object) {
        const MATCH_PATH = '/rest/2.0/face/v3/match';
        const HttpClientExt = require('./http/httpClientExt');
        let httpClientJson = new HttpClientExt();
        let requestInfo = new RequestInfo(MATCH_PATH,
            object, METHOD_POST);
        return this.doRequest(requestInfo, httpClientJson);
    }
}

module.exports = AipFace;


}, function(modId) { var map = {"./client/baseClient":1622087906290,"./client/requestInfo":1622087906296,"./http/HttpClientExt":1622087906308,"./util/objectTools":1622087906293,"./http/httpClientExt":1622087906305}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1622087906308, function(require, module, exports) {

/**
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file httpClientExt类
 * @author baiduAip
 */

const HttpClient = require('./httpClient');
const code = require('../const/code');
const HttpHeader = require('../const/httpHeader');
const CONTENT_TYPE_JSON = 'application/json';

/**
 * HttpClientExt类
 * 图像审核某个接口调用需要json的Content-type,请求body为json字符串
 *
 * @class
 * @extends HttpClient
 * @constructor
 */
class HttpClientExt extends HttpClient {
    constructor() {
        super();
    }
    postWithInfo(requestInfo) {
        let body = this.createBody(requestInfo.params);
        let options = {
            method: requestInfo.method,
            url: requestInfo.getUrl(),
            headers: requestInfo.headers,
            encoding: null,
            timeout: HttpClient.DEFAULT_TIMEOUT,
            body: body
        };
        return this.req(options);
    }
    createBody(param) {
        let body = JSON.stringify(param);
        return body;
    }
}


module.exports = HttpClientExt;
}, function(modId) { var map = {"./httpClient":1622087906292,"../const/code":1622087906306,"../const/httpHeader":1622087906297}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1622087906309, function(require, module, exports) {

/**
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file AipOcr.js
 * @author baidu aip
 */

const BaseClient = require('./client/baseClient');

const RequestInfo = require('./client/requestInfo');

const HttpClient = require('./http/httpClient');

const objectTools = require('./util/objectTools');

const METHOD_POST = 'POST';

const GENERAL_BASIC_PATH = '/rest/2.0/ocr/v1/general_basic';
const ACCURATE_BASIC_PATH = '/rest/2.0/ocr/v1/accurate_basic';
const GENERAL_PATH = '/rest/2.0/ocr/v1/general';
const ACCURATE_PATH = '/rest/2.0/ocr/v1/accurate';
const GENERAL_ENHANCED_PATH = '/rest/2.0/ocr/v1/general_enhanced';
const WEB_IMAGE_PATH = '/rest/2.0/ocr/v1/webimage';
const IDCARD_PATH = '/rest/2.0/ocr/v1/idcard';
const BANKCARD_PATH = '/rest/2.0/ocr/v1/bankcard';
const DRIVING_LICENSE_PATH = '/rest/2.0/ocr/v1/driving_license';
const VEHICLE_LICENSE_PATH = '/rest/2.0/ocr/v1/vehicle_license';
const LICENSE_PLATE_PATH = '/rest/2.0/ocr/v1/license_plate';
const BUSINESS_LICENSE_PATH = '/rest/2.0/ocr/v1/business_license';
const RECEIPT_PATH = '/rest/2.0/ocr/v1/receipt';
const FORM_PATH = '/rest/2.0/ocr/v1/form';
const TABLE_RECOGNIZE_PATH = '/rest/2.0/solution/v1/form_ocr/request';
const TABLE_RESULT_GET_PATH = '/rest/2.0/solution/v1/form_ocr/get_request_result';
const VAT_INVOICE_PATH = '/rest/2.0/ocr/v1/vat_invoice';
const QRCODE_PATH = '/rest/2.0/ocr/v1/qrcode';
const NUMBERS_PATH = '/rest/2.0/ocr/v1/numbers';
const LOTTERY_PATH = '/rest/2.0/ocr/v1/lottery';
const PASSPORT_PATH = '/rest/2.0/ocr/v1/passport';
const BUSINESS_CARD_PATH = '/rest/2.0/ocr/v1/business_card';
const HANDWRITING_PATH = '/rest/2.0/ocr/v1/handwriting';
const CUSTOM_PATH = '/rest/2.0/solution/v1/iocr/recognise';

const DOCANALYSIS_PATH = "/rest/2.0/ocr/v1/doc_analysis"
const METER_PATH  = "/rest/2.0/ocr/v1/meter"
const WEBIMAGELOC_PATH  = "/rest/2.0/ocr/v1/webimage_loc"


/**
 * AipOcr类
 *
 * @class
 * @extends BaseClient
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak  access key.
 * @param {string} sk  security key.
 */
class AipOcr extends BaseClient {
    constructor(appId, ak, sk) {
        super(appId, ak, sk);
    }
    commonImpl(param) {
        let httpClient = new HttpClient();
        let apiUrl = param.targetPath;
        delete param.targetPath;
        let requestInfo = new RequestInfo(apiUrl, param, METHOD_POST);
        return this.doRequest(requestInfo, httpClient);
    }

    /**
     * 通用文字识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   language_type 识别语言类型，默认为CHN_ENG。可选值包括：<br>- CHN_ENG：中英文混合；<br>- ENG：英文；<br>- POR：葡萄牙语；<br>- FRE：法语；<br>- GER：德语；<br>- ITA：意大利语；<br>- SPA：西班牙语；<br>- RUS：俄语；<br>- JAP：日语；<br>- KOR：韩语；
     *   detect_direction 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br>- true：检测朝向；<br>- false：不检测朝向。
     *   detect_language 是否检测语言，默认不检测。当前支持（中文、英语、日语、韩语）
     *   probability 是否返回识别结果中每一行的置信度
     * @return {Promise} - 标准Promise对象
     */
    generalBasic(image, options) {
        let param = {
            image: image,
            targetPath: GENERAL_BASIC_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 通用文字识别接口
     *
     * @param {string} url - 图片完整URL，URL长度不超过1024字节，URL对应的图片base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式，当image字段存在时url字段失效
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   language_type 识别语言类型，默认为CHN_ENG。可选值包括：<br>- CHN_ENG：中英文混合；<br>- ENG：英文；<br>- POR：葡萄牙语；<br>- FRE：法语；<br>- GER：德语；<br>- ITA：意大利语；<br>- SPA：西班牙语；<br>- RUS：俄语；<br>- JAP：日语；<br>- KOR：韩语；
     *   detect_direction 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br>- true：检测朝向；<br>- false：不检测朝向。
     *   detect_language 是否检测语言，默认不检测。当前支持（中文、英语、日语、韩语）
     *   probability 是否返回识别结果中每一行的置信度
     * @return {Promise} - 标准Promise对象
     */
    generalBasicUrl(url, options) {
        let param = {
            url: url,
            targetPath: GENERAL_BASIC_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 通用文字识别（高精度版）接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   detect_direction 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br>- true：检测朝向；<br>- false：不检测朝向。
     *   probability 是否返回识别结果中每一行的置信度
     * @return {Promise} - 标准Promise对象
     */
    accurateBasic(image, options) {
        let param = {
            image: image,
            targetPath: ACCURATE_BASIC_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 通用文字识别（含位置信息版）接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   recognize_granularity 是否定位单字符位置，big：不定位单字符位置，默认值；small：定位单字符位置
     *   language_type 识别语言类型，默认为CHN_ENG。可选值包括：<br>- CHN_ENG：中英文混合；<br>- ENG：英文；<br>- POR：葡萄牙语；<br>- FRE：法语；<br>- GER：德语；<br>- ITA：意大利语；<br>- SPA：西班牙语；<br>- RUS：俄语；<br>- JAP：日语；<br>- KOR：韩语；
     *   detect_direction 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br>- true：检测朝向；<br>- false：不检测朝向。
     *   detect_language 是否检测语言，默认不检测。当前支持（中文、英语、日语、韩语）
     *   vertexes_location 是否返回文字外接多边形顶点位置，不支持单字位置。默认为false
     *   probability 是否返回识别结果中每一行的置信度
     * @return {Promise} - 标准Promise对象
     */
    general(image, options) {
        let param = {
            image: image,
            targetPath: GENERAL_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 通用文字识别（含位置信息版）接口
     *
     * @param {string} url - 图片完整URL，URL长度不超过1024字节，URL对应的图片base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式，当image字段存在时url字段失效
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   recognize_granularity 是否定位单字符位置，big：不定位单字符位置，默认值；small：定位单字符位置
     *   language_type 识别语言类型，默认为CHN_ENG。可选值包括：<br>- CHN_ENG：中英文混合；<br>- ENG：英文；<br>- POR：葡萄牙语；<br>- FRE：法语；<br>- GER：德语；<br>- ITA：意大利语；<br>- SPA：西班牙语；<br>- RUS：俄语；<br>- JAP：日语；<br>- KOR：韩语；
     *   detect_direction 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br>- true：检测朝向；<br>- false：不检测朝向。
     *   detect_language 是否检测语言，默认不检测。当前支持（中文、英语、日语、韩语）
     *   vertexes_location 是否返回文字外接多边形顶点位置，不支持单字位置。默认为false
     *   probability 是否返回识别结果中每一行的置信度
     * @return {Promise} - 标准Promise对象
     */
    generalUrl(url, options) {
        let param = {
            url: url,
            targetPath: GENERAL_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 通用文字识别（含位置高精度版）接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   recognize_granularity 是否定位单字符位置，big：不定位单字符位置，默认值；small：定位单字符位置
     *   detect_direction 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br>- true：检测朝向；<br>- false：不检测朝向。
     *   vertexes_location 是否返回文字外接多边形顶点位置，不支持单字位置。默认为false
     *   probability 是否返回识别结果中每一行的置信度
     * @return {Promise} - 标准Promise对象
     */
    accurate(image, options) {
        let param = {
            image: image,
            targetPath: ACCURATE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 通用文字识别（含生僻字版）接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   language_type 识别语言类型，默认为CHN_ENG。可选值包括：<br>- CHN_ENG：中英文混合；<br>- ENG：英文；<br>- POR：葡萄牙语；<br>- FRE：法语；<br>- GER：德语；<br>- ITA：意大利语；<br>- SPA：西班牙语；<br>- RUS：俄语；<br>- JAP：日语；<br>- KOR：韩语；
     *   detect_direction 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br>- true：检测朝向；<br>- false：不检测朝向。
     *   detect_language 是否检测语言，默认不检测。当前支持（中文、英语、日语、韩语）
     *   probability 是否返回识别结果中每一行的置信度
     * @return {Promise} - 标准Promise对象
     */
    generalEnhance(image, options) {
        let param = {
            image: image,
            targetPath: GENERAL_ENHANCED_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 通用文字识别（含生僻字版）接口
     *
     * @param {string} url - 图片完整URL，URL长度不超过1024字节，URL对应的图片base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式，当image字段存在时url字段失效
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   language_type 识别语言类型，默认为CHN_ENG。可选值包括：<br>- CHN_ENG：中英文混合；<br>- ENG：英文；<br>- POR：葡萄牙语；<br>- FRE：法语；<br>- GER：德语；<br>- ITA：意大利语；<br>- SPA：西班牙语；<br>- RUS：俄语；<br>- JAP：日语；<br>- KOR：韩语；
     *   detect_direction 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br>- true：检测朝向；<br>- false：不检测朝向。
     *   detect_language 是否检测语言，默认不检测。当前支持（中文、英语、日语、韩语）
     *   probability 是否返回识别结果中每一行的置信度
     * @return {Promise} - 标准Promise对象
     */
    generalEnhanceUrl(url, options) {
        let param = {
            url: url,
            targetPath: GENERAL_ENHANCED_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 网络图片文字识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   detect_direction 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br>- true：检测朝向；<br>- false：不检测朝向。
     *   detect_language 是否检测语言，默认不检测。当前支持（中文、英语、日语、韩语）
     * @return {Promise} - 标准Promise对象
     */
    webImage(image, options) {
        let param = {
            image: image,
            targetPath: WEB_IMAGE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 网络图片文字识别接口
     *
     * @param {string} url - 图片完整URL，URL长度不超过1024字节，URL对应的图片base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式，当image字段存在时url字段失效
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   detect_direction 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br>- true：检测朝向；<br>- false：不检测朝向。
     *   detect_language 是否检测语言，默认不检测。当前支持（中文、英语、日语、韩语）
     * @return {Promise} - 标准Promise对象
     */
    webImageUrl(url, options) {
        let param = {
            url: url,
            targetPath: WEB_IMAGE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 身份证识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {string} idCardSide - front：身份证含照片的一面；back：身份证带国徽的一面
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   detect_direction 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br>- true：检测朝向；<br>- false：不检测朝向。
     *   detect_risk 是否开启身份证风险类型(身份证复印件、临时身份证、身份证翻拍、修改过的身份证)功能，默认不开启，即：false。可选值:true-开启；false-不开启
     * @return {Promise} - 标准Promise对象
     */
    idcard(image, idCardSide, options) {
        let param = {
            image: image,
            id_card_side: idCardSide,
            targetPath: IDCARD_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 银行卡识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    bankcard(image, options) {
        let param = {
            image: image,
            targetPath: BANKCARD_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 驾驶证识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   detect_direction 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br>- true：检测朝向；<br>- false：不检测朝向。
     * @return {Promise} - 标准Promise对象
     */
    drivingLicense(image, options) {
        let param = {
            image: image,
            targetPath: DRIVING_LICENSE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 行驶证识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   detect_direction 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br>- true：检测朝向；<br>- false：不检测朝向。
     *   accuracy normal 使用快速服务，1200ms左右时延；缺省或其它值使用高精度服务，1600ms左右时延
     * @return {Promise} - 标准Promise对象
     */
    vehicleLicense(image, options) {
        let param = {
            image: image,
            targetPath: VEHICLE_LICENSE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 车牌识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   multi_detect 是否检测多张车牌，默认为false，当置为true的时候可以对一张图片内的多张车牌进行识别
     * @return {Promise} - 标准Promise对象
     */
    licensePlate(image, options) {
        let param = {
            image: image,
            targetPath: LICENSE_PLATE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 营业执照识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    businessLicense(image, options) {
        let param = {
            image: image,
            targetPath: BUSINESS_LICENSE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 通用票据识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   recognize_granularity 是否定位单字符位置，big：不定位单字符位置，默认值；small：定位单字符位置
     *   probability 是否返回识别结果中每一行的置信度
     *   accuracy normal 使用快速服务，1200ms左右时延；缺省或其它值使用高精度服务，1600ms左右时延
     *   detect_direction 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br>- true：检测朝向；<br>- false：不检测朝向。
     * @return {Promise} - 标准Promise对象
     */
    receipt(image, options) {
        let param = {
            image: image,
            targetPath: RECEIPT_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 表格文字识别同步接口接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    form(image, options) {
        let param = {
            image: image,
            targetPath: FORM_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 表格文字识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    tableBegin(image, options) {
        let param = {
            image: image,
            targetPath: TABLE_RECOGNIZE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 表格识别结果接口
     *
     * @param {string} requestId - 发送表格文字识别请求时返回的request id
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   result_type 期望获取结果的类型，取值为“excel”时返回xls文件的地址，取值为“json”时返回json格式的字符串,默认为”excel”
     * @return {Promise} - 标准Promise对象
     */
    tableGetresult(requestId, options) {
        let param = {
            request_id: requestId,
            targetPath: TABLE_RESULT_GET_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 增值税发票识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    vatInvoice(image, options) {
        let param = {
            image: image,
            targetPath: VAT_INVOICE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 二维码识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    qrcode(image, options) {
        let param = {
            image: image,
            targetPath: QRCODE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 数字识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   recognize_granularity 是否定位单字符位置，big：不定位单字符位置，默认值；small：定位单字符位置
     *   detect_direction 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br>- true：检测朝向；<br>- false：不检测朝向。
     * @return {Promise} - 标准Promise对象
     */
    numbers(image, options) {
        let param = {
            image: image,
            targetPath: NUMBERS_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 彩票识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   recognize_granularity 是否定位单字符位置，big：不定位单字符位置，默认值；small：定位单字符位置
     * @return {Promise} - 标准Promise对象
     */
    lottery(image, options) {
        let param = {
            image: image,
            targetPath: LOTTERY_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 护照识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    passport(image, options) {
        let param = {
            image: image,
            targetPath: PASSPORT_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 名片识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    businessCard(image, options) {
        let param = {
            image: image,
            targetPath: BUSINESS_CARD_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 手写文字识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   recognize_granularity 是否定位单字符位置，big：不定位单字符位置，默认值；small：定位单字符位置
     * @return {Promise} - 标准Promise对象
     */
    handwriting(image, options) {
        let param = {
            image: image,
            targetPath: HANDWRITING_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 自定义模板文字识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {string} templateSign - 您在自定义文字识别平台制作的模板的ID
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    custom(image, templateSign, options) {
        let param = {
            image: image,
            templateSign: templateSign,
            targetPath: CUSTOM_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    tableRecorgnize(image, type, timeout, interval) {
        let self = this;
        timeout = timeout || 20000;
        interval = interval || 2000;
        return this.tableBegin(image).then(function(result) {
            if (result.error_code) {
                return result;
            }
            let id = result.result[0]['request_id'];
            let pid = null;
            let startTime = Date.now();
            return new Promise(function(resolve, reject) {
                pid = setInterval(function () {
                    if (Date.now() - startTime > timeout) {
                        reject({errorMsg: 'get result timeout', requestId: id});
                        clearInterval(pid);
                    } else {
                        self.tableGetresult(id, type).then(function (result) {
                            if (result['result']['ret_code'] === 3) {
                                clearInterval(pid);
                                resolve(result);
                            }
                        });
                    }
                }, interval);
            })
        });
    }

    /**
     * 文档版面分析与识别
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param languageType
         识别语言类型，默认为CHN_ENG  可选值包括：CHN_ENG：中英文, ENG：英文
     * @param resultType
         返回识别结果是按单行结果返回，还是按单字结果返回，默认为big。
         big：返回行识别结果
         small：返回行识别结果之上还会返回单字结果
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *      detect_direction：
     *                  类型: string   可选值范围: true/false  说明：是否检测图像朝向，默认不检测，即：false。
     *      line_probability:
     *                  类型: string   可选值范围: true/false  说明：是否返回每行识别结果的置信度。默认为false
     *      words_type:
     *                  类型: string   可选值范围: handwring_only/handprint_mix  说明：文字类型, 默认 印刷文字识别
     *      layout_analysis：
     *                  类型: string   可选值范围: true/false  说明：是否分析文档版面：包括图、表、标题、段落的分析输出
     * @return {Promise} - 标准Promise对象
     */
    docAnalysis(image,languageType, resultType, options) {
        let param = {
            image: image,
            language_type:languageType,
            result_type:resultType,
            targetPath: DOCANALYSIS_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }


    /**
     * 仪器仪表盘读数识别
     {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param options - options列表
     *      probability：
     *                  类型: string   可选值范围: true/false  说明：是否返回每行识别结果的置信度。默认为false
     *      poly_location:
     *                  类型: string   可选值范围: true/false  说明：位置信息返回形式，默认：false
     * @return
     */
    meter(image, options) {
        let param = {
            image: image,
            targetPath: METER_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }


    /**
     * 网络图片文字识别（含位置版）
     * {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param options - options列表
     *      detect_direction：
     *                  类型: string   可选值范围: true/false  说明：是否检测图像朝向，默认不检测，即：false。
     *      probability:
     *                  类型: string   可选值范围: true/false  说明：是否返回每行识别结果的置信度。默认为false
     *      poly_location:
     *                  类型: string   可选值范围: handwring_only/handprint_mix  说明：是否返回文字所在区域的外接四边形的4个点坐标信息。默认为false
     *      recognize_granularity：
     *                  类型: string   可选值范围: true/false  说明：是否定位单字符位置，big：不定位单字符位置，默认值；small：定位单字符位置
     * @return
     */
     webimageLoc(image, options) {
        let param = {
            image: image,
            targetPath: WEBIMAGELOC_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }


}

module.exports = AipOcr;



}, function(modId) { var map = {"./client/baseClient":1622087906290,"./client/requestInfo":1622087906296,"./http/httpClient":1622087906292,"./util/objectTools":1622087906293}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1622087906310, function(require, module, exports) {

/**
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file AipNlp.js
 * @author baidu aip
 */

const BaseClient = require('./client/baseClient');

const RequestInfo = require('./client/requestInfo');

const HttpClient = require('./http/httpClientNlp');

const objectTools = require('./util/objectTools');

const METHOD_POST = 'POST';

const LEXER_PATH = '/rpc/2.0/nlp/v1/lexer';
const LEXER_CUSTOM_PATH = '/rpc/2.0/nlp/v1/lexer_custom';
const DEP_PARSER_PATH = '/rpc/2.0/nlp/v1/depparser';
const WORD_EMBEDDING_PATH = '/rpc/2.0/nlp/v2/word_emb_vec';
const DNNLM_CN_PATH = '/rpc/2.0/nlp/v2/dnnlm_cn';
const WORD_SIM_EMBEDDING_PATH = '/rpc/2.0/nlp/v2/word_emb_sim';
const SIMNET_PATH = '/rpc/2.0/nlp/v2/simnet';
const COMMENT_TAG_PATH = '/rpc/2.0/nlp/v2/comment_tag';
const SENTIMENT_CLASSIFY_PATH = '/rpc/2.0/nlp/v1/sentiment_classify';
const KEYWORD_PATH = '/rpc/2.0/nlp/v1/keyword';
const TOPIC_PATH = '/rpc/2.0/nlp/v1/topic';


/**
 * AipNlp类
 *
 * @class
 * @extends BaseClient
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak  access key.
 * @param {string} sk  security key.
 */
class AipNlp extends BaseClient {
    constructor(appId, ak, sk) {
        super(appId, ak, sk);
    }
    commonImpl(param) {
        let httpClient = new HttpClient();
        let apiUrl = param.targetPath;
        delete param.targetPath;
        let requestInfo = new RequestInfo(apiUrl,
            param, METHOD_POST);
        return this.doRequest(requestInfo, httpClient);
    }

    /**
     * 词法分析接口
     *
     * @param {string} text - 待分析文本（目前仅支持GBK编码），长度不超过65536字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    lexer(text, options) {
        let param = {
            text: text,
            targetPath: LEXER_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 词法分析（定制版）接口
     *
     * @param {string} text - 待分析文本（目前仅支持GBK编码），长度不超过65536字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    lexerCustom(text, options) {
        let param = {
            text: text,
            targetPath: LEXER_CUSTOM_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 依存句法分析接口
     *
     * @param {string} text - 待分析文本（目前仅支持GBK编码），长度不超过256字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   mode 模型选择。默认值为0，可选值mode=0（对应web模型）；mode=1（对应query模型）
     * @return {Promise} - 标准Promise对象
     */
    depparser(text, options) {
        let param = {
            text: text,
            targetPath: DEP_PARSER_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 词向量表示接口
     *
     * @param {string} word - 文本内容（GBK编码），最大64字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    wordembedding(word, options) {
        let param = {
            word: word,
            targetPath: WORD_EMBEDDING_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * DNN语言模型接口
     *
     * @param {string} text - 文本内容（GBK编码），最大512字节，不需要切词
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    dnnlmCn(text, options) {
        let param = {
            text: text,
            targetPath: DNNLM_CN_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 词义相似度接口
     *
     * @param {string} word1 - 词1（GBK编码），最大64字节
     * @param {string} word2 - 词1（GBK编码），最大64字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   mode 预留字段，可选择不同的词义相似度模型。默认值为0，目前仅支持mode=0
     * @return {Promise} - 标准Promise对象
     */
    wordSimEmbedding(word1, word2, options) {
        let param = {
            word_1: word1,
            word_2: word2,
            targetPath: WORD_SIM_EMBEDDING_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 短文本相似度接口
     *
     * @param {string} text1 - 待比较文本1（GBK编码），最大512字节
     * @param {string} text2 - 待比较文本2（GBK编码），最大512字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   model 默认为"BOW"，可选"BOW"、"CNN"与"GRNN"
     * @return {Promise} - 标准Promise对象
     */
    simnet(text1, text2, options) {
        let param = {
            text_1: text1,
            text_2: text2,
            targetPath: SIMNET_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 评论观点抽取接口
     *
     * @param {string} text - 评论内容（GBK编码），最大10240字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   type 评论行业类型，默认为4（餐饮美食）
     * @return {Promise} - 标准Promise对象
     */
    commentTag(text, options) {
        let param = {
            text: text,
            targetPath: COMMENT_TAG_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 情感倾向分析接口
     *
     * @param {string} text - 文本内容（GBK编码），最大102400字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    sentimentClassify(text, options) {
        let param = {
            text: text,
            targetPath: SENTIMENT_CLASSIFY_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 文章标签接口
     *
     * @param {string} title - 篇章的标题，最大80字节
     * @param {string} content - 篇章的正文，最大65535字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    keyword(title, content, options) {
        let param = {
            title: title,
            content: content,
            targetPath: KEYWORD_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 文章分类接口
     *
     * @param {string} title - 篇章的标题，最大80字节
     * @param {string} content - 篇章的正文，最大65535字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    topic(title, content, options) {
        let param = {
            title: title,
            content: content,
            targetPath: TOPIC_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
}

module.exports = AipNlp;


}, function(modId) { var map = {"./client/baseClient":1622087906290,"./client/requestInfo":1622087906296,"./http/httpClientNlp":1622087906311,"./util/objectTools":1622087906293}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1622087906311, function(require, module, exports) {

/**
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file httpClientNlp类
 * @author baiduAip
 */
const iconv = require('iconv-lite');
const HttpClient = require('./httpClient');
const objectTools = require('../util/objectTools');
const request = require('request');
const code = require('../const/code');

/**
 * HttpClientNlp类
 * nlp接口调用使用GBK编码解码实现,依赖iconv-lite库
 * @see https://github.com/ashtuchkin/iconv-lite
 *
 * @class
 * @extends HttpClient
 * @constructor
 */
class HttpClientNlp extends HttpClient {
    constructor() {
        super();
    }
    req(options) {
        // 首先处理设置INTERCEPTOR的情况
        if (objectTools.isFunction(HttpClient.REQUEST_INTERCEPTOR)) {
            options = HttpClient.REQUEST_INTERCEPTOR(options);
        // 其次设置全局request options的
        } else if (objectTools.isObject(HttpClient.REQUEST_GLOBAL_OPTIONS)) {
            options = objectTools.merge(HttpClient.REQUEST_GLOBAL_OPTIONS, options);
        }

        return new Promise(function(resolve, reject) {
            request(options, function(error, response, body) {
                if (error === null) {
                    let buffer = new Buffer(body);
                    let decodedBody = iconv.decode(buffer, code.GBK);
                    try {
                        resolve(JSON.parse(decodedBody));
                    } catch (e) {
                        // 无法解析json请求，就返回原始body
                        resolve(decodedBody);
                    }
                } else {
                    reject(error);
                }
            });
        });
    }
    postWithInfo(requestInfo) {
        let body = this.createBody(requestInfo.params);
        let options = {
            method: requestInfo.method,
            url: requestInfo.getUrl(),
            headers: requestInfo.headers,
            encoding: null,
            timeout: HttpClient.DEFAULT_TIMEOUT,
            body: body
        };
        return this.req(options);
    }
    createBody(param) {
        let body = null;
        body = iconv.encode(JSON.stringify(param), code.GBK);
        return body;
    }
}

module.exports = HttpClientNlp;
}, function(modId) { var map = {"./httpClient":1622087906292,"../util/objectTools":1622087906293,"../const/code":1622087906306}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1622087906312, function(require, module, exports) {

/**
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file AipKg.js
 * @author baidu aip
 */



const BaseClient = require('./client/baseClient');

const RequestInfo = require('./client/requestInfo');

const HttpClient = require('./http/httpClient');

const objectTools = require('./util/objectTools');

const METHOD_POST = 'POST';

const CREATE_TASK_PATH = '/rest/2.0/kg/v1/pie/task_create';
const UPDATE_TASK_PATH = '/rest/2.0/kg/v1/pie/task_update';
const TASK_INFO_PATH = '/rest/2.0/kg/v1/pie/task_info';
const TASK_QUERY_PATH = '/rest/2.0/kg/v1/pie/task_query';
const TASK_START_PATH = '/rest/2.0/kg/v1/pie/task_start';
const TASK_STATUS_PATH = '/rest/2.0/kg/v1/pie/task_status';


/**
 * AipKg类
 *
 * @class
 * @extends BaseClient
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak  access key.
 * @param {string} sk  security key.
 */
class AipKg extends BaseClient {
    constructor(appId, ak, sk) {
        super(appId, ak, sk);
    }
    commonImpl(param) {
        let httpClient = new HttpClient();
        let apiUrl = param.targetPath;
        delete param.targetPath;
        let requestInfo = new RequestInfo(apiUrl,
            param, METHOD_POST);
        return this.doRequest(requestInfo, httpClient);
    }

    /**
     * 创建任务接口
     *
     * @param {string} name - 任务名字
     * @param {string} templateContent - json string 解析模板内容
     * @param {string} inputMappingFile - 抓取结果映射文件的路径
     * @param {string} outputFile - 输出文件名字
     * @param {string} urlPattern - url pattern
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   limit_count 限制解析数量limit_count为0时进行全量任务，limit_count&gt;0时只解析limit_count数量的页面
     * @return {Promise} - 标准Promise对象
     */
    createTask(name, templateContent, inputMappingFile, outputFile, urlPattern, options) {
        let param = {
            name: name,
            template_content: templateContent,
            input_mapping_file: inputMappingFile,
            output_file: outputFile,
            url_pattern: urlPattern,
            targetPath: CREATE_TASK_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 更新任务接口
     *
     * @param {integer} id - 任务ID
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   name 任务名字
     *   template_content json string 解析模板内容
     *   input_mapping_file 抓取结果映射文件的路径
     *   url_pattern url pattern
     *   output_file 输出文件名字
     * @return {Promise} - 标准Promise对象
     */
    updateTask(id, options) {
        let param = {
            id: id,
            targetPath: UPDATE_TASK_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 获取任务详情接口
     *
     * @param {integer} id - 任务ID
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    getTaskInfo(id, options) {
        let param = {
            id: id,
            targetPath: TASK_INFO_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 以分页的方式查询当前用户所有的任务信息接口
     *
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   id 任务ID，精确匹配
     *   name 中缀模糊匹配,abc可以匹配abc,aaabc,abcde等
     *   status 要筛选的任务状态
     *   page 页码
     *   per_page 页码
     * @return {Promise} - 标准Promise对象
     */
    getUserTasks(options) {
        let param = {
            targetPath: TASK_QUERY_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 启动任务接口
     *
     * @param {integer} id - 任务ID
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    startTask(id, options) {
        let param = {
            id: id,
            targetPath: TASK_START_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 查询任务状态接口
     *
     * @param {integer} id - 任务ID
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    getTaskStatus(id, options) {
        let param = {
            id: id,
            targetPath: TASK_STATUS_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
}

module.exports = AipKg;


}, function(modId) { var map = {"./client/baseClient":1622087906290,"./client/requestInfo":1622087906296,"./http/httpClient":1622087906292,"./util/objectTools":1622087906293}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1622087906313, function(require, module, exports) {

/**
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file AipSpeech
 * @author baiduAip
 */
const BaseClient = require('./client/baseClient');

const RequestInfo = require('./client/requestInfo');

const objectTools = require('./util/objectTools');

const HttpClientVoiceASR = require('./http/httpClientVoiceASR');

const HttpClientVoiceTTS = require('./http/httpClientVoiceTTS');

const code = require('./const/code');

const httpHeader = require('./const/httpHeader');

const METHOD_POST = 'POST';

const CONTENT_TYPE_JSON = 'application/json';

const HOST_VOP = 'vop.baidu.com';
const HOST_TSN = 'tsn.baidu.com';
const PATH_VOP = '/server_api';
const PATH_TTS = '/text2audio';

/**
 * AipSpeech类，构造调用语音接口
 *
 * @class
 * @extends BaseClient
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak  access key.
 * @param {string} sk  security key.
 */
class AipSpeech extends BaseClient {
    constructor(appId, ak, sk) {
        // 在speech.baidu.com上创建的应用需要跳过此项权限检查
        super(appId, ak, sk, {isSkipScopeCheck: true});
    }

    recognize(buffer, format, rate, options) {
        let param = {
            speech: buffer && buffer.toString(code.BASE64),
            format: format,
            rate: rate,
            channel: 1,
            len: buffer && buffer.toString(code.BIN).length
        };

        return this.asrImpl(objectTools.merge(param, options));
    }

    recognizeByUrl(url, callback, format, rate, options) {
        let param = {
            url: url,
            format: format,
            rate: rate,
            channel: 1,
            callback: callback
        };
        return this.asrImpl(objectTools.merge(param, options));
    }

    asrImpl(param) {
        let httpClient = new HttpClientVoiceASR();
        let requestInfo = new RequestInfo(PATH_VOP, param, METHOD_POST, false, {
                [httpHeader.CONTENT_TYPE]: CONTENT_TYPE_JSON
            });
        requestInfo.setHost(HOST_VOP);
        return this.doRequest(requestInfo, httpClient);
    }

    text2audio(text, options) {
        let param = {
            tex: text,
            lan: 'zh',
            ctp: 1
        };
        return this.ttsImpl(objectTools.merge(param, options));
    }

    ttsImpl(param) {
        let httpClient = new HttpClientVoiceTTS();
        let requestInfo = new RequestInfo(PATH_TTS,
            param, METHOD_POST, true);

        requestInfo.setHost(HOST_TSN);

        return this.doRequest(requestInfo, httpClient);
    }

}

module.exports = AipSpeech;

}, function(modId) { var map = {"./client/baseClient":1622087906290,"./client/requestInfo":1622087906296,"./util/objectTools":1622087906293,"./http/httpClientVoiceASR":1622087906314,"./http/httpClientVoiceTTS":1622087906315,"./const/code":1622087906306,"./const/httpHeader":1622087906297}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1622087906314, function(require, module, exports) {

/**
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file httpClientExt类
 * @author baiduAip
 */

const HttpClient = require('./httpClient');
const crypto = require('crypto');

/**
 * HttpClientVoice类
 * 百度语音接口调用封装
 * 参考文档：http://speech.baidu.com/docs/asr/57
 *
 * @class
 * @extends HttpClient
 * @constructor
 */
class HttpClientVoiceASR extends HttpClient {
    constructor() {
        super();
    }
    postWithInfo(requestInfo) {
        requestInfo.params.token = requestInfo.getAccessToken();
        if (requestInfo.params.token === null) {
            requestInfo.params.token = 'bcekey';
        }
        if (typeof requestInfo.params.cuid === 'undefined') {
            requestInfo.params.cuid = this.genMd5(requestInfo.params.token);
        }
        let body = this.createBody(requestInfo.params);
        let options = {
            method: requestInfo.method,
            url: requestInfo.getPureUrl(),
            headers: requestInfo.headers,
            encoding: null,
            timeout: HttpClient.DEFAULT_TIMEOUT,
            body: body
        };

        return this.req(options);
    }
    createBody(param) {
        let body = JSON.stringify(param);
        return body;
    }
    genMd5(str) {
        let md5sum = crypto.createHash('md5');
        md5sum.update(str);
        str = md5sum.digest('hex');
        return str;
    }
}

module.exports = HttpClientVoiceASR;
}, function(modId) { var map = {"./httpClient":1622087906292}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1622087906315, function(require, module, exports) {

/**
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file httpClientExt类
 * @author baiduAip
 */

const HttpClient = require('./httpClient');
const crypto = require('crypto');

/**
 * HttpClientVoice类
 * 百度语音接口调用封装
 * 参考文档：http://speech.baidu.com/docs/asr/57
 *
 * @class
 * @extends HttpClient
 * @constructor
 */
class HttpClientVoiceTTS extends HttpClient {
    constructor() {
        super();
    }
    postWithInfo(requestInfo) {
        requestInfo.params.tok = requestInfo.getAccessToken();
        if (requestInfo.params.tok === null) {
            requestInfo.params.tok = 'bcekey';
        }
        if (typeof requestInfo.params.cuid === 'undefined') {
            requestInfo.params.cuid = this.genMd5(requestInfo.params.tok);
        }

        let options = {
            method: requestInfo.method,
            url: requestInfo.getPureUrl(),
            headers: requestInfo.headers,
            encoding: null,
            timeout: HttpClient.DEFAULT_TIMEOUT,
            form: requestInfo.params
        };

        return this.req(options).then(function(data) {
            if (data instanceof Buffer) {
                return {data: data}
            }
            return data;
        });
    }
    genMd5(str) {
        let md5sum = crypto.createHash('md5');
        md5sum.update(str);
        str = md5sum.digest('hex');
        return str;
    }
}

module.exports = HttpClientVoiceTTS;
}, function(modId) { var map = {"./httpClient":1622087906292}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1622087906288);
})()
//# sourceMappingURL=index.js.map
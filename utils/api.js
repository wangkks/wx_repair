import {
    get,
    post,
    postNomsg,
    getNomsg
} from "../plugins/http"
export const api = {
    getSystemTime: get("wxapp-seckill/api/c/site/getTime", false), //商品列表
    guideList: post("wxapp-pianpian/buyer/goods/list"), //商品列表
}
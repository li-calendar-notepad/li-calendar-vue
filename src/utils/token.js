// 本地持久性存储（参考layui.data）
import store from '../store/index'

const token={}

token.set = function(newToken){
    store.commit("setToken", newToken);
}

token.get = function () {
    console.log("tokrn",store.getters.token)
   return store.getters.token;
}

export default token;
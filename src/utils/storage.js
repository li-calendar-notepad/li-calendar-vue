// 本地持久性存储（参考layui.data）


var storage={}

storage.local=(key,value)=>{
    
    if (value){
        return localStorage.setItem(key, value)
    }else{
        return localStorage.getItem(key)
    }
}

storage.data = function (table, settings, storage) {
    table = table || 'e_cloud_disk';
    storage = storage || localStorage;
    var data={}
    if (!window.JSON || !window.JSON.parse) return;

    //如果settings为null，则删除表
    if (settings === null) {
        return delete storage[table];
    }

    settings = typeof settings === 'object'
        ? settings
        : { key: settings };

    try {
        data = JSON.parse(storage[table]);
    } catch (e) {
        data = {};
    }
    
    if ('value' in settings) {
        data=data||{}
        data[settings.key] = settings.value
    }
    
    if (settings.remove) delete data[settings.key];
    storage[table] = JSON.stringify(data);
    
    return settings.key ? (data ? data[settings.key] : data) : data;
};

//本地会话性存储
storage.sessionData = function (table, settings) {
    return this.data(table, settings, sessionStorage);
}

// 获取一个值
storage.getValue = function (table,key){
    let res = this.data(table, key);
    // console.log('获取配置', table, key, "值", res)
    return res;
}


// 设置一个值
storage.setValue = function (table, key,value) {
    // 删除table
    if (key === null) {
        this.data(table, null);
        return true
    }
    // 删除key
    if (value===null){
        this.data(table, { 'key': key, 'remove': true });
        return true
    }
    var res = this.data(table, { 'key': key, 'value': value});
    if (!res) {
        return null;
    } else {
        return res[key];
    }
}
export default storage;
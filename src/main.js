import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import cmn from '../src/utils/cmn'
import 'element-plus/dist/index.css'
import './assets/main.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/dark/css-vars.css'

import App from './App.vue'
import router from './router'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import { useDark, useToggle } from '@vueuse/core'
// 暗黑模式
useDark()

// 国际化插件
import { createI18n } from 'vue-i18n'
import language from './utils/language'

const i18n = createI18n({
    legacy :false,
    locale: 'zh-CN', 
    // locale: 'en-US',
    fallbackLocale: 'zh-CN', 
    messages: language, // set locale messages
    // If you need to specify other options, you can set other options
    // ...
})


const app = createApp(App)


app.use(router)
app.use(i18n)

app.use(ElementPlus, { locale:zhCn })
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

window.global={
    cmn: cmn
}

app.mount('#app')

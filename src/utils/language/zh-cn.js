export default {
    common: {
        appName: "锂日历",
        admin: "后台管理",
        username: "账号",
        password: "密码",
        locked: "已加密",
        yes: "是",
        no: "否",
        save_success: "保存成功",
        save_error: "保存失败",
        delete_success: "删除成功",
        delete_error: "删除失败",
        warning: "警告",
        default: "默认",
        getVCode: "获取验证码",
        getAgain: "再次获取",
        commit: "提交",
        sendVCodeMailSuccess: "验证码已经下发至邮箱，请注意查收",

        home: "首页",
        shorthand: "速记",
        message: "消息",
        setting: "设置",
        manage: "管理",
        logout: "退出",
        mail: "邮箱",

        logoutSafely: "安全退出",
        editUserInfo: "修改个人资料",

        webSite: "站点",
        user: "用户",
        style: "风格",
        specialDay: "特殊日期",
        manage: "管理",
        other: "其他",
        save: "保存",
        startUse: "启用",
        stopUse: "停用",
        status: "状态",
        role: "角色",
        name: "名称",
        edit: "编辑",
        notActive: "未激活",
        normal: "正常",
        update: "修改",
        create: "创建",
        complete: "完成",
        operation: "操作",
        import: "导入",
        export: "导出",
        preview: "预览",
        backgroundColor: "背景颜色",
        fail: "失败",
        identify: "标识",

        importSuccess: "导入成功",
        importFail: "导入成功",
        updateDate: "更新日期",
        remark: "备注",
        startTime: "开始时间",
        endTime: "结束时间",
        detail: "详情",
        about:"关于",
    },
    form: {
        required: "必填项",
        max: "不允许超过{num}个字符",
        twoPasswordNotAlike: "两次密码不一致",
        passwordAgain: "请再次输入密码",
    },
    login: {
        login: "登录",
        forget_password: "忘记密码？",
        register: "注册",
        username_empty: "账号不可为空",
        password_empty: "密码不可为空",
        v_code_empty: "验证码不可为空",
        v_code_format: "验证码必须为四位",
        password_empty: "密码不可为空",
        loginSuccess: "你好，{name}",
        clickCaptcha: "点击刷新图形验证码",
        captchaPlaceholder: "请输入验证码",
    },
    register: {
        register: "注册",

        usernamePlaceholder: "请输入邮箱作为登录账号",
        passwordPlaceholder: "请输入密码",
        passwordAgainPlaceholder: "请再次输入密码",
        vCodePlaceholder: "请输入验证码",

        commitRegister: "提交注册",
        goToLogin: "前往登录页面",
        registerSuccess: "注册成功，即将跳转至登录页面",
    },
    resetPassword: {
        title: "重置密码",
        success: "密码重置成功"
    },
    home: {
        my_project: "我的日历",
        create_new_item: "创建新日历",
        not_have_item: "目前还没有日历，快去创建一个吧",
        new_item_box: {
            content: "请输入标题",
            title: "新建日历",
            inputErrorMessage: "标题必填",
            create_success_item_message: "已创建日历：{itemName}",
        }
    },
    homeLayout: {
        logout: "确认要退出登录吗？",
        logoutSuccess: "你已经安全退出，下次见，即将跳转到登录页面",
    },
    // 更新用户资料
    userInfoUpdate: {
        title: "个人资料",
        subTitleInfoUpdate: "资料修改",
        subTitlePassUpdate: "密码修改",
        headImage: "头像",
        nickname: "昵称",
        editInfo: "编辑资料",
        clickImageUpdate: "点击图片修改",
        submit: "确认修改",
        oldPass: "旧密码",
        newPass: "新密码",
        headImageUploadError: "头像上传错误，",
        headImageSizeOverflow: "尺寸不可超过{size}"
    },
    calendar: {
        common: {
            itemVisitPasswordError: "格式不正确(4-10位 可以是大小写字母、数字)",
        },
        password_box: {
            title: "访问密码",
            text: "{itemTitle}为加密项目，请输入密码继续访问",
            confirmButtonText: "确认",
            cancelButtonText: "找回密码",
        },
        toolbar: {
            setting: "项目设置",
            info: "项目信息",
            subject: "事件主题管理",
        },
        eventEdit: {
            // title: "标题",
            title_placeholder: "标题（不超过255个文字）",
            content: "内容",
            content_placeholder: "内容（可选）",
            startTime: "开始时间",
            startTime_placeholder: "选择开始时间",
            endTime: "结束时间",
            endTime_placeholder: "选择结束时间",
            style: "风格",
            style_placeholder: "选择事件风格",
            remind: "设置提醒",
            remind_placeholder: "设置提醒",
            updateEvent: "更新事件",
            addEvent: "添加事件",
            successed: "已保存",
            created: "已经成功创建事件，你可以继续编写",
            timeNotEmpty: "开始和结束时间不可以为空"
        },
        subject: {
            title: "事件模板",
            addSubject: "新增模板",
            deleteSubject_msg_box: "确定删除该事件模板 {subjectTitle}"

        },
        subjectEdit: {
            title: "名称",
            title_placeholder: "比如：运动",
            startTime: "开始时间",
            startTime_placeholder: "选择开始时间",
            endTime: "结束时间",
            endTime_placeholder: "选择结束时间",
            style: "风格",
            style_placeholder: "选择事件风格",
            remind: "设置提醒",
            remind_placeholder: "设置提醒"
        },
        setting: {
            title: "设置",
            save_button: "保存",
            delete_button: "删除此项目",
            delete_item_warning_content: "如果你确认删除，请下框内输入项目标题[ {itemTitle} ]",
            delete_item_check_error: "标题输入的不正确",
            base: {
                title: "基础设置",
                item_name: "日历名称",
                item_description: "日历描述",
                item_password: "日历密码",
                item_password_placeholder: "4-10位,允许大小写字母、数字"
            },
            style: {
                title: "风格设置",
                weekStartDay: "周起始日",
                monthViewMaxEvent: "月视图显示条数",
                monthViewMaxEvent_placeholder: "空:自动,999:全部",
                weekNumbers: "显示周次",
                dayTimeDisplayMode: "日程时间显示",
                weekStartDayItem: {
                    placeholder: "周开始",
                    sun: "周日",
                    mon: "周一",
                },
                dayTimeDisplayModeItem: {
                    all: "开始和结束时间",
                    onlyStart: "只显示开始时间",
                    noOne: "不显示任何时间",
                },
                dayTimeDisplayModeItem: {
                    all: "开始和结束时间",
                    onlyStart: "只显示开始时间",
                    noOne: "不显示任何时间",
                },

            },
            specialDay: {
                title: "特殊的日期（法定假期等）",
                specialDaySpecial: {
                    placeholder: "请选择特殊的日期",
                    title: "方案",
                },
                holidayBackgroundColor: "节假日背景色",
                textDisplay: "显示文字"
            }
        },
        search: {
            title: "查找事件",
        },
        calendarInfo: {
            none: "(暂无)",
            createTime: "日历创建时间",
            firstEventStartTime: "首个事件时间",
            lastEventStartTime: "最新一个事件时间",
        },
        other: {
            findPassword: "找回日历密码",
            findPasswordByEmail: "确定将此日历的密码以邮件的方式发送至你的邮箱？",
            findPasswordSendEmailSuccess: "邮件已经发送至你的邮箱，请注意查收",
        }

    },
    userSetting: {
        darkMode: "深色模式"
    },
    // 管理平台的站点信息设置
    adminSiteSetting: {
        loginSetting: "登录设置",
        TurnOnGraphicCaptcha: "开启图形验证码",
        registerOpenUp: "开放注册",
        registerRestrictMailSuf: "限制邮箱后缀",

        registerRestrictMailSufContent: "限制新注册邮箱的后缀，一般用于企业邮箱。后台添加用户时不受影响",
        siteAddress: "站点地址",
        siteAddressPlaceholder: "应用于外部跳转到主站，例如邮件内等",
        siteGetCurrentUrl: "获取当前地址",
        siteAddressFormatError: "网站地址格式不正确"
    },
    // 管理平台的邮箱设置
    adminEmail: {
        host: "服务器地址",
        port: "服务器端口",
        email: "发信邮箱",
        password: "邮箱密码",
        hostPlaceholder: "SMTP服务器地址",
        portPlaceholder: "SMTP服务器端口(一般为25,465,587)",
        emailPlaceholder: "邮箱地址",
        passwordPlaceholder: "密码或授权码",
        mailFormatError: "邮箱格式不正确",
    },
    // 管理平台的用户管理
    adminUsers: {
        adminUser: "管理员",
        user: "普通用户",
        createUser: "创建用户",
        usernamePlaceholder: "请输入邮箱格式",
        delTip: "请确认是否删除用户"
    },
    // 管理平台的风格管理
    adminStyle: {
        delTip: "确定删除该风格样式: ",
        englishIdentify: "英文标识",
        emptyCheckExport: "请在列表中选中要导出的项",
        eventTitle: "预览标题文字",
        eventTitlePlaceholder: "英文标识（唯一）",
        aloneSettingBorderColor: "单独设置边框颜色",
        borderColor: "边框颜色",
        textColor: "文字颜色",
        styleNamePlaceholder: "名称（唯一）",
    },
    // 管理平台特殊日期
    adminSpecialDay: {
        delTip: "确定要删除方案: ",
        schemeName: "方案名称",
        isHoliday: "是否为假期",
    },
};
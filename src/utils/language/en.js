export default {
    common: {
        appName: "Li-Calendar",
        admin: "Admin",
        username: "Username",
        password: "Password",
        locked: "Locked",
        yes: "Yes",
        no: "No",
        save_success: "Save success",
        save_error: "Save error",
        delete_success: "Delete success",
        delete_error: "Delete error",
        warning: "Warning",
        default: "Default",
        getVCode: "Get verification code",
        getAgain: "Get again",
        commit:"Submit",
        sendVCodeMailSuccess: "Verification code has been sent to your email, please check",

        home: "Home",
        shorthand: "Shorthand",
        message: "Message",
        setting: "Setting",
        manage: "Manage",
        logout: "Logout",
        mail: "Mail",

        logoutSafely: "Logout safely",
        editUserInfo: "Edit user info",

        webSite: "Web site",
        user: "User",
        style: "Style",
        specialDay: "Special day",
        manage: "Manage",
    },
    form: {
        required: "Required",
        max: "Maximum {num} characters",
        twoPasswordNotAlike: "The two passwords are not the same",
        passwordAgain: "Please enter password again",
    },
    login: {
        login: "Login",
        forget_password: "Forget password?",
        register: "Register",
        username_empty: "Username is required",
        password_empty: "Password is required",
        v_code_empty: "Verification code is required",
        v_code_format: "Verification code must be four digits",
        password_empty: "Password is required",
        loginSuccess: "Hello, {name}",
        clickCaptcha: "Click to refresh the captcha",
        captchaPlaceholder: "Please enter captcha",
    },
    register: {
        register: "Register",

        usernamePlaceholder: "Enter your email as login account",
        passwordPlaceholder: "Enter password",
        passwordAgainPlaceholder: "Please enter password again",
        vCodePlaceholder: "Enter verification code",

        commitRegister: "Submit registration",
        goToLogin: "Go to login page",
        registerSuccess: "Registration success, redirecting to login page",
    },
    resetPassword: {
        title: "Reset password",
        success: "Password reset success"
    },
    home: {
        my_project: "My calendar",
        create_new_item: "Create new item",
        not_have_item: "No calendars yet, hurry up and create one",
        new_item_box: {
            content: "Please enter title",
            title: "New calendar",
            inputErrorMessage: "Title is required",
            create_success_item_message: "Calendar created: {itemName}",
        }
    },
    homeLayout: {
        logout: "Are you sure you want to log out?",
        logoutSuccess: "You have safely logged out, see you next time, redirecting to login page",
    },
    // Update user info
    userInfoUpdate: {
        title: "User info",
        subTitleInfoUpdate: "Info update",
        subTitlePassUpdate: "Password update",
        headImage: "Avatar",
        nickname: "Nickname",
        editInfo: "Edit info",
        clickImageUpdate: "Click image to update",
        submit: "Confirm update",
        oldPass: "Old password",
        newPass: "New password",
        headImageUploadError: "Avatar upload error,",
        headImageSizeOverflow: "Size cannot exceed {size}"
    },
    calendar: {
        common:{
            itemVisitPasswordError: "Invalid format (4-10 digits of uppercase and lowercase letters and numbers)",
        },
        password_box: {
            title: "Access password",
            text: "{itemTitle} is an encrypted item, please enter the password to continue accessing",
            confirmButtonText: "Confirm",
            cancelButtonText: "Find password",
        },
        toolbar: {
            setting: "Item setting",
            info: "Item info",
            subject: "Event subject management",
        },
        eventEdit: {
            // title: "Title",
            title_placeholder: "Title (up to 255 characters)",
            content: "Content",
            content_placeholder: "Content (optional)",
            startTime: "Start time",
            startTime_placeholder: "Select start time",
            endTime: "End time",
            endTime_placeholder: "Select end time",
            style: "Style",
            style_placeholder: "Select event style",
            remind: "Set reminder",
            remind_placeholder: "Set reminder",
            updateEvent: "Update event",
            addEvent: "Add event",
            successed: "Saved",
            created: "Event created successfully, you can continue editing"
        },
        subject: {
            title: "Event templates",
            addSubject: "Add template",
            deleteSubject_msg_box: "Are you sure you want to delete this event template {subjectTitle}"
        },
        subjectEdit: {
            title: "Name",
            title_placeholder: "For example: Exercise",
            startTime: "Start time",
            startTime_placeholder: "Select start time",
            endTime: "End time",
            endTime_placeholder: "Select end time",
            style: "Style",
            style_placeholder: "Select event style",
            remind: "Set reminder",
            remind_placeholder: "Set reminder"
        },
        setting: {
            title: "Setting",
            save_button: "Save",
            delete_button: "Delete this item",
            delete_item_warning_content: "If you confirm deletion, please enter the item title [ {itemTitle} ] in the box below",
            delete_item_check_error: "Title entered is incorrect",
            base: {
                title: "Basic settings",
                item_name: "Calendar name",
                item_description: "Calendar description",
                item_password: "Calendar password",
                item_password_placeholder:"4-10 digits of uppercase and lowercase letters and numbers"
            },
            style: {
                title: "Style settings",
                weekStartDay: "Week start day",
                monthViewMaxEvent: "Maximum number of events displayed in month view",
                monthViewMaxEvent_placeholder: "Blank: automatic, 999: all",
                weekNumbers: "Show week numbers",
                dayTimeDisplayMode: "Schedule time display",
                weekStartDayItem: {
                    placeholder: "Week start",
                    sun: "Sun",
                    mon: "Mon",
                },
                dayTimeDisplayModeItem: {
                    all: "Start and end time",
                    onlyStart: "Only show start time",
                    noOne: "Do not show any time",
                }
            },
            specialDay: {
                title: "Special dates (public holidays, etc.)",
                specialDaySpecial: {
                    placeholder: "Select special date",
                    title: "Plan",
                },
                holidayBackgroundColor: "Holiday background color",
                textDisplay:"Text display"
            }
        },
        search: {
            title: "Search event",
        },
        calendarInfo: {
            none: "(None)",
            createTime: "Calendar creation time",
            firstEventStartTime: "First event time",
            lastEventStartTime: "Latest event time",
        },
        other:{
            findPassword:"Find calendar password",
            findPasswordByEmail: "Are you sure to send the password of this calendar to your email?",
            findPasswordSendEmailSuccess: "The email has been sent to your mailbox, please check",
        }
    }
};
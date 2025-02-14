import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        appName: "Sumeet",
        // 登入頁面英文
        welcome_back: "Welcome back",
        please_sign_in: "Please sign in to continue",
        gotoDashboard: "Go to Dashboard",
        // 首頁頁面英文
        title: "Never Take Meeting Notes Again",
        description:
          "Transform the way you meet with AI-driven transcription, summaries, and insights. Focus on the conversation, and we'll handle the documentation.",
        freeStart: "Start for Free",
        whyChoose: "Why Choose Sumeet",
        howItWorks: "How It Works",
        uploadRecording: "Upload recording",
        aiProcessing: "AI Processing",
        shareCollaborate: "Share & Collaborate",
        feature1: "Smart Transcription",
        feature1Desc:
          "Automatic transcription with speaker detection and timestamps",
        feature2: "Team Collaboration",
        feature2Desc:
          "Share insights and collaborate with your team in real-time",
        feature3: "Secure & Private",
        feature3Desc: "Enterprise-grade security with end-to-end encryption",
        feature4: "Multi-language Support",
        feature4Desc:
          "Support for multiple languages and automatic translation",
        uploadDescription: "Upload your meeting recording in any format",
        aiProcessingDescription:
          "Our AI automatically transcribes and summarizes your meeting",
        shareCollaborateDescription:
          "Share insights with your team and collaborate effectively",
        SumeetDescription:
          "Transform your virtual meetings with AI-powered features and seamless collaboration.",
        quickLinks: "Quick Links",
        login: "Login",
        signUp: "Sign Up",
        legal: "Legal",
        privacyPolicy: "Privacy Policy",
        termsOfService: "Terms of Service",
        startDashboard: "Start Dashboard",
        HELLO:"Hello",
        googleLogin:"Login with Google",
        footer: {
          title: "Sumeet",
          description: "Transform your virtual meetings with AI-powered features and seamless collaboration.",
          quickLinks: "Quick Links",
          login: "Login",
          signUp: "Sign Up",
          legal: "Legal",
          privacyPolicy: "Privacy Policy",
          termsOfService: "Terms of Service",
          copyright: "All rights reserved.",
        },
        // Dashboard導覽頁面中文
        profile: "Settings",
        welcome_user: "Welcome, {{name}}!",
        guest: "Guest",
        meetingNotes: "Meeting Notes",
        meeting_notes: "Meeting Notes",
        upload_meeting: "Upload Meeting",
        new_meeting: "New Meeting",
        home: "Home",
        upload: "Upload",
        uploadingAndGenerating: "uploading and generating summary",
        newestFirst: "Newest first",
        oldestFirst: "Oldest first",
        selectMeetings: "Select meetings",
        filterByTags: "Filter by tags",
        deleteMeetings: "Delete Meeting",
        clearAll: "Clear all",
        logout: "Logout",
        english_short: "English",
        chinese_short: "Chinese",
        dashboard: "Dashboard",

        // ProfilePage相關翻譯英文
        profile_headerTitle: "Profile",
        profile_statsTitle: "Stats",
        profile_activityFeedTitle: "Recent Activities",
        profile_settingsTitle: "Settings",
        profile_editModalTitle: "Edit Profile",
        profile_activities: {
          upload: 'Uploaded "{{title}}"',
          process: 'Completed processing "{{title}}"',
          edit: "Updated profile information",
        },
        profile_settings: {
          lineNotifications: "Line Notifications",
          emailNotifications: "Email Notifications",
          lineNotificationsDesc: "Receive Line notification updates about your meetings",
          emailNotificationsDesc: "Receive email updates about your meetings",
          systemAlerts: "System Alerts",
          systemAlertsDesc: "Get notified when processing is complete",
          darkMode: "Dark Mode",
          darkModeDesc: "Switch between light and dark themes",
        },
        upload_meeting_Btn: {
          uploadMeetingRecording: "Upload Meeting Recording",
          dragAndDrop: "Drag and drop your recording file here, or",
          browse: "browse",
          uploadRecording: "Upload Recording",
          successNotification: "Meeting summary completed!",
          errorNotification: "Upload failed!",
        },
        meetingPage: {
          joinRoom: "Join a Video Room",
          participant: "Participant",
          room: "Room",
          joinButton: "Join!",
          roomTitle: "Room",
          leaveRoom: "Leave Room",
        },
        chatbot: {
          name: "Forgetful Buddy",
          header: "I am here and ready to answer in minutes",
          footer: "I will solve your problem!",
          send: "Send",
          placeholder: "Write a message",
        },
        Transcript: "Transcript",
        Summary: "Summary",
        confirmDelete: "Confirm Delete",
        confirmRegenerate: "Confirm Regenerate",
        regenerateMeetings: "Regenerate Meetings",
        confirm: "Confirm",
        cancel: "Cancel",
      },
    },
    zh: {
      translation: {
        appName: "AI智匯雲",
        // 登入頁面中文
        welcome_back: "歡迎回來",
        please_sign_in: "請登錄以繼續",
        gotoDashboard: "前往控制面板",
        // 首頁頁面中文
        title: "永不再記會議筆記",
        description:
          "使用AI驅動的文字記錄、摘要和見解，轉變你的會議方式。專注於對話，我們來處理文檔。",
        freeStart: "免費開始",
        whyChoose: "為什麼選擇 AI智匯雲",
        howItWorks: "如何運作",
        uploadRecording: "上傳會議記錄",
        aiProcessing: "AI處理",
        shareCollaborate: "分享與協作",
        feature1: "智慧文字記錄",
        feature1Desc: "自動文字轉錄，帶有講者識別和時間戳",
        feature2: "團隊協作",
        feature2Desc: "即時分享見解並與團隊協作",
        feature3: "安全與隱私",
        feature3Desc: "企業級安全性，端對端加密",
        feature4: "多語言支援",
        feature4Desc: "支援多語言及自動翻譯",
        uploadDescription: "上傳你的會議錄音，支持任何格式",
        aiProcessingDescription: "我們的AI會自動轉錄並總結你的會議",
        shareCollaborateDescription: "與你的團隊分享見解並有效協作",
        SumeetDescription: "使用AI功能和無縫協作，徹底改變你的虛擬會議。",
        quickLinks: "快速連結",
        login: "登入",
        signUp: "註冊",
        legal: "法律",
        privacyPolicy: "隱私政策",
        termsOfService: "服務條款",
        startDashboard: "開始使用控制面板",
        HELLO:"您好",
        googleLogin:"使用Google登錄",
        footer: {
          title: "AI智匯雲",
          description: "利用 AI 功能和無縫協作，改變您的虛擬會議體驗。",
          quickLinks: "快速連結",
          login: "登入",
          signUp: "註冊",
          legal: "法律條款",
          privacyPolicy: "隱私政策",
          termsOfService: "服務條款",
          copyright: "版權所有。",
        },
        // Dashboard導覽頁面中文
        profile: "設定",
        welcome_user: "歡迎, {{name}}!",
        guest: "訪客",
        meetingNotes: "會議筆記",
        meeting_notes: "會議筆記",
        upload_meeting: "上傳會議",
        new_meeting: "新增會議",
        home: "首頁",
        upload: "上傳",
        uploadingAndGenerating: "正在上傳並生成摘要",
        newestFirst: "最新優先",
        oldestFirst: "最舊優先",
        selectMeetings: "選擇會議",
        filterByTags: "篩選標籤",
        deleteMeetings: "刪除會議",
        clearAll: "清除所有篩選條件",
        logout: "登出",
        english_short: "英文",
        chinese_short: "中文",
        dashboard: "控制面板",
        // ProfilePage相關翻譯中文
        profile_headerTitle: "個人資料",
        profile_statsTitle: "統計資料",
        profile_activityFeedTitle: "最近活動",
        profile_settingsTitle: "設定",
        profile_editModalTitle: "編輯個人資料",
        profile_activities: {
          upload: '上傳了「{{title}}」',
          process: '完成處理「{{title}}」',
          edit: "更新了個人資料",
        },
        profile_settings: {
          lineNotifications: "Line通知",
          lineNotificationsDesc: "接收有關您會議的Line通知",
          emailNotifications: "電子郵件通知",
          emailNotificationsDesc: "接收有關您會議的電子郵件更新",
          systemAlerts: "系統提醒",
          systemAlertsDesc: "在處理完成時獲取通知",
          darkMode: "深色模式",
          darkModeDesc: "在淺色和深色主題之間切換",
        },
        
        upload_meeting_Btn: {
          uploadMeetingRecording: "上傳會議錄音",
          dragAndDrop: "將會議文件拖曳到這裡，或",
          browse: "瀏覽",
          uploadRecording: "上傳會議記錄",
          successNotification: "會議總結已完成!",
          errorNotification: "上傳失敗!",
        },
        meetingPage: {
          joinRoom: "加入視訊會議",
          participant: "參與名",
          room: "房間",
          joinButton: "加入！",
          roomTitle: "房間",
          leaveRoom: "離開房間",
        },
        chatbot: {
          name: "智匯幫手",
          header: "我在這裡，隨時準備為您解答",
          footer: "讓我解決你的問題",
          send: "傳送",
          placeholder: "請輸入問題",
        },
        Transcript: "錄音逐字稿",
        Summary: "總結",
        confirmDelete: "確認刪除",
        confirmRegenerate: "確認重新生成摘要",
        regenerateMeetings: "重新生成摘要",
        confirm: "確認",
        cancel: "取消",
      },
    },
  },
  lng: "zh", // 默認語言
  fallbackLng: "zh", // 如果語言無法加載，使用默認語言
  interpolation: {
    escapeValue: false, // React 已經處理了 XSS 攻擊
  },
});

export default i18n;

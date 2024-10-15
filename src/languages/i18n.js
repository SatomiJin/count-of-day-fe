import i18next from "i18next";

import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
  fallbackLng: "vi",
  lng: "vi",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    vi: {
      translation: {
        appName: "Kê nhật tương ngộ",
        countDay: "Đếm ngày",
        note: "Lời nhắn",
        profile: "Thông tin cá nhân",
        language: "Ngôn ngữ",
        menu: "Tùy chọn",
        countOfDays: "Tổng Số Ngày",
        oneMoreDay: "Thêm 1 ngày nữa!!!",
        day: "Ngày",

        mailAddress: "Địa Chỉ E-Mail",
        firstName: "Họ",
        lastName: "Tên",
        password: "Mật Khẩu",
        signIn: "Đăng Nhập",
        image: "Ảnh Đại Diện",
        phoneNumber: "Số Điện Thoại",
        gender: "Giới Tính",
        male: "Nam",
        female: "Nữ",
        save: "Lưu",
        changeImage: "Đổi Ảnh",

        updateSuccess: "Lưu thông tin thành công!",
        updateError: "Lưu thông tin thất bại!",

        signInSuccess: "Đăng nhập thành công!",
        signInError: "Đăng nhập thất bại!, thử lại!",

        messageError: "Bạn không được để thiếu thông tin!!",
        messageSuccess: "Gửi tin nhắn thành công!!",

        isEmpty: "Không có dữ liệu!!",
        logout: "Đăng xuất",

        plusDaySuccess: "Đã cộng thêm 1 ngày",
        plusDayError: "Bạn đã thực hôm nay rồi",

        blankMessage: "Bạn không được để trống tin nhắn!!",
      },
    },
    en: {
      translation: {
        appName: "Counting down to us",
        countDay: "Count the days",
        note: "Notes",
        profile: "Profile",
        language: "Language",
        menu: "Menu",
        countOfDays: "Count Of Days",
        oneMoreDay: "One more day!!!",
        day: "Days",

        mailAddress: "E-Mail Address",
        firstName: "First Name",
        lastName: "Last Name",
        password: "Password",
        signIn: "Sign In",
        image: "Avatar",
        phoneNumber: "Phone Number",
        gender: "Gender",
        male: "Male",
        female: "Female",
        save: "Save",
        changeImage: "Change Image",

        //
        updateSuccess: "Save user information success!",
        updateError: "Update user information error!",

        signInSuccess: "Login Success!",
        signInError: "Login Failed, Try again!",

        messageError: "You cannot missing parameters!!",
        messageSuccess: "Send message is success!!",

        isEmpty: "Empty data!!",
        logout: "Sign out",

        plusDaySuccess: "Added one day success!!",
        plusDayError: "You did it today! try later",

        blankMessage: "You must not leave the message blank!!",
      },
    },
  },
});

export default i18next;

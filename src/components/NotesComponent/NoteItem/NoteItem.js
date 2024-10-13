import { useState } from "react";
import "./NoteItem.scss";
import { useSelector } from "react-redux";
function NoteItem(props) {
  let user = useSelector((state) => state.user);
  let [data, setData] = useState(props.data);
  const formatDate = (item) => {
    let date = new Date(item);
    let hours = String(date.getHours()).padStart(1, "0");
    // Chuyển đổi giờ sang định dạng 12 giờ
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12; // Chuyển đổi sang 12 giờ
    hours = hours ? String(hours).padStart(2, "0") : "12"; // Đặt lại giờ thành 12 nếu giờ bằng 0

    const minutes = String(date.getMinutes()).padStart(2, "0");
    // const seconds = String(date.getSeconds()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${hours}:${minutes} ${ampm} - ${day}/${month}/${year}`;
  };
  return (
    <div
      className="note-item_container"
      style={{ justifyContent: `${data && data.email === user?.email ? "end" : "start"}` }}
    >
      <div className="wrapper" style={{ textAlign: `${props.type === "right" ? "right" : "left"}` }}>
        <div className="note_time">{formatDate(data.timeCreate)}</div>
        <div className="note_value">{data && data.email && data.messageNote}</div>
      </div>
    </div>
  );
}

export default NoteItem;

import { useEffect, useState } from "react";
import NoteItem from "./NoteItem/NoteItem";
import { useDispatch, useSelector } from "react-redux";
import { addNewMessage, updateMessageNote } from "../../redux/NoteSlice/NoteSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import * as NoteService from "../../Services/NoteService";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import "./NotesComponent.scss";
function NotesComponent() {
  let [messages, setMessages] = useState([]);
  let [message, setMessage] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let dispatch = useDispatch();
  let { t } = useTranslation();
  let notes = useSelector((state) => state.notes);
  let user = useSelector((state) => state.user);

  const resetField = () => {
    setMessage("");
  };

  const scrollBotBoard = () => {
    let messageBox = document.querySelector(`.notes_board`);
    messageBox.scrollTop = messageBox.scrollHeight;
  };

  const handleOnchangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const getAllMessage = async () => {
    if (user && user.email) {
      let res = await NoteService.getAllMessage({ email: user.email });
      if (res && res.status === "OK") {
        dispatch(updateMessageNote({ data: res.messages }));
      }
    }
  };
  const handleSendMessage = async () => {
    setIsLoading(true);
    if (!message) {
      setIsLoading(false);
      toast.error(t("blankMessage"));
      return;
    } else {
      let note = {
        messageNote: message,
        timeCreate: new Date(),
        email: user && user.email,
      };

      if (!message || !user.email) {
        toast.error(t("messageError"));
        setIsLoading(false);
      } else {
        let res = await NoteService.createMessage(note);
        if (res && res.status === "OK") {
          dispatch(addNewMessage({ note: note }));
          toast.success(t("messageSuccess"));
          setIsLoading(false);

          resetField();
        }
      }
    }
  };
  const handleOnKeyDown = (e) => {
    if (e.key === "Enter" && message) {
      handleSendMessage();
    }
  };
  useEffect(() => {
    if (notes && notes.data.length > 0) {
      setMessages([...notes.data]);
    }
  }, [notes]);
  useEffect(() => {
    if (user && user.email) {
      getAllMessage();
    }
  }, [user]);

  useEffect(() => {
    if (messages && messages.length > 0) {
      scrollBotBoard();
    }
  }, [messages]);

  return (
    <div className="notes-for-us_container max_height">
      <div className="container">
        <div className="row">
          <div className="notes_wrapper col-12">
            <div className="row">
              <div className="notes_title">Lời nhắn để lại</div>
              <div className="notes_board col col-12">
                {messages && messages.length > 0 ? (
                  messages.map((item, index) => {
                    return <NoteItem data={item} key={index} />;
                  })
                ) : (
                  <div className="empty_text">{t("isEmpty")}</div>
                )}
              </div>
              <div className="notes-input_wrapper col col-12">
                <div className="input">
                  <input
                    value={message}
                    name="message"
                    placeholder="Nhập nội dung..."
                    className="form-control note-input"
                    type="text"
                    onChange={(e) => handleOnchangeMessage(e)}
                    onKeyDown={(e) => handleOnKeyDown(e)}
                  />
                  <button className="btn-send center_item" onClick={() => handleSendMessage()} type="button">
                    {isLoading ? <LoadingComponent /> : <i className="bx bxs-send"></i>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotesComponent;

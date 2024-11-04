import React, { useRef, useState } from "react";
import style from "./photoModal.module.css";
import useOnClickOutside from "../../hooks/useOnclickOutside/useOnclickOutside";

const PhotoModal = ({ fullPhotoData, setIsOpenPopup }) => {
  const [textarea, setTextarea] = useState("");
  const { photo, comments, id } = fullPhotoData;
  const ref = useRef();
  useOnClickOutside(ref, () => setIsOpenPopup(false));

  const setText = (e) => {
    e.preventDefault();
    setTextarea(e.target.value);
  };
  const onSubmit = async () => {
    setTextarea("");
    await fetch(
      "http://test-backend.itdelta.agency/api/image/:" + id + "/comments",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: textarea,
        }),
      }
    ).then((data) => data.json());
  };
  return (
    <div className={style.popup}>
      <div ref={ref} className={style.popupContent}>
        <div className={style.image}>
          <img src={photo} alt="" />
        </div>
        <div className={style.comments}>
          <div className={style.writeComment}>
            <form action=""></form>
            <span className={style.writeCommentTitle}>Comment</span>
            <textarea
              value={textarea}
              onChange={setText}
              name="comment"
            ></textarea>
            <p>Write a few sentences about the photo.</p>
            <div className={style.saveComment}>
              <button onClick={onSubmit}>Save</button>
            </div>
          </div>
          <div>
            <span className={style.writeCommentTitle}>Comments</span>
            <ul>
              {comments ? (
                comments.map((item) => {
                  <div className="">
                    <span>{item.autor}</span>
                    <span>{item.text}</span>
                  </div>;
                })
              ) : (
                <span>Loading...</span>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;

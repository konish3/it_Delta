import React, { useState } from "react";
import style from "./imagesList.module.css";
import PhotoModal from "../photoModal/PhotoModal";

const ImagesList = ({ photos }) => {
  const [fullPhotoData, setFullPhotoData] = useState([]);
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const openPopup = async (e) => {
    setIsOpenPopup(true);
    const id = e.currentTarget.id;
    // запрос возвращает всегда пустой массив, соответственно нельзя и добавить комментарий
    let response = await fetch(
      "http://test-backend.itdelta.agency/api/image/:" + id
    ).then((data) => data.json());

    if (!response.length) {
      response = { photo: e.target.src, id: id };
    }
    setFullPhotoData(response);
  };

  return (
    <>
      <div className={style.images_list}>
        <div>
          <ul className={style.images_list__photos}>
            {photos ? (
              photos.map((item) => {
                return (
                  <li className={style.images_list__item}>
                    <button id={item.id} onClick={openPopup} key={item.id}>
                      <img src={item.image} alt={item.name} />
                    </button>
                    <span>{item.id}</span>
                  </li>
                );
              })
            ) : (
              <div>"Loading..."</div>
            )}
          </ul>
        </div>
      </div>
      {isOpenPopup && (
        <PhotoModal
          fullPhotoData={fullPhotoData}
          setIsOpenPopup={setIsOpenPopup}
        />
      )}
    </>
  );
};

export default ImagesList;

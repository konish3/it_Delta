import React, {useState} from "react";
import style from "./photoModal.module.css"

const PhotoModal = ({fullPhotoData}) => {
    const [textarea, setTextarea] = useState('');
    const {photo, comments, id} = fullPhotoData;
    
    const setText =  (e) => {
        e.preventDefault()
        setTextarea(e.target.value.trim())
    }
    const onSubmit = async () => {
        console.log({"0": textarea})
        const response = await fetch("http://test-backend.itdelta.agency/api/image/:"+ id + "/comments",
        {
            method: "POST",
            ContentType: "text",
            body: {body: textarea}
        }
        ).then(data => data.json());
    }
    return (
        <div className={style.popup}>
            <div className={style.popupContent}>
                <div className={style.image}>
                    <img src={photo} alt="photo" />
                </div>
                <div className={style.comments}>
                    <div className={style.writeComment}>
                        <form action=""></form>
                        <span className={style.writeCommentTitle}>Comment</span>
                        <textarea value={textarea} onChange={setText} name="comment" id=""></textarea>
                        <p>Write a few sentences about the photo.</p>
                        <div className={style.saveComment}>
                            <button onClick={onSubmit}>Save</button>
                        </div>
                    </div>
                    <div className={style.commentsList}>
                        <span className={style.writeCommentTitle}>Comments</span>
                        <ul>
                            {comments ? comments.map(item => {
                                <div className="">
                                    <span>{item.autor}</span>
                                    <span>{item.text}</span>
                                </div>
                            }) : <span>Loading...</span>}
                        </ul>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PhotoModal
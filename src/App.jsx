import React, { useEffect, useState } from "react";
import "./App.css";
import ImagesList from "./components/imagesList/ImagesList";

function App() {
  const [images, setImages] = useState([])

  const getPhotos = async () => {
    const response =  await fetch("http://test-backend.itdelta.agency/api/images"
    ).then((response) => response.json())
    setImages(response)  
  }   

  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <div className="App">
      <main>
        <ImagesList photos={images} />
      </main>
    </div>
  );
}

export default App;

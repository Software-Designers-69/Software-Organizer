import { React,useEffect, useContext, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { storage } from '../../firebase';
import { ref,listAll, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import './ShowDocument.css'
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

function ShowDocument() {
    const { state } = useLocation();
    const {file} = state;      //state from previous page
    const fileRef = ref(storage, "files/");
    const [Url, setUrl] = useState('');            // url for file which is about to be displayed

   
  useEffect(() => {
    listAll(fileRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          if(url.includes(file.file)){setUrl(url);}  
        });
      });
    });

  }, []);

    return (
        <div>
            <div class="header"><Header /></div>
            <div className='filename'>{file.filename}</div>
            <object width="100%" height="600px" data={Url} type="application/pdf">   </object>
            <div class="footer"><Footer /></div>    
        </div>
    )
}
export default ShowDocument
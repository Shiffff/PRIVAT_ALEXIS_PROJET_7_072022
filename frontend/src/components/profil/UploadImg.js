import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';


const UploadImg = () => {
    const [file, setFile] = useState();
    const userData = useSelector((state) => state.user.user);




    const handlePicture = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", userData.name)
        data.append("userId", userData._id)
        data.append('image', file)
             axios({
                method: "put",
                url: `http://localhost:3000/api/user/${userData._id}`,
                data: data
            })
            .then((res) => {
                console.log(res.data)
                window.location.reload();
            })
    }

    return (
        <form action=""  onSubmit={handlePicture} className="upload-pic" encType=" multipart/form-data ">
            <label htmlFor='file'>Changer d'image</label>
            <input type="file"
             id="file" 
             name="file" 
             accept=".jpg, .jpeg, .png"
            onChange={(e) => setFile(e.target.files[0])}
            ></input>
            <br/>
            <input type="submit" value="Envoyer"/>
        </form>
    );
};

export default UploadImg;
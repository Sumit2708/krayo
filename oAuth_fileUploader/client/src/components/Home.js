import axios from "axios";
import React, { useEffect, useState } from "react";
import fileDownload from 'js-file-download'

function Home() {
  const [file, setFile] = useState("");
  const [filedata, setFiledata] = useState([]);
  const logout = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
  };

  //post data
  const addData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.post(
      "http://localhost:8080/posting",
      formData,
      config
    );
    console.log(res);
  };

  //get data
  const getImgData = async () => {
    const res2 = await axios.get("http://localhost:8080/geting", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res2.data.status === 401 || !res2.data) {
      console.log(`err`);
    } else {
      setFiledata(res2.data.getImgs);
    }
  };

  const handleDownload = async(e)=>{
  e.preventDefault()
  axios.get("http://localhost:8080/download",{
    responseType:"blob"
  }).then((res)=>{
    fileDownload(res.data,'dowloaded.jpg')
  })
  }


  useEffect(() => {
    getImgData();
  }, []);

  return (
    <div>
      <div className="container_main">
        <form className="form_data">
          <input
            type={"file"}
            accept=".png,.jpg,.jpeg"
            onChange={(e) => setFile(e.target.files[0])}
            name="photo"
          />
          <button className="submit" type="submit" onClick={addData}>
            submit
          </button>
        </form>
        <button className="logout_btn" onClick={logout}>
          <span>Logout</span>
        </button>
      </div>

      <div className="card">
        {filedata.map((ele, i) => {
          return (
            <div key={i} className="card_img">
              <img
                style={{
                  width: "100px",
                  height: "100px",
                  display: "flex",
                  margin: "20px",
                  cursor: "pointer",
                }}
                src={`http://localhost:8080/${ele.imgPath}`}
                alt="images"
                onClick={handleDownload}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;

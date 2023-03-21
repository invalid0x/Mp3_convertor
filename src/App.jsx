import axios from "axios";
import { useRef, useState } from "react"
import { youtube_parser } from "./utils";

function App() {
   const inputUrlRef = useRef();
   const [urlResult, setUrlResult] = useState(null);

   const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputUrlRef.current.value);
    const youtubeID=youtube_parser(inputUrlRef.current.value);
    console.log(youtubeID)
   

   const options = {
    method: 'get',
    url: 'https://youtube-mp3-download1.p.rapidapi.com/dl',
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
      'X-RapidAPI-Host': 'youtube-mp3-download1.p.rapidapi.com'

    },
    params: {
     id: youtubeID
    }
   }
   axios(options)
   .then(res => setUrlResult(res.data.link))
   .catch(err => console.log(err))

   inputUrlRef.current.value = '';
   
  }
  return (
    <div className="app">
      <span className="logo">Mp3_Convertor</span>
      <section className="content">
        <h1 className="content_title">Insert link to convert</h1> 
        <p className="content_description">YT to Mp3</p>

        <form onSubmit={handleSubmit} className="form">
          <input ref={inputUrlRef} placeholder="Paste the video URL here..." className="form_input" type="text" />
          <button type="submit" className="form_button">Convert</button>
        </form>

              
      {urlResult ? <a className="download_btn" target= '_blank' href={urlResult}>Download Mp3</a> : ''}
      </section>
      </div>
  )
  }

export default App

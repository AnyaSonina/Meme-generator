import React from "react"


export default function Meme() {  
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg" 
  })
  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(data => setAllMemeImages(data.data.memes))
  }, [])
 
  const [allMemeImages, setAllMemeImages] = React.useState([])

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemeImages.length)
    const url = allMemeImages[randomNumber].url
    setMeme(prevMeme => ({
        ...prevMeme,
        randomImage: url
    }))
      
  }

  function handleChange(event) {
    const {name, value } = event.target
    setMeme(prevMeme => ({
      ...prevMeme,
      [name]: value
    }))
  }

  return (
   <main className="container">
     <div className="form">           
         <input type="text"
         name="topText"
         onChange={handleChange}
         value={meme.topText}
         />
         <input type="text"
         name="bottomText"
         onChange={handleChange}
         value={meme.bottomText}/>
         <button onClick={getMemeImage}>Get a new meme image 🖼</button>
     </div>
     <br/>
     <div className="meme">
           <img src={meme.randomImage} className="meme--image" />
           <h2 className="meme--text top">{meme.topText}</h2>
           <h2 className="meme--text bottom">{meme.bottomText}</h2>
       </div>
   </main>
  )
}
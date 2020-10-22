import React, { Component } from "react";
import "./Contact.css";


const Console = prop => (
  console[Object.keys(prop)[0]](...Object.values(prop))
  , null // ➜ React components must return something 
)

function Contact(props) {

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    let eventSource = new EventSource("http://localhost:8000/stream");
    console.log(eventSource)
    eventSource.onmessage = e => updateProdutList(JSON.parse(e.data));

  }, []);

  const updateProdutList = (product) => {
    setData([...product])

  }


  return (

    <div className="contact">

    
      {
        data.map((asset,idx) => (
          <div>
            <span key={idx} >{asset.price}</span>
          </div>
        ))
      }

      <p>{"New data"}</p>
      <Console log={data} />
    </div>



  );
}

export default Contact;

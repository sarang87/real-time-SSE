import React from "react";
import axios from 'axios';



function Table(props) {

  const [data, setData] = React.useState([]);
  
  // listen for events from the server
  React.useEffect(() => {
    let eventSource = new EventSource("http://localhost:8000/stream");
    
    eventSource.onmessage = e => updateProdutList(JSON.parse(e.data));

  },[]);


  // Get all assets when the page loads
  React.useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'http://localhost:8000/assets',
      );
      const product = JSON.parse(result.data)
      console.log(product[0])
      setData([...product]);
    }
    fetchData()
  }, []
  )



  // On receiving an event from a server update the data
  const updateProdutList = (product) => {
    console.log("New data received")
    console.log(product)
    setData([...product])

  }


  return (

    <div className="contact">


      {
        data.map((asset, idx) => (
          <div key={idx}>
            <span  >{asset.price}</span>
          </div>
        ))
      }


    </div>



  );
}

export default Table;

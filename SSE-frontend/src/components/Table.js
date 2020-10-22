import React from "react";




function Table(props) {

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

     
    </div>



  );
}

export default Table;

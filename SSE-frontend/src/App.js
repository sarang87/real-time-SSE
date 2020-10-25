import React from 'react';
import './App.css';
import TableContainer from "./components/TableContainer"
import axios from 'axios';
import { Container } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"


function App() {

  const columns = React.useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Asset Name",
        accessor: "assetName",
      },
      {
        Header: "Asset Price",
        accessor: "price",
      },
      {
        Header: "Last Updated",
        accessor: "lastUpdate",
      },
      {
        Header: "Asset Type",
        accessor: "type",
      },
    ],
    []
  )

  const [data, setData] = React.useState([]);
  const [listening, setListening] = React.useState(false);


  // Get all assets when the page loads
  React.useEffect(() => {

    async function fetchData() {
      const result = await axios(
        'http://localhost:8000/assets',
      );
      const assets = JSON.parse(result.data)
      console.log(assets.length)
      setData(assets);
    }
    fetchData()
    setListening(true)
  }, [])

  React.useEffect(() => {
    if (!listening) {
      const events = new EventSource('http://localhost:8000/stream');
      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        console.log(parsedData[0])
        setData((data)=> data.map( function(item) { if (item.id === parsedData[0].id) { return parsedData[0]} else {return item} }))
        //setData((data)=> [...data.filter( (item) =>  item.id != parsedData[0].id), parsedData[0]])

       
      };

      setListening(true);
    }
  }, [listening, data]);



  return (
    <Container style={{ marginTop: 100 }}>
      <TableContainer columns={columns} data={data} />
    </Container>

  );
}

export default App;

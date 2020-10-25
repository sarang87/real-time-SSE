import React, { useState, useEffect } from 'react';
import './App.css';
//import Contact from "./components/Contact";
//import Table from "./components/Table";
import TableContainer from "./components/TableContainer"
import axios from 'axios';
import { Container } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"


const App = () => {

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

  const [data, setData] = useState([]);
  const [eventSource] = useState(new EventSource("http://localhost:8000/stream"));

  const updateProductList = (product) => {
    const newData = product[0];
    const prevData = [...data];
    const index = prevData.findIndex(x => x.id === newData.id);
    prevData[index] = newData;
    setData(prevData);
  }

  useEffect(() => {
    eventSource.removeEventListener('message', () => { });
    eventSource.onmessage = e => updateProductList(JSON.parse(e.data));
  }, [data])

  // Get all assets when the page loads
  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'http://localhost:8000/assets',
      );
      const assets = JSON.parse(result.data)
      setData(prev => [...prev, ...assets]);
    }
    fetchData();
  }, [])


  return (
    <Container style={{ marginTop: 100 }}>
      <TableContainer columns={columns} data={[...data]} />
    </Container>

  );
}

export default App;

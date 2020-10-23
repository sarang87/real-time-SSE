import React from 'react';
import './App.css';
//import Contact from "./components/Contact";
//import Table from "./components/Table";
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
  }, []
  )

  React.useEffect(() => {
    let eventSource = new EventSource("http://localhost:8000/stream");

    eventSource.onmessage = e => updateProductList(JSON.parse(e.data));

  }, []);

  const updateProductList = (product) => {

    console.log(product)
    // setState((prevState) => ({
    //   ...prevState,
    //   appointmentTypes: {
    //     ...prevState.appointmentTypes,
    //     loading: false
    //   }
    // }));
    //setData((prevData) => ({...prevData.filter(d => d.id == product.id)}))
    //setData(product)
  }

  return (
    <Container style={{ marginTop: 100 }}>
      <TableContainer columns={columns} data={data} />
    </Container>

  );
}

export default App;

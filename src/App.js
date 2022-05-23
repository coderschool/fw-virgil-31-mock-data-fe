import "./App.css";
import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

function App() {
  const [data, setData] = useState([]);
  const [collection, setCollection] = useState("");
  const [page, setPage] = useState(1);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `http://localhost:3000/${collection}?_limit=5&_page=${page}`
      );
      const response = await res.json();
      console.log(response);
      setData(response);
      return response;
    };
    getData();
  }, [collection, page]);

  const handleCollection = (collection) => {
    setCollection(collection);
    setPage(1);
  };
  const handlePagination = (choice) => {
    console.log(choice);
    if (choice === "next") {
      setPage((page) => page + 1);
    } else if (choice === "prev" && page > 1) {
      setPage((page) => page - 1);
    }
  };

  return (
    <Box className="App">
      <Typography variant="h3">Collection</Typography>
      <Button onClick={() => handleCollection("users")}>User</Button>
      <Button onClick={() => handleCollection("products")}>Product</Button>
      <hr></hr>

      <Box
        style={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
        }}
      >
        <Button onClick={() => handlePagination("prev")}>{"<"}</Button>
        <Button disableFocusRipple disableTouchRipple>
          {page}
        </Button>
        <Button onClick={() => handlePagination("next")}>{">"}</Button>
      </Box>
      {data ? (
        data.map((e) => {
          return (
            <>
              <Typography variant="h3">{e.name}</Typography>
              <h4>{e.img}</h4>
            </>
          );
        })
      ) : (
        <Typography variant="h3">"Loading"</Typography>
      )}
    </Box>
  );
}

export default App;

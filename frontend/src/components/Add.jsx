import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // check if we're in update mode
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    img_url: "",
  });

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const fetchBlogData = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/get/${id}`);
      setInputs(res.data);
    } catch (err) {
      console.log("Error fetching blog data", err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBlogData(); 
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      if (id) {
        // Update blog
        await axios.put(`http://localhost:3001/update/${id}`, inputs);
        alert("Blog updated successfully!");
      } else {
        // Add blog
        await axios.post("http://localhost:3001/add", inputs);
        alert("Blog added successfully!");
      }
      navigate("/");
    } catch (err) {
      console.log("Error submitting form", err);
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "600px",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Title"
            onChange={inputHandler}
            name="title"
            value={inputs.title}
            fullWidth
          />
          <TextField
            variant="outlined"
            placeholder="Content"
            onChange={inputHandler}
            name="content"
            value={inputs.content}
            multiline
            rows={4}
            fullWidth
          />
          <TextField
            variant="outlined"
            placeholder="Image URL"
            onChange={inputHandler}
            name="img_url"
            value={inputs.img_url}
            fullWidth
          />
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            {id ? "Update" : "Submit"}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Add;

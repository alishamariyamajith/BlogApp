//Create the Home UI for the BlogAPP(Cards are preferrred; You may choose your UI preference )


//Write your code here

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CircularProgress,
  Container,
  Button,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:3001/get");
      setBlogs(response.data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      fetchBlogs(); // Refresh list
    } catch (err) {
      console.log("Error deleting blog", err);
    }
  };

const handleUpdate = (id) => {
  navigate(`/update/${id}`);
};
  return (
    <Container sx={{ mt: 4 }}>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : blogs.length === 0 ? (
        <Typography align="center" variant="h6">
          No blog posts found.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {blogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog._id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={blog.img_url}
                  alt={blog.title}
                />
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    {blog.title}
                  </Typography>
                  <Typography variant="h6" color="text">
                    {blog.content}
                  </Typography>
                  <Stack direction="row" spacing={2} mt={2}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(blog._id)}
                    >
                      DELETE
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleUpdate(blog._id)}
                    >
                      UPDATE
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;

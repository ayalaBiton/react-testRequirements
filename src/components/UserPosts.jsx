import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { ThreeDots } from 'react-loader-spinner';
import { getPostsByUserId } from '../API';
import { NewPost } from './NewPost';


export const UserPosts = ({userId}) =>
{
  const [PostsByUserId, setPostsByUserId] = useState([]);
  const [showNewPost, setShowNewPost] = useState(false);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(100);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //הבאת כל ההודעות של המשתמש שנבחר get קריאה לפונקצית
        const response = await getPostsByUserId({userId});
        setPostsByUserId(response);
        setLoading(false);
      } 
      catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [userId]);

  //בעת לחיצה על כפתור יצירת הודעה חדשה
  const onClickNewPost = async () => {
    setShowNewPost(true);
    setCount(count+1);
  }

  //מוסיף לרשימת הודעות המשתמש את ההודעה החדשה
  const updatePosts = (newPost) => {
    setPostsByUserId((prevPosts) => [...prevPosts, newPost]);
  };

  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return <>
    <div className='divUserPosts'>
      {/* כפתור יצירת הודעה חדשה */}
      <Button className='btnNewPost' onClick={() => onClickNewPost()} variant="contained" style={{margin: "0 0 2% 35%"}}> new post</Button>

      { showNewPost && <NewPost userId={userId} updatePosts={updatePosts} setShowNewPost={setShowNewPost} id={count}></NewPost> }

      {
        loading ? ( <ThreeDots type="ThreeDots" color="rgb(43, 126, 154)"/>
          ) : ( 
            // מעבר על הודעות המשתמש 
            PostsByUserId.length > 0 ? (
              PostsByUserId.map((post) =>
                (
                  <Accordion expanded={expanded === post.id} onChange={handleChange(post.id)} key={post.id} sx={{ width: '100%'}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                      <Typography sx={{ width: '100%', flexShrink: 0 }}>
                      <strong>{post.title}</strong>
                      </Typography>          
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{post.body}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))
            ) : (
              PostsByUserId.error ? (
                  <p>{PostsByUserId.error}</p>
                ) : (
                  <p>No found</p>
                )
            ))
      }

    </div>

  </>

}

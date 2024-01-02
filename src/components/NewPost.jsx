import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { addPost } from '../API';


export const NewPost = ({userId, updatePosts, setShowNewPost, id}) =>
{
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [validation, setValidation] = useState('');

    //יצירת הודעה חדשה
    const createPost = async (e) => {
        e.preventDefault();
        //:אימות הזנת נתוני המשתמש
        //השדות הם שדות חובה 
        if (!title || !body) {
            setValidation('יש למלא את כל השדות ');
        }
        //השדות חיבות להכיל אותיות באנגלית או העברית
        else if (!/^[a-zA-Zא-ת\s]+$/.test(title) || !/^[a-zA-Zא-ת\s]+$/.test(body)) {
            setValidation('יש להזין רק אותיות בעברית ובאנגלית');
        }
        else
        {
            const postJson = {
                "userId": userId,
                "id": id,
                "title": title,
                "body": body
            };
            try {
                //יצירת הודעה חדשה post קריאה לפונקצית
                const newPost = await addPost(postJson);
                updatePosts(newPost);
                setShowNewPost(false)
            } 
            catch (error) {
                console.error(error);
            }
        }
    }

    return <>
        <div id='divNewPost'>
            {/* טופס יצירצת הודעה חדשה */}
            <form id='formNewPost' onSubmit={createPost}>
                <span onClick={() => setShowNewPost(false)} className='close'>&times;</span>
                <p>Create new post</p><br/>
                <label><b>Title:</b></label><br/>
                <input id='input' type='text' onChange={(e) => setTitle(e.target.value)}></input>
                <label><b>Body:</b></label><br/>
                <input id='input' type='text' onChange={(e) => setBody(e.target.value)}></input>
                {validation && <p>{validation}</p>}
                <Button id='btnCreate' variant="contained" type='submit'>Create</Button>
            </form>
        </div>
    </>
}

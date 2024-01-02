//הבאת כל המשתמשים get פונקצית
export const getUsers = async () => {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow',
    };
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/users', requestOptions);
        const data = await response.json();
        return data;
    }
    catch(error){
        return error;
    }
}

// userId הבאת כל ההודעות של המשתמש לפי get פונקצית
export const getPostsByUserId = async ({userId}) => {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow',
    };
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`,requestOptions);
        const data = await response.json();
        return data;
    }
    catch(error){
        return error;
    }
}

//הוספת הודעה למשתמש post פונקצית
export const addPost = async (post) => {
    let requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(post)
    };
    try{
        await fetch('https://jsonplaceholder.typicode.com/posts',requestOptions);
        return post;
    }
    catch(error){
        return error;
    }
};

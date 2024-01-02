import React, { useEffect, useState } from 'react';
import { getUsers } from '../API';
import { UserPosts } from './UserPosts';
import { ThreeDots } from 'react-loader-spinner';


export const UsersTable = () => {
    const [showUserPosts, setShowUserPosts] = useState(false);
    const [loading, setLoading] = useState(true); //api מחוון טעינה בעת הבאת נתונים מה 
    const [listUsers, setListUsers] = useState([]);
    const [userId, setUserId] = useState();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                //הבאת כל המשתמשים get קריאה לפונקצית
                const response = await getUsers();
                setListUsers(response);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    //בעת לחיצה על שורה בטבלת המשתמשים מוצג ההודעות של המשתמש שנבחר
    const onClickRow = async (user) => {
        setUserId(user);
        setShowUserPosts(true);
    };

    //name,email סינון עמודות 
    const filteredUsers = listUsers.filter((user) => {
        if (name && email) 
            return ( user.name.toLowerCase().startsWith(name.toLowerCase()) && user.email.toLowerCase().startsWith(email.toLowerCase()));
        else if (name) 
            return user.name.toLowerCase().startsWith(name.toLowerCase());
        else if (email) 
            return user.email.toLowerCase().startsWith(email.toLowerCase());
        else 
            return listUsers;
    });

    return <>
        <div className="container">
            <div className='divTable'>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Company name</th>
                        </tr>
                        <tr>
                            <th><input type='search' onChange={(e) => setName(e.target.value)} placeholder='search' style={{ border: 'none', height: "25px" }}/></th>
                            <th><input type='search' onChange={(e) => setEmail(e.target.value)} placeholder='search' style={{ border: 'none', height: "25px" }}/></th>
                            <th></th>
                        </tr>
                        {
                            loading ? ( <ThreeDots type="ThreeDots" color="rgb(43, 126, 154)"/>
                            ) : (                
                                filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id} onClick={() => onClickRow(user.id)}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.company.name}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td>Not found</td>
                                    </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {showUserPosts && <UserPosts userId={userId}></UserPosts>}

        </div>
        
    </>
};

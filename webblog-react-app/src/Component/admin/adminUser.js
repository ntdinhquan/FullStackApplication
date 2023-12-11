import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
// import { DOMAIN } from "../Domain/DomainBlog";
import styles from "./adminUser.module.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DOMAIN } from "../../utils/constant";

export default function GetAllUser() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadDataUser();
    }, []);




    const loadDataUser = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("accessToken"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };


        fetch(DOMAIN + '/api/v1/admin/users', requestOptions)
            .then(response => response.json())
            .then(result => {
                setUsers(result);
                const isAdmin = result.some(user => user.roles.includes("ROLE_ADMIN"))
                if (isAdmin) {
                    console.log("Your Role: Admin");
                }
            })
            .catch(error => console.log('error', error));
    }

    const handleDeleteUser = (userId) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("accessToken"));

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        // fetch('/api/v1/admin/users/${userId}', requestOptions)
        fetch(DOMAIN + '/api/v1/admin/users/' + userId, requestOptions)
            .then(response => response.json())
            .then(() => {
                toast.success("Xóa thành công", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000 // Thời gian hiển thị thông báo
                });
                const updatedUser = users.filter(users => users.id !== userId);
                setUsers(updatedUser);
            })
            .catch(error => {
                toast.error("Xóa không thành công", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000 // Thời gian hiển thị thông báo
                });
                console.log('error', error)
            });
    }

    const handleUpdateUser = (userID) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("accessToken"));
        myHeaders.append("Content-Type", "application/json");

        const updatedUser = users.find(user => user.id === userID);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(updatedUser),
            redirect: 'follow'
        };

        // fetch('/api/v1/admin/users/${userID}', requestOptions)
        fetch(DOMAIN + '/api/v1/admin/users/' + userID, requestOptions)
            .then(response => response.json())
            .then(result => {
                toast.success("Upload thành công", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000 // Thời gian hiển thị thông báo
                });
            })
            .catch(error => {
                toast.error("Upload không thành công", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000 // Thời gian hiển thị thông báo
                });
                console.log('error', error);
            });
    };

    const handleInputChange = (e, userId, field) => {
        const { value } = e.target;

        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === userId ? { ...user, [field]: value } : user
            )
        );
    };
    return (
        <div>
            <ToastContainer />

            <h2>Manager user</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Password</th>
                        {/* <th>Posts</th> */}
                        <th>Roles</th>
                    </tr>
                </thead>
                <tbody >
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td>
                                <input
                                    className={styles.input}
                                    type="text"
                                    value={u.userName}
                                    onChange={(e) => handleInputChange(e, u.id, "userName")}
                                />

                            </td>
                            <td>{u.userPassword}</td>
                            {/* <td>{u.userPosts.title}</td> */}
                            <td>
                                <input
                                    className={styles.input}
                                    type="text"
                                    value={u.userRoles}
                                    onChange={(e) => handleInputChange(e, u.id, "userRoles")}
                                />
                            </td>
                            <td><button onClick={() => handleUpdateUser(u.id)}>Update</button></td>
                            <td><button onClick={() => handleDeleteUser(u.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
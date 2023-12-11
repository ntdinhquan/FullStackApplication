import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import styles from "./newPost.module.css"
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DOMAIN } from '../../utils/constant';


const CreatePost = () => {
    const [editor, setEditor] = useState(null);
    const [blogTitle, setBlog] = useState([]);
    const [allowSubmit, setAllowSubmit] = useState(false);

    let navigate = useNavigate();

    const [postData, setPostData] = useState({
        title: '',
        body: '',
        imageUrl: '',
        authors: '',
        urlSlug: '',
        userId: {
            id: ''
        }
    });

    const handleEditorChange = (content, editor) => {
        setPostData({
            ...postData,
            body: content
        });
    };

    useEffect(() => {
        GetBlog()
    }, [])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData({
            ...postData,
            [name]: value
        });
    }
    const handleImgChange = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'alhgkoaa');

        fetch('https://api.cloudinary.com/v1_1/dxpghnb5n/image/upload', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                toast.success("Upload ảnh thành công", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1500 // Thời gian hiển thị thông báo
                });
                setPostData({
                    ...postData,
                    imageUrl: data.secure_url
                });
                setAllowSubmit(true);
                // setImg(data.secure_url);
            })
            .catch(error => console.error('Error:', error));
    }
    const GetBlog = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        // fetch(`${DOMAIN}public`, requestOptions)
        fetch(DOMAIN + '/api/v1/public', requestOptions)
            .then(response => response.json())
            .then((result) => {
                const titles = result.map(post => post.title);
                setBlog(titles)
                console.log("title", titles)

            })
            .catch(error => {
                console.log('error', error)
            });
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("accessToken"));


        if (blogTitle.includes(postData.title)) {
            toast.error("Tên bài viết đã tồn tại!!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000 // Thời gian hiển thị thông báo
            });
        }
        else {
            if (allowSubmit) {
                fetch(DOMAIN + '/api/v1/users/post', {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify(postData),
                    // redirect: 'follow'
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Post created:', data);
                        console.log('postData.urlSlug: ', postData.urlSlug);

                        toast.success("Đăng bài thành công", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 2000 // Thời gian hiển thị thông báo
                        });
                        setTimeout(() => {
                            navigate(`/`);
                        }, 2300)
                        setPostData({
                            title: '',
                            imageUrl: '',
                            authors: ''
                        });
                    })
                    .catch(error => console.error('Error:', error.message));

            }
            else {
                toast.error("Vui lòng upload ảnh trước khi đăng bài", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000 // Thời gian hiển thị thông báo
                });
            }

        }

    }

    return (
        <>
            <ToastContainer />
            <Navbar />
            <div className={styles.wrapNewPost}>
                <div className={styles.container}>
                    <h1><b>Đăng bài</b></h1>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label>Tiêu đề:</label>
                            <input
                                type="text"
                                name="title"
                                value={postData.title}
                                onChange={handleChange}
                            />
                        </div>
                        <Editor className={styles.formGroup}
                            apiKey='qipiqczcps7wxrt704dujhrl0zen35f7sk9cakwekr673sz9'
                            init={{
                                plugins: 'preview mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
                                toolbar: 'preview | undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                menubar: false,
                            }}

                            onInit={(e, editor) => setEditor(editor)}
                            onEditorChange={handleEditorChange}
                        />

                        <div className={styles.formGroup}>
                            <label>Đăng ảnh bìa cho bài viết:</label>
                            {/* <br></br> */}
                            <input
                                type="file"
                                name="imageUrl"
                                accept="image/*"
                                onChange={handleImgChange}
                            />
                        </div>

                        <div className={styles.submitButton}>
                            <button style={{ width: "50%" }} type="submit" className='btn btn-primary btn-lg'>Đăng bài</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreatePost;
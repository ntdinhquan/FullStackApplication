import { useEffect, useState } from "react";
// import { DOMAIN } from "../Domain/DomainBlog";
import styles from "./showBlogPage.module.css";
import { Link, useParams } from "react-router-dom";
import Navbar from "../navbar/navbar";
import Comment from '../Comment/Comment';
import CommentOfPost from "../Comment/CommentOfPost";
import {
  MDBFooter,
  MDBContainer
} from 'mdb-react-ui-kit';
import { DOMAIN } from "../../utils/constant";


const GetBlog = _ => {
  const [blog, setBlog] = useState([]);
  const { urlSlug } = useParams();

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    console.log(typeof postTitle)
    fetch(DOMAIN + '/api/v1/public', requestOptions)
      .then(response => response.json())
      .then((result) => {
        const selectedBlog = result.find(item => item.urlSlug === urlSlug);
        setBlog(selectedBlog)
      })
      .catch(error => {
        console.log('error', error)
      });

  }, []);

  return (
    <>
      <Navbar />
      <body>
        <div className={styles.wrapBlog}>
          <div className={styles.blog_post}>
            <h2 className={styles.blog_title}>{blog.title}</h2>
            <div className={styles.blog_content} dangerouslySetInnerHTML={{ __html: blog.body }}></div>
            <h5 className={styles.blog_author}>{blog.authors}</h5>
          </div>

          <div className={styles.Comment}>
            <Comment urlPost={urlSlug} />
            <CommentOfPost urlPost={urlSlug} />
          </div>
        </div>
      </body>
      <footer>
        <MDBFooter className='text-center' color='white' bgColor='dark'>
          <MDBContainer className='p-4'>

          </MDBContainer>
          <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            © 2023 Copyright:&nbsp;
            <a className='text-white' href='https://hopamchuan.com/profile/favorited/DinhQuan?search=&offset=220'>
              ntdquan.me.com
            </a>
          </div>
        </MDBFooter>
      </footer>

    </>
  );
}

export default GetBlog;
import React from 'react'
import Navbar from '../Component/navbar/navbar'
import GetPostApi from '../Component/getPost/getPosts'
import SearchBar from '../Component/SearchBox/searchBar';
import styles from './home.module.css'
import MiniPost from '../Component/RandomPost/miniPosts';
import imageExample from './googleads-removebg-preview.png'

import {
  MDBFooter,
  MDBContainer
} from 'mdb-react-ui-kit';
const HomePage = () => {
  // Profile();
  return (
    <>
      <header className={styles.nav}>
        <Navbar />
      </header>

      <div className={styles.content}>
        <body className={styles.containerBody}>
          <div className={styles.leftHomePage}>
            <GetPostApi />
          </div>
          <div className={styles.rightHomePage}>
            <SearchBar />
            {/* <img style={{ width: "100px", height: "50px", marginTop: "-300px" }} src={imageExample} alt="anh gg" /> */}
            <MiniPost />
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
      </div>
    </>
  )
}

export default HomePage
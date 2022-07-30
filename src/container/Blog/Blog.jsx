import React, { useState, useEffect } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import './Blog.scss';
import {useDispatch, useSelector} from "react-redux"
import { getblogs } from '../../features/BlogSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import Loader from "../../components/Loader"

const Blog = () => {
  const [blogs_, setBlog] = useState([]);
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const dispatch = useDispatch()
  const {blogs, loading} = useSelector((state) => state.blog)
  console.log(blogs)

  useEffect(() => {
   dispatch(getblogs())
  }, []);
  
  useEffect(() => {
    setBlog(blogs);
   }, [blogs]);
   

  // const filteredData = ["ALL", ...new Set(posts?.projectPost?.map((val) => val.category))]
  // console.log(filteredData)

  return (
    <>
      <h2 className="head-text">My <span>Blog</span> Section</h2>
      {
        loading ? <Loader text="Blogs" /> 
        :
      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {blogs_?.blogPosts?.map((work, index) => (
          <One {...work} index={index} key={index}/>
        ))}
      </motion.div>
      }
    </>
  );
};

export default AppWrap(
  MotionWrap(Blog, 'app__works'),
  'blog',
  'app__primarybg',
);

function One({title, image, message,category,createdAt, index, _id}) {
  const [little, setLittle] = useState(true)
  const navigate = useNavigate()
  const contentState = convertFromRaw(JSON.parse(message));
  const editorState = EditorState.createWithContent(contentState);
  const read = () => {
    setLittle((e) => !e)
  }

  const route = () => {
    navigate(`/blogdetails/${_id}`)
    console.log("ck")
  }
  return (
    <div className="app__work-item app__flex" key={index}>
            <div
              className="app__work-img app__flex"
            >
              <img src={image} alt={title} />

              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                className="app__work-hover app__flex"
              >
               <Link to="">

                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.90] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillEye />
                  </motion.div>
                </Link>
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text" onClick={route}>{title}</h4>
              <div className="description">
              {/* <Editor editorState={editorState} readOnly={true} />       */}
              </div>         
             <div className="app__work-tag app__flex">
                <p className="p-text">{category.toUpperCase()}</p>
              </div>
            </div>
          </div>
  )
}
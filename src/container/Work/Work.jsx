import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import './Work.scss';
import {useDispatch, useSelector} from "react-redux"
import { getposts } from '../../features/SkillSlice';

const Work = () => {
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const dispatch = useDispatch()
  const {posts} = useSelector((state) => state.skill)

  
  useEffect(() => {
   dispatch(getposts())
  }, []);
  useEffect(() => {
    setFilterWork(posts?.projectPost);
   }, [posts?.projectPost]);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === 'ALL') {
        setFilterWork(posts?.projectPost);
      } else {
        setFilterWork(posts?.projectPost?.filter((work) => work.category === item));
      }
    }, 500);
  };
  const filteredData = ["ALL", ...new Set(posts?.projectPost?.map((val) => val.category))]
  console.log(filteredData)

  return (
    <>
      <h2 className="head-text">My Creative <span>Portfolio</span> Section</h2>

      <div className="app__work-filter">
        {filteredData.map((item, index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item.toUpperCase()}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWork?.map((work, index) => (
          <One work={work} index={index} />
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'work',
  'app__primarybg',
);

function One({work, index}) {
  const [little, setLittle] = useState(true)
  
  const read = () => {
    setLittle((e) => !e)
  }
  return (
    <div className="app__work-item app__flex" key={index}>
            <div
              className="app__work-img app__flex"
            >
              <img src={work.projectImg} alt={work.title} />

              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                className="app__work-hover app__flex"
              >
                <a href={work.projectUrl} target="_blank" rel="noreferrer">

                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.90] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillEye />
                  </motion.div>
                </a>
                <a href={work.projectGithub} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.90] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work?.projectName}</h4>
                {
                  little ? 
              <p className="p-text" style={{ marginTop: 10 }}>{work?.projectDescription?.slice(0, 100)}...<span onClick={read} style={{color: "blue"}}>read more</span></p>
                  : 
              <p className="p-text" style={{ marginTop: 10 }}>{work?.projectDescription}...<span onClick={read} style={{color: "blue"}}>show less</span></p>
                }
              <div className="app__work-tag app__flex">
                <p className="p-text">{work?.category.toUpperCase()}</p>
              </div>
            </div>
          </div>
  )
}
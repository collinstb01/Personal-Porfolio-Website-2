import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactTooltip from 'react-tooltip';

import { AppWrap, MotionWrap } from '../../wrapper';
import './Skills.scss';
import { useSelector } from 'react-redux';

const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const {posts}  = useSelector((state) => state.skill)
  console.log(posts)

  useEffect(() => {

  }, []);

  return (
    <>
      <h2 className="head-text">Skills & Experiences</h2>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {posts?.skillPost?.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.title}
            >
              <div
                className="app__flex"
                // style={{ backgroundColor: 'whitesmoke' }}
                style={{ backgroundColor: skill.bgColor ? skill.bgColor : "whitesmoke" }}
              >
                <img src={skill.img} alt={skill.title} />
              </div>
              <p className="p-text">{skill.title}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="app__skills-exp">
          {posts?.experience?.map((experience) => (
            <motion.div
              className="app__skills-exp-item"
              key={experience.year}
            >
              <div className="app__skills-exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>
              <motion.div className="app__skills-exp-works">
                {experience?.experience?.map((work) => (
                  <>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tip
                      data-for={work.title}
                      key={work.title}
                    >
                      <h4 className="bold-text">{work.title}</h4>
                      <p className="p-text">{work.company}</p>
                    </motion.div> 
                    <ReactTooltip
                      id={work.title}
                      effect="solid"
                      arrowColor="#fff"
                      className="skills-tooltip"
                    >
                      {work.desc}
                    </ReactTooltip>
                  </>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, 'app__works'),
  'work',
  'app__primarybg',
);

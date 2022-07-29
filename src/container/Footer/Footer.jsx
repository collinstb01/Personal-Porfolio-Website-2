import React, { useState } from 'react';

import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import './Footer.scss';
import { send } from 'emailjs-com'
import { Link } from 'react-router-dom';

const Footer = () => {
  const [message, setMessage] = useState("")
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toSend, setToSend] = useState({
    from_name: "",
    to_name: "Collins Eguasa",
    message: "",
    reply_to: "",
  })

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setToSend({ ...toSend, [name]: value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true)
    if ((toSend.from_name && toSend.message && toSend.reply_to) === "") {
      setLoading(false)
      return setMessage("PLease All Fields Are Required")
    }
    if (!toSend.reply_to.includes("@")) {
      setLoading(false)
      return setMessage("Please Enter a valid Email Address")
    }
    send('service_zcu2vtm', 'template_tw283sc', toSend, 'B9P5jsrJyEVGJt0NC')
      .then((result) => {
        console.log(result.text);
        setLoading(false)
        setIsFormSubmitted(true)
        setMessage(" Thank you for getting in touch!")
      }, (error) => {
        setMessage(error.text)
        setLoading(false)
        console.log(error.text);
      });
  };

  return (
    <>
      <h2 className="head-text">Take a coffee & chat with me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card ">
          <img src={images.email} alt="email" />
          <a href="collinstb01@gmail.com" className="p-text">collinstb01@gmail.com</a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="phone" />
          <a href="tel:07057415193" className="p-text">+234 7057 415 193</a>
        </div>
      </div>
      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input className="p-text" type="text" placeholder="Your Name" value={toSend.from_name}
              name="from_name"
              id="outlined-basic"
              label="Name" onChange={handleChangeInput} required/>
          </div>
          <div className="app__flex">
            <input className="p-text" type="email" placeholder="Your Email" value={toSend.reply_to}
              name="reply_to"
              id="outlined-basic"
              label="Email" onChange={handleChangeInput} required />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Your Message"
              value={toSend.message}
              name="message"
              id="outlined-basic"
              label="Message"
              onChange={handleChangeInput}
              required
            />
          </div>
          <button type="button" className="p-text" onClick={sendEmail}>{!loading ? 'Send Message' : 'Sending...'}</button>
          <h3 style={{color: "red"}}>
             {message}
          </h3>
        </div>
      ) : (
          <div>
            <h3 className="head-text">
             {message}
          </h3>
          </div>
        )}
        <Link to="/auth">
        <h1 style={{opacity: 0, fontSize: "6px"}}>h</h1>
        </Link>
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg',
);

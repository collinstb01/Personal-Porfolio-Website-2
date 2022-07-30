import React from 'react';
import { BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <a href="https://www.instagram.com/_techsavvy01/?hl=en" target="_blank">
       <BsInstagram />
       </a>
    </div>
    <div>
      <a href="https://mobile.twitter.com/EvbadoloyiE" target="_blank">
       <BsTwitter />
         </a>
    </div>
    <div>
      <a href="https://www.linkedin.com/in/collins-eguasa-181200239" target="_blank">
       <BsLinkedin />
        </a>
    </div>
  </div>
);

export default SocialMedia;

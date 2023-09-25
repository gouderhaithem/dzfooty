import React from "react";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { PageAnimation } from "../Animation";

const ContactForm = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_5ij1n5i",
        "template_o4miw4l",
        form.current,
        "MuHASLlm-MvOT_AVG"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <motion.div
      className="card-container"
      variants={PageAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
     
    >
      <form ref={form} onSubmit={sendEmail}>
        <input
          name="from_name"
          type="text"
          class="feedback-input"
          placeholder="Name"
        />
        <input
          name="user_email"
          type="text"
          class="feedback-input"
          placeholder="Email"
        />
        <textarea
          name="message"
          class="feedback-input"
          placeholder="Comment"
        ></textarea>
        <input type="submit" value="SUBMIT" />
      </form>
    </motion.div>
  );
};

export default ContactForm;

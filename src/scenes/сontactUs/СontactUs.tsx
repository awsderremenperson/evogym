import { useForm } from "react-hook-form";
import { SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
import ContactUsPageGraphic from "@/assets/ContactUsPageGraphic.png";
import HText from "@/shared/HText";
import { sendForm } from "emailjs-com";
import { useState, useRef } from "react";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const ContactUs = ({ setSelectedPage }: Props) => {
  const inputStyles = `mb-5 w-full rounded-lg bg-primary-300
  px-5 py-3 placeholder-white`;

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const onSubmit = (data: any) => {
    if (!formRef.current) return;

    setIsSending(true);

    sendForm(
      'service_t7l40sj',
      'template_0jqq9nf',
      formRef.current,
      'XFyXxxZKV0BO5hIzx'
    )
      .then(() => {
        setIsSent(true);
        setIsSending(false);
        formRef.current?.reset(); // Очистка формы после успешной отправки
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsSending(false);
      });
  };

  return (
    <section id="contactus" className="mx-auto w-5/6 pt-24 pb-32">
      <motion.div onViewportEnter={() => setSelectedPage(SelectedPage.ContactUs)}>
        {/* HEADER */}
        <motion.div
          className="md:w-3/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <HText>
            <span className="text-primary-500">JOIN NOW</span> TO GET IN SHAPE
          </HText>
          <p className="my-5">
            Congue adipiscing risus commodo placerat. Tellus et in feugiat nisl
            sapien vel rhoncus. Placerat at in enim pellentesque. Nulla
            adipiscing leo egestas nisi elit risus sit. Nunc cursus sagittis.
          </p>
        </motion.div>

        {/* FORM AND IMAGE */}
        <div className="mt-10 justify-between gap-8 md:flex">
          <motion.div
            className="mt-10 basis-3/5 md:mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
              <input
                className={inputStyles}
                type="text"
                placeholder="NAME"
                {...register("name", {
                  required: "This field is required.",
                  maxLength: {
                    value: 100,
                    message: "Max length is 100 characters.",
                  },
                })}
              />
              {errors.name && (
                <p className="mt-1 text-primary-500">{errors.name.message}</p>
              )}

              <input
                className={inputStyles}
                type="text"
                placeholder="EMAIL"
                {...register("email", {
                  required: "This field is required.",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address.",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-primary-500">{errors.email.message}</p>
              )}

              <textarea
                className={inputStyles}
                placeholder="MESSAGE"
                rows={4}
                cols={50}
                {...register("message", {
                  required: "This field is required.",
                  maxLength: {
                    value: 2000,
                    message: "Max length is 2000 characters.",
                  },
                })}
              />
              {errors.message && (
                <p className="mt-1 text-primary-500">{errors.message.message}</p>
              )}

              <button
                type="submit"
                className={`mt-5 rounded-lg px-20 py-3 transition duration-500 ${
                  isSending
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-secondary-500 hover:text-white"
                }`}
                disabled={isSending}
              >
                {isSending ? "Sending..." : "SUBMIT"}
              </button>
            </form>
            {isSent && (
              <p className="mt-3 text-green-500">Message sent successfully!</p>
            )}
          </motion.div>

          <motion.div
            className="relative mt-16 basis-2/5 md:mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="w-full before:absolute before:-bottom-20 before:-right-10 before:z-[-1] md:before:content-evolvetext">
              <img
                className="w-full"
                alt="contact-us-page-graphic"
                src={ContactUsPageGraphic}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactUs;

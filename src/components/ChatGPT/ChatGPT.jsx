import clsx from "clsx";
import styles from './ChatGPT.module.scss'
import { useEffect, useState } from "react";
import chatGPT from '../../assets/imgs/chatgpt/chatbot.jpg';
import { IoSend } from "react-icons/io5";
import { GrLinkPrevious } from "react-icons/gr";
import { useSelector, useDispatch } from 'react-redux';
import { chatgptSlice } from "../../stores/slices/chatgptSlice";
import { notification } from "antd";
const apiKey = `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`;
const apiKey1 = `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`;
export default function ChatGPT() {
     const [isSubmit, setIsSubmit] = useState(true)
     const { name } = useSelector(state => state.user.userInfo);
     const dispatch = useDispatch();
     const { toggle } = chatgptSlice.actions;
     const [arrayBot, setArrayBot] = useState([`Hello there! How can I help you today.`]);
     const [arrayUser, setArrayUser] = useState([]);
     const [value, setValue] = useState("");
     async function generateCompletion(value) {
          if (value) {
               const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
                    method: 'POST',
                    headers: {
                         "Content-Type": "application/json",
                         "Authorization": `Bearer ${apiKey1}`

                    },
                    body: JSON.stringify({
                         "model": "gpt-3.5-turbo",
                         "messages": [
                              {
                                   "role": "system",
                                   "content": value
                              },
                              {
                                   "role": "user",
                                   "content": value
                              }
                         ],
                         "max_tokens": 200


                    })
               })
               const data = await response.json();
               return data;
          }
          return null;
     }
     const handleSubmit = (e) => {
          e.preventDefault();
          if (value) {
               setArrayUser([...arrayUser, value]);
               setArrayBot([...arrayBot, "..."]);
               setIsSubmit(false);
               setValue("");


          }
     }
     useEffect(() => {
          generateCompletion(arrayUser[arrayUser.length - 1]).then(data => {
               const dataBot = JSON.parse(JSON.stringify(arrayBot));
               dataBot.splice(arrayBot.length - 1, 1);
               if (data) {
                    setArrayBot([...dataBot, data.choices[0].message.content]);
                    setIsSubmit(true);
               }
          }).catch((err) => {
               if (arrayUser.length > 0) {
                    const dataBot = JSON.parse(JSON.stringify(arrayBot));
                    dataBot.splice(arrayBot.length - 1, 1);
                    setArrayBot([...dataBot, "đang có lỗi xảy ra"])
                    setIsSubmit(true);
               }
          })


     }, [arrayUser]);
     const handleHidden = () => {
          dispatch(toggle(false));

     }
     const validateForm = (e) => {
          e.preventDefault();

     }
     return (
          <div className={clsx(styles.chatGpt)}>
               <button
                    onClick={handleHidden}
                    className={clsx(styles.btnToggle)}>
                    <GrLinkPrevious className={clsx(styles.icon)} />
               </button>
               <div className={clsx(styles.listQuestions)}>
                    {
                         arrayBot.map((message, i) => {

                              return (<div key={i}>
                                   <div className={styles.bot}>
                                        <div className={clsx(styles.chatResponse)}>
                                             <img src={chatGPT} alt="avatar" />
                                             <span className={clsx(styles.message)}>
                                                  {message}
                                             </span>
                                        </div>
                                   </div>
                                   {
                                        arrayUser.length > 0 && i <= arrayUser.length - 1 && (
                                             <div className={styles.user}>
                                                  <div className={clsx(styles.chatResponse)}>
                                                       <span className={clsx(styles.message)}>
                                                            {arrayUser[i]}
                                                       </span>
                                                       <span className={clsx(styles.avatar)}>{name.length > 0 && name[0].toUpperCase()}</span>
                                                  </div>
                                             </div>
                                        )

                                   }

                              </div>)
                         })




                    }
               </div>
               <div

                    className={clsx(styles.fromWrap)}>
                    <form

                         onSubmit={isSubmit ? handleSubmit : validateForm}
                         className={clsx(styles.btnSumbit)}>
                         <div className={clsx(styles.fromGroup)}>
                              <input
                                   onChange={(e) => setValue(e.target.value)}
                                   value={value}
                                   type="text"
                                   placeholder="Enter your message..." />
                              <button>
                                   <IoSend />
                              </button>
                         </div>
                    </form>

               </div>

          </div>
     )
}

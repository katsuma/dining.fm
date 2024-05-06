'use client'

import { useChat } from 'ai/react'
import { FiSmile } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";
import ReactMarkdown from "react-markdown";

import '@/app/layout.css'
import styles from '@/app/question/page.module.css';

export default function Page() {
  const { messages, isLoading, input, handleInputChange, handleSubmit } = useChat();

  return (
    <section className='section' suppressHydrationWarning={true}>
      <h2 className='title'>AIディレクターへの質問</h2>
      <div className={styles.messages}>
        {messages.map((message) => (
          <div key={message.id} className={styles.message}>
             {
               message.role === 'user' ?
               <><FiSmile /><span>あなた</span></>:
               <><RiRobot2Line /><span>AIディレクター</span></>
             }
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        ))}
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            value={input}
            onChange={handleInputChange}
            placeholder="例）和菓子に関するエピソードを教えて"
          />
          <button type="submit" className={styles.button}>質問</button>
        </form>
      </div>
    </section>
  );

}

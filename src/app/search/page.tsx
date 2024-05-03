'use client'

import { useChat } from 'ai/react'
import { FiSmile } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";
import ReactMarkdown from "react-markdown";

import '@/app/layout.css'
import styles from '@/app/search/page.module.css';

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <section className='section'>
      <h2 className='title'>AIエピソード検索</h2>

      <div className={styles.messages}>
        {messages.map(message => (
          <div key={message.id} className={styles.message}>
            {
              message.role === 'user' ?
              <><FiSmile /><span>あなた</span></>:
              <><RiRobot2Line /><span>AI</span></>
            }
            <ReactMarkdown>{message.content}</ReactMarkdown>
            {message.role === 'user' ? <FiSmile /> : <RiRobot2Line />}
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="prompt"
          value={input}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="例）和菓子に関するエピソードを教えて"
          id="input"
        />
        <button type="submit" className={styles.button}>質問</button>
      </form>

    </section>
  )
}

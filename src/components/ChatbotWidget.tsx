"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Bot } from "lucide-react";
import styles from "./ChatbotWidget.module.css";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.chatBox}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.header}>
              <div className={styles.headerTitle}>
                <Bot size={18} />
                <span>AI Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className={styles.closeBtn} aria-label="Close Chat">
                <X size={16} />
              </button>
            </div>
            <div className={styles.body}>
              <div className={styles.message}>
                <div className={styles.avatar}>
                  <Bot size={16} />
                </div>
                <div className={styles.messageBubble}>
                  <p style={{ color: "var(--text-primary)", fontWeight: 500, marginBottom: "8px" }}>
                    Under Development 🚧
                  </p>
                  <p>
                    This AI assistant feature is currently being built. Please come back later. Sorry for the inconvenience!
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.footer}>
              <div className={styles.inputMock}>Type a message...</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        className={styles.fab} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Chat"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </>
  );
}

// CollaborativeEditor.jsx
import React, { useEffect, useState, useRef } from 'react';
import { io } from "socket.io-client";

const socket = io("http://localhost:4000"); // Your backend URL

const CollaborativeEditor = () => {
  const [content, setContent] = useState("");
  const isLocalChange = useRef(false);

  useEffect(() => {
    // Receive initial document content
    socket.on('document', (initialContent) => {
      setContent(initialContent);
    });

    // Receive updates from others
    socket.on('content-change', (newContent) => {
      if (!isLocalChange.current) {
        setContent(newContent);
      }
      isLocalChange.current = false;
    });

    // Cleanup on unmount
    return () => {
      socket.off('document');
      socket.off('content-change');
    };
  }, []);

  // Handle local changes
  const handleChange = (event) => {
    const newContent = event.target.value;
    setContent(newContent);
    isLocalChange.current = true;

    // Send new content to server
    socket.emit('content-change', newContent);
  };

  return (
    <textarea
      style={{
        width: "100%",
        height: "400px",
        fontSize: "1rem",
        padding: "1rem",
        boxSizing: "border-box",
        fontFamily: "monospace",
        borderRadius: "8px",
        border: "1px solid #ccc",
        resize: "vertical",
      }}
      value={content}
      onChange={handleChange}
      placeholder="Start typing and collaborate in real-time..."
      spellCheck={false}
    />
  );
};

export default CollaborativeEditor;

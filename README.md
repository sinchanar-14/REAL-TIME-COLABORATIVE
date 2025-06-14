# REAL-TIME-COLABORATIVE

# real-time-colaborative

*COMPANY*: CODTECH IT SOLUTIONS

*NAME*: SHARADHI B

*INTERN ID*: CT04DN1126

*DOMAIN*: WEB DEVELOPER  

*DURATION*: 4 WEEKS

*MENTOR NAME*: NEELA SANTOSH

The `CollaborativeEditor.jsx` component is a simple yet functional React-based real-time collaborative text editor that uses **Socket.IO** to synchronize text input across multiple users connected to the same server. It demonstrates the foundational concepts behind collaborative applications such as Google Docs, where changes made by one user are instantly reflected for all others.

### 📄 Component Overview

At its core, the `CollaborativeEditor` is a React functional component that renders a `<textarea>` element. Users can type freely in this editor, and their input is shared with other connected clients via a WebSocket connection managed by Socket.IO.

### 🔌 Real-Time Communication with Socket.IO

The line `const socket = io("http://localhost:4000");` establishes a WebSocket connection to a Socket.IO server running on `localhost` at port `4000`. This connection is used to send and receive updates about the document content.

The `useEffect` hook is used to register two listeners:

1. **`document` event** – Receives the initial state of the document when a new client connects. This allows new users to see the latest version of the document already being edited by others.
2. **`content-change` event** – Listens for changes made by other users. When such a change is received, the component updates its local state unless the change originated from the local user (to avoid duplicate rendering).

These listeners are cleaned up when the component unmounts, ensuring there are no memory leaks or unintended behavior when the user leaves the page.

### ✏️ Handling User Input

The `handleChange` function is triggered every time the user types something into the textarea. It updates the local `content` state and flags the change as a "local" one using a `useRef` hook called `isLocalChange`. This flag is important: it prevents the editor from redundantly applying the same update received back from the server (i.e., the one it just sent out).

Once the new content is set, it emits a `content-change` event through the WebSocket, informing the server and all other clients of the update.

### 💡 Why `useRef`?

The `isLocalChange` ref is crucial for distinguishing between local and remote changes. If this check didn’t exist, a user’s own change might be reapplied unnecessarily, potentially causing cursor jumps or input lag.

### 🧪 UI and Styling

The UI consists of a single `<textarea>` styled for a better writing experience:

* Full width
* 400px height
* Monospaced font for code-style editing
* Padded and responsive layout

This minimalist approach keeps the focus on core functionality rather than appearance, though it can be extended with rich editors like CodeMirror or Monaco.

### 🔧 Extendability

This component is easily extendable to support:

* Multiple documents
* Cursor tracking
* User presence indicators
* Real-time syntax highlighting

### 🚀 Summary

`CollaborativeEditor.jsx` is a clean and effective entry point for building real-time collaborative text applications. It leverages React for the UI and Socket.IO for fast, event-based data exchange, making it ideal for prototypes, internal tools, or learning projects.

*OUTPUT*:<img width="797" alt="Image" src="https://github.com/user-attachments/assets/d319b74b-17bf-4e31-8647-40920d79fcbc" />


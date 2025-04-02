// Main JavaScript File (Handles Posting & Comments)
document.addEventListener('DOMContentLoaded', () => {
    const postButton = document.getElementById('post-button');
    const postContent = document.getElementById('post-content');
    const postsSection = document.getElementById('posts');

    postButton.addEventListener('click', () => {
        const content = postContent.value.trim();
        if (content) {
            createPost(content);
            postContent.value = '';
        }
    });

    function createPost(content) {
        const post = document.createElement('div');
        post.className = 'post';
        post.innerHTML = `
            <p>${content}</p>
            <div class="comments"></div>
            <textarea class="comment-content" placeholder="Write a comment..."></textarea>
            <button class="comment-button">Comment</button>
        `;
        postsSection.prepend(post);

        const commentButton = post.querySelector('.comment-button');
        const commentContent = post.querySelector('.comment-content');
        const commentsSection = post.querySelector('.comments');

        commentButton.addEventListener('click', () => {
            const comment = commentContent.value.trim();
            if (comment) {
                createComment(commentsSection, comment);
                commentContent.value = '';
            }
        });
    }

    function createComment(commentsSection, content) {
        const comment = document.createElement('div');
        comment.className = 'comment';
        comment.innerHTML = `<p>${content}</p>`;
        commentsSection.appendChild(comment);
    }
});

// React Components
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

// Home Component
function Home() {
    return (
        <div>
            <h1>Welcome to All Eyes on Gaza</h1>
            <p>Stand with Palestine. Share, discuss, and raise awareness.</p>
            <div id="posts"></div>
            <textarea id="post-content" placeholder="Write a post..."></textarea>
            <button id="post-button">Post</button>
        </div>
    );
}

// Register Component
function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/register', { username, password });
            console.log(response.data);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Register</button>
        </form>
    );
}

// App Component
function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/register" component={Register} />
            </Switch>
        </Router>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;

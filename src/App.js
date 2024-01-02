import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/Signup';
import LogIn from './components/Login';
import StaticPosts from './components/StaticPosts';
import Post from './components/Post';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path='/' element={<SignUp />} />
                    <Route path='/login' element={<LogIn />} />
                    <Route path='/staticposts' element={<StaticPosts />} />
                    <Route path='/posts/:id' element={<Post />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

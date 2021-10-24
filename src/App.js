import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar';
import AddPostForm from './features/posts/AddPostForm';
import EditPostForm from './features/posts/EditPostForm';
import NewPostSub from './features/posts/NewPostSub';
import PostList from './features/posts/PostList'; 
import { SinglePostPage } from './features/posts/SinglePostPage';
import SingleUserPage from './features/users/singleUserPage';
import UsersList from './features/users/UsersList';


function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment> 
                <AddPostForm/>
                <PostList/>
              </React.Fragment>
            )}
          /> 
          <Route exact path="/posts/:postId" component={SinglePostPage}/> 
          <Route exact path="/editPost/:id" component={EditPostForm}/> 
          <Route exact path="/subscriptions" component={NewPostSub}/>
          <Route exact path="/users" component={UsersList}/>
          <Route exact path="/user/:userId" component={SingleUserPage}/>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App

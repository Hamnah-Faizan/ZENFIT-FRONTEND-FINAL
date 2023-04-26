
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('/community/posts');
      setPosts(response.data.posts);
    };
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      const response = await axios.post(`/community/${postId}/like`);
      console.log(response.data.message);
      // update the state of posts to reflect the new like
    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = async (postId) => {
    try {
      const response = await axios.post(`/community/${postId}/comment`, {
        text: newComment,
      });
      console.log(response.data.message);
      // update the state of posts to reflect the new comment
      setNewComment('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Community Page</h1>
      {posts.map((post) => (
        <div key={post._id}>
          <p>{post.status}</p>
          <p>Likes: {post.likes.length}</p>
          <button onClick={() => handleLike(post._id)}>Like</button>
          <div>
            {post.comments.map((comment) => (
              <div key={comment._id}>
                <p>{comment.user.username}: {comment.text}</p>
              </div>
            ))}
            <input
              type="text"
              placeholder="Write a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={() => handleComment(post._id)}>Comment</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommunityPage;


import React from 'react';
import { useDispatch } from 'react-redux';
import { reactions } from './postsSlice';
function ReactionButtons({post}) {
  const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀',
  }  
  const dispatch = useDispatch()

  const onReactionClick = (reaction) => {
        console.log("Reaction", reaction, "pressed");
        dispatch(reactions({reaction,id:post.id}))
  }
  return Object.entries(reactionEmoji).map((element) => (
    <div>
      <button style={{backgroundColor:'transparent'}} onClick={()=>onReactionClick(element[0])} >{element[1]}</button>
      {post.reactions[element[0]]}
    </div>
  ))
}

export default ReactionButtons

import React from 'react'
import { useDispatch } from 'react-redux'
import { reactions } from './postsSlice'
function ReactionButtons({ post }) {
  const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀',
  }
  const dispatch = useDispatch()

  const onReactionClick = (reaction) => {
    console.log('Reaction', reaction, 'pressed')
    dispatch(reactions({ reaction, id: post.id }))
  }
  return (
    <div style={{ display: 'flex' }}>
      {Object.entries(reactionEmoji).map((element) => (
        <>
          <button
            style={{ backgroundColor: 'transparent', padding:'10px'}}
            onClick={() => onReactionClick(element[0])}
          >
            {element[1]}
          </button>
          {post.reactions[element[0]]}
        </>
      ))}
    </div>
  )
}

export default ReactionButtons

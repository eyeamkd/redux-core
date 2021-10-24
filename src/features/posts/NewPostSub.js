import React from 'react'; 
import store from '../../app/store';

function NewPostSub() {  
    const appStore = store.getState(); 
    const [updates, setUpdates] = React.useState([]);
    const handleUpdates = (e) => {
        console.log("State is changed!",e); 
    } 
    store.subscribe(handleUpdates)
    return (
        <div>
            <h2>Subscriptions</h2>
        </div>
    )
}

export default NewPostSub

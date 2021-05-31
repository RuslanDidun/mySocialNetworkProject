import React from 'react';

let initialState = {
    friendsList: [
        {id: 1, name: 'Olga'},
        {id: 2, name: 'Anna'},
        {id: 3, name: 'Amanda'}
    ]
}

const sidebarReducer = (state=initialState, action) => {
    return state
}

export default sidebarReducer;
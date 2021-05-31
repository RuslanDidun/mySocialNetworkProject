const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

let initialState = {
    users: [
        {
            id: 1,
            photoUrl: '',
            followed: false,
            fullName: 'Milena',
            status: 'Funny Dude',
            location: {city: 'Calgary', country: 'Canada'}
        },
        {
            id: 2,
            photoUrl: '',
            followed: false,
            fullName: 'Jayme',
            status: 'silly girl',
            location: {city: 'Edmonton', country: 'Canada'}
        },
        {
            id: 3,
            photoUrl: '',
            followed: true,
            fullName: 'Mykala',
            status: 'Perfect voice',
            location: {city: 'Lethbridge', country: 'Canada'}
        },
        {
            id: 4,
            photoUrl: '',
            followed: true,
            fullName: 'Ksenia',
            status: 'Your dream ',
            location: {city: 'Kyiv', country: 'Ukraine'}
        },
    ]
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
            return state;
        case SET_USERS: {
            return {...state, users: [...state.users, ...action.users ]}
        }
        default:
            return state;
    }
}

export const followAC = (userId) => ({type: FOLLOW, userId})
export const unfollowAC = (userId) => ({type: UNFOLLOW, userId})
export const setUsersAC = (users) => ({type: SET_USERS, users})

export default usersReducer;
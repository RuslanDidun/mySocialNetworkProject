import axios from "axios";
//DAL COMPONENT
const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'cb23f35d-ab67-4a69-88b7-8930661a2897'
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=
        ${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            });
    },
    follow(userId) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId) {
        return instance.get(`profile/` + userId);

    },

}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    }
}







export const getUsers2 = (u: any) => {
    return instance.get(`follow/${u.id}`)
        .then(response => {
            return response.data
        });
}



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
        return instance.post(`follow/${userId}`);
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`);
    },
    getProfile(userId) {
        console.warn('Obsolete method. Please Use profileAPI')
        return profileAPI.getProfile(userId);
    },

}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false,captcha) {
        return instance.post(`auth/login`, {email, password, rememberMe,captcha});
    },
    logout() {
        return instance.post(`auth/login`, )
    }
}


export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId);
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId);
    },
    updateStatus(status) {
        return instance.put(`profile/status/`, {status: status});
    }
}
 export const securityApi = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    }
 }
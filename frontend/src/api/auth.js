import client from "./client";

export const createUser = async (userInfo) => {
    try{
        const {data} = await client.post('/user/create',userInfo)
        return data;
    } catch (e) {
        const {response} = e
        if(response?.data) return response.data;

        return {error: e.message || e}
    }
}
export const verifyUserEmail = async (userInfo) => {
    try{
        const {data} = await client.post('/user/verify-email',userInfo)
        return data;
    } catch (e) {
        const {response} = e
        if(response?.data) return response.data;

        return {error: e.message || e}
    }
}
export const signInUser = async (userInfo) => {
    try{
        const {data} = await client.post('/user/sign-in',userInfo)
        return data;
    } catch (e) {
        const {response} = e
        if(response?.data) return response.data;

        return {error: e.message || e}
    }
}
export const getIsAuth = async (token) => {
    try{
        const {data} = await client.get('/user/is-auth',{
            headers:{
                Authorization:"Bearer " + token,
                accept:"application/json"
            }
        })
        return data;
    } catch (e) {
        const {response} = e
        if(response?.data) return response.data;

        return {error: e.message || e}
    }
}
export const verifyPasswordResetToken = async (token, userId) => {
    try {
        const { data } = await client.post("/user/verify-pass-reset-token", {
            token,
            userId,
        });
        return data;
    } catch (error) {
        const { response } = error;
        if (response?.data) return response.data;

        return { error: error.message || error };
    }
};

export const resetPassword = async (passwordInfo) => {
    try {
        const { data } = await client.post("/user/reset-password", passwordInfo);
        return data;
    } catch (error) {
        const { response } = error;
        if (response?.data) return response.data;

        return { error: error.message || error };
    }
};

export const resendEmailVerificationToken = async (userId) => {
    try {
        const { data } = await client.post("/user/verify-pass-reset-token", {userId});
        return data;
    } catch (error) {
        const { response } = error;
        if (response?.data) return response.data;

        return { error: error.message || error };
    }
};
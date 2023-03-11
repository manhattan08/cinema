import {catchError, getToken} from "../utils/helper";
import client from "./client";

export const getAppInfo = async () => {
    try {
        const token = getToken();
        const {data} = await client('/admin/app-in', {
            headers: {
                authorization: "Bearer " + token
            },
        })
        return data;
    } catch (e) {
        return catchError(e)
    }
}
export const getMostRatedMovies = async () => {
    try {
        const token = getToken();
        const {data} = await client('/admin/most-rated', {
            headers: {
                authorization: "Bearer " + token
            },
        })
        return data;
    } catch (e) {
        return catchError(e)
    }
}
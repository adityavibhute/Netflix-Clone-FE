import { useState, useEffect } from 'react';
import { useUserContext } from './userContext';
import { storeState } from './store/store.constants';
import axios from 'axios';

export const useLoggedInUser = (url) => {
    let {
        userDetails,
        dispatch,
    } = useUserContext();

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const cookieData = document.cookie.indexOf('=');
            const sessionID = document?.cookie?.slice(cookieData + 1);
            await axios({
                method: 'post',
                url: url,
                data: {
                    sessionID: sessionID,
                },
                withCredentials: true
            }).then((res) => {
                const responseData = res?.data;
                dispatch({ type: storeState.SAVE_USER_DETAILS, payload: responseData?.userDetails });
                setLoading(false);
                setData(responseData?.userDetails);
            }).catch((e) => {
                console.log('Error in login user', e);
            });
        };

        if (userDetails?.token) {
            setData(userDetails);
            setLoading(false);
        } else if ((document?.cookie && document.cookie.includes('sessionID')) || userDetails?.token) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [url, dispatch, userDetails]);

    return { loading, data };
}
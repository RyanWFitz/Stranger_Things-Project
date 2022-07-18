const STRANGER_API_URL = 'https://strangers-things.herokuapp.com/api/2204-FTB-MT-WEB-PT'

export const apiCall = async (url, method = 'GET', token, body) => {
    let data = false;
    try {
        const response = await fetch(
            STRANGER_API_URL + url,
            setToken(getFetchOPtions(method, body), token)
        );
        data = await response.json();

        if (data.error) {
            throw data.error;
        }

    } catch (e) {
        console.error(e);
    }

    return data;
}

const getFetchOPtions = (method, body) => {
    return {
        method: method.toUpperCase(),
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
}

const setToken = (body, token) => {
    if (token) {
        body.headers = Object.assign(body.headers, { 'Authorization': `Bearer ${token}` })
    }
    return body;
}

// Use below to set the endpoints for each component that will be used/directed to


export const loginUser = async (username, password) => {
    const login = await apiCall("/users/login", "POST", null, {
        user: { username, password }
    })
    const user = await apiCall("/users/me", 'GET', login.data.token)
    console.log('im the user', user)
    return {
        user: user.data,
        token: login.data.token
    };
}

export const registerUser = async (username, password) => {
    const registration = await apiCall("/users/register", "POST", null, {
        user: { username, password }
    })
    const user = await apiCall("/users/me", null, registration.data.token)
    console.log('new one this time', user)
    return {
        user: registration.data.user,
        token: registration.data.token
    };
}

export const getUserData = async (token) => {
    const data = await apiCall(`/users/me`, 'GET', token)
    console.log('am i getting this?', data)    
    return data
}

export const submitMessage = async (token, postId, message) => {
    const fetched = await apiCall(`/posts/${postId}/messages`, "POST", token,
    {   
        message: {content: message}
    })
    return fetched
}


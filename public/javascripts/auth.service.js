var accessToken = '';

async function getToken()
{
    return localStorage.getItem('access-token');
}

async function setToken(token)
{
    localStorage.setItem('access-token', token);
}

async function removeToken()
{
    localStorage.removeItem('access-token');
}

async function loginUser(email, password)
{
    await postData(`${ baseURL }/auth/login`, { email: email, password: password })
        .then(data => {
            setToken(data[0].accessToken);
        });
}

async function registerUser(reqBody)
{
    await postData(`${ baseURL }/auth/register`, reqBody)
        .then(reply => {
            return reply;
        });
}

async function logoutUser()
{
    await removeToken('access-token');
}

// TODO
// Implement this function
// For now the function has been bypassed for development purposes
async function userVerified()
{
    accessToken = await getToken();
    if(!accessToken)
    {
        return false;
    }
    return true;
}
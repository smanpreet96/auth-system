async function routeData(url = '', token = '')
{
    let response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            "Content-Type": 'application/json',
            "X-Access-Token": token
        },
        redirect: 'follow'
    });
    if(response.ok)
    {
        return response.url;
    }
}

async function getData(url = '', token = '')
{
    let response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            "Content-Type": 'application/json',
            "X-Access-Token": token
        },
        redirect: 'follow'
    });
    if(response.ok)
    {
        return response.json();
    }
}

async function postData(url = '', data = {})
{
    let response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(data)
    });
    if(response.ok)
    {
        return response.json();
    }
}

async function deleteData(url = '', data = {})
{
    let response = await fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            "Content-Type": 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(data)
    });
    if(response.ok)
    {
        return response.json();
    }
}
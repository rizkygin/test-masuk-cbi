import { useState } from "react";


type userInput = {
    email: string
    password: string
}

type user = {
    berarToken: string;
    name: string;
    department: string;
    position: string;
}

export default async function getUser(userInput: userInput) {

    const data = new URLSearchParams({
        'email': userInput.email,
        'password': userInput.password
    });
    return fetch('https://auth.srs-ssms.com/api/dev/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data
    })
        .then((response) => { return response.json() })
        .then((data) => {
            console.log(data);
            if (data.statusCode === 1) {
                const user: user = {
                    berarToken: data.data.api_token,
                    name: data.data.name,
                    department: data.data.department,
                    position: data.data.position
                }
                localStorage.setItem('token', data.data.api_token);
                sessionStorage.setItem('user', JSON.stringify(data.data));
                return data.data;
            }
        })
        .catch((error) => {
        });
}
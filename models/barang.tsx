import { useState } from "react";

export interface Barang {
    id: number;
    item_name: string;
    stock: number;
    unit: string;
    editName: boolean;
}

export default function getListBarang() {

    return fetch('https://auth.srs-ssms.com/api/dev/list-items', {
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then((response) => {
        return response.json();
    }).then((data) => {
        // console.log(data);
        return data.data;
    })
}


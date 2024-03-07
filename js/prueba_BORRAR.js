const http = require('node:http');
const CryptoJS = require('crypto-js');

const publicKey = '7ffb940ea8959e190f046e1af43ea9b9';
const privateKey = 'dd741e9af4409424e64b257d788e15fa5eda9ac4';
const timestamp = new Date().getTime();
const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();
const characterName = 'Wolverine';

const apiUrl = 'https://gateway.marvel.com/v1/public/characters';
const fullUrl = `${apiUrl}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&name=${encodeURIComponent(characterName)}`;

const server = http.createServer(
    function (sol,res){

        fetch(fullUrl)
        .then(response => response.json())
        .then(data => {
          // Check if any characters were found
          if (data.code === 200 && data.data.total > 0) {
            const character = data.data.results[0]; // Get the first character found
            // Extract and display information about the character
            console.log('Name:', character.name);
            console.log('Description:', character.description);
            console.log('Thumbnail:', character.thumbnail);
            // Add any other information you want to extract
          } else {
            console.log('No characters found with that name.');
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
            
        });

server.listen(3000, '127.0.0.1', function(){
    console.log("Servidor escuchando");
}
);


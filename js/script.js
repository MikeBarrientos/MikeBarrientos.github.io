const http = require('node:http');
const querystring = require('node:querystring');
const url = require('node:url');

//OPENAI
const server = http.createServer(
    async function (sol,res){

        const client_id='c5f43f30fd604325832590c67957d246';
        const client_secret='813042f218114d4fb355148f32f3a665';
        const endpoint_spotify="https://accounts.spotify.com/api/token";

        const p = url.parse(sol.url); // Varible que toma una URL como entrada y devuelve un objeto con varias propiedades que representan diferentes partes de la URL
        const query  = querystring.parse(p.query); // Variable que analiza la parte de la consulta de la URL
        const nombreCancion= query.cancion; //varible que almacenara el nombre de la cancion ingresado en la URL


        //Esta funcion de getToken, lo que hace es que damos las credenciales a la API para obtener el token de acceso a las api
        const getToken = async () => {
            const resultado = await fetch(endpoint_spotify, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret
            });
    
            const datatoken = await resultado.json();
            return datatoken.access_token;
        };

        // //Una funcion para obtener el ID de una cancion
        

        const getTrack = async (nombreCancion,token)=> {
            const urlTrack=`https://api.spotify.com/v1/search?q=`+nombreCancion+`&type=track`;
            const response = await fetch(urlTrack,{
                method : 'GET',
                headers: { 'Authorization': 'Bearer ' + token}
            });
            return await response.json();
        };

        const token = await getToken();
        
        if(nombreCancion == null){
            res.write("Ingresa el nombre de la cancion en el URL como el siguiente ejemplo:\n ")
            res.write("http://localhost:3000/?cancion=Raton%20Vaquero")
            res.end();
        }else{
            const cancion= await getTrack(nombreCancion,token);

            const urlCancion = cancion.tracks.items[0].album.artists[0].external_urls.spotify;
            const artista = cancion.tracks.items[0].album.artists[0].name;
            const markets = cancion.tracks.items[0].album.available_markets.slice(0, 10);


            res.write("La cancion ingresa es: "+ nombreCancion);
            res.write ("\nEl nombre del artista es: " + artista);
            res.write("\nLink que te lleva al artista: " + urlCancion);
            res.write("\nLos paises donde se encuentra disponible son:\n")
            
            for (let i = 0; i < markets.length; i++) {
                res.write(`${i+1}`+ ".- " + markets[i]+ "\n")
            }
            //res.write(JSON.stringify(cancion));
            res.end();
        }
        
    });

server.listen(3000, '127.0.0.1', function() { 
    console.log("Servidor corriendo");
}); 





        // const  getID= async (nombreCancion,token)=> {
        //     const urlID='https://api.spotify.com/v1/search?q='+ encodeURIComponent(nombreCancion) +'&type=track';
        //     const response = await fetch(urlID,{
        //         method: 'GET',
        //         headers: {'Authorization': 'Bearer ' + token
        //     }
        //     });
        //     const dataId = await response.json();
        //     if(response.ok){
        //         const trackID = dataId.tracks.items[0].id;
        //         return trackID;
        //     }else{
        //         console.error('Error al obtener el ID de la canción:', dataId.error);
        //         return null;
        //     }
        // };
const http = require('node:http');
let message = "Hello chat"
const server = http.createServer(
    function (sol,res){
        const endpoint_ai='https://api.openai.com/v1/chat/completions'
        const opciones = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json','Authorization': 'Bearer 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' },
          body: JSON.stringify({ model: 'gpt-3.5-turbo', messages: [{"role": "user", "content": message}] })
      };
    
      fetch(endpoint_ai, opciones).then(
            function(respuesta){
                //console.log(respuesta);
            return respuesta.json();
          }
        ).then(
            function(j){
              let response = j.choices[0].message.content
              
              res.write(response)
              res.end();
          }
      );
            
    }
);

server.listen(3000, '127.0.0.1', function(){
    console.log("Servidor escuchando");
}
);


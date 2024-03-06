const http = require('node:http');

const server = http.createServer(
    function (sol,res){
        const endpoint_ai='https://api.openai.com/v1/chat/completions'
        const opciones = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json','Authorization': 'Bearer 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' },
          body: JSON.stringify({ model: 'gpt-3.5-turbo', messages: [{"role": "user", "content": "hello"}] })
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


console.log("Lalaland")


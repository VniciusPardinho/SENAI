const express = require("express");
const app = express();
const port = 8080;
function LidarComRequisicao(Req,Res){
    Res.send("Teste")

}
app.get("/sobre",(Req,Res) =>{
    Res.send("<h1>titulo</h1>")

})
app.listen(port, ()=> {
    console.log("Esta funcionando")
})
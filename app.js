const express = require('express')
const fs = require('fs')

  const app = express()



  app.get('/productos',async(req,res)=>{
    try {
        let productos = await fs.promises.readFile('./productos.json', 'utf-8')
        let productosParseados = JSON.parse(productos)
        let limite = parseInt(req.query.limit)
        let productosLimitados = [...productosParseados]
       console.log('aca',productos)
       res.send(productosParseados)
      
    
          if(isNaN(limite) && limite > 0){
           limitProducts = productosLimitados.slice(0,limite) // limita la cantidad de procutos
    
           if(limitProducts>0){
            res.send(limitProducts)
           }else{
           res.send(productosParseados) 
           }
    
          }

          
    } catch (error) {
        console.log(error)
    }
      
  })

  app.get('/productos/:id', async(req, res) => {
    try {
        let productos = await fs.promises.readFile('./productos.json', 'utf-8');
        let productsParsed = JSON.parse(productos)
        const productoId = req.params.id;

        let product = productsParsed.find((p) => p.id === productoId);

        if(!product) {
            return res.send({ error: "No se encuentra el producto" });
        } else {
            res.send(product);
        }
        
    } catch(error) {
        res.status(500).send(error);
    }
})



  app.listen(8040,()=>{
      console.log('Servidor corriendo')
  })
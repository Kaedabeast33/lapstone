const path = require("path")
const axios = require("axios")
// Coin API
const request = require('request');

;


const options = {
  method: 'GET',
  url: 'https://api.coinranking.com/v2/coins',
  headers: {
    'x-access-token': 'coinranking3718ebba97c71fc8c53f68e795f6a724d979e17c3515161d'
  }
};
request(options,  (error, response) => {
  if (error) throw new Error(error);
  
})

// fake data base
let watchlist1=[]
let watchlist1data=[]
let string="" 
// console.log(findIndex)


// class dummyData {
//     constructor(uuid,btcPrice,rank,tier,name,price,symbol){
//         this.uuid = uuid;
//         this.btcPrice = btcPrice;
//         this.rank = rank;
//         this.tier = tier;
//         this.name = name;
//         this.price = price;
//         this.symbol = symbol
//     }
// }
// let btc =new dummyData ("BTC",1,1,1,"bitcoin",23000,"BTC")
// let eth = new dummyData("Eth",10,2,2,"Ethereum",1400,"Eth")
// let ada = new dummyData("Ada",100,3,3,"Cardano")
module.exports = {
 getHTML: (req,res) => {
        // console.log(__dirname)
        res.sendFile(path.join(__dirname,"../client/index.html"))
    },
  getCoins: (req,res)=>{
       console.log("coins sending----")
        request(options,  (error, response) => {
            if (error) throw new Error(error);
            console.log(response.body)
            res.status(200).send(response.body)
        })
          
        

            
          },
          deleteCoin:(req,res)=>{
            watchlist1data=[]
            string = ""
            let {uuid}=req.body
            console.log("---uuid of req")
            console.log(uuid)
          //  filtering out the watchlist list of uuids
            watchlist1 = watchlist1.filter(function (el){
        
              return el.uuid !== uuid
            })
          
           console.log("---watchlist uuids after delete")
            console.log(watchlist1)
          
           
        // fore each of the uuids if it isn't empty add it to the string var
            watchlist1.forEach(element=>{
              let {uuid}= element
             if(uuid!=undefined){
              string+=`&uuids[]=${uuid}`}
        
              // console.log(string)
            })
            // get all the coins with the uuids in watchlist1
            console.log("the string to go into the url--->",`https://api.coinranking.com/v2/coins?uuids[]=yhjMzLPhuIDl`)
              axios.get(`https://api.coinranking.com/v2/coins?uuids[]=yhjMzLPhuIDl${string}`,{
                headers:{
                  'x-access-token': 'coinranking75e1dd3f13538d334657a42fb777317d53228bbab69b6b5c' 
                }
              })
         
              .then(dbres=>{
                console.log("---respnose from api")
                console.log(dbres.data.data.coins)
                
                watchlist1data=[]
                
                watchlist1data.push(dbres.data.data.coins)
                
                console.log("---wathlist1data-")
                console.log(watchlist1data)
                res.status(200).send(...watchlist1data)
        
              }).catch(err=>{
                console.log(err)
              
              })
          },

  
  addCoinToWatchlist:(req,res)=>{
    
    let {uuid} = req.body
  if(uuid!="coinRefresher" || uuid!="coinrefresher"){
    // console.log(req)
   
    // console.log(uuid)
    function findIndex() {
      var pos = watchlist1.map(function(e) {
          return e.uuid;
      }).indexOf(uuid);
      return pos
    
    }
    let check = findIndex()
    // console.log(check)
    
    if(check<0){
      watchlist1.push(req.body)
    }

  }

  
      watchlist1.forEach(element=>{
        let {uuid}= element
       
        string+=`&uuids[]=${uuid}`
      })

        axios.get(`https://api.coinranking.com/v2/coins?uuids[]=yhjMzLPhuIDl${string}`,{
          headers:{
            'x-access-token': 'coinranking75e1dd3f13538d334657a42fb777317d53228bbab69b6b5c' 
          }
        })
   
        .then(dbres=>{
          // console.log(dbres)
          watchlist1data = []
  //  console.log( dbres.data.data.coins)
          watchlist1data.push(dbres.data.data.coins)
          res.status(200).send(...watchlist1data)
  
        }).catch(err=>{
          console.log(err)
        
        })
      
  }
        
}



// client side code
import axios from "axios";//we use axios for making http request from the browser
import session from "express-session";
// getting all the addd to cart buttons from home page
let addToCart = document.querySelectorAll('.addToCart');
let cartCounter = document.querySelector('#cartCounter');

function updateCart(pizza){
    axios.post('/update-cart', pizza).then(res=>{
        cartCounter.innerText = res.data.totalQty;
        console.log(res)
    })
}


addToCart.forEach((btn)=>{
    btn.addEventListener('click', (e)=>{
       // here e is the event listened when the button is clicked
       let pizza = JSON.parse(btn.dataset.pizza); //here dataset.pizza is the name of the data attribute that we have given in the html code to the add to cart button in home.ejs
    //    also we convert the json file into objec again using the JSON.parse()
        updateCart(pizza)
    //    console.log(pizza);
    })
})
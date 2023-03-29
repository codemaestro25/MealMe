// client side code
import axios from "axios";//we use axios for making http request from the browser
import Noty from 'noty'
import {initAdmin} from './admin'; // ./ is used because we have admin.js in the same folder
import moment from "moment";

// getting all the addd to cart buttons from home page
let addToCart = document.querySelectorAll('.addToCart');
let cartCounter = document.querySelector('#cartCounter');

function updateCart(pizza){
    axios.post('/update-cart', pizza).then(res=>{
        cartCounter.innerText = res.data.totalQty;
        new Noty({
            type: 'success',
            text:"Item added to cart",
            timeout: 1000
        }).show();
        console.log(res)
    }).catch(err=>{
        new Noty({
            text: 'error',  
            text:'Something went wrong :(',
            timeout:1000
        }).show();
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

const alertMsg = document.querySelector('#success-alert');
if(alertMsg){
    setTimeout(()=>{
        alertMsg.remove();
    }, 2000)
}



// render order status
let statuses = document.querySelectorAll('.status_line');
let hiddenInput = document.querySelector('#hiddenInput'); // getting the hidden input placed on the statusOrder page
let order = hiddenInput?hiddenInput.value:null; //getting the value passed to the hiddenInput i.e. the order but as a string
order = JSON.parse(order); //converted the recieved string from order to object again
let time = document.createElement('small');

function updateStatus(order){
    statuses.forEach((statusEle)=>{
        // for removing the currently applied classes so these classes can be applied according to the updated current status in the later part of the code
        statusEle.classList.remove('step-completed');
        statusEle.classList.remove('current-status');

    })
    let stepCompleted = true; //due to this line the first step i.e. the order placed step will get greyyed automatically
    statuses.forEach((statusEle)=>{
        let dataProp = statusEle.dataset.status; // it will contain the data-attribute (data-status) value from the statusOrder,ejs
        if(stepCompleted && dataProp != 'completed'){
            statusEle.classList.add('step-completed');
        }
        if(dataProp === order.orderStatus){
            stepCompleted = false;
            time.innerText = moment(order.updatedAt).format('hh:mm A');
            statusEle.appendChild(time); //appending the small tag in the li of the statuOrder next to span
            if(statusEle.nextElementSibling){
                statusEle.nextElementSibling.classList.add('current-status'); //changing the next step after completed step to orange colour
            }
        }
    })
}

updateStatus(order);

// socket work for client side
let socket = io()
initAdmin(socket); // passing the socket element to admin.js
// joining the client in the private room
if(order){
    socket.emit('join', `order_${order._id}`) // we are giving a unique id to the private room so the order id is used here to give the name to the room
}

// for updating the admin page
let adminAreaPath = window.location.pathname;
if(adminAreaPath.includes('admin')){
    socket.emit('join', 'adminRoom'); //if the url contains admin that means we are accessing an admin page so if thats the case then create a room named 'adminRoom'
}

socket.on('orderUpdated', (data)=>{ //listening to the event sent from server.js
   
    const updatedOrder = { ...order } // ...order means here we  have copied the order object
    updatedOrder.updatedAt = moment().format();
    updatedOrder.orderStatus = data.orderStatus;
    updateStatus(updatedOrder);
    new Noty({
        type: 'success',
        text:"Order Updated",
        timeout: 1000
    }).show();
})
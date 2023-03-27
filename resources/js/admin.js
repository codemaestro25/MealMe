import axios from 'axios';
import moment from 'moment/moment';

export function initAdmin(){
    const orderTableBody = document.querySelector('#orderTableBody');
    let orders = [];
    let markup ;

    // calling ajax req beacause we dont want to refresh the admin order page everytime but only update the data in it

    axios.get('/admin/orders',{
        headers:{
            "X-Requested-With":"XMLHttpRequest"
        }
    }).then(res=> {
        orders = res.data; //getting the orders
        markup = generateMarkup(orders); //preparing the markup which will update the HTML
        
        orderTableBody.innerHTML = markup; //updating the page data using the markup
    }).catch(err=>{
        console.log(err);
    })

    function renderItems(items){
        let parsedItems = Object.values(items);
        return parsedItems.map((menuItem)=>{
            return `
            <p>${menuItem.item.name } - ${menuItem.qty} pcs </p>
            `
        }).join('')
    }

    function generateMarkup(orders){
        // console.log(orders);
        return orders.map(order =>{
            // console.log(order.orderStatus);
            return  `
            <tr>
    <td class="border px-4 py-2 text-green-900">
        <p>${order._id}</p>
        <div>${renderItems(order.items)}</div>
    </td>
    <td class="border px-4 py-2">${order.customerId.name}</td> 
    <td class="border px-4 py-2">${order.address}</td>
    <td class="border px-4 py-2">
        <div class="inline-block relative w-64">
            <form action="/admin/orders/status" method="POST">
                <input type="hidden" name="orderId" value="${order._id}">
                <select onchange="this.form.submit()" name="status" id="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="order_placed" ${order.orderStatus == 'order_placed' ? 'selected' : ''}>Placed</option>
                    <option value="confirmed" ${order.orderStatus == 'confirmed' ? 'selected' : ''}>Confirmed</option>
                    <option value="prepared" ${order.orderStatus == 'prepared' ? 'selected' :''}>Prepared</option>
                    <option value="delivered" ${order.orderStatus == 'delivered' ? 'selected' :''}>Delivered</option>
                    <option value="completed" ${order.orderStatus == 'completed' ? 'selected' :''}>Completed</option>
                   
                  </select>
            </form>
        </div>
    </td>
    <td class="border px-4 py-2">${order.phone}</td>
    <td class="border px-4 py-2">${moment(order.createdAt).format('hh:mm A')}</td>    

</tr>
            `
        }).join('');
    }
}


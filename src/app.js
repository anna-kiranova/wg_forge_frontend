// this is an example of improting data from JSON
import orders from '../data/orders.json';

export default (function() {
    // YOUR CODE GOES HERE
    // next line is for example only
    //document.getElementById("app").innerHTML = "<h1>Hello WG Forge " + orders.length + "</h1>";

    function createTable() {
        let app = document.getElementById('app');
        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');
        thead.innerHTML = `
            <tr>
                <th>Transaction ID</th>
                <th>User Info</th>
                <th>Order Date</th>
                <th>Order Amount</th>
                <th>Card Number</th>
                <th>Card Type</th>
                <th>Location</th>
            </tr>
        `;
        table.appendChild(thead);
        table.appendChild(tbody);
        app.appendChild(table);
    }
    createTable();

    function dateCustomFormat(unix) {
        let date = new Date(unix * 1000);

        let DD = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
        let MM = (date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
        let YYYY = date.getFullYear();
        let hh = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours();
        let AMPM = hh < 12 ? 'AM' : 'PM';
        let mm = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes();
        let ss = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds();
        date = DD + '/' + MM + '/' + YYYY + ', ' + hh + ':' + mm + ':' + ss + ' ' + AMPM;
        return date;
    }

    function screeningCardNumber(cn) {
        let card = cn.slice(0,2) + '********' + cn.slice(-4);
        return card;
    }

    let tbody = document.getElementsByTagName('tbody')[0];

    for (let i = 0; i < orders.length; i++) {
        let transaction_id = orders[i].transaction_id;
        let date = dateCustomFormat(orders[i].created_at);
        let user_id = orders[i].user_id;
        let total = orders[i].total;
        let card_number = screeningCardNumber(orders[i].card_number);
        let card_type = orders[i].card_type;
        let order_country = orders[i].order_country;
        let order_ip = orders[i].order_ip;


        tbody.innerHTML += `
            <tr id="order_${i}">
                <td id="transaction_id">${transaction_id}</td>
                <td id="user_info" class="user_data">${user_id}</td>
                <td id="order_date">${date}</td>
                <td id="order_amount">$${total}</td>
                <td id="card_number">${card_number}</td>
                <td id="card_type">${card_type}</td>
                <td id="location">${order_country} (${order_ip})</td>
            </tr>
        `;
    }
})();

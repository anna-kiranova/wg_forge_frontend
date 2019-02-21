import * as format from './format.js';
import { getUser, getOrders, getCompany } from './data';

export default (function() {
    let app = document.getElementById('app');
    let table = document.createElement('table');
    let orders = [...getOrders()];

    let theadStr = `
        <tr>
            <th data-column="transaction_id">Transaction ID</th>
            <th data-column="user_info">User Info</th>
            <th data-column="order_date">Order Date</th>
            <th data-column="order_amount">Order Amount</th>
            <th>Card Number</th>
            <th data-column="card_type">Card Type</th>
            <th data-column="location">Location</th>
        </tr>
    `;

    table.innerHTML = `
    <thead style="cursor: pointer">
    ${theadStr}
    </thead>
    <tbody></tbody>
    `;
    app.appendChild(table);
    
    function compare(a, b) {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    }

    let comparers = {
        transaction_id: (order1, order2) => compare(order1.transaction_id, order2.transaction_id),
        user_info: (order1, order2) => {
            // одинаковые пользователи - нечего сравнивать вообще
            if (order1.user_id === order2.user_id) {
                return 0;
            }
            // а тут все остальные случаи
            let user1 = getUser(order1.user_id);
            let nameAndSurname1 = user1.first_name + user1.last_name;
            let user2 = getUser(order2.user_id);
            let nameAndSurname2 = user2.first_name + user2.last_name;

            return compare(nameAndSurname1, nameAndSurname2);
        },
        order_date: (order1, order2) => compare(+order1.created_at, +order2.created_at),
        order_amount: (order1, order2) => compare(+order1.total, +order2.total),
        card_type: (order1, order2) => compare(order1.card_type, order2.card_type),
        location: (order1, order2) => {
            if (order1.order_country === order2.order_country) {
                return compare(order1.order_ip, order2.order_ip);
            } else {
                return compare(order1.order_country, order2.order_country);
            }
        }
    }

    let theadEl = table.querySelector('thead');
    let tbodyEl = table.querySelector('tbody');
    theadEl.addEventListener('click', (e) => {
        let dataColumn = e.target.getAttribute('data-column');
        if (!dataColumn) {
            return;
        }
        theadEl.innerHTML = theadStr;
        let s = document.createElement('span');
        s.innerHTML = '&#8595;';
        theadEl.querySelector(`[data-column=${dataColumn}]`).appendChild(s);
        tbodyEl.innerHTML = '';

        let compareFunc = comparers[dataColumn];
        orders.sort(compareFunc);
        
        /* orders.sort(); */
        
        drawTbody();
    });

    tbodyEl.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && e.target.classList.contains('user-link')) {
            e.preventDefault();
            let childEl = e.target.parentNode.querySelector('div.user-details');
            if (childEl) {
                childEl.style.display === 'none' ? childEl.style.display = 'block' : childEl.style.display = 'none';
            }
        }
    });
    
    function drawTbody() {
        let table_str = '';
        for (let i = 0; i < orders.length; i++) {
            let transaction_id = orders[i].transaction_id;
            let user = getUser(orders[i].user_id);
            let total = orders[i].total;
            let card_number = format.cardNumber(orders[i].card_number);
            let card_type = orders[i].card_type;
            let order_country = orders[i].order_country;
            let order_ip = orders[i].order_ip;
            let company = getCompany(user.company_id);
    
            // let tr = createTr(tbody);
            // appendNewTd(tr, transaction_id); // 1. create td; 2. append td to arg1; 3. td.innerText = arg2;
            // appendUserInfoTd(tr, user)
            // appendNewTd(tr, format.date(orders[i].created_at));
            // appendNewTd(tr, '$' + orders[i].total);
    
                        
            table_str += `
                <tr id="order_${orders[i].id}">
                    <td id="transaction_id">${transaction_id}</td>
                    <td id="user_info" class="user-data">
                        <a href="#" class="user-link">${format.userName(user)}</a>
                        <div class="user-details" style=display:none>
                            ${format.user(user)}
                            ${format.company(company)}
                        </div>
                    </td>
                    <td id="order_date">${format.date(orders[i].created_at)}</td>
                    <td id="order_amount">$${total}</td>
                    <td id="card_number">${card_number}</td>
                    <td id="card_type">${card_type}</td>
                    <td id="location">${order_country} (${order_ip})</td>
                </tr>
            `;
        }
        tbodyEl.innerHTML = table_str;
    }

    drawTbody();

})();

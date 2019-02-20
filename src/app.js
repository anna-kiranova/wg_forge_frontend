// this is an example of improting data from JSON
import orders from '../data/orders.json';
import users from '../data/users.json';
import companies from '../data/companies.json';

export default (function() {
    let app = document.getElementById('app');
    let table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Transaction ID</th>
                <th>User Info</th>
                <th>Order Date</th>
                <th>Order Amount</th>
                <th>Card Number</th>
                <th>Card Type</th>
                <th>Location</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    app.appendChild(table);

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

    function formatUser(user) {
        let birthday = '';
        if (user.birthday) {
            let date = new Date(user.birthday * 1000);
            let DD = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
            let MM = (date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
            let YYYY = date.getFullYear();

            birthday = `<p>Birthday: ${DD}/${MM}/${YYYY}</p>`;
        }
        let avatar = '';
        if (user.avatar) {
            avatar = `<p><img src="${user.avatar}" width="100px"></p>`;
        }

        return birthday + avatar;
    }

    function formatCardNumber(cn) {
        let card = cn.slice(0, 2) + '********' + cn.slice(-4);
        return card;
    }

    function getUser(uid) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === uid) {
                return users[i];
            }
        }
    }

    function formatUserName(user) {
        let appeal = user.gender === 'Male' ? 'Mr.' : 'Ms.';
        return appeal + ' ' + user.first_name + ' ' + user.last_name;
    }

    function getCompany(cid) {
        for (let i = 0; i < companies.length; i++) {
            if (companies[i].id === cid) {
                return companies[i];
            }
        }
    }

    function formatCompany(company) {
        if (!company) {
            return '';
        }
        let company_str;
        if (company.url) {
            company_str = `<p>Company: <a href="${company.url}" target="_blank">${company.title}</a></p>`;
        } else {
            company_str = `<p>Company: ${company.title}</p>`;
        }
        return company_str + `<p>Industry: ${company.industry}</p>`;
    }

    let tbody = table.querySelector('tbody');
    let table_str = '';

    for (let i = 0; i < orders.length; i++) {
        let transaction_id = orders[i].transaction_id;
        let date = dateCustomFormat(orders[i].created_at);
        let user = getUser(orders[i].user_id);
        let total = orders[i].total;
        let card_number = formatCardNumber(orders[i].card_number);
        let card_type = orders[i].card_type;
        let order_country = orders[i].order_country;
        let order_ip = orders[i].order_ip;
        let company = getCompany(user.company_id);

        table_str += `
            <tr id="order_${orders[i].id}">
                <td id="transaction_id">${transaction_id}</td>
                <td id="user_info" class="user-data">
                    <a href="#">${formatUserName(user)}</a>
                    <div class="user-details">
                        ${formatUser(user)}
                        ${formatCompany(company)}
                    </div>
                </td>
                <td id="order_date">${date}</td>
                <td id="order_amount">$${total}</td>
                <td id="card_number">${card_number}</td>
                <td id="card_type">${card_type}</td>
                <td id="location">${order_country} (${order_ip})</td>
            </tr>
        `;
    }
    tbody.innerHTML = table_str;
})();

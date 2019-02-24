let orders, users, companies;

export function loadData() {
    return Promise.all([
        fetch("/api/orders.json").then(response => response.json()),
        fetch("/api/users.json").then(response => response.json()),
        fetch("/api/companies.json").then(response => response.json()),
    ]).then ((results) => {
        orders = results[0];
        users = results[1];
        companies = results[2];
    });
}

export function getUser(uid) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === uid) {
            return users[i];
        }
    }
}

export function getCompany(cid) {
    for (let i = 0; i < companies.length; i++) {
        if (companies[i].id === cid) {
            return companies[i];
        }
    }
}

export function getOrders() {
    return orders;
}
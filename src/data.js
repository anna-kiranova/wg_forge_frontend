import orders from '../data/orders.json';
import users from '../data/users.json';
import companies from '../data/companies.json';

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
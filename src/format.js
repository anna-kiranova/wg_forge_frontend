export function date(unix) {
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

export function user(user) {
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

export function cardNumber(cn) {
    let card = cn.slice(0, 2) + '********' + cn.slice(-4);
    return card;
}

export function userName(user) {
    let appeal = user.gender === 'Male' ? 'Mr.' : 'Ms.';
    return appeal + ' ' + user.first_name + ' ' + user.last_name;
}

export function company(company) {
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

export function money(value) {
    return Math.round(value * 100) / 100;
}
let users;
let comp;

let table = document.createElement('table');
const tableDiv = document.querySelector('.tableBox');

function getPromise(url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function () {
            if (xhr.status == 200) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject(Error(xhr.statusText));
            }
        };
        xhr.onerror = function () {
            reject(Error("Network Error"));
        };
        xhr.send();
    });
}

Promise.all([getPromise('http://localhost:3000/users'),
    getPromise('http://localhost:3000/companies')]).then(values => {
    users = values [0];
    comp = values[1];

    for (let i = 0; i < comp.length; i++) {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let text1 = document.createTextNode(String(comp[i].name));
        let text3 = '';
        td1.appendChild(text1);
        for (let j = 0; j < users.length; j++) {
            if (users[j].uris.company === comp[i].uri) {
                if (text3 === '') {
                    text3 = text3 + String(users[j].name);
                } else {
                    text3 = text3 + (', ') + String(users[j].name);
                }
            }
        }
        let text2 = document.createTextNode(text3);
        td2.appendChild(text2);
        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);
    }
    tableDiv.appendChild(table);
});
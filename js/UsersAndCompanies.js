let table = document.createElement('table');
const tableDiv = document.querySelector('.tableBox');
let users;
let comp;

async function fetchUsers() {

    try {
        const usersResponse = await fetch(`http://localhost:3000/users`);
        return await usersResponse.json();

    } catch (e) {
        console.error(e);
    }
}

async function fetchComp() {
    try {
        const compResponse = await fetch(`http://localhost:3000/companies`);
        return await compResponse.json();

    } catch (e) {
        console.error(e);
    }
}

async function displayData() {
    const usersOfComp = await comp.map(e => {
        let userTemp = users.map(b => {
            if (b.uris.company === e.uri) {
                return b.name;
            }

        });

        userTemp = userTemp.filter(c => {
            return c !== undefined;
        });

        return userTemp.toString();
    });

    for (let i = 0; i < comp.length; i++) {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let text1 = document.createTextNode("Company " + String(i));
        td1.appendChild(text1);
        let text2 = document.createTextNode(usersOfComp[i]);
        td2.appendChild(text2);
        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);
    }
    tableDiv.appendChild(table);

}

fetchUsers()
    .then(data => {
        users = data;
    })
    .then(fetchComp)
    .then(data => {
        comp = data;
    })
    .then(displayData);

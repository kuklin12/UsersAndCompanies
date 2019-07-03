let table = document.createElement('table');
const tableDiv = document.querySelector('.tableBox');
let users;
let companies;

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
        const companiesResponse = await fetch(`http://localhost:3000/companies`);
        return await companiesResponse.json();

    } catch (e) {
        console.error(e);
    }
}

async function displayData() {
    const usersOfCompanies = await companies.map(usersOfCompanies => {
        let usersOfCompany = users.map(usersOfCompany => {
            if (usersOfCompany.uris.company === usersOfCompanies.uri) {
                return usersOfCompany.name;
            }

        });
        usersOfCompany = usersOfCompany.filter(usersOfCompany => {
            return usersOfCompany !== undefined;
        });

        return usersOfCompany.toString();
    });
    usersOfCompanies.forEach( function(currentValue , index) {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let text1 = document.createTextNode("Company " + index);
        td1.appendChild(text1);
        let text2 = document.createTextNode(String(currentValue));
        td2.appendChild(text2);
        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);
    });
    tableDiv.appendChild(table);

}

fetchUsers()
    .then(data => {
        users = data;
    })
    .then(fetchComp)
    .then(data => {
        companies = data;
    })
    .then(displayData);

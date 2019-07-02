let table = document.createElement('table');
const tableDiv = document.querySelector('.tableBox');

async function fetchData() {
    try {

        const values = await Promise.all([fetch(`http://localhost:3000/users`)
            .then(response => {
                return response.json()
            }),
            fetch(`http://localhost:3000/companies`)
                .then(response => {
                    return response.json()
                })]);
        const users = values[0];
        const comp = values[1];

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
    } catch (e) {
        console.error(e);
    }
}

fetchData();




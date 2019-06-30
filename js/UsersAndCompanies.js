let users;
let comp;

function getPromise(url) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function() {
            if (xhr.status == 200) {
                resolve(JSON.parse(xhr.response));
            }
            else {
                reject(Error(xhr.statusText));
            }
        };
        xhr.onerror = function() {
            reject(Error("Network Error"));
        };
        xhr.send();
    });
}

Promise.all([getPromise('http://localhost:3000/users'),
    getPromise('http://localhost:3000/companies')]).then(values => {
    users = values [0];
    comp = values[1];
    console.log(users);
    console.log(comp);
});
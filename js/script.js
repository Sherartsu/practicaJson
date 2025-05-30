'use strict'

const API_URL = "https://retoolapi.dev/ZuqX7I/integrantes";

let tBody = document.getElementById("tBody");

document.addEventListener("DOMContentLoaded", () => {
    loadData();
});

async function loadData() {
    try {
        let response = await fetch(API_URL);
        let data = await response.json();
        showData(data);
    } catch (error) {
        console.log(error)
    }
}

function showData(data){
    tBody.innerHTML = "";
    let fragment = document.createDocumentFragment();
    data.forEach(integer => {
        let tr = document.createElement('tr');

        let id = document.createElement('td');
        let name = document.createElement('td');
        let lastname = document.createElement('td');
        let email = document.createElement('td');
        let tdButtons = document.createElement('td');
        let btnUpdate = document.createElement('button');
        let btnDelete = document.createElement('button');
        btnUpdate.textContent = 'Editar'
        btnDelete.textContent = 'Eliminar';
        id.textContent = integer.id;
        name.textContent = integer.Nombre;
        lastname.textContent = integer.Apellido;
        email.textContent = integer.Correo;

        tdButtons.appendChild(btnUpdate);
        tdButtons.appendChild(btnDelete);

        tdButtons.classList.add('tdButtons');

        tr.appendChild(id);
        tr.appendChild(name);
        tr.appendChild(lastname);
        tr.appendChild(email);
        tr.appendChild(tdButtons);

        fragment.appendChild(tr);
    });

    tBody.appendChild(fragment)
}
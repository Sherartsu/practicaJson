'use strict'

const API_URL = "https://retoolapi.dev/ZuqX7I/integrantes";

let tBody = document.getElementById("tBody");
let btnOpenModal = document.getElementById('btnOpenModal');
let formAddData = document.getElementById('formAddData');
let modal = document.querySelector('.containerModal');
let btnDelete;

document.addEventListener('click', (e) => {
    if(e.target === modal){
        modal.classList.replace('modalOpen', 'modalClose')
        document.body.classList.remove('bodyOverflow');
    }
})

formAddData.addEventListener('submit', (e) => {
    e.preventDefault();
    addData();
})

btnOpenModal.addEventListener('click', () => {
    modal.classList.replace('modalClose', 'modalOpen');
    document.body.classList.add('bodyOverflow');
})

document.addEventListener("DOMContentLoaded", () => {
    loadData();
});

async function loadData() {
    try {
        let response = await fetch(API_URL);
        let data = await response.json();
        showData(data);
        btnDelete = document.querySelectorAll('.btnDelete');
    } catch (error) {
        console.log(error)
    }
}

async function showData(data){
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
        btnDelete.classList.add('btnDelete');
        id.classList.add('id');

        tr.appendChild(id);
        tr.appendChild(name);
        tr.appendChild(lastname);
        tr.appendChild(email);
        tr.appendChild(tdButtons);

        fragment.appendChild(tr);
    });

    tBody.appendChild(fragment)
}


async function addData() {
    try {
        let Nombre = document.getElementById('txtName').value.trim();
        let Apellido = document.getElementById('txtLastname').value.trim();
        let Correo = document.getElementById('txtEmail').value.trim();

        if(!Nombre && !Apellido && Correo){
            return;
        }

        let data = {
            Nombre,
            Apellido,
            Correo
        }
        
        let request = fetch(API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        modal.classList.replace('modalOpen', 'modalClose')
        document.body.classList.remove('bodyOverflow')

        loadData();
    } catch (error) {
        console.log(error)
    }
}

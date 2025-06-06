'use strict'

const API_URL = "https://retoolapi.dev/ZuqX7I/integrantes";

let tBody = document.getElementById("tBody");
let btnOpenModal = document.getElementById('btnOpenModal');
let formAddData = document.getElementById('formAddData');
let modal = document.querySelector('.containerModal');
let updateModal = document.querySelector('.containerUpdateModal');
let btnUpdateData = document.getElementById('btnUpdateData');
let formUpdateData = document.getElementById('formUpdateData');

document.addEventListener('click', (e) => {
    if(e.target === modal){
        modal.classList.replace('modalOpen', 'modalClose')
        document.body.classList.remove('bodyOverflow');
    } else if (e.target === updateModal){
        updateModal.classList.replace('modalOpen', 'modalClose')
        document.body.classList.remove('bodyOverflow');
    }
})

formUpdateData.addEventListener('submit', (e) => {
    e.preventDefault();
})

tBody.addEventListener('click', (e) => {
    if(e.target.classList.contains('btnDelete')){
        deleteData(e);
    } else if(e.target.classList.contains('btnUpdate')) {
        chargeData(e);
    }
})

function chargeData(e){
    updateModal.classList.replace('modalClose', 'modalOpen');
    document.body.classList.add('bodyOverflow');
    let tr = e.target.closest('.row');
    document.getElementById('txtUpdateId').value = tr.children[0].textContent;
    document.getElementById('txtUpdateName').value = tr.children[1].textContent;
    document.getElementById('txtUpdateLastname').value = tr.children[2].textContent;
    document.getElementById('txtUpdateEmail').value = tr.children[3].textContent;
}

btnUpdateData.addEventListener('click', () => {
    updateData();
})

async function deleteData(e) {
    let tr = e.target.closest('.row');
    let id = tr.querySelector('.id').textContent;

    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })

    loadData();
}

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
        btnUpdate.classList.add('btnUpdate')
        id.classList.add('id');
        tr.classList.add('row');

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
        
        fetch(API_URL, {
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


async function updateData() {
    try {
        let id = document.getElementById('txtUpdateId').value.trim();
        let Nombre = document.getElementById('txtUpdateName').value.trim();
        let Apellido = document.getElementById('txtUpdateLastname').value.trim();
        let Correo = document.getElementById('txtUpdateEmail').value.trim();

        if(!Nombre && !Apellido && Correo){
            return;
        }

        let data = {
            Nombre,
            Apellido,
            Correo
        }
        
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        updateModal.classList.replace('modalOpen', 'modalClose')
        document.body.classList.remove('bodyOverflow')

        loadData();
    } catch (error) {
        console.log(error)
    }
}
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, doc, collection, getDocs, addDoc, query, where } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDvFEYjg3aTANQDyZv8o5wxN-JHd1iAKpo",
    authDomain: "minadeaco-c2041.firebaseapp.com",
    projectId: "minadeaco-c2041",
    storageBucket: "minadeaco-c2041.appspot.com",
    messagingSenderId: "1006944763688",
    appId: "1:1006944763688:web:ed27ab5430d46296019a1d",
    measurementId: "G-1XTP926TX1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const produto = document.getElementById("produto");
const valor = document.getElementById("valor");
const quantidade = document.getElementById("quantidade");
const form = document.getElementById("form");
const listar_cadastros = document.getElementById("listar_cadastrados");
const produtoSelect = document.getElementById("produto");
const pErro = document.getElementById("errorMessage");

const email = sessionStorage.getItem('email')
const senha = sessionStorage.getItem('senha')

let idMaterial = ''
let idInventario = ''

window.onload = function () {
    if (email == null) {
        window.location.href = "../login/index.html"
    }
    else {
        listarMateriais();
        listarInventario();
    }
}

async function listarMateriais() {
    try {
        const colecRef = collection(db, "Empresa");
        const querySnapshot = await getDocs(colecRef);

        querySnapshot.forEach(doc => {
            const dado = doc.data();
            if (dado.email == email) {
                idMaterial = dado.idMaterial;
            }
        });

        const MatdocRef = doc(db, "Materiais", idMaterial);
        const MatcollectionRef = collection(MatdocRef, "inv");
        const qM = await getDocs(MatcollectionRef);

        qM.forEach(doc => {
            const idProduto = doc.data().id;
            const optionMaterial = document.createElement("option");
            optionMaterial.value = idProduto;
            optionMaterial.textContent = idProduto;
            produtoSelect.appendChild(optionMaterial);
        });

    } catch (e) {
        pErro.textContent = "Falha em listar os materiais. Por favor tente novamente.";
        console.log(e)
    }
}

async function listarInventario() {
    const colecRef = collection(db, "Empresa");
    const querySnapshot = await getDocs(colecRef);

    querySnapshot.forEach(doc => {
        const dado = doc.data();
        if (dado.email == email) {
            idInventario = dado.idInventario;
        }
    });

    const MatdocRef = doc(db, "Inventário", idInventario);
    const MatcollectionRef = collection(MatdocRef, "inv");
    const qI = await getDocs(MatcollectionRef);
    console.log(qI)

    listar_cadastros.innerHTML = '';
    qI.forEach(doc => {
        if (doc.data().id != "placeholder") {
            const nomeProduto = doc.data().id;
            const valorProduto = doc.data().valor;
            const quantidadeProduto = doc.data().quantidade;
            const valorFinal = valorProduto * quantidadeProduto;
            let tr = document.createElement("tr");

            let li_produto = document.createElement("th");
            li_produto.classList.add("fw-bold", "title-th", "text-center");
            li_produto.textContent = nomeProduto;

            let li_valor = document.createElement("th");
            li_valor.classList.add("fw-bold", "title-th", "text-center");
            li_valor.textContent = valorProduto;

            let li_quantidade = document.createElement("th");
            li_quantidade.classList.add("fw-bold", "title-th", "text-center");
            li_quantidade.textContent = quantidadeProduto;

            let li_valor_final = document.createElement("th");
            li_valor_final.classList.add("fw-bold", "title-th", "text-center");
            li_valor_final.textContent = valorFinal;

            let li_remover = document.createElement("th");
            li_remover.classList.add("btnRemover");

            let btn_remover = document.createElement("button");
            let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

            svg.setAttribute("width", "10vh");
            svg.setAttribute("height", "10vh");
            svg.setAttribute("fill", "red");
            svg.setAttribute("class", "bi bi-x");
            svg.setAttribute("viewBox", "0 0 32 32");

            let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", "M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708");

            svg.appendChild(path);

            btn_remover.addEventListener("click", function () {
                tr.remove();
                btn_remover.remove();
            });

            btn_remover.appendChild(svg);
            li_remover.appendChild(btn_remover);

            tr.appendChild(li_produto);
            tr.appendChild(li_valor);
            tr.appendChild(li_quantidade);
            tr.appendChild(li_valor_final);
            tr.appendChild(li_remover);
            listar_cadastros.appendChild(tr);
        }
    });
}

form.addEventListener("submit", function (e) {
    e.preventDefault()

    adicionarProduto();
});

async function adicionarProduto() {
    const InvdocRef = doc(db, "Inventário", idInventario);
    const InvcollectionRef = collection(InvdocRef, "inv");

    await addDoc(InvcollectionRef, {
        id: produto.value,
        valor: valor.value,
        quantidade: quantidade.value
    })
    listarInventario();
}
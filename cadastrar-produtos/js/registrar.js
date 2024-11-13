import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, doc, collection, getDocs, addDoc, deleteDoc, where } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
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
    produtoSelect.innerHTML = "";

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
            li_valor.textContent = "R$" + valorProduto;

            let li_quantidade = document.createElement("th");
            li_quantidade.classList.add("fw-bold", "title-th", "text-center");
            li_quantidade.textContent = quantidadeProduto + "Kg";

            let li_valor_final = document.createElement("th");
            li_valor_final.classList.add("fw-bold", "title-th", "text-center");
            li_valor_final.textContent = "R$" + valorFinal;

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

// Referências aos elementos
const popup = document.getElementById('popup');
const closePopupBtn = document.getElementById('closePopupBtn');

let popUpType = '';

// Função para fechar o pop-up
closePopupBtn.addEventListener('click', function () {
    popup.style.display = 'none';
});

function popUp() {
    document.getElementById("popUpError").textContent = "";
    document.getElementById("addMaterialInput").value = "";

    popup.style.display = 'block';
}

document.getElementById("adicionarMaterial").addEventListener("click", function (e) {
    popUp();
    popUpType = "adicionarMaterial";

    document.getElementById("buttonPopup").textContent = "Adicionar";
    document.getElementById("tituloPopup").textContent = "Adicionar Material:";

    document.getElementById("addMaterialInput").style.display = "block";
    document.getElementById("selectPopUp").style.display = "none";
})

document.getElementById("removerMaterial").addEventListener("click", function (e) {
    popUp();
    popUpType = "removerMaterial";

    document.getElementById("buttonPopup").textContent = "Remover";
    document.getElementById("tituloPopup").textContent = "Remover Material:";

    document.getElementById("addMaterialInput").style.display = "none";
    document.getElementById("selectPopUp").style.display = "block";

    listarSelectPopUp();
})


document.getElementById("buttonPopup").addEventListener("click", function (e) {
    if (popUpType == "adicionarMaterial") {
        addMaterial();
    }
    else if (popUpType == "removerMaterial") {
        removeMaterial();
    }
})

async function addMaterial() {
    const materialInput = document.getElementById("addMaterialInput").value;

    if (materialInput == '') {
        document.getElementById("popUpError").textContent = "O campo precisa conter texto. Por favor, feche e tente novamente.";
        return
    }

    const MatdocRef = doc(db, "Materiais", idMaterial);
    const MatcollectionRef = collection(MatdocRef, "inv");

    const qMat = await getDocs(MatcollectionRef);

    let alreadyExists = false

    qMat.forEach(doc => {
        if (doc.data().id.toLowerCase() == materialInput.toLowerCase()) {
            document.getElementById("popUpError").textContent = "Material já cadastrado.";
            alreadyExists = true;
            return
        }
    })

    if (alreadyExists == false) {
        await addDoc(MatcollectionRef, {
            id: materialInput
        })
        listarMateriais();

        popup.style.display = "none";
    }
}

async function listarSelectPopUp() {
    const selectPopUp = document.getElementById("selectPopUp");
    selectPopUp.innerHTML = "";

    const MatdocRef = doc(db, "Materiais", idMaterial);
    const MatcollectionRef = collection(MatdocRef, "inv");

    const qMat = await getDocs(MatcollectionRef);

    qMat.forEach(doc => {
        const optMaterial = document.createElement("option");
        optMaterial.value = doc.data().id;
        optMaterial.textContent = doc.data().id;
        selectPopUp.appendChild(optMaterial);
    })
}

async function removeMaterial() {
    const materialInput = document.getElementById("selectPopUp").value;

    if (materialInput.value == "") {
        document.getElementById("popUpError").textContent = "Por favor, selecione uma opção.";
        return
    }

    const MatdocRef = doc(db, "Materiais", idMaterial);
    const MatcollectionRef = collection(MatdocRef, "inv");

    let materialId = "";

    const qMat = await getDocs(MatcollectionRef);
    qMat.forEach(doc => {
        if (doc.data().id == materialInput) {
            materialId = doc.id;
        }
    })

    const docRef = doc(db, "Materiais/" + idMaterial + "/inv/" + materialId);
    await deleteDoc(docRef);

    popup.style.display = "none";
    listarMateriais();
}
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, doc, collection, getDocs, addDoc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

import * as XLSX from "xlsx";

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

//

const produto = document.getElementById("produto");
const valor = document.getElementById("valor");
const quantidade = document.getElementById("quantidade");
const form = document.getElementById("form");
const listar_cadastros = document.getElementById("listar_cadastrados");
const pErro = document.getElementById("errorMessage");

const email = '' 
const senha = ''

if(localStorage.getItem('email') == null){
    email = sessionStorage.getItem('email');
    senha = sessionStorage.getItem('senha');
}else{
    email = localStorage.getItem('email');
    senha = localStorage.getItem('senha');
}

let idMaterial = ''
let idInventario = ''
let prodId = ''

window.onload = function () {
    if (email == null) {
        window.location.href = "../login/index.html"
    }
    else {
        listarSelectMaterial(produto);
        listarInventario();
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
            const idProduto = doc.id;
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

            let divFinal = document.createElement("div");
            divFinal.classList.add("divFinal");

            let divButtons = document.createElement("div");
            divButtons.classList.add("divButtons");

            let li_valor_final = document.createElement("th");
            li_valor_final.textContent = "R$" + valorFinal;

            let btn_editar = document.createElement("button");
            btn_editar.classList.add("btnEditar");

            let svgEdit = document.createElementNS("http://www.w3.org/2000/svg", "svg");

            svgEdit.setAttribute("width", "100%");
            svgEdit.setAttribute("height", "100%");
            svgEdit.setAttribute("fill", "rgb(200, 200, 0)");
            svgEdit.setAttribute("class", "bi bi-pencil");
            svgEdit.setAttribute("viewBox", "0 0 16 16");

            let pathEdit = document.createElementNS("http://www.w3.org/2000/svg", "path");
            pathEdit.setAttribute("d", "M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325");

            svgEdit.appendChild(pathEdit);
            btn_editar.appendChild(svgEdit);

            let btn_remover = document.createElement("button");
            btn_remover.classList.add("btnRemover");
            let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

            svg.setAttribute("width", "100%");
            svg.setAttribute("height", "100%");
            svg.setAttribute("fill", "red");
            svg.setAttribute("class", "bi bi-trash3");
            svg.setAttribute("viewBox", "0 0 16 16");

            let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", "M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5");

            svg.appendChild(path);

            btn_remover.addEventListener("click", function () {
                removeProduto(idProduto);
                tr.remove();
                btn_remover.remove();
            });

            btn_editar.addEventListener("click", function () {
                popUp(true);
                prodId = idProduto;

                listarSelectMaterial(document.getElementById("EditSelect"), nomeProduto);

                let inputs = document.getElementsByClassName("editInputs");
                for (let index = 0; index < inputs.length; index++) {
                    inputs[index].style.display = "block";
                }

                document.getElementById("valorInput").value = "R$" + valorProduto;
                document.getElementById("qntInput").value = quantidadeProduto + "Kg";

                popUpType = "editarProduto";

                document.getElementById("buttonPopup").textContent = "Editar";
                document.getElementById("tituloPopup").textContent = "Editar Produto";

                document.getElementById("addMaterialInput").style.display = "none";
                document.getElementById("selectPopUp").style.display = "none";
            });


            btn_remover.appendChild(svg);

            tr.appendChild(li_produto);
            tr.appendChild(li_valor);
            tr.appendChild(li_quantidade);

            divButtons.appendChild(btn_editar);
            divButtons.appendChild(btn_remover);

            divFinal.appendChild(li_valor_final);
            divFinal.appendChild(divButtons);

            tr.appendChild(divFinal);
            listar_cadastros.appendChild(tr);
        }
    });
}

function removeProduto(produtoId) {
    const docRef = doc(db, "Inventário/" + idInventario + "/inv/" + produtoId);
    deleteDoc(docRef);
}

async function editProduto() {
    const docRef = doc(db, "Inventário/" + idInventario + "/inv/" + prodId);
    const nomeProd = document.getElementById("EditSelect").value;
    let valorProd = document.getElementById("valorInput").value;
    let qntProd = document.getElementById("qntInput").value;
    
    valorProd = valorProd.replace("R$", "");
    qntProd = qntProd.replace("Kg", "");

    await updateDoc(docRef, {
        id: nomeProd,
        valor: valorProd,
        quantidade: qntProd
    });

    popup.style.display = "none";
    listarInventario();
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

function popUp(isEditing) {
    document.getElementById("popUpError").textContent = "";
    document.getElementById("addMaterialInput").value = "";

    if (!isEditing) {
        let inputs = document.getElementsByClassName("editInputs");
        for (let index = 0; index < inputs.length; index++) {
            inputs[index].style.display = "none";
        }
    }

    popup.style.display = 'block';
}

document.getElementById("adicionarMaterial").addEventListener("click", function (e) {
    popUp(false);
    popUpType = "adicionarMaterial";

    document.getElementById("buttonPopup").textContent = "Adicionar";
    document.getElementById("tituloPopup").textContent = "Adicionar Material";

    document.getElementById("addMaterialInput").style.display = "block";
    document.getElementById("selectPopUp").style.display = "none";
})

document.getElementById("removerMaterial").addEventListener("click", function (e) {
    popUp(false);
    popUpType = "removerMaterial";

    document.getElementById("buttonPopup").textContent = "Remover";
    document.getElementById("tituloPopup").textContent = "Remover Material";

    document.getElementById("addMaterialInput").style.display = "none";
    document.getElementById("selectPopUp").style.display = "block";

    listarSelectMaterial(document.getElementById("selectPopUp"));
})

document.getElementById("editarMaterial").addEventListener("click", function (e) {
    popUp(false);
    popUpType = "editarMaterial";

    document.getElementById("buttonPopup").textContent = "Editar";
    document.getElementById("tituloPopup").textContent = "Editar Material";

    document.getElementById("addMaterialInput").style.display = "block";
    document.getElementById("selectPopUp").style.display = "block";

    listarSelectMaterial(document.getElementById("selectPopUp"));
})

document.getElementById("buttonPopup").addEventListener("click", function (e) {
    if (popUpType == "adicionarMaterial") {
        addMaterial();
    }
    else if (popUpType == "removerMaterial") {
        removeMaterial();
    }
    else if (popUpType == "editarMaterial") {
        editMaterial();
    }
    else if (popUpType == "editarProduto") {
        editProduto();
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
        listarSelectMaterial(documnet.getElementById("selectPopUp"));

        popup.style.display = "none";
    }
}

async function listarSelectMaterial(select, selected) {
    select.innerHTML = "";

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
            if (selected != "") {
                if (idProduto == selected) {
                    optionMaterial.selected = true;
                }
            }
            select.appendChild(optionMaterial);
        });
    }
    catch {
        pErro.textContent = "Falha em listar materiais. Por favor tente novamente.";
    }
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
    listarSelectMaterial(document.getElementById("selectPopUp"));
}

async function editMaterial() {
    const materialInput = document.getElementById("addMaterialInput").value;
    const materialSelect = document.getElementById("selectPopUp").value;

    if (materialInput == "" || materialSelect == "") {
        document.getElementById("popUpError").textContent = "Os campos precisam estar preenchidos.";
        return
    }

    const MatdocRef = doc(db, "Materiais", idMaterial);
    const MatcollectionRef = collection(MatdocRef, "inv");

    let materialId = "";

    const qMat = await getDocs(MatcollectionRef);
    qMat.forEach(doc => {
        if (doc.data().id == materialSelect) {
            materialId = doc.id;
        }
    })

    const docRef = doc(db, "Materiais/" + idMaterial + "/inv/" + materialId);

    await updateDoc(docRef, {
        id: materialInput
    });

    popup.style.display = "none";
    listarSelectMaterial(document.getElementById("selectPopUp"));
}

function exportTableToExcel(tableId, fileName = "tabela.xlsx") {
    // Encontre a tabela pelo ID
    const table = document.getElementById(tableId);
  
    if (!table) {
      console.error("Tabela não encontrada!");
      return;
    }
  
    // Converta a tabela em uma planilha
    const worksheet = XLSX.utils.table_to_sheet(table);
  
    // Crie um novo workbook (arquivo Excel)
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
    // Exporte o arquivo
    XLSX.writeFile(workbook, fileName);
  }
  
  // Exemplo de uso
  document.getElementById("exportTable").addEventListener("click", () => {
    exportTableToExcel("excelTable");
  });
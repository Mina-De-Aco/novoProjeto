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

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("agendamento-form").addEventListener("submit", function (e){
    e.preventDefault();
    addAgenda();
})

async function addAgenda() {
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const endereco = document.getElementById("endereco").value;
    const material = document.getElementById("material").value;
    const quantidade = document.getElementById("quantidade").value;
    const data = document.getElementById("data").value;

    if (!nome || !telefone || !endereco || !material || !quantidade || !data) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        // Referência à coleção de agendamentos no Firestore
        const agendamentosRef = collection(db, "Agenda");

        // Adiciona o novo agendamento no Firestore
        await addDoc(agendamentosRef, {
            nome,
            telefone,
            endereco,
            material,
            quantidade,
            data
        });

        // Limpa o formulário após o envio
        document.getElementById("agendamento-form").reset();

        // Atualiza a lista de agendamentos
        listarAgendamentos();
    } catch (error) {
        console.error("Erro ao adicionar agendamento:", error);
        alert("Ocorreu um erro ao adicionar o agendamento. Tente novamente.");
    }
}

// Função para listar os agendamentos na tabela
async function listarAgendamentos() {
    const agendamentosList = document.getElementById("agendamentos-list");
    agendamentosList.innerHTML = ""; // Limpa a lista atual

    try {
        // Obtém os documentos da coleção "agendamentos"
        const agendamentosSnapshot = await getDocs(collection(db, "Agenda"));
        
        // Itera sobre os documentos e exibe-os na tabela
        agendamentosSnapshot.forEach(doc => {
            const data = doc.data();
            const tr = document.createElement("tr");

            // Cria células para cada dado do agendamento
            tr.innerHTML = `
                <td>${data.nome}</td>
                <td>${data.telefone}</td>
                <td>${data.endereco}</td>
                <td>${data.material}</td>
                <td>${data.quantidade}</td>
                <td>${data.data}</td>
            `;

            // Adiciona a linha na tabela
            agendamentosList.appendChild(tr);
        });
    } catch (error) {
        console.error("Erro ao listar agendamentos:", error);
        alert("Ocorreu um erro ao listar os agendamentos. Tente novamente.");
    }
}

// Carrega os agendamentos quando a página for carregada
window.onload = listarAgendamentos;

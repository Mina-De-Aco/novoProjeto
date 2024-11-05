import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let exists = false;

async function loginUser(email, senha) {
    try {
        await signInWithEmailAndPassword(auth, email, senha);
        const q = query(collection(db, "Coletor"), where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            window.location.href = "../EntreContato/index.html"
        } else {
            window.location.href = "../cadastrar-produtos/index.html"
        }

    } catch (e) {
        document.getElementById("errorMessageL").textContent = "Usuário ou senha incorreto/a"
        console.log(e)
    }
}

async function registerUser(nome, email, senha, perfil) {
    try {

        if (senha.length <= 5) {
            document.getElementById("errorMessageR").textContent = "senha deve conter 6 caracteres ou mais"
            return
        }
        await createUserWithEmailAndPassword(auth, email, senha);
        if (perfil == "reciclavel") {
            const docRef = await addDoc(collection(db, "Fornecedor"), {
                nome: nome,
                email: email,
                senha: senha
            });
        }
        else if (perfil == "coletador") {
            const docRef = await addDoc(collection(db, "Coletor"), {
                nome: nome,
                email: email,
                senha: senha
            });
        }
        else if (perfil == "empresarial") {
            const docRef = await addDoc(collection(db, "Empresa"), {
                nome: nome,
                email: email,
                senha: senha
            });
        }
    } catch (e) {
        let text = JSON.stringify(e);
        if (text.includes("email-already-in-use")) {
            document.getElementById("errorMessageR").textContent = "Email já cadastrado."
        } else {
            document.getElementById("errorMessageR").textContent = "Erro ao cadastrar usuário, por favor tente novamente."
            console.error("Erro ao adicionar documento:", e);
        }
    }
}

// Cadastro
document.getElementById('cadastro-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nomeCadastro').value;
    const email = document.getElementById('emailCadastro').value;
    const senha = document.getElementById('senhaCadastro').value;
    const perfil = document.getElementById('perfilCadastro').value;

    registerUser(nome, email, senha, perfil);
});

// Login
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('emailLogin').value;
    const senha = document.getElementById('senhaLogin').value;

    loginUser(email, senha);
});
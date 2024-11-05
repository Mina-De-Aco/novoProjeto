const produto = document.getElementById("produto");
const valor = document.getElementById("valor");
const quantidade = document.getElementById("quantidade");
const form = document.getElementById("form");
const listar_cadastros = document.getElementById("listar_cadastrados");
const pErro = document.getElementById("errorMessage");

form.addEventListener("submit", function (e) {
    e.preventDefault()
    if (produto.value == "" || valor.value == "" || quantidade.value == "") {
        pErro.textContent = "Por favor, preencha todos os campos antes de continuar.";
        return
    }

    let nome_produto = produto.value;
    let valor_produto = valor.value;
    let quantidade_produto = quantidade.value;
    const valor_final = valor_produto * quantidade_produto;

    let tr = document.createElement("tr");

    let li_produto = document.createElement("th");
    li_produto.classList.add("fw-bold", "title-th", "text-center");
    li_produto.textContent = nome_produto;

    let li_valor = document.createElement("th");
    li_valor.classList.add("fw-bold", "title-th", "text-center");
    li_valor.textContent = valor_produto;

    let li_quantidade = document.createElement("th");
    li_quantidade.classList.add("fw-bold", "title-th", "text-center");
    li_quantidade.textContent = quantidade_produto;

    let li_valor_final = document.createElement("th");
    li_valor_final.classList.add("fw-bold", "title-th", "text-center");
    li_valor_final.textContent = valor_final;

    li_remover = document.createElement("th");
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

    produto.value = "";
    valor.value = "";
    quantidade.value = "";
});
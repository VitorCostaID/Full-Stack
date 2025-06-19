const carros = [
  {
    nome: "Chevrolet Opala 1979",
    preco: 30000,
    data: "1978-01-01",
    imagem: "imagens/Opala_SS_1979.jpeg"
  },
  {
    nome: "Puma GTE 1974",
    preco: 18000,
    data: "1965-05-20",
    imagem: "imagens/Puma_GTE-Brazil_1974.jpeg"
  },
  {
    nome: "Volkswagen Beetle 1960",
    preco: 40000,
    data: "1973-08-12",
    imagem: "imagens/Volkswagen_Beetle-Brazil_1960.jpeg"
  }
];

function filtrar() {
  const nomeFiltro = document.getElementById("filter-name").value.toLowerCase();
  const precoMin = parseFloat(document.getElementById("filter_price_min").value) || 0;
  const precoMax = parseFloat(document.getElementById("filter_price_max").value) || Infinity;
  const ordem = document.getElementById("sort_date").value;

  let filtrados = carros.filter(carro => {
    const nomeMatch = carro.nome.toLowerCase().includes(nomeFiltro);
    const precoMatch = carro.preco >= precoMin && carro.preco <= precoMax;
    return nomeMatch && precoMatch;
  });

  if (ordem === "newest") {
    filtrados.sort((a, b) => new Date(b.data) - new Date(a.data));
  } else if (ordem === "oldest") {
    filtrados.sort((a, b) => new Date(a.data) - new Date(b.data));
  }

  renderizarCarros(filtrados);
}

function renderizarCarros(lista) {
  const container = document.getElementById("car-list");
  container.innerHTML = ""; // limpa o conteúdo anterior

  lista.forEach(carro => {
    const card = document.createElement("div");
    card.classList.add("car-card");

    card.innerHTML = `
      <img src="${carro.imagem}" alt="${carro.nome}">
      <h2>${carro.nome}</h2>
      <p class="price">R$ ${carro.preco.toLocaleString()}</p>
      <p><strong>Ano:</strong> ${new Date(carro.data).getFullYear()}</p>
    `;

    container.appendChild(card);
  });
}

// Aplicar filtros quando clicar em filtrar
document.getElementById("apply_filters").addEventListener("click", filtrar);

// Renderizar cards dos carros ao carregar página
document.addEventListener("DOMContentLoaded", function () {
  renderizarCarros(carros); // ou filtrar(), se quiser aplicar filtros ao carregar
});

// Detecção de erro na criação de cards
window.addEventListener("error", function (e) {
  console.error("Erro detectado:", e.message);
});
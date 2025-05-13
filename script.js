document.addEventListener('DOMContentLoaded', () => {
  mostrarCarrinho();
});

function mostrarCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const container = document.getElementById('carrinho-itens');
  const totalEl = document.getElementById('total');
  container.innerHTML = '';

  let total = 0;

  carrinho.forEach((item, index) => {
    const linha = document.createElement('div');
    linha.className = 'carrinho-item';
    linha.innerHTML = `
      <span>${item.nome} - R$ ${item.preco.toFixed(2)}</span>
      <button class="btn-remover" onclick="removerItem(${index})">Remover</button>
    `;
    container.appendChild(linha);
    total += item.preco;
  });

  totalEl.textContent = total.toFixed(2);
}

function removerItem(index) {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.splice(index, 1);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  mostrarCarrinho();
}

function finalizarPedido() {
  alert("Pedido finalizado! (integraremos com PHP em breve)");
  localStorage.removeItem('carrinho');
  mostrarCarrinho();
}

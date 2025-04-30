document.addEventListener('DOMContentLoaded', () => {
    const botoesAdicionarAoCarrinho = document.querySelectorAll('.adicionar-ao-carrinho');
    const listaItensCarrinho = document.getElementById('itens-do-carrinho');
    const quantidadeCarrinhoElemento = document.getElementById('carrinho-quantidade');
    const totalCarrinhoElemento = document.getElementById('total-do-carrinho');
    const finalizarCompraBotao = document.getElementById('finalizar-compra');

    let carrinho = [];

    // Função para atualizar a exibição do carrinho
    function atualizarCarrinhoDisplay() {
        listaItensCarrinho.innerHTML = '';
        let total = 0;
        carrinho.forEach(item => {
            const itemCarrinhoDiv = document.createElement('div');
            itemCarrinhoDiv.classList.add('item-carrinho');
            itemCarrinhoDiv.innerHTML = `
                <span>${item.nome} - ${item.preco.toFixed(2)} € x ${item.quantidade}</span>
                <button class="remover-do-carrinho" data-id="${item.id}">Remover</button>
            `;
            listaItensCarrinho.appendChild(itemCarrinhoDiv);
            total += item.preco * item.quantidade;
        });

        totalCarrinhoElemento.textContent = total.toFixed(2);
        quantidadeCarrinhoElemento.textContent = carrinho.reduce((sum, item) => sum + item.quantidade, 0);

        // Atualizar a mensagem de carrinho vazio se necessário
        if (carrinho.length === 0) {
            listaItensCarrinho.innerHTML = '<p>O seu carrinho está vazio.</p>';
        }

        // Adicionar funcionalidade aos botões de remover
        const botoesRemover = document.querySelectorAll('.remover-do-carrinho');
        botoesRemover.forEach(botao => {
            botao.addEventListener('click', function() {
                const idRemover = parseInt(this.dataset.id);
                carrinho = carrinho.filter(item => item.id !== idRemover);
                atualizarCarrinhoDisplay();
            });
        });
    }

    // Adicionar evento de clique aos botões "Adicionar ao Carrinho"
    botoesAdicionarAoCarrinho.forEach(botao => {
        botao.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            const nome = this.dataset.nome;
            const preco = parseFloat(this.dataset.preco);

            const itemExistente = carrinho.find(item => item.id === id);

            if (itemExistente) {
                itemExistente.quantidade++;
            } else {
                carrinho.push({ id, nome, preco, quantidade: 1 });
            }

            atualizarCarrinhoDisplay();
        });
    });

    // Simulação da finalização da compra (apenas limpa o carrinho neste exemplo)
    if (finalizarCompraBotao) {
        finalizarCompraBotao.addEventListener('click', () => {
            if (carrinho.length > 0) {
                alert('Compra finalizada com sucesso! (Simulação)');
                carrinho = [];
                atualizarCarrinhoDisplay();
                // Em uma aplicação real, aqui enviarias os dados do carrinho para o servidor
            } else {
                alert('O seu carrinho está vazio.');
            }
        });
    }

    // Inicializar a exibição do carrinho
    atualizarCarrinhoDisplay();
});

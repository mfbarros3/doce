/**
 * Obtém os valores relacionados à avaliação e instancia um novo objeto
  @returns {HTMLElement} O elemento HTML da nova linha de avaliação
  
 */
function createAvaliacao() {
    let nome = document.getElementById('avaliacao-nome').value;
    let email = document.getElementById('avaliacao-email').value;
    let nota = document.getElementById('avaliacao-nota').value;
    let texto = document.getElementById('avaliacao-comentario').value;
    let chave = gerarChave();
    
    let avaliacao = {
        chave: chave,
        nome: nome,
        email: email,
        nota: nota,
        comentario: texto,
    };
    insertToStorage(avaliacao, chave);
    return gerarLinhaAvaliacao(avaliacao);
}

/**
 * Insere ou atualiza os dados na localStorage
 * @param {*} avaliacao 
 * @param {*} chave 
 */
function insertToStorage(avaliacao, chave) {
    const avaliacaoJson = JSON.stringify(avaliacao);
    localStorage.setItem(chave, avaliacaoJson);
    console.log(localStorage);
}

/**
 * Gera uma nova chave para a avaliação
 * @returns {string} A nova chave gerada
 */
function gerarChave() {
    let tamanho = localStorage.length;
    let tamanhoChave = parseInt(tamanho) + 1;
    return `avaliacao-${tamanhoChave}`;
}

/**
 * Gera uma nova linha para listar as avaliações na tela
 * @param {*} avaliacao 
 */
function gerarLinhaAvaliacao(avaliacao) {
    const divAvaliacoes = document.getElementById('lista-avaliacoes');
    const divCard = document.createElement('div');
    const divRow = document.createElement('div');
    const divColName = document.createElement('div');
    const divColComentario = document.createElement('div');
    const divBotao = document.createElement('div');
    const divBotaoEdit = document.createElement('div');
    
    const botao = document.createElement('button');
    const botaoEdit = document.createElement('button');
    const spanNome = document.createElement('span');
    const spanComentario = document.createElement('span');

    spanNome.innerHTML = avaliacao.nome;
    spanComentario.innerHTML = avaliacao.comentario;
    botao.innerHTML = 'Remover';
    botaoEdit.innerHTML = 'Editar';
    
    spanComentario.setAttribute('id', `comentario-${avaliacao.chave}`);
    spanNome.setAttribute('id', `nome-${avaliacao.chave}`);

    divCard.setAttribute('class', 'card card-body');
    divRow.setAttribute('class', 'row');
    divRow.setAttribute('id', avaliacao.chave);
    
    divColName.setAttribute('class', 'col-md-4');
    divColComentario.setAttribute('class', 'col-md-4');
    
    divBotao.setAttribute('class', 'col-md-2');
    divBotaoEdit.setAttribute('class', 'col-md-2');

    botao.setAttribute('class', 'btn btn-danger');
    botao.setAttribute('onclick', `excluir('${avaliacao.chave}')`);
    botaoEdit.setAttribute('class', 'btn btn-warning');
    botaoEdit.setAttribute('onclick', `edit('${avaliacao.chave}')`);

    divColName.appendChild(spanNome);
    divColComentario.appendChild(spanComentario);
    divBotao.appendChild(botao);
    divBotaoEdit.appendChild(botaoEdit);

    divRow.appendChild(divColName);
    divRow.appendChild(divColComentario);
    divRow.appendChild(divBotao);
    divRow.appendChild(divBotaoEdit);
    divCard.appendChild(divRow);

    divAvaliacoes.appendChild(divCard);
} 
/**
 * Remove o elemento da localStorage e, em seguida, remove o elemento da listagem da página
 * @param {*} idAvaliacao 
 */
function excluir(idAvaliacao) {
    localStorage.removeItem(idAvaliacao);
    document.getElementById(idAvaliacao).remove()
	


	const divRow = getElementById(idAvaliacao);
	if(divRow){
		divRow.remove();
	}
}

/**
 * Exibe a informação no modal com formulário de edição
 * @param {*} chave 
 */
function edit(chave) {
    const modal = new bootstrap.Modal(document.getElementById('modalEdit'));
    const avaliacaoJSON = localStorage.getItem(chave);
    let avaliacao = JSON.parse(avaliacaoJSON);
    
    document.getElementById('editar-avaliacao-nome').value = avaliacao.nome;
    document.getElementById('editar-avaliacao-email').value = avaliacao.email;
    document.getElementById('editar-avaliacao-nota').value = avaliacao.nota;
    document.getElementById('editar-avaliacao-comentario').value = avaliacao.comentario;
    document.getElementById('chave-update').value = chave;

    modal.show();
}

/**
 * Atualiza os dados da avaliação
 */
function updateAvaliacao() {
    let nome = document.getElementById('editar-avaliacao-nome').value;
    let email = document.getElementById('editar-avaliacao-email').value;
    let nota = document.getElementById('editar-avaliacao-nota').value;
    let comentario = document.getElementById('editar-avaliacao-comentario').value;
    let chave = document.getElementById('chave-update').value;
    
    console.log("Chave: " + chave);

    let avaliacao = {
        chave: chave,
        nome: nome,
        email: email,
        nota: nota,
        comentario: comentario,
    };

    // Atualiza a avaliação na localStorage
    insertToStorage(avaliacao, chave);

    // Atualiza a interface do usuário
    let elementoLinha = document.getElementById(chave);
    if (elementoLinha) {
        elementoLinha.querySelector(`#nome-${chave}`).innerHTML = nome;
        elementoLinha.querySelector(`#comentario-${chave}`).innerHTML = comentario;
    }

    // Fecha o modal se necessário
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalEdit'));
    if (modal) modal.hide();
}

/**
 * Lista todas as avaliações na tela
 */
function show() {
    const avaliacoes = localStorage.length;

    // Limpa a lista existente antes de adicionar novos itens
    const divAvaliacoes = document.getElementById('lista-avaliacoes');
    divAvaliacoes.innerHTML = '';

    for (let i = 0; i < avaliacoes; i++) {
        const chave = localStorage.key(i);
        const avaliacaoJSON = localStorage.getItem(chave);
        let avaliacao = JSON.parse(avaliacaoJSON);

        gerarLinhaAvaliacao(avaliacao);
    }
}

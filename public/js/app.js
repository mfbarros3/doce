/**
 * obtem os valores relacionados a valiação e instancia um novo objeto
 * @returns 
 */
function createAvaliacao()
{
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
	}
	insertToStorage(avaliacao, chave)
	return gerarLinhaAvaliacao(avaliacao);
}

/**
 * efetivamente faz a inserção dos dados na localStorage
 * @param {*} avaliacao 
 * @param {*} chave 
 */
function insertToStorage(avaliacao, chave)
{
	const avaliacaoJson = JSON.stringify(avaliacao);
	localStorage.setItem(chave, avaliacaoJson);
	console.log(localStorage);
}

/**
 * buscar o tamanha da chave
 * @returns 
 */
function gerarChave()
{
	var tamanho = localStorage.length;
	tamanhoChave = parseInt(tamanho) + 1;

	return `avaliacao-${tamanhoChave}`;
}

/**
 * gera um nova linha para listar as avaliações na tela
 * @param {*} avaliacao 
 */
function gerarLinhaAvaliacao(avaliacao)
{
	const divAvaliacoes = document.getElementById('lista-avaliacoes');
	const divCard =  document.createElement('div')
	const divRow =  document.createElement('div')
	const divColName = document.createElement('div')
	const divColComentario = document.createElement('div')
	const divBotao = document.createElement('div')
	const divBotaoEdit = document.createElement('div')
	
	const botao = document.createElement('button')
	const botaoEdit = document.createElement('button')
	const spanNome = document.createElement('span')
	const spanComentario = document.createElement('span')

	spanNome.innerHTML = avaliacao.nome
	spanComentario.innerHTML = avaliacao.comentario
	botao.innerHTML = 'Remover'
	botaoEdit.innerHTML = 'Editar'
	
	spanComentario.setAttribute('id', `comentario-${avaliacao.chave}`)
	spanNome.setAttribute('id', `nome-${avaliacao.chave}`)

	divCard.setAttribute('class', 'card card-body')
	divRow.setAttribute('class', 'row')
	divRow.setAttribute('id', avaliacao.chave)
	
	divColName.setAttribute('class', 'col-md-4')
	divColComentario.setAttribute('class', 'col-md-4')
	
	divBotao.setAttribute('class', 'col-md-2')
	divBotaoEdit.setAttribute('class', 'col-md-2')

	botao.setAttribute('class', 'btn btn-danger')
	botao.setAttribute('onclick', `excluir('${avaliacao.chave}')`)
	botaoEdit.setAttribute('class', 'btn btn-warning')
	botaoEdit.setAttribute('onclick', `edit('${avaliacao.chave}')`)

	divColName.appendChild(spanNome)
	divColComentario.appendChild(spanComentario)
	divBotao.appendChild(botao)
	divBotaoEdit.appendChild(botaoEdit)

	divRow.appendChild(divColName)
	divRow.appendChild(divColComentario)
	divRow.appendChild(divBotao)
	divRow.appendChild(divBotaoEdit)
	divCard.appendChild(divRow)

	divAvaliacoes.appendChild(divRow);
} 

/**
 * remove o elemento da localStorage e e seguida remove o elemento da listagem da página
 * @param {*} idAvaliacao 
 */
function excluir(idAvaliacao)
{
	localStorage.removeItem(idAvaliacao);
	document.getElementById(idAvaliacao).remove();
}

/**
 * Exibe a informação no modal com fomrulário de edição
 * @param {*} chave 
 */
function edit(chave)
{
	const modal = new bootstrap.Modal(document.getElementById('modalEdit'));
	const avaliacaoJSON = localStorage.getItem(chave);
	let avaliacao = JSON.parse(avaliacaoJSON);
	
	document.getElementById('editar-avaliacao-nome').value = avaliacao.nome;
	document.getElementById('editar-avaliacao-email').value = avaliacao.email;
	document.getElementById('editar-avaliacao-nota').value = avaliacao.nota;
	document.getElementById('editar-avaliacao-comentario').value = avaliacao.comentario;
	document.getElementById('chave-update').value = chave

	modal.show();
}

/**
 * Atualiza os dados da avaliação
 */
function updateAvaliacao()
{
	let nome = document.getElementById('editar-avaliacao-nome').value;
	let email = document.getElementById('editar-avaliacao-email').value;
	let nota = document.getElementById('editar-avaliacao-nota').value;
	let comentario = document.getElementById('editar-avaliacao-comentario').value;
	let chave = document.getElementById('chave-update').value;
	console.log("Chave: "+chave)
	let avaliacao = {
		chave: chave,
		nome: nome,
		email: email,
		nota: nota,
		comentario: comentario,
	}

	insertToStorage(avaliacao, chave)
	window.location.reload()
}

/**
 * lista todas as avaliações na tela
 */
function show()
{
	const avaliacoes = localStorage.length;

	for (let i = 0; i < avaliacoes; i++) {
		const chave = localStorage.key(`avaliacao-${i}`);
		const avaliacaoJSON = localStorage.getItem(chave);
		let avaliacao = JSON.parse(avaliacaoJSON);

		gerarLinhaAvaliacao(avaliacao)
	}
}
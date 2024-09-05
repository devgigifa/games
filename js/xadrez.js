class Tabuleiro
{
	constructor(tabuleiro){
		this.tabuleiro = tabuleiro;
	}
	
	addPeca(peca, i, j)
	{
		this.tabuleiro[i][j] = peca.id;
	}
	
	rmPeca(i, j)
	{
		this.tabuleiro[i][j] = 0;
	}
	
	getPeca(peca, i, j)
	{
		for(var z=0;z<32;z++)
			if(peca[z].id == this.tabuleiro[i][j] && peca[z].posI == i && peca[z].posJ == j)
				return peca[z];
		return null;
	}
	
	getRepresentacao()
	{
		return this.tabuleiro;
	}
}

const WHITE = 0;
const BLACK = 1;
const EMPTY = 2;

class Peca
{
constructor(tipo, posI, posJ, id){
    this.tipo = tipo;
    this.posI = posI;
    this.posJ = posJ;
    this.id = id;
}	
}

class Torre extends Peca
{
constructor(tipo, posI, posJ, id){
    super(tipo, posI, posJ, id);
}

mover(tabuleiro, i, j){
    if(j!= this.posJ && i!= this.posI)
        return false;
    if(tabuleiro[i][j] <=6 && tabuleiro[i][j]!= 0)
        var tipoPeca = WHITE;
    else 
    {
        if (tabuleiro[i][j] > 6)
            var tipoPeca = BLACK;
        else
            var tipoPeca = EMPTY;
    }
    
    if(tipoPeca == this.tipo)
        return false;
    
    var movimentoI = i - this.posI;
    var movimentoJ = j - this.posJ;
    
    for(var z = 1; z < Math.abs(movimentoI + movimentoJ); z++)
    {
        if(movimentoI === 0)
        {
            if(movimentoJ < 0)
            {
                if(tabuleiro[i][this.posJ - z] != 0)
                return false;
            }
            else
                if(tabuleiro[i][this.posJ + z] != 0)
                    return false;
        }
        
        else
        {		
            if(movimentoI < 0)
            {	
                if(tabuleiro[this.posI - z][j] != 0)
                    return false;
            }
            else
                if(tabuleiro[this.posI + z][j] != 0)
                    return false;
        }
    }
    this.posI = i;
    this.posJ = j;
    return true;
}
}

class Cavalo extends Peca
{
constructor(tipo, posI, posJ, id){
    super(tipo, posI, posJ, id);
}

mover(tabuleiro, i, j){			
    if(tabuleiro[i][j] <=6 && tabuleiro[i][j]!= 0)
        var tipoPeca = WHITE;
    else 
    {
        if (tabuleiro[i][j] > 6)
            var tipoPeca = BLACK;
        else
            var tipoPeca = EMPTY;
    }
    
    if(tipoPeca == this.tipo)
        return false;
    
    var movimentoI = i - this.posI;
    var movimentoJ = j - this.posJ;
    
    if(Math.abs(movimentoI) != 2 && Math.abs(movimentoJ) != 2)
        return false;
    if(Math.abs(movimentoI) == 2 && Math.abs(movimentoJ) != 1)
        return false;
    if(Math.abs(movimentoJ) == 2 && Math.abs(movimentoI) != 1)
        return false;
    
    this.posI = i;
    this.posJ = j;
    return true;
}
}


class Bispo extends Peca
{
constructor(tipo, posI, posJ, id){
    super(tipo, posI, posJ, id);
}

mover(tabuleiro, i, j)
{
    if(tabuleiro[i][j] <=6 && tabuleiro[i][j]!= 0)
        var tipoPeca = WHITE;
    else 
    {
        if (tabuleiro[i][j] > 6)
            var tipoPeca = BLACK;
        else
            var tipoPeca = EMPTY;
    }
    
    if(tipoPeca == this.tipo)
        return false;
    
    var movimentoI = i - this.posI;
    var movimentoJ = j - this.posJ;
    if(Math.abs(movimentoI)!= Math.abs(movimentoJ))
        return false;
    
    for(var z = 1; z < Math.abs(movimentoI); z++)
    {
        if(movimentoI < 0)
        {
            if(movimentoJ < 0)
            {
                if(tabuleiro[this.posI - z][this.posJ - z] != 0)
                return false;
            }
            else
                if(tabuleiro[this.posI - z][this.posJ + z] != 0)
                    return false;
        }
        
        else
        {		
            if(movimentoJ < 0)
            {
                if(tabuleiro[this.posI + z][this.posJ - z] != 0)
                return false;
            }
            else
                if(tabuleiro[this.posI + z][this.posJ + z] != 0)
                    return false;
        }
    }
    this.posI = i;
    this.posJ = j;
    return true;
}
}


class Rainha extends Peca
{
constructor(tipo, posI, posJ, id){
    super(tipo, posI, posJ, id);
}

mover(tabuleiro, i, j)
{
    if(tabuleiro[i][j] <=6 && tabuleiro[i][j]!= 0)
        var tipoPeca = WHITE;
    else 
    {
        if (tabuleiro[i][j] > 6)
            var tipoPeca = BLACK;
        else
            var tipoPeca = EMPTY;
    }
    
    if(tipoPeca == this.tipo)
        return false;
    
    var movimentoI = i - this.posI;
    var movimentoJ = j - this.posJ;
    
    if(Math.abs(movimentoI) == Math.abs(movimentoJ))
    {
        for(var z = 1; z < Math.abs(movimentoI); z++)
        {
            if(movimentoI < 0)
            {
                if(movimentoJ < 0)
                {
                    if(tabuleiro[this.posI - z][this.posJ - z] != 0)
                    return false;
                }
                else
                    if(tabuleiro[this.posI - z][this.posJ + z] != 0)
                        return false;
            }
            
            else
            {		
                if(movimentoJ < 0)
                {
                    if(tabuleiro[this.posI + z][this.posJ - z] != 0)
                    return false;
                }
                else
                    if(tabuleiro[this.posI + z][this.posJ + z] != 0)
                        return false;
            }
        }
    }
    else
    {
        for(var z = 1; z < Math.abs(movimentoI + movimentoJ); z++)
        {
            if(movimentoI === 0)
            {
                if(movimentoJ < 0)
                {
                    if(tabuleiro[i][this.posJ - z] != 0)
                    return false;
                }
                else
                    if(tabuleiro[i][this.posJ + z] != 0)
                        return false;
            }
            
            else
            {
            
                if(movimentoI < 0)
                {	
                    if(tabuleiro[this.posI - z][j] != 0)
                        return false;
                }
                else
                    if(tabuleiro[this.posI + z][j] != 0)
                        return false;
            }
        }
    }
        
    this.posI = i;
    this.posJ = j;
    return true;
}
}

class Rei extends Peca
{
constructor(tipo, posI, posJ, id){
    super(tipo, posI, posJ, id);
}

mover(tabuleiro, i, j)
{
    if(Math.abs(this.posJ - j) > 1 || Math.abs(this.posI - i) > 1)
        return false;
    
    if(tabuleiro[i][j] <=6 && tabuleiro[i][j]!= 0)
        var tipoPeca = WHITE;
    else 
    {
        if (tabuleiro[i][j] > 6)
            var tipoPeca = BLACK;
        else
            var tipoPeca = EMPTY;
    }
    
    if(tipoPeca == this.tipo)
        return false;
    
    this.posI = i;
    this.posJ = j;
    return true;
}
}

class Peao extends Peca
{
constructor(tipo, posI, posJ, id){
    super(tipo, posI, posJ, id);
}

mover(tabuleiro, i, j)
{
    if(Math.abs(this.posJ - j) > 1)
        return false; //se não estiver na coluna original ou na de captura
    if(Math.abs(this.posJ - j) == 1 && tabuleiro[i][j] == 0)
        return false;
    if(this.tipo == WHITE) //pode andar duas casas quando esta na posicao inicial
    {
        if(i-this.posI > 2 || i - this.posI < 1)
            return false;
        if(i-this.posI == 2 && (j != this.posJ || this.posI != 1|| tabuleiro[this.posI+1][this.posJ] != 0))
            return false;
    }
    else
    {
        if(this.posI - i> 2 || this.posI - i < 1)
            return false;
        if(this.posI - i == 2 && (j != this.posJ || this.posI != 6 || tabuleiro[this.posI-1][this.posJ] != 0))
            return false;
    }
    if(this.posJ == j && tabuleiro[i][j] != 0)//tem peca na proxima casa
        return false;
    
    if(tabuleiro[i][j] <=6 && tabuleiro[i][j]!= 0)
        var tipoPeca = WHITE;
    else 
    {
        if (tabuleiro[i][j] > 6)
            var tipoPeca = BLACK;
        else
            var tipoPeca = EMPTY;
    }
    
    if(tipoPeca == this.tipo)
        return false;
    
    this.posI = i;
    this.posJ = j;
    return true;
}
}

function JogoXadrez() {
	// Identificador de cada peça!
	const W_KING   = 1;  // "&#9812" ♔
	const W_QUEEN  = 2;  // "&#9813" ♕
	const W_ROOK   = 3;  // "&#9814" ♖
	const W_BISHOP = 4;  // "&#9815" ♗
	const W_KNIGHT = 5;  // "&#9816" ♘
	const W_PAWN   = 6;  // "&#9817" ♙
	const B_KING   = 7;  // "&#9818" ♚
	const B_QUEEN  = 8;  // "&#9819" ♛
	const B_ROOK   = 9;  // "&#9820" ♜
	const B_BISHOP = 10; // "&#9821" ♝
	const B_KNIGHT = 11; // "&#9822" ♞
	const B_PAWN   = 12; // "&#9823" ♟
	
	const WHITE = 0;
	const BLACK = 1;
	const EMPTY = 2;
		
	var tabuleiro = new Tabuleiro([]);
	var pecas = [];
	var capturas_b = 0;
	var capturas_w = 0;
	this.rei_b = 0;
	this.rei_w = 0;
	this.vez = 0;

	this.getTabuleiro = function() {
		return tabuleiro.getRepresentacao();
	}

	this.reiniciar = function() {
		tabuleiro.tabuleiro = new Array(8);
		for(let i = 0; i < 8; i++) {
			tabuleiro.tabuleiro[i] = new Array(8);
			for(let j = 0; j < 8; j++)
			{		
				tabuleiro.tabuleiro[i][j] = 0;
			}
		}

		for(var i = 0; i < 8; i++)
		{
			pecas.push( new Peao(WHITE, 1, i, W_PAWN));
			pecas.push( new Peao(BLACK, 6, i, B_PAWN));
		}
		for(var i = 0; i < 2; i++)
		{
			pecas.push(new Torre(WHITE, 0, i*7, W_ROOK));
			pecas.push( new Torre(BLACK, 7, i*7, B_ROOK));
			pecas.push( new Cavalo(WHITE, 0, 1+i*5, W_KNIGHT));
			pecas.push( new Cavalo(BLACK, 7, 1+i*5, B_KNIGHT));
			pecas.push( new Bispo(WHITE, 0, 2+i*3, W_BISHOP));
			pecas.push( new Bispo(BLACK, 7, 2+i*3, B_BISHOP));
		}
		
		pecas.push( new Rainha(WHITE, 0, 4, W_QUEEN));
		pecas.push( new Rainha(BLACK, 7, 4, B_QUEEN));
		pecas.push( new Rei(WHITE, 0, 3, W_KING));
		pecas.push( new Rei(BLACK, 7, 3, B_KING));
		
		for(var i = 0; i < 32; i++) {
			tabuleiro.addPeca(pecas[i], pecas[i].posI, pecas[i].posJ);
		}
	}

	this.getPeca = function(i, j) {
		return tabuleiro.getPeca(pecas,i,j);
	}

	this.moverPeca = function(peca, i, j) {
		
		// Não pode mover uma peça para fora do tabuleiro.
		if (i > 7 || i < 0 || j > 7 || j < 0)
			return false;

		// Não pode mover uma peça para o mesmo lugar.
		if (peca.posI == i && peca.posJ == j)
			return false;
		
		if(tabuleiro.tabuleiro[i][j]!=0)
			var pecaa = tabuleiro.getPeca(pecas,i,j);
		else
			var pecaa = null;
		
		
		if(peca.mover(tabuleiro.tabuleiro,i,j))
		{	
			if(pecaa != null && pecaa.tipo == BLACK)
			{
				pecaa.posI = 0;
				pecaa.posJ = capturas_w + 8;
				capturas_w++;
				if(pecaa.id == 7)
					this.rei_b = 7;
			}
			else
				if(pecaa != null && pecaa.tipo == WHITE)
				{
					pecaa.posI = 7;
					pecaa.posJ = capturas_b + 8;
					capturas_b++;
					if(pecaa.id == 1)
						this.rei_w = 1;
				}
					
			tabuleiro.rmPeca(peca.posI, peca.posJ);
			tabuleiro.addPeca(peca, i, j);
			if(peca.tipo == BLACK)
				this.vez = 0;
			else
				this.vez = 1;
			
			if(peca.id == 6 && i == 7)
			{
				do{
					var novaPeca = prompt("Escolha um número para substituir o peão:\n1- Rainha\n2- Torre\n3-Cavalo\n4-Bispo");
					if(novaPeca != 1 && novaPeca != 2 && novaPeca != 3 && novaPeca != 4)
						alert("Entrada Inválida, tente novamente.");
				}while(novaPeca != 1 && novaPeca != 2 && novaPeca != 3 && novaPeca != 4);
				
				for(var z=0;z<32;z++)
					if(pecas[z].posI == i && pecas[z].posJ == j)
					{
						var x = z;
						z = 32;
					}
				pecas[x] = null;
				
				switch(novaPeca)
				{
					case '1':
						pecas[x] = new Rainha(WHITE, i, j, W_QUEEN);
						break;
					case '2':
						pecas[x] = new Torre(WHITE, i, j, W_ROOK);
						break;
					case '3':
						pecas[x] = new Cavalo(WHITE, i, j, W_KNIGHT);
						break;
					case '4':
						pecas[x] = new Bispo(WHITE, i, j, W_BISHOP);
						break;
				}				
			}
			
			else
				if(peca.id == 12 && i == 0)
				{
					do{
						var novaPeca = prompt("Escolha um número para substituir o peão:\n1- Rainha\n2- Torre\n3-Cavalo\n4-Bispo");
						if(novaPeca != 1 && novaPeca != 2 && novaPeca != 3 && novaPeca != 4)
							alert("Entrada Inválida, tente novamente.");
					}while(novaPeca != 1 && novaPeca != 2 && novaPeca != 3 && novaPeca != 4);
									
					for(var z=0;z<32;z++)
						if(pecas[z].posI == i && pecas[z].posJ == j)
						{
							var x = z;
							z = 32;
						}
					pecas[x] = null;
					
					switch(novaPeca)
					{
						case '1':
							pecas[x] = new Rainha(BLACK, i, j, B_QUEEN);
							break;
						case '2':
							pecas[x] = new Torre(BLACK, i, j, B_ROOK);
							break;
						case '3':
							pecas[x] = new Cavalo(BLACK, i, j, B_KNIGHT);
							break;
						case '4':
							pecas[x] = new Bispo(BLACK, i, j, B_BISHOP);
							break;
					}
				}
			return true;
		}
		return false;
	}
}

var jogo = new JogoXadrez();

function init() {
	gerar_tabuleiro();
	atualizar_jogo();
	jogo.reiniciar();
}

function select(i,j) {
	var tabuleiro = document.getElementById('tabuleiro');
	var obj = tabuleiro.rows[i].cells[j]
	
	if (select.obj_clicado === undefined || select.obj_clicado === null) {
		var peca = jogo.getPeca(i, j);

		if (peca == null)
			return;
		
		select.obj_clicado = obj;
		select.obj_bgcolor = obj.style.backgroundColor;
		select.peca = peca;
		obj.style.backgroundColor = "green";
		
		if(peca.tipo == 1 && jogo.vez == 0 || peca.tipo == 0 && jogo.vez == 1)
		{
			alert("Jogador errado!");
			select.obj_clicado.style.backgroundColor = select.obj_bgcolor;
			select.obj_clicado = null;
			atualizar_jogo();
		}
		
	} else if (jogo.moverPeca(select.peca, i, j)) {
		if(jogo.rei_b == 7)
		{
			alert("Vitória das peças brancas!");
			alert("Reiniciar jogo!");
			reiniciar_jogo();
		}
		else
		{
			if(jogo.rei_w == 1)
			{
				alert("Vitória das peças pretas!");
				alert("Reiniciar jogo!");
				reiniciar_jogo();
			}
			select.obj_clicado.style.backgroundColor = select.obj_bgcolor;
			select.obj_clicado = null;
			atualizar_jogo();
		}
	} else {
		alert("Movimento invalido!");
		select.obj_clicado.style.backgroundColor = select.obj_bgcolor;
		select.obj_clicado = null;
		atualizar_jogo();
	}
}

function atualizar_jogo() {
	const pecas = ["", "♔", "♕", "♖", "♗", "♘", "♙", "♚", "♛", "♜", "♝", "♞", "♟"];
	jogo.reiniciar();
	let tabuleiro = document.getElementById('tabuleiro');
	let tabData = jogo.getTabuleiro();

	for (var i = 0, n = tabuleiro.rows.length; i < n; i++) {
		for (var j = 0, m = tabuleiro.rows[i].cells.length; j < m; j++) {
			obj = tabuleiro.rows[i].cells[j]
				obj.innerHTML = pecas[tabData[i][j]];
		}
	}
}

function reiniciar_jogo() {
	jogo = null;
	jogo = new JogoXadrez();
	jogo.reiniciar();
	atualizar_jogo();
}

function gerar_tabuleiro() {
	var table = "<table id=\"tabuleiro\">";
	var color = false;

	for (var i = 0; i < 8; i++) {
		table += "<tr>";
		for (var j = 0; j < 8; j++) {
			if (color) {
				table += "<td id=\"i" + i + "j" + j + "\" bgcolor=\"silver\" onclick=\"select(" + i + "," + j + ");\"></td>";
			} else {
				table += "<td id=\"i" + i + "j" + j + "\" bgcolor=\"white\" onclick=\"select(" + i + "," + j + ");\"></td>";
			}

			color = !color;
		}
		table += "</tr>";
		color = !color;
	}
	table += "</table>";
	document.write(table);
}

init();
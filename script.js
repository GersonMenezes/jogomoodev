var p1y = p2y = 40; // posicao inicial em y

var pt = 10; // Largura da barrinha (t = thickness)
var ph = 100; // Altura das barrinhas
var bx = by =  50; // Posicao inicial da bolinha
var bd = 6; // ball dimension
var xv = yv = 4; // Velocidade nos eixos
var score1 = score2 = 0; // Pontuação
var aiv = 2; //Velocidade da maquina
var body = document.querySelector('body');
var canvas = document.getElementById('canvas');
var cc = canvas.getContext('2d');
var game = document.querySelector('.jogo');

window.onload = function(){
	
	canvas.width = game.offsetWidth;    // Atribui o tamanho de game para canvas
	canvas.height = game.offsetHeight;
	body.addEventListener('mousemove', function(event){
		p1y = event.clientY - ph / 2;  //50
	})

	setInterval(update, 1000/30); // Chama a funcao 30 frames por segundos
}

function update(){
	bx = bx + xv;
	by = by + yv;
	//O trecho acima faz a bolinha se mover

	// Abaixo vamos verificar os demilitadores
	if(by<0 && yv < 0){
		yv = -yv;
	}
	if(by > canvas.height && yv > 0){
		yv = -yv;
	}
	if(bx < 0){
		if(by > p1y && by < p1y + ph){
			xv = -xv;
			var dy = by - (p1y + ph / 2);
			yv = dy*0.3;
		}else{
			score2++;
			reset();
		}
	}
	if(bx > canvas.width){
		if(by > p2y && by < p2y + ph){
			xv = -xv;
			var dy = by - (p2y + ph / 2);
		  yv = dy * 0.3;
		}
		else {
			score1++;
			reset();
		}
	}
	if(p2y + ph / 2 < by){
		p2y = p2y + aiv;
	}
	else{
		p2y = p2y - aiv;
	}
	// Desenho o quedro geral
	cc.fillStyle = "#222";						// Escolhe a cor
	cc.fillRect(0,0, canvas.width, canvas.height);  // Preenche a cor
	cc.fillStyle = 'white';
	cc.fillRect(0, p1y, pt, ph);
	cc.fillRect(canvas.width - pt, p2y, pt, ph);	// x, y, largura e altura
	cc.fillRect(bx - bd/2, by - bd/2, bd, bd);	// Bolinha
	cc.fillText(score1, 100, 100);								// desenha pontos player 1
	cc.fillText(score2, canvas.width - 100, 100);	// desenha pontos Player 2


}

function reset(){
	bx = canvas.width / 2;
	by = canvas.height /2;
	xv = -xv;
	yv = 3;
}
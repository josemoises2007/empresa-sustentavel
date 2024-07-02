let dialogue = [
  { speaker: 'Jake', message: 'Finalmente conseguimos sair da cidade.<div class="q">clika<h1>"Q"</h1></div>', image: 'https://i.imgur.com/FmJGcXi.png', ashColor: 'rgb(4,0,78)', brockColor: 'blue' },
  { speaker: 'Aisle', message: 'Sim, mas é triste deixar tudo para trás por causa da contaminação.<div class="q">clika<h1>"Q"</h1></div>', image: 'https://i.imgur.com/y0H1ZVe.png', ashColor: 'purple', brockColor: 'rgb(112,1,58)' },
  { speaker: 'Jake', message: 'Precisamos aprender com isso. A sustentabilidade é crucial para o futuro.<div class="q">clika<h1>"Q"</h1></div>', image: 'https://i.imgur.com/FmJGcXi.png', ashColor: 'rgb(11,0,75)', brockColor: 'blue' },
  { speaker: 'Aisle', message: 'Concordo. Devemos cuidar melhor do meio ambiente para que outras cidades não sofram o mesmo destino.', image: 'https://i.imgur.com/y0H1ZVe.png<div class="q">clika<h1>"Q"</h1></div>', ashColor: 'rgb(112,1,58)', brockColor: 'rgb(112,1,58)' },
  { speaker: 'Jake', message: 'É uma nova chance para começar do zero e fazer as coisas da maneira certa.<div class="q">clika<h1>"Q"</h1></div>', image: 'https://i.imgur.com/FmJGcXi.png', ashColor: 'rgb(12,0,88)', brockColor: 'blue' },
  { speaker: 'Aisle', message: 'Todos queremos um mundo mais sustentável e saudável para todos.<div class="q">clika<h1>"Q"</h1></div>', image: 'https://i.imgur.com/y0H1ZVe.png', ashColor: 'rgb(112,1,58)', brockColor: 'rgb(112,1,58)' },
  { speaker: 'Aisle', message: '.', image: 'https://i.imgur.com/y0H1ZVe.png', ashColor: 'rgb(112,1,58)', brockColor: 'rgb(112,1,58)' }
];
let message = "Obrigado por ter chegado até o final do jogo";
let angle = 0;
let offset = 0.01;
let conversaTerminou = false;
let currentIndex = 0;
let dialogueContainer;
let speakerImage;
let dialogueText;
let toggleButton;
let chatVisible = false;

let typingSpeed = 50; // Velocidade de escrita (em milissegundos)
let typingDelay = 1000; // Atraso entre mensagens (em milissegundos)

let qKeyEnabled = true; // Variável para controlar o estado da tecla Q


let direccion = "idle";
let caminarDerecha = [];
let caminarIzquierda = [];
let idle = [];
let saltarArriba = [];
let personaje;
let velocidad = 5;
let gravedad = 3.5;
let isJumping = false;
let jumpForce = 20;
let barraProgresso;
let cameraOffset;
let smoothFactor = 0.09;
let arboles = [];
let v;
let drops = []; // Array para almacenar las gotas de lluvia
let riverHeight = 0;
let xBloco1 = 50;
     let  yBloco1 = 50;
let divVisible = false;
let cuadrado;
let colega;
let colegaProgress = 0; // Progresso da colega
let colegaVelocidade = 3; // Velocidade da colega
let colegaDirection = "idle"; // Direção da colega (idle, left, right)
let coinCollected = false;
let osc;
let melody = [
  {note:293.66, duration: 700},  // C4
  {note: 369.99, duration: 500},  // C4
  {note: 392.00, duration: 250},  // D4
  {note: 440.00, duration: 500},  // C4
  {note: 440.00, duration: 250},  // E4
  {note: 493.88, duration: 500},  // C4
  {note: 554.37, duration: 250},  // C4
  {note: 587.33, duration: 1000}, // D4

  {note: 493.88, duration: 250},  // D4
  {note: 440.00, duration: 500},  // D4
  {note: 369.99, duration: 250},  // E4
  {note: 369.99, duration: 250},  // D4
  {note: 293.63, duration: 250},  // F4
  {note: 329.63, duration: 500},  // D4
  {note: 369.99, duration: 250},  // D4
  {note: 329.63, duration: 1000}, // E4

  {note:293.66, duration: 250},  // C4
  {note: 369.99, duration: 500},  // C4
  {note: 392.00, duration: 250},  // D4
  {note: 440.00, duration: 500},  // C4
  {note: 440.00, duration: 250},  // E4
  {note: 493.88, duration: 500},  // C4
  {note: 554.37, duration: 250},  // C4
  {note: 587.33, duration: 1000},

  {note: 493.88, duration: 250},  // C4
  {note: 440.00, duration: 500},  // C4
  {note: 369.99, duration: 250},  // D4
  {note: 369.99, duration: 500}, 
 {note: 293.66, duration: 1000}, // C4  // E4
  {note: 369.99, duration: 500},  // C4
  {note: 329.63, duration: 500}, // D4
 {note: 293.66, duration: 1000},  // F4
  
  
  {note: 440.00, duration: 250},  // F4
  {note: 587.33, duration: 1000},  // E4
  {note: 554.37, duration: 250},
  {note: 587.33, duration: 1000},
   {note: 493.88, duration: 250},  // C4
   {note: 440.00, duration: 500}, // E4
    {note: 329.63, duration: 250},
  {note: 440.00, duration: 1000}, 
   {note: 440.00, duration: 250},
    {note: 587.33, duration: 1000},
  {note: 554.37, duration: 250},
    {note: 587.33, duration: 1000},
   {note: 493.88, duration: 500},
   {note: 440.00, duration: 1000},
   {note: 369.99, duration: 500},
   {note: 329.63, duration: 1500},
  
  
  
  {note:293.66, duration: 250},  // C4
  {note: 369.99, duration: 500},  // C4
  {note: 392.00, duration: 250},  // D4
  {note: 440.00, duration: 500},  // C4
  {note: 440.00, duration: 250},  // E4
  {note: 493.88, duration: 500},  // C4
  {note: 554.37, duration: 250},  // C4
  {note: 587.33, duration: 1000},

  {note: 493.88, duration: 250},  // C4
  {note: 440.00, duration: 500},  // C4
  {note: 369.99, duration: 250},  // D4
  {note: 369.99, duration: 500},  // C4
  {note: 293.66, duration: 250},  // E4
  {note: 369.99, duration: 500},  // C4
  {note: 329.23, duration: 1000},
{note: 293.66, duration: 2000},
   // F4
  
  // Añade más notas de la melodía aquí
];
let currentNote = 0;
let isPlaying = false;
let playButton;
let volumeSlider;
let coinFade = 255;
let texts = [
  "<img  class='tu'width='140' height='150' src='tuto.png'></img><p class='gui'>guia tua colega as bolhas verdes com simbolos de sustetabilidade, ate chegar a 9 pontos</p>",
  "<img  class='tu'width='140' height='150' src='tuto.png'></img><p class='gui'>guia tua colega as bolhas verdes com simbolos de sustetabilidade, ate chegar a 9 pontos</p>",
   "<img  class='tu'width='140' height='150' src='tuto.png'></img><p class='gui'>guia tua colega as bolhas verdes com simbolos de sustetabilidade, ate chegar a 9 pontos</p>",
   "<img  class='tu'width='140' height='150' src='tuto.png'></img><p class='gui'>guia tua colega as bolhas verdes com simbolos de sustetabilidade, ate chegar a 9 pontos</p>"
];
let textsa = [
  "Sustentabilidade é conseguir possibilitar a vida, o crescimento e as relações naturais de maneira justa, diversa, viável e ecológica.<small>Percio Campos</small>",
  "A sustentabilidade é a abertura para o futuro.Se fecharmos, não existirá futuro.<small>Dias Diogo</small>",
  "⁠Sustentabilidade não é moda, é uma necessidade.<small>joao marcos</small>",
  "A base de toda a sustentabilidade é o desenvolvimento humano que deve contemplar um melhor relacionamento do homem com os semelhantes e a natureza.<small>Nagib Anderáos Neto</small>"
];

let divwuao;
let colegaIdle = []; // Animação de inatividade da colega
let colegaLeft = []; // Animação da colega para a esquerda
let colegaRight = [];
let img1, img2, img3, img4;
let imga1, imga2, imga3, imga4;
// Animação da colega para a direita
let currentLevel = 0;
let moviendoIzquierda = false;
let moviendoDerecha = false;
let points = 0;
let nivel = [
  // Nível 1
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 2, 0, 6, 3, 6, 6, 0, 0, 3, 0, 3,0,0,0,0,0,0,0,3, 0, 0, 0, 6, 0, 6, 3, 6, 6, 0, 0, 3, 0, 3,0,0,0,0,0,0,0,3, 0, 0, 0, 6, 0, 6, 3, 6, 6, 0, 0, 3, 0, 3,0,0,0,0,0,0,0,3],
  ],
  // Nível 2
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 3, 2, 0, 6, 3, 6, 6, 6, 0, 6, 0, 3,0,0,0,0,0,0,0,3,6,6,6,6,6,6,0, 0, 6, 0, 3, 0, 6, 3, 6, 6, 6, 0, 6, 0, 3,0,0,3,0,3,0,0,3,6,6,6,6,6,6],
  ],
  // Nível 3
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 3, 2, 0, 5, 3, 0, 5, 0, 0, 5, 0, 3,0,0,5,0,5,0,5,3,0, 0, 5, 0, 3, 0, 5, 3, 0, 5, 0, 0, 5, 0, 3,0,0,5,0,5,0,5,3, 0, 0, 5, 0, 3,0,0,5,0,5,0,5,3, 0, 0, 5, 0, 3,0,0,5,0,5,0,5,3],
  ],
  // Nível 4
  [
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 2, 3, 4, 3, 4, 4, 0, 0, 4, 0, 3,0,0,0,0,0,8,8,3, 0,0, 0, 0, 0, 4, 3, 4, 4, 0, 0, 4, 0, 3,0,0,0,0,0,8,8,3,3,3,3],
  ], [
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,],
  ]
];

let fadeState = false;
let fadeAmount = 5; // Ajuste para controlar a velocidade do fade


let divMiau;

let leftMargin = 50;  // Margen izquierdo en píxeles
let rightMargin = 50; // Margen derecho en píxeles

function setup() {
   for (let i = 0; i < 100; i++) {
    drops.push(new Drop()); // Crear 100 gotas de lluvia
  }
  createCanvas(windowWidth, windowHeight);  
  osc = new p5.Oscillator('sine');
  osc.start();
  osc.amp(0);

  playButton = createButton('Play');
  playButton.position(10, 40);
  playButton.mousePressed(togglePlay);
playButton.class('botonzito');
  
  volumeSlider = createSlider(0, 1, 0.5, 0.01);
  volumeSlider.position(10, 70);
  volumeSlider.input(updateVolume);
  volumeSlider.class('volume-slider');
  volumeSlider.attribute('disabled', '');
    cuadrado = new Cuadrado(300, 400, 50);
  divwuao = createDiv('');
  divwuao.class('wuao');
  divwuao.hide();
   divMiau = createDiv(' ');
  divMiau.class('miau');
divMiau.style.position='absolute';
 divwuao.style.transform = 'translate(-50%, -50%)';
  divMiau.style.transform = 'translate(-50%, -50%)';
  divMiau.hide();
 dialogueContainer = createDiv();
  dialogueContainer.position('relative');
  dialogueContainer.style('opacity', '0');
  dialogueContainer.style('width', '560px');
  dialogueContainer.style('height', '100px');
  dialogueContainer.style('border-radius', '20px');
  dialogueContainer.style('overflow-y', 'scroll');
  dialogueContainer.class('ol');
  dialogueText = createP();
  dialogueText.style('font-size', '28px');
  dialogueText.style('font-family', 'Arial');
  dialogueText.position('absolute');
  dialogueText.parent(dialogueContainer);
  dialogueContainer.style('transition', 'opacity 1s ease-in-out');
  dialogueText.parent(dialogueContainer);
  dialogueContainer.style.transform = 'translate(-50%, -50%)';
    toggleButton = createButton('me clika!');
  toggleButton.position(10, 160);
  toggleButton.mousePressed(toggleChat);
   toggleButton.class('cl');
   toggleButton.style('display', 'none');
  
  
  
  
  
  cameraOffset = createVector(10, 60); 
 
   colegaProgress = document.createElement('progress');
colegaProgress.setAttribute('value', '0');
colegaProgress.setAttribute('max', '100');
document.body.appendChild(colegaProgress);
colegaProgress.style.position = 'absolute';
colegaProgress.style.top = '50%';
colegaProgress.style.left = '50%';
colegaProgress.style.transform = 'translate(-50%, -335%)';
colegaProgress.classList.add('mi-clase-cs');
  
  barraProgresso = document.createElement('progress');
  barraProgresso.setAttribute('value', '0');
  barraProgresso.setAttribute('max', '100');
  document.body.appendChild(barraProgresso);
  barraProgresso.style.position = 'absolute';
  barraProgresso.style.top = '50%';
  barraProgresso.style.left = '50%';
  barraProgresso.style.transform = 'translate(-50%, -335%)';
  barraProgresso.classList.add('mi-clase-css');
  
  
  colega = new Colega(width / 20, height / 20, 60, 50, {
    idle: colegaIdle,
    left: colegaLeft,
    right: colegaRight,
  });
  
  personaje = new Sprite(width / 20, height / 20, 60, 50, {
    idle: idle,
    caminarDerecha: caminarDerecha,
    caminarIzquierda: caminarIzquierda,
    saltarArriba: saltarArriba,
  });
}


class Drop {
  constructor() {
    this.x = random(1800); // Posición horizontal aleatoria
    this.y = random(-500, -50); // Posición vertical aleatoria fuera de la pantalla
    this.z = random(0, 20); // Profundidad aleatoria para variar la velocidad
    this.len = map(this.z, 0, 20, 10, 20); // Longitud de la gota basada en la profundidad
    this.yspeed = map(this.z, 0, 20, 1, 20); // Velocidad de la gota basada en la profundidad
  }

  fall() {
    this.y = this.y + this.yspeed; // Mover la gota hacia abajo
    let grav = map(this.z, 0, 20, 0, 0.2); // Gravedad basada en la profundidad
    this.yspeed = this.yspeed + grav; // Incrementar la velocidad de caída

    if (this.y > height) {
      this.y = random(-200, -100); // Resetear la gota a una posición superior aleatoria
      this.yspeed = map(this.z, 0, 20, 4, 10); // Resetear la velocidad de caída
      // Incrementar la altura del río cuando una gota toca el fondo
      riverHeight += 0.1;
    }
  }

  show() {
    let thick = map(this.z, 0, 20, 1, 3); // Grosor de la gota basado en la profundidad
    strokeWeight(thick);
    stroke(138, 43, 226); // Color de la gota
    line(this.x, this.y, this.x, this.y + this.len); // Dibujar la gota como una línea
  }
}
class Cuadrado {
  constructor(x, y, lado) {
    this.x =-160;
    this.y = 400;
    this.lado = 11800 ||1 ;
      this.imagem = null; 
   // this.imagem = loadImage('https://i.imgur.com/9m3ko1b.png');
  }

 setImage(imagem) {
    this.imagem = imagem;
  }

  dibujar() {
    if (this.imagem) {
      image(this.imagem, this.x, this.y, this.lado, this.lado); // Desenha a imagem no lugar do retângulo
    } else {
      fill(255); // Fallback para uma cor padrão caso não tenha imagem
      rect(this.x, this.y, this.lado, this.lado);
    }
  }
}


class Colega {
  constructor(x, y, w, h, animations) {
    this.position = createVector(x, y);
    this.width = w;
    this.height = h;
    this.animations = animations;
    this.currentAnimation = animations.idle;
    this.currentFrame = 0;
    this.frameDelay = 10;
    this.frameDelayCounter = 0;
    this.velocity = createVector(0, 0);
    this.onGround = false; // Indica se o colega está no solo
    this.groundLevel = height - this.height / 8; // Altura do solo
  }

  playAnimation(animationName) {
    if (this.currentAnimation != this.animations[animationName]) {
      this.currentAnimation = this.animations[animationName];
      this.currentFrame = 0;
      this.frameDelayCounter = 0;
    }
  }

  update() {
    this.frameDelayCounter++;
    if (this.frameDelayCounter >= this.frameDelay) {
      this.frameDelayCounter = 0;
      this.currentFrame++;
      if (this.currentFrame >= this.currentAnimation.length) {
        this.currentFrame = 0;
      }
    }

    // Verificar se o colega está no solo
    if (this.position.y >= this.groundLevel) {
      this.onGround = true;
      this.velocity.y = 0;
    } else {
      this.onGround = false;
    }

    // Se o colega não estiver no solo, aplicar a gravidade
    if (!this.onGround) {
      this.velocity.y += gravedad;
      this.position.y += this.velocity.y;
    }

    // Se o colega estiver no solo, ajustar a posição vertical para o nível do solo
    if (this.onGround && this.position.y !== this.groundLevel) {
      this.position.y = this.groundLevel;
    }
     if (this.direccion === "izquierda") {
            this.position.x -= velocidad;
        } else if (this.direccion === "derecha") {
            this.position.x += velocidad;
        }
  }

  show() {
     
    image(
      this.currentAnimation[this.currentFrame],
      this.position.x - this.width / 2,
      this.position.y - this.height / 6,
      this.width,
      this.height
    );
   
  }
}



class Sprite {
  constructor(x, y, w, h, animations) {
    this.position = createVector(x, y);
    this.width = w;
    this.height = h;
    this.animations = animations;
    this.currentAnimation = animations.idle;
    this.currentFrame = 0;
    this.frameDelay = 10;
    this.frameDelayCounter = 0;
    this.jumpVelocity = jumpForce;
    this.jumpCount = 0;
    this.jumpHeight = 50;
    this.velocity = createVector(0, 0);
  }

  playAnimation(animationName) {
    if (this.currentAnimation != this.animations[animationName]) {
      this.currentAnimation = this.animations[animationName];
      this.currentFrame = 0;
      this.frameDelayCounter = 0;
    }
  }

  update() {
    this.frameDelayCounter++;
    if (this.frameDelayCounter >= this.frameDelay) {
      this.frameDelayCounter = 0;
      this.currentFrame++;
      if (this.currentFrame >= this.currentAnimation.length) {
        this.currentFrame = 0;
      }
    }
  }
  

  show() {
    image(this.currentAnimation[this.currentFrame], this.position.x - this.width / 2, this.position.y - this.height / 6, this.width, this.height);
  }
}

function preload() { 
  speakerImage = loadImage(dialogue[0].image);
 
    portalImage = loadImage('https://i.imgur.com/d3CRZvp.png');
  XD1=loadImage('https://i.imgur.com/FfCOGQ2.png');
  XD2=loadImage('https://i.imgur.com/XuYHY3h.png');
   XD4=loadImage('https://i.imgur.com/XVDfqqO.png');
   XD5=loadImage('https://i.imgur.com/ImyW3lK.png');
   XD7=loadImage('https://i.imgur.com/PTlTdwW.png');
   XD8=loadImage('https://i.imgur.com/nKdwfTO.png');
  
  v = loadImage('https://i.imgur.com/wwgvU1i.png');
  for (let i = 1; i <= 3; i++) {
     imga1 = loadImage('https://i.imgur.com/ZmwSSRw.png'); // Substitua pelo link da sua imagem
  imga2 = loadImage('https://i.imgur.com/gUpUZm1.png'); // Substitua pelo link da sua imagem
  imga3 = loadImage('https://i.imgur.com/VSVzp1j.png'); // Substitua pelo link da sua imagem
  imga4 = loadImage('https://i.imgur.com/ZmwSSRw.png'); 
    
    
    
     img1 = loadImage('https://i.imgur.com/wwgvU1i.png');
  img2 = loadImage('https://i.imgur.com/IOkViqv.jpeg');
  img3 = loadImage('https://i.imgur.com/pUTADHT.jpeg');
  img4 = loadImage('https://i.imgur.com/h2quJH5.png');
    
     colegaIdle.push(loadImage("1dle.png"));
     colegaIdle.push(loadImage("2dle.png"));
     colegaIdle.push(loadImage("3dle.png"));
    colegaLeft.push(loadImage("d1r.png"));
    colegaLeft.push(loadImage("d2r.png"));
    colegaLeft.push(loadImage("https://i.imgur.com/xBFMh6x.png"));
    colegaRight.push(loadImage("1z.png"));
     colegaRight.push(loadImage("2z.png"));
     colegaRight.push(loadImage("3z.png"));
    
    
    
    caminarDerecha.push(loadImage('l8.png'));
    caminarDerecha.push(loadImage('l11.png'));
    caminarDerecha.push(loadImage('l9.png'));
    caminarIzquierda.push(loadImage("l2.png"));
    caminarIzquierda.push(loadImage("https://i.imgur.com/5SUJWww.png"));
    caminarIzquierda.push(loadImage("l12.png"));
  
    idle.push(loadImage("mn (1).png"));
    idle.push(loadImage("mn3.png"));
    idle.push(loadImage("mn2.png"));
    saltarArriba.push(loadImage('l.png'));
    saltarArriba.push(loadImage('l3.png'));
    saltarArriba.push(loadImage('l4.png'));    
  }
}

function draw() {  
  
   textFont('Pixelify Sans');
  
  
  
  if (fadeState) {
    // Fade out
  
    fill(0, fadeAmount); // Cor preta com opacidade
    rect(0, 0, width, height); // Desenha um retângulo preto sobre toda a tela
    
    // Reduz gradualmente a opacidade do fade
    fadeAmount += 5; // Ajuste conforme necessário
    
    // Se o fade out estiver completo (opacidade máxima), aguarde 5 segundos e reinicie o nível
    if (fadeAmount >= 255) {
      setTimeout(() => {
        // Reinicie o nível aqui
        // Por exemplo:
        resetLevel(); // Função para reiniciar o nível, ajustando as posições do colega e do personagem
        
        // Reinicie o fade
        fadeAmount = 5; // Reinicie o fadeAmount para iniciar o fade in
        fadeState = false; // Reinicie o estado de fade
      }, 100); // 5000 milissegundos (5 segundos)
    }
  } else {
   switch (currentLevel) {
  case 0:
       
    background(img1); for (let drop of drops) {
    drop.fall(); // Actualizar la posición de cada gota
    drop.show(); // Dibujar cada gota
  }drawRiver();
  
  // Dibujar el río en la parte inferior de la pantalla
  
    cuadrado.setImage(imga1);
    divMiau.html(texts[0]);
    divwuao.html(textsa[0]);
    drawingContext.shadowBlur = 50;
    drawingContext.shadowColor = 'rgb(255,119,0)';// Texto para o nível 0
    break;
  case 1:
    background(img2);
    cuadrado.setImage(imga2);
    divMiau.html(texts[1]);
    drawingContext.shadowBlur = 50;
    drawingContext.shadowColor = 'green';
    divwuao.html(textsa[1]);// Texto para o nível 1
    break;
  case 2:
    background(img3);
    cuadrado.setImage(imga3);
    divMiau.html(texts[2]);
    divwuao.html(textsa[2]);
    drawingContext.shadowBlur = 50;
    drawingContext.shadowColor = 'red';// Texto para o nível 2
    break;
  case 3:
    background(img4);
    cuadrado.setImage(imga4);
    divMiau.html(texts[3]); // Texto para o nível 3
    divwuao.html(textsa[3]);
    drawingContext.shadowBlur = 50;
    drawingContext.shadowColor = 'rgb(0,244,255)';
    break;
  case 4: // Nuevo case para el nivel 4
    background(img4);
       cuadrado.setImage(imga4);
         toggleButton.style('display', 'block');
    if (chatVisible) {
    image(speakerImage, 40, 330, 100, 100);
    dialogueContainer.style('opacity', '1');
  } else {
    dialogueContainer.style('opacity', '0');
  }
  if (conversaTerminou) {
    background('rgb(23,192,198)');
    
    
    
    dialogueContainer.style('opacity', '0');
    let r = map(noise(angle), 0, 1, 0, 255);
  let g = map(noise(angle + 1000), 0, 1, 0, 255);
  let b = map(noise(angle + 2000), 0, 1, 0, 255);
  fill(r, g, b);
    textSize(42);
  text(message, 50, 100);

  angle += offset;
  }
  // Color de sombra para el nivel 4
    break;
  default:
    background(255); 
    // Fallback para una cor padrão caso algo dé errado
       
}
 if (currentLevel === 4 && !conversaTerminou) {
   
 }
    

  fill(255);
  textSize(20);
text('Pontuação: ' + points+'/9', 10, 30);translate(cameraOffset.x, cameraOffset.y);
    
let targetX = personaje.position.x;
cuadrado.dibujar();
    let xBloco1, yBloco1;
for (let i = 0; i < nivel[currentLevel].length; i++) {
  for (let j = 0; j < nivel[currentLevel][i].length; j++) {
    let valor = nivel[currentLevel][i][j];
     if (valor === 8) {image(XD7, j *50 , i * 50, 190, 190);}
    if (valor === 2) {image(XD2, j * 50, i * 50, 90, 90);
                      if (colega.position.x > j * 50 && colega.position.x < (j + 1) * 50 &&
          colega.position.y > i * 50 && colega.position.y < (i + 1) * 50) {
        // Mostrar a div Miau e definir a variável divVisible como verdadeira
        divwuao.show();
        divVisible = true;
      } else {
        // Ocultar a div Miau e definir a variável divVisible como falsa
        divwuao.hide();
        divVisible = false;
      }
                     
                     
                     }
    if (valor === 4) { image(XD8, j * 50, i * 1, 390, 490);}
        if (valor === 5) { image(XD5, j *30, i * 4, 390, 600);}
    if (valor === 6) { image(XD4, j * 50, i * 45, 490, 110);}
    if (valor === 7) {
      
       image(XD3, j * 50, i * 50, 90, 90);
    }
    if (valor === 1) { 
      
       xBloco1 = 50;
      yBloco1 = 50;
     image(XD1, j * xBloco1 , i *  yBloco1, 90, 90);
      // Verificar colisão com o colega
      if (colega.position.x > j * 50 && colega.position.x < (j + 1) * 50 &&
          colega.position.y > i * 50 && colega.position.y < (i + 1) * 50) {
        // Mostrar a div Miau e definir a variável divVisible como verdadeira
        divMiau.show();
        divVisible = true;
      } else {
        // Ocultar a div Miau e definir a variável divVisible como falsa
        divMiau.hide();
        divVisible = false;
      }
    } else if (valor === 3) {
      // Desenhar o portal (você pode substituir isso por uma imagem ou uma cor)
       tint(255, 200); 
          image(portalImage, j * 50, i * 50, 50, 50);
noTint();
      // Verificar colisão com o personagem para blocos de número 3
      if (colega.position.x > j * 50 && colega.position.x < (j + 1) * 50 &&
          colega.position.y > i * 50 && colega.position.y < (i + 1) * 50)  {
        points++;
       gsap.to(colegaProgress, { value: parseInt(colegaProgress.getAttribute('value')) + 10, duration: 0.5 });
gsap.to(barraProgresso, { value: parseInt(barraProgresso.getAttribute('value')) + 10, duration: 0.5 });
        nivel[currentLevel][i][j] = 0; // Remover o bloco de número 3 após a coleta
        
        
        if (points >= 9) {
          // Resetar pontos
          currentLevel++;
          points = 0;
     resetLevel(); // Função para reiniciar o nível, ajustando as posições do colega e do personagem
      fadeAmount = 5; // Reinicie o fadeAmount para iniciar o fade in
      fadeState = true;
        }
      }
    }
  }
}
    if (moviendoIzquierda) {
    // Lógica para mover el personaje a la izquierda
    personaje.x -= 5; // Ajusta la velocidad según tu necesidad
    // También puedes cambiar la animación del personaje aquí
  } else if (moviendoDerecha) {
    // Lógica para mover el personaje a la derecha
    personaje.x += 5; // Ajusta la velocidad según tu necesidad
    // También puedes cambiar la animación del personaje aquí
  }
  
let personajeLeft = personaje.position.x - personaje.width / 2;
let personajeRight = personaje.position.x + personaje.width / 2;
let personajeTop = personaje.position.y - personaje.height / 2;
let personajeBottom = personaje.position.y + personaje.height / 2;

if (personajeRight > cuadrado.x && personajeLeft < cuadrado.x + cuadrado.lado &&
    personajeBottom > cuadrado.y && personajeTop < cuadrado.y + cuadrado.lado) {
  // Colisión con el personaje
  // Detener el movimiento horizontal
  if (personaje.velocity.x > 0) { // Moviéndose hacia la derecha
    personaje.position.x = cuadrado.x - personaje.width / 2;
  } else if (personaje.velocity.x < 0) { // Moviéndose hacia la izquierda
    personaje.position.x = cuadrado.x + cuadrado.lado + personaje.width / 2;
  }
  // Detener el movimiento vertical
  if (personaje.velocity.y > 0) { // Cayendo
    personaje.position.y = cuadrado.y - personaje.height / 2;
  } else if (personaje.velocity.y < 0) { // Saltando
    personaje.position.y = cuadrado.y + cuadrado.lado + personaje.height / 2;
  }
  personaje.velocity.y = 0;
  isJumping = false;
}

let colegaLeft = colega.position.x - colega.width / 2;
let colegaRight = colega.position.x + colega.width / 2;
let colegaTop = colega.position.y - colega.height / 2;
let colegaBottom = colega.position.y + colega.height / 2;

if (colegaRight > cuadrado.x && colegaLeft < cuadrado.x + cuadrado.lado &&
    colegaBottom > cuadrado.y && colegaTop < cuadrado.y + cuadrado.lado) {
  // Colisión con el colega
  // Detener el movimiento horizontal
  if (colega.velocity.x > 0) { // Moviéndose hacia la derecha
    colega.position.x = cuadrado.x - colega.width / 2;
  } else if (colega.velocity.x < 0) { // Moviéndose hacia la izquierda
    colega.position.x = cuadrado.x + cuadrado.lado + colega.width / 2;
  }
  // Detener el movimiento vertical
  if (colega.velocity.y > 0) { // Cayendo
    colega.position.y = cuadrado.y - colega.height / 2;
  } else if (colega.velocity.y < 0) { // Saltando
    colega.position.y = cuadrado.y + cuadrado.lado + colega.height / 2;
  }
  colega.velocity.y = 0;
}
  // Ajustar la posición objetivo de la cámara considerando los márgenes izquierdo y derecho
  let dx = targetX + cameraOffset.x;
  if (dx < leftMargin) {
    cameraOffset.x = lerp(cameraOffset.x, width / 3 - personaje.position.x + leftMargin, smoothFactor);
  } else if (dx > width - rightMargin) {
    cameraOffset.x = lerp(cameraOffset.x, width / 3 - personaje.position.x - rightMargin, smoothFactor);
  } else {
    cameraOffset.x = lerp(cameraOffset.x, width / 3 - personaje.position.x, smoothFactor);
  }
  
 
  
  barraProgresso.style.left = personaje.position.x + cameraOffset.x + 'px';
  barraProgresso.style.top = personaje.position.y + cameraOffset.y + 'px';
  
colegaProgress.style.left=colega.position.x+cameraOffset.x+'px';
 colegaProgress.style.top=colega.position.y+cameraOffset.y+'px'; 
    divMiau.style.left = xBloco1 + 'px';
    divMiau.style.top=yBloco1  + 'px';
    
  if (keyIsDown(LEFT_ARROW)) {
    personaje.position.x -= velocidad;
    direccion = "izquierda";
  } else if (keyIsDown(RIGHT_ARROW)) {
    personaje.position.x += velocidad;
    direccion = "derecha";
  } else {
    direccion = "idle";
  }
  
  if (direccion === "derecha") {
    personaje.playAnimation("caminarDerecha");
  } else if (direccion === "izquierda") {
    personaje.playAnimation("caminarIzquierda");
  } else if (isJumping) {
    personaje.playAnimation("saltarArriba");
  } else if (direccion === "idle") {
    personaje.playAnimation("idle");
  }
  
  
    // Limitar o movimento do personagem dentro dos limites definidos
  if (personaje.position.x < leftMargin) {
    personaje.position.x = leftMargin;
  }
  
  let maxRight = width - rightMargin - personaje.width / 2 - cameraOffset.x;
  if (personaje.position.x > maxRight) {
    personaje.position.x = maxRight;
  }
  
  
  personaje.show();
  
  if (isJumping) {
    personaje.position.y -= personaje.jumpVelocity;
    personaje.jumpVelocity -= gravedad;
    personaje.jumpCount++;
    if (personaje.jumpCount >= personaje.jumpHeight) {
      personaje.jumpCount = 0;
      personaje.jumpVelocity = jumpForce;
     
    }
  } else {
    personaje.velocity.y += gravedad;
    personaje.position.y += personaje.velocity.y;
  }
  
  if (personaje.position.x < 0) {
    personaje.position.x = 0;
  }
  
  if (personaje.position.x > width - personaje.width / 4 - cameraOffset.x) {
    personaje.position.x = width - personaje.width / 2 - cameraOffset.x;
  }
  
  if (personaje.position.y > height - personaje.height / 6 - cameraOffset.y) {
    isJumping = false;
    personaje.velocity.y = 0;
    personaje.position.y = height - personaje.height / 8 - cameraOffset.y;
  }
  
  personaje.update();
  colega.update();
  colega.show();


  // Se a distância for menor que um valor desejado (por exemplo, 50 pixels), afaste o colega
  let distance = dist(personaje.position.x, personaje.position.y, colega.position.x, colega.position.y);

// Verificar si la distancia es menor o igual a 5 píxeles (ajusta este valor según tu necesidad)
if (distance <= 5) {
  // La colega se para y solo ejerce la animación idle
  colega.playAnimation("idle");
} else {
  // Actualizar la posición de la colega según la dirección
  if (personaje.position.x < colega.position.x) {
    colega.position.x -= colegaVelocidade;
    colegaDirection = "left";
  } else if (personaje.position.x > colega.position.x) {
    colega.position.x += colegaVelocidade;
    colegaDirection = "right";
  } else {
    colegaDirection = "idle";
  }

  // Atualize a animação da colega com base na direção
  if (colegaDirection === "left") {
    colega.playAnimation("left");
  } else if (colegaDirection === "right") {
    colega.playAnimation("right");
  } else {
    colega.playAnimation("idle");
  }
}
  }function resetLevel() {
  // Coloque aqui o código para reiniciar o nível
  // Por exemplo, redefina as posições do colega e do personagem para as posições iniciais
  colega.position.x = width / 20;
  colega.position.y = height / 20;
  personaje.position.x = width / 20;
  personaje.position.y = height / 20;
    gsap.to(colegaProgress, { value: parseInt(colegaProgress.getAttribute('value')) - 100, duration: 0.5 });
gsap.to(barraProgresso, { value: parseInt(barraProgresso.getAttribute('value')) - 100, duration: 0.5 });
  // Outras inicializações necessárias para reiniciar o nível
}

// Dentro do código onde ocorre a mudança de nível do colega
// Por exemplo, após a coleta de pontos suficientes

  
}function keyPressed() {
  if (keyCode === UP_ARROW && !isJumping) {
    personaje.jumpCount = 0;
    personaje.jumpVelocity = jumpForce;
    isJumping = true;
        moviendoIzquierda = true;
    

  }
  if (keyCode === UP_ARROW && isJumping) {
    personaje.jumpVelocity = jumpForce;
     moviendoIzquierda = false;
  }
  
}
function updateVolume() {
  osc.amp(volumeSlider.value(), 0.01);
}

function togglePlay() {
  isPlaying = !isPlaying;
  if (isPlaying) {
    playButton.html('Pause');
    playNote();
    volumeSlider.removeAttribute('disabled');
  } else {
    playButton.html('Play');
    osc.amp(0, 0.01);
    volumeSlider.attribute('disabled', '');
  }
}

function playNote() {
  if (isPlaying && currentNote < melody.length) {
    osc.freq(melody[currentNote].note);
    osc.amp(volumeSlider.value(), 0.01);
    setTimeout(stopNote, melody[currentNote].duration);
  } else {
    currentNote = 0; // Reinicia la melodía al finalizar
    playNote(); // Reproduce la melodía nuevamente
  }
}

function stopNote() {
  osc.amp(0, 0.01);
  currentNote++;
  if (isPlaying) {
    setTimeout(playNote, 100); // Pausa entre notas
  }
}

function drawRiver() {
  // Limitar la altura máxima del río al tamaño del lienzo
  riverHeight = constrain(riverHeight, 0, height / 7);
  
  // Dibujar el río como un rectángulo en la parte inferior de la pantalla
  noStroke();
   fill(30, 144, 255, 150);  // Color del río
  rect(0, height - riverHeight, width, riverHeight);
}
function displayDialogue() {
  let message = dialogue[currentIndex];

  dialogueText.html('<strong>' + message.speaker + ':</strong> ');
  dialogueText.style('color', message.speaker === 'Ash' ? message.ashColor : message.brockColor);

  // Scroll até o final do diálogo
  dialogueContainer.elt.scrollTop = dialogueContainer.elt.scrollHeight;

  // Trocar a imagem do orador conforme a mensagem atual
  speakerImage = loadImage(message.image);

  // Escrever a mensagem automaticamente
  typeWriter(message.message);
}

function typeWriter(message) {
  let index = 0;
  setTimeout(() => {
    let typingInterval = setInterval(() => {
      dialogueText.html('<strong>' + dialogue[currentIndex].speaker + ':</strong> ' + message.substr(0, index));
      index++;

      if (index > message.length) {
        clearInterval(typingInterval);
      }
    }, typingSpeed);
  }, typingDelay);
}

function nextMessage() {
  if (currentIndex < dialogue.length - 1) {
    currentIndex++;
    displayDialogue();
  }
  if (currentIndex === dialogue.length - 1) {
    conversaTerminou = true;
  }
}

function keyPressed() {
  if (key === 'q' && qKeyEnabled) { // Verificar a tecla Q
    nextMessage();
    disableQKey();
  }
}

function disableQKey() {
  qKeyEnabled = false;
  setTimeout(() => {
    qKeyEnabled = true;
  }, 5000); // Inabilita a tecla Q por 5 segundos
}

function toggleChat() {
  chatVisible = !chatVisible;
  displayDialogue();
}

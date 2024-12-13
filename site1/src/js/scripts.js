// Seleção dos elementos
const dynamicImg = document.getElementById("dynamic-img"); // Imagem dinâmica (meio)
const prevButton = document.getElementById("prev-arrow");
const nextButton = document.getElementById("next-arrow");

// Lista de imagens para a troca dinâmica
const images = [
  "./src/img/header/ContainerVermelho.png",
  "./src/img/header/Container Laranja.png",
  "./src/img/header/Container Amarelo.png",
];

let currentIndex = 0; // Índice da imagem dinâmica atual

// Atualiza a imagem dinâmica (meio)
function updateDynamicImage() {
  dynamicImg.src = images[currentIndex];
}

// Avança para a próxima imagem dinâmica
function showNext() {
  animateImage("next", () => {
    currentIndex = (currentIndex + 1) % images.length; // Volta ao início ao alcançar o final
    updateDynamicImage();
  });
}

// Retorna para a imagem dinâmica anterior
function showPrev() {
  animateImage("prev", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length; // Volta ao final se passar do início
    updateDynamicImage();
  });
}

// Adiciona eventos aos botões de navegação
nextButton.addEventListener("click", showNext);
prevButton.addEventListener("click", showPrev);

// Alteração automática da imagem dinâmica a cada 3 segundos
setInterval(showNext, 10000);

// Adiciona animação à imagem
function animateImage(direction, callback) {
  // Configura a animação de transição de deslizamento e opacidade
  dynamicImg.style.transition =
    "transform 0.5s ease-in-out, opacity 0.5s ease-in-out";
  dynamicImg.style.opacity = "0"; // A imagem atual desaparece aos poucos

  // Define a direção da animação de acordo com o botão pressionado
  if (direction === "next") {
    dynamicImg.style.transform = "translateX(100%)"; // Move a imagem atual para fora para a direita
  } else if (direction === "prev") {
    dynamicImg.style.transform = "translateX(-100%)"; // Move a imagem atual para fora para a esquerda
  }

  // Adiciona um listener para quando a animação da imagem atual terminar
  dynamicImg.addEventListener("transitionend", function handler() {
    dynamicImg.removeEventListener("transitionend", handler); // Remove o ouvinte para evitar múltiplas execuções
    dynamicImg.style.transition = "none"; // Desativa a transição para a nova imagem
    dynamicImg.style.transform = "translateX(0)"; // Resetar a posição
    dynamicImg.style.opacity = "1"; // Volta a imagem atual para visível
    callback(); // Atualiza a imagem após a animação

    // Agora, aplica a animação de opacidade para a nova imagem
    dynamicImg.style.transition = "opacity 0.5s ease-in-out"; // Anima a opacidade da nova imagem
    dynamicImg.style.opacity = "0"; // A nova imagem começa com opacidade 0

    // Espera que a nova imagem esteja carregada e visível
    setTimeout(() => {
      dynamicImg.style.opacity = "1"; // Aumenta a opacidade da nova imagem aos poucos
    }, 1); // Um pequeno delay para garantir que a nova imagem foi adicionada
  });
}

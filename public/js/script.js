// Seleciona todos os botões
const buttons = document.querySelectorAll('button');

// Seleciona todas as divs cujo ID começa com "div"
const divs = document.querySelectorAll('div[id^="div"]');

// Adiciona evento de clique a cada botão
buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Oculta todas as divs
    divs.forEach(div => div.classList.add('hidden'));

    // Mostra a div correspondente ao botão clicado
    const divId = button.id.replace('btn', 'div'); // Substitui "btn" por "div" no ID
    const targetDiv = document.getElementById(divId);
    if (targetDiv) {
      targetDiv.classList.remove('hidden');
    }
  });
});
/*
const main = document.querySelector("main");
const registerButton = document.querySelector(".Sub");

if(main && registerButton){registerButton.addEventListener('click',()=>{
    main.classList.add("bgRose");
})}*/


const currentRoute = window.location.pathname;


const main = document.querySelector("main");
const layout = document.querySelector(".layout");

if (currentRoute === "/registro") {
    main.classList.add("transparent"); 
    layout.classList.add("bgRose")
}

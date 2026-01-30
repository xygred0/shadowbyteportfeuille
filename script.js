const menubtn = document.querySelector('.menu')
menu = document.querySelector('header ul')
up = document.querySelector('.up')

menubtn.onclick = function() {
  if (!menu.classList.contains('open')) {
    menu.classList.add('open')
    menubtn.style.transform = 'rotate(180deg)'
    menubtn.classList.remove('uil-bars')
    menubtn.classList.add('uil-times')
  } else {
    menu.classList.remove('open')
    menubtn.style.transform = 'rotate(0deg)'
    menubtn.classList.add('uil-bars')
    menubtn.classList.remove('uil-times')
  }
}

window.addEventListener('scroll', () => {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    up.style.display = "block"
  } else {
    up.style.display = "none"
  }
  if (menu.classList.contains('open')) {
    menu.classList.remove('open')
    menubtn.style.transform = 'rotate(0deg)'
    menubtn.classList.add('uil-bars')
    menubtn.classList.remove('uil-times')
  }
})

up.addEventListener('click', () => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
})

const nav1 = document.getElementById('nav1')
nav2 = document.getElementById('nav2')
nav3 = document.getElementById('nav3')
nav4 = document.getElementById('nav4')



nav1.onclick = function() {
  menu.classList.remove('open')
  menubtn.style.transform = 'rotate(0deg)'
  menubtn.classList.add('uil-bars')
  menubtn.classList.remove('uil-times')
}
nav2.onclick = function() {
  menu.classList.remove('open')
  menubtn.style.transform = 'rotate(0deg)'
  menubtn.classList.add('uil-bars')
  menubtn.classList.remove('uil-times')
}
nav3.onclick = function() {
  menu.classList.remove('open')
  menubtn.style.transform = 'rotate(0deg)'
  menubtn.classList.add('uil-bars')
  menubtn.classList.remove('uil-times')
}
nav4.onclick = function() {
  menu.classList.remove('open')
  menubtn.style.transform = 'rotate(0deg)'
  menubtn.classList.add('uil-bars')
  menubtn.classList.remove('uil-times')
}


const htmlbar = document.getElementById('bar1')
cssbar = document.getElementById('bar2')
jsbar = document.getElementById('bar3')

window.addEventListener('scroll', () => {
  if (document.body.scrollTop > 1200 || document.documentElement.scrollTop > 1200) {
    htmlbar.classList.add('activehtml')
    cssbar.classList.add('activecss')
    jsbar.classList.add('activejs')
  }
})

const sw = document.querySelector('.switch')
swcircle = document.querySelector('.switchcircle')

sw.addEventListener('click', () => {
  if (!swcircle.classList.contains('on')) {
    swcircle.classList.add('on')
    swcircle.innerHTML = `<ion-icon name="sunny-outline"></ion-icon>`
    document.body.classList.add('dark')
    menu.classList.remove('open')
    menubtn.style.transform = 'rotate(0deg)'
    menubtn.classList.add('uil-bars')
    menubtn.classList.remove('uil-times')
    sw.style.backgroundColor = '#1F2021'
  } else {
    swcircle.classList.remove('on')
    swcircle.innerHTML = `<ion-icon name="moon-outline"></ion-icon>`
    document.body.classList.remove('dark')
    menu.classList.remove('open')
    menubtn.style.transform = 'rotate(0deg)'
    menubtn.classList.add('uil-bars')
    menubtn.classList.remove('uil-times')
    sw.style.backgroundColor = '#fff'
  }
})

// Met à jour l'année automatiquement dans le footer
document.getElementById('currentYear').textContent = new Date().getFullYear();







    // 1. Variables de la Fenêtre de Chat
    const chatTrigger = document.getElementById('chat-trigger');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    // Ouvrir/Fermer le chat
    chatTrigger.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
        document.querySelector('.notification-badge').style.display = 'none';
    });

    closeChat.addEventListener('click', () => chatWindow.classList.add('hidden'));

    // --- FONCTION D'ENVOI DOUBLE (WhatsApp + Email) ---
    async function sendMessage() {
        const text = userInput.value;
        const monNumero = "237687407063"; // Ton numéro avec indicatif Cameroun
        const formspreeID = "maqjbjyn"; // REMPLACE CECI PAR TON ID FORMSPREE

        if (text.trim() !== "") {
            // A. Afficher le message dans la bulle de chat (côté utilisateur)
            const msg = document.createElement('p');
            msg.style.textAlign = "right";
            msg.style.color = "var(--accent)";
            msg.innerHTML = `<strong>Moi:</strong> ${text}`;
            chatMessages.appendChild(msg);

            // B. Envoi discret par EMAIL (via Formspree)
            fetch(`https://formspree.io/f/${formspreeID}`, {
                method: 'POST',
                body: JSON.stringify({
                    email: "faissateraneabdel@gmail.com",
                    message: text
                }),
                headers: { 'Accept': 'application/json' }
            });

            // C. Réponse automatique du Bot
            setTimeout(() => {
                const reply = document.createElement('p');
                reply.innerHTML = `<strong>Système:</strong> Message enregistré par Email. Cliquez sur le bouton pour me joindre sur WhatsApp !`;
                chatMessages.appendChild(reply);

                // D. Bouton WhatsApp Spécial
                const waLink = document.createElement('a');
                waLink.href = `https://wa.me/${monNumero}?text=${encodeURIComponent("Message du site : " + text)}`;
                waLink.target = "_blank";
                waLink.innerHTML = `<button style="background:#25d366; color:white; border:none; padding:8px; border-radius:5px; cursor:pointer; margin-top:5px;">Ouvrir WhatsApp</button>`;
                chatMessages.appendChild(waLink);

                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 800);

            userInput.value = "";
        }
    }

    // Écouteurs d'événements
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

const testUsers = {
    user1: {
        name: "Mia",
        message: "Jeg carry'er dig i League of Legends!",
        time: "23:45",
        picture: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    user2: {
        name: "Lucas",
        message: "Dropper vi i Tilted Towers eller hvad?",
        time: "22:30",
        picture: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    user3: {
        name: "Sofia",
        message: "Jeg har et killer-build i Sims 4!",
        time: "21:15",
        picture: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    user4: {
        name: "Oliver",
        message: "Er du klar på CS:GO i aften?",
        time: "20:00",
        picture: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    user5: {
        name: "Emma",
        message: "Jeg har lige slået din high score!",
        time: "18:45",
        picture: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    user6: {
        name: "Lasse",
        message: "Skal vi tage en duo i Fortnite?",
        time: "17:20",
        picture: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    user7: {
        name: "Freja",
        message: "Vi mangler én til Valorant. Kommer du?",
        time: "16:05",
        picture: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    user8: {
        name: "Noah",
        message: "Din Apex-gameplay var vildt! Lad os spille sammen.",
        time: "14:50",
        picture: "https://randomuser.me/api/portraits/men/8.jpg",
    },
    user9: {
        name: "Clara",
        message: "Jeg bygger en mega-base i Minecraft!",
        time: "13:35",
        picture: "https://randomuser.me/api/portraits/men/9.jpg",
    },
    user10: {
        name: "Victor",
        message: "Har du prøvet det nye map i Warzone?",
        time: "12:20",
        picture: "https://randomuser.me/api/portraits/men/10.jpg",
    },
    user11: {
        name: "Amalie",
        message: "Husk at gemme dit progress i Stardew Valley!",
        time: "10:15",
        picture: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    user12: {
        name: "Jonas",
        message: "Jeg slog netop din rekord i Mario Kart!",
        time: "08:00",
        picture: "https://randomuser.me/api/portraits/men/12.jpg",
    },
};


function onLoad(){
    for (const key in testUsers){
        loadSender(key)
    }
    window.parent.parent.asyncLoadComplete('messageListPage')
}



function loadSender(obj){
    let object = testUsers[obj]
    let el = document.getElementById("senders")
    el.innerHTML = el.innerHTML+ `    <div id="${obj}" class="sender">
        <img src="${object.picture}" alt="">
        <div class="textBox">
            <p class="senderName">${object.name}</p>
            <p class="senderText">${object.message}</p>
        </div>
        <div class="senderTime">${object.time}</div>
    </div>`
}
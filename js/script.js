/* =====================================================
   ELEMENTS
===================================================== */

const enterButton =
    document.getElementById("enterButton");

const loveSong =
    document.getElementById("loveSong");

const musicButton =
    document.getElementById("musicButton");


/* =====================================================
   MUSIC
===================================================== */

let musicPlaying = false;


/*
    The song starts when she enters the universe.
    This avoids browser autoplay restrictions.
*/

enterButton.addEventListener("click", async () => {

    try {

        loveSong.volume = 0.45;

        await loveSong.play();

        musicPlaying = true;

        updateMusicButton();

    } catch (error) {

        console.log(
            "The song could not start:",
            error
        );

    }


    document
        .querySelector(".sikkim-section")
        .scrollIntoView({
            behavior: "smooth"
        });

});


/*
    Music button lets her pause/play the song.
*/

musicButton.addEventListener("click", async () => {

    if (loveSong.paused) {

        try {

            await loveSong.play();

            musicPlaying = true;

        } catch (error) {

            console.log(error);

        }

    } else {

        loveSong.pause();

        musicPlaying = false;

    }

    updateMusicButton();

});


function updateMusicButton() {

    const icon =
        musicButton.querySelector(".music-icon");

    const text =
        musicButton.querySelector(".music-text");

    if (musicPlaying) {

        icon.innerHTML = "♫";

        text.innerHTML = "playing";

    } else {

        icon.innerHTML = "Ⅱ";

        text.innerHTML = "paused";

    }

}


/* =====================================================
   STARS
===================================================== */

const starsContainer =
    document.getElementById("stars");


function createStars() {

    const numberOfStars =
        window.innerWidth < 600 ? 45 : 90;


    for (let i = 0; i < numberOfStars; i++) {

        const star =
            document.createElement("span");

        star.className = "star";

        star.innerHTML =
            Math.random() > .8 ? "✦" : "·";

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        star.style.fontSize =
            (Math.random() * 9 + 4) + "px";

        star.style.animationDelay =
            Math.random() * 5 + "s";

        starsContainer.appendChild(star);

    }

}

createStars();


/* =====================================================
   GAME 01
===================================================== */

const answers =
    document.querySelectorAll(".answer");

const gameOneResult =
    document.getElementById("gameOneResult");


answers.forEach(answer => {

    answer.addEventListener("click", () => {

        if (answer.classList.contains("correct")) {

            answer.style.borderColor =
                "#ed8198";

            answer.style.background =
                "rgba(237,129,152,.12)";

            gameOneResult.innerHTML =
                "Correct. ❤️<br>" +
                "I guess my heart knew before I did.";

        } else {

            answer.style.borderColor =
                "rgba(255,255,255,.1)";

            gameOneResult.innerHTML =
                "Nice try. 😌<br>" +
                "But you know your me better than that.";

        }

    });

});

/* =====================================================
   RURI MYSTERY GAME
===================================================== */

const ruriAnswers =
    document.querySelectorAll(".ruri-answer");

const ruriResult =
    document.getElementById("ruriResult");

const ruriReveal =
    document.getElementById("ruriReveal");


/*
    Hide the reveal button initially.
*/

ruriReveal.style.display = "none";


ruriAnswers.forEach(answer => {

    answer.addEventListener("click", () => {

        const correct =
            answer.dataset.correct === "true";


        if (correct) {

            answer.classList.add("ruri-correct");


            ruriResult.innerHTML = `
                Yes Love. ❤️
                <br>
                I know its not cool but its important to share...
            `;


            ruriReveal.style.display =
                "inline-flex";


            /*
                Disable the other answers
                after the correct answer.
            */

            ruriAnswers.forEach(button => {

                button.disabled = true;

            });


        } else {

            ruriResult.innerHTML = `
                Hmm... not quite. 😌
                
            `;

        }

    });

});


/*
    Reveal the Ruri story.
*/

ruriReveal.addEventListener("click", () => {

    const ruriSection =
        document.querySelector(".ruri-section");


    ruriSection.scrollIntoView({
        behavior: "smooth"
    });

});

/* =====================================================
   GAME 02 — NEXT CHAPTER
===================================================== */

const chapterChoices =
    document.querySelectorAll(".chapter-choice");

const choiceResult =
    document.getElementById("choiceResult");


chapterChoices.forEach(choice => {

    choice.addEventListener("click", () => {

        const isCorrect =
            choice.dataset.correct === "true";


        if (isCorrect) {

            choice.style.borderColor =
                "#ed8198";

            choice.style.background =
                "rgba(237,129,152,.12)";

            choiceResult.innerHTML =
                "Exactly. ✦<br>" +
                "We went to the Sky Walk.";

        } else {

            choiceResult.innerHTML =
                "Hmm... beautiful guess. 😌<br>" +
                "But our story had another stop.";

        }

    });

});


/* =====================================================
   GAME 03 — DO YOU LIKE THIS GUY?
===================================================== */

const yesButton =
    document.getElementById("yesButton");

const noButton =
    document.getElementById("noButton");

const husbandMessage =
    document.getElementById("husbandMessage");


/*
    The NO button escapes.

    It changes position whenever she tries
    to interact with it.
*/

function escapeNoButton() {

    const maxX =
        Math.max(
            100,
            window.innerWidth - noButton.offsetWidth - 30
        );

    const maxY =
        Math.max(
            100,
            window.innerHeight - noButton.offsetHeight - 30
        );


    const randomX =
        Math.random() * maxX;

    const randomY =
        Math.random() * maxY;


    noButton.style.position = "fixed";

    noButton.style.left =
        randomX + "px";

    noButton.style.top =
        randomY + "px";

    noButton.style.zIndex = "999";


    husbandMessage.innerHTML =
        "Hmm... that button seems to be broken. 😂";

}


/*
    Desktop
*/

noButton.addEventListener(
    "mouseenter",
    escapeNoButton
);


/*
    Mobile / tablet touch
*/

noButton.addEventListener(
    "touchstart",
    function (event) {

        event.preventDefault();

        escapeNoButton();

    },
    {
        passive: false
    }
);


/*
    If she somehow manages to click it anyway...
*/

noButton.addEventListener("click", () => {

    escapeNoButton();

});


/*
    YES button
*/

yesButton.addEventListener("click", () => {

    husbandMessage.innerHTML =
        "I knew it. ❤️<br>" +
        "You have excellent taste.";

    yesButton.innerHTML =
        "YES. OBVIOUSLY. ❤️";

    yesButton.style.transform =
        "scale(1.08)";

    createHeartBurst();

});


/* =====================================================
   HEART BURST
===================================================== */

function createHeartBurst() {

    const symbols = [
        "♥",
        "♡",
        "✦",
        "❤"
    ];


    for (let i = 0; i < 25; i++) {

        const heart =
            document.createElement("span");

        heart.innerHTML =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];

        heart.style.position =
            "fixed";

        heart.style.left =
            "50%";

        heart.style.top =
            "50%";

        heart.style.zIndex =
            "1000";

        heart.style.pointerEvents =
            "none";

        heart.style.color =
            "#ed8198";

        heart.style.fontSize =
            (Math.random() * 15 + 12) + "px";


        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            Math.random() * 250 + 100;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;


        heart.animate(
            [
                {
                    transform:
                        "translate(-50%, -50%) scale(0)",
                    opacity: 1
                },

                {
                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        )
                        scale(1.2)`,
                    opacity: 0
                }
            ],
            {
                duration:
                    1200 + Math.random() * 500,

                easing:
                    "cubic-bezier(.2,.8,.2,1)"
            }
        );


        document.body.appendChild(heart);


        setTimeout(() => {

            heart.remove();

        }, 1800);

    }

}


/* =====================================================
   FINAL GAME
===================================================== */

const wrongFinal =
    document.querySelectorAll(".wrong-final");

const foreverButton =
    document.getElementById("foreverButton");

const finalAnswer =
    document.getElementById("finalAnswer");


wrongFinal.forEach(button => {

    button.addEventListener("click", () => {

        finalAnswer.innerHTML =
            "You wish 😝... ❤️<br>" +
            "but that's not where our story ends.";

    });

});


foreverButton.addEventListener("click", () => {

    finalAnswer.innerHTML =
        "Exactly.<br>" +
        "We'll marry soon biwi. " +
        "❤️";


    createHeartBurst();

});


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".chapter-inner, " +
        ".memory-photo, " +
        ".memory-copy, " +
        ".game-card, " +
        ".lake-content, " +
        ".lake-photo, " +
        ".dream-center, " +
        ".choice-card, " +
        ".skywalk-content, " +
        ".husband-game-inner, " +
        ".distance-inner, " +
        ".found-content, " +
        ".final-game, " +
        ".letter-paper, " +
        ".final-content"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(35px)";

    element.style.transition =
        "opacity 1s ease, transform 1s ease";

    observer.observe(element);

});


/* =====================================================
   PREVENT NO BUTTON FROM GOING TOO FAR
   AFTER RESIZE
===================================================== */

window.addEventListener("resize", () => {

    if (noButton.style.position === "fixed") {

        noButton.style.left = "auto";

        noButton.style.top = "auto";

        noButton.style.position = "relative";

    }

});

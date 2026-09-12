// =========================================
// INTRO SCREEN
// =========================================

const introScreen = document.getElementById("introScreen");
const enterWebsite = document.getElementById("enterWebsite");

enterWebsite.addEventListener("click", () => {

    introScreen.classList.add("hidden");

    document.body.style.overflow = "auto";

});


// Prevent scrolling before entering

window.addEventListener("load", () => {

    document.body.style.overflow = "hidden";

});


// =========================================
// CUSTOM CURSOR GLOW
// =========================================

const cursorGlow = document.getElementById("cursorGlow");

document.addEventListener("mousemove", (event) => {

    cursorGlow.style.left =
        event.clientX + "px";

    cursorGlow.style.top =
        event.clientY + "px";

});


// =========================================
// SCROLL PROGRESS
// =========================================

const progressBar =
    document.getElementById("scrollProgress");

window.addEventListener("scroll", () => {

    const scrollTop =
        document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        (scrollTop / scrollHeight) * 100;

    progressBar.style.width =
        progress + "%";

});


// =========================================
// REVEAL ON SCROLL
// =========================================

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                }

            });

        },

        {
            threshold: 0.15
        }

    );

revealElements.forEach((element) => {

    revealObserver.observe(element);

});


// =========================================
// FLOATING STARS
// =========================================

const starsContainer =
    document.getElementById("stars");

function createStars() {

    const numberOfStars = 45;

    for (
        let i = 0;
        i < numberOfStars;
        i++
    ) {

        const star =
            document.createElement("div");

        star.classList.add("star");

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        star.style.animationDuration =
            5 + Math.random() * 8 + "s";

        star.style.animationDelay =
            Math.random() * 6 + "s";

        const size =
            1 + Math.random() * 2;

        star.style.width =
            size + "px";

        star.style.height =
            size + "px";

        starsContainer.appendChild(star);

    }

}

createStars();


// =========================================
// SUBTLE PARALLAX
// =========================================

const heroPhoto =
    document.querySelector(".hero-photo-container");

window.addEventListener("scroll", () => {

    const scrollY = window.scrollY;

    if (heroPhoto && window.innerWidth > 768) {

        heroPhoto.style.transform =
            `translateY(${scrollY * 0.06}px)`;

    }

});


// =========================================
// GALLERY 3D EFFECT
// =========================================

const galleryItems =
    document.querySelectorAll(".gallery-item");

galleryItems.forEach((item) => {

    item.addEventListener(
        "mousemove",
        (event) => {

            if (window.innerWidth < 768) return;

            const rect =
                item.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -3;

            const rotateY =
                ((x - centerX) / centerX) * 3;

            item.style.transform =
                `perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.01)`;

        }
    );


    item.addEventListener(
        "mouseleave",
        () => {

            item.style.transform =
                "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";

        }
    );

});


// =========================================
// MOBILE PHOTO TAP EFFECT
// =========================================

galleryItems.forEach((item) => {

    item.addEventListener(
        "click",
        () => {

            if (window.innerWidth <= 768) {

                galleryItems.forEach((photo) => {

                    if (photo !== item) {

                        photo.classList.remove(
                            "mobile-active"
                        );

                    }

                });

                item.classList.toggle(
                    "mobile-active"
                );

            }

        }
    );

});


// =========================================
// CONFETTI
// =========================================

const celebrateBtn =
    document.getElementById("celebrateBtn");

const birthdayMessage =
    document.getElementById("birthdayMessage");

const canvas =
    document.getElementById("confettiCanvas");

const ctx =
    canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


function createConfetti() {

    particles = [];

    for (let i = 0; i < 180; i++) {

        particles.push({

            x:
                Math.random() *
                canvas.width,

            y:
                -Math.random() *
                canvas.height,

            size:
                Math.random() * 6 + 3,

            speedY:
                Math.random() * 3 + 2,

            speedX:
                Math.random() * 2 - 1,

            rotation:
                Math.random() * 360,

            rotationSpeed:
                Math.random() * 6 - 3,

            opacity:
                Math.random() * 0.5 + 0.5,

            type:
                Math.random() > 0.5
                    ? "gold"
                    : "light"

        });

    }

}


function drawConfetti() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach((particle) => {

        ctx.save();

        ctx.translate(
            particle.x,
            particle.y
        );

        ctx.rotate(
            particle.rotation *
            Math.PI /
            180
        );


        if (
            particle.type === "gold"
        ) {

            ctx.fillStyle =
                `rgba(
                    229,
                    199,
                    149,
                    ${particle.opacity}
                )`;

        }

        else {

            ctx.fillStyle =
                `rgba(
                    255,
                    242,
                    216,
                    ${particle.opacity}
                )`;

        }


        ctx.fillRect(
            -particle.size / 2,
            -particle.size / 2,
            particle.size,
            particle.size * 0.6
        );

        ctx.restore();


        particle.y +=
            particle.speedY;

        particle.x +=
            particle.speedX;

        particle.rotation +=
            particle.rotationSpeed;

    });


    particles =
        particles.filter(
            particle =>
                particle.y <
                canvas.height + 30
        );


    if (particles.length > 0) {

        requestAnimationFrame(
            drawConfetti
        );

    }

    else {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

    }

}


celebrateBtn.addEventListener(
    "click",
    () => {

        birthdayMessage.classList.add(
            "show"
        );

        createConfetti();

        drawConfetti();

    }
);


// =========================================
// NAVBAR SMALL EFFECT
// =========================================

const navbar =
    document.querySelector(".navbar");

window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 80) {

            navbar.style.background =
                "rgba(10,10,10,.82)";

        }

        else {

            navbar.style.background =
                "rgba(15,15,15,.55)";

        }

    }
);
// Music Logic
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;

// Remove loading screen after delay
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loading-screen');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            document.getElementById('main-content').classList.remove('hidden');
            createHearts();

            // Attempt auto-play
            bgMusic.play().then(() => {
                isPlaying = true;
                document.getElementById('bts-popup').classList.remove('hidden');
            }).catch(e => {
                console.log('Autoplay prevented, waiting for interaction...', e);
                // Play on first interaction if autoplay is blocked
                const playOnInteract = () => {
                    if (!isPlaying) {
                        bgMusic.play().then(() => {
                            isPlaying = true;
                            document.getElementById('bts-popup').classList.remove('hidden');
                            document.removeEventListener('click', playOnInteract);
                            document.removeEventListener('touchstart', playOnInteract);
                        }).catch(err => console.log(err));
                    }
                };
                document.addEventListener('click', playOnInteract, { once: true });
                document.addEventListener('touchstart', playOnInteract, { once: true });
            });
        }, 1000);
    }, 2000);
});



// Navigation Function
function navigate(sectionId) {
    const currentActive = document.querySelector('.section.active');
    currentActive.classList.remove('active');
    setTimeout(() => {
        currentActive.classList.add('hidden');
        const nextSection = document.getElementById(sectionId);
        nextSection.classList.remove('hidden');
        
        setTimeout(() => {
            nextSection.classList.add('active');
            if(sectionId === 'message') {
                typeLetter();
            }
        }, 50);
    }, 500);
}

// Floating Hearts background
function createHearts() {
    const container = document.getElementById('hearts-container');
    const heartEmojis = ['💖', '🌸', '💕', '✨', '🦋'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 7000);
    }, 300);
}

// Custom Cursor Trail
document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.8) {
        let sparkle = document.createElement('div');
        sparkle.innerText = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.fontSize = '12px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        document.body.appendChild(sparkle);
        
        let opacity = 1;
        let y = e.clientY;
        let anim = setInterval(() => {
            if(opacity <= 0) {
                clearInterval(anim);
                sparkle.remove();
            }
            sparkle.style.opacity = opacity;
            sparkle.style.top = y + 'px';
            opacity -= 0.05;
            y -= 1;
        }, 50);
    }
});

// Gallery Carousel
let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');

function showSlide(index) {
    if (index >= slides.length) slideIndex = 0;
    if (index < 0) slideIndex = slides.length - 1;
    
    slides.forEach(slide => slide.classList.remove('active'));
    slides[slideIndex].classList.add('active');
}

function moveSlide(step) {
    slideIndex += step;
    showSlide(slideIndex);
}

// Initialize Gallery
if(slides.length > 0) showSlide(slideIndex);

// Typewriter Effect for Letter
const letterText = `My dearest sister,\n\nYou are not just my sister, you are my best friend, my happiness, and my biggest blessing. 🥺\n\nThank you for always being there, making life so beautiful, and being the cutest person I know. I am so undeniably lucky to have you in my life. 💕\n\nHappy 16th Birthday! Let's make this year magical. ✨`;
let charIndex = 0;
let isTyping = false;

function typeLetter() {
    if (isTyping) return;
    isTyping = true;
    const textBox = document.getElementById('typed-text');
    textBox.innerHTML = '';
    charIndex = 0;

    function typeChar() {
        if (charIndex < letterText.length) {
            let char = letterText.charAt(charIndex);
            if(char === '\n') {
                textBox.innerHTML += '<br>';
            } else {
                textBox.innerHTML += char;
            }
            charIndex++;
            setTimeout(typeChar, 40);
        }
    }
    typeChar();
}

// Interactive Game Logic
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
let noScale = 1;
let yesScale = 1;

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', moveNoButton);

function moveNoButton() {
    const parent = noBtn.parentElement;
    const parentRect = parent.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const maxX = parentRect.width - btnRect.width;
    const maxY = parentRect.height - btnRect.height;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY) - (parentRect.height/2) + btnRect.height; 

    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = (randomY + 150) + 'px'; 

    noScale -= 0.1;
    if (noScale < 0.3) noScale = 0.3;
    noBtn.style.transform = `scale(${noScale})`;
    
    yesScale += 0.1;
    yesBtn.style.transform = `scale(${yesScale})`;
}

function chooseYes() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });
    document.getElementById('game-result').classList.remove('hidden');
    noBtn.style.display = 'none';
}

// Surprise Cake Logic
function blowCandles() {
    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => flame.classList.add('off'));
    
    document.getElementById('final-message').classList.remove('hidden');
    document.getElementById('blow-btn').style.display = 'none';

    let duration = 3 * 1000;
    let end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#FFE5F0', '#F7A8CB', '#CBEBFA']
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#FFE5F0', '#F7A8CB', '#CBEBFA']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

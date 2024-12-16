document.addEventListener('DOMContentLoaded', () => {
    const celebrateButton = document.getElementById('celebrateButton');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const finalMessage = document.getElementById('finalMessage');
    celebrateButton.addEventListener('click', startCelebration);
    const card=document.getElementsByClassName('card');
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiColors = ['#ff6347', '#ff4500', '#ffd700', '#ff69b4', '#ff1493', '#00ff00', '#00ffff', '#ff00ff'];
    const confettiCount = 100;
    let confetti = [];
    let animationId;

    function startCelebration() {
        for (let i = 0; i < confettiCount; i++) {
            confetti.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 5 + 2,
                speedX: Math.random() * 3 - 1.5,
                speedY: Math.random() * 3 - 1.5,
                color: confettiColors[Math.floor(Math.random() * confettiColors.length)]
            });
        }
        animateConfetti();
        startFireworks();
        playMusic();
        setTimeout(stopCelebration, 60000); //
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach((piece, index) => {
            piece.x += piece.speedX;
            piece.y += piece.speedY;
            piece.speedY += 0.05;

            if (piece.y + piece.size > canvas.height) {
                piece.y = -piece.size;
                piece.x = Math.random() * canvas.width;
            }

            ctx.fillStyle = piece.color;
            ctx.beginPath();
            ctx.arc(piece.x, piece.y, piece.size, 0, Math.PI * 2);
            ctx.fill();
        });
        animationId = requestAnimationFrame(animateConfetti);
    }

    function startFireworks() {
        particlesJS('fireworks', {
            particles: {
                number: { value: 100, density: { enable: true, value_area: 800 } },
                color: { value: ['#ff6347', '#ff4500', '#ffd700', '#ff69b4', '#ff1493', '#00ff00', '#00ffff', '#ff00ff'] },
                shape: { type: 'circle', stroke: { width: 0, color: '#000000' }, polygon: { nb_sides: 5 }, image: { src: 'img/github.svg', width: 100, height: 100 } },
                opacity: { value: 0.7, random: false, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
                size: { value: 5, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
                line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
                move: { enable: true, speed: 8, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
                modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
            },
            retina_detect: true
        });
    }

    function playMusic() {
        backgroundMusic.play();
    }

    function stopCelebration() {
        cancelAnimationFrame(animationId);
        confetti = [];
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        finalMessage.classList.remove('hidden');
        finalMessage.classList.add('visible');
       
    }
});
//l'image change jusqu'au dernier et recommence depuis le 1er
const image=['gato.jpg','gato7.jpg','gato8.jpg'];
let imagActuIndex=0;
function changerImage(){
    imagActuIndex=(imagActuIndex + 1)% image.length;
    document.getElementById('finalImage').src=image[imagActuIndex]

}
setInterval(changerImage,2500);
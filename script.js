/* ============================================================
   CONFIG
   ============================================================ */
const NAME = "Lakshmi";

const CONFIG = {
  words: ["Exams", "Bad Days", "JEE Mains", "Maths", "Chemistry", "Physics", "Coaching", "Depression", "Backlogs", "Exam Stress", "Family", "Friends", "Sisters", "Brother"],
  floaters: ["✨", "📚", "✏️", "π", "E=mc²", "H₂O", "👨‍👩‍👧‍👦", "👭", "🏠", "❤️", "🧪", "∑", "💖", "🌸", "🎈", "⭐", "🦋", "🎀", "💕", "🌷", "🥳"],
  greet: [
    `Hey ${NAME}! ❤️`,
    "Today is not about being perfect. It's about celebrating how wonderfully you are becoming you.",
    "So forget everything for a little while, smile, and enjoy your special day. ✨"
  ],
  riddle: {
    q: "I am full of numbers, yet I'm not a phone. I have problems, yet no feelings. The more you solve me, the more I give you. What am I?",
    hint: "Hint: your favourite (or most feared) subject, with x and y! 😜",
    answer: "math",
    show: "Maths!"
  },
  slides: [
    { photo: "assets/images/photo1.jpeg", caption: "✨ Some moments become memories before we even realise how special they are." },
    { photo: "assets/images/photo6.jpeg", caption: "🌸 Life doesn't have to be figured out all at once. Take your time, enjoy the little things, and keep moving forward." },
    { photo: "assets/images/photo7.jpeg", caption: "💖 You don't need to have every answer today. Your path will slowly become clearer. Just keep believing in yourself." },
    { photo: "assets/images/photo4.jpeg", caption: "🌈 There will be good days, difficult days and completely random days. Keep your smile through all of them." },
    { photo: "assets/images/photo3.jpeg", caption: "🎂 Today, everything else can wait. Eat cake, laugh loudly, make memories and enjoy being celebrated." }
  ],
  wish: [
    `Happy Birthday, ${NAME} ❤️`,
    "May this year bring you beautiful surprises, genuine happiness, peaceful moments and countless reasons to smile.",
    "Keep believing in yourself. Keep dreaming big. And never forget how many people are cheering for you. ✨"
  ],
  thanks: `Okay... you said YES! 🤭❤️ Now there is absolutely no escape from the party. Today is for laughter, cake, crazy memories and happiness. Keep shining, keep smiling, and always remember that you are deeply loved. 🥳✨`,
  noMsgs: [
    "Nice try! 🥺",
    "That button seems suspicious... 👀",
    "Are you sure about that? 😂",
    "Try the other one! ❤️",
    "NO is temporarily unavailable. 😜",
    "Come onnnn! One YES! 🥹"
  ],
  startMusic: "assets/audio/start-music.mp3",
  partySound: "assets/audio/party-popper.mp3",
  candleSound: "assets/audio/candle-blow.mp3",
  slideshowMusic: "assets/audio/new-slide-music.mp3",
  birthdayMusic: "assets/audio/happy-birthday.mp3",
  slideSeconds: 10,
  email: {
    enabled: true,
    serviceID: "service_w6gm823",
    templateID: "template_wsyu1ri",
    publicKey: "2xHicCEGtl6ARevcn",
    notificationEmail: "anujkumr08112022@gmail.com"
  }
};

/* ============================================================
   HELPERS
   ============================================================ */
const $ = id => document.getElementById(id);
const rand = (a, b) => a + Math.random() * (b - a);

function playAudio(audio, label) {
  audio.play().catch(error => console.log(`${label} could not play:`, error));
}

/* ============================================================
   PRELOAD PHOTOS (so the slideshow never waits)
   ============================================================ */
const photoCache = {};
CONFIG.slides.forEach(s => {
  const img = new Image();
  img.decoding = "async";
  img.src = s.photo;
  photoCache[s.photo] = img;
});

/* ============================================================
   AUDIO
   ============================================================ */
const startSound = new Audio(CONFIG.startMusic);
const partySound = new Audio(CONFIG.partySound);
const candleSound = new Audio(CONFIG.candleSound);
const slideSong = $("slideSong");
const bday = $("bday");

slideSong.src = CONFIG.slideshowMusic;
bday.src = CONFIG.birthdayMusic;

startSound.loop = true;
startSound.volume = 0.45;
partySound.volume = 0.75;
candleSound.volume = 0.7;
slideSong.volume = 0.4;
bday.volume = 0.5;

/* Start music is deliberately never stopped by screen changes. */
function stopSecondaryMusic() {
  slideSong.pause();
  bday.pause();
  slideSong.currentTime = 0;
  bday.currentTime = 0;
}

/* ============================================================
   SCREEN NAVIGATION
   ============================================================ */
let currentScreen = "s-balloon";

function go(id) {
  const current = $(currentScreen);
  if (current) current.style.opacity = 0;

  setTimeout(() => {
    if (current) {
      current.classList.remove("on");
      current.style.opacity = "";
    }
    const next = $(id);
    if (next) {
      next.classList.add("on");
      currentScreen = id;
    }
  }, 400);
}

/* ============================================================
   INITIAL TEXT
   ============================================================ */
function setLines(ids, values) {
  ids.forEach((id, i) => {
    const el = $(id);
    if (el) el.textContent = values[i];
  });
}

setLines(["g1", "g2", "g3"], CONFIG.greet);
setLines(["w1", "w2", "w3"], CONFIG.wish);
$("thx").textContent = CONFIG.thanks;
$("rq").textContent = CONFIG.riddle.q;
document.title = `Happy Birthday, ${NAME}!`;

/* ============================================================
   FLOATING ELEMENTS
   ============================================================ */
setInterval(() => {
  const f = document.createElement("div");
  f.className = "fl";
  f.textContent = CONFIG.floaters[Math.floor(rand(0, CONFIG.floaters.length))];
  f.style.left = `${rand(0, 95)}vw`;
  f.style.fontSize = `${rand(1.2, 2.4)}rem`;
  f.style.animationDuration = `${rand(7, 11)}s`;
  $("floaters").appendChild(f);
  setTimeout(() => f.remove(), 11500);
}, 700);

/* ============================================================
   BACKGROUND DOODLES + SKY BALLOONS
   ============================================================ */
document.body.prepend(
  Object.assign(document.createElement("div"), { id: "doodles" }),
  Object.assign(document.createElement("div"), { id: "sky" })
);

const DOODLES = ["✨", "🌸", "🎀", "🦋", "💖", "🌷", "⭐", "🎈", "💕", "🥳"];

for (let i = 0; i < 24; i++) {
  const d = document.createElement("span");
  d.className = "dd";
  d.textContent = DOODLES[i % DOODLES.length];
  d.style.cssText = `left:${rand(0, 94)}vw;top:${rand(0, 88)}vh;font-size:${rand(1.6, 3.2)}rem;--t:${rand(4, 8)}s;animation-delay:${-rand(0, 6)}s`;
  $("doodles").appendChild(d);
}

const BC = ["#ff6fae", "#7bdff2", "#ffd166", "#b8f2c9", "#c9a7ff", "#ff8a65", "#8fb8ff", "#ff9bb3"];

function spawnSky(w = rand(40, 80), d = rand(9, 16), dl = 0) {
  const b = document.createElement("div");
  b.className = "sb";
  b.style.cssText = `--w:${w}px;--c:${BC[Math.floor(rand(0, BC.length))]};--d:${d}s;--dl:${dl}s;--st:${rand(2.5, 4.5)}s;--sw:${rand(14, 40)}px;left:${rand(2, 92)}vw`;
  b.addEventListener("animationend", e => {
    if (e.animationName === "rise") b.remove();
  });
  $("sky").appendChild(b);
}

for (let i = 0; i < 8; i++) spawnSky(rand(40, 80), rand(10, 16), -rand(0, 10));

setInterval(() => {
  if (!document.hidden && $("sky").children.length < 16) spawnSky();
}, 900);

function flood(n = 40) {
  for (let i = 0; i < n; i++) spawnSky(rand(50, 100), rand(5, 9), i * 0.08);
}

/* ============================================================
   CONFETTI
   ============================================================ */
const cv = $("confetti");
const cx = cv.getContext("2d");
let bits = [];
let confettiRunning = false;

function fit() {
  cv.width = window.innerWidth;
  cv.height = window.innerHeight;
}
fit();
window.addEventListener("resize", fit);

function confetti(n = 120) {
  const palette = ["#2f7bf2", "#ffd166", "#7bdff2", "#b8f2c9", "#c9a7ff", "#ff8a65"];
  for (let i = 0; i < n; i++) {
    bits.push({
      x: cv.width / 2, y: cv.height * 0.4,
      vx: rand(-7, 7), vy: rand(-18, -4),
      s: rand(5, 11), r: rand(0, 6),
      c: palette[i % 6], l: 1
    });
  }

  if (confettiRunning) return;
  confettiRunning = true;

  (function tick() {
    cx.clearRect(0, 0, cv.width, cv.height);
    bits = bits.filter(b => b.l > 0);

    bits.forEach(b => {
      b.vy += 0.35;
      b.x += b.vx;
      b.y += b.vy;
      b.r += 0.2;
      b.l -= 0.008;

      cx.save();
      cx.translate(b.x, b.y);
      cx.rotate(b.r);
      cx.globalAlpha = Math.max(b.l, 0);
      cx.fillStyle = b.c;
      cx.fillRect(-b.s / 2, -b.s / 4, b.s, b.s / 2);
      cx.restore();
    });

    if (bits.length) requestAnimationFrame(tick);
    else confettiRunning = false;
  })();
}

/* ============================================================
   SCREEN 1 — BALLOONS
   ============================================================ */
const POS = [
  [38, 0], [12, 10], [64, 10], [0, 32],
  [26, 30], [50, 30], [74, 32], [10, 54],
  [37, 52], [62, 54], [24, 74], [50, 74]
];
const COLORS = ["#ff6fae", "#2f7bf2", "#ffb703", "#38b27a", "#9b6bff", "#ff8a65", "#4fb3e8", "#ef5b8a"];

function build() {
  const words = [...CONFIG.words].sort(() => Math.random() - 0.5);
  $("bouquet").innerHTML = "";
  $("bouquet").className = "";

  POS.forEach(([x, y], i) => {
    const b = document.createElement("div");
    b.className = "bq";
    b.textContent = words[i % words.length];
    b.style.cssText = `left:${x}%;top:${y}%;background:${COLORS[i % 8]};color:#fff;border-bottom-color:${COLORS[i % 8]};animation-delay:${-i * 0.3}s;--dl:${i * 0.07}s;--dx:${(x - 40) * 3}px`;
    $("bouquet").appendChild(b);
  });
}

build();
let released = false;

function release() {
  if (released) return;
  released = true;

  startSound.currentTime = 0;
  playAudio(startSound, "Start music");
  partySound.currentTime = 0;
  playAudio(partySound, "Party popper");

  $("bouquet").classList.add("rel");
  $("letgo").hidden = true;

  confetti(130);
  flood(50);

  setTimeout(() => {
    $("greet").hidden = false;
    $("to-riddle").hidden = false;
  }, 1300);

  setTimeout(() => $("bouquet").classList.add("gone"), 3400);
}

$("letgo").onclick = release;
$("bouquet").onclick = release;

$("to-riddle").onclick = () => {
  go("s-riddle");
  setTimeout(() => $("rin").focus(), 700);
};

/* ============================================================
   SCREEN 2 — RIDDLE
   ============================================================ */
let tries = 0;
let solved = false;

function say(message, bad = false) {
  const m = $("rmsg");
  m.textContent = message;
  m.className = "";
  void m.offsetWidth;
  if (bad) m.className = "bad";
}

function unlock() {
  solved = true;
  confetti(120);
  setTimeout(() => go("s-gift"), 1000);
}

function check() {
  if (solved) return;

  const answer = $("rin").value.trim().toLowerCase().replace(/[^a-z]/g, "");

  if (!answer) {
    say("Type something first 😄", true);
    $("rin").focus();
    return;
  }

  if (answer.includes(CONFIG.riddle.answer)) {
    say("Correct! You really got it! 🥳");
    unlock();
    return;
  }

  tries++;

  if (tries >= 3) {
    say(`It was ${CONFIG.riddle.show}! 😄 But don't worry, the surprise is still yours!`);
    unlock();
    return;
  }

  say(
    tries === 1
      ? "Not quite... take another little guess 🤔"
      : "You're close! Think of something that makes people feel good. ❤️",
    true
  );
}

$("rcheck").onclick = check;
$("rhint").onclick = () => say(CONFIG.riddle.hint);

$("rin").addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    check();
  }
});

/* ============================================================
   SCREEN 3 — GIFT
   ============================================================ */
let opened = false;

function openGift() {
  if (opened) return;
  opened = true;

  $("gift").classList.add("open");
  confetti(110);

  setTimeout(() => {
    go("s-slides");
    startSlides();
  }, 900);
}

$("gift").onclick = openGift;
$("gift").addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    openGift();
  }
});
$("opengift").onclick = openGift;

/* ============================================================
   SCREEN 4 — SLIDESHOW (photo + caption change together)
   ============================================================ */
let si = 0;
let slideTimer = null;
let slidePlaying = false;
let showToken = 0;

function show(index) {
  si = index;
  const token = ++showToken;
  const slide = CONFIG.slides[index];
  const pre = photoCache[slide.photo];
  const last = CONFIG.slides.length - 1;

  $("count").textContent = `${index + 1} / ${CONFIG.slides.length}`;
  $("prev").disabled = index === 0;
  $("next").disabled = index === last;
  $("to-candle").hidden = index !== last;

  clearTimeout(slideTimer);

  const apply = () => {
    if (token !== showToken) return; // user already moved on
    $("slide").classList.remove("loading");
    $("photo").classList.remove("ready");
    $("photo").src = slide.photo;
    void $("photo").offsetWidth;
    $("photo").classList.add("ready");
    $("cap").textContent = slide.caption;

    // timer starts only once the photo is actually visible
    if (index < last) {
      slideTimer = setTimeout(() => show(si + 1), CONFIG.slideSeconds * 1000);
    }
  };

  if (pre.complete && pre.naturalWidth) {
    apply();
  } else {
    $("slide").classList.add("loading");
    pre.addEventListener("load", apply, { once: true });
    pre.addEventListener("error", apply, { once: true });
  }
}

function startSlides() {
  show(0);
  slideSong.currentTime = 0;
  slideSong.play()
    .then(() => setMusic(true))
    .catch(error => {
      console.log("Slideshow music blocked:", error);
      setMusic(false);
    });
}

function setMusic(on) {
  slidePlaying = on;
  $("mute").textContent = on ? "🔊 Music On" : "🔇 Tap to play music";
}

$("mute").onclick = () => {
  if (slidePlaying) {
    slideSong.pause();
    setMusic(false);
  } else {
    slideSong.play()
      .then(() => setMusic(true))
      .catch(error => console.log("Music could not play:", error));
  }
};

$("prev").onclick = () => { if (si > 0) show(si - 1); };
$("next").onclick = () => { if (si < CONFIG.slides.length - 1) show(si + 1); };

$("to-candle").onclick = () => {
  clearTimeout(slideTimer);
  slideSong.pause();
  slideSong.currentTime = 0;
  setMusic(false);
  go("s-candle");
};

/* ============================================================
   SCREEN 5 — CANDLE
   ============================================================ */
let blown = false;

function blow() {
  if (blown) return;
  blown = true;

  candleSound.currentTime = 0;
  playAudio(candleSound, "Candle sound");

  $("flame").classList.add("out");
  $("cake").classList.add("blown");

  flood(20);
  $("wishprompt").hidden = true;
  $("blow").hidden = true;

  confetti(160);

  slideSong.pause();
  slideSong.currentTime = 0;

  bday.currentTime = 0;
  playAudio(bday, "Birthday music");

  setTimeout(() => {
    $("wishmsg").hidden = false;
    $("to-party").hidden = false;
  }, 800);
}

$("blow").onclick = blow;
$("cake").onclick = blow;

$("to-party").onclick = () => {
  bday.pause();
  bday.currentTime = 0;
  go("s-party");
};

/* ============================================================
   SCREEN 6 — PARTY / NO BUTTON
   ============================================================ */
const no = $("no");
let popupTimer = null;

function dodge() {
  no.style.position = "fixed";
  no.style.zIndex = 65;

  const maxX = Math.max(20, innerWidth - no.offsetWidth - 20);
  const maxY = Math.max(20, innerHeight - no.offsetHeight - 20);

  no.style.left = `${rand(20, maxX)}px`;
  no.style.top = `${rand(20, maxY)}px`;

  const popup = $("nopop");
  popup.textContent = CONFIG.noMsgs[Math.floor(rand(0, CONFIG.noMsgs.length))];
  popup.hidden = false;
  clearTimeout(popupTimer);
  popupTimer = setTimeout(() => { popup.hidden = true; }, 1400);
}

no.onmouseenter = dodge;
no.onclick = e => { e.preventDefault(); dodge(); };
no.ontouchstart = e => { e.preventDefault(); dodge(); };

/* ============================================================
   YES BUTTON — SHOW MESSAGE FORM
   ============================================================ */
let emailSending = false;

$("yes").onclick = () => {
  partySound.currentTime = 0;
  playAudio(partySound, "Party sound");

  confetti(250);

  $("party-buttons").hidden = true;
  $("party-details").hidden = false;

  setTimeout(() => $("party-message").focus(), 100);
};

/* ============================================================
   EMAILJS — SEND HER MESSAGE TO YOU
   ============================================================ */
async function loadEmailJS() {
  if (typeof emailjs !== "undefined") return;

  await new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.onload = resolve;
    script.onerror = () => reject(new Error("Could not load EmailJS."));
    document.head.appendChild(script);
  });
}

async function sendEmail() {
  const email = CONFIG.email;
  const guestMessage = $("party-message").value.trim();
  const status = $("email-status");
  const button = $("send-rsvp");

  if (!guestMessage) {
    status.textContent = "Write a little message first 🥹❤️";
    $("party-message").focus();
    return false;
  }

  if (!email.enabled) {
    status.textContent = "Email sending is disabled.";
    return false;
  }

  if (emailSending) return false;

  emailSending = true;
  button.disabled = true;
  button.textContent = "SENDING YOUR MESSAGE... 💌";
  status.textContent = "Sending your lovely message... ✨";

  try {
    await loadEmailJS();
    emailjs.init({ publicKey: email.publicKey });

    const now = new Date().toLocaleString();

    await emailjs.send(email.serviceID, email.templateID, {
      to_email: email.notificationEmail,
      birthday_name: NAME,
      subject: `💌 A Birthday Message from ${NAME}`,
      message:
        `Hey! ❤️\n\n` +
        `${NAME} said YES to the birthday party! 🥳\n\n` +
        `Here is her message for you:\n\n` +
        `${guestMessage}\n\n` +
        `Sent on: ${now}`,
      response: "YES",
      guest_message: guestMessage,
      date_time: now
    });

    status.textContent = "Message sent successfully! Thank you ❤️🥹";
    confetti(160);
    setTimeout(() => go("s-thanks"), 1800);
    return true;

  } catch (error) {
    console.error("EmailJS error:", error);
    status.textContent = "Couldn't send your message. Please try again 💌";
    button.textContent = "TRY AGAIN 💌";
    return false;

  } finally {
    emailSending = false;
    button.disabled = false;
    if (button.textContent === "SENDING YOUR MESSAGE... 💌") {
      button.textContent = "SEND MY MESSAGE 💌";
    }
  }
}

$("send-rsvp").onclick = sendEmail;

/* ============================================================
   RESTART
   ============================================================ */
$("restart").onclick = () => {
  released = false;
  solved = false;
  opened = false;
  blown = false;
  tries = 0;
  si = 0;
  showToken++;

  clearTimeout(slideTimer);
  clearTimeout(popupTimer);
  stopSecondaryMusic();

  partySound.pause();
  candleSound.pause();
  partySound.currentTime = 0;
  candleSound.currentTime = 0;

  // startSound keeps playing continuously.
  $("rin").value = "";
  $("rmsg").textContent = "";
  $("rmsg").className = "";

  build();

  $("letgo").hidden = false;
  $("greet").hidden = true;
  $("to-riddle").hidden = true;

  $("gift").classList.remove("open");
  $("flame").classList.remove("out");
  $("cake").classList.remove("blown");

  $("wishprompt").hidden = false;
  $("blow").hidden = false;
  $("wishmsg").hidden = true;
  $("to-party").hidden = true;

  no.style.position = "";
  no.style.left = "";
  no.style.top = "";
  $("nopop").hidden = true;

  $("party-buttons").hidden = false;
  $("party-details").hidden = true;
  $("party-message").value = "";
  $("email-status").textContent = "";

  $("send-rsvp").disabled = false;
  $("send-rsvp").textContent = "SEND MY MESSAGE 💌";

  setMusic(false);
  go("s-balloon");
};

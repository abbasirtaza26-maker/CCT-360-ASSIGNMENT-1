// ---------- VARIABLES (state) ----------
let balance = 1239;
let ticket = 1286;
let bankChecked = false;
let messagesRead = false;
let tuitionRead = false;
let ratingRead = false;
let flightRead = false;
let declines = 0;
let rangBell = false;
let cluesFound = 0;
let jacketsFound = false;
let phonesFound = false;
let platesFound = false;
let badgeFound = false;
let headFound = false;
let noteWritten = false;
let noteText = "";
let noteCount = 0;
let days = 0;

// ---------- FUNCTIONS ----------
function updateHud() {
  document.getElementById("hudBalance").innerHTML = "$" + balance;
  document.getElementById("clueCount").innerHTML = cluesFound + "/5";
}

function goToScene(number) {
  document.getElementById("scene1").style.display = "none";
  document.getElementById("scene2").style.display = "none";
  document.getElementById("scene3").style.display = "none";
  document.getElementById("scene4").style.display = "none";
  document.getElementById("scene5").style.display = "none";
  document.getElementById("scene6").style.display = "none";
  document.getElementById("scene" + number).style.display = "block";
  window.scrollTo(0, 0);

  if (number === 4) {
    aimTorch(300, 300);
  }

  if (number === 6) {
    document.getElementById("bell").play();
    let text = "You found " + cluesFound + " of 5 details in the dining room.";
    if (declines > 0) {
      text = text + " You tried to decline " + declines + " time(s). The app didn't let you.";
    }
    if (noteWritten === true) {
      text = text + " Your warning was rewritten into an invitation. Someone else will be next.";
    }
    document.getElementById("summary").innerHTML = text;
  }
}

// ---------- SCENE 1 ----------
function readNotif(name) {
  if (name === "tuition") {
    tuitionRead = true;
    document.getElementById("nTuition").style.opacity = "0.4";
    document.getElementById("notifDetail").innerHTML = "Student Accounts: Your tuition balance is overdue. Pay now to avoid a hold on your enrolment.";
  } else if (name === "rating") {
    ratingRead = true;
    document.getElementById("nRating").style.opacity = "0.4";
    document.getElementById("notifDetail").innerHTML = "onemore: Your rating dropped to 4.88. Drivers below 4.85 may be deactivated.";
  } else if (name === "flight") {
    flightRead = true;
    document.getElementById("nFlight").style.opacity = "0.4";
    document.getElementById("notifDetail").innerHTML = "FareWatch: Toronto to Lahore, Dec 18, 9:40 PM, $1,286. Price increases in 2 days.";
  }
}

function startShift() {
  if (tuitionRead === true && ratingRead === true && flightRead === true) {
    document.getElementById("music").play();
    goToScene(2);
  } else {
    document.getElementById("notifDetail").innerHTML = "Read all three notifications first.";
  }
}

// ---------- SCENE 2 ----------
function showTab(name) {
  document.getElementById("appOrders").style.display = "none";
  document.getElementById("appBank").style.display = "none";
  document.getElementById("appMessages").style.display = "none";
  document.getElementById("tabOrders").style.color = "#999999";
  document.getElementById("tabBank").style.color = "#999999";
  document.getElementById("tabMessages").style.color = "#999999";

  if (name === "orders") {
    document.getElementById("appOrders").style.display = "block";
    document.getElementById("tabOrders").style.color = "#e8457c";
  } else if (name === "bank") {
    bankChecked = true;
    let shortBy = ticket - balance;
    document.getElementById("appBank").style.display = "block";
    document.getElementById("tabBank").style.color = "#e8457c";
    document.getElementById("balanceMsg").innerHTML = "Balance: $" + balance + "<br>Flight to Lahore: $" + ticket + "<br>You are $" + shortBy + " short.";
  } else if (name === "messages") {
    messagesRead = true;
    document.getElementById("appMessages").style.display = "block";
    document.getElementById("tabMessages").style.color = "#e8457c";
  }
}

function acceptOrder() {
  if (bankChecked === true && messagesRead === true) {
    balance = balance + 48;
    updateHud();
    goToScene(3);
  } else {
    document.getElementById("appHint").innerHTML = "Check the Bank and Messages tabs before you accept.";
  }
}

function declineOrder() {
  declines = declines + 1;
  if (declines === 1) {
    document.getElementById("declineMsg").innerHTML = "Account under review. Accept your next order to stay active.";
  } else if (declines === 2) {
    document.getElementById("appRating").innerHTML = "4.84";
    document.getElementById("declineMsg").innerHTML = "Rating dropped to 4.84. Your account may be deactivated.";
  } else {
    document.getElementById("declineMsg").innerHTML = "The app has made the decision for you. Accept.";
  }
}

// ---------- SCENE 3 ----------
function ringBell() {
  rangBell = true;
  document.getElementById("bell").play();
  document.getElementById("houseMsg").innerHTML = "You ring. Total silence, like someone holding their breath. Nobody comes.";
}

function enterHouse() {
  if (rangBell === true) {
    document.getElementById("houseMsg").innerHTML = "Nobody answered, so you go in.";
  }
  goToScene(4);
}

// ---------- TORCH (mouse follows light) ----------
function aimTorch(x, y) {
  document.getElementById("darkness").style.backgroundImage = "radial-gradient(circle 140px at " + x + "px " + y + "px, rgba(255, 190, 90, 0.12) 0%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.97) 100%)";
}

window.addEventListener("mousemove", function (event) {
  let cX = event.clientX;
  let cY = event.clientY;
  aimTorch(cX, cY);
});

// ---------- SCENE 4 ----------
function findClue(name) {
  if (name === "jackets" && jacketsFound === false) {
    jacketsFound = true;
    cluesFound = cluesFound + 1;
    document.getElementById("hsJackets").style.borderColor = "#ffd27a";
    document.getElementById("hsJackets").style.color = "#ffd27a";
  } else if (name === "phones" && phonesFound === false) {
    phonesFound = true;
    cluesFound = cluesFound + 1;
    document.getElementById("hsPhones").style.borderColor = "#ffd27a";
    document.getElementById("hsPhones").style.color = "#ffd27a";
  } else if (name === "plates" && platesFound === false) {
    platesFound = true;
    cluesFound = cluesFound + 1;
    document.getElementById("hsPlates").style.borderColor = "#ffd27a";
    document.getElementById("hsPlates").style.color = "#ffd27a";
  } else if (name === "badge" && badgeFound === false) {
    badgeFound = true;
    cluesFound = cluesFound + 1;
    document.getElementById("hsBadge").style.borderColor = "#ffd27a";
    document.getElementById("hsBadge").style.color = "#ffd27a";
  } else if (name === "head" && headFound === false) {
    headFound = true;
    cluesFound = cluesFound + 1;
    document.getElementById("hsHead").style.borderColor = "#ffd27a";
    document.getElementById("hsHead").style.color = "#ffd27a";
  }

  if (name === "jackets") {
    document.getElementById("clueText").innerHTML = "An insulated delivery bag leans against a chair. Same onemore logo as the one in your car. It is covered in dust.";
  } else if (name === "phones") {
    document.getElementById("clueText").innerHTML = "A phone lies face-up and glowing. It shows the same order you accepted. A draft reads: <em>Leave at door. Don't come in.</em> Under it, the sent version: <em>Come in. Please. Alone.</em>";
  } else if (name === "plates") {
    document.getElementById("clueText").innerHTML = "Seven places are set. Six are empty. One plate sits at the head of the table, cold and untouched.";
  } else if (name === "badge") {
    document.getElementById("clueText").innerHTML = "A driver badge lies on the table, same app and same lanyard as yours. The photo shows a healthy, smiling man.";
  } else if (name === "head") {
    document.getElementById("clueText").innerHTML = "Someone is sitting at the head of the table. A man in a driver's jacket like yours, thin and exhausted, holding his phone like a rosary. He looks up and mouths one word: Leave.";
  }

  updateHud();

  if (cluesFound >= 4 && headFound === true) {
    document.getElementById("toLoop").style.display = "block";
  }
}

// ---------- SCENE 5 (typing on the phone keyboard) ----------
function openUpdate() {
  document.getElementById("driverView").style.display = "none";
  document.getElementById("customerView").style.display = "block";
  document.getElementById("roleBadge").innerHTML = "CUSTOMER";
  document.getElementById("roleBadge").style.backgroundColor = "#b01818";
  document.getElementById("roleBadge").style.letterSpacing = "2px";
  document.getElementById("roleBadge").style.animation = "glitch 3s infinite";
}

function waitDay() {
  days = days + 1;
  if (days === 1) {
    document.getElementById("dayMsg").innerHTML = "Day 1. No driver yet. The candles stay lit.";
  } else if (days === 2) {
    document.getElementById("dayMsg").innerHTML = "Day 2. The door will not open. Your flight reminder keeps repeating: 9:40 PM, today.";
  } else {
    document.getElementById("dayMsg").innerHTML = "Day 3. Driver found: new to onemore, first delivery. 2 minutes away. Warn them.";
    document.getElementById("waitBtn").style.display = "none";
    document.getElementById("noteArea").style.display = "block";
    document.getElementById("keyboard").style.display = "block";
  }
}

function showNote() {
  if (noteText === "") {
    document.getElementById("noteBox").innerHTML = "Tap the keys to type a warning...";
  } else {
    document.getElementById("noteBox").innerHTML = noteText + "|";
  }
}

function typeKey(letter) {
  if (noteCount < 30) {
    noteText = noteText + letter;
    noteCount = noteCount + 1;
  }
  showNote();
}

function clearNote() {
  noteText = "";
  noteCount = 0;
  showNote();
}

function sendNote() {
  if (noteText === "") {
    document.getElementById("driverMsg").innerHTML = "Type a warning to the driver first.";
  } else {
    noteWritten = true;
    document.getElementById("keyboard").style.display = "none";
    document.getElementById("noteBox").innerHTML = '"' + noteText + '"';
    document.getElementById("noteResult").innerHTML = 'The app rewrites it:<br>"Come in. Please. Alone."';
    document.getElementById("dayMsg").innerHTML = "Message sent. The driver is at the door.";
    document.getElementById("driverMsg").innerHTML = "";
    document.getElementById("toEnd").style.display = "block";
  }
}

// ---------- RESTART ----------
function restart() {
  location.reload();
}

// ---------- START ----------
updateHud();
goToScene(1);
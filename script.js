let currentSlot = 1;

/* =====================
   画面切り替え
===================== */

function goSave() {
  show("saveScreen");
  hide("startScreen");
  document.getElementById("backButton").style.display = "block";
  updateSlotNames();
}

function loadSlot(slot) {
  currentSlot = slot;
  hide("saveScreen");
  show("profileScreen");
  loadProfile();
  document.getElementById("backButton").style.display = "block";
}

function show(id) {
  document.getElementById(id).style.display = "block";
}

function hide(id) {
  document.getElementById(id).style.display = "none";
}

function isVisible(id) {
  return document.getElementById(id).style.display === "block";
}

/* =====================
   保存（Q&A全部対応）
===================== */

function saveProfile() {

  let profile = {
    name: document.getElementById("nameInput").value,
    age: document.getElementById("ageInput").value,
    personality: document.getElementById("personality").value,
    history: document.getElementById("history").value,
    secret: document.getElementById("secret").value,
    like: document.getElementById("like").value,
    dislike: document.getElementById("dislike").value,

    firstImpression: document.getElementById("firstImpression").value,
    strength: document.getElementById("strength").value,
    weakness: document.getElementById("weakness").value,
    important: document.getElementById("important").value,
    secretDetail: document.getElementById("secretDetail").value,
    future: document.getElementById("future").value
  };

  localStorage.setItem(
    "profile" + currentSlot,
    JSON.stringify(profile)
  );

  document.getElementById("showName").textContent =
    "保存しました！";

  updateSlotNames();
}

/* =====================
   読み込み（完全版）
===================== */

function loadProfile() {

  // 全リセット
  const ids = [
    "nameInput","ageInput","personality","history",
    "secret","like","dislike",
    "firstImpression","strength","weakness",
    "important","secretDetail","future"
  ];

  ids.forEach(id => {
    document.getElementById(id).value = "";
  });

  document.getElementById("showName").textContent = "";

  let data = localStorage.getItem("profile" + currentSlot);

  if (!data) {
    document.getElementById("showName").textContent =
      "まだデータがありません";
    return;
  }

  let profile = JSON.parse(data);

  ids.forEach(id => {
    document.getElementById(id).value =
      profile[id] || "";
  });

  document.getElementById("showName").textContent =
    "データを読み込みました";
}

/* =====================
   セーブスロット名更新
===================== */

function updateSlotNames() {
  for (let i = 1; i <= 3; i++) {

    let btn = document.querySelector(
      `button[onclick="loadSlot(${i})"]`
    );

    let data = localStorage.getItem("profile" + i);

    if (data) {
      let profile = JSON.parse(data);
      btn.textContent =
        "データ" + i + "：" + (profile.name || "名前なし");
    } else {
      btn.textContent = "データ" + i;
    }
  }
}

/* =====================
   戻るボタン
===================== */

function handleBack() {

  if (isVisible("profileScreen")) {
    hide("profileScreen");
    show("saveScreen");
    updateSlotNames();
    return;
  }

  if (isVisible("saveScreen")) {
    hide("saveScreen");
    show("startScreen");
    document.getElementById("backButton").style.display = "none";
  }
}

/* =====================
   閲覧モード
===================== */

let viewMode = false;

function toggleViewMode() {

  const paper = document.querySelector(".paper");

  viewMode = !viewMode;

  if(viewMode){
    paper.classList.add("viewMode");
  }else{
    paper.classList.remove("viewMode");
  }
}

/* =====================
   印刷（PDF化）
===================== */

function printProfile(){
  window.print();
}
/* =====================
   初期化（データ削除）
===================== */

function resetProfile() {

  const ok = confirm("このデータを完全に削除しますか？");

  if(!ok) return;

  // 保存データ削除
  localStorage.removeItem("profile" + currentSlot);

  // 入力欄リセット
  const ids = [
    "nameInput","ageInput","personality","history",
    "secret","like","dislike",
    "firstImpression","strength","weakness",
    "important","secretDetail","future"
  ];

  ids.forEach(id => {
    document.getElementById(id).value = "";
  });

  document.getElementById("showName").textContent =
    "データを削除しました";

  updateSlotNames();
}
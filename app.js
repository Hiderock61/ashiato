// 画面切り替え
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.style.display = "none");
  document.getElementById(id).style.display = "block";
}

// 初期表示
showScreen("screen-top");

// タグ一覧
const tags = [
  "ギター", "銭湯", "昭和サブカル", "英語やり直し",
  "フィリピン", "散歩", "料理", "FX観察",
  "友達から希望", "再出発中", "生活立て直し中", "近所で話せる人"
];

let selectedTags = [];

function renderTags() {
  const list = document.getElementById("tagList");
  list.innerHTML = tags.map(tag => {
    const selectedClass = selectedTags.includes(tag) ? "selected" : "";
    return `<span class="tag ${selectedClass}" onclick="toggleTag('${tag}', this)">${tag}</span>`;
  }).join("");
}

function toggleTag(tag, el) {
  if (selectedTags.includes(tag)) {
    selectedTags = selectedTags.filter(t => t !== tag);
    el.classList.remove("selected");
  } else {
    selectedTags.push(tag);
    el.classList.add("selected");
  }
}

renderTags();

// ダミープロフィール
const profiles = [
  {
    id: 1,
    name: "あおば",
    area: "都内西部",
    tags: ["銭湯", "英語やり直し", "散歩"],
    bio: "近所の銭湯めぐりが最近の楽しみ。英語はゆっくり再挑戦中。",
    hope: "まずはゆるく話せる人",
    footprints: 12,
    verifiedStatus: "本人確認：v0.1では説明のみ",
    gateStatus: "接触前ゲート想定",
    auntieShort: "急がんと、最近行った銭湯の話からでええんちゃう？",
    auntieComment: "銭湯と英語やり直しが重なってるで。急がんと、最近行った銭湯の話からでええんちゃう？"
  },
  {
    id: 2,
    name: "ひより",
    area: "神奈川東部",
    tags: ["料理", "昭和サブカル", "再出発中"],
    bio: "料理は作るのも食べるのも好き。昭和の雑誌を読むのが密かな楽しみ。",
    hope: "友達から希望",
    footprints: 7,
    verifiedStatus: "本人確認：v0.1では説明のみ",
    gateStatus: "接触前ゲート想定",
    auntieShort: "まずは好きな雑誌の話とか、軽めでいこか。",
    auntieComment: "昭和サブカルと料理が重なってるわ。まずは好きな雑誌の話とか、軽めでいこか。"
  },
  {
    id: 3,
    name: "そらまめ",
    area: "東京北部",
    tags: ["ギター", "フィリピン", "生活立て直し中"],
    bio: "ギターは独学。フィリピンには短期滞在してました。",
    hope: "近所で話せる人",
    footprints: 3,
    verifiedStatus: "本人確認：v0.1では説明のみ",
    gateStatus: "接触前ゲート想定",
    auntieShort: "最近弾いた曲の話とかでええよ。",
    auntieComment: "ギターとフィリピン経験があるんやね。いきなり深い話やなくて、最近弾いた曲の話とかでええよ。"
  }
];

let currentProfile = null;

// プロフィール一覧へ
function goToProfiles() {
  renderProfiles();
  showScreen("screen-profiles");
}

function renderProfiles() {
  const container = document.getElementById("profileList");

  container.innerHTML = profiles.map(p => {
    const tagHtml = p.tags.map(tag => {
      const commonClass = selectedTags.includes(tag) ? "common" : "";
      return `<span class="profile-tag ${commonClass}">${tag}</span>`;
    }).join("");

    return `
      <div class="card" onclick="openProfile(${p.id})">
        <h3>${p.name}</h3>
        <p class="card-meta">${p.area}</p>

        <div class="card-section">
          ${tagHtml}
        </div>

        <p class="card-section">${p.bio}</p>

        <p class="card-section"><strong>接続希望：</strong>${p.hope}</p>

        <div class="badge">${p.verifiedStatus}</div>
        <div class="badge">${p.gateStatus}</div>

        <p class="card-section">足あと：${p.footprints}</p>

        <div class="auntie-note">
          👵 ${p.auntieShort}
        </div>
      </div>
    `;
  }).join("");
}

// カードを押したら足あと画面へ
function openProfile(id) {
  currentProfile = profiles.find(p => p.id === id);

  if (!currentProfile) {
    return;
  }

  document.getElementById("footprintText").innerText =
    `${currentProfile.name}さんのプロフィールを見た気配がつきました。`;

  renderFootprintMiniCard();
  renderKnockTitle();

  showScreen("screen-footprint");
}

function renderFootprintMiniCard() {
  const miniCard = document.getElementById("footprintMiniCard");

  const tagHtml = currentProfile.tags.map(tag => {
    const commonClass = selectedTags.includes(tag) ? "common" : "";
    return `<span class="profile-tag ${commonClass}">${tag}</span>`;
  }).join("");

  miniCard.innerHTML = `
    <h3>${currentProfile.name}</h3>
    <p class="card-meta">${currentProfile.area}</p>
    <div>${tagHtml}</div>
    <p><strong>接続希望：</strong>${currentProfile.hope}</p>
    <div class="badge">${currentProfile.verifiedStatus}</div>
    <div class="badge">${currentProfile.gateStatus}</div>
  `;
}

function renderKnockTitle() {
  document.getElementById("knockTitle").innerText =
    `${currentProfile.name}さんに、どう接続しますか？`;
}

// ノック3択
function chooseKnock(type) {
  if (!currentProfile) {
    return;
  }

  if (type === "auntie") {
    document.getElementById("auntieText").innerText = currentProfile.auntieComment;
    showScreen("screen-auntie-comment");
  } else {
    document.getElementById("auntieText").innerText =
      `${currentProfile.name}さんに軽くノックしておきました。いきなり話しかけず、まずは気配だけ置いておきます。`;
    showScreen("screen-auntie-comment");
  }
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.style.display = "none");
  const target = document.getElementById(id);
  if (target) target.style.display = "block";
}
showScreen("screen-top");

/* -------------------------
   v0.3A：自分のタグ肩書き
------------------------- */

let selectedMyTags = [];

const myTags = [
  "ギター",
  "Guns N’ Roses",
  "銭湯",
  "フィリピン",
  "英語やり直し",
  "昭和サブカル",
  "料理",
  "FX観察",
  "再出発中",
  "生活立て直し中",
  "近所で話せる人",
  "友達から希望"
];

function renderMyTags() {
  const list = document.getElementById("myTagList");
  if (!list) return;

  list.innerHTML = myTags.map(tag => `
    <span class="tag ${selectedMyTags.includes(tag) ? "selected" : ""}"
          onclick="toggleMyTag('${tag}')">${tag}</span>
  `).join("");

  renderMyTagSummary();
}

function toggleMyTag(tag) {
  if (selectedMyTags.includes(tag)) {
    selectedMyTags = selectedMyTags.filter(t => t !== tag);
  } else {
    selectedMyTags.push(tag);
  }
  renderMyTags();
}

function renderMyTagSummary() {
  const summary = document.getElementById("myTagSummary");
  if (!summary) return;

  if (selectedMyTags.length === 0) {
    summary.innerText = "まだ肩書きは選ばれていません。";
  } else {
    summary.innerText = `あなたのタグ肩書き：${selectedMyTags.join(" / ")}`;
  }
}

renderMyTags();

/* -------------------------
   ダミーデータ：コミュニティ
------------------------- */

const communities = [
  { id: 1, name: "♨️ 銭湯帰りの会", description: "銭湯の話、サウナの話、近所の湯の情報をゆるく共有する部屋。", threads: [101, 102], memberCount: 128, topicCount: 24, owner: "おばちゃん見守り中", mood: "初心者歓迎", visibility: "招待制想定", lastActive: "今日 20:14", shortTags: ["銭湯", "サウナ", "近所"] },
  { id: 2, name: "🍳 料理ゆる部", description: "レシピ交換、料理の失敗談、好きな調味料などを語る部屋。", threads: [201], memberCount: 87, topicCount: 12, owner: "ゆる料理長", mood: "まったり", visibility: "公開予定", lastActive: "今日 18:55", shortTags: ["料理", "調味料", "自炊"] },
  { id: 3, name: "🗣️ 英語やり直し部", description: "英語の再挑戦を応援する部屋。", threads: [301], memberCount: 203, topicCount: 31, owner: "英語おばちゃん", mood: "ゆる勉強", visibility: "招待制想定", lastActive: "今日 19:40", shortTags: ["英語", "勉強", "海外ドラマ"] },
  { id: 4, name: "📼 昭和サブカル研究室", description: "昭和の雑誌、音楽、映画、サブカル文化を語る部屋。", threads: [401], memberCount: 54, topicCount: 9, owner: "昭和案内人", mood: "濃いめ", visibility: "半公開", lastActive: "今日 17:22", shortTags: ["昭和", "雑誌", "音楽"] }
];

/* -------------------------
   ダミーデータ：プロフィール
------------------------- */

const profiles = [
  { id: 1, name: "あおば", area: "都内西部", communities: [1, 3], tags: ["銭湯", "英語やり直し"], bio: "近所の銭湯めぐりが好き。英語はゆっくり再挑戦中。", hope: "まずはゆるく話せる人", verifiedStatus: "本人確認：v0.3Aでは説明のみ", auntieComment: "銭湯と英語が重なってるで。急がんと、最近行った銭湯の話からでええんちゃう？" },
  { id: 2, name: "ひより", area: "神奈川東部", communities: [2, 4], tags: ["料理", "昭和サブカル"], bio: "料理は作るのも食べるのも好き。昭和の雑誌を読むのが密かな楽しみ。", hope: "友達から希望", verifiedStatus: "本人確認：v0.3Aでは説明のみ", auntieComment: "料理と昭和が重なってるわ。まずは好きな雑誌の話とか、軽めでいこか。" }
];

/* -------------------------
   ダミーデータ：スレッド
------------------------- */

const threads = [
  { id: 101, communityId: 1, title: "最近行った銭湯の話しません？", posts: [9001, 9002] },
  { id: 102, communityId: 1, title: "サウナの入り方って人によって違うよね", posts: [9003] },
  { id: 201, communityId: 2, title: "好きな調味料ベスト3", posts: [9004] },
  { id: 301, communityId: 3, title: "Duolingoの連続記録どうしてる？", posts: [9005] },
  { id: 401, communityId: 4, title: "昭和の雑誌で好きな特集あった？", posts: [9006] }
];

/* -------------------------
   ダミーデータ：発言
------------------------- */

const posts = [
  { id: 9001, profileId: 1, text: "昨日は『ゆの森』に行ってきました。露天が気持ちよかったです。", time: "20:14" },
  { id: 9002, profileId: 1, text: "銭湯の後の牛乳ってなんであんなに美味しいんでしょうね。", time: "20:20" },
  { id: 9003, profileId: 1, text: "水風呂の温度、みんなこだわりあります？", time: "21:03" },
  { id: 9004, profileId: 2, text: "最近は『昆布ポン酢』が万能すぎて手放せません。", time: "18:55" },
  { id: 9005, profileId: 1, text: "連続記録は気にしすぎると疲れるので、ゆるく続けてます。", time: "19:40" },
  { id: 9006, profileId: 2, text: "昔の『宝島』の特集が好きでした。あの雰囲気がたまらない。", time: "17:22" }
];

let currentCommunity = null;
let currentThread = null;
let currentProfile = null;

function renderCommunities() {
  const list = document.getElementById("communityList");
  if (!list) return;

  list.innerHTML = communities.map(c => `
    <div class="community-card" onclick="openCommunity(${c.id})">
      <h3>${c.name}</h3>
      <p class="comm-desc">${c.description}</p>
      <div class="comm-meta">
        <span>👥 ${c.memberCount}人</span>
        <span>📚 ${c.topicCount}トピック</span>
        <span>🌱 ${c.mood}</span>
      </div>
      <div class="comm-meta">
        <span>🔒 ${c.visibility}</span>
        <span>⏱ ${c.lastActive}</span>
      </div>
      <div class="comm-meta"><span>管理人：${c.owner}</span></div>
      <div class="comm-tags">${c.shortTags.map(t => `<span class="comm-tag">${t}</span>`).join("")}</div>
      <div class="comm-enter">この部屋をのぞく</div>
    </div>
  `).join("");
}
renderCommunities();

function openCommunity(id) {
  currentCommunity = communities.find(c => c.id === id);
  if (!currentCommunity) return;

  document.getElementById("communityName").innerText = currentCommunity.name;
  document.getElementById("communityDesc").innerText = currentCommunity.description;

  document.getElementById("communityThreads").innerHTML = currentCommunity.threads.map(tid => {
    const t = threads.find(th => th.id === tid);
    return t ? `<div class="card" onclick="openThread(${t.id})">${t.title}</div>` : "";
  }).join("");

  showScreen("screen-community-detail");
}

function openThreadList(cid) {
  const comm = communities.find(c => c.id === cid);
  if (!comm) {
    showScreen("screen-communities");
    return;
  }

  document.getElementById("threadListTitle").innerText = comm.name;
  document.getElementById("threadList").innerHTML = comm.threads.map(tid => {
    const t = threads.find(th => th.id === tid);
    return t ? `<div class="card" onclick="openThread(${t.id})">${t.title}</div>` : "";
  }).join("");

  showScreen("screen-thread-list");
}

function openThread(tid) {
  currentThread = threads.find(t => t.id === tid);
  if (!currentThread) return;

  document.getElementById("threadTitle").innerText = currentThread.title;

  document.getElementById("postList").innerHTML = currentThread.posts.map(pid => {
    const p = posts.find(po => po.id === pid);
    if (!p) return "";
    const prof = profiles.find(pr => pr.id === p.profileId);
    if (!prof) return "";

    return `
      <div class="post" onclick="openProfile(${prof.id})">
        <strong>${prof.name}</strong>（${p.time}）
        <p>${p.text}</p>
      </div>
    `;
  }).join("");

  showScreen("screen-thread-posts");
}

function backToThreadList() {
  if (!currentThread) {
    showScreen("screen-community-detail");
    return;
  }
  openThreadList(currentThread.communityId);
}

function openProfile(pid) {
  currentProfile = profiles.find(p => p.id === pid);
  if (!currentProfile) return;

  const commNames = currentProfile.communities
    .map(cid => {
      const comm = communities.find(c => c.id === cid);
      return comm ? comm.name : "";
    })
    .filter(Boolean)
    .join(" / ");

  const tagHtml = currentProfile.tags.map(t => `<span class="badge">${t}</span>`).join("");

  document.getElementById("profileCard").innerHTML = `
    <div class="card">
      <h3>${currentProfile.name}</h3>
      <p>${currentProfile.area}</p>
      <p><strong>参加コミュニティ：</strong>${commNames}</p>
      <p><strong>肩書き：</strong>${tagHtml}</p>
      <p>${currentProfile.bio}</p>
      <p><strong>接続希望：</strong>${currentProfile.hope}</p>
      <p><strong>${currentProfile.verifiedStatus}</strong></p>
    </div>
  `;

  showScreen("screen-profile");
}

function showFootprint() {
  if (!currentProfile) return;

  document.getElementById("footName").innerText =
    `${currentProfile.name}さんのプロフィールを見た気配がつきました`;

  document.getElementById("footTags").innerText =
    `肩書き：${currentProfile.tags.join(" / ")}`;

  document.getElementById("footHope").innerText =
    `接続希望：${currentProfile.hope}`;

  document.getElementById("knockName").innerText =
    `${currentProfile.name}さんに、どう接続しますか？`;

  showScreen("screen-footprint");
}

function chooseKnock(type) {
  if (!currentProfile) return;

  if (type === "auntie") {
    document.getElementById("auntieText").innerText = currentProfile.auntieComment;
  } else {
    document.getElementById("auntieText").innerText =
      `${currentProfile.name}さんに軽くノックしておきました。いきなり話しかけず、まずは気配だけ置いておきます。`;
  }

  showScreen("screen-auntie-comment");
}

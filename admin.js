let uidStock = [];
let pendingTopups = [];

function loadAdminData() {
    uidStock = JSON.parse(localStorage.getItem("sendi_uidstock") || `[
        {"uid": "15766666666", "priceCoin": 800000},
        {"uid": "15766666696", "priceCoin": 70000},
        {"uid": "15400000030", "priceCoin": 400000},
        {"uid": "15766667878", "priceCoin": 40000},
        {"uid": "15766667373", "priceCoin": 40000},
        {"uid": "15762222277", "priceCoin": 45000},
        {"uid": "15866669944", "priceCoin": 30000},
        {"uid": "15866660777", "priceCoin": 35000},
        {"uid": "15762229988", "priceCoin": 35000},
        {"uid": "15757883322", "priceCoin": 30000},
        {"uid": "15766666971", "priceCoin": 20000},
        {"uid": "15766666744", "priceCoin": 20000},
        {"uid": "15766666732", "priceCoin": 20000},
        {"uid": "15766666740", "priceCoin": 20000},
        {"uid": "15766666747", "priceCoin": 20000},
        {"uid": "15766666758", "priceCoin": 20000},
        {"uid": "15766666722", "priceCoin": 20000},
        {"uid": "15766667786", "priceCoin": 20000},
        {"uid": "15766667794", "priceCoin": 20000},
        {"uid": "15766667792", "priceCoin": 20000},
        {"uid": "15766666563", "priceCoin": 20000},
        {"uid": "15766666572", "priceCoin": 20000},
        {"uid": "15766667749", "priceCoin": 15000},
        {"uid": "15766667375", "priceCoin": 15000},
        {"uid": "15766667334", "priceCoin": 15000},
        {"uid": "15766667672", "priceCoin": 15000},
        {"uid": "15766674446", "priceCoin": 15000},
        {"uid": "15766667372", "priceCoin": 15000},
        {"uid": "15766690011", "priceCoin": 25000},
        {"uid": "15766682225", "priceCoin": 15000},
        {"uid": "15766689977", "priceCoin": 15000},
        {"uid": "15766689911", "priceCoin": 15000},
        {"uid": "15766690666", "priceCoin": 15000},
        {"uid": "15754333339", "priceCoin": 15000},
        {"uid": "15754333838", "priceCoin": 15000},
        {"uid": "15754333212", "priceCoin": 15000},
        {"uid": "15761222227", "priceCoin": 20000},
        {"uid": "15762222249", "priceCoin": 20000},
        {"uid": "15762222129", "priceCoin": 15000},
        {"uid": "15762222109", "priceCoin": 15000},
        {"uid": "15762222203", "priceCoin": 15000},
        {"uid": "15762222287", "priceCoin": 20000},
        {"uid": "15762222477", "priceCoin": 20000},
        {"uid": "15762229930", "priceCoin": 10000},
        {"uid": "15762230038", "priceCoin": 10000},
        {"uid": "15762229969", "priceCoin": 10000},
        {"uid": "15762229952", "priceCoin": 10000},
        {"uid": "15762230305", "priceCoin": 10000},
        {"uid": "15762236665", "priceCoin": 10000},
        {"uid": "15763511111", "priceCoin": 15000},
        {"uid": "15763511112", "priceCoin": 15000},
        {"uid": "15757883320", "priceCoin": 15000},
        {"uid": "15757875567", "priceCoin": 25000},
        {"uid": "15757883366", "priceCoin": 20000},
        {"uid": "15759999908", "priceCoin": 22000},
        {"uid": "15759999958", "priceCoin": 25000},
        {"uid": "15759999951", "priceCoin": 25000},
        {"uid": "15760000656", "priceCoin": 25000},
        {"uid": "15760000538", "priceCoin": 15000},
        {"uid": "15760000223", "priceCoin": 15000},
        {"uid": "15760067555", "priceCoin": 15000}
    ]`);
    
    pendingTopups = JSON.parse(localStorage.getItem("sendi_pending") || "[]");
    renderPending();
    renderUIDManager();
}

function renderPending() {
    let div = document.getElementById("pendingList");
    if(!div) return;
    if(pendingTopups.length === 0) {
        div.innerHTML = "<p>✨ Tidak ada pending request</p>";
        return;
    }
    div.innerHTML = pendingTopups.map((p, idx) => `
        <div class="pending-item">
            <b>🔑 Kode: ${p.kodeAkun}</b> | 🪙 Jumlah: ${p.jumlah.toLocaleString('id-ID')} koin<br>
            <small>📅 ${new Date(p.waktu).toLocaleString()}</small><br>
            <button onclick="approvePending(${idx}, '${p.kodeAkun}', ${p.jumlah})">✅ Approve & Isi Koin</button>
            <button onclick="rejectPending(${idx})">❌ Tolak</button>
        </div>
    `).join("");
}

function approvePending(idx, kode, jumlah) {
    let koinKey = "sendi_koin_" + kode;
    let currentKoin = parseInt(localStorage.getItem(koinKey) || "0");
    currentKoin += jumlah;
    localStorage.setItem(koinKey, currentKoin);
    
    pendingTopups.splice(idx, 1);
    localStorage.setItem("sendi_pending", JSON.stringify(pendingTopups));
    loadAdminData();
    alert(`✅ Berhasil memberi ${jumlah.toLocaleString('id-ID')} koin ke ${kode}`);
    
    if(window.opener && window.opener.tambahKoinByKode) {
        window.opener.tambahKoinByKode(kode, jumlah);
    }
}

function rejectPending(idx) {
    pendingTopups.splice(idx, 1);
    localStorage.setItem("sendi_pending", JSON.stringify(pendingTopups));
    loadAdminData();
    alert("❌ Pending ditolak");
}

function renderUIDManager() {
    let div = document.getElementById("uidManage");
    if(!div) return;
    div.innerHTML = uidStock.map((item, i) => `
        <div class="uid-item">
            <span style="font-family:monospace;">${item.uid}</span>
            <span style="color:#ffbc6e;">${item.priceCoin.toLocaleString('id-ID')} 🪙</span>
            <button onclick="deleteUid(${i})" style="background:#a12a2a;">Hapus</button>
        </div>
    `).join("");
}

window.deleteUid = (i) => {
    if(confirm("Hapus UID ini?")) {
        uidStock.splice(i, 1);
        localStorage.setItem("sendi_uidstock", JSON.stringify(uidStock));
        loadAdminData();
    }
};

document.getElementById("loginBtn").onclick = () => {
    let pass = document.getElementById("adminPass").value;
    if(pass === "SENDISTORECIHUY23") {
        document.getElementById("adminContent").style.display = "block";
        loadAdminData();
    } else alert("Password salah!");
};

document.getElementById("isiKoinBtn").onclick = () => {
    let targetKode = document.getElementById("kodeAkunTarget").value;
    let jumlah = parseInt(document.getElementById("jumlahKoin").value);
    if(targetKode && jumlah) {
        let koinKey = "sendi_koin_" + targetKode;
        let currentKoin = parseInt(localStorage.getItem(koinKey) || "0");
        currentKoin += jumlah;
        localStorage.setItem(koinKey, currentKoin);
        alert(`✅ +${jumlah.toLocaleString('id-ID')} koin untuk ${targetKode}`);
        document.getElementById("kodeAkunTarget").value = "";
        document.getElementById("jumlahKoin").value = "";
        if(window.opener && window.opener.tambahKoinByKode) {
            window.opener.tambahKoinByKode(targetKode, jumlah);
        }
    } else alert("Masukkan kode akun dan jumlah koin");
};

document.getElementById("addUidBtn").onclick = () => {
    let newUid = document.getElementById("newUid").value;
    let newPrice = parseInt(document.getElementById("newPriceCoin").value);
    if(newUid && newPrice) {
        uidStock.push({ uid: newUid, priceCoin: newPrice });
        localStorage.setItem("sendi_uidstock", JSON.stringify(uidStock));
        loadAdminData();
        document.getElementById("newUid").value = "";
        document.getElementById("newPriceCoin").value = "";
        alert("UID berhasil ditambahkan");
    } else alert("Isi UID dan harga koin dengan benar");
};

document.getElementById("gantiQrisBtn").onclick = () => {
    let newLink = document.getElementById("qrisLinkInput").value;
    if(newLink) {
        localStorage.setItem("sendi_qrislink", newLink);
        alert("QRIS berhasil diganti!");
        document.getElementById("qrisLinkInput").value = "";
    } else alert("Masukkan link gambar QRIS");
};
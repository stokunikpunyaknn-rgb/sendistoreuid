(function() {
    let userKoin = 0;
    let userKodeAkun = "";
    let uidStock = [
        { uid: "15766666666", priceCoin: 800000 },
        { uid: "15766666696", priceCoin: 70000 },
        { uid: "15400000030", priceCoin: 400000 },
        { uid: "15766667878", priceCoin: 40000 },
        { uid: "15766667373", priceCoin: 40000 },
        { uid: "15762222277", priceCoin: 45000 },
        { uid: "15866669944", priceCoin: 30000 },
        { uid: "15866660777", priceCoin: 35000 },
        { uid: "15762229988", priceCoin: 35000 },
        { uid: "15757883322", priceCoin: 30000 },
        { uid: "15766666971", priceCoin: 20000 },
        { uid: "15766666744", priceCoin: 20000 },
        { uid: "15766666732", priceCoin: 20000 },
        { uid: "15766666740", priceCoin: 20000 },
        { uid: "15766666747", priceCoin: 20000 },
        { uid: "15766666758", priceCoin: 20000 },
        { uid: "15766666722", priceCoin: 20000 },
        { uid: "15766667786", priceCoin: 20000 },
        { uid: "15766667794", priceCoin: 20000 },
        { uid: "15766667792", priceCoin: 20000 },
        { uid: "15766666563", priceCoin: 20000 },
        { uid: "15766666572", priceCoin: 20000 },
        { uid: "15766667749", priceCoin: 15000 },
        { uid: "15766667375", priceCoin: 15000 },
        { uid: "15766667334", priceCoin: 15000 },
        { uid: "15766667672", priceCoin: 15000 },
        { uid: "15766674446", priceCoin: 15000 },
        { uid: "15766667372", priceCoin: 15000 },
        { uid: "15766690011", priceCoin: 25000 },
        { uid: "15766682225", priceCoin: 15000 },
        { uid: "15766689977", priceCoin: 15000 },
        { uid: "15766689911", priceCoin: 15000 },
        { uid: "15766690666", priceCoin: 15000 },
        { uid: "15754333339", priceCoin: 15000 },
        { uid: "15754333838", priceCoin: 15000 },
        { uid: "15754333212", priceCoin: 15000 },
        { uid: "15761222227", priceCoin: 20000 },
        { uid: "15762222249", priceCoin: 20000 },
        { uid: "15762222129", priceCoin: 15000 },
        { uid: "15762222109", priceCoin: 15000 },
        { uid: "15762222203", priceCoin: 15000 },
        { uid: "15762222287", priceCoin: 20000 },
        { uid: "15762222477", priceCoin: 20000 },
        { uid: "15762229930", priceCoin: 10000 },
        { uid: "15762230038", priceCoin: 10000 },
        { uid: "15762229969", priceCoin: 10000 },
        { uid: "15762229952", priceCoin: 10000 },
        { uid: "15762230305", priceCoin: 10000 },
        { uid: "15762236665", priceCoin: 10000 },
        { uid: "15763511111", priceCoin: 15000 },
        { uid: "15763511112", priceCoin: 15000 },
        { uid: "15757883320", priceCoin: 15000 },
        { uid: "15757875567", priceCoin: 25000 },
        { uid: "15757883366", priceCoin: 20000 },
        { uid: "15759999908", priceCoin: 22000 },
        { uid: "15759999958", priceCoin: 25000 },
        { uid: "15759999951", priceCoin: 25000 },
        { uid: "15760000656", priceCoin: 25000 },
        { uid: "15760000538", priceCoin: 15000 },
        { uid: "15760000223", priceCoin: 15000 },
        { uid: "15760067555", priceCoin: 15000 }
    ];
    let qrisLink = "https://files.catbox.moe/yozeik.jpg";
    let pendingTopups = [];
    const WA_PHONE = "62887437256882";

    function loadData() {
        let storedKode = localStorage.getItem("sendi_kodeakun");
        if(storedKode) userKodeAkun = storedKode;
        else {
            userKodeAkun = "SND" + Math.random().toString(36).substring(2,10).toUpperCase();
            localStorage.setItem("sendi_kodeakun", userKodeAkun);
        }
        
        let koinKey = "sendi_koin_" + userKodeAkun;
        let savedKoin = localStorage.getItem(koinKey);
        if(savedKoin) userKoin = parseInt(savedKoin);
        else userKoin = 0;
        
        let storedUid = localStorage.getItem("sendi_uidstock");
        if(storedUid) uidStock = JSON.parse(storedUid);
        
        let storedPending = localStorage.getItem("sendi_pending");
        if(storedPending) pendingTopups = JSON.parse(storedPending);
        
        updateUI();
    }

    function saveKoin() {
        localStorage.setItem("sendi_koin_" + userKodeAkun, userKoin);
        updateUI();
    }

    function saveStock() {
        localStorage.setItem("sendi_uidstock", JSON.stringify(uidStock));
        renderUIDTable();
    }

    function savePending() {
        localStorage.setItem("sendi_pending", JSON.stringify(pendingTopups));
    }

    function updateUI() {
        let coinDisplay = document.getElementById("userCoinDisplay");
        let statCoin = document.getElementById("statCoin");
        let kodeSpan = document.getElementById("userKodeAkun");
        let modalKode = document.getElementById("modalKodeAkun");
        let totalUid = document.getElementById("totalUidCount");
        if(coinDisplay) coinDisplay.innerText = userKoin.toLocaleString('id-ID');
        if(statCoin) statCoin.innerText = userKoin.toLocaleString('id-ID');
        if(kodeSpan) kodeSpan.innerText = userKodeAkun;
        if(modalKode) modalKode.innerText = userKodeAkun;
        if(totalUid) totalUid.innerText = uidStock.length;
        renderUIDTable();
    }

    function formatRupiah(angka) {
        return "Rp " + angka.toLocaleString('id-ID');
    }

    function sendToWA(uid, price) {
        let message = `📍HALO ADMIN SENDI STORE, SAYA INGIN MEMBELI UID : ${uid} | HARGA : ${formatRupiah(price)} , KIRIM PAYMENT UNTUK SAYA LANJUTKAN BAYAR`;
        let encodedMsg = encodeURIComponent(message);
        let waUrl = `https://wa.me/${WA_PHONE}?text=${encodedMsg}`;
        window.open(waUrl, "_blank");
    }

    function renderUIDTable() {
        let tbody = document.getElementById("tableBody");
        if(!tbody) return;
        if(uidStock.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" style="text-align:center">✅ Semua UID sudah terjual!</td></tr>`;
            return;
        }
        let html = "";
        uidStock.forEach((item, idx) => {
            let tier = item.priceCoin >= 400000 ? "🏆 LEGEND" : 
                       (item.priceCoin >= 100000 ? "💎 DIAMOND" : 
                       (item.priceCoin >= 50000 ? "🌟 GOLD" : 
                       (item.priceCoin >= 25000 ? "⚡ SILVER" : "🔹 BRONZE")));
            let cukupKoin = userKoin >= item.priceCoin;
            html += `<tr>
                <td>${idx+1}</td>
                <td>${tier}</td>
                <td class="uid-col">${item.uid}</td>
                <td class="price-col">${item.priceCoin.toLocaleString('id-ID')} 🪙</td>
                <td><button class="btn-buy-coin" data-uid="${item.uid}" data-price="${item.priceCoin}" ${!cukupKoin ? "disabled" : ""}>${cukupKoin ? "Beli" : "Koin Kurang"}</button></td>
            </tr>`;
        });
        tbody.innerHTML = html;
        
        document.querySelectorAll(".btn-buy-coin").forEach(btn => {
            btn.addEventListener("click", (e) => {
                let uid = btn.getAttribute("data-uid");
                let price = parseInt(btn.getAttribute("data-price"));
                if(userKoin >= price) {
                    if(confirm(`Beli UID ${uid} dengan ${price.toLocaleString('id-ID')} koin? Koin akan otomatis terpotong.`)) {
                        userKoin -= price;
                        saveKoin();
                        uidStock = uidStock.filter(u => u.uid !== uid);
                        saveStock();
                        showToast(`✅ Berhasil membeli ${uid}! Mengarahkan ke WA...`, "success");
                        setTimeout(() => {
                            sendToWA(uid, price);
                        }, 500);
                    }
                } else {
                    showToast("❌ Koin tidak cukup! Silakan topup terlebih dahulu.", "error");
                }
            });
        });
    }

    function showToast(msg, type) {
        let toast = document.createElement("div");
        toast.className = "toast-msg";
        toast.innerText = msg;
        if(type === "error") {
            toast.style.background = "#3a1a1a";
            toast.style.borderColor = "#ff4444";
            toast.style.color = "#ff8888";
        }
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    function initModal() {
        let modal = document.getElementById("topupModal");
        let openBtn = document.getElementById("openTopupModal");
        let closeBtn = document.getElementById("closeModal");
        if(openBtn) openBtn.onclick = () => { if(modal) modal.style.display = "flex"; };
        if(closeBtn) closeBtn.onclick = () => { if(modal) modal.style.display = "none"; };
        window.onclick = (e) => { if(e.target === modal) modal.style.display = "none"; };
        
        let copyBtn = document.getElementById("copyKodeBtn");
        if(copyBtn) {
            copyBtn.onclick = () => {
                navigator.clipboard.writeText(userKodeAkun);
                showToast("Kode akun tersalin!", "success");
            };
        }
    }

    window.tambahKoinByKode = function(kodeAkun, jumlahKoin) {
        if(kodeAkun === userKodeAkun) {
            userKoin += jumlahKoin;
            saveKoin();
            showToast(`✨ +${jumlahKoin.toLocaleString('id-ID')} koin masuk!`, "success");
            return true;
        }
        return false;
    };

    window.requestTopup = function(jumlahKoin) {
        pendingTopups.push({ kodeAkun: userKodeAkun, jumlah: jumlahKoin, status: "pending", waktu: new Date().toISOString() });
        savePending();
        showToast("Permintaan topup dikirim ke admin", "success");
    };

    loadData();
    initModal();
})();
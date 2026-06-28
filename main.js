// --- 1. THREE.JS BACKGROUND ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 700;
const posArray = new Float32Array(particlesCount * 3);
for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 15; 
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.04, color: 0x00ff88, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending
});
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

const linesMaterial = new THREE.LineBasicMaterial({
    color: 0x00cc6a, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending
});
const linesGeometry = new THREE.BufferGeometry();
const linesPosArray = new Float32Array(particlesCount * 3);
for(let i = 0; i < particlesCount * 3; i++) { linesPosArray[i] = posArray[i]; }
linesGeometry.setAttribute('position', new THREE.BufferAttribute(linesPosArray, 3));
const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
scene.add(linesMesh);
camera.position.z = 5;

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
});

const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = elapsedTime * 0.02;
    linesMesh.rotation.y = elapsedTime * 0.05;
    linesMesh.rotation.x = elapsedTime * 0.02;
    camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- 2. MULTI-LANGUAGE SUPPORT ---
const dict = {
    tr: {
        nav_story: "Vizyon", nav_dashboard: "Dashboard", nav_architecture: "Mimari", nav_team: "Ekip", nav_github: "GitHub'da İncele",
        hero_badge: "🚀 Yeni Monolitik Mimari Yayında", hero_title: "Yeni Nesil <br><span class='highlight-text'>Gerçek Zamanlı</span> Koruma",
        hero_desc: "Windows ETW altyapısını kullanan, Rust tabanlı düşük kaynak tüketimli ve olay güdümlü Uç Nokta Tespit ve Yanıt (EDR) Platformu. Modern SOC standartlarında, üretime hazır güvenli müdahale.",
        hero_btn1: "Sistemi İncele", hero_btn2: "Projeyi Görüntüle",
        story_title_1: "Neden",
        story_p1: "Geleneksel antivirüs programlarının devri kapanıyor. Günümüzde karmaşık tehdit aktörleri, imza tabanlı korumaları atlatarak RAT (Uzaktan Erişim Truva Atı) ve benzeri saldırılarla sistemlere sızıyor. Mevcut güvenlik çözümleri ise bu modern tehditleri ya gözden kaçırıyor ya da sistemi aşırı yorarak performansı düşürüyor.",
        story_p2: "SentraEDR olarak bu çıkmaza yeni bir standart getiriyoruz. Sadece statik dosyaları değil, sistemdeki <strong>\"davranışları\"</strong> proaktif olarak analiz ediyoruz. Windows ETW (Event Tracing for Windows) altyapısının kalbine entegre çalışarak, şüpheli bir aktivite gerçekleştiği an milisaniyeler içinde tespit ediyor ve müdahale ediyoruz.",
        story_p3: "Güvenlikten ödün vermeden maksimum performans sağlamak için çekirdeğimizi Rust ile inşa ettik. Sıfır gecikmeli monolitik mimarimiz sayesinde arka plandaki tespit motorumuz kesintisiz çalışır. <em>Kullanıcı arayüzünde (UI) beklenmedik bir kesinti yaşansa dahi, tespit motorumuz sistemi korumaya tavizsiz bir şekilde devam eder.</em>",
        term_title: "Sıfır Kurulum, <span class='highlight'>Maksimum Güç</span>", term_desc: "Monolitik mimari sayesinde tek bir komutla tüm motoru ve arayüzü ayağa kaldırın.",
        dash_title: "Gerçek Zamanlı <span class='highlight'>Görünürlük</span>", dash_desc: "Tauri tabanlı şık ve modern arayüz ile sisteminizdeki her detayı anlık olarak izleyin.",
        dash_engine: "Engine Active", dash_cpu: "CPU Kullanımı", dash_events: "Olay / Saniye", dash_threats: "Engellenen Tehdit", dash_mem: "Bellek Kullanımı",
        dash_proc: "Süreç İzleyici", dash_proc_name: "Süreç Adı", dash_proc_int: "Bütünlük",
        dash_timeline: "Tespit Zaman Çizelgesi", dash_alert1: "explorer.exe içinde şüpheli uzaktan thread (iş parçacığı) oluşturuldu.", dash_alert2: "Bilinen bir C2 sunucusuna giden bağlantı tespit edildi.",
        btn_inv: "İncele", btn_block: "Süreci Engelle",
        arch_title: "Kesintisiz <span class='highlight'>Veri Akışı</span>", arch_desc: "Windows Çekirdeğinden Güvenli İyileştirmeye (Safe Remediation) uzanan uçtan uca mimarimiz.",
        arch_1: "Windows İşletim Sistemi", arch_1_d: "Sistem Çağrıları", arch_2: "ETW Altyapısı", arch_2_d: "Olay Günlükleri", arch_3: "Rust Motoru", arch_3_d: "Davranışsal Analiz", arch_4: "Müdahale", arch_4_d: "Güvenli İyileştirme",
        feat_title: "Dünya Standartlarında <span class='highlight'>Yenilikçi Özellikler</span>",
        feat_1: "Tekil EXE (Monolitik)", feat_1_d: "Kernel/ETW motoru ve Tauri arayüzü aynı yürütülebilir dosyada birleştirildi.",
        feat_2: "Sıfır İletişim Gecikmesi", feat_2_d: "IPC boruları yerine bellek üzerinden doğrudan iletişim ile 0 gecikmeli veri aktarımı.",
        feat_3: "Güvenlik İzinleri & UAC", feat_3_d: "Doğrudan yönetici ayrıcalıklarıyla (requireAdministrator) çalışarak derin sistem erişimi.",
        team_title: "<span class='highlight'>QUE SERA</span> Ekibi", team_desc: "SentraEDR platformunu hayata geçiren siber güvenlik ve yazılım mühendisliği ekibi.",
        beta_title: "Beta Sürecine Katılın", beta_desc: "SentraEDR'nin erken erişim sürümünü denemek ve geliştirmemize katkıda bulunmak için e-posta adresinizi bırakın.",
        beta_btn: "Gönder", foot_slogan: "Geleceğin EDR Platformu", foot_links: "Bağlantılar", foot_copy: "Tüm hakları saklıdır.",
        hero_btn_sim: "Canlı Saldırı Simüle Et"
    },
    en: {
        nav_story: "Vision", nav_dashboard: "Dashboard", nav_architecture: "Architecture", nav_team: "Team", nav_github: "View on GitHub",
        hero_badge: "🚀 New Monolithic Architecture Live", hero_title: "Next-Gen <br><span class='highlight-text'>Real-Time</span> Protection",
        hero_desc: "Event-driven, low-resource Endpoint Detection and Response (EDR) Platform based on Rust, utilizing Windows ETW. Modern SOC standards, production-ready safe remediation.",
        hero_btn1: "Explore System", hero_btn2: "View Project",
        story_title_1: "Why",
        story_p1: "The era of traditional antivirus programs is closing. Today, complex threat actors bypass signature-based protections to infiltrate systems with RATs and similar attacks. Existing security solutions either miss these modern threats or heavily degrade system performance.",
        story_p2: "As SentraEDR, we bring a new standard to this deadlock. We proactively analyze <strong>\"behaviors\"</strong> in the system, not just static files. By integrating into the heart of the Windows ETW infrastructure, we detect and intervene in suspicious activities within milliseconds.",
        story_p3: "To ensure maximum performance without compromising security, we built our core with Rust. Thanks to our zero-latency monolithic architecture, our background detection engine runs continuously. <em>Even if there is an unexpected crash in the UI, our detection engine continues to protect the system uncompromisingly.</em>",
        term_title: "Zero Setup, <span class='highlight'>Maximum Power</span>", term_desc: "Boot up the entire engine and interface with a single command thanks to monolithic architecture.",
        dash_title: "Real-Time <span class='highlight'>Visibility</span>", dash_desc: "Monitor every detail in your system instantly with the sleek and modern Tauri-based interface.",
        dash_engine: "Engine Active", dash_cpu: "CPU Usage", dash_events: "Events / Sec", dash_threats: "Blocked Threats", dash_mem: "Memory Usage",
        dash_proc: "Process Monitor", dash_proc_name: "Process Name", dash_proc_int: "Integrity",
        dash_timeline: "Detection Timeline", dash_alert1: "Suspicious remote thread created in explorer.exe.", dash_alert2: "Outbound connection to known C2 server detected.",
        btn_inv: "Investigate", btn_block: "Block Process",
        arch_title: "Seamless <span class='highlight'>Data Flow</span>", arch_desc: "Our end-to-end architecture extending from the Windows Kernel to Safe Remediation.",
        arch_1: "Windows OS", arch_1_d: "System Calls", arch_2: "ETW Infrastructure", arch_2_d: "Event Logs", arch_3: "Rust Engine", arch_3_d: "Behavioral Analysis", arch_4: "Intervention", arch_4_d: "Safe Remediation",
        feat_title: "World-Class <span class='highlight'>Innovative Features</span>",
        feat_1: "Single EXE (Monolithic)", feat_1_d: "Kernel/ETW engine and Tauri interface merged into the same executable.",
        feat_2: "Zero Comms Latency", feat_2_d: "0 latency data transfer via direct memory communication instead of IPC pipes.",
        feat_3: "Security Permissions & UAC", feat_3_d: "Deep system access by running directly with administrator privileges.",
        team_title: "<span class='highlight'>QUE SERA</span> Team", team_desc: "The cybersecurity and software engineering team that brought SentraEDR to life.",
        beta_title: "Join the Beta", beta_desc: "Leave your email to try the early access version of SentraEDR and contribute to its development.",
        beta_btn: "Submit", foot_slogan: "The EDR Platform of the Future", foot_links: "Links", foot_copy: "All rights reserved.",
        hero_btn_sim: "Simulate Live Attack"
    }
};

const btnTr = document.getElementById('lang-tr');
const btnEn = document.getElementById('lang-en');
let currentLang = 'tr';

function applyLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(dict[lang][key]) el.innerHTML = dict[lang][key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if(lang === 'en' && key === 'beta_input') el.placeholder = "Your Email Address";
        if(lang === 'tr' && key === 'beta_input') el.placeholder = "E-Posta Adresiniz";
    });
}

btnTr.addEventListener('click', () => {
    currentLang = 'tr';
    btnTr.classList.add('active'); btnEn.classList.remove('active');
    applyLanguage('tr');
});
btnEn.addEventListener('click', () => {
    currentLang = 'en';
    btnEn.classList.add('active'); btnTr.classList.remove('active');
    applyLanguage('en');
});

// --- 3. TERMINAL ANIMATION ---
const termLines = [
    "<span class='dim'>[+] Elevating privileges...</span>",
    "Running as NT AUTHORITY\\SYSTEM",
    "<span class='dim'>[+] Initializing SentraEDR Monolithic Core...</span>",
    "Loading behavioral signatures from memory... <span class='dim'>DONE</span>",
    "Binding to Windows ETW Provider... <span class='dim'>OK (Zero-Latency mode)</span>",
    "<span class='dim'>[+] Spawning Tauri UI Thread...</span>",
    "<span class='dim'>[+]</span> <span class='err'>ALERT:</span> SentraEDR engine is active and protecting this endpoint.",
    "Awaiting events... <span class='cursor'></span>"
];
const twContainer = document.getElementById('typewriter');
let lineIdx = 0;

function typeTerminal() {
    if (lineIdx < termLines.length) {
        const div = document.createElement('div');
        div.className = 'terminal-line';
        div.innerHTML = termLines[lineIdx];
        
        // Remove cursor from previous line if it exists
        const prevCursor = twContainer.querySelector('.cursor');
        if(prevCursor) prevCursor.remove();

        twContainer.appendChild(div);
        lineIdx++;
        setTimeout(typeTerminal, Math.random() * 800 + 400); // Random delay 400-1200ms
    }
}
// Start typing when terminal is in view
const observer = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting && lineIdx === 0) {
        typeTerminal();
    }
}, { threshold: 0.5 });
observer.observe(document.getElementById('terminal-section'));

// --- 4. LIVE DASHBOARD SIMULATION ---
const cpuEl = document.getElementById('live-cpu');
const memEl = document.getElementById('live-mem');
const eventsEl = document.getElementById('live-events');
let baseEvents = 1452;

setInterval(() => {
    // fluctuate CPU between 22.0 and 29.5
    const cpu = (22 + Math.random() * 7.5).toFixed(1);
    cpuEl.innerText = cpu;

    // fluctuate RAM slightly
    const mem = (14.2 + (Math.random() - 0.5)).toFixed(1);
    memEl.innerText = mem;

    // Increment events realistically
    baseEvents += Math.floor(Math.random() * 5);
    eventsEl.innerText = baseEvents.toLocaleString();
}, 2000);

// --- 5. ATTACK SIMULATION LOGIC ---
const btnSimulate = document.getElementById('btn-simulate');
const shieldOverlay = document.getElementById('shield-overlay');
const shieldText = document.getElementById('shield-text');
let isSimulating = false;

btnSimulate.addEventListener('click', () => {
    if(isSimulating) return;
    isSimulating = true;
    
    // Scroll to terminal to see the action
    document.getElementById('terminal-section').scrollIntoView({ behavior: 'smooth' });
    
    // 1. Change Three.js colors to red
    particlesMaterial.color.setHex(0xff0000);
    linesMaterial.color.setHex(0xff0000);
    
    // 2. Hack the terminal
    twContainer.innerHTML = '';
    let attackLogs = [
        "<span class='err'>[FATAL] Unauthorized Access Detected!</span>",
        "<span class='err'>[FATAL] RAT Injection in memory...</span>",
        "<span class='err'>[WARNING] Privilege escalation attempted.</span>",
        "<span class='err'>[CRITICAL] Connecting to C2 server: 192.168.x.x</span>",
        "<span class='err'>[FATAL] Encryption payload dropping...</span>"
    ];
    
    let simIdx = 0;
    lineIdx = 999; // Stop normal typing
    
    function typeAttack() {
        if(simIdx < attackLogs.length) {
            const div = document.createElement('div');
            div.className = 'terminal-line';
            div.innerHTML = attackLogs[simIdx];
            twContainer.appendChild(div);
            simIdx++;
            setTimeout(typeAttack, 250); // Fast typing
        } else {
            setTimeout(triggerRemediation, 800);
        }
    }
    
    setTimeout(typeAttack, 500); // Start after slight delay for scroll
    
    function triggerRemediation() {
        // Show Shield overlay (Red first)
        shieldOverlay.className = 'shield-overlay active red-mode';
        shieldText.innerText = currentLang === 'tr' ? "SentraEDR Müdahale Ediyor..." : "SentraEDR Intervening...";
        
        setTimeout(() => {
            // Turn Green
            particlesMaterial.color.setHex(0x00ff88);
            linesMaterial.color.setHex(0x00cc6a);
            
            shieldOverlay.className = 'shield-overlay active green-mode';
            shieldText.innerText = currentLang === 'tr' ? "Tehdit Başarıyla İzole Edildi!" : "Threat Successfully Isolated!";
            
            // Add green log to terminal
            const div = document.createElement('div');
            div.className = 'terminal-line';
            div.innerHTML = "<br><span style='color: #00ff88'>[+] SentraEDR SAFE REMEDIATION ACTIVE</span><br><span style='color: #00ff88'>[+] Process Suspended. Network Cut. Registry Restored.</span><br><span class='cursor'></span>";
            twContainer.appendChild(div);
            
            // Hide overlay after 3s
            setTimeout(() => {
                shieldOverlay.className = 'shield-overlay hidden';
                isSimulating = false;
            }, 3000);
            
        }, 1500);
    }
});

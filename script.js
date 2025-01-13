// Three.js değişkenleri
let scene, camera, renderer, model, controls;
let mixer, clock;
let activeState = null;

// Harita verilerini tutacak nesne
const mapData = {
    "1100AD": {
        mapImage: "./maps/1100AD.png",
        states: {
            "Bizans İmparatorluğu": {
                coordinates: "678,1740,723,1901,501,1981,507,2231,507,2451,763,2459,1013,2601,1218,2633,1275,2371,1189,2100,1377,2043,1615,1890,1769,1748,1763,1416,1786,1286,1598,990,1501,887,1530,798,1638,804,1820,821,1849,793,1923,787,1968,833,2349,787,2486,742,2702,662,2838,588,3014,662,3213,747,3361,810,3566,753,4163,776,4328,798,4538,736,4566,679,4498,622,4203,554,4174,508,4078,508,3952,508,3879,395,3839,321,3674,344,3549,264,3509,184,3441,190,2861,167,2457,338,2304,457,2213,531,2002,582,1752,520,1701,594,1582,571,1542,508,1366,474,1206,423,962,230,888,25,143,25,149,577,217,656,382,662,427,679,217,827,189,1151,240,1202,427,1179,399,1344,416,1492,569,1554",
                wikiUrl: "https://islamansiklopedisi.org.tr/bizans",
                coinModel: "./models/bizans_coin.obj"
            },
            "Anadolu Selçuklu Devleti": {
                coordinates: "1563,800,1495,851,1591,982,1682,1158,1779,1284,1756,1744,1193,2108,1250,2341,1205,2608,1154,2677,1131,2756,1199,2859,1381,2938,1591,2933,1654,2836,1716,2796,1790,2699,1819,2626,2058,2688,2302,2790,2404,2916,2495,3041,2655,3046,2831,3024,3013,2995,3212,2836,3411,2705,3450,2677,3525,2769,3684,2745,3769,2728,3843,2637,3196,2195,2558,2297,3951,2678,3951,2803,3826,2911,3878,3014,4020,3042,4173,3002,4315,2911,4366,2735,4361,2496,4355,2075,4179,1797,3946,1626,3741,1654,3309,1604,3059,1433,3059,1154,3150,916,3263,830,3332,785,2826,603,2502,751,2195,819,1888,802,1774,825",
                wikiUrl: "https://islamansiklopedisi.org.tr/selcuklular#2-anadolu-selcuklulari",
                coinModel: "./models/selcuklu_coin.obj"
            },
            "Artukular": {
                coordinates: "4986,2138,4946,2252,4821,2309,4605,2360,4588,2457,4588,2548,4634,2707,4719,2798,4668,3008,4759,3082,4833,3116,4929,3128,5071,3111,5168,3133,5305,3093,5686,3099,5839,3054,5879,2946,5879,2769,5930,2684,6101,2684,6265,2724,6430,2747,6430,1973,6317,1928,6157,1808,6010,1678,5879,1649,5794,1655,5731,1604,5435,1757,5191,1871",
                wikiUrl: "https://islamansiklopedisi.org.tr/artuklular",
                coinModel: "./models/artuklu_coin.obj"
            }
        }
    },
    "1330AD": {
        mapImage: "maps/1330AD.png",
        states: {
            "Osmanoğulları": {
                coordinates: "1274,489,1217,591,1330,688,1541,699,1564,739,1416,745,1183,779,1148,830,1256,853,1228,910,1120,910,978,904,1023,995,1058,1103,1040,1188,1171,1245,1239,1331,1302,1279,1325,1234,1416,1183,1484,1188,1558,1132,1763,1194,1785,1154,1831,1166,2024,1132,2149,1160,2195,1154,2269,1063,2331,1029,2399,1080,2450,1149,2473,1302,2689,1217,2712,927,2814,842,2752,682,2831,603,2877,500,2877,426,2581,279,2576,227,2507,227,2428,301,2132,449,2121,506,2075,546,1956,552,1820,552,1729,494,1649,535,1502,517,1371,483,1330,495",
                wikiUrl: "https://islamansiklopedisi.org.tr/osmanlilar",
                coinModel: "models/osmanli_coin.obj"
            },
            "Karamanoğulları": {
                coordinates: "2490,1302,2411,1353,2217,1416,2149,1518,2200,1552,2314,1604,2382,1683,2456,1723,2547,1859,2576,1916,2530,1985,2405,2019,2297,2053,2200,2081,2257,2201,2166,2240,2149,2320,2274,2485,2320,2570,2303,2752,2399,2826,2513,2980,2667,3031,2865,2997,3002,2963,3127,2889,3235,2747,3155,2570,3173,2422,3389,2303,3622,2127,3656,1962,3582,1888,3468,1894,3343,1763,3394,1558,3451,1376,3400,1234,3212,1251,3173,1291,2991,1188,2627,1217",
                wikiUrl: "https://islamansiklopedisi.org.tr/karamanogullari",
                coinModel: "models/karamanoglu_coin.obj"
            },
            "Bizans İmparatorluğu": {
                coordinates: "1239,495,1160,603,1057,626,870,563,750,609,654,603,557,745,398,819,159,1035,148,939,341,779,102,774,5,649,11,336,324,142,676,12,790,40,859,131,870,307",
                wikiUrl: "https://islamansiklopedisi.org.tr/bizans",
                coinModel: "./models/bizans_coin.obj"
            }
        }
    },
    "1500AD": {
        mapImage: "maps/1500AD.png",
        states: {
            "Osmanlı İmparatorluğu": {
                wikiUrl: "https://islamansiklopedisi.org.tr/osmanlilar",
                coinModel: "models/osmanli_coin.obj"
            }
        }
    }
};

const timelineData = {
    "1100AD": {
        summary: "1100 yılında Anadolu Selçuklu Devleti, Anadolu'nun büyük bir kısmına hakimdir. Bizans İmparatorluğu ise batı kıyılarında varlığını sürdürmektedir.",
        legend: [
            { color: "#FFB6C1", name: "Anadolu Selçuklu Devleti" },
            { color: "#87CEEB", name: "Bizans İmparatorluğu" }
        ]
    },
    "1330AD": {
        summary: "1330 yılında Anadolu'da beylikler dönemi yaşanmaktadır. Osmanoğulları ve Karamanoğulları önemli beylikler arasındadır. Bizans İmparatorluğu ise batıda varlığını sürdürmektedir.",
        legend: [
            { color: "#FFB6C1", name: "Osmanoğulları" },
            { color: "#98FB98", name: "Karamanoğulları" },
            { color: "#87CEEB", name: "Bizans İmparatorluğu" }
        ]
    },
    "1500AD": {
        summary: "1500 yılında Osmanlı İmparatorluğu Anadolu'nun tamamına hakimdir. İstanbul'un fethi sonrası güçlenen imparatorluk, üç kıtaya yayılmıştır.",
        legend: [
            { color: "#FFB6C1", name: "Osmanlı İmparatorluğu" }
        ]
    }
};

// DOM yüklendikten sonra çalışacak şekilde düzenleyelim
document.addEventListener('DOMContentLoaded', function() {
    // DOM elementlerini seçme
    const timelineButtons = document.querySelectorAll('.timeline-btn');
    const mapContainer = document.getElementById('map');
    const infoPanel = document.querySelector('.info-panel');
    const modelModal = document.getElementById('modelModal');
    const closeButtons = document.querySelectorAll('.close');
    const infoCloseButton = document.querySelector('.info-close');
    const view3DButton = document.getElementById('view3DButton');
    const stateName = document.getElementById('stateName');
    const wikiFrame = document.getElementById('wikiFrame');

    // Varsayılan yılı ayarla ve haritayı yükle
    const defaultYear = '1100AD';
    loadMap(defaultYear);
    
    // Timeline butonlarına tıklama olayını ekle
    timelineButtons.forEach(button => {
        button.addEventListener('click', function() {
            const year = this.getAttribute('data-year');
            // Aktif butonu güncelle
            timelineButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Haritayı güncelle
            loadMap(year);
        });
    });

    // Bilgi panelini kapatma
    if (infoCloseButton) {
        infoCloseButton.addEventListener('click', function() {
            if (infoPanel) {
                infoPanel.classList.remove('active');
                if (wikiFrame) {
                    wikiFrame.src = 'about:blank';
                }
            }
        });
    }

    // Harita dışı tıklamaları dinle
    document.addEventListener('click', function(e) {
        // Eğer tıklanan element harita veya bilgi paneli değilse
        if (!e.target.closest('#map') && !e.target.closest('.info-panel')) {
            // Bilgi panelini kapat
            if (infoPanel) {
                infoPanel.classList.remove('active');
                if (wikiFrame) {
                    wikiFrame.src = 'about:blank';
                }
            }
        }
    });

    // 3D model görüntüleme
    if (view3DButton) {
        view3DButton.addEventListener('click', function() {
            if (activeState && modelModal) {
                const currentYear = document.querySelector('.timeline-btn.active').getAttribute('data-year');
                const modelPath = mapData[currentYear].states[activeState].coinModel;
                modelModal.style.display = 'block';
                init3DViewer();
                loadModel(modelPath);
            }
        });
    }

    // Modal kapatma
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                if (renderer) {
                    renderer.dispose();
                    document.getElementById('model-viewer').innerHTML = '';
                }
            }
        });
    });
});

// Harita yükleme fonksiyonu
function loadMap(year) {
    const mapImage = document.querySelector('#map img');
    if (mapImage) {
        mapImage.src = `./maps/${year}.png`;
        mapImage.onload = () => {
            setupMapInteraction(year);
        };
    }
}

// Harita etkileşimini kurma
function setupMapInteraction(year) {
    const mapContainer = document.querySelector('#map');
    const mapImage = mapContainer.querySelector('img');

    if (!mapContainer || !mapImage) return;

    // Önceki event listener'ları temizle
    mapImage.replaceWith(mapImage.cloneNode(true));
    const newMapImage = mapContainer.querySelector('img');

    newMapImage.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const scaleX = this.naturalWidth / rect.width;
        const scaleY = this.naturalHeight / rect.height;
        
        const actualX = Math.round(x * scaleX);
        const actualY = Math.round(y * scaleY);

        const states = mapData[year].states;
        for (const [stateName, stateData] of Object.entries(states)) {
            if (stateData.coordinates && isPointInState(actualX, actualY, stateData.coordinates)) {
                showStateInfo(stateName, stateData);
                break;
            }
        }
    });
}

function isPointInState(x, y, coordinates) {
    if (!coordinates) return false;
    
    const points = coordinates.split(',').map(Number);
    const vertices = [];
    
    for (let i = 0; i < points.length; i += 2) {
        vertices.push([points[i], points[i + 1]]);
    }
    
    return isPointInPolygon(x, y, vertices);
}

function isPointInPolygon(x, y, vertices) {
    let inside = false;
    
    for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
        const xi = vertices[i][0], yi = vertices[i][1];
        const xj = vertices[j][0], yj = vertices[j][1];
        
        const intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            
        if (intersect) inside = !inside;
    }
    
    return inside;
}

// Devlet bilgilerini gösterme
function showStateInfo(name, data) {
    const infoPanel = document.querySelector('.info-panel');
    const stateName = document.getElementById('stateName');
    const wikiFrame = document.getElementById('wikiFrame');
    
    if (infoPanel && stateName && wikiFrame) {
        stateName.textContent = name;
        wikiFrame.src = data.wikiUrl;
        activeState = name;
        infoPanel.classList.add('active');
    }
}

// 3D viewer başlatma
function init3DViewer() {
    console.log('3D viewer başlatılıyor'); // Debug için log
    const container = document.getElementById('model-viewer');
    
    if (!container) {
        console.error('model-viewer container bulunamadı');
        return;
    }

    // Scene oluştur
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2a2a2a);
    
    // Camera oluştur
    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 4;
    
    // Renderer oluştur
    renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        precision: 'highp',
        alpha: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    
    // Işıklandırma
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);
    
    // Kontroller
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    
    // Animasyon döngüsü
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}

// Model yükleme
function loadModel(modelPath) {
    console.log('Model yükleniyor:', modelPath); // Debug için log
    
    if (!scene) {
        console.error('Scene henüz oluşturulmadı');
        return;
    }

    const loader = new THREE.OBJLoader();
    
    if (model) {
        scene.remove(model);
        model = null;
    }
    
    const material = new THREE.MeshPhysicalMaterial({
        color: 0xb87333,
        metalness: 0.9,
        roughness: 0.3,
        reflectivity: 0.8,
        clearcoat: 0.3,
        clearcoatRoughness: 0.2
    });
    
    try {
        loader.load(
            modelPath,
            function(object) {
                console.log('Model başarıyla yüklendi');
                model = object;
                
                model.traverse(function(child) {
                    if (child instanceof THREE.Mesh) {
                        child.material = material;
                    }
                });
                
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
                
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 2.5 / maxDim;
                
                model.scale.multiplyScalar(scale);
                model.position.sub(center.multiplyScalar(scale));
                
                scene.add(model);
                
                console.log('Model sahneye eklendi');
            },
            function(xhr) {
                console.log(`Yükleme ilerlemesi: ${(xhr.loaded / xhr.total * 100)}%`);
            },
            function(error) {
                console.error('Model yükleme hatası:', error);
            }
        );
    } catch (error) {
        console.error('Model yükleme işlemi başlatılırken hata:', error);
    }
}

// Aktif yılı alma
function getCurrentYear() {
    const activeButton = document.querySelector('.timeline button.active');
    return activeButton ? activeButton.dataset.year : '1100AD';
}

// Pencere boyutu değiştiğinde
window.addEventListener('resize', function() {
    const container = document.getElementById('model-viewer');
    if (renderer && camera) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }
}); 
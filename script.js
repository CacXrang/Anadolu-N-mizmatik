// Three.js değişkenleri
let scene, camera, renderer, model, controls;
let mixer, clock;
let activeState = null;

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
            "Artuklu Devleti": {
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
    "1600AD": {
        mapImage: "maps/1600AD.png",
        states: {
            "Osmanlı İmparatorluğu": {
                coordinates: "445,51,19,290,2,699,81,1393,224,2070,587,2786,1457,3002,2891,3054,3578,2775,3754,3235,6415,3241,6422,705,6011,204,5392,574,4988,455,4840,602,4522,443,4130,358,3709,153,3419,17,2708,74,2049,455,1082,415,878,0,651,0",
                wikiUrl: "https://islamansiklopedisi.org.tr/osmanlilar",
                coinModel: "./models/osmanli_coin.obj"
            }
        }
    }
};

const timelineData = {
    "1100AD": {
        summary: "1100 yılında Anadolu'da çeşitli medeniyetler hüküm sürmüştür. Seçilen bölgeye tıklayarak detaylı bilgi alabilirsiniz."
    },
    "1330AD": {
        summary: "1330 yılında Anadolu'da beylikler dönemi yaşanmaktadır. Osmanoğulları ve Karamanoğulları önemli beylikler arasındadır."
    },
    "1600AD": {
        summary: "1600 yılında Osmanlı İmparatorluğu en güçlü dönemindedir ve üç kıtaya yayılmıştır."
    }
};

const coinInfo = {
    "artuklu_coin": {
        title: "Artuklu Bakır Sikkesi",
        details: {
            physical: {
                material: "Bakır",
                diameter: "2.7 cm",
                weight: "7.20 gr",
                thickness: "2 mm"
            },
            historical: {
                period: "Mardin Artukluları (1108-1408)",
                ruler: "Nasır el-Dîn Artuk Arslan (1200-1239)",
                description: "Mardin Artuklu hükümdarı Nasır el-Din Artuk Arslan dönemine tarihlenen bu örnekteki figürün bir tahtta gösteriliyor olmasından dolayı diğerlerinden ayrılmaktadır. Türk kültüründe çok eskilere dayanan bağdaş kurma pozisyonu şeklinde gösterilen figür, sikkenin merkezine yerleştirilmiştir."
            },
            inscriptions: {
                front: {
                    text: "ارتق ارسالن (Artuk Arslan)",
                    description: "Sağda: Artuk Arslan"
                },
                back: {
                    text: "ناصر لدين (Nasruddin)",
                    description: "Solda: Nasruddin, Anlamı: Dinin yardımcısı Artuk Arslan"
                },
                additional: "el-İmam'ül-Müstansır Emirû'l-Mü'minin el-Melikü'l-Kamil (Müminlerin emiri, imamı Müstansır Billâh, kusursuz melik Muhammed)"
            }
        }
    },
    "selcuklu_coin": {
        title: "Anadolu Selçuklu Sikkesi",
        details: {
            museum: {
                arrivalDate: "21.11.2017",
                acquisitionInfo: "İbrahim Şen'den satın alma. Denizli-Çardak"
            },
            material: "Gümüş",
            technique: "Dövme (Darp)",
            scriptStyle: "Sülüs",
            diameter: "2.4 cm",
            weight: "2.93 gr",
            inscriptions: {
                front: {
                    text: "Lâ İlâhe İllallâh Muhammedün Resûlullâh el-imâmu'l-Musta'sım Bi'llâh Emîrü'l-Mü'minîn Duribe sene hamse hamsin sittemi'e.",
                    description: "Yatay çizgiyle ortadan ikiye bölünen sikkenin üst kısmında 'Allah'tan başka ilah yoktur, Muhammed O'nun elçisidir. Müminlerin Emiri' alt kısımda ise Rakamlar divani harfle verilmiştir. En üstte simetrik rumi motifine yer verilmiştir. Yazıların arasında tirfil ve noktalar bulunmaktadır."
                },
                back: {
                    text: "Es-Selâtinü'l eâzım İzzü'd-dünyâ ve'd-dîn Keykavus ve Rüknü'd-dünyâ ve'd-dîn Kılıçarslan ve Alâü'd-dünyâ ve'd-dîn Keykubad benü Keyhüsrev berâhin emîrü'l mü'minîn.",
                    description: "Beş satırlık yatay yazıda 'En büyük sultanlar din ve dünyanın izzeti Keykavus, din ve dünyanın direği Kılıç Arslan, Keyhüsrev oğlu din ve dünyanın temsilcisi Keykubad müminlerin emirinin delilleri' yazmaktadır. En üstte simetrik rumi motifine yer verilmiştir. Harf aralarını yer yer tirfiller doldurmaktadır."
                }
            }
        }
    },
    "karamanoglu_coin": {
        title: "Karamanoğulları Dirhemi",
        details: {
            type: "AR, Dirhem",
            mint: "Larende",
            date: "H.822 (YKB-511)",
            diameter: "20 mm",
            weight: "1.30 gr",
            inscriptions: {
                front: {
                    text: "Duribe Larende Ali bin Aladdin halled'Allahü mülkehu",
                    description: "Larende'de darp edildi. Ali bin Alaaddin, Allah mülkünü daim etsin"
                },
                back: {
                    text: "Es- Sultan El- Melik El –Müeyyed Ebu'l Nasır Şeyh azze nasruhu",
                    description: "Sultan, Melik, Müeyyed Ebu'l Nasır Şeyh, zaferi aziz olsun"
                }
            }
        }
    },
    "osmanli_coin": {
        title: "Osmanlı Akçesi",
        details: {
            catalogInfo: {
                number: "13",
                location: "Sinop Arkeoloji Müzesi",
                inventoryNumber: "1.82.013",
                acquisitionInfo: "Hibe (Ali Rıza Ünlü)",
                storageLocation: "Depo",
                photoNumber: "13-13A",
                drawingNumber: "13-13A"
            },
            physical: {
                material: "Gümüş",
                type: "Akçe",
                diameter: "13 mm",
                weight: "1.1 gr"
            },
            historical: {
                dateHijri: "H.816-824",
                dateCE: "M.1413-1421",
                mintPlace: "Amasya",
                mintDate: {
                    hijri: "H.816",
                    ce: "M.1413"
                },
                scriptStyle: "Sülüs"
            }
        }
    },
    "bizans_coin": {
        title: "Bizans Solidusu",
        details: {
            physical: {
                material: "Altın",
                type: "Solidus"
            },
            historical: {
                period: "Bizans İmparatorluğu",
                rulers: "VII. Konstantinos ve II. Romanus Dönemi"
            },
            inscriptions: {
                front: {
                    description: "Sağ elini havaya kaldırmış, sol elinde İncil tutan, tunik ve başpiskopos cübbesi giyen İsa motifi bulunmaktadır."
                },
                back: {
                    description: "Haç tutan VII. Konstantinos ve II. Romanus motifi bulunmaktadır."
                }
            }
        }
    }
};

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

    
    const defaultYear = '1100AD';
    const defaultButton = document.querySelector(`[data-year="${defaultYear}"]`);
    if (defaultButton) {
        defaultButton.classList.add('active');
        loadMap(defaultYear);
        setupMapInteraction(defaultYear); 
    }

    timelineButtons.forEach(button => {
        button.addEventListener('click', function() {
            const year = this.dataset.year;
            document.querySelector('.timeline-btn.active')?.classList.remove('active');
            this.classList.add('active');
            loadMap(year);
            setupMapInteraction(year);
        });
    });

   
    if (infoCloseButton) {
        infoCloseButton.addEventListener('click', function() {
            infoPanel.classList.remove('active');
            if (wikiFrame) wikiFrame.src = '';
        });
    }

    
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

   
    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');

    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', function() {
            if (camera) {
                camera.position.z *= 0.8; 
                camera.updateProjectionMatrix();
            }
        });
    }

    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', function() {
            if (camera) {
                camera.position.z *= 1.2; 
                camera.updateProjectionMatrix();
            }
        });
    }
});


function loadMap(year) {
    const mapImage = document.querySelector('#map img');
    if (mapImage) {
        mapImage.src = `./maps/${year}.png`;
        mapImage.onload = () => {
            setupMapInteraction(year);
        };
    }
}

function setupMapInteraction(year) {
    const mapContainer = document.querySelector('#map');
    const mapImage = mapContainer.querySelector('img');

    if (!mapContainer || !mapImage) return;

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

function init3DViewer() {
    const container = document.getElementById('model-viewer');
    
    if (!container) {
        console.error('model-viewer container bulunamadı');
        return;
    }

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2a2a2a);
    
    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5; 
    
    
    renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        precision: 'highp',
        alpha: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.physicallyCorrectLights = true; 
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); 
    scene.add(ambientLight);
    
    const frontLight = new THREE.DirectionalLight(0xffffff, 2);
    frontLight.position.set(0, 0, 5);
    scene.add(frontLight);
    
    const backLight = new THREE.DirectionalLight(0xffffff, 1.5);
    backLight.position.set(0, 0, -5);
    scene.add(backLight);
    
    const topLight = new THREE.DirectionalLight(0xffffff, 1.5);
    topLight.position.set(0, 5, 0);
    scene.add(topLight);
    
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.autoRotate = true; 
    controls.autoRotateSpeed = 2; 
    
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}


function loadModel(modelPath) {
    if (!scene) {
        console.error('Scene henüz oluşturulmadı');
        return;
    }

   
    const existingInfo = document.querySelector('.coin-info');
    if (existingInfo) {
        existingInfo.remove();
    }

    
    const coinId = modelPath.split('/').pop().replace('.obj', '');
    if (coinInfo[coinId]) {
        const info = coinInfo[coinId];
        const infoContainer = document.createElement('div');
        infoContainer.className = 'coin-info';
        
        let html = `<h3>${info.title}</h3><div class="coin-details">`;

       
        if (info.details.physical) {
            const physical = info.details.physical;
            html += '<div class="physical-info"><h4>Fiziksel Özellikler</h4>';
            if (physical.material) html += `<p><strong>Malzeme:</strong> ${physical.material}</p>`;
            if (physical.type) html += `<p><strong>Cins:</strong> ${physical.type}</p>`;
            if (physical.diameter) html += `<p><strong>Çap:</strong> ${physical.diameter}</p>`;
            if (physical.weight) html += `<p><strong>Ağırlık:</strong> ${physical.weight}</p>`;
            if (physical.thickness) html += `<p><strong>Kalınlık:</strong> ${physical.thickness}</p>`;
            html += '</div>';
        }

       
        if (info.details.historical) {
            const historical = info.details.historical;
            html += '<div class="historical-info"><h4>Tarihsel Bilgiler</h4>';
            if (historical.period) html += `<p><strong>Dönem:</strong> ${historical.period}</p>`;
            if (historical.rulers) html += `<p><strong>Hükümdar:</strong> ${historical.rulers}</p>`;
            if (historical.description) html += `<p><strong>Açıklama:</strong> ${historical.description}</p>`;
            html += '</div>';
        }

        
        if (info.details.inscriptions) {
            const inscriptions = info.details.inscriptions;
            html += '<div class="inscriptions"><h4>Tasvirler</h4>';
            if (inscriptions.front && inscriptions.front.description) {
                html += `<p><strong>Ön Yüz:</strong> ${inscriptions.front.description}</p>`;
            }
            if (inscriptions.back && inscriptions.back.description) {
                html += `<p><strong>Arka Yüz:</strong> ${inscriptions.back.description}</p>`;
            }
            html += '</div>';
        }

        html += '</div>';
        infoContainer.innerHTML = html;
        document.querySelector('.modal-content').appendChild(infoContainer);
    }

    const loader = new THREE.OBJLoader();
    
    if (model) {
        scene.remove(model);
        model = null;
    }
    
    
    const material = new THREE.MeshStandardMaterial({
        color: 0xb87333, 
        metalness: 0.7,  
        roughness: 0.2,  
        envMapIntensity: 1.0,
        flatShading: false
    });
    
    loader.load(
        modelPath,
        function(object) {
            model = object;
            model.traverse(function(child) {
                if (child instanceof THREE.Mesh) {
                    child.material = material;
                    child.castShadow = true;
                    child.receiveShadow = true;
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
            
            
            camera.lookAt(model.position);
        },
        undefined,
        function(error) {
            console.error('Model yükleme hatası:', error);
        }
    );
}


function getCurrentYear() {
    const activeButton = document.querySelector('.timeline-btn.active');
    return activeButton ? activeButton.dataset.year : '1100AD';
}


window.addEventListener('resize', function() {
    const container = document.getElementById('model-viewer');
    if (renderer && camera) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }
}); 
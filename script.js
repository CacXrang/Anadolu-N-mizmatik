let scene, camera, renderer, model, controls;
let mixer, clock;
let activeState = null;

const mapData = {
    "1100AD": {
        mapImage: "./maps/1100AD.png",
        states: {
            "Bizans İmparatorluğu": {
                coordinates: "678,1740,723,1901,501,1981...",
                wikiUrl: "https://islamansiklopedisi.org.tr/bizans",
                coinModel: "./models/bizans_coin.obj"
            },
            "Anadolu Selçuklu Devleti": {
                coordinates: "1563,800,1495,851,1591,982...",
                wikiUrl: "https://islamansiklopedisi.org.tr/selcuklular#2-anadolu-selcuklulari",
                coinModel: "./models/selcuklu_coin.obj"
            },
            "Artuklu Devleti": {
                coordinates: "4986,2138,4946,2252,4821,2309...",
                wikiUrl: "https://islamansiklopedisi.org.tr/artuklular",
                coinModel: "./models/artuklu_coin.obj"
            }
        }
    },
    "1330AD": {
        mapImage: "maps/1330AD.png",
        states: {
            "Osmanoğulları": {
                coordinates: "1274,489,1217,591,1330,688...",
                wikiUrl: "https://islamansiklopedisi.org.tr/osmanlilar",
                coinModel: "models/osmanli_coin.obj"
            },
            "Karamanoğulları": {
                coordinates: "2490,1302,2411,1353,2217,1416...",
                wikiUrl: "https://islamansiklopedisi.org.tr/karamanogullari",
                coinModel: "models/karamanoglu_coin.obj"
            },
            "Bizans İmparatorluğu": {
                coordinates: "1239,495,1160,603,1057,626...",
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
            weight: "7.20 gr",
            diameter: "2.7 cm",
            thickness: "2 mm",
            period: "Mardin Artukluları (1108-1408)",
            ruler: "Nasır el-Dîn Artuk Arslan (1200-1239)",
            description: `Mardin Artuklu hükümdarı Nasır el-Din Artuk Arslan dönemine tarihlenen bu örnekteki figürün bir tahtta gösteriliyor olmasından dolayı diğerlerinden ayrılmaktadır. Türk kültüründe çok eskilere dayanan bağdaş kurma pozisyonu şeklinde gösterilen figür, sikkenin merkezine yerleştirilmiştir.`,
            frontInscription: {
                right: "ارتق ارسالن (Artuk Arslan)",
                left: "ناصر لدين (Nasruddin)",
                meaning: "Dinin yardımcısı Artuk Arslan"
            },
            backInscription: "el-İmam'ül-Müstansır Emirû'l-Mü'minin el-Melikü'l-Kamil (Müminlerin emiri, imamı Müstansır Billâh, kusursuz melik Muhammed)"
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
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
        infoContainer.innerHTML = `
            <h3>${info.title}</h3>
            <div class="coin-details">
                <p><strong>Ağırlık:</strong> ${info.details.weight}</p>
                <p><strong>Çap:</strong> ${info.details.diameter}</p>
                <p><strong>Kalınlık:</strong> ${info.details.thickness}</p>
                <p><strong>Dönem:</strong> ${info.details.period}</p>
                <p><strong>Hükümdar:</strong> ${info.details.ruler}</p>
                <p><strong>Açıklama:</strong> ${info.details.description}</p>
                <div class="inscriptions">
                    <h4>Ön Yüz Yazıları:</h4>
                    <p>Sağda: ${info.details.frontInscription.right}</p>
                    <p>Solda: ${info.details.frontInscription.left}</p>
                    <p>Anlamı: ${info.details.frontInscription.meaning}</p>
                    <h4>Arka Yüz Yazısı:</h4>
                    <p>${info.details.backInscription}</p>
                </div>
            </div>
        `;
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
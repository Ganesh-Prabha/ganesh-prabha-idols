// ==============================
// ELEMENTS
// ==============================

const container = document.getElementById("idol-container");
const heightFilter = document.getElementById("heightFilter");
const priceFilter = document.getElementById("priceFilter");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxHeight = document.getElementById("lightboxHeight");
const lightboxPrice = document.getElementById("lightboxPrice");
const lightboxWhatsapp = document.getElementById("lightboxWhatsapp");
const closeLightbox = document.getElementById("closeLightbox");

let idols = [];

// ==============================
// LOAD DATA
// ==============================

fetch("idols.json")
.then(res => res.json())
.then(data => {

    idols = data;

    loadHeightFilter();

    displayIdols(idols);

});

// ==============================
// CREATE HEIGHT FILTER
// ==============================

function loadHeightFilter(){

    const heights = [...new Set(idols.map(i => i.height))];

    heights.sort((a,b)=>a-b);

    heights.forEach(h=>{

        const option=document.createElement("option");

        option.value=h;

        option.textContent=h+" Inch";

        heightFilter.appendChild(option);

    });

}

// ==============================
// DISPLAY PRODUCTS
// ==============================

function displayIdols(list){

    container.innerHTML="";

    list.forEach((idol,index)=>{

        const card=document.createElement("div");

        card.className="card";

        card.innerHTML=`

            <img
                src="${idol.image}"
                class="idol-image"
                alt="${idol.name}"
            >

            <div class="card-body">

                <h3>${idol.height} Inch</h3>

                <p class="price">
                    ₹${idol.price.toLocaleString()}
                </p>

                <a
                class="whatsapp"
                target="_blank"
                href="https://wa.me/919987936014?text=Hi, I am interested in the ${idol.height} inch Ganesh Idol.">

                WhatsApp Enquiry

                </a>

            </div>

        `;

        // OPEN IMAGE

        const image=card.querySelector(".idol-image");

        image.addEventListener("click",()=>{

            openLightbox(idol);

        });

        container.appendChild(card);

    });

}

// ==============================
// FILTERS
// ==============================

heightFilter.addEventListener("change",applyFilters);
priceFilter.addEventListener("change",applyFilters);

function applyFilters(){

    let filtered=[...idols];

    if(heightFilter.value!=""){

        filtered=filtered.filter(

            idol=>idol.height===Number(heightFilter.value)

        );

    }

    if(priceFilter.value!=""){

        const range=priceFilter.value.split("-");

        const min=Number(range[0]);

        const max=Number(range[1]);

        filtered=filtered.filter(

            idol=>idol.price>=min && idol.price<=max

        );

    }

    displayIdols(filtered);

}

// ==============================
// LIGHTBOX
// ==============================

let zoomLevel = 1;

function openLightbox(idol){

    zoomLevel = 1;

    lightbox.style.display = "flex";

    lightboxImage.src = idol.image;

    lightboxImage.style.transform = "scale(1)";

    lightboxHeight.innerText = idol.height + " Inch";

    lightboxPrice.innerText = "₹" + idol.price.toLocaleString();

    lightboxWhatsapp.href =
    `https://wa.me/919987936014?text=Hi, I am interested in the ${idol.height} inch Ganesh Idol.`;

    document.body.style.overflow = "hidden";

}

// CLOSE BUTTON

closeLightbox.addEventListener("click",closeViewer);

// CLICK OUTSIDE

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        closeViewer();

    }

});

// ESC KEY

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closeViewer();

    }

});

// Mouse wheel zoom
lightboxImage.addEventListener("wheel", function(e){

    e.preventDefault();

    if(e.deltaY < 0){
        zoomLevel += 0.2;
    }else{
        zoomLevel -= 0.2;
    }

    zoomLevel = Math.max(1, Math.min(4, zoomLevel));

    lightboxImage.style.transform = `scale(${zoomLevel})`;

});

lightboxImage.addEventListener("dblclick",()=>{

    if(zoomLevel==1){

        zoomLevel=2.5;

    }else{

        zoomLevel=1;

    }

    lightboxImage.style.transform=`scale(${zoomLevel})`;

});

function closeViewer(){

    lightbox.style.display="none";

    document.body.style.overflow="auto";

}
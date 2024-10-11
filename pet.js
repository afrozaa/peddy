// Load Categories
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => {
            console.error(error);
        });
};

// Load Pets
const loadpets = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then((res) => res.json())
        .then((data) => displaypets(data.pets))
        .catch((error) => {
            console.error(error);
        });
};



// Display Pets
const displaypets = (pets) => {
    const petContainer = document.getElementById("pets");
    pets.forEach((pet) => {
        const card = document.createElement("div");
        card.classList = "card w-80 shadow-xl flex flex-col items-center text-left border-2 pb-5";
        card.innerHTML = `
            <figure class="h-[160px] w-[300px] flex justify-center px-3 pt-5">
                <img src="${pet.image}" class="h-full w-full object-cover rounded-lg" alt="${pet.pet_name}" />
            </figure>
            <div class="px-5 text-left w-full"> 
                <h2 class="text-lg font-bold">${pet.pet_name}</h2>
                <p class="flex">Breed: ${pet.breed}</p>
                <p class="flex">Birth: ${pet.date_of_birth}</p>
                <p class="flex">Gender: ${pet.gender}</p>
                <p class="flex">Price: ${pet.price}</p>
                <div class="divider"></div>
            </div>
            <div class="w-full px-5 pb-5 flex justify-between items-center">
                <button class="btn bg-white border-1 font-bold text-[#0e7a81] border-[#0e7a81] h-[16px] w-[85px] like-btn">
                    <i class="fa-regular fa-thumbs-up"></i>
                </button>
                <button class="btn bg-white border-1 font-bold text-[#0e7a81] border-[#0e7a81] h-[16px] w-[85px]">
                    Adopt
                </button>
                <button class="btn bg-white border-1 font-bold text-[#0e7a81] border-[#0e7a81] h-[16px] w-[85px] show-details" data-pet-id="${pet.petId}">
                    Details
                </button>
            </div>
        `;
        petContainer.append(card);
    });

    // Add like button toggle functionality
    petContainer.addEventListener('click', (event) => {
        if (event.target.closest('.like-btn')) {
            const button = event.target.closest('.like-btn');
            //button.classList.toggle('#0e7a81');
            button.classList.toggle('text-[#0e7a81]');
        }

        if (event.target.closest('.show-details')) {
            const petId = event.target.closest('.show-details').getAttribute('data-pet-id');
            loadDetails(petId);
        }
    });
};



// Display Categories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");
    categories.forEach((item) => {
        const button = document.createElement("button");
        button.classList = "btn bg-white border-1 border-[#0e7a81] h-[65px] w-[260px]";
        button.id = `btn-${item.category}`; // Set ID for active class toggle
        button.innerHTML = `
            <div class="flex rounded-lg gap-2">
                <figure class="justify-center">
                    <img src="${item.category_icon}" class="h-[40px]" alt="${item.category}" />
                </figure>
                <h2 class="text-3xl font-bold">${item.category}</h2>
            </div>
        `;
        categoryContainer.append(button);
    });
};

// Load initial data
loadCategories();
loadpets();



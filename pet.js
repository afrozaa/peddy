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

const removeActiveClass = () => {
  const buttons = document.querySelectorAll(".category-btn");
  console.log(buttons);
  for (const btn of buttons) {
    btn.classList.remove("btn-info");
    btn.classList.remove("bg-blue-500");
  }
};

const petContainer = document.getElementById("pets");

const displaypets = (pets) => {
  // Clear the pet container before loading new pets
  petContainer.innerHTML = "";
  if (pets.length === 0) {
    petContainer.classList.remove("grid");
    petContainer.innerHTML = `<div class="w-full text-center shadow-xl rounded-xl"> 
          <div class="h-full lg:h-96"><img class="w-40 mx-auto pt-6" src="https://img.icons8.com/?size=100&id=110240&format=png&color=000000" alt="No pets available" />
          <h2 class="text-3xl pb-4 font-bold">"No Information Available"</h2>
          <p class="w-10/12 mx-auto">We sincerely apologize! It looks like all the birds have found their forever homes. Please check back in a few days, and we hope to have more available for adoption soon.</p></div>
            </div>
          `;
    return;
  } else {
    petContainer.classList.add("grid");
  }

  // Rest of the code to display pet cards
  pets.forEach((pet) => {
    const card = document.createElement("div");
    card.classList = "card bg-base-100 w-78 shadow-xl border";
    card.innerHTML = `
            <figure class="px-4 pt-4">
                <img src="${pet.image}" class="rounded-xl" alt="${pet.pet_name}" />
            </figure>
            <div class="px-5 text-left w-full"> 
                <h2 class="text-lg font-bold">${pet.pet_name}</h2>
                <p><i class="fa-solid fa-table-list"></i>Breed: ${pet.breed}</p>
                <p><i class="fa-solid fa-calendar"></i>Birth: ${pet.date_of_birth}</p>
                <p><i class="fa-solid fa-mercury"></i>Gender: ${pet.gender}</p>
                <p><i class="fa-solid fa-tags"></i>Price: ${pet.price}</p>
                <div class="divider"></div>
            </div>
            <div class="flex justify-around pb-4 px-2 gap-1">
                <button class="btn bg-white border-1 font-bold text-[#0e7a81] border-[#0e7a81] like-btn">
                    <i class="fa-regular fa-thumbs-up"></i>
                </button>
                <button class="btn bg-white border-1 font-bold text-[#0e7a81] border-[#0e7a81] adopt-btn">
                    Adopt
                </button>
                <button class="btn bg-white border-1 font-bold text-[#0e7a81] border-[#0e7a81] show-details" data-pet-id="${pet.petId}">
                    Details
                </button>
            </div>
        `;
    petContainer.append(card);
  });
};

// Attach event listener once after the page is loaded
petContainer.addEventListener("click", (event) => {
  // Like button toggle functionality
  if (event.target.closest(".like-btn")) {
    const button = event.target.closest(".like-btn");

    // Find the closest card
    const card = button.closest(".card");

    // Select the image from the card
    const image = card.querySelector("img");

    // Making a deep copy so that it does not interfere with the primitive image
    const newImage = image.cloneNode(true);

    button.classList.toggle("text-[#0e7a81]");
    button.classList.add("bg-green-100");

    const likeSection = document.getElementById("liked-pets");

    // Create a new div for the liked image
    const newLike = document.createElement("div");
    newLike.classList.add("w-20", "h-20");

    // Add image classes
    newImage.classList.add("w-full", "h-full", "object-cover", "shadow-lg");

    // Append the new image to the div
    newLike.append(newImage);

    // Append the newLike div to the like section
    likeSection.append(newLike);
  }

  // Handle show details functionality
  if (event.target.closest(".show-details")) {
    const petId = event.target
      .closest(".show-details")
      .getAttribute("data-pet-id");
    loadDetails(petId);
  }

  // Handle adopt button functionality
  if (event.target.closest(".adopt-btn")) {
    const petId = event.target.closest(".adopt-btn");

    clickAdopt();
    petId.disabled = true;
    petId.innerHTML = `<button class=" font-bold text-[#0e7a81]">Adopted</button>`;
  }
});

const clickAdopt = () => {
  const modal = document.getElementById("my_modal_5");
  modal.showModal();

  let counter = 3;
  const countdownElement = modal.querySelector(".countdown span");
  countdownElement.style.setProperty("--value", counter);
  const interval = setInterval(() => {
    counter--;
    countdownElement.style.setProperty("--value", counter);

    // Close the modal and clear the interval after 3 seconds
    if (counter <= 0) {
      clearInterval(interval);
      modal.close();
    }
  }, 1000);
};

const loadDetails = async (petId) => {
  const uri =
    await `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  const res = await fetch(uri);
  const data = await res.json();
  console.log(data);
  displayDetailsPet(data.petData);
};

const displayDetailsPet = (petData) => {
  const petDetail = document.getElementById("modalDetails");
  petDetail.innerHTML = `
      <div class="flex gap-4 ">
      <div class="w-45 h-40">
      <img
        src="${petData.image || "https://via.placeholder.com/150"}"
        alt="${petData.pet_name || "Pet Image"}"
        class="rounded-xl object-cover w-full h-full" />
      </div>
      <div>
      <h2 class="card-title">${petData.pet_name || "Unnamed Pet"}</h2>
      <p><i class="fa-solid fa-table-list"></i> Breed: ${petData.breed || "Not Available"
    }</p>
      <p><i class="fa-solid fa-calendar-days"></i> Birth: ${petData.date_of_birth ? petData.date_of_birth : "Date not provided"
    }</p>
      <p><i class="fa-solid fa-mercury"></i> Gender: ${petData.gender ? petData.gender : "Not specified"
    }</p>
      <p><i class="fa-solid fa-tags"></i> Price: ${petData.price !== null && petData.price !== undefined
      ? `$${petData.price}`
      : "Price not available"
    }</p>
      <p><i class="fa-solid fa-syringe"></i> Vaccinated status: ${petData.vaccinated_status ? petData.vaccinated_status : "Not specified"
    }</p>
      </div>
      </div>
      <div class="divider"></div>
      <p><b>Details Information:</b></p>
      <p>${petData.pet_details || "No additional details available."}</p>
    `;

  document.getElementById("showData").click();
};

// Display Categories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");

  categories.forEach((item) => {
    const buttonContainer = document.createElement("div");

    buttonContainer.classList = "";
    buttonContainer.innerHTML = `
    <button id="btn-${item.category}" onclick="loadPetCategories('${item.category}')" class="btn category-btn w-40 lg:w-60 h-30  bg-white">
    <img class="object-cover h-4/5" src="${item.category_icon}" alt="${item.category}"  />
   ${item.category}
    </button>

    `;
    categoryContainer.append(buttonContainer);
  });
};

const loadPetCategories = (category) => {
  removeActiveClass();

  console.log(category);

  const spinner = document.getElementById("loading-spinner");
  const petSection = document.getElementById("pets");

  // Show the spinner and hide the pet section
  spinner.classList.remove("hidden");
  petSection.classList.add("hidden");

  // Delaying the fetch call by 2 seconds
  setTimeout(() => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        const activeBtn = document.getElementById(`btn-${category}`);
        activeBtn.classList.add("btn-info");
        activeBtn.classList.add("bg-blue-500");

        // Hide the spinner and show the pet section after data is fetched
        spinner.classList.add("hidden");
        petSection.classList.remove("hidden");

        displaypets(data.data);
      })
      .catch((error) => {
        console.log(error);
        // Hide the spinner on error
        spinner.classList.add("hidden");
        // Show the section even on error
        petSection.classList.remove("hidden");
      });
  }, 2000); // 2 second delay
  //sort by category
};

document.querySelector("#btn-sort").addEventListener("click", sortPets);

function sortPets() {
  const spinner = document.getElementById("loading-spinner");
  const petContainer = document.getElementById("pets");

  // Show the spinner and hide the pet section
  spinner.classList.remove("hidden");
  petContainer.classList.add("hidden");
  setTimeout(() => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets ")
      .then((res) => res.json())
      .then((data) => displaypets(data.pets.sort((a, b) => b.price - a.price)))
      .catch((error) => console.log(error));
    //hide the spinner
    spinner.classList.add("hidden");
    petContainer.classList.remove("hidden");
  }, 2000);
}

// Load initial data
loadCategories();
loadpets();

//end
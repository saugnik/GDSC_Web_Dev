
const apiKey = '46124146-5205ceeb540ec6acaf7bdaaf0'; 
const searchBtn = document.getElementById('searchBtn');
const searchQuery = document.getElementById('searchQuery');
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const imageTitle = document.getElementById('imageTitle');
const imageAuthor = document.getElementById('imageAuthor');
const closeBtn = document.getElementById('closeBtn');


searchBtn.addEventListener('click', () => {
    const query = searchQuery.value.trim();
    if (query) {
        fetchImages(query);
    } else {
        alert('Please enter a search term.');
    }
});

async function fetchImages(query) {
    gallery.innerHTML = '';
    try {
        const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo`);
        if (response.ok) {
            const data = await response.json();
            displayImages(data.hits);
        } else {
            handleError('Error fetching images. Please try again later.');
        }
    } catch (error) {
        handleError('Network error. Please check your connection.');
    }
}


function displayImages(images) {
    if (images.length === 0) {
        gallery.innerHTML = '<p>No images found. Try a different search.</p>';
    } else {
        images.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image.webformatURL;
            imgElement.alt = image.tags;
            imgElement.addEventListener('click', () => openModal(image));
            gallery.appendChild(imgElement);
        });
    }
}


function openModal(image) {
    modal.style.display = 'flex';
    modalImage.src = image.largeImageURL;
    imageTitle.textContent = image.tags || 'No title available';
    imageAuthor.textContent = `By: ${image.user}`;
}


closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});


window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});


function handleError(message) {
    gallery.innerHTML = `<p>${message}</p>`;
}

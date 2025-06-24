import { podcasts, genres, seasons } from './data.js';
import './components/PodcastPreview.js';

// Dynamically populate the genre filter dropdown
const genreFilter = document.getElementById('genre-filter');
if (genreFilter) {
  genreFilter.innerHTML = '<option value="all">All Genres</option>';
  genres.forEach(g => {
    const option = document.createElement('option');
    option.value = g.id;
    option.textContent = g.title;
    genreFilter.appendChild(option);
  });
}

// Dynamically populate the sort filter dropdown
const sortOptions = [
  { value: 'recent', label: 'Recently Updated' },
  { value: 'seasons', label: 'Most Seasons' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'az', label: 'A-Z' },
  { value: 'za', label: 'Z-A' }
];

const sortFilter = document.getElementById('sort-filter');
if (sortFilter) {
  sortOptions.forEach(opt => {
    const option = document.createElement('option');
    option.value = opt.value;
    option.textContent = opt.label;
    sortFilter.appendChild(option);
  });
}

// Helper: Map genre IDs to genre names
function getGenreNames(genreIds) {
  return genreIds
    .map(id => {
      const genre = genres.find(g => g.id === id || g.id === Number(id));
      return genre ? genre.title : '';
    })
    .filter(Boolean)
    .join(',');
}

const list = document.getElementById('podcast-list');
const searchInput = document.getElementById('search-input');

// Render all podcasts
function renderPodcasts(filteredPodcasts = podcasts) {
  list.innerHTML = '';
  filteredPodcasts.forEach(podcast => {
    const el = document.createElement('podcast-preview');
    el.setAttribute('cover', podcast.image || '');
    el.setAttribute('title', podcast.title);
    el.setAttribute('genres', getGenreNames(podcast.genres));
    el.setAttribute('seasons', podcast.seasons);
    el.setAttribute('updated', podcast.updated);
    list.appendChild(el);
  });
}

// Combined filter, search, and sort logic
function filterAndRender() {
  let filtered = podcasts.slice();

  // Search
  const search = searchInput.value.trim().toLowerCase();
  if (search) {
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(search) ||
      (p.description && p.description.toLowerCase().includes(search))
    );
  }

  // Genre filter
  const selectedGenre = genreFilter.value;
  if (selectedGenre && selectedGenre !== 'all') {
    filtered = filtered.filter(p =>
      p.genres.includes(Number(selectedGenre)) || p.genres.includes(selectedGenre)
    );
  }

  // Sort filter
  const sortValue = sortFilter.value;
  if (sortValue === 'az') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortValue === 'za') {
    filtered.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sortValue === 'recent') {
    filtered.sort((a, b) => new Date(b.updated) - new Date(a.updated));
  } else if (sortValue === 'oldest') {
    filtered.sort((a, b) => new Date(a.updated) - new Date(b.updated));
  } else if (sortValue === 'seasons') {
    filtered.sort((a, b) => (b.seasons || 0) - (a.seasons || 0));
  }
  renderPodcasts(filtered);
}

// Attach listeners
searchInput.addEventListener('input', filterAndRender);
genreFilter.addEventListener('change', filterAndRender);
sortFilter.addEventListener('change', filterAndRender);

// Initial render
filterAndRender();

// Modal logic
const modalContainer = document.getElementById('podcast-modal');

function closeModal() {
  modalContainer.style.display = 'none';
  modalContainer.innerHTML = '';
}

function openModal(podcast) {
  // Find genres and seasons
  const genreNames = (podcast.genres || [])
    .map(id => {
      const genre = genres.find(g => g.id === id || g.id === Number(id));
      return genre ? `<span class="genre">${genre.title}</span>` : '';
    })
    .join('');
  const seasonData = (seasons.find(s => s.id == podcast.id) || {}).seasonDetails || [];

  // Format date
  const updatedDate = new Date(podcast.updated);
  const updatedText = updatedDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  // Build modal HTML
  modalContainer.innerHTML = `
<div class="modal" style="display:flex;">
<div class="modal-content">
<span class="close" id="modal-close">&times;</span>
<div class="modal-body">
<div class="modal-header">
<div class="modal-cover">
${podcast.image
? `<img src="${podcast.image}" alt="Cover for ${podcast.title}">`
: `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">Large Cover Image</div>`
}
</div>
<div>
<h2>${podcast.title}</h2>
<div>${podcast.description || ''}</div>
<div class="modal-genres">${genreNames}</div>
<div class="modal-updated"><span style="margin-right:0.5rem;">📅</span>Last updated: ${updatedText}</div>
</div>
</div>
<h3>Seasons</h3>
<div id="modal-seasons">
${
seasonData.length
? seasonData.map(s =>
 `<div class="season-card">
<div class="season-info">
<div class="season-title">${s.title}</div>
<div class="season-desc">${s.description || ''}</div>
</div>
<div class="season-episodes">${s.episodes} episode${s.episodes > 1 ? 's' : ''}</div>
</div>`
).join('')
: '<div>No seasons available.</div>'
}
</div>
</div>
</div>
</div>
`;
modalContainer.style.display = 'flex';

// Close modal events
document.getElementById('modal-close').onclick = closeModal;
  modalContainer.onclick = (e) => {
    if (e.target === modalContainer) closeModal();
  };
}

// Listen for podcast card click
document.getElementById('podcast-list').addEventListener('podcast-selected', (e) => {
  const title = e.target.getAttribute('title');
  const podcast = podcasts.find(p => p.title === title);
  if (podcast) openModal(podcast);
});
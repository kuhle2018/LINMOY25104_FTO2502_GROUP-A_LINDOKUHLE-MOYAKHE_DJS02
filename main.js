import { podcasts, genres } from './data.js';
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

// Initial render
renderPodcasts();

// Optional: Filter podcasts by genre
if (genreFilter) {
  genreFilter.addEventListener('change', (e) => {
    const selected = e.target.value;
    if (selected === 'all') {
      renderPodcasts();
    } else {
      const filtered = podcasts.filter(p =>
        p.genres.includes(Number(selected)) || p.genres.includes(selected)
      );
      renderPodcasts(filtered);
    }
  });
}
import { podcasts, genres } from './data.js';
import './components/PodcastPreview.js';

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

podcasts.forEach(podcast => {
  const el = document.createElement('podcast-preview');
  el.setAttribute('cover', podcast.image || '');
  el.setAttribute('title', podcast.title);
  el.setAttribute('genres', getGenreNames(podcast.genres));
  el.setAttribute('seasons', podcast.seasons);
  el.setAttribute('updated', podcast.updated);
  list.appendChild(el);
});
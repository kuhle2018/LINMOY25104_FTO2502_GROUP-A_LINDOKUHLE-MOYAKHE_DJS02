class PodcastPreview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['cover', 'title', 'genres', 'seasons', 'updated'];
  }

  attributeChangedCallback() {
    this.render();
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('.preview').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('podcast-selected', {
        bubbles: true,
        detail: { title: this.getAttribute('title') }
      }));
    });
  }

  render() {
    const cover = this.getAttribute('cover') || '';
    const title = this.getAttribute('title') || 'Podcast Title';
    const genres = (this.getAttribute('genres') || '').split(',').map(g => g.trim()).filter(Boolean);
    const seasons = this.getAttribute('seasons') || '1';
    const updated = this.getAttribute('updated') || '';

    // Format date as "Updated X days ago" or "Updated 1 week ago"
    let updatedText = '';
    if (updated) {
      const updatedDate = new Date(updated);
      const now = new Date();
      const diffMs = now - updatedDate;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      if (diffDays === 0) updatedText = 'Updated today';
      else if (diffDays === 1) updatedText = 'Updated 1 day ago';
      else if (diffDays < 7) updatedText = `Updated ${diffDays} days ago`;
      else if (diffDays < 14) updatedText = 'Updated 1 week ago';
      else updatedText = `Updated ${Math.floor(diffDays / 7)} weeks ago`;
    }

    this.shadowRoot.innerHTML = `
      <style>
        .preview {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.07);
          padding: 1.2rem 1rem 1rem 1rem;
          width: 100%;
          max-width: 300px;
          box-sizing: border-box;
          cursor: pointer;
          transition: box-shadow 0.2s;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-height: 350px;
        }
        .preview:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.13);
        }
        .cover {
          width: 100%;
          aspect-ratio: 1/1;
          background: #bdbdbd;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 1.1rem;
          margin-bottom: 1rem;
          object-fit: cover;
        }
        .title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #222;
        }
        .meta {
          font-size: 0.95rem;
          color: #444;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .meta .icon {
          font-size: 1rem;
          margin-right: 0.2rem;
        }
        .genres {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 0.7rem;
        }
        .genre {
          background: #f1f3f6;
          color: #222;
          border-radius: 6px;
          padding: 0.18rem 0.7rem;
          font-size: 0.85rem;
          font-weight: 500;
          border: 1px solid #e0e0e0;
        }
        .updated {
          font-size: 0.92rem;
          color: #888;
        }
        @media (max-width: 700px) {
          .preview {
            max-width: 100%;
            min-height: 0;
          }
        }
      </style>
      <div class="preview" tabindex="0">
        ${
          cover
            ? `<img class="cover" src="${cover}" alt="Podcast cover for ${title}" />`
            : `<div class="cover">Podcast Cover</div>`
        }
        <div class="title">${title}</div>
        <div class="meta">
          <span class="icon">📅</span>
          ${seasons} season${seasons > 1 ? 's' : ''}
        </div>
        <div class="genres">
          ${genres.map(g => `<span class="genre">${g}</span>`).join('')}
        </div>
        <div class="updated">${updatedText}</div>
      </div>
    `;
  }
}

customElements.define('podcast-preview', PodcastPreview);
# DJS02 – Web Component: Podcast Preview

## Usage
### 1. **Installation & Setup**

No installation is required. Just clone or download this repository and open index.html in your browser.

### 2. **How to Use the Component**

The `<podcast-preview>` web component is automatically registered when you load the app (via main.js).  
You do **not** need to import it separately in your HTML.

#### Example Usage in HTML (for demo or manual use):

```html
<podcast-preview
  cover="cover.jpg"
  title="Podcast Title"
  genres="Technology,Business"
  seasons="3"
  updated="2025-06-24"
></podcast-preview>
```

#### Example Usage in JavaScript:

```javascript
const preview = document.createElement('podcast-preview');
preview.setAttribute('cover', 'cover.jpg');
preview.setAttribute('title', 'Podcast Title');
preview.setAttribute('genres', 'Technology,Business');
preview.setAttribute('seasons', '3');
preview.setAttribute('updated', '2025-06-24');
document.body.appendChild(preview);
```

---

## Component Attributes

| Attribute | Description                        | Example Value           |
|-----------|------------------------------------|------------------------|
| `cover`   | Podcast cover image URL            | `cover.jpg`            |
| `title`   | Podcast title                      | `Podcast Title`        |
| `genres`  | Comma-separated genre names        | `Technology,Business`  |
| `seasons` | Number of seasons                  | `3`                    |
| `updated` | Last updated date (ISO or readable)| `2025-06-24`           |

---

## Custom Events

- The component dispatches a `podcast-selected` event when clicked.
- Listen for this event on the parent element or document:

```javascript
document.getElementById('podcast-list').addEventListener('podcast-selected', (e) => {
  // e.target is the <podcast-preview> element
  // You can read its attributes for details
});
```

---

## Accessibility

- The component supports keyboard navigation (`tabindex="0"`).
- Images have descriptive `alt` text.

---

## Responsive Design

- The component and app are fully responsive and mobile-friendly.
- Layout adjusts for small screens.

---

## Running the Demo

1. Open index.html in your browser.
2. Use the search, filter, and sort features to interact with the podcast previews.
3. Click a podcast card to open the details modal.

---

## Project Structure

- index.html – Demo page and app shell
- main.js – App logic, data loading, filtering, modal, and event handling
- PodcastPreview.js – The web component definition
- data.js – Podcast, genre, and season data
- styles.css – App and component styles

---

## Author

Created by Lindokuhle Moyakhe


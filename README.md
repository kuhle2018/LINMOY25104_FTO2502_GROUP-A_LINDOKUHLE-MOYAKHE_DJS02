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

## 💻 Tech Stack:
- ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
- ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) 
- ![JAVASCRIPT](https://media.discordapp.net/attachments/1101536822456230038/1356916451197321358/js-logo.png?ex=685bbaec&is=685a696c&hm=1e372af4f9501d3755a05fddaac831843377ccb89df57f8cfe26c8576e4740b0&=&format=webp&quality=lossless)
- ![VISUAL-STUDIO](https://media.discordapp.net/attachments/1101536822456230038/1356916450572505128/icons8-visual-studio_1.png?ex=685bbaec&is=685a696c&hm=286aae038dce0f24cb76ec459e8b1566fc196fc1fc7dc629792814c4b06e5baa&=&format=webp&quality=lossless&width=40&height=40)
- ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

  ---

## Author
Created by Lindokuhle Moyakhe

## Social Links
[<img src='https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/github.svg' alt='github' height='40'>](https://github.com/https://github.com/kuhle2018)  [<img src='https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/linkedin.svg' alt='linkedin' height='40'>](https://www.linkedin.com/in/https://www.linkedin.com/in/lindokuhle-moyakhe-60366125/)  [<img src='https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/facebook.svg' alt='facebook' height='40'>](https://www.facebook.com/https://www.facebook.com/lindokuhle.moyakhe)  [<img src='https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/discord.svg' alt='discord' height='40'>](https://discord.com/users/kuhle0268)   
---


/*
 * Carousel block
 * Authoring contract (one row per slide):
 *   Column 1 -> image
 *   Column 2 -> text shown on top of the image
 * EDS's default block decoration turns each authored table row into a
 * direct child <div> of `block`, and each cell into a child <div> of that
 * row. So at the start of decorate(), block.children = [slideRow1, slideRow2, ...]
 */

export default function decorate(block) {
  const slides = [...block.children];

  // Build a track that holds all slides side by side.
  const track = document.createElement('div');
  track.className = 'carousel-track';

  slides.forEach((row, i) => {
    row.classList.add('carousel-slide');
    row.dataset.slideIndex = i;
    row.setAttribute('aria-hidden', i === 0 ? 'false' : 'true');

    const cells = [...row.children];
    const [imageCell, textCell] = cells;

    if (imageCell) imageCell.classList.add('carousel-slide-image');
    if (textCell) textCell.classList.add('carousel-slide-content');

    track.append(row);
  });

  block.textContent = '';
  block.append(track);

  // Don't bother with nav controls / dots if there's nothing to navigate.
  if (slides.length <= 1) return;

  const prevBtn = document.createElement('button');
  prevBtn.type = 'button';
  prevBtn.className = 'carousel-arrow carousel-arrow-prev';
  prevBtn.setAttribute('aria-label', 'Previous slide');
  prevBtn.innerHTML = '<span aria-hidden="true">&#10094;</span>';

  const nextBtn = document.createElement('button');
  nextBtn.type = 'button';
  nextBtn.className = 'carousel-arrow carousel-arrow-next';
  nextBtn.setAttribute('aria-label', 'Next slide');
  nextBtn.innerHTML = '<span aria-hidden="true">&#10095;</span>';

  // Optional dot indicators, purely a nice-to-have.
  const dots = document.createElement('div');
  dots.className = 'carousel-dots';
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dots.append(dot);
  });

  block.append(prevBtn, nextBtn, dots);

  const dotEls = [...dots.children];
  const total = slides.length;
  let current = 0;

  function goTo(index) {
    current = (index + total) % total;

    track.style.transform = `translateX(-${current * 100}%)`;

    slides.forEach((slide, i) => {
      slide.setAttribute('aria-hidden', i === current ? 'false' : 'true');
    });

    dotEls.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === current);
    });
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
  dotEls.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // Let arrow keys move the carousel when it (or something inside it) has focus.
  block.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  goTo(0);
}
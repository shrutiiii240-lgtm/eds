export default function decorate(block) {
  if (block.classList.contains('dark')) {
    console.log('Dark variant enabled');
  }

  if (block.classList.contains('centered')) {
    console.log('Centered variant enabled');
  }

  if (block.classList.contains('large')) {
    console.log('Large variant enabled');
  }
}
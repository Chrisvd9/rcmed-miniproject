// https://vike.dev/onPageTransitionStart
export { onPageTransitionStart }

function onPageTransitionStart() {
  document.querySelector('body').classList.add('page-is-transitioning')
}

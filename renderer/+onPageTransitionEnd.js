// https://vike.dev/onPageTransitionEnd
export { onPageTransitionEnd }

function onPageTransitionEnd() {
  document.querySelector('body').classList.remove('page-is-transitioning')
}

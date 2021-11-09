//防抖 解决refresh频繁执行  
export function debounce(func, delay) {
  let timer = null;
  return function (...args) {
    clearInterval(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
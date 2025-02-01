export function delayMilisec(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved');
    }, ms);
  });
}

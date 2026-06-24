export function initAbout() {
  const root = document.querySelector("[data-about]");
  if (!root) return;

  const render = () => {
    const initialYear: number = 2017;
    const currentYear: number = new Date().getFullYear();

    root.querySelector("[data-years]")!.textContent = String(
      currentYear - initialYear,
    );
  };

  render();
}

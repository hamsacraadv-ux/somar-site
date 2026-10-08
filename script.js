const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
});

document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".main-nav a")];

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + entry.target.id
    ));
  });
}, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

sections.forEach(section => observer.observe(section));

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("contactForm")?.addEventListener("submit", e => {
  e.preventDefault();
  const form = new FormData(e.currentTarget);
  const subject = encodeURIComponent(form.get("assunto"));
  const body = encodeURIComponent(
    `Nome: ${form.get("nome")}\nE-mail: ${form.get("email")}\n\n${form.get("mensagem")}`
  );
  window.location.href =
    `mailto:contato@associacaosomar.com.br?subject=${subject}&body=${body}`;
});

document.getElementById("newsletter")?.addEventListener("submit", e => {
  e.preventDefault();
  alert("Obrigado! O cadastro está pronto para ser conectado a um serviço de newsletter.");
  e.currentTarget.reset();
});

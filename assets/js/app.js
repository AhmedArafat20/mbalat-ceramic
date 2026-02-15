// =========================
// إعدادات عامة
// =========================
const PHONE = "0563902018";
const WHATSAPP_NUMBER = "966563902018"; // صيغة دولية (السعودية) بدون +

// =========================
// مزامنة ارتفاع التوب بار مع CSS Variable
// (علشان الـ header يكون لازق تحته ومفيش جزء يستخبى)
// =========================
function syncTopbarHeight() {
  const topbar = document.querySelector(".topbar");
  if (!topbar) return;

  // يحط ارتفاع التوب بار الحقيقي في متغير CSS
  document.documentElement.style.setProperty("--topbar-h", topbar.offsetHeight + "px");
}

// =========================
// أدوات مساعدة
// =========================
function setContactLinks() {
  document.querySelectorAll("[data-phone]").forEach(a => {
    a.setAttribute("href", `tel:${PHONE}`);
  });

  document.querySelectorAll("[data-wa]").forEach(a => {
    a.setAttribute("href", `https://wa.me/${WHATSAPP_NUMBER}`);
  });
}

function setActiveNav() {
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav a, .mobile-panel a").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href.endsWith(path)) a.classList.add("active");
  });
}

function setupMobileMenu() {
  const btn = document.querySelector(".nav-toggle");
  const panel = document.querySelector(".mobile-panel");
  if (!btn || !panel) return;

  btn.addEventListener("click", () => {
    panel.classList.toggle("show");
    btn.setAttribute("aria-expanded", panel.classList.contains("show") ? "true" : "false");
  });

  // اغلاق عند الضغط على لينك
  panel.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => panel.classList.remove("show"));
  });
}

function setupWhatsAppForm() {
  const form = document.querySelector("#waForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = (form.querySelector("#name")?.value || "").trim();
    const service = (form.querySelector("#service")?.value || "").trim();
    const area = (form.querySelector("#area")?.value || "").trim();
    const details = (form.querySelector("#details")?.value || "").trim();

    const msg =
`السلام عليكم،
أنا ${name || "عميل"}.
محتاج خدمة: ${service || "—"}
الموقع/الحي: ${area || "—"}
تفاصيل الطلب:
${details || "—"}

رقمي للتواصل: ${PHONE}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });
}

function setupLightbox() {
  const lb = document.querySelector("#lightbox");
  if (!lb) return;

  const lbImg = lb.querySelector("img");
  const lbTitle = lb.querySelector("[data-lb-title]");
  const closeBtn = lb.querySelector("[data-lb-close]");

  function open(src, title) {
    lbImg.src = src;
    lbTitle.textContent = title || "عرض الصورة";
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
  }
  function close() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    lbImg.src = "";
  }

  document.querySelectorAll("[data-lightbox]").forEach(el => {
    el.addEventListener("click", () => {
      const src = el.getAttribute("data-src") || el.querySelector("img")?.getAttribute("src");
      const title = el.getAttribute("data-title") || el.querySelector(".cap")?.textContent || "صورة من المشاريع";
      if (src) open(src, title);
    });
  });

  closeBtn?.addEventListener("click", close);
  lb.addEventListener("click", (e) => {
    if (e.target === lb) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

// =========================
// تشغيل
// =========================

// ✅ لازم تتعمل قبل أي حسابات/عرض
syncTopbarHeight();

// تحديث عند تغيير حجم الشاشة
window.addEventListener("resize", syncTopbarHeight);

// (اختياري) لو محتوى التوب بار بيتغير بعد التحميل (نادر) نعيد القياس
window.addEventListener("load", syncTopbarHeight);

setContactLinks();
setActiveNav();
setupMobileMenu();
setupWhatsAppForm();
setupLightbox();

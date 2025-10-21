/* main.js
   بيانات أحداث وهمية ومهام تفاعلية: السلايدر، إنشاء كروت الأحداث، فلتر، تحقق نموذج
*/

// مثال بيانات أحداث؛ استبدلها لاحقًا أو اجلبها من ملف JSON
const eventsData = [
  {
    id: 1,
    title: "مهرجان المدينة الثقافي",
    date: "2025-10-20",
    place: "ساحة البلدية",
    category: "culture",
    img: "assets/img/event1.jpg",
    short: "ليلة من الفنون والمسرح والموسيقى.",
    featured: true
  },
  {
    id: 2,
    title: "سباق الجري السنوي",
    date: "2025-10-22",
    place: "منتزه المدينة",
    category: "sports",
    img: "assets/img/event2.jpg",
    short: "شارك في سباق 5 كم للعائلة والأصدقاء.",
    featured: true
  },
  {
    id: 3,
    title: "حفلة موسيقية للشباب",
    date: "2025-11-02",
    place: "مركز المؤتمرات",
    category: "music",
    img: "assets/img/event3.jpg",
    short: "نجوم محليون وعروض مباشرة.",
    featured: false
  },
  {
    id: 4,
    title: "ورشة حرف يدوية للأطفال",
    date: "2025-10-30",
    place: "مكتبة الأطفال",
    category: "family",
    img: "assets/img/event4.jpg",
    short: "نشاطات تفاعلية للأطفال تحت إشراف مختصين.",
    featured: false
  }
];

// إنشاء سلايدر للأحداث البارزة
function populateFeatured(){
  const container = document.getElementById('featuredContainer');
  if(!container) return;
  let first = true;
  eventsData.filter(e=>e.featured).forEach(e=>{
    const div = document.createElement('div');
    div.className = 'carousel-item' + (first ? ' active' : '');
    first = false;
    div.innerHTML = `
      <img src="${e.img}" class="d-block w-100" alt="${e.title}">
      <div class="carousel-caption d-none d-md-block text-end">
        <h5>${e.title}</h5>
        <p>${e.short}</p>
        <a href="event.html?id=${e.id}" class="btn btn-sm btn-primary">عرض التفاصيل</a>
      </div>
    `;
    container.appendChild(div);
  });
}

// إنشاء شبكة الكروت
function populateGrid(filterCategory = 'all'){
  const grid = document.getElementById('eventsGrid');
  if(!grid) return;
  grid.innerHTML = '';
  const filtered = eventsData.filter(e => filterCategory === 'all' ? true : e.category === filterCategory);
  filtered.forEach(e=>{
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-lg-4';
    col.innerHTML = `
      <div class="card event-card">
        <img src="${e.img}" class="card-img-top" style="height:180px;object-fit:cover;" alt="${e.title}">
        <div class="card-body">
          <h5 class="card-title">${e.title}</h5>
          <p class="card-text small text-muted">${e.date} — ${e.place}</p>
          <p class="card-text">${e.short}</p>
          <a href="event.html?id=${e.id}" class="btn btn-outline-primary btn-sm">التفاصيل</a>
        </div>
      </div>
    `;
    grid.appendChild(col);
  });
}

// إعداد أزرار الفلترة
function setupFilters(){
  document.querySelectorAll('.badge-filter').forEach(btn=>{
    btn.addEventListener('click', ()=> {
      const cat = btn.getAttribute('data-category') || 'all';
      populateGrid(cat);
    });
  });
}

// تحقق بسيط لنموذج الاتصال (يعمل فقط في contact.html إن وُجد)
function setupContactForm(){
  const form = document.querySelector('#contactForm');
  if(!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = form.querySelector('[name=name]').value.trim();
    const email = form.querySelector('[name=email]').value.trim();
    const msg = form.querySelector('[name=message]').value.trim();

    if(!name || !email || !msg || !email.includes('@')) {
      const alert = new bootstrap.Alert(document.createElement('div'));
      form.prepend(createAlert('رجاءً املأ الحقول بشكل صحيح', 'danger'));
      return;
    }
    form.prepend(createAlert('تم إرسال رسالتك بنجاح، شكراً لك!', 'success'));
    form.reset();
  });
}

function createAlert(text, type='success'){
  const div = document.createElement('div');
  div.className = `alert alert-${type} alert-dismissible`;
  div.role = 'alert';
  div.innerHTML = `${text} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
  return div;
}

// تهيئة عند التحميل
document.addEventListener('DOMContentLoaded', () => {
  populateFeatured();
  populateGrid();
  setupFilters();
  setupContactForm();
  
});

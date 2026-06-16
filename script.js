document.addEventListener('DOMContentLoaded', () => {
  // --- NAVIGATION MENU DYNAMICS ---
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelector('.nav-links');
  const burger = document.querySelector('.burger');
  const navItems = document.querySelectorAll('.nav-links a');

  // Change navbar appearance on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightNavOnScroll();
  });

  // Mobile navigation toggle
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
  });

  // Close mobile navigation drawer on link click
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('nav-active');
      burger.classList.remove('toggle');
    });
  });

  // Highlight active navigation link based on scroll position
  const sections = document.querySelectorAll('section[id]');
  function highlightNavOnScroll() {
    let scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(`.nav-links a[href*=${sectionId}]`)?.classList.add('active');
      } else {
        document.querySelector(`.nav-links a[href*=${sectionId}]`)?.classList.remove('active');
      }
    });
  }

  // --- INTERSECTION OBSERVER FOR FADE-IN REVEAL ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- ANIMATED COUNTER STATISTICS ---
  const statsSection = document.getElementById('data');
  const counters = document.querySelectorAll('.data-number');
  let countStarted = false;

  const countUp = (counter) => {
    const target = +counter.getAttribute('data-target');
    const suffix = counter.getAttribute('data-suffix') || '';
    const speed = 100; // lower number = faster
    let count = 0;
    
    const updateCount = () => {
      const increment = Math.ceil(target / speed);
      count += increment;
      
      if (count < target) {
        counter.innerText = count.toLocaleString('id-ID') + suffix;
        setTimeout(updateCount, 15);
      } else {
        counter.innerText = target.toLocaleString('id-ID') + suffix;
      }
    };
    
    updateCount();
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countStarted) {
        counters.forEach(counter => countUp(counter));
        countStarted = true;
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // --- DETAIL MODAL FOR PROFIL / CARDS EXPANSION ---
  const modal = document.querySelector('.modal-expand');
  const modalTitle = document.querySelector('.modal-expand-title');
  const modalBody = document.querySelector('.modal-expand-body');
  const modalClose = document.querySelector('.modal-expand-close');
  const readMoreLinks = document.querySelectorAll('.read-more-link');

  // Custom data content for the expansion modals (Indonesian)
  const detailData = {
    sejarah: {
      title: "Sejarah Desa Bowongso",
      content: `
        <p>Nama <strong>Desa Bowongso</strong> memiliki akar sejarah yang kuat. Secara turun-temurun, nama ini dipercaya berasal dari kata bahasa Jawa kuno <em>"Bau"</em> yang berarti kekuatan/bahu, dan <em>"Wangsa"</em> yang berarti trah, keturunan, atau bangsa. Secara harfiah, Bowongso dapat diartikan sebagai tempat berkumpulnya keturunan orang-orang kuat dan tangguh yang memiliki tekad membaja.</p>
        <p>Awal mula berdirinya pemukiman di Desa Bowongso berkaitan erat dengan masa pelarian pengikut Pangeran Diponegoro pasca Perang Jawa (1825–1830). Beberapa prajurit memilih untuk mengasingkan diri ke lereng Gunung Sumbing demi mencari tempat berlindung yang aman. Tempat yang dipilih adalah kawasan lereng barat Gunung Sumbing yang saat itu masih berupa hutan belantara yang subur.</p>
        <p>Para perintis awal ini membuka lahan (babat alas) untuk pertanian. Berkat kesuburan tanah vulkanik Gunung Sumbing, pemukiman ini berkembang pesat. Mereka menanam tembakau, sayur-mayur, dan di kemudian hari mengembangkan perkebunan kopi Arabika yang kini menjadi komoditas unggulan desa yang tersohor hingga kancah internasional.</p>
      `
    },
    visimisi: {
      title: "Visi dan Misi Desa",
      content: `
        <p>Pemerintah Desa Bowongso berkomitmen untuk memajukan kesejahteraan masyarakat melalui tata kelola pemerintahan yang transparan dan berlandaskan pada potensi lokal.</p>
        <h4>Visi:</h4>
        <p><em>"Terwujudnya Desa Bowongso yang Mandiri, Sejahtera, Berbudaya, dan Berwawasan Lingkungan melalui Optimalisasi Sektor Pertanian dan Pariwisata Lereng Sumbing."</em></p>
        <h4>Misi:</h4>
        <ol style="margin-left: 1.5rem; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
          <li>Meningkatkan kualitas tata kelola pemerintahan desa yang bersih, transparan, akuntabel, dan responsif terhadap kebutuhan masyarakat.</li>
          <li>Mengembangkan sektor pertanian ramah lingkungan dan meningkatkan nilai tambah komoditas unggulan daerah, khususnya Kopi Arabika Bowongso.</li>
          <li>Mendorong pertumbuhan Usaha Mikro, Kecil, dan Menengah (UMKM) berbasis potensi lokal guna mendongkrak perekonomian warga.</li>
          <li>Mengembangkan pariwisata berkelanjutan berbasis keindahan alam (desa wisata) dan pelestarian seni budaya tradisional Wonosobo.</li>
          <li>Meningkatkan penyediaan infrastruktur desa yang memadai dengan tetap menjaga kelestarian alam lereng Gunung Sumbing.</li>
        </ol>
      `
    },
    geografis: {
      title: "Letak Geografis",
      content: `
        <p><strong>Desa Bowongso</strong> terletak di lereng barat Gunung Sumbing dengan ketinggian rata-rata berkisar antara <strong>1.400 hingga 1.800 meter di atas permukaan laut (mdpl)</strong>. Kondisi topografinya didominasi oleh perbukitan terjal dan pegunungan dengan kemiringan tanah yang bervariasi.</p>
        <p>Batas-batas wilayah administratif Desa Bowongso adalah sebagai berikut:</p>
        <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; list-style-type: square;">
          <li><strong>Utara:</strong> Kawasan Perhutani Gunung Sumbing / Desa Kwadungan</li>
          <li><strong>Timur:</strong> Kawasan Puncak Gunung Sumbing</li>
          <li><strong>Selatan:</strong> Desa Butuh, Kecamatan Kalikajar</li>
          <li><strong>Barat:</strong> Desa Lamuk, Kecamatan Kalikajar</li>
        </ul>
        <p>Suhu udara di Desa Bowongso relatif dingin, berkisar antara <strong>14°C hingga 22°C</strong>, menjadikannya lokasi yang sangat ideal untuk pembudidayaan tanaman hortikultura, sayuran dataran tinggi, dan tanaman kopi Arabika yang membutuhkan iklim sejuk. Desa ini juga memiliki tanah vulkanik yang sangat subur kaya unsur hara makro.</p>
      `
    },
    pemerintahan: {
      title: "Pemerintahan Desa",
      content: `
        <p>Struktur organisasi Pemerintah Desa Bowongso dipimpin oleh Kepala Desa yang dibantu oleh Perangkat Desa, Badan Permusyawaratan Desa (BPD), dan Lembaga Kemasyarakatan Desa lainnya.</p>
        <p>Berikut adalah susunan kepengurusan Pemerintah Desa Bowongso periode saat ini:</p>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; text-align: left;">
          <thead>
            <tr style="border-bottom: 2px solid var(--color-primary); font-weight: bold; color: var(--color-primary-dark);">
              <th style="padding: 0.75rem 0;">Jabatan</th>
              <th style="padding: 0.75rem 0;">Nama Pejabat</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--color-cream-dark);">
              <td style="padding: 0.75rem 0; font-weight: 500;">Kepala Desa</td>
              <td style="padding: 0.75rem 0;">H. Ahmad Fauzi</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-cream-dark);">
              <td style="padding: 0.75rem 0; font-weight: 500;">Sekretaris Desa</td>
              <td style="padding: 0.75rem 0;">Bambang Supriyanto, S.Sos.</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-cream-dark);">
              <td style="padding: 0.75rem 0; font-weight: 500;">Kasi Pemerintahan</td>
              <td style="padding: 0.75rem 0;">Dwi Cahyo Utomo</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-cream-dark);">
              <td style="padding: 0.75rem 0; font-weight: 500;">Kasi Kesejahteraan & Pelayanan</td>
              <td style="padding: 0.75rem 0;">Siti Aminah, A.Md.</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-cream-dark);">
              <td style="padding: 0.75rem 0; font-weight: 500;">Kaur Keuangan</td>
              <td style="padding: 0.75rem 0;">Hendra Setiawan</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-cream-dark);">
              <td style="padding: 0.75rem 0; font-weight: 500;">Ketua BPD</td>
              <td style="padding: 0.75rem 0;">Drs. Joko Purwanto</td>
            </tr>
          </tbody>
        </table>
        <p>Pemerintah Desa senantiasa mengedepankan asas musyawarah untuk mufakat serta pemanfaatan dana desa secara transparan demi akselerasi pembangunan berkelanjutan di Desa Bowongso.</p>
      `
    }
  };

  readMoreLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const type = e.currentTarget.getAttribute('data-modal-type');
      if (detailData[type]) {
        modalTitle.innerHTML = detailData[type].title;
        modalBody.innerHTML = detailData[type].content;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Disable background scrolling
      }
    });
  });

  // Close card modal
  const closeModalFunc = () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Enable scrolling again
  };

  if (modalClose) {
    modalClose.addEventListener('click', closeModalFunc);
  }

  // Close modals when clicking outside contents
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModalFunc();
    }
  });

  // --- LIGHTBOX GALLERY ---
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxTitle = document.querySelector('.lightbox-caption h4');
  const lightboxDesc = document.querySelector('.lightbox-caption p');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  let currentImageIndex = 0;
  const galleryDataList = [];

  // Initialize gallery data array
  galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-overlay-text h4').innerText;
    const desc = item.querySelector('.gallery-overlay-text p').innerText;
    
    galleryDataList.push({
      src: img.getAttribute('src'),
      title: title,
      desc: desc
    });

    item.addEventListener('click', () => {
      currentImageIndex = index;
      openLightbox();
    });
  });

  function openLightbox() {
    updateLightboxContent();
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function updateLightboxContent() {
    const data = galleryDataList[currentImageIndex];
    lightboxImg.setAttribute('src', data.src);
    lightboxTitle.innerText = data.title;
    lightboxDesc.innerText = data.desc;
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex - 1 + galleryDataList.length) % galleryDataList.length;
      updateLightboxContent();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex + 1) % galleryDataList.length;
      updateLightboxContent();
    });
  }

  // Close lightbox clicking outside the image
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation for Lightbox and Modals
  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
      if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
    }
    if (modal.style.display === 'flex') {
      if (e.key === 'Escape') closeModalFunc();
    }
  });
});

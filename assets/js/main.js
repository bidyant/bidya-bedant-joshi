(function() {
  "use strict";
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  
  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})();

//age automation


 function calculateAge(birthDate) {
      const dob = new Date(birthDate);
      const ageInMilliseconds = Date.now() - dob.getTime();
      const ageDate = new Date(ageInMilliseconds);

      const years = ageDate.getUTCFullYear() - 1970;
      const months = ageDate.getUTCMonth();
      const days = ageDate.getUTCDate() - 1; // -1 to account for the 0-indexed day in the month
      const hours = ageDate.getUTCHours();

      return {
        years: years,
        months: months,
        days: days,
        hours: hours
      };
    }

    // Example usage with the birth date: "08/30/2002"
    const birthDate = "08/30/2002";
    const ageT = calculateAge(birthDate);

    const ageText = `${ageT.years} years, ${ageT.months} months, ${ageT.days} days and ${ageT.hours} hours.`;

    document.getElementById("age").innerText = ageText;


//add skills 

function setValues(arr,target)
{
    var container=document.getElementById(target);
    for(let i=0; i<arr.length;i++)
    {
    var progress=document.createElement("div");
    progress.classList.add('progress');
    var span = document.createElement("span");
    span.classList.add("skill");
    span.innerText=arr[i][0];

    progress.appendChild(span);
    container.appendChild(progress);
    }
}

//add left side
var arr_left=[
  ['TEACHING PHYSICS',60],
  ['COMPUTATIONAL PHYSICS',30],
  ['CONTENT WRITING FOR PHYSICS & MATH',70],
  ['SCILAB & MATLAB',40],
  ['STATISTICS',30],
  ['UI/UX FIGMA',50],
  ['ELECTRONIC DEVICES & IOT',25]
];
setValues(arr_left,"left_skills");

//add right side

var arr_right=[
  ['FULL STAC WEB DEVELOPMENT',60],
  ['ANDROID APP DEVELOPMENT JAVA & KOTLIN',80],
  ['C & C++ PROGRAMMING',65],
  ['PYTHON PROGRAMMING',60],
  ['PHOTOGRAPHY & VIDEOGRAPHY',40],
  ['PHOTO EDITING / PHOTOSHOP & LIGHTROOM',50],
  ['VIDEO EDITING / PRIMERER PRO',60]
];

setValues(arr_right,"right_skills");

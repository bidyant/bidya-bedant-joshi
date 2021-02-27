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

var dob = new Date("08/30/2002");
 var month_diff = Date.now() - dob.getTime();
 var age_dt = new Date(month_diff); 
  var year = age_dt.getUTCFullYear();
  var age = Math.abs(year - 1970);
document.getElementById("age").innerText=age;

//get current url
document.getElementById("website").innerText =window.location.href;

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

    var val=document.createElement("i");
    val.classList.add("val");
    if(arr[i][0]=='TYPING SPEED')
    {
    val.innerText=arr[i][1]+"WPM / 100 WPM";
    }
    else{
    val.innerText=arr[i][1]+"%";
    }

    var progress_bar_wrap=document.createElement("div");
    progress_bar_wrap.classList.add("progress-bar-wrap");


    var progress_bar =document.createElement("div");
    progress_bar.classList.add("progress-bar");
    progress_bar.setAttribute("role","progressbar");
    progress_bar.setAttribute("aria-valuenow",arr[i][1]);
    progress_bar.setAttribute("aria-valuemin","20");
    progress_bar.setAttribute("aria-valuemax","100");

    progress_bar_wrap.appendChild(progress_bar);
    span.appendChild(val);

    progress.appendChild(span);
    progress.appendChild(progress_bar_wrap);

    container.appendChild(progress);
    }
}

//add left side
var arr_left=[
  ['HTML',100],
  ['XML / JSON',100],
  ['CSS',60],
  ['BOOTSTRAP',98],
  ['JAVASCRIPT',75],
  ['AJAX',100],
  ['APP ML',80],
  ['REACT JS',70],
  ['REACT NATIVE',25],
  ['PHOTO EDITING / ADOBE PHOTOSHOP',50],
  ['VIDEO EDITING / ADOBE PRIMERER PRO',60],
  ['3D GRAPHICS / BLENDER',45],
  ['MICROSOFT OFFICE / GOOGLE DOCS',75],
  ['TYPING SPEED',55]
];
setValues(arr_left,"left_skills");

//add right side

var arr_right=[
  ['PHP',80],
  ['DATABASE (MYSQL,MONGODB,FIREBASE)',50],
  ['SQL',30],
  ['NODE.JS',80],
  ['EXPRESS.JS',25],
  ['C PROGRAMMING',85],
  ['C++',80],
  ['JAVA',75],
  ['PYTHON',55],
  ['BLOGGER',72],
  ['ANDROID DEVELOPMENT',20],
  ['CHART.JS',55],
  ['DS ALGO',10],
  ['DIGITAL MARKATING',20]
];

setValues(arr_right,"right_skills");

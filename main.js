gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis()

lenis.on('scroll', (e) => {
  //   console.log(e)
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

/////////////////////////////////////
const wrapElements = (elems, wrapType, wrapClass) => {
  elems.forEach(char => {
    const wrapEl = document.createElement(wrapType);
    wrapEl.classList = wrapClass;
    char.parentNode.appendChild(wrapEl);
    wrapEl.appendChild(char);
  });
}

Splitting();
/////////////////////////////////////



//proloading시 scroll 움직이는 못하게 막기
function showLoadingScreen() {
  document.body.classList.add('loading');
  window.scrollTo(0, 0);
}
function hideLoadingScreen() {
  document.body.classList.remove('loading');
}
showLoadingScreen();

// preload
let container=document.querySelector("#progress");
let progressBar=document.querySelector(".progress-bar");

let imgLoaded=0;
let imgTotal=500;
let current = 0;
let progressTimer;
let topValue;


progressTimer=setInterval(updateProgress,1000/120)


function updateProgress(){
  imgLoaded++;
  //console.log(imgLoaded)
  let target=(imgLoaded/imgTotal)*100;
  
  current += (target - current)*0.01;
  //current = current + (target - current)*0.01;
  progressBar.style.width=current + "%";
  //progressText.innerHTML=Math.floor(current) + "%";//Math.floor 버림
  //console.log(current)
  let sp;
  if(current>99.9){
      clearInterval(progressTimer)
      container.classList.add("progress-complete")
      progressBar.style.width="100%";
      gsap.to(container,{
          duration:1,
          yPercent : -100,
          ease:"none",
          onUpdate:function scrollPrevent(){
              showLoadingScreen();
              sp= requestAnimationFrame(scrollPrevent)
              setTimeout(()=>{
                  cancelAnimationFrame(sp);
                  hideLoadingScreen();
              }, 10);
          },
          
      })
  }
  
}


//one 웰컴
let tl1 = gsap.timeline();
tl1.from(".h1A", {
    x: -1300,
    delay: 6
  })
  .from(".h1B", {
    x: -1000
  })
  .from(".h1C", {
    x: -1500
  })



//각 영역으로 이동, 헤더
let scrollActive = () => {
  let scrollYY = scrollY;
  let sections = document.querySelectorAll("section[id]");

  sections.forEach((current) => {
    let sectionHeight = current.offsetHeight;
    let sectionTop = current.offsetTop - 80;

    let sectionId = current.getAttribute("id");
    // console.log(sectionId)

    let sectionClass = document.querySelector(
      `.nav_menu a[href*="${sectionId}"]`
    );

    if (scrollYY > sectionTop && scrollYY <= sectionTop + sectionHeight) {
      // console.log("실행");
      sectionClass.classList.add("action-link");
    } else {
      sectionClass.classList.remove("action-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);


///////////시계
setInterval(() => {
  let today = new Date();
  let dayList = [
    "sunday",
    "monday",
    "tuseday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  let hh = addZero(today.getHours());
  let mm = addZero(today.getMinutes());
  let ss = addZero(today.getSeconds());
  let MM = addZero(today.getMonth() + 1);
  let DD = addZero(today.getDate());
  let YY = addZero(today.getFullYear());
  let dd = dayList[today.getDay()].toUpperCase(); //0~6
  // console.log(dd);

  document.querySelector("#hours").innerHTML = hh;
  document.querySelector("#min").innerHTML = mm;
  document.querySelector("#sec").innerHTML = ss;
  document.querySelector("#month").innerHTML = MM;
  document.querySelector("#date").innerHTML = DD;
  document.querySelector("#year").innerHTML = YY;
  document.querySelector("#day").innerHTML = dd;

  function addZero(num) {
    return num < 10 ? "0" + num : num;
  }
}, 1000);


//////// two text
let splitTypes = document.querySelectorAll(".heading-large")

splitTypes.forEach(function (char, i) {
  let parent = char.parentNode.parentNode;
  const text = new SplitType(char, {
    types: 'chars'
  })
  // console.log(text)

  gsap.from(text.chars, {
    opacity: 0,
    yPercent: 100,
    duration: 0.4,
    stagger: 0.04,
    scrollTrigger: {
      trigger: parent,
      start: "top 60%",
      end: "top 20%",
      ease: "power3.out"
    }
  })
})

//텍스트의 사라지는 방향 애니
gsap.to("[data-direct]", {
  x: (i, el) => -(el.getAttribute("data-direct")) * 700,
  ease: "none",
  scrollTrigger: {
    trigger: ".text_wrap",
    start: "top top",
    end: "bottom 100%",
    duration: 4,
    scrub: 3,
  }
})

////영역 아래에서 위로
const panel = document.querySelector(".one")

ScrollTrigger.create({
  trigger: panel,
  start: "top top",
  end: "bottom top",
  pin: true,
  pinSpacing: false
})

/////////three 이미지
let imgBoxx = document.querySelectorAll('.imgBoxx')

imgBoxx.forEach(function (imgBoxx) {
  gsap.timeline({
    scrollTrigger: {
      trigger: imgBoxx,
      start: "50% 100%",
      toggleClass: {
        targets: imgBoxx,
        className: 'active'
      },
      scrub: 1
    }
  })
})


/////////three 텍스트
let txtBox = document.querySelectorAll('.three .th h3')

txtBox.forEach(function (textBox) {
  gsap.timeline({
    scrollTrigger: {
      trigger: textBox,
      start: "50% 100%",
      toggleClass: {
        targets: textBox,
        className: 'active'
      },
      scrub: 1
    }
  })
})

// three 네모
document.addEventListener('DOMContentLoaded', () => {
  let gsapSq = document.querySelectorAll(".square");
  gsapSq.forEach(function (gSq, i) {
    let rotate = gsap.from(gSq, {
      duration: 3,
      rotation: 720
    });
    ScrollTrigger.create({
      trigger: gSq,
      start: "top bottom",
      scrub: 1.9,
      animation: rotate
    });
  });
});

//////// three 소개
let mainText = document.querySelectorAll('.mainText span')

mainText.forEach(function (mainText) {
  gsap.timeline({
    scrollTrigger: {
      trigger: mainText,
      start: "50% 100%",
      toggleClass: {
        targets: mainText,
        className: 'active'
      },
      scrub: 1
    }
  })
})

//////////four 내이미지
gsap.to(
  ".four main", {
    yPercent: -30,
    ease: "none",
    scrollTrigger: {
      trigger: ".four",
      start: "top top",
      scrub: 1,
      end: "+=200%",
      pin: true,
      onUpdate: (self) => {
        gsap.to([".tiles__line1", ".tiles__line3", ".tiles__line5"], {
          yPercent: -10 * self.progress,
          ease: "none",
        });
        gsap.to([".tiles__line2", ".tiles__line4"], {
          yPercent: 30 * self.progress,
          ease: "none",
        });
      },

    },
  },
  0
);


//five 가로스크롤
let list = document.querySelectorAll(".five ul li");
let imgBoxs = document.querySelectorAll(".imgBox")
let textBox = document.querySelectorAll(".textBox")


let scrollTween = gsap.to(list, {
  xPercent: -100 * (list.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".five",
    start: "center center",
    scrub: 1,
    end: "+=300%",
    pin: true
  }
})


//배열안에 요소를 하나씩 가져와서 어떤 일을 시킨다.
imgBoxs.forEach(function (imgBox) {
  gsap.timeline({
      scrollTrigger: {
        trigger: imgBox,
        start: "center right",
        end: 'center center',
        containerAnimation: scrollTween,
        scrub: true,
        // markers:true
      }
    })
    .to(imgBox, {
      'clip-path': 'inset(0%)',
      ease: "none",
      duration: 1
    }, 0)

  //왼쪽으로 사라질때 이미지를 작게
  gsap.timeline({
      scrollTrigger: {
        trigger: imgBox,
        start: "center center",
        end: 'center left',
        containerAnimation: scrollTween,
        scrub: true,
        // markers:true
      }
    })
    .to(imgBox, {
      'clip-path': 'inset(30%)',
      ease: "none",
      duration: 1
    }, 0)
})

textBox.forEach(function (txtBox) {
  gsap.timeline({
      scrollTrigger: {
        trigger: txtBox,
        start: "center 100%",
        end: 'center 100%',
        containerAnimation: scrollTween,
        scrub: true,
        // markers:true
      }
    })
    .to(txtBox, {
      opacity: 0
    }, 0)

})

textBox.forEach(function (txtBox) {
  gsap.timeline({
      scrollTrigger: {
        trigger: txtBox,
        start: "center 70%",
        end: 'center 40%',
        containerAnimation: scrollTween,
        scrub: true,
        // markers:true
      }
    })
    .to(txtBox, {
      opacity: 1,
      x: -100
    }, 0)

})


textBox.forEach(function (txtBox) {
  gsap.timeline({
      scrollTrigger: {
        trigger: txtBox,
        start: "center 30%",
        end: 'center 20%',
        containerAnimation: scrollTween,
        scrub: true,
        // markers:true
      }
    })
    .to(txtBox, {
      opacity: 0
    }, 0)

})

// six 비행기
let path1 = document.querySelector('#path');
let path1Length = path1.getTotalLength();
// console.log(path1Length)

path1.style.strokeDasharray = path1Length;
path1.style.strokeDashoffset = path1Length;

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".six",
    start: "top top",
    end: "200% bottom",
    scrub: 1,
    pin: true,
    //   markers:true
  }
})

tl.to(path1, {
  strokeDashoffset: 0
}, "plane")
tl.to(".paper-plane", {
  offsetDistance: "100%"
}, "plane")



///////////////////////////
// 비행기의 방향
window.addEventListener("wheel", myFunction)

let plane = document.querySelector('.paper-plane')

function myFunction(event) {
  let y = event.deltaY;
  // console.log(y)

  if (y > 0) {
    plane.style.transform = `rotate(0deg)`;
  } else {
    plane.style.transform = `rotate(180deg)`;
  }
}


//////////six 스킬바
let executed = false;

function animateSkills() {
  document.querySelectorAll('.skill-per').forEach((perElement) => {
    gsap.to(perElement, {
      duration: 2,
      width: perElement.getAttribute('per') + "%",
      onUpdate: function () {
        perElement.setAttribute("per", Math.ceil(this.progress() * parseInt(perElement.style.width)) + "%")
      }
    })
  })
}

ScrollTrigger.create({
  trigger: ".skillmain",
  start: "top 30%",
  onEnter: () => {
    if (!executed) {
      animateSkills();
      executed = true
    }
  }

})


////six-seven 동글배경/////////////////////////////////
let initalPath = "M1000 706H0V106C87.5 63.3333 319.1 0.5 495.5 0.5C671.9 0.5 902.333 63.3333 1000 106V706Z"
let targetPath = "M1000 600H0V0C0 0 319.1 50.5 495.5 50.5C671.9 50.5 1000 0 1000 0V600Z"

let svgWraps = document.querySelectorAll(".svg-container");

svgWraps.forEach((svgWrap) => {
  let itemSvg = svgWrap.querySelector("svg path")

  itemSvg.setAttribute("d", initalPath)

  gsap.to(itemSvg, {
    attr: {
      d: targetPath
    },
    scrollTrigger: {
      trigger: svgWrap,
      start: "top 70%",
      end: "+=20%",
      ease: "linear",
      scrub: 1,
      // markers: true,
    },
  })
})


////seven 배경색변경/////////////////////////////////
let backColor = document.querySelectorAll("[data-bgcolor]")
//console.log(backColor)

backColor.forEach(function (item, index) {
  let prevBg = index == 0 ? "" : backColor[index - 1].dataset.bgcolor
  ScrollTrigger.create({
    trigger: item,
    start: "top 50%",
    end: "bottom 5%",
    duration: 1,
    onEnter: function () {
      gsap.to(".seven", {
        backgroundColor: item.dataset.bgcolor
      })
    },
    onLeaveBack: function () {
      gsap.to(".seven", {
        backgroundColor: prevBg
      })
    }
  })
})


////seven 글자 등장
let titletext = document.querySelectorAll('.title_text')

titletext.forEach(function (titletext) {
  gsap.timeline({
    scrollTrigger: {
      trigger: titletext,
      start: "50% 100%",
      toggleClass: {
        targets: titletext,
        className: 'active'
      },
      scrub: 1
    }
  })
})

//seven 플립스크롤
let clutter = ""
let page2_h2 = document.querySelector(".sideText h3").textContent.split("")


page2_h2.forEach(function (dets) {
  clutter += `<span>${dets}</span>`
  document.querySelector(".sideText h3").innerHTML = clutter
})

gsap.to(".sideText h3>span", {
  scrollTrigger: {
    trigger: ".sideText h3>span",
    start: "top bottom",
    end: "bottom top",
    scroller: "body",
    scrub: 0.5
  },
  color: "#1D1E26",
  stagger: 0.2,
})


//seven 패러랙스
const fx4Titles = [...document.querySelectorAll('.content__titleA[data-splitting][data-effect1]')];

fx4Titles.forEach(title => {

  const words = title.querySelectorAll('.word');

  for (const word of words) {

    const chars = word.querySelectorAll('.char');

    gsap.fromTo(chars, {
      'will-change': 'opacity, transform',
      x: (position, _, arr) => 150 * (position - arr.length / 2)
    }, {
      ease: 'power1.inOut',
      x: 0,
      stagger: {
        grid: 'auto',
        from: 'center'
      },
      scrollTrigger: {
        trigger: word,
        start: 'center bottom+=30%',
        end: 'top top+=15%',
        scrub: true,
      }
    });

  };

});

//seven 스시
let pTag1 = document.querySelector('.first-parallel');

let imageArr1 = [
  './img/sushi(1).png',
  './img/sushi(2).png',
  './img/sushi(3).png',
  './img/sushi(4).png',
  './img/sushi(5).png',
];

let count1 = 0;

initImages(pTag1, imageArr1);

function initImages(element, imageArray) {
  imageArray.push(...imageArray);
  imageArray.push(...imageArray);
  for (let i = 0; i < imageArray.length; i++) {
    let img = document.createElement("img");
    img.src = imageArray[i];
    img.alt = `Image${i + 1}`;
    element.appendChild(img);
  }
}

function animate() {
  count1++;
  count1 = marqueeText(count1, pTag1, -1);
  requestAnimationFrame(animate);
}

function marqueeText(count, element, direction) {
  if (count > element.scrollWidth / 2) {
    count = 0;
    element.style.transform = `translate(0, 0)`;
  }
  element.style.transform = `translate(${count * direction}px, 0)`;
  return count;
}

function scrollHandler() {
  count1 += 10;
}

window.addEventListener("scroll", scrollHandler);

animate();



// seven 글자
const fx8Titles = [...document.querySelectorAll('.sec01 .content__title[data-splitting][data-effect8]')];

console.log(fx8Titles)

const lettersAndSymbols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '!', '@', '#', '$', '%', '^', '&', '*', '-', '_', '+', '=', ';', ':', '<', '>', ','];
fx8Titles.forEach(title => {

  const chars = title.querySelectorAll('.sec01 .char');

  chars.forEach((char, position) => {
    let initialHTML = char.innerHTML;

    gsap.fromTo(char, {
      opacity: 0
    }, {
      duration: 0.03,
      innerHTML: () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)],
      repeat: 1,
      repeatRefresh: true,
      opacity: 1,
      repeatDelay: 0.03,
      delay: (position + 1) * 0.2,
      onComplete: () => gsap.set(char, {
        innerHTML: initialHTML,
        delay: 0.03
      }),
      scrollTrigger: {
        trigger: title,
        start: '1600% center',
        end: '+=200%',
        //markers:true,
        toggleActions: "play resume restart reset",
        onEnter: () => gsap.set(char, {
          opacity: 0
        })
      }
    });

  });

});


//seven 글자2
let isFirefox = typeof InstallTrigger !== 'undefined';
const words = "Publisher & Designer Publisher & Designer Publish";

let ANGLE = 360;
const ANIMATION_DURATION = 4000;

const animation = () => {
  ANGLE -= 1; // Incremento do ângulo
  document.querySelectorAll(".spiral *").forEach((el, i) => {

    const translateY = Math.sin(ANGLE * (Math.PI / 120)) * 100;
    const scale = Math.cos(ANGLE * (Math.PI / 120)) * 0.5 + 0.5;


    const offset = parseInt(el.dataset.offset);
    const delay = i * (ANIMATION_DURATION / 16) - offset;

    setTimeout(() => {
      el.style.transform = `translateY(${translateY}px) scale(${scale})`;
    }, delay);
  });

  requestAnimationFrame(animation);
};

const characters = words.split("").forEach((char, i) => {
  const createElement = (offset) => {
    const div = document.createElement("div");
    div.innerText = char;
    div.classList.add("character");
    div.setAttribute("data-offset", offset);
    div.style.animationDelay = `-${i * (ANIMATION_DURATION / 16) - offset}ms`
    return div;
  };

  document.querySelector("#spiral").append(createElement(0));
  document
    .querySelector("#spiral2")
    .append(createElement((isFirefox ? 1 : -1) * (ANIMATION_DURATION / 2)));
});


if (isFirefox) {
  animation();
}


//wavs
gsap.to(".wave", {
  xPercent: -20,
  scrollTrigger: {
    trigger: ".wave",
    start: "90% 100%",
    end: "+=100%",
    scrub: 1
  }
})

let cardWrapper = document.querySelectorAll(".cards_item");
let cardsEl = document.querySelectorAll(".cards_item .cards_el");
console.log(cardsEl)

cardWrapper.forEach(function (e, i) { //e:아이템, i:아이템의 index
  let card = cardsEl[i]
  let img = e.querySelector(".cards_img img");
  let scale = 1;
  let rotate = 0;

  if (i !== cardsEl.length - 1) {
    scale = 0.9 + 0.025 * 1;
    rotate = -10;
  }
  gsap.to(card, {
    scale: scale,
    rotateX: rotate,
    transformOrigin: "center top",
    ease: "none",
    scrollTrigger: {
      trigger: e,
      start: "top " + (100 + 40 * i),
      end: "bottom +=650px",
      pin: e,
      endTrigger: ".end-anim",
      scrub: 1,
      pinSpacing: false,
    }
  })
})


//8수평슬라이드
let horSection = document.querySelectorAll('.port_desc .port')

gsap.to(horSection, {
  xPercent: -97 * (horSection.length - 1),
  scrollTrigger: {
    trigger: ".port_desc",
    start: "top 25%",
    end: "+=5000",
    scrub: 4,
    pin: true,
  }
})

//My work
let scrollup = () => {
  let port_title = document.querySelector(".port_title")

  if (scrollY >= 20783) {
    port_title.style.opacity = 1
  } else {
    port_title.style.opacity = 0
  }
  if (scrollY >= 25183) {
    port_title.style.opacity = 0
  }
};

window.addEventListener("scroll", scrollup);

//8 세로네모
gsap.timeline({
    scrollTrigger: {
      trigger: ".eight",
      start: "top top",
      end: "+=100%",
      scrub: 1,
      duration: 5,
      pin: true
    }
  })
  .fromTo(".nemo", {
    height: 0
  }, {
    height: `100vh`,
    stagger: 0.04
  })

//slicer_card
gsap.set(".slider-left img:first-child", {
  xPercent: 50
})
gsap.set(".slider-left img:not(:first-child)", {
  xPercent: 100
})

gsap.to(".slider-left .img-1", {
  ease: "none",
  xPercent: -95,
  scale: 0.6,
  scrollTrigger: {
    trigger: ".slider-card",
    start: "center+=" + 180 + " center",
    end: "center+=" + 900 + " center",
    scrub: 1
  }
})

gsap.to(".slider-left .img-2", {
  ease: "none",
  xPercent: -70,
  scale: 0.7,
  scrollTrigger: {
    trigger: ".slider-card",
    start: "center+=" + 360 + " center",
    end: "center+=" + 900 + " center",
    scrub: 1
  }
})

gsap.to(".slider-left .img-3", {
  ease: "none",
  xPercent: -40,
  scale: 0.8,
  scrollTrigger: {
    trigger: ".slider-card",
    start: "center+=" + 540 + " center",
    end: "center+=" + 900 + " center",
    scrub: 1
  }
})

gsap.to(".slider-left .img-4", {
  ease: "none",
  xPercent: -10,
  scale: 0.9,
  scrollTrigger: {
    trigger: ".slider-card",
    start: "center+=" + 720 + " center",
    end: "center+=" + 900 + " center",
    scrub: 1
  }
})

gsap.to(".slider-left .img-5", {
  ease: "none",
  xPercent: 20,
  scale: 1,
  scrollTrigger: {
    trigger: ".slider-card",
    start: "center+=" + 800 + " center",
    end: "center+=" + 900 + " center",
    scrub: 1
  }
})


//right
gsap.set(".slider-right img:first-child", {
  xPercent: -50
})
gsap.set(".slider-right img:not(:first-child)", {
  xPercent: -100
})

gsap.to(".slider-right .img-1", {
  ease: "none",
  xPercent: 95,
  scale: 0.6,
  scrollTrigger: {
    trigger: ".slider-card",
    start: "center+=" + 180 + " center",
    end: "center+=" + 900 + " center",
    scrub: 1
  }
})

gsap.to(".slider-right .img-2", {
  ease: "none",
  xPercent: 70,
  scale: 0.7,
  scrollTrigger: {
    trigger: ".slider-card",
    start: "center+=" + 360 + " center",
    end: "center+=" + 900 + " center",
    scrub: 1
  }
})

gsap.to(".slider-right .img-3", {
  ease: "none",
  xPercent: 40,
  scale: 0.8,
  scrollTrigger: {
    trigger: ".slider-card",
    start: "center+=" + 540 + " center",
    end: "center+=" + 900 + " center",
    scrub: 1
  }
})

gsap.to(".slider-right .img-4", {
  ease: "none",
  xPercent: 10,
  scale: 0.9,
  scrollTrigger: {
    trigger: ".slider-card",
    start: "center+=" + 720 + " center",
    end: "center+=" + 900 + " center",
    scrub: 1
  }
})

gsap.to(".slider-right .img-5", {
  ease: "none",
  xPercent: -20,
  scale: 1,
  scrollTrigger: {
    trigger: ".slider-card",
    start: "center+=" + 800 + " center",
    end: "center+=" + 900 + " center",
    scrub: 1
  }
})

//slider-card에 공간만들고 pin설정
gsap.to(".slider-card", {
  ease: "linear",
  scrollTrigger: {
    trigger: ".sec01",
    start: "center center",
    end: "+=1500",
    pin: true,
    scrub: 1
  }
})

//초록원
gsap.timeline({
    scrollTrigger: {
      trigger: '.sec02',
      start: "top 50%",
      end: "30% top",
      scrub: 2,
      // markers:true
    }
  })

  .fromTo(".circle", {
    width: 0,
    height: 0,
    top: '3%'
  }, {
    width: 2500,
    height: 2500,
    top: '30%'
  })

// textBox
gsap.timeline({
    scrollTrigger: {
      trigger: '.sec02 .secTxt',
      start: "top 80%",
      end: "100% 80%",
      scrub: 2,
      // markers:true
    }
  })

  .fromTo(".secTxt", {
    top: '50%',
    opacity: 0
  }, {
    top: '40%',
    opacity: 1
  })

//shin
let shin = () => {
  let port_title = document.querySelector(".tracker")
  console.log(scrollY);

  if (scrollY >= 28870) {
    port_title.style.opacity = 1
  } else {
    port_title.style.opacity = 0
  }
};

window.addEventListener("scroll", shin);
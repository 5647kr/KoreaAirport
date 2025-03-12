class KoreaAirport {
  constructor() {
    const header = document.querySelector("header");
    this.headerWrap = header.querySelector(".headerWrap")
    this.menu = header.querySelector(".menuWrap");
    this.mainMenu = header.querySelectorAll(".mainMenu > li");
    this.mainTitle = header.querySelectorAll(".mainMenu .mainTitle");
    this.menuBg = header.querySelector(".menuBg");
    this.menuBtn = header.querySelector(".quickMenu li:last-child button");
    this.menuCloseBtn = header.querySelector(".menuWrap .menuCloseBtn");
    this.detailMenuBtn = header.querySelectorAll(".subMenu span > button");
    this.detailMenu = header.querySelectorAll(".detailMenu");

    this.whiteIcon = header.querySelectorAll(".whiteImg");
    this.coloredIcon = header.querySelectorAll(".coloredImg");


    const main = document.querySelector("main");
    this.introSection = main.querySelector("#introSection");
    this.introNoticeList = main.querySelector("#introSection .noticeList");

    this.airportSection = main.querySelector("#airportSection");
    this.guideList = main.querySelector("#airportSection .guideList");
    this.leftBtn = main.querySelector("#airportSection .toggleBtnWrap button")
    this.rightBtn = main.querySelector("#airportSection .toggleBtnWrap button:last-child");
    

    // fullPage navigation
    this.sections = document.querySelectorAll("section");
    this.pageNav = main.querySelector(".pageNav");
    this.navList = main.querySelectorAll(".pageNav ul li");
    this.navIcon = main.querySelectorAll(".pageNav ul li .navIcon");
    this.currentSection = 0;
  }

  pageEvent() {
    this.headerEvent();
    this.introNoticeEvent();
    this.mainImgFadeEvent();
    this.defaultImgSlide();

    this.fullPageEvent();
    this.navIconEvent();
  }

  headerEvent() {
    // 모바일 ~ 노트북 메뉴창 열기기
    this.menuBtn.addEventListener("click", () => {
      this.menuBg.style.display = "block";
      this.menu.classList.add("active");
      document.body.style.overflow = "hidden";
    })
    
    this.menuCloseBtn.addEventListener("click", () => {
      this.menuBg.style.display = "none";
      this.menu.classList.remove("active");
      document.body.style.overflow = ""
    })


    // 메인 메뉴 선택, 세부 메뉴 열기
    this.mainMenu.forEach((menu) => {
      menu.addEventListener("click", () => {
        const activeMenu = Array.from(this.mainMenu).find(m => m.classList.contains("active"));

        if(activeMenu) {
          activeMenu.classList.remove("active")
        }

        menu.classList.add("active")
      })
    })

    this.detailMenuBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const img = e.target.closest("img");
        const span = e.target.closest("span");
        const nextElement = span ? span.nextElementSibling : null;
    
        // img가 있는 경우 회전 상태를 토글
        if (img) {
          if (img.style.transform === "rotate(180deg)") {
            img.style.transform = "rotate(0deg)";
          } else {
            img.style.transform = "rotate(180deg)";
          }
        }
    
        // span의 다음 형제 요소의 display를 토글
        if (nextElement) {
          if (nextElement.style.display === "block") {
            nextElement.style.display = "none";
          } else {
            nextElement.style.display = "block";
          }
        }
      });
    });
    

    // pc ~ 4k menuBg 열기기
    this.mainMenu.forEach((menu) => {
      menu.addEventListener("mouseover", () => {
        this.menuBg.classList.add("hovered")
      })

      menu.addEventListener("mouseleave", () => {
        this.menuBg.classList.remove("hovered")
      })
    })

    // 스크롤시 헤더디자인 변경
    window.addEventListener("scroll", () => {
      if(window.scrollY > 0) {
        this.headerWrap.classList.add("scrolled")
      } else {
        this.headerWrap.classList.remove("scrolled")
      }
    })
  }

  mainImgFadeEvent() {
    const items = document.querySelectorAll("#introSection .imgWrap li");
    const navButtons = document.querySelectorAll("#introSection .navBtnWrap button");
    let currentIndex = 0;
  
    items[currentIndex].style.opacity = 1;
  
    updateButtonState(currentIndex);
  
    let autoSlideInterval;
  
    // 다음 이미지를 표시하는 함수
    function showNextImage() {
      items[currentIndex].style.animationName = "fadeOut";
  
      currentIndex = (currentIndex + 1) % items.length;
  
      items[currentIndex].style.animationName = "fadeIn";
  
      updateButtonState(currentIndex);
    }
  
    autoSlideInterval = setInterval(showNextImage, 4000);
  
    // 네비게이션 버튼 클릭 이벤트
    navButtons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        clearInterval(autoSlideInterval);
  
        items[currentIndex].style.animationName = "fadeOut";
  
        currentIndex = index;
        items[currentIndex].style.animationName = "fadeIn";
  
        updateButtonState(currentIndex);
  
        autoSlideInterval = setInterval(showNextImage, 4000);
      });
    });
  
    // 버튼 상태를 업데이트하는 함수
    function updateButtonState(index) {
      navButtons.forEach((btn, i) => {
        if (i === index) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });
    }
  }

  // 안내문 애니메이션
  introNoticeEvent() {
    setInterval(() => {
      const firstLi = this.introNoticeList.querySelector("li");
      const animation = firstLi.animate([
        {marginTop: "-40px"}
      ], {
        duration: 2000,
        easing: "linear"
      })
  
      animation.onfinish = () => {
        this.introNoticeList.append(firstLi);
      }
    }, 4000)
  }

  defaultImgSlide() {
    if(window.innerWidth < 769) {
      const guideItems = this.airportSection.querySelectorAll(".guideList > li");
      const lastItem = this.airportSection.querySelector(".guideList > li:last-child");
      this.guideList.insertBefore(lastItem, guideItems[0]);
      
    }
    this.imgSlideEvent();
  }
  
  imgSlideEvent() {
    this.leftBtn.addEventListener("click", () => {
      const guideItems = this.airportSection.querySelectorAll(".guideList > li");
      const lastItem = this.airportSection.querySelector(".guideList > li:last-child");
      this.guideList.insertBefore(lastItem, guideItems[0]);
    })
    
    this.rightBtn.addEventListener("click", () => {
      const firstLi = this.airportSection.querySelector(".guideList > li");
      this.guideList.appendChild(firstLi);
    })
  }


  // fullPage Handle
  fullPageEvent() {
    window.addEventListener("wheel", (e) => {
      if(window.innerWidth > 1201) {
        if (this.isScrolling) return;
  
        this.isScrolling = true;
  
        if (e.deltaY > 0) {
          this.scrollToNextSection();
        } else {
          this.scrollToPreviousSection();
        }
  
        setTimeout(() => {
          this.isScrolling = false;
        }, 200);
      }
    });
  }

  scrollToNextSection() {
    if (this.currentSection < this.sections.length - 1) {
      this.currentSection++;
      this.scrollToSection(this.currentSection);
    }
  }

  scrollToPreviousSection() {
    if (this.currentSection > 0) {
      this.currentSection--;
      this.scrollToSection(this.currentSection);
    }
  }

  scrollToSection(index) {
    const targetSection = this.sections[index];
    window.scrollTo({
      top: targetSection.offsetTop,
      behavior: "smooth",
    });

    this.updateNav(index);
  }

  navIconEvent() {
    this.navIcon.forEach((nav, index) => {
      nav.addEventListener("click", () => {
        this.currentSection = index;
        this.scrollToSection(index);
      });
    });
  }

  updateNav(index) {
    this.navList.forEach((item) => {
      item.classList.remove("active");
    });

    this.navList[index].classList.add("active");

    if (index === parseInt(this.navList.length - 1)) {
      this.pageNav.classList.add("a11y-hidden");
    } else {
      this.pageNav.classList.remove("a11y-hidden");
    }

    if (index === 1 || index === 3) {
      this.pageNav.classList.add("white");
    } else {
      this.pageNav.classList.remove("white");
    }

  }
}

const koreaAirport = new KoreaAirport();
koreaAirport.pageEvent();

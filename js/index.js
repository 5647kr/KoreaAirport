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
  }

  pageEvent() {
    this.headerEvent();
    this.introNoticeEvent();
    this.mainImgFadeEvent();
    this.defaultImgSlide();
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
        const activeMenu = Array.from(this.mainMenu).find(m => m.classList.contains('active'));

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
            img.style.transform = "rotate(0deg)"; // 회전 상태를 되돌림
          } else {
            img.style.transform = "rotate(180deg)"; // 회전
          }
        }
    
        // span의 다음 형제 요소의 display를 토글
        if (nextElement) {
          if (nextElement.style.display === "block") {
            nextElement.style.display = "none"; // 숨기기
          } else {
            nextElement.style.display = "block"; // 보이기
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
    const items = document.querySelectorAll('#introSection .imgWrap li');
    let currentIndex = 0;

    // 첫 번째 이미지를 바로 보이게 설정
    items[currentIndex].style.opacity = 1; // 첫 번째 이미지를 보이게 함

    function showNextImage() {
        // 현재 이미지 fade out
        items[currentIndex].style.animationName = 'fadeOut';
        
        // 다음 이미지 인덱스 계산
        currentIndex = (currentIndex + 1) % items.length;

        // 다음 이미지 fade in
        items[currentIndex].style.animationName = 'fadeIn';
    }

    // 3초마다 showNextImage 함수 호출
    setInterval(showNextImage, 4000);
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
    const guideItems = this.airportSection.querySelectorAll(".guideList > li");
    const lastItem = this.airportSection.querySelector(".guideList > li:last-child");
    this.guideList.insertBefore(lastItem, guideItems[0]);
    
    console.log(lastItem, guideItems)
    
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
}

const koreaAirport = new KoreaAirport();
koreaAirport.pageEvent();

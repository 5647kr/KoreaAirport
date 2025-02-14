class KoreaAirport {
  constructor() {
    const header = document.querySelector("header");
    this.menu = header.querySelector(".menuWrap");
    this.mainMenu = header.querySelectorAll(".mainMenu > li");
    this.menuBg = header.querySelector(".menuBg");
    this.menuBtn = header.querySelector(".quickMenu li:last-child button");
    this.menuCloseBtn = header.querySelector(".menuWrap .menuCloseBtn");
    this.detailMenuBtn = header.querySelectorAll(".subMenu span > button");
    this.detailMenu = header.querySelectorAll(".detailMenu")
  }

  pageEvent() {
    this.openMenu();
  }

  openMenu() {
    // 모바일 ~ 노트북
    this.menuBtn.addEventListener("click", () => {
      this.menuBg.style.display = "block";
      this.menu.classList.add("active");
    })

    this.menuCloseBtn.addEventListener("click", () => {
      this.menuBg.style.display = "none";
      this.menu.classList.remove("active");
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
    

    // pc ~ 4k
    this.mainMenu.forEach((menu) => {
      menu.addEventListener("mouseover", () => {
        this.menuBg.style.display = "block"
      })

      menu.addEventListener("mouseleave", () => {
        this.menuBg.style.display = "none"
      })
    })
  }
}

const koreaAirport = new KoreaAirport();
koreaAirport.pageEvent();

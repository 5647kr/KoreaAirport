class KoreaAirport {
  constructor() {
    const header = document.querySelector("header");
    this.whiteHeaderWrap = header.querySelector(".headerWrap-white")
    this.headerWrap = header.querySelector(".headerWrap-main")
    this.headerImgs = header.querySelectorAll("img");
  }

  event() {
    this.headerControl();
  }

  // 스크롤시 header 디자인 변경
  headerControl() {
    const scrollEvent = () => {
      if (window.scrollY > 0) {
        this.whiteHeaderWrap.classList.add("a11y-hidden")
        this.headerWrap.classList.remove("a11y-hidden")
      } else {
        this.whiteHeaderWrap.classList.remove("a11y-hidden")
        this.headerWrap.classList.add("a11y-hidden")
      }
    };


    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", scrollEvent);
  }

}
const koreaAirport = new KoreaAirport();
koreaAirport.event();
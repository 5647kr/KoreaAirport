# KoreaAirport


## 0. 목차

1. [프로젝트 소개](#1-프로젝트-소개)
2. [기능 구현](#2-기능-구현)
3. [트러블 슈팅](#3-트러블-슈팅)
4. [기술 스택](#4-기술-스택)
5. [코딩 컨벤션](#5-코딩-컨벤션)
6. [시연 이미지](#6-시연-이미지)
7. [미래 개선 방향](#7-미래-개선-방향)
8. [성과 및 느낀 점](#8-성과-및-느낀-점)
<br>

## 1. 프로젝트 소개
KoreaAirport는 인천공항의 디자인을 참고하여 제작한 웹페이지입니다.
모바일, 태블릿, 노트북, pc등 다양한 플랫폼에서 유연하게 동작하는 반응형을 제공합니다.

배포 URL: https://5647kr.github.io/KoreaAirport/

<br>
<br>

## 2. 기능 구현

### 1. 메인 이미지 FadeIn&Out 및 네비게이션 기능
<br>
메인 이미지가 3초마다 FadeIn&Out을 반복하며 하단에 네이게이션을 추가하여 현재 보여지는 이미지가 몇번째 이미지인지 표시해줌과 클릭시, 해당 이미지를 보여주는 기능을 제공합니다.
<br>

```
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
```
<br>

### 2. PC화면에서의 FullPage 기능 구현
<br>
요즘 웹페이지에서 보이는 FullPage 기능을 라이브러리 없이 기능을 구현하였습니다. 좌측에 네비게이션도 추가하여 현재 보는 페이지와 클릭시 해당 페이지로 이동하는 기능을 제공합니다.
<br>

```
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
```

<br>

## 3. 트러블 슈팅

### 1. fullPage footer에서 위로 스크롤시 마지막 섹션을 건너뛰는 현상
<br>
맨 아래까지 스크롤을 내리고 다시 위로 스크롤을 하게 될 경우 기존 마지막 섹션이 활성화 된 상태로 있어, 마지막 섹션 그 위의 섹션으로 이동하는 현상을 알게 되었습니다. 그리하여 footer에 section을 추가하고, 자연스럽게 마지막임을 알리는 네비게이션을 안보이게 하여 footer에도 하나의 page로 인식하여 건너뛰는 것을 수정하였습다.
<br>

```
  <footer>
    <section>
      <img src="./img/logo/logo-white.svg" alt="koreaAirport 로고">
      <p>COPYRIGHTⓒ by koreaAirport. ALL RIGHTS RESERVED</p>
    </section>
  </footer>


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
  }
```
<br>

### 2. 플랫폼에 따라 변화하는 header
<br>
모바일, 태블릿~노트북, pc에서 각기 다른 header를 표현하며 스크롤시, 호버시 변화하는 header를 처리해야했습니다. 이에 클래스명을 적극 활용하여 변화를 처리하였습니다.

```
    // pc ~ 4k menuBg 열기
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
```
<br>

## 4. 기술 스택

<table>
  <tr>
    <td align="center" width="100px">사용 기술</td>
    <td width="800px">
      <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">&nbsp  
      <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">&nbsp 
      <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> &nbsp
    </td>
  </tr>
  <tr>
    <td align="center">기술 도구</td>
    <td>
      <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>&nbsp 
      <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
    </td>
  <tr>
    <td align="center">디자인</td>
    <td>
      <img src="https://img.shields.io/badge/Figma-d90f42?style=for-the-badge&logo=Figma&logoColor=white"/>&nbsp  
    </td>
  </tr>
  <tr>
    <td align="center">IDE</td>
    <td>
      <img src="https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white"/>&nbsp
  </tr>
</table>

<br>

## 5. 코딩 컨벤션

<br>

<detail>
  <table>
    <tr>
      <th>커밋 유형</th>
      <th>커밋 메세지</th>
      <th>의미</th>
    </tr>
    <tr>
      <td>✨</td>
      <td>Feat</td>
      <td>새로운 기능 추가</td>
    </tr>
    <tr>
      <td>🐛</td>
      <td>Fix</td>
      <td>버그 & 에러 수정</td>
    </tr>
    <tr>
      <td>📝</td>
      <td>File</td>
      <td>리드미 등 문서 수정, 라이브러리 설치</td>
    </tr>
    <tr>
      <td>🎨</td>
      <td>Style</td>
      <td>코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우</td>
    </tr>
    <tr>
      <td>🖌</td>
      <td>Design</td>
      <td>UI 디자인 변경</td>
    </tr>
    <tr>
      <td>🔨</td>
      <td>Refactor</td>
      <td>코드 리팩토링</td>
    </tr>
    <tr>
      <td>🤔</td>
      <td>Test</td>
      <td>테스트 코드, 리팩토링 테스트 코드 추가</td>
    </tr>
    <tr>
      <td>⚙</td>
      <td>Chore</td>
      <td>빌드 업무 수정, 패키지 매니저 수정</td>
    </tr>
    <tr>
      <td>🗒</td>
      <td>Rename</td>
      <td>파일명 혹은 폴더명 수정, 위치 옮기기</td>
    </tr>
    <tr>
      <td>🔥</td>
      <td>Remove</td>
      <td>파일 삭제</td>
    </tr>
  </table>
</detail>

<br>
<br>

## 6. 시연 이미지
![Animation](https://github.com/user-attachments/assets/0302cb17-eacf-43bd-8cbb-775b7df51e08)



<br>
<br>

## 7. 미래 개선 방향

<br>

### 1. 애니메이션 효과
PC화면에서의 애니메이션 효과가 크게 많지 않아 아쉬움이 있습니다. 조금 더 다양한 요소에 애니메이션을 추가하여 생동감 있는 페이지로 업그레이드를 생각하고 있습니다.

### 2. 코드 개선
기능 구현에 있어 조금 더 코드를 개선하고 싶은 마음이 있습니다. 반복되는 코드와 불필요한 코드를 개선하여 성능 최적화를 끌어올리고 싶다는 생각을 하고 있습니다.

<br>

## 8. 성과 및 느낀 점

<br>
최근 트랜드인 웹페이지에서의 FullPage를 라이브러리 없이 기능 구현하여 좋은 프로젝트를 경험할 수 있었으며, 실제 웹페이지에서 많이 활용되는 이미지 네비게이션 등 다양한 기능을 구현할 수 있는 프로젝트여서 뜻 깊은 경험이였습니다.

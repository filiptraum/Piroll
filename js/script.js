document.addEventListener("DOMContentLoaded", () => {
  function gabmurgerFunc(gamburderSelector, navigationSelector, itemsSelector) {

    const gamburger = document.querySelector(gamburderSelector);
    const navigation = document.querySelector(navigationSelector);
    const items = document.querySelectorAll(itemsSelector);
    const body = document.querySelector('.body');

    let menuOpen = false;
    gamburger.addEventListener('click', () => {
      if (!menuOpen) {
        gamburger.classList.add('open');
        menuOpen = true;
        navigation.classList.add('open');
        body.classList.add("menuIsOpen");
      } else {
        gamburger.classList.remove('open');
        menuOpen = false;
        navigation.classList.remove('open');
        body.classList.remove("menuIsOpen");
      }
    });

    items.forEach((item) => {
      item.addEventListener("click", () => {
        gamburger.classList.remove('open');
        menuOpen = false;
        navigation.classList.remove('open');
        body.classList.remove("menuIsOpen");
      });
    });
  }
  gabmurgerFunc(".gamburger", ".header-menu", ".header-menu__item");;

  function scrollUp() {
    let wrapper = document.querySelector('.wrapper');
    let wrapperWidth = wrapper.clientWidth;

    function checkWidth() {
      wrapper = document.querySelector('.wrapper');
      wrapperWidth = wrapper.clientWidth;
    }

    checkWidth();

    window.addEventListener('resize', () => {
      checkWidth();
      scrollUpStyles();
    });

    function scrollUpStyles() {
      if (wrapperWidth > 860) {

        const offset = 500;
        const scrollUp = document.querySelector(".scroll-up");
        const scrollUpSvgPath = document.querySelector(".scroll-up__svg-path");
        const pathLength = scrollUpSvgPath.getTotalLength();

        scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
        scrollUpSvgPath.style.transition = 'stroke-dashoffset 20ms';

        const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

        const updateDashoffset = () => {
          const height = document.documentElement.scrollHeight - window.innerHeight;
          const dashoffset = pathLength - (getTop() * pathLength / height);

          scrollUpSvgPath.style.strokeDashoffset = dashoffset;
        }

        window.addEventListener("scroll", () => {
          updateDashoffset();

          if (getTop() > offset && wrapperWidth > 860) {
            scrollUp.classList.add("scroll-up_active");
          } else {
            scrollUp.classList.remove("scroll-up_active");
          }
        });

        scrollUp.addEventListener('click', () => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        });

        updateDashoffset();
      }
    }

    scrollUpStyles();
  }

  scrollUp();;

  function loadMoreWorks() {
    const worksBtn = document.querySelector(".works__btn");

    worksBtn.addEventListener("click", () => {
      worksBtn.classList.add("clicked");

      let items4 = document.querySelectorAll(".hidden4");
      let items3 = document.querySelectorAll(".hidden3");

      items4.forEach((item) => {
        item.classList.remove("hidden4");
      });

      items3.forEach((item) => {
        item.classList.remove("hidden3");
      });

      animationScrolling();
    });
  }

  loadMoreWorks();

  let wasWorking = false;

  function outNum(num, elem, parentOfelem, stepNum = 1, timeNum, delay, precentNeed = true) {
    let el = document.querySelector(elem);
    let parentEl = document.querySelector(parentOfelem);

    const time = +timeNum;
    let step;
    if (stepNum == 5) {
      step = 5;
    } else if (stepNum == 2) {
      step = 2;
    } else {
      step = 1;
    }

    let n = 0;
    if (parentEl.classList.contains("no-was-Working")) {
      setTimeout(() => {
        if (parentEl.classList.contains("_anim-active")) {
          setTimeout(() => {
            let timeOut = Math.round(time / (num / step));
            let interval = setInterval(() => {
              n += step;
              if (n == num) {
                clearInterval(interval);
              }
              if (precentNeed) {
                el.innerText = n + "%";
              } else {
                el.innerText = n;
              }
            }, timeOut);
          }, delay);
          setTimeout(() => {
            parentEl.classList.remove("no-was-Working");
          }, time);
        }
      }, 350);
    }
  }

  outNum(75, ".skills_count1", ".skills_item1", 800, 700);
  outNum(90, ".skills_count2", ".skills_item2", 800, 800);
  outNum(65, ".skills_count3", ".skills_item3", 800, 850);

  outNum(548, ".statistic_count1", ".statistic_text-content1", 2, 800, 450, false);
  outNum(1465, ".statistic_count2", ".statistic_text-content2", 5, 800, 550, false);
  outNum(612, ".statistic_count3", ".statistic_text-content3", 2, 800, 550, false);
  outNum(736, ".statistic_count4", ".statistic_text-content4", 2, 800, 500, false);

  window.addEventListener("scroll", () => {
    outNum(75, ".skills_count1", ".skills_item1", 800, 700);
    outNum(90, ".skills_count2", ".skills_item2", 800, 800);
    outNum(65, ".skills_count3", ".skills_item3", 800, 850);

    outNum(548, ".statistic_count1", ".statistic_text-content1", 2, 800, 450, false);
    outNum(1465, ".statistic_count2", ".statistic_text-content2", 5, 800, 550, false);
    outNum(612, ".statistic_count3", ".statistic_text-content3", 2, 800, 550, false);
    outNum(736, ".statistic_count4", ".statistic_text-content4", 2, 800, 500, false);
  });

  function slider(container, track, btnPrev, btnNext, items) {

    let position = 0;
    const slidesToShow = 1;
    const slidesToScroll = 1;
    let sliderContainer = document.querySelector(container);
    const sliderTrack = document.querySelector(track);
    const sliderBtnPrev = document.querySelector(btnPrev);
    const sliderBtnNext = document.querySelector(btnNext);
    const sliderItems = document.querySelectorAll(items);
    const itemsCount = sliderItems.length;
    let itemWidth = sliderContainer.clientWidth / slidesToShow;
    let movePosition = slidesToScroll * itemWidth;

    function widthForItems() {
      sliderContainer = document.querySelector(container);
      itemWidth = sliderContainer.clientWidth / slidesToShow;
      movePosition = slidesToScroll * itemWidth;
      position = 0;
      setPosition();
      checkBtns();
      sliderItems.forEach((item) => {
        item.style.minWidth = `${itemWidth}px`;
      });
    }

    widthForItems();

    window.addEventListener('resize', () => {
      widthForItems();
    });

    sliderBtnNext.addEventListener('click', () => {

      let itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;

      position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

      setPosition();
      checkBtns();
    });

    sliderBtnPrev.addEventListener('click', () => {

      let itemsLeft = Math.abs(position) / itemWidth;

      position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

      setPosition();
      checkBtns();
    });

    function setPosition() {
      sliderTrack.style.transform = `translateX(${position}px)`;
    }

    function checkBtns() {
      sliderBtnPrev.disabled = position === 0;
      sliderBtnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
      if (sliderBtnPrev.disabled) {
        sliderBtnPrev.style.opacity = 0.2;
        sliderBtnPrev.style.pointerEvents = 'none';

      } else {
        sliderBtnPrev.style.opacity = 1;
        sliderBtnPrev.style.pointerEvents = 'visible';

      }
      if (sliderBtnNext.disabled) {
        sliderBtnNext.style.opacity = 0.2;
        sliderBtnNext.style.pointerEvents = 'none';
      } else {
        sliderBtnNext.style.opacity = 1;
        sliderBtnNext.style.pointerEvents = 'visible';
      }
    }
    checkBtns();
  }

  slider(".slider-testimonial", ".slider-testimonial__track", ".testimonial__left-arrow", ".testimonial__right-arrow", ".slider-testimonial__box");;

  let canv = document.getElementById("canvas"),
    ctx = canv.getContext("2d"),
    isMouseDown = false,
    coords = [],
    radius = 3,
    coordsOnlyNums,
    replayingInterval;

  let wrapperWidth = +document.querySelector('.wrapper').clientWidth;

  const replayBtn = document.querySelector('#canv-replay');
  const saveBtn = document.querySelector('#canv-save');
  const clearBtn = document.querySelector('#canv-clear');
  const stop_clearBtn = document.querySelector('#canv-stop_and_clear');

  function replayBtnFunc() {
    replayBtn.classList.remove('replaying');
    replayBtn.innerText = 'Replay';
    clearInterval(replayingInterval);
  }


  if (wrapperWidth > 850) {
    canv.width = 800;
    canv.height = canv.width * 0.75;
  } else {
    canv.width = wrapperWidth - 15;
    canv.height = canv.width / 0.75;
  }

  window.addEventListener('resize', () => {
    wrapperWidth = +document.querySelector('.wrapper').clientWidth;

    if (wrapperWidth > 850) {
      canv.width = 800;
      canv.height = canv.width * 0.75;
    } else {
      canv.width = wrapperWidth - 15;
      canv.height = canv.width / 0.75;
    }
  });

  ctx.lineWidth = radius * 2;

  function touchOrMoveFunction(e) {
    if (isMouseDown) {
      let rect = canv.getBoundingClientRect();
      let client = {
        x: Math.floor(e.clientX - rect.left),
        y: Math.floor(e.clientY - rect.top),
      }
      coords.push(client.x, client.y);
      ctx.lineTo(client.x, client.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(client.x, client.y, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(client.x, client.y);
    }
  }

  function save() {
    localStorage.setItem('coordsItem', JSON.stringify(coords));
    if (coords.length > 0) {
      saveBtn.classList.add('saved');
      saveBtn.innerText = 'Saved';
      setTimeout(() => {
        saveBtn.classList.remove('saved');
        saveBtn.innerText = 'Save';
      }, 2000);
    } else {
      saveBtn.classList.add('error');
      saveBtn.innerText = 'Error :(';
      setTimeout(() => {
        saveBtn.innerText = 'Save';
        saveBtn.classList.remove('error');
      }, 1500);
    }
  }

  function clear() {
    ctx.clearRect(0, 0, canv.width, canv.height);
    ctx.beginPath();
  }

  function replay() {
    let timer = setInterval(() => {
      if (coords.length <= 0) {
        clearInterval(timer);
        ctx.beginPath();
        return;
      } else {
        let el;
        if (coords[0] == "mouseup") {
          coords.shift();
          ctx.beginPath();
        }
        el = {
          clientX: coords.shift(),
          clientY: coords.shift()
        }

        ctx.lineTo(el.clientX, el.clientY);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(el.clientX, el.clientY, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(el.clientX, el.clientY);
      }
    }, 30);
    if (coords.length > 0) {
      deleteNoNumsForLength();
      replayBtn.classList.remove('error');
      replayBtn.classList.add('replaying');
      let points = '.';
      replayingInterval = setInterval(() => {
        replayBtn.innerText = `Replayng${points}`;
        if (points.length >= 3) {
          points = '.';
        } else {
          points += ".";
        }
      }, (30 * (coordsOnlyNums - 1) / 20));
      setTimeout(() => {
        replayBtnFunc();
      }, 30 * (coordsOnlyNums - 1) * 0.53);
    } else {
      replayBtn.classList.remove('replaying');
      replayBtn.classList.add('error');
      replayBtn.innerText = 'Error :(';
      setTimeout(() => {
        replayBtn.innerText = 'Replay';
        replayBtn.classList.remove('error');
      }, 1500);
    }
  }

  function deleteNoNumsForLength() {
    coords.forEach((item, i) => {
      if (item[i] == 'mouseup') {
        item[i].splice(i, 1);
      }
    });
    coordsOnlyNums = +coords.length;
  }

  function btnsFunction() {
    saveBtn.addEventListener('click', () => {
      save();
    });

    clearBtn.addEventListener('click', () => {
      clearBtn.classList.add('clickedClear');
      setTimeout(() => {
        clearBtn.classList.remove('clickedClear');
      }, 1000);
      clear();
    });

    replayBtn.addEventListener('click', () => {
      coords = JSON.parse(localStorage.getItem('coordsItem'));

      clear();
      replay();
    });

    stop_clearBtn.addEventListener('click', () => {
      stop_clearBtn.classList.add('clickedStop');
      setTimeout(() => {
        stop_clearBtn.classList.remove('clickedStop');
      }, 1000);
      replayBtnFunc();
      clear();
      coords = [];
    });
  }

  btnsFunction();

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || wrapperWidth < 860) {
    const aboutSection = document.querySelector('.about');
    aboutSection.classList.add("canvasDontWork");
  } else {
    canv.addEventListener("mousedown", () => {
      isMouseDown = true;
    });

    canv.addEventListener('mouseup', () => {
      isMouseDown = false;
      ctx.beginPath();
      coords.push('mouseup');
    });

    canv.addEventListener('mousemove', (e) => {
      touchOrMoveFunction(e);
    });

    document.addEventListener('keydown', (e) => {
      if (e.keyCode == 83) {
        save();
      }

      if (e.keyCode == 82) {
        coords = JSON.parse(localStorage.getItem('coordsItem'));

        clear();
        replay();
      }

      if (e.keyCode == 67) {
        clearBtn.classList.add('clickedClear');
        setTimeout(() => {
          clearBtn.classList.remove('clickedClear');
        }, 1000);
        clear();
      }

      if (e.keyCode == 69) {
        stop_clearBtn.classList.add('clickedStop');
        setTimeout(() => {
          stop_clearBtn.classList.remove('clickedStop');
        }, 1000);
        clear();
        replayBtnFunc()
        coords = [];
      }
    });
  };

  const canvCursor = document.querySelector('.canvas-box__cursor');

  document.addEventListener('mousemove', (e) => {
    canvCursor.style.left = e.pageX + 'px';
    canvCursor.style.top = e.pageY + 'px';
  });

  const animItems = document.querySelectorAll("._anim-items");

  if (animItems.length > 0) {
    window.addEventListener('scroll', animationScrolling);

    function animationScrolling() {
      for (let index = 0; index < animItems.length; index++) {
        const animItem = animItems[index];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = offsetFunc(animItem).top;
        const animStart = 4;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;
        if (animItemHeight > window.innerHeight) {
          animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }

        if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
          animItem.classList.add("_anim-active");
        } else {
          if (!animItem.classList.contains('_active-no-hide')) {
            animItem.classList.remove("_anim-active");
          }
        }
      }
    }

    function offsetFunc(el) {
      const rect = el.getBoundingClientRect();
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
      }
    }

    setTimeout(() => {
      animationScrolling();
    }, 300);
  };
});
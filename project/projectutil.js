let score = 0;
// 손오공찬스 플레이당 1회
let gokuchance = 1;
// 탱크가 움직였는가
let isTankMove = false;
// 공격이 나가고있는가
let isAttack = false;
// 소닉이 점프하고있는가
let isJumpingSonic = false;

// 스타트나 뉴게임 버튼을 누르면 실행되는 게임시작함수
function gameStart() {
  setKeyboardEvent();
  sonicMoveRight();
  setTimeout(metalslugMoveLeft, 2000);
  setTimeout(bulletStart, 7000);
  setTimeout(ringStart, 8000);
  setTimeout(bigringStart, 12000);
  CollidingResult();
}

// 소닉이 왼->오 로 등장
function sonicMoveRight() {
  $("#sonic").animate({ left: "+=200px" }, 1500);
}

// 메탈슬러그가 오->왼 으로 등장
function metalslugMoveLeft() {
  $("#metalslug").animate({ left: "-=200px" }, 1500);
  $("#metalslug").animate({ left: "+=30px" }, 500);
  setTimeout(changeChar, 2200);
}

// 메탈슬러그 등장 후 이미지 변경하며 점프하고, 또 다른 이미지로 변경하기
function changeChar() {
  $("#metalslug").attr("src", "../project/images/metalslug2.gif");
  $("#metalslug").css("width", "120px");
  $("#metalslug").css("height", "130px");
  $("#metalslug").animate({ bottom: "+=100px" }).animate({ bottom: "-=100px" });
  setTimeout(() => {
    $("#metalslug").attr("src", "../project/images/metalslug3.gif");
  }, 2000);
  setTimeout(() => {
    $("#bullet").show();
  }, 2100);
}

// 드래곤볼이 왼->오 로 뛰어나왔다가 7초후 퇴장
function dragonballMoveRight() {
  $("#dragonballeffect").hide();
  $("#dragonball").animate({ left: "+=500px" }, 1000);
  setTimeout(() => {
    $("#dragonball").animate({ left: "+=440px" }, 1500);
  }, 8000);
  setTimeout(() => {
    $("#dragonball").hide();
  }, 9000);
}

// 총알이 오->왼 으로 이동, 끝까지 이동시 스코어 +100후 제자리로
function bulletStart() {
  const bulletSpeed = getRandomNumber(1000, 2000);
  $("#bullet").animate({ right: "850px" }, bulletSpeed, "linear", function () {
    score += 100;
    updateScore(score);
    $("#bullet").css("right", "90px");
    bulletStart();
  });
}

// 링이 오->왼 으로 이동후 제자리로
function ringStart() {
  $("#ring").show();
  const ringSpeed = getRandomNumber(2000, 4000);
  $("#ring").animate({ right: "850px" }, ringSpeed, "linear", function () {
    $("#ring").css("right", "-60px");
    ringStart();
  });
}

// 빅 링이 오->왼 으로 8초마다 이동후 제자리로
function bigringStart() {
  $("#bigring").show();
  $("#bigring").animate({ right: "850px" }, 1000, "linear", function () {
    $("#bigring").css("right", "-200px");
    setTimeout(bigringStart, 8000);
  });
}

// 탱크가 왼->오 로 이동
function tankMoveRight() {
  isTankMove = true;
  $("#tank").animate({ left: "+=110px" }, 1500);
}

// 좀비가 오->왼 으로 이동후 제자리로
function zombieMoveLeft() {
  $("#zombie").animate({ left: "-=1100px" }, 11000, "linear", function () {
    $("#zombie").css("left", "800px");
    zombieMoveLeft();
  });
}

// 탱크공격이 왼->오 로 이동후 제자리로
function attackMoveRight() {
  isAttack = true;
  $("#attack").show();
  $("#attack").animate({ left: "+=1000px" }, 1200, "linear", function () {
    $("#attack").css("left", "40px");
    isAttack = false;
  });
}

// 무작위 수 뽑아내기
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 엘리먼트끼리 충돌하는지 확인하기
function CollodingCheck(el1, el2) {
  const rect1 = el1.getBoundingClientRect();
  const rect2 = el2.getBoundingClientRect();
  return !(
    // 박스크기 널널하게
    rect1.bottom < rect2.top + 25 ||
    rect1.top > rect2.bottom - 25 ||
    rect1.right < rect2.left + 25 ||
    rect1.left > rect2.right - 25
  );
}

function updateScore(score) {
  // 스코어 득점에 따른 스코어보드 표시 업데이트
  $("#score").text(score);
  $("#score2").text(score);
  // 2000점 넘어갈 때 탱크와 좀비 등장
  if (score >= 2000 && !isTankMove) {
    tankMoveRight();
    zombieMoveLeft();
  }
}

// 여러 항목들 충돌시 점수 및 위치
function CollidingResult() {
  // 충돌이 있는지 계속 확인하기
  setInterval(function () {
    // 소닉과 링 충돌 시 점수 +200, 링 제자리에서 다시출발
    if (CollodingCheck($("#sonic")[0], $("#ring")[0])) {
      score += 200;
      updateScore(score);
      $("#ring").stop();
      $("#ring").css("right", "-60px");
      ringStart();
    }
    // 소닉과 빅링 충돌시 점수 +1000, 빅링 제자리에서 다시출발
    if (CollodingCheck($("#sonic")[0], $("#bigring")[0])) {
      score += 1000;
      updateScore(score);
      $("#bigring").stop();
      $("#bigring").css("right", "-200px");
      setTimeout(bigringStart, 8000);
    }
    // 소닉과 총알 충돌시 움직이던 항목들 모두 멈추고 게임오버 화면출력
    if (CollodingCheck($("#sonic")[0], $("#bullet")[0])) {
      gokuchance--;
      $("#sonic").stop();
      $("#bullet").stop();
      $("#ring").stop();
      $("#bigring").stop();
      $("#attack").stop();
      $("#zombie").stop();
      $("#attack").stop();
      $(".gameover").show();
    }
    // 소닉과 좀비 충돌시 움직이던 항목들 모두 멈추고 게임오버 화면출력
    if (CollodingCheck($("#sonic")[0], $("#zombie")[0])) {
      gokuchance--;
      $("#sonic").stop();
      $("#bullet").stop();
      $("#ring").stop();
      $("#bigring").stop();
      $("#attack").stop();
      $("#zombie").stop();
      $("#attack").stop();
      $(".gameover").show();
    }
    // 드래곤볼과 링 충돌시 점수 +200, 링 제자리에서 다시출발
    if (CollodingCheck($("#dragonball")[0], $("#ring")[0])) {
      score += 200;
      updateScore(score);
      $("#ring").stop();
      $("#ring").css("right", "-60px");
      ringStart();
    }
    // 드래곤볼과 총알 충돌시 점수 +100, 총알 제자리에서 다시출발
    if (CollodingCheck($("#dragonball")[0], $("#bullet")[0])) {
      score += 100;
      updateScore(score);
      $("#bullet").stop();
      $("#bullet").css("right", "90px");
      bulletStart();
    }
    // 좀비와 탱크공격 충돌시 점수 +150, 좀비 제자리에서 다시출발, 탱크공격 제자리로
    if (CollodingCheck($("#zombie")[0], $("#attack")[0])) {
      score += 150;
      updateScore(score);
      $("#attack").stop();
      $("#attack").hide();
      $("#zombie").stop();
      $("#attack").css("left", "40px");
      $("#zombie").css("left", "800px");
      isAttack = false;
      zombieMoveLeft();
    }
  }, 1000 / 60);
}

// 키보드 입력 시
function setKeyboardEvent() {
  $("html").keydown(function (e) {
    switch (e.key) {
      // space 입력시
      case " ":
        // 이미 점프 중이 아니라면 소닉이 점프
        if (!isJumpingSonic) {
          sonicJump();
        }
        break;
      case "r":
        // 손오공 사용가능횟수가 있을 때 사용가능
        if (gokuchance === 1) {
          gokuchance--;
          // 총알 숨기고 영상 재생
          $("#dragonballeffect").show();
          $("#bullet").hide();
          // 영상이 끝나면 손오공 등장
          setTimeout(dragonballMoveRight, 2800);
          setTimeout(() => {
            // 다시 총알 보이게
            $("#bullet").show();
          }, 6000);
        }
        break;
      case "f":
        // 이미 공격 중이 아니고 스코어가 2000점이 넘은 상태이면 탱크공격 발사
        if (!isAttack && score >= 2000) {
          attackMoveRight();
        }
        break;
    }
  });
}

// 이미지 바뀌면서 소닉 점프
function sonicJump() {
  // 소닉 이미지 변경
  $("#sonic").attr("src", "../project/images/sonicjump.gif");
  isJumpingSonic = true;
  // 110px 만큼 위로 올라갔다 내려오기
  $("#sonic")
    .animate({ bottom: "+=110px" })
    .animate({ bottom: "-=110px" }, function () {
      isJumpingSonic = false;
    });
  setTimeout(() => {
    // 0.7초 후 원래사진으로 다시변경
    $("#sonic").attr("src", "../project/images/sonic.gif");
  }, 700);
}

// start 버튼 클릭 시 게임 시작
function firstGame() {
  $("#gamestart_screen").hide();
  gameStart();
}

// new game 버튼 클릭 시 창 새로고침
function newGame() {
  location.reload();
}

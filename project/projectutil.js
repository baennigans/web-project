let gokuchance = 1;
let score = 0;
let isTankMove = false;
let isAttack = false;
let isJumpingSonic = false;

//
function gameStart() {
  setKeyboardEvent();
  sonicMoveRight();
  setTimeout(metalslugMoveLeft, 2000);
  setTimeout(bulletStart, 7000);
  setTimeout(ringStart, 8000);
  setTimeout(bigringStart, 12000);
  CollidingResult();
}

//
function sonicMoveRight() {
  $("#sonic").animate({ left: "+=200px" }, 1500);
}

//
function metalslugMoveLeft() {
  $("#metalslug").animate({ left: "-=200px" }, 1500);
  $("#metalslug").animate({ left: "+=30px" }, 500);
  setTimeout(changeChar, 2200);
}

//
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

//
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

//
function bulletStart() {
  const bulletSpeed = getRandomNumber(1000, 2000);
  $("#bullet").animate({ right: "850px" }, bulletSpeed, "linear", function () {
    score += 100;
    updateScore(score);
    $("#bullet").css("right", "90px");
    bulletStart();
  });
}

//
function ringStart() {
  $("#ring").show();
  const ringSpeed = getRandomNumber(2000, 4000);
  $("#ring").animate({ right: "850px" }, ringSpeed, "linear", function () {
    $("#ring").css("right", "-60px");
    ringStart();
  });
}

//
function bigringStart() {
  $("#bigring").show();
  $("#bigring").animate({ right: "850px" }, 1000, "linear", function () {
    $("#bigring").css("right", "-200px");
    setTimeout(bigringStart, 8000);
  });
}

//
function tankMoveRight() {
  isTankMove = true;
  $("#tank").animate({ left: "+=110px" }, 1500);
}

//
function zombieMoveLeft() {
  $("#zombie").animate({ left: "-=1100px" }, 11000, "linear", function () {
    $("#zombie").css("left", "800px");
    zombieMoveLeft();
  });
}

//
function attackMoveRight() {
  isAttack = true;
  $("#attack").show();
  $("#attack").animate({ left: "+=1000px" }, 1200, "linear", function () {
    $("#attack").css("left", "40px");
    isAttack = false;
  });
}

//
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//
function CollodingCheck(el1, el2) {
  const rect1 = el1.getBoundingClientRect();
  const rect2 = el2.getBoundingClientRect();
  return !(
    rect1.bottom < rect2.top + 25 ||
    rect1.top > rect2.bottom - 25 ||
    rect1.right < rect2.left + 25 ||
    rect1.left > rect2.right - 25
  );
}

//
function updateScore(score) {
  $("#score").text(score);
  $("#score2").text(score);
  if (score >= 2000 && !isTankMove) {
    tankMoveRight();
    zombieMoveLeft();
  }
}

//
function CollidingResult() {
  setInterval(function () {
    if (CollodingCheck($("#sonic")[0], $("#ring")[0])) {
      score += 200;
      updateScore(score);
      $("#ring").stop();
      $("#ring").css("right", "-60px");
      ringStart();
    }
    if (CollodingCheck($("#sonic")[0], $("#bigring")[0])) {
      score += 1000;
      updateScore(score);
      $("#bigring").stop();
      $("#bigring").css("right", "-200px");
      setTimeout(bigringStart, 8000);
    }
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
    if (CollodingCheck($("#dragonball")[0], $("#ring")[0])) {
      score += 200;
      updateScore(score);
      $("#ring").stop();
      $("#ring").css("right", "-60px");
      ringStart();
    }
    if (CollodingCheck($("#dragonball")[0], $("#bullet")[0])) {
      score += 100;
      updateScore(score);
      $("#bullet").stop();
      $("#bullet").css("right", "90px");
      bulletStart();
    }
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

//
function setKeyboardEvent() {
  $("html").keydown(function (e) {
    switch (e.key) {
      case " ":
        if (!isJumpingSonic) {
          sonicJump();
        }
        break;
      case "m":
        if (gokuchance === 1) {
          gokuchance--;
          $("#dragonballeffect").show();
          $("#bullet").hide();
          setTimeout(dragonballMoveRight, 2800);
          setTimeout(() => {
            $("#bullet").show();
          }, 6000);
        }
        break;
      case "r":
        if (!isAttack && score >= 2000) {
          attackMoveRight();
        }
        break;
    }
  });
}

//
function sonicJump() {
  $("#sonic").attr("src", "../project/images/sonicjump.gif");
  isJumpingSonic = true;
  $("#sonic")
    .animate({ bottom: "+=110px" })
    .animate({ bottom: "-=110px" }, function () {
      isJumpingSonic = false;
    });
  setTimeout(() => {
    $("#sonic").attr("src", "../project/images/sonic.gif");
  }, 700);
}

//
function firstGame() {
  $("#gamestart_screen").hide();
  gameStart();
}

//
function newGame() {
  $("#gameover_screen").hide();
  location.reload();
}

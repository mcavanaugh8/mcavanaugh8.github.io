/**
 * TO DO LIST:
 *  add custom number of players (via prompt)
 *  submit picks via .txt file
 *  convert to ES6 using classes
 *
 */
const submitButton = document.querySelector(".validate-pick");

const intitialDraftOrder = [
  {
    team: "JACKSONVILLE",
    needs: [],
  },
  {
    team: "DETROIT",
    needs: [],
  },
  {
    team: "HOUSTON",
    needs: [],
  },
  {
    team: "NEW YORK JETS",
    needs: [],
  },
  {
    team: "NEW YORK GIANTS",
    needs: [],
  },
  {
    team: "CAROLINA",
    needs: [],
  },
  {
    team: "NEW YORK GIANTS",
    needs: [],
  },
  {
    team: "ATLANTA",
    needs: [],
  },
  {
    team: "SEATTLE",
    needs: [],
  },
  {
    team: "NEW YORK JETS",
    needs: [],
  },
  {
    team: "WASHINGTON",
    needs: [],
  },
  {
    team: "MINNESOTA",
    needs: [],
  },
  {
    team: "HOUSTON",
    needs: [],
  },
  {
    team: "BALTIMORE",
    needs: [],
  },
  {
    team: "PHILADELPHIA",
    needs: [],
  },
  {
    team: "PHILADELPHIA",
    needs: [],
  },
  {
    team: "LOS ANGELES CHARGERS",
    needs: [],
  },
  {
    team: "NEW ORLEANS",
    needs: [],
  },
  {
    team: "PHILADELPHIA",
    needs: [],
  },
  {
    team: "PITTSBURGH",
    needs: [],
  },
  {
    team: "NEW ENGLAND",
    needs: [],
  },
  {
    team: "GREEN BAY",
    needs: [],
  },
  {
    team: "ARIZONA",
    needs: [],
  },
  {
    team: "DALLAS",
    needs: [],
  },
  {
    team: "BUFFALO",
    needs: [],
  },
  {
    team: "TENNESSEE",
    needs: [],
  },
  {
    team: "TAMPA BAY",
    needs: [],
  },
  {
    team: "GREEN BAY",
    needs: [],
  },
  {
    team: "MIAMI",
    needs: [],
  },
  {
    team: "KANSAS CITY",
    needs: [],
  },
  {
    team: "CINCINNATI",
    needs: [],
  },
  {
    team: "DETROIT",
    needs: [],
  },
];

let realDraftOrder = [...intitialDraftOrder];

const ui = new UI();

document.addEventListener("DOMContentLoaded", (event) => {
  const participants = ui.getFromLocalStorage("participants");
  const draftPicks = ui.getFromLocalStorage("draft-results");
  ui.numberOfPlayers = Object.keys(participants).length;
  ui.addImageLinksToPlayerObject();
  ui.addAllRounds();

  if (Object.keys(participants).length > 0) {
    // console.log(ui.numberOfPlayers);
    ui.hasActivePlayer = true;
    ui.enableButton();
    ui.addFromLocalStorageToPage();
  }
});

submitButton.addEventListener("click", function (event) {
  const audio = new Audio("draft_sound.mp3");
  audio.play();
  ui.validatePicks();
});

document.addEventListener("dblclick", (event) => {
  if (event.target.classList.contains("pick-name")) {
    // console.log(event.target.parentNode.parentNode.parentNode);
    let tgt = event.target.parentNode.parentNode.parentNode;
    event.target.parentNode.parentNode.parentNode.innerHTML =
      '<input class="form-control form-control-sm" type="text" placeholder="Player Name" list="player-list">';
    tgt.querySelector("input").classList.add("actual-pick");
  } else if (event.target.classList.contains("pick-final")) {
    console.log(event.target.parentNode.parentNode.parentNode);
  } else if (event.target.classList.contains("prospect-info-para")) {
  } else if (event.target.classList.contains("pick-info")) {
  } else if (event.target.classList.contains("pick-info-image")) {
  }

  // if (
  //   event.target.classList.contains("pick-final") ||
  //   event.target.classList.contains("pick-name") ||
  //   event.target.classList.contains("prospect-info-para") ||
  //   event.target.classList.contains("pick-info") ||
  //   event.target.classList.contains("pick-info-image")
  // ) {
  //   event.target.innerHTML =
  //     '<input class="form-control form-control-sm" type="text" placeholder="Player Name">';

  //   event.target.classList.remove("pick-final");
  //   const pickText = event.target.querySelector("input");
  //   pickText.classList.add("actual-pick");
  // }

  /**
   * add editing of team name  for trades
   */

  if (event.target.classList.contains("team")) {
    event.target.innerHTML =
      '<input class="form-control form-control-sm" type="text" placeholder="Team Name">';
    const teamText = event.target.querySelector("input");
    teamText.classList.add("new-team");
  }
});

document.addEventListener("focusin", (event) => {
  if (event.target.classList.contains("actual-pick")) {
    if (
      event.target.textContent === "" &&
      event.target.parentNode.querySelector("datalist") === null
    ) {
      event.target.parentNode.innerHTML += ui.createPlayerDataList();
    }
  }
});

document.addEventListener("keyup", (event) => {
  if (event.target.classList.contains("actual-pick")) {
    //     const list = document.getElementById("playerList");
    //     const li = list.getElementsByTagName("li");
    //     for (let i = 0; i < li.length; i++) {
    // let searchVal = event.target.value;
    // console.log(ui.getProspectNames());
    //       let playerVal = li[i].textContent;
    //       // console.log(searchVal, playerVal);
    //       if (playerVal.indexOf(searchVal) > -1 && searchVal !== "") {
    //         // console.log("match", searchVal, playerVal);
    //         list.classList.remove("hidden");
    //         li[i].classList.remove("hidden");
    //       } else if (searchVal === "") {
    //         list.classList.add("hidden");
    //       } else {
    //         li[i].classList.add("hidden");
    //       }
    //     }
  }
});

document.addEventListener("click", (event) => {
  // if (event.target.classList.contains("player-li")) {
  //   const childNodes = event.target.parentNode.parentNode.children;
  //   console.log(event.target, event.target.classList);
  //   for (let i = 0; i < childNodes.length; i++) {
  //     if (childNodes[i].tagName === "INPUT") {
  //       const form = childNodes[i];
  //       form.value = event.target.textContent;
  //     }
  //   }
  // }

  if (event.target.classList.contains("reset-draft")) {
    let result = confirm(
      "Are you sure you wish to reset the draft? All draft progress will be lost."
    );

    if (result) {
      ui.resetDraft();
    }
  }

  if (event.target.classList.contains("add-player-submit")) {
    ui.addPlayers(
      document.getElementById("modal-player-name").value,
      document.getElementById("playerPicks").files[0],
      false
    );
    document.getElementById("modal-player-name").value = "";
    // console.log(ui.getFromLocalStorage("participants"));
  }
});

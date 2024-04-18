/**
 * TO DO LIST:
 *  add custom number of players (via prompt)
 *  submit picks via .txt file
 *  convert to ES6 using classes
 *  add handlebars or react for customizability
 *  enhance user system. Authenticate/Login with Google OAuth?
 *  
 */

const submitButton = document.querySelector('.validate-pick');
const submitButtonFloating = document.querySelector('.submit-picks');
let isAudioPlaying = false;

const intitialDraftOrder = [
  { team: 'CHICAGO', needs: [] },
  { team: 'WASHINGTON', needs: [] },
  { team: 'NEW ENGLAND', needs: [] },
  { team: 'ARIZONA', needs: [] },
  { team: 'LOS ANGELES CHARGERS', needs: [] },
  { team: 'NEW YORK GIANTS', needs: [] },
  { team: 'TENNESSEE', needs: [] },
  { team: 'ATLANTA', needs: [] },
  { team: 'CHICAGO', needs: [] },
  { team: 'NEW YORK JETS', needs: [] },
  { team: 'MINNESOTA', needs: [] },
  { team: 'DENVER', needs: [] },
  { team: 'LAS VEGAS', needs: [] },
  { team: 'NEW ORLEANS', needs: [] },
  { team: 'INDIANAPOLIS', needs: [] },
  { team: 'SEATTLE', needs: [] },
  { team: 'JACKSONVILLE', needs: [] },
  { team: 'CINCINNATI', needs: [] },
  { team: 'LOS ANGELES RAMS', needs: [] },
  { team: 'PITTSBURGH', needs: [] },
  { team: 'MIAMI', needs: [] },
  { team: 'PHILADELPHIA', needs: [] },
  { team: 'HOUSTON', needs: [] },
  { team: 'DALLAS', needs: [] },
  { team: 'GREEN BAY', needs: [] },
  { team: 'TAMPA BAY', needs: [] },
  { team: 'ARIZONA', needs: [] },
  { team: 'BUFFALO', needs: [] },
  { team: 'DETROIT', needs: [] },
  { team: 'BALTIMORE', needs: [] },
  { team: 'SAN FRANCISCO', needs: [] },
  { team: 'KANSAS CITY', needs: [] }
];

let realDraftOrder = [...intitialDraftOrder];
let dragSrcEl = null;

const ui = new UI(realDraftOrder);
ui.addAllRounds();
addDragEvents();

document.addEventListener('DOMContentLoaded', (event) => {
  const participants = ui.getFromLocalStorage('participants');
  const draftPicks = ui.getFromLocalStorage('draft-results');
  ui.numberOfPlayers = Object.keys(participants).length;

  if (Object.keys(participants).length > 0) {
    // console.log(ui.numberOfPlayers);
    ui.hasActivePlayer = true;
    ui.enableButton();
    ui.addAllRounds()
  } else if (Object.keys(draftPicks).length > 0) {
    // console.log(draftPicks)
    ui.addAllRounds()
  }

  document.querySelector('#team-list').querySelectorAll('li').forEach(item => {
    ui.formatTeamCells(item.querySelector('.team'));
  })

  addDragEvents();
  const liveDraftButton = document.getElementById('newLiveDraft');
  const offlineDraftButton = document.getElementById('newOfflineDraft');

  if (liveDraftButton) {
    liveDraftButton.addEventListener('click', function () {    
      let confirmSwitch = confirm('Are you sure you wish to start a new live draft? Doing so will reset all unsaved draft progress.');
      if (confirmSwitch) {
        ui.resetDraft();
        window.location.href = '/live-draft';
      }
    });
  }

  if (offlineDraftButton) {
    offlineDraftButton.addEventListener('click', function () {
      let confirmSwitch = confirm('Are you sure you wish to start a new mock draft? Doing so will reset all unsaved draft progress.');
      if (confirmSwitch) {
        ui.resetDraft();
        window.location.href = '/mock-draft';
      }
    });
  }

});

if (submitButton) {
  submitButton.addEventListener('click', function (event) {
    if (!isAudioPlaying) {
      playSound();
      ui.validatePicks();
      addDragEvents();
    }
  });
}

if (submitButtonFloating) {
  submitButtonFloating.addEventListener('click', function (event) {
    if (!isAudioPlaying) {
      playSound();
      ui.validatePicks();
      addDragEvents();
    } else {
      event.preventDefault(); // Prevent the default link action
    }
  });
}


document.addEventListener('dblclick', (event) => {
  // console.log(event.target);
  if (event.target.classList.contains('pick-name')) {
    let tgt = event.target.parentNode.parentNode.parentNode;
    tgt.innerHTML =
      '<input class="form-control form-control-sm" type="text" placeholder="Player Name" list="player-list">';
    tgt.querySelector('input').classList.add('actual-pick');
  } else if (event.target.classList.contains('prospect-info-para')) {
    let tgt = event.target.parentNode.parentNode.parentNode.parentNode;
    tgt.innerHTML =
      '<input class="form-control form-control-sm" type="text" placeholder="Player Name" list="player-list">';
    tgt.querySelector('input').classList.add('actual-pick');
  } else if (event.target.classList.contains('pick-name')) {
    let tgt = event.target.parentNode.parentNode.parentNode;
    tgt.innerHTML =
      '<input class="form-control form-control-sm" type="text" placeholder="Player Name" list="player-list">';
    tgt.querySelector('input').classList.add('actual-pick');
  } else if (event.target.classList.contains('player-card-container')) {
    let tgt = event.target.parentNode;
    tgt.innerHTML =
      '<input class="form-control form-control-sm" type="text" placeholder="Player Name" list="player-list">';
    tgt.querySelector('input').classList.add('actual-pick');
  } else if (event.target.classList.contains('prospect-info-image')) {
    let tgt = event.target.parentNode.parentNode.parentNode.parentNode;
    tgt.innerHTML =
      '<input class="form-control form-control-sm" type="text" placeholder="Player Name" list="player-list">';
    tgt.querySelector('input').classList.add('actual-pick');
  } else if (event.target.classList.contains('player-card-row')) {
    let tgt = event.target.parentNode.parentNode;
    tgt.innerHTML =
      '<input class="form-control form-control-sm" type="text" placeholder="Player Name" list="player-list">';
    tgt.querySelector('input').classList.add('actual-pick');
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
});

document.addEventListener('focusin', (event) => {
  if (event.target.classList.contains('actual-pick')) {

    if (event.target.textContent === '' && event.target.parentNode.querySelector('datalist') === null) {
      event.target.parentNode.innerHTML += ui.createPlayerDataList();
    }

    event.target.addEventListener('keypress', function(keyPressEvent) {
      if (keyPressEvent.key === 'Enter') {
        console.log('Enter key was pressed while focused on an actual-pick element.');
        ui.validatePicks();
      }
    });
  }
});


document.addEventListener('click', (event) => {
  if (event.target.classList.contains('reset-draft') || event.target.classList.contains('fa-rotate')) {
    let result = confirm(
      'Are you sure you wish to reset the draft? All draft progress will be lost.'
    );

    if (result) {
      ui.resetDraft();
    }
  }

  if (event.target.classList.contains('add-player-submit')) {
    ui.addPlayers(
      document.getElementById('modal-player-name').value,
      document.getElementById('playerPicks').files[0],
      document.getElementById('altPlayerPicks').files[0],
      false
    );
    document.getElementById('modal-player-name').value = '';
    // console.log(ui.getFromLocalStorage("participants"));
  }

  if (event.target.classList.contains('results-share-results')) {
    event.preventDefault();
    const data = ui.participantObjects;
    data.forEach((item, index, arr) => {
      fetch('/user-results', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then((response) => response.json())
        .then((item) => {
          // console.log(item);
          return item;
        });
    });
  }
});

if (document.getElementById('scoreboard-tab-handle')) {
  document.getElementById('scoreboard-tab-handle').addEventListener('click', function () {
    var content = document.getElementById('scoreboard-content');
    if (content.style.display === 'block') {
      content.style.display = 'none';
      this.innerHTML = '&#9654; Scoreboard';
    } else {
      content.style.display = 'block';
      this.innerHTML = '&#9664; Scoreboard';
    }
  });
}

document.getElementById('saveDraft').addEventListener('click', function (event) {

  let results = confirm('Are you sure you wish to save the draft?');
  if (results) {
    event.preventDefault();

    const url = '/save-draft';
    const data = ui.getFromLocalStorage('draft-results')
    console.log('data', data)
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => alert('Draft saved successfully!'))
      .catch((error) => {
        // console.error('Error:', error);
        // Handle errors here (e.g., display an error message)
      });
  }
});


// Function to handle the drag start
function handleDragStart(e) {
  dragSrcEl = this; // 'this' refers to the element on which the dragstart event was fired
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', this.innerHTML); // Set the drag's data to the innerHTML of the element
  this.style.opacity = '0.4';
}

// Function to handle the drag over
function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary to allow dropping
  }

  this.classList.add('over');
  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

  return false;
}

// Function to handle the drop
function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation(); // Stops the browser from redirecting.
  }

  // Don't do anything if we're dropping on the same column we're dragging.
  if (dragSrcEl !== this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/plain');
  }

  return false;
}


function handleDragEnd(e) {
  this.style.opacity = '1';

  document.querySelectorAll('.container .draggable').forEach(function (item) {
    item.classList.remove('over');
  });

  document.querySelectorAll('.container .draggable').forEach((item, index) => {
    const numberDiv = item.querySelector('.row > div:first-child');
    if (numberDiv) {
      numberDiv.textContent = index + 1; // Update the number
    }
  });
}

function playSound() {
  const audio = new Audio('/public/assets/draft_sound.mp3');

  isAudioPlaying = true;
  submitButton.disabled = true;
  submitButtonFloating.classList.add('disabled');

  audio.onerror = function (event) {
    console.error("Error loading audio:", event);
    console.log("Error code:", audio.error.code); // Log specific error code
    console.log("Error message:", audio.error.message); // Log error message
  };

  audio.play().catch(e => console.error('Error playing audio:', e));

  audio.onended = function () {
    isAudioPlaying = false;
    submitButton.disabled = false;
    submitButtonFloating.classList.remove('disabled');
  };
}

function addDragEvents() {
  let items = document.querySelectorAll('.draggable');
  items.forEach(function (item) {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('drop', handleDrop);
    item.addEventListener('dragend', handleDragEnd);
  });
}
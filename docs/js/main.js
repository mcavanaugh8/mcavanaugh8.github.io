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

let intitialDraftOrder = [
  // 1-10
  { team: 'TENNESSEE', needs: [] },
  { team: 'CLEVELAND', needs: [] },
  { team: 'NEW YORK GIANTS', needs: [] },
  { team: 'NEW ENGLAND', needs: [] },
  { team: 'JACKSONVILLE', needs: [] },
  { team: 'LAS VEGAS', needs: [] },
  { team: 'NEW YORK JETS', needs: [] },
  { team: 'CAROLINA', needs: [] },
  { team: 'NEW ORLEANS', needs: [] },
  { team: 'CHICAGO', needs: [] },

  // 11-20
  { team: 'SAN FRANCISCO', needs: [] },
  { team: 'DALLAS', needs: [] },
  { team: 'MIAMI', needs: [] },
  { team: 'INDIANAPOLIS', needs: [] },
  { team: 'ATLANTA', needs: [] },
  { team: 'ARIZONA', needs: [] },
  { team: 'CINCINNATI', needs: [] },
  { team: 'SEATTLE', needs: [] },
  { team: 'TAMPA BAY', needs: [] },
  { team: 'DENVER', needs: [] },

  // 21-32
  { team: 'PITTSBURGH', needs: [] },
  { team: 'LOS ANGELES CHARGERS', needs: [] },
  { team: 'GREEN BAY', needs: [] },
  { team: 'MINNESOTA', needs: [] },
  { team: 'HOUSTON', needs: [] },
  { team: 'LOS ANGELES RAMS', needs: [] },
  { team: 'BALTIMORE', needs: [] },
  { team: 'DETROIT', needs: [] },
  { team: 'WASHINGTON', needs: [] },
  { team: 'BUFFALO', needs: [] },
  { team: 'KANSAS CITY', needs: [] },
  { team: 'PHILADELPHIA', needs: [] },
];

let realDraftOrder = [...intitialDraftOrder];
let dragSrcEl = null;

document.addEventListener('DOMContentLoaded', (event) => {
  const participants = ui.getFromLocalStorage('participants');
  const draftPicks = ui.getFromLocalStorage('draft-results');
  ui.numberOfPlayers = Object.keys(participants).length;

  if (document.querySelector('#team-list')) {
    if (document.querySelector('#team-list').querySelectorAll('li').length === 0) {
      try {
        ui.addAllRounds()
      } catch (e) { }
    }
  }

  if (Object.keys(participants).length > 0) {
    // console.log(ui.numberOfPlayers);
    ui.hasActivePlayer = true;
    try {
      ui.enableButton();
    } catch (e) { }

    try {
      ui.addAllRounds()
    } catch (e) {
      console.log(e)
    }

  } else if (Object.keys(draftPicks).length > 0) {
    // console.log(draftPicks)
    // ui.addAllRounds()
  }

  if (document.querySelector('#team-list')) {
    document.querySelector('#team-list').querySelectorAll('li').forEach(item => {
      ui.formatTeamCells(item.querySelector('.team'));
    })
  }

  addDragEvents();

  const liveDraftButton = document.getElementById('newLiveDraft');
  const offlineDraftButton = document.getElementById('newOfflineDraft');
  const exportDraftButton = document.getElementById('exportDraft');

  if (liveDraftButton) {
    liveDraftButton.addEventListener('click', event => {
      // e.preventDefault();
      // e.preventPropagation();
      let confirmSwitch = confirm('Are you sure you wish to start a new live draft? Doing so will reset all unsaved draft progress.');
      if (confirmSwitch) {
       try {
          ui.resetDraft();
        } catch (e) { }
        try {
          window.location.href = '/live-draft';
        } catch (e) { }
      }
    });
  }

  if (offlineDraftButton) {
    offlineDraftButton.addEventListener('click', event => {
      // e.preventDefault();
      // e.preventPropagation();
      let confirmSwitch = confirm('Are you sure you wish to start a new mock draft? Doing so will reset all unsaved draft progress.');
      if (confirmSwitch) {
        try {
          ui.resetDraft();
        } catch (e) { }
        try {
          window.location.href = '/live-draft';
        } catch (e) { }
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
      try {
        // playSound();
      } catch (e) { }

      ui.validatePicks();
    
      addDragEvents();
    } else {
      event.preventDefault();
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

  if (event.target.classList.contains('team')) {
    event.target.innerHTML = `
      <input class="form-control form-control-sm new-team" type="text" list="team-options" placeholder="Team Name">`;
    const teamText = event.target.querySelector('.new-team');
    teamText.focus();
  }


});

document.addEventListener('focusin', (event) => {
  if (event.target.classList.contains('actual-pick')) {

    if (event.target.textContent === '' && event.target.parentNode.querySelector('datalist') === null) {
      event.target.parentNode.innerHTML += ui.createPlayerDataList();
    }
  }

  if (event.target.classList.contains('actual-pick') || event.target.classList.contains('new-team')) {
    event.target.addEventListener('keypress', function (keyPressEvent) {
      if (keyPressEvent.keyCode === 13) {
        // console.log('Enter key was pressed while focused on an actual-pick element.');
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

if (document.getElementById('saveDisplayNameButton')) {
  document.getElementById('saveDisplayNameButton').addEventListener('click', event => {
    event.preventDefault();

    var newDisplayName = document.getElementById('displayNameField').value;

    fetch('/modify-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ displayName: newDisplayName }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert(data.message);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error updating display name.');
      });
  });
}

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

if (document.getElementById('saveDraft')) {
  document.getElementById('saveDraft').addEventListener('click', function (event) {

    let results = confirm('Are you sure you wish to save the draft?');
    if (results) {
      event.preventDefault();

      const url = '/save-draft';
      const data = ui.getFromLocalStorage('draft-results')

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
}

if (document.getElementById('publishDraft')) {
  document.getElementById('publishDraft').addEventListener('click', function (event) {

    let results = confirm('Are you sure you wish to publish this mock draft?');
    if (results) {
      event.preventDefault();

      const url = '/publish-draft';
      const data = ui.getFromLocalStorage('draft-results');

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => alert('Draft published successfully!'))
        .catch((error) => {
          // console.error('Error:', error);
          // Handle errors here (e.g., display an error message)
        });
    }
  });
}

if (document.getElementById('exportDraft')) {
  document.getElementById('exportDraft').addEventListener('click', function (event) {
    event.preventDefault();
    const url = '/export-draft-results';

    const draftData = getDraftBoardData();

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ draftData: draftData, participantsData: ui.getFromLocalStorage('participants').length > 0 ? ui.getFromLocalStorage('participants') : false })
    })
      .then(response => {
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(blob => {
        // Create a new URL for the blob
        const blobUrl = window.URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');

        // Set link's href to point to the blob URL
        link.href = blobUrl;
        link.download = 'draft-results.png'; // Set the filename for download

        // Append link to the body
        document.body.appendChild(link);

        // Use the link to initiate a download
        link.click();

        // Clean up by revoking the Object URL and removing the link
        window.URL.revokeObjectURL(blobUrl);
        document.body.removeChild(link);

        alert('Draft exported successfully!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error exporting draft.');
      });
  });
}

if (document.querySelectorAll('.view-button').length > 0) {
  document.querySelectorAll('.view-button').forEach(button => {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      console.log('Navigating to', this.getAttribute('href'));
      window.location.href = this.getAttribute('href');
    });
  });
}


function getDraftBoardData() {
  const draftPicks = [];
  const listItems = document.querySelectorAll('.draftboard .list-group-item');

  listItems.forEach(item => {
    const rank = item.querySelector('.row > .col-md-1').textContent.trim();
    const teamElement = item.querySelector('.team');
    const team = teamElement.textContent.trim();
    const playerElement = item.querySelector('.prospect-name');
    const player = playerElement ? playerElement.textContent.trim() : '';
    const playerDetails = {};

    // Extract player details
    const playerInfoElements = item.querySelectorAll('.pick-info .prospect-info-para');
    playerInfoElements.forEach(info => {
      const text = info.textContent.trim();
      const [key, value] = text.split(':');
      if (key && value) {
        playerDetails[key.trim()] = value.trim();
      }
    });

    // Add to the draftPicks array
    draftPicks.push({
      rank,
      team,
      teamColor: teamElement.style.backgroundColor,
      teamTextColor: teamElement.style.color,
      player,
      ...playerDetails
    });
  });

  return draftPicks;
}

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
  const audio = new Audio('/docs/assets/draft_sound.mp3');

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


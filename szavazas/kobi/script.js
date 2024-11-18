function toggleVote(element) {
    // Először eltávolítjuk az "X"-et az összes másik körből
    document.querySelectorAll('.vote-circle').forEach(circle => {
      circle.classList.remove('selected');
    });
  
    // Hozzáadjuk az aktuális körhöz az "X"-et
    element.classList.add('selected');
  }
  
  function submitVote() {
    const selectedParty = document.querySelector('.vote-circle.selected');
    if (selectedParty) {
      alert('A szavazat sikeresen leadva!');
    } else {
      alert('Kérjük, válasszon ki egy pártot!');
    }
  }
  
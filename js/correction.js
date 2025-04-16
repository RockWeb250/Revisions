window.onload = function() {
    const shown = sessionStorage.getItem("shown")
    if (!shown) {
      const notif = document.getElementById("notification");
      notif.style.display = 'block';
      setTimeout(() => {
        notif.style.display = 'none';
        sessionStorage.setItem("shown", true);
      }, 4000);
    }
  }

  let correctionVisible = false;

  function showConfirm() {
    const message = document.querySelector("#confirmModal p");
    message.innerText = correctionVisible ? "Souhaites-tu masquer la correction ?" : "Souhaites-tu afficher la correction ?";
    document.getElementById("confirmModal").style.display = 'block';
  }

  function confirmYes() {
    const correction = document.getElementById("correctionContent");
    correctionVisible = !correctionVisible;
    correction.style.display = correctionVisible ? 'block' : 'none';
    document.getElementById("confirmModal").style.display = 'none';
  }

  function confirmNo() {
    document.getElementById("confirmModal").style.display = 'none';
  }
  




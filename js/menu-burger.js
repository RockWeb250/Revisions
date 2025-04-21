/**
 * Menu Burger - Navigation responsive
 * © réussit-ton-TOMIC.fr
 */

document.addEventListener('DOMContentLoaded', function() {
    // Création du bouton burger
    const nav = document.querySelector('nav');
    const menuContainer = document.createElement('div');
    menuContainer.className = 'menu-container';
    
    // Créer le bouton hamburger
    const burgerButton = document.createElement('button');
    burgerButton.className = 'burger-menu';
    burgerButton.setAttribute('aria-label', 'Menu de navigation');
    burgerButton.setAttribute('aria-expanded', 'false');
    burgerButton.innerHTML = `
      <span class="burger-line"></span>
      <span class="burger-line"></span>
      <span class="burger-line"></span>
    `;
    
    // Créer un conteneur pour les liens de navigation
    const navLinksContainer = document.createElement('div');
    navLinksContainer.className = 'nav-links';
    
    // Déplacer tous les liens existants dans le conteneur
    // On crée d'abord une copie du contenu pour éviter les problèmes de suppression pendant l'itération
    const navContent = nav.innerHTML;
    
    // Extraire les liens et le texte de séparation
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = navContent;
    
    // Parcourir les enfants de tempDiv et les ajouter au conteneur de liens
    Array.from(tempDiv.childNodes).forEach(node => {
      // Si c'est un lien ou du texte (pour les séparateurs "|"), l'ajouter au conteneur
      if (node.tagName === 'A' || node.nodeType === Node.TEXT_NODE) {
        navLinksContainer.appendChild(node.cloneNode(true));
      }
    });
    
    // Nettoyer la navigation et ajouter les nouveaux éléments
    nav.innerHTML = '';
    menuContainer.appendChild(burgerButton);
    nav.appendChild(menuContainer);
    nav.appendChild(navLinksContainer);
    
    // Gérer le clic sur le bouton burger
    burgerButton.addEventListener('click', function(event) {
      event.stopPropagation(); // Empêche la propagation vers document.click
      nav.classList.toggle('menu-open');
      this.classList.toggle('active');
      
      // Gérer l'attribut aria-expanded pour l'accessibilité
      const isExpanded = nav.classList.contains('menu-open');
      burgerButton.setAttribute('aria-expanded', isExpanded.toString());
    });
    
    // Fermer le menu lorsqu'on clique à l'extérieur
    document.addEventListener('click', function(event) {
      if (
        nav.classList.contains('menu-open') && 
        !nav.contains(event.target) && 
        !burgerButton.contains(event.target)
      ) {
        nav.classList.remove('menu-open');
        burgerButton.classList.remove('active');
        burgerButton.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Empêcher la fermeture du menu lors d'un clic dans le menu lui-même
    navLinksContainer.addEventListener('click', function(event) {
      if (event.target === navLinksContainer) {
        event.stopPropagation();
      }
    });
    
    // Fermer le menu quand on redimensionne l'écran pour passer en mode desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && nav.classList.contains('menu-open')) {
        nav.classList.remove('menu-open');
        burgerButton.classList.remove('active');
        burgerButton.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Gérer les clics sur les liens du menu pour qu'ils ferment aussi le menu
    const menuLinks = navLinksContainer.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          nav.classList.remove('menu-open');
          burgerButton.classList.remove('active');
          burgerButton.setAttribute('aria-expanded', 'false');
        }
      });
    });
  });
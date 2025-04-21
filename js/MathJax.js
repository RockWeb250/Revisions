window.MathJax = {
  tex: {
    inlineMath: [['\\(', '\\)']],
    displayMath: [['$$', '$$']],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
  },
  startup: {
    pageReady: function() {
      return MathJax.startup.defaultPageReady().then(function() {
        // Fonction pour vérifier si une formule nécessite un défilement
        const checkFormulaOverflow = function() {
          document.querySelectorAll('.formula').forEach(function(formula) {
            formula.classList.remove('formula-overflow');
            
            const mathJax = formula.querySelector('.MathJax');
            if (!mathJax) return;
            
            // Vérifier si la formule est plus large que son conteneur
            const mathJaxWidth = mathJax.getBoundingClientRect().width;
            const formulaWidth = formula.clientWidth - 20; // 20px pour les marges internes
            
            // Si la formule est vraiment plus large, activer le défilement
            if (mathJaxWidth > formulaWidth) {
              formula.classList.add('formula-overflow');
            }
          });
        };

        // Exécuter après un délai pour laisser MathJax terminer le rendu
        setTimeout(checkFormulaOverflow, 500);
        
        // Réexécuter à chaque redimensionnement de la fenêtre
        let resizeTimeout;
        window.addEventListener('resize', function() {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(checkFormulaOverflow, 250);
        });
        
        // S'assurer que tout est bien vérifié après chargement complet
        window.addEventListener('load', function() {
          setTimeout(checkFormulaOverflow, 300);
        });
      });
    }
  }
};
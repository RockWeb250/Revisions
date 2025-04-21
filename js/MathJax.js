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
        // Fonction pour ajuster les formules trop larges
        const handleFormulaResize = function() {
          document.querySelectorAll('.formula').forEach(function(formula) {
            const mathJaxContainer = formula.querySelector('.MathJax');
            if (mathJaxContainer && mathJaxContainer.scrollWidth > formula.clientWidth) {
              // Ajouter une classe pour identifier les formules qui débordent
              formula.classList.add('formula-overflow');
            } else {
              formula.classList.remove('formula-overflow');
            }
          });
        };

        // Exécuter après un court délai pour laisser MathJax terminer le rendu
        setTimeout(handleFormulaResize, 500);
        
        // Réexécuter à chaque redimensionnement de la fenêtre
        window.addEventListener('resize', function() {
          setTimeout(handleFormulaResize, 100);
        });
      });
    }
  }
};
/* ############################## TYPE ################################ */


jQuery(document).ready(function($) {
    //set animation timing
    var animationDelay = 2500,
      //loading bar effect
      barAnimationDelay = 3800,
      barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
      //letters effect
      lettersDelay = 50,
      //type effect
      typeLettersDelay = 150,
      selectionDuration = 500,
      typeAnimationDelay = selectionDuration + 800,
      //clip effect 
      revealDuration = 600,
      revealAnimationDelay = 1500;
  
    initHeadline();
  
  
    function initHeadline() {
      //insert <i> element for each letter of a changing word
      singleLetters($('.cd-headline.letters').find('b'));
      //initialise headline animation
      animateHeadline($('.cd-headline'));
    }
  
    function singleLetters($words) {
      $words.each(function() {
        var word = $(this),
          letters = word.text().split(''),
          selected = word.hasClass('is-visible');
        for (i in letters) {
          if (word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
          letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>' : '<i>' + letters[i] + '</i>';
        }
        var newLetters = letters.join('');
        word.html(newLetters).css('opacity', 1);
      });
    }
  
    function animateHeadline($headlines) {
      var duration = animationDelay;
      $headlines.each(function() {
        var headline = $(this);
  
        if (headline.hasClass('loading-bar')) {
          duration = barAnimationDelay;
          setTimeout(function() {
            headline.find('.cd-words-wrapper').addClass('is-loading')
          }, barWaiting);
        } else if (headline.hasClass('clip')) {
          var spanWrapper = headline.find('.cd-words-wrapper'),
            newWidth = spanWrapper.width() + 10
          spanWrapper.css('width', newWidth);
        } else if (!headline.hasClass('type')) {
          //assign to .cd-words-wrapper the width of its longest word
          var words = headline.find('.cd-words-wrapper b'),
            width = 0;
          words.each(function() {
            var wordWidth = $(this).width();
            if (wordWidth > width) width = wordWidth;
          });
          headline.find('.cd-words-wrapper').css('width', width);
        };
  
        //trigger animation
        setTimeout(function() {
          hideWord(headline.find('.is-visible').eq(0))
        }, duration);
      });
    }
  
    function hideWord($word) {
      var nextWord = takeNext($word);
  
      if ($word.parents('.cd-headline').hasClass('type')) {
        var parentSpan = $word.parent('.cd-words-wrapper');
        parentSpan.addClass('selected').removeClass('waiting');
        setTimeout(function() {
          parentSpan.removeClass('selected');
          $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
        }, selectionDuration);
        setTimeout(function() {
          showWord(nextWord, typeLettersDelay)
        }, typeAnimationDelay);
  
      } else if ($word.parents('.cd-headline').hasClass('letters')) {
        var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
        hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
        showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);
  
      } else if ($word.parents('.cd-headline').hasClass('clip')) {
        $word.parents('.cd-words-wrapper').animate({
          width: '2px'
        }, revealDuration, function() {
          switchWord($word, nextWord);
          showWord(nextWord);
        });
  
      } else if ($word.parents('.cd-headline').hasClass('loading-bar')) {
        $word.parents('.cd-words-wrapper').removeClass('is-loading');
        switchWord($word, nextWord);
        setTimeout(function() {
          hideWord(nextWord)
        }, barAnimationDelay);
        setTimeout(function() {
          $word.parents('.cd-words-wrapper').addClass('is-loading')
        }, barWaiting);
  
      } else {
        switchWord($word, nextWord);
        setTimeout(function() {
          hideWord(nextWord)
        }, animationDelay);
      }
    }
  
    function showWord($word, $duration) {
      if ($word.parents('.cd-headline').hasClass('type')) {
        showLetter($word.find('i').eq(0), $word, false, $duration);
        $word.addClass('is-visible').removeClass('is-hidden');
      } else if ($word.parents('.cd-headline').hasClass('clip')) {
        $word.parents('.cd-words-wrapper').animate({
          'width': $word.width() + 5
        }, revealDuration, function() {
          setTimeout(function() {
            hideWord($word)
          }, revealAnimationDelay);
        });
      }
    }
    
  
    function hideLetter($letter, $word, $bool, $duration) {
      $letter.removeClass('in').addClass('out');
  
      if (!$letter.is(':last-child')) {
        setTimeout(function() {
          hideLetter($letter.next(), $word, $bool, $duration);
        }, $duration);
      } else if ($bool) {
        setTimeout(function() {
          hideWord(takeNext($word))
        }, animationDelay);
      }
  
      if ($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
        var nextWord = takeNext($word);
        switchWord($word, nextWord);
      }
    }
  
    function showLetter($letter, $word, $bool, $duration) {
      $letter.addClass('in').removeClass('out');
  
      if (!$letter.is(':last-child')) {
        setTimeout(function() {
          showLetter($letter.next(), $word, $bool, $duration);
        }, $duration);
      } else {
        if ($word.parents('.cd-headline').hasClass('type')) {
          setTimeout(function() {
            $word.parents('.cd-words-wrapper').addClass('waiting');
          }, 200);
        }
        if (!$bool) {
          setTimeout(function() {
            hideWord($word)
          }, animationDelay)
        }
      }
    }
  
    function takeNext($word) {
      return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
    }
  
    function takePrev($word) {
      return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
    }
  
    function switchWord($oldWord, $newWord) {
      $oldWord.removeClass('is-visible').addClass('is-hidden');
      $newWord.removeClass('is-hidden').addClass('is-visible');
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    var lienVersGoogle = document.getElementById('lienVersCodeSculpt');
    lienVersGoogle.addEventListener('click', function() {
        window.open('#', '_blank'); // Ouvrir dans une nouvelle fenêtre/onglet
    });
});

document.addEventListener('DOMContentLoaded', function() {
  // Trouver la hauteur de la navbar
  var navbarHeight = document.querySelector('header').offsetHeight;

  // Sélectionnez tous les liens dans la navbar
  var links = document.querySelectorAll('.navbar-right a');

  // Ajouter un gestionnaire d'événements à chaque lien
  links.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // Empêche le comportement de lien par défaut

      // Trouver la position de la section cible
      var targetId = this.getAttribute('href').substring(1); // Obtenez l'ID de la section cible
      var target = document.querySelector('#' + targetId);
      var targetOffset = target.offsetTop;

      // Définir la position de défilement en fonction de la hauteur de la navbar
      window.scrollTo({
        top: targetOffset - navbarHeight,
        behavior: 'smooth' // Pour un défilement fluide (optionnel)
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const menuBurger = document.querySelector(".menu-burger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuLinks = mobileMenu.querySelectorAll("a");

  let isMobileMenuOpen = false;

  menuBurger.addEventListener("click", function() {
      if (!isMobileMenuOpen) {
          mobileMenu.style.display = "flex"; // Affiche le menu
          setTimeout(() => {
              mobileMenu.style.opacity = "1"; // Augmente l'opacité
          }, 10); // Ajoutez un délai pour permettre à la transition de se produire
      } else {
          mobileMenu.style.opacity = "0"; // Réduit l'opacité
          setTimeout(() => {
              mobileMenu.style.display = "none"; // Cache le menu
          }, 300); // Ajoutez un délai pour permettre à la transition de se produire
      }

      isMobileMenuOpen = !isMobileMenuOpen;
  });

  mobileMenuLinks.forEach(function(link) {
      link.addEventListener("click", function() {
          mobileMenu.style.opacity = "0"; // Réduit l'opacité
          setTimeout(() => {
              mobileMenu.style.display = "none"; // Cache le menu
          }, 300); // Ajoutez un délai pour permettre à la transition de se produire
          isMobileMenuOpen = false;
      });
  });
});


    document.addEventListener('DOMContentLoaded', function() {
        var form = document.querySelector('form');

        form.addEventListener('submit', function(event) {
            var emailInput = document.querySelector('input[name="email"]');
            var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!emailPattern.test(emailInput.value)) {
                alert('Veuillez entrer une adresse email valide.');
                event.preventDefault(); // Empêche l'envoi du formulaire si l'e-mail n'est pas valide
            }
        });
    });


    $(document).ready(function() {
      $('#myForm').submit(function(e) {
          e.preventDefault(); // Empêcher la soumission du formulaire par défaut

        // Vérifier le reCAPTCHA
        var recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            alert('Veuillez cocher la case reCAPTCHA avant d\'envoyer le formulaire.');
            return; // Ne pas soumettre le formulaire si le reCAPTCHA n'est pas validé
        }

          // Sauvegarder le formulaire pour la réinitialisation ultérieure
          var form = $(this);

          // Effectuer une requête AJAX pour envoyer le formulaire
          $.ajax({
              url: 'https://formspree.io/f/mnqkryer',
              method: 'POST',
              data: form.serialize(),
              dataType: 'json',
              success: function(response) {
                  // Réinitialiser le formulaire
                  form.trigger('reset');

                  // Afficher un message de confirmation avec SweetAlert
                  Swal.fire({
                      icon: 'success',
                      title: 'Message envoyé avec succès!',
                      text: 'Merci de m\'avoir contacté.',
                      showConfirmButton: false, // Ne pas afficher le bouton "OK"
                      timer: 3000, // Fermer automatiquement après 3 secondes
                      allowOutsideClick: true, // Permettre de cliquer en dehors pour fermer
                      customClass: {
                        container: 'custom-swal-container', // Ajoutez une classe personnalisée ici
                    },
                      willClose: () => {
                          // Code exécuté lors de la fermeture du pop-up
                          // Vous pouvez ajouter des actions supplémentaires si nécessaire
                      }
                  });
              },
              error: function(error) {
                  // Afficher un message d'erreur avec SweetAlert en cas d'échec
                  Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Une erreur s\'est produite lors de l\'envoi du message.',
                      showConfirmButton: false, // Ne pas afficher le bouton "OK"
                      timer: 3000, // Fermer automatiquement après 3 secondes
                      allowOutsideClick: true, // Permettre de cliquer en dehors pour fermer
                      willClose: () => {
                          // Code exécuté lors de la fermeture du pop-up
                          // Vous pouvez ajouter des actions supplémentaires si nécessaire
                      }
                  });
              }
          });
      });
  });
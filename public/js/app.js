/* -----------------------------------------------
/* How to use? : Check the GitHub README
/* ----------------------------------------------- */

/* To load a config file (particles.json) you need to host this demo (MAMP/WAMP/local)... */
/*
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});
*/

/* Otherwise just put the config content (json): */

particlesJS('particles-js',

    {

        "particles": {

            "number": {

                "value": 10
            },

            "color": {

                "value": "#00ffff"
            },

            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 5,
                    "color": "#000000"
                }
            },

            "opacity": {

                "value": 0.3
            }

        },

        "interactivity": {

            "events": {

                "onclick": {

                    "enable": false

                }

            }
        }

    }

);
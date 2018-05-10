/**
 *  Experiment script
 *  Set up a new experiment:
 *  - initialize stimuli
 *  - present stimuli
 *  - save responses
 */


/**
 * Ajax functionality and CSRF protection
 * https://flask-wtf.readthedocs.io/en/v0.13.1/csrf.html
 */

$(document).ajaxSend(function() {
    $("#loading").show();
});

$(document).ajaxComplete(function() {
    $("#loading").hide();
});

$(function() {
    'use strict';
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
});



// Information on using modules like the pattern below:
// https://medium.freecodecamp.org/javascript-modules-a-beginner-s-guide-783f7d7a5fcc
var experiment = (function() {
    'use strict';

    var stimuli = ['02.png','03.png', '04.png', '07.png'];
    var stimulus = '';
    var currentTrial = 0;
    var N = stimuli.length;
    var responses = [];

    /** 
     * Only initialize when currentrial is not set.
     * This prevents accidently refreshing and losing the current state
     * of the experiment
     */
    var initialize = function() {
        console.log('Initializing Experiment');
        if (sessionStorage.getItem('currentTrial') === null) {
            currentTrial = currentTrial + 1;
            sessionStorage.currentTrial = currentTrial;

            sessionStorage.responses = JSON.stringify(responses);

            randomization();
        } else {
            currentTrial = parseInt(sessionStorage.currentTrial, 0);
        }
        addSlider();
        showTrial();

    };

    var randomization = function() {
        console.log('Randomizing items');
        shuffle(stimuli);
    };


    /**
     * Show trial or go to finish page if there are no more items
     */

    var showTrial = function() {

        if (parseInt(sessionStorage.currentTrial, 0) === N + 1) {
            console.log('experiment finished');
            saveResponses();
            sessionStorage.clear();
            window.location.replace("finish");
        } else {
            stimulus = stimuli[parseInt(sessionStorage.currentTrial) - 1];
            var stimulusURL = "/static/img/stimuli/" + stimulus;
            console.log(stimulusURL);
            document.getElementById("stimulusImage").src = stimulusURL;
            updateProgress();
        }

    };


    var updateProgress = function() {
        'use strict';
        $('#currentTrial').html(parseInt(sessionStorage.currentTrial, 0));
        $('#totalTrials').html(N);
    }



    /**
     * Register an event handler whenever the submit button is pressed
     */
    $('#submit').on('click', function(event) {
        'use strict';
        event.preventDefault();
        console.log('Submitting form');
        registerResponse();
        //var responseTxt = $('#response').val();
        //registerResponse(responseTxt);
    });




    /**
     * Read the value of the rating and save it to client-side session storage
     */
    var registerResponse = function() {

        // retrieve the rating
        var rating = $(".rating").slider("option", "value");
        responses = JSON.parse(sessionStorage.responses);
        console.log('rating = ' + rating);
        responses.push({ 'stimulus': stimulus, 'trialID': currentTrial, 'response': rating });
        sessionStorage.responses = JSON.stringify(responses);

        // Update the counter and show the next trial
        currentTrial = currentTrial + 1;
        sessionStorage.currentTrial = currentTrial;
        showTrial();

    };

    /**
     * Write the responses to the server
     */

    var saveResponses = function() {
        var responseData = {'response': 'test'};

        $.ajax({
                type: "POST",
                url: 'saveResponses',
                timeout: 15000,
                //async: true,
                data: {responses:sessionStorage.responses},

/*                data: {payload: JSON.stringify( JSON.parse( decodeURIComponent(sessionStorage.responses) ) )},
*/                dataType: 'json',
                beforeSend: function() {
                    $("button").prop("disabled", true);
                }
            })
            .done(function(msg) {
                console.log('finished saving responses');
                console.log(msg);
                setTimeout(function() {
                    $("button").prop("disabled", false);
                }, 600);

            })
            .fail(function() {
                console.log('problem saving responses');
            });

    };

    /**
     * Shuffles array in place.
     * @param {Array} a items An array containing the items.
     */
    var shuffle = function(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    /**
     * Add a jquery ui slider to the page 
     * See http://simeydotme.github.io/jQuery-ui-Slider-Pips/
     * for configuration options
     * and http://api.jqueryui.com/slider/ 
     * for more general information
     * 
     */
    var addSlider = function() {

        var doubleLabels = [
            "<i>-2</i><span>Pure evil</span>",
            "<i>-1</i><span>Casually evil</span>",
            "<i>0</i><span>No opinion</span>",
            "<i>+1</i><span>Casually nice</span>",
            "<i>+2</i><span>Super nice</span>"
        ];

        $("#double-label-slider")
            .slider({
                max: 2,
                min: -2,
                value: 0,
                animate: 400
            })
            .slider("pips", {
                rest: "label",
                labels: doubleLabels
            });

    };



    return {
        initialize: initialize,
        randomization: randomization,
        showTrial: showTrial,
        saveResponses: saveResponses

    }
})();


experiment.initialize();
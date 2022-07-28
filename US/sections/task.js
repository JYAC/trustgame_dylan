/* param */
var button_str = '>>'

var fullscreen = false;

// Dan
var n_pre_trial = 12;
var pre_face_stimulus = prerep

// n_trail should be 72
var n_trial = 72;
var n_trait_rating = Math.round(n_trial / 2);
var face_duration = 4;
var reputation_duration = 4;

var race_choice = ['EA', 'AA'];
var gender_choice = ['W', 'M'];
var expression_choice = ['0', '1', '5']; // 0 = Neu, 1 = LAP, 5 = HAP
var reputation_choice = ['high', 'mod', 'low']
var identity_choice = [1,2,3,4,5,6,7,8,9,10,11,12]

var reputation_level_means = [20, 50, 80]
var range = 10

var money_option = ['\$0' ,'\$1', '\$2', '\$3', '\$4'];
var slider_prompt = "Press Q to move left, P to move right. \n Spacebar to confirm your choice.";

var face_stimulus = faces

/* PRE-REPUTATION TRIALS */

function showPreFace(face){
    var face = {
        type: "html-keyboard-response",
        stimulus: "<img src=\'img/faces_norep/"+face['image']+"\'>",
	    prompt: "<h2 style=\"text-align: center;\"><span style=\"color:black;\">.</span></h2><div style=\"height:135px; color:white;\"></div>",
        choices: [],
        trial_duration: face_duration * 1000
    };
    return face;
};

function showPreTrialQ(face){
    image_array.push("img/faces_norep/"+face['image']);
    var q = {
        type: 'survey-multi-choice',
        button_label: button_str,
        preamble: "<img src=\'img/faces_norep/"+face['image']+"\'>",
        questions: [{
            prompt: "<h2 style=\"text-align: center;\">How much money will you give to this player?</h2>",
            options: money_option,
            horizontal: true,
            required: true}],
        data: {
            emotion: face['emotion'],
            race: face['race'],
            sex: face['sex'],
        }
    };
    return q;
}

/* MAIN TASK */

function showReputation(face){
    image_array.push("img/faces/face_placeholder2.jpg");
    var reputation = {
        type: "html-keyboard-response",
        stimulus: "<div style=\"height:20px; color:white\"></div><h2 style=\"text-align: center;\">" + face['exact value'] + "% of people said that this player is trustworthy.</h2><div style=\"height:40px; color:white\"></div>",
        prompt: "<img src=\'img/faces/face_placeholder2.jpg\'><div style=\"height:90px; color:white\"></div>",
        choices: [],
        trial_duration: reputation_duration * 1000
    };
    return reputation;
};

function showFace(face){
    image_array.push("img/faces/"+face['image']);
    var face = {
        type: "html-keyboard-response",
        stimulus: "<div style=\"height:20px; color:white\"></div><h2 style=\"text-align: center;\">" + face['exact value'] + "% of people said that this player is trustworthy.</h2><div style=\"height:40px; color:white\"></div>",
	    prompt: "<img src=\'img/faces/"+face['image']+"\' style=width:175px; ><div style=\"height:220px; color:white\"></div>",
        choices: [],
        trial_duration: face_duration * 1000
    };
    return face;
};

/*function showReputation(reputation){
    var reputation = {
        type: "html-keyboard-response",
        stimulus: "<h2 style=\"text-align: center;\">" + reputation + "% of times they gave back half of what they received.</h2>",
        choices: [],
        trial_duration: reputation_duration * 1000
    };
    return reputation;
};*/

function showTrialQ(face){
    image_array.push("img/faces/"+face['image']);
    var q = {
        type: 'survey-multi-choice',
        button_label: button_str,
        preamble: "<div style=\"height:20px; color:white\"></div><h2 style=\"text-align: center;\">" + face['exact value'] + "% of people said that this player is trustworthy.</h2><div style=\"height:40px; color:white\"></div><img src=\'img/faces/"+face['image']+"\' style=width:175px;> <div style=\"height:10px; color:white\"></div>",
        questions: [{
            prompt: "<h2 style=\"text-align: center;\">How much money will you give to this player?</h2>",
            options: money_option,
            horizontal: true,
            required: true}],
        data: {
            reputation: face['reputation'],
            exact_value: face['exact value'],
            emotion: face['emotion'],
            race: face['race'],
            sex: face['sex'],
            identity: face['identity']
        }
    };
    return q;
}

// Dan
function getPreTrial(face){
    var trial = [showPreFace(face),
    showPreTrialQ(face)];
    return trial;
};

function getTrial(face){
    var trial = [showReputation(face),
    showFace(face),
    showTrialQ(face)];
    return trial;
};


var num_dots = [1,2,3,1,2,3,1,2,3,1,2]
var wait_duration = 500

function wait(ndots, duration, message){
    function getWait(ndots, duration, message){
        var q = {
            type: 'html-keyboard-response',
            stimulus: '<h4>' + message + '.'.repeat(ndots) + '</h4>',
            choices: [],
            trial_duration: duration,
        };
        return q;
    }
    var q_block = []
    for(i in ndots){
        q_block.push(getWait(num_dots[i], wait_duration, message));
    }
    return q_block;
}

/* Trait Ratings */
function showTraitQ(face){
    var q = {
        type: 'survey-multi-select',
        button_label: button_str,
        preamble: "<img src=\'img/faces/"+face['image']+"\'> <h3 style=\"text-align: center;\">" + face['exact value'] + "% of people said that this player is trustworthy.</h3>",
        questions: [{
                prompt: "<h3 style=\"text-align: center;\">To what extent is this player <u>benevolent</u>?</h3>",
                options: ["1: Not at all", "2", "3", "4: Moderately", "5", "6", "7: Extremely"],
                horizontal: true},
//                required: true},
            {
                prompt: "<h3 style=\"text-align: center;\">To what extent is this player <u>competent</u>?</h3>",
                options: ["1: Not at all", "2", "3", "4: Moderately", "5", "6", "7: Extremely"],
                horizontal: true},
//                required: true},
            {
                prompt: "<h3 style=\"text-align: center;\">To what extent is this player <u>competent</u>?</h3>",
                options: ["1: Not at all", "2", "3", "4: Moderately", "5", "6", "7: Extremely"],
                horizontal: true},
//                required: true},
            {   
                prompt: "<h3 style=\"text-align: center;\">To what extent is this player <u>financially needy</u>?</h3>",
                options: ["1: Not at all", "2", "3", "4: Moderately", "5", "6", "7: Extremely"],
                horizontal: true},
//                required: true},
            {   
                prompt: "<h3 style=\"text-align: center;\">To what extent is this player <u>dominant</u>?</h3>",
                options: ["1: Not at all", "2", "3", "4: Moderately", "5", "6", "7: Extremely"],
                horizontal: true},
//                required: true},
            {
                prompt: "<h3 style=\"text-align: center;\">To what extent is this player <u>friendly</u>?</h3>",
                options: ["1: Not at all", "2", "3", "4: Moderately", "5", "6", "7: Extremely"],
                horizontal: true}],
//                required: true}]  ,
        data: {
            reputation: face['reputation'],
            exact_value: face['exact value'],
            emotion: face['emotion'],
            race: face['race'],
            sex: face['sex'],
            identity: face['identity']
        }
    };
    return q;
};

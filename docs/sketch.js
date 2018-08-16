var scream = new Scream();
scream.randomize_vowels();


var child_screams = [];
var buttons = [];

var amplitude;


var scream_button;

var noise_seed;
var noise_offset;

var ee_content;
var oo_content;
var e_content;
var u_content;
var a_content;
var i_content;

var scream_length;

var voice_worble_rate;
var voice_worble_magnitude;

var mouth;

scream_active = false;

function setup() {
    frameRate(60);
    amplitude = new p5.Amplitude();
    save_button = createButton('save scream as JSON').mousePressed(save_json).parent('json');
    load_button = createButton('load scream from JSON').mousePressed(load_json).parent('json');
    
    
    scream_button = createButton('scream').mousePressed(function(){play_scream(scream)}).parent('scream_button');
    
    children_button = createButton('children').mousePressed(generate_children).parent('children');
    
    document.getElementById('child_screams').innerHTML = '<div id="child_1"> </div> <div id="child_2"> </div> <div id="child_3"> </div> <div id="child_4"> </div> <div id="child_5"> </div> <div id="child_6"> </div> ';

    noise_seed = createInput(scream.noise_seed, 'number').parent('seed');
        noise_offset = createInput(scream.perlin_noise_offset, 'number').parent('seed_offset')
        .attribute("min", '0');

    ee_content = createSlider(0, 1, scream.ee_amp, 0.05).parent("ee");   
    oo_content = createSlider(0, 1, scream.oo_amp, 0.05).parent("oo");   
    e_content  = createSlider(0, 1, scream.e_amp, 0.05).parent("e");   
    u_content  = createSlider(0, 1, scream.u_amp, 0.05).parent("u");   
    a_content  = createSlider(0, 1, scream.a_amp, 0.05).parent("a");   
    i_content  = createSlider(0, 1, scream.i_amp, 0.05).parent("i");   

    scream_length = createSlider(0, 3, scream.length, 0.05).parent("length");   
    
    voice_worble_rate = createSlider(1, 100, 30, 0.5).parent("worble_rate");   
    voice_worble_magnitude = createSlider(1, 100, 30, 0.5).parent("worble_magnitude");   
    
    mouth = createSlider(0, 1, 1, 0.01).parent("mouth");   

    

}

var record_position = 0;

var tune = 0;
var tuner = 1;


function draw() {
    var a = amplitude.getLevel()/2;
    mouth.value(a);
    
    document.getElementById("mouth_pos").style.top = 0 + mouth.value()*20 + "px";
    
    scream.perlin_noise_offset = noise_offset.value();
    scream.ee_amp = ee_content.value();
    scream.oo_amp = oo_content.value(); 
    scream.e_amp = e_content.value(); 
    scream.u_amp = u_content.value(); 
    scream.a_amp = a_content.value(); 
    scream.i_amp = i_content.value(); 
    
    scream.length = scream_length.value(); 
    scream.voice_worble_rate = voice_worble_rate.value();
    scream.voice_worble_magnitude = voice_worble_magnitude.value();

    if (scream_active){
        scream_button.attribute("disabled", '');    
    }
    else {
        scream_button.removeAttribute("disabled");    
    }
if (scream_active){
}

}
play_scream = function(scream_to_play){ 
    scream_active = true;
    var record_position = 0;
    var tune = 0; 
    var tuner = 1;

    console.log(scream_to_play.noise_seed);

    var play = setInterval(function(){
    noiseSeed(scream_to_play.noise_seed);
    var i = (record_position+scream_to_play.perlin_noise_offset)
        /scream_to_play.voice_worble_rate + (noise(record_position/150)-1) ;
    pitch_shift = noise(i*2)* 600;


    if (tune > noise(1)*10 * voice_worble_magnitude)
    {
        tuner = -1 * scream_to_play.voice_waorble_magnitude;
    }
    if (tune < 0)
    {
        tuner = 1 * scream_to_play.voice_worble_magnitude;
    }
    tune += tuner;
    scream_components.forEach(function(component) {
        scream_to_play[component].freq(pitch_shift+tune + record_position * 10 - 100);
        scream_to_play[component].amp(
            noise(record_position*2)/4 + 0.75 * scream_to_play[component.split("_")[0] + "_amp"]
        ) ;
  })
record_position += 1/1.5;
    },16.666);

    
    scream_components.forEach(function(component) {
            
        scream_to_play[component].amp(
            noise(record_position*2)/4 + 0.75 * scream_to_play[component.split("_")[0] + "_amp"]
        ) ;


        setTimeout(function(){
            scream_active = false;
            scream_to_play[component].amp(0);
            clearInterval(play);
            }, scream_to_play.length*1000);
    })

    
    console.log("AAAAAAAHHHHHHHHHHHHHH!!!!!");
}

play_scream_child = function(y){
    y = y.target.parentElement.id.charAt(6);
    console.log(y);
    play_scream(child_screams[y]);
}
seed_scream_child = function(y){
    y = y.target.parentElement.id.charAt(6);
    console.log(y);
    scream = child_screams[y];
    ee_content.value(scream.ee_amp)  ;
    oo_content.value(scream.oo_amp) ;
    e_content.value(scream.e_amp) ;
    u_content.value(scream.u_amp) ;
    a_content.value(scream.a_amp) ;
    i_content.value(scream.i_amp) ;

    scream_length.value(scream.length);
    
    voice_worble_rate.value(scream.voice_worble_rate); 
    voice_worble_magnitude.value(scream.voice_worble_magnitude); 
    
    while (buttons.length > 0 ){buttons.pop().remove()};
}

generate_children = function(){
    while (buttons.length > 0 ){buttons.pop().remove()};
    while (child_screams.length > 0 ){
        var trash = child_screams.pop()
        if (trash && trash !== scream){
        scream_components.forEach(function(component) {
            trash[component].dispose();
            trash[component + "_band"].dispose();
            })
            }
        };
    child_screams = [];
    for (var i = 1; i < 7; i++){
        child_screams[i] = new Scream();
        child_screams[i].randomize_vowels();
        child_screams[i].randomize_worble();
        
        if (Math.random() > .2) {child_screams[i].noise_seed = scream.noise_seed}; 
        if (Math.random() > .5) {child_screams[i].ee_amp = scream.ee_amp}; 
        if (Math.random() > .5) {child_screams[i].oo_amp = scream.oo_amp}; 
        if (Math.random() > .5) {child_screams[i].e_amp = scream.e_amp}; 
        if (Math.random() > .5) {child_screams[i].u_amp = scream.u_amp}; 
        if (Math.random() > .5) {child_screams[i].a_amp = scream.a_amp}; 
        if (Math.random() > .5) {child_screams[i].i_amp = scream.i_amp}; 
        if (Math.random() > .5) {child_screams[i].length = scream.length}; 
        
        
        buttons.push(createButton('scream' + i).mousePressed(play_scream_child).parent('child_' + i));
        buttons.push(createButton('seed' + i).mousePressed(seed_scream_child).parent('child_' + i));
        
    }
    buttons.push(createButton('choir').mousePressed(function(){
    for (var i = 1; i < 3; i+=1){play_scream(child_screams[i]); play_scream(scream);}
    }).parent('choir'))

}
function save_json(){
    data = {};
    data.oo_amp = scream.oo_amp;
    data.ee_amp = scream.ee_amp;
    data.e_amp = scream.e_amp;
    data.u_amp = scream.u_amp;
    data.a_amp = scream.a_amp;
    data.i_amp = scream.i_amp;
    data.perlin_noise_offset = scream.perlin_noise_offset;
    data.noise_seed = scream.noise_see;
    data.voice_worble_rate = scream.voice_worble_rate;
    data.voice_worble_magnitude = scream.voice_worble_magnitude;
    data.length = scream.length;

    document.getElementById("data_area").value = JSON.stringify(data);}
function load_json(){
    try{
        data = JSON.parse(document.getElementById("data_area").value);
    scream.oo_amp = data.oo_amp;
    scream.ee_amp = data.ee_amp;
    scream.e_amp = data.e_amp;
    scream.u_amp = data.u_amp;
    scream.a_amp = data.a_amp;
    scream.i_amp = data.i_amp;
    scream.perlin_noise_offset = data.perlin_noise_offset;
    scream.noise_seed = data.noise_see;
    scream.voice_worble_rate = data.voice_worble_rate;
    scream.voice_worble_magnitude = data.voice_worble_magnitude;
    scream.length = data.length;
    
    ee_content.value(scream.ee_amp)  ;
    oo_content.value(scream.oo_amp) ;
    e_content.value(scream.e_amp) ;
    u_content.value(scream.u_amp) ;
    a_content.value(scream.a_amp) ;
    i_content.value(scream.i_amp) ;

    scream_length.value(scream.length);
    
    voice_worble_rate.value(scream.voice_worble_rate); 
    voice_worble_magnitude.value(scream.voice_worble_magnitude); 
    } 
    catch (e)
    {
        alert("invalid JSON:   " + e);
        }
}


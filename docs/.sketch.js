var scream = {
    texture_1: new p5.Noise('pink'),   
    texture_2: new p5.Noise('pink'),   
    texture_3: new p5.Noise('pink'),   
    texture_1_band: new p5.BandPass(),
    texture_2_band: new p5.BandPass(),
    texture_3_band: new p5.BandPass(),
    
    oo_1: new p5.Oscillator("sawtooth"),   
    oo_2: new p5.Oscillator("sawtooth"),   
    oo_3: new p5.Oscillator("sawtooth"),   
    oo_1_band: new p5.BandPass(),
    oo_2_band: new p5.BandPass(),
    oo_3_band: new p5.BandPass(),
    oo_amp : 0.1,

    ee_1: new p5.Oscillator("sawtooth"),   
    ee_2: new p5.Oscillator("sawtooth"),   
    ee_3: new p5.Oscillator("sawtooth"),   
    ee_1_band: new p5.BandPass(),
    ee_2_band: new p5.BandPass(),
    ee_3_band: new p5.BandPass(),
    ee_amp : 0.1,

    e_1: new p5.Oscillator("sawtooth"),   
    e_2: new p5.Oscillator("sawtooth"),   
    e_3: new p5.Oscillator("sawtooth"),   
    e_1_band: new p5.BandPass(),
    e_2_band: new p5.BandPass(),
    e_3_band: new p5.BandPass(),
    e_amp : 0.1,

    
    u_1: new p5.Oscillator("sawtooth"),   
    u_2: new p5.Oscillator("sawtooth"),   
    u_3: new p5.Oscillator("sawtooth"),   
    u_1_band: new p5.BandPass(),
    u_2_band: new p5.BandPass(),
    u_3_band: new p5.BandPass(),
    u_amp : 0.1,

    
    i_1: new p5.Oscillator("sawtooth"),   
    i_2: new p5.Oscillator("sawtooth"),   
    i_3: new p5.Oscillator("sawtooth"),   
    i_1_band: new p5.BandPass(),
    i_2_band: new p5.BandPass(),
    i_3_band: new p5.BandPass(),
    i_amp : 0.1,

    
    a_1: new p5.Oscillator("sawtooth"),   
    a_2: new p5.Oscillator("sawtooth"),   
    a_3: new p5.Oscillator("sawtooth"),   
    a_1_band: new p5.BandPass(),
    a_2_band: new p5.BandPass(),
    a_3_band: new p5.BandPass(),
    a_amp : 0.1,



    perlin_noise_offset : 0,
    noise_ramp: 20
}


function setup() {
    noiseSeed(10);

    scream.texture_1_band.freq(500);
    scream.texture_2_band.freq(600);
    scream.texture_3_band.freq(700);
    scream.ee_1_band.freq(270);
    scream.ee_2_band.freq(2300);
    scream.ee_3_band.freq(3000);
    scream.oo_1_band.freq(300);
    scream.oo_2_band.freq(870);
    scream.oo_3_band.freq(2250);
    scream.e_1_band.freq(530);
    scream.e_2_band.freq(1850);
    scream.e_3_band.freq(2500);
    scream.u_1_band.freq(640);
    scream.u_2_band.freq(1200);
    scream.u_3_band.freq(2400);
    scream.i_1_band.freq(400);
    scream.i_2_band.freq(2000);
    scream.i_3_band.freq(2550);
    scream.a_1_band.freq(660);
    scream.a_2_band.freq(1700);
    scream.a_3_band.freq(2400);
   
    // for each oscillator or texture gnerator, set it's res, gain, and connectet the geneator to its band pass filters
    var scream_components = [   
                                "ee_1","ee_2","ee_3",
                                "oo_1","oo_2","oo_3", 
                                //"e_1", "e_2", "e_3", 
                                //"u_1", "u_2" ,"u_3", 
                                //"a_1", "a_2", "a_3", 
                                //"i_1", "i_2", "i_3", 
                                "texture_1", "texture_2", "texture_3"
                                ];
    scream_components.forEach(function(component) {
        scream[component + "_band"].res(50);
        scream[component + "_band"].gain(0);
        scream[component].disconnect(); 
        scream[component].connect(scream[component +"_band"]); 
        console.log(component.split("_")[0]+"_amp"); 
        scream[component].start(); 
        scream[component].amp(0);
    })
    

amplitude = new p5.Amplitude(); 
}

var record_position = 0;

var tune = 0;
var tuner = 1;
function draw() {

    i = (record_position+scream.perlin_noise_offset)
        /scream.noise_ramp + (noise(record_position/100)-1) ;
    pitch_shift = noise(i)* 1800;


    if (tune > Math.random()*10)
    {
        tuner = -1;
    }
    if (tune < 0)
    {
        tuner = 1;
    }
    tune += tuner;
    var scream_components = [   "ee_1","ee_2","ee_3",
                                "oo_1","oo_2","oo_3", 
                                "e_1", "e_2", "e_3", 
                                "u_1", "u_2" ,"u_3", 
                                "a_1", "a_2", "a_3", 
                                "i_1", "i_2", "i_3", 
                                ];
    scream_components.forEach(function(component) {
        scream[component].freq(pitch_shift+tune);
        if (record_position < amplitudes_1.length){
    //        scream[component].amp(Math.pow(amplitudes_2[record_position] + amplitudes_2[record_position],3)) ;
        ;
        }
        else
        {
        }
  //          scream[component].amp(0) ;
  })

    scream.texture_1_band.freq(pitch_shift + tune + 300);
    scream.texture_2_band.freq(pitch_shift + tune + 500);
    scream.texture_3_band.freq(pitch_shift + tune + (noise(record_position/100)*200));


record_position += 1;

}



play_scream = function(){ 
    var scream_components = [   "ee_1","ee_2","ee_3",
                                "oo_1","oo_2","oo_3", 
                                "e_1", "e_2", "e_3", 
                                "u_1", "u_2" ,"u_3", 
                                "a_1", "a_2", "a_3", 
                                "i_1", "i_2", "i_3", 
                                "texture_1", "texture_2", "texture_3"
                                ];
    scream_components.forEach(function(component) {
        scream[component].amp(noise(record_position / 10)/2 + 0.5) ;
        setTimeout(function(){scream[component].amp(0)}, 1400);
    })

    
    record_position = 0;
    //scream.magnitude_envelope.play();
    console.log("AAAAAAAHHHHHHHHHHHHHH!!!!!");
}

var scream_components = [   "ee_1","ee_2","ee_3",
                                "oo_1","oo_2","oo_3", 
                                "e_1", "e_2", "e_3", 
                                "u_1", "u_2" ,"u_3", 
                                "a_1", "a_2", "a_3", 
                               "i_1", "i_2", "i_3", 
                                ];
function Scream () {


    this.oo_1= new p5.Oscillator("sawtooth");   
    this.oo_2= new p5.Oscillator("sawtooth");   
    this.oo_3= new p5.Oscillator("sawtooth");   
    this.oo_1_band= new p5.BandPass();
    this.oo_2_band= new p5.BandPass();
    this.oo_3_band= new p5.BandPass();
    this.oo_amp = 1;

    this.ee_1= new p5.Oscillator("sawtooth");   
    this.ee_2= new p5.Oscillator("sawtooth");   
    this.ee_3= new p5.Oscillator("sawtooth");   
    this.ee_1_band= new p5.BandPass();
    this.ee_2_band= new p5.BandPass();
    this.ee_3_band= new p5.BandPass();
    this.ee_amp = 1;

    this.e_1= new p5.Oscillator("sawtooth");   
    this.e_2= new p5.Oscillator("sawtooth");   
    this.e_3= new p5.Oscillator("sawtooth");   
    this.e_1_band= new p5.BandPass();
    this.e_2_band= new p5.BandPass();
    this.e_3_band= new p5.BandPass();
    this.e_amp = 1;

    
    this.u_1= new p5.Oscillator("sawtooth");   
    this.u_2= new p5.Oscillator("sawtooth");   
    this.u_3= new p5.Oscillator("sawtooth");   
    this.u_1_band= new p5.BandPass();
    this.u_2_band= new p5.BandPass();
    this.u_3_band= new p5.BandPass();
    this.u_amp = 1;

    
    this.i_1= new p5.Oscillator("sawtooth");   
    this.i_2= new p5.Oscillator("sawtooth");   
    this.i_3= new p5.Oscillator("sawtooth");   
    this.i_1_band= new p5.BandPass();
    this.i_2_band= new p5.BandPass();
    this.i_3_band= new p5.BandPass();
    this.i_amp = 1;

    
    this.a_1= new p5.Oscillator("sawtooth");   
    this.a_2= new p5.Oscillator("sawtooth");   
    this.a_3= new p5.Oscillator("sawtooth");   
    this.a_1_band= new p5.BandPass();
    this.a_2_band= new p5.BandPass();
    this.a_3_band= new p5.BandPass();
    this.a_amp = 1;



    this.perlin_noise_offset = 0;
    this.voice_worble_rate= 20;
    this.voice_worble_magnitude= 20;
    this.length = 1 + Math.random()*2;

    this.ee_1_band.freq(270);
    this.ee_2_band.freq(2300);
    this.ee_3_band.freq(3000);
    this.oo_1_band.freq(300);
    this.oo_2_band.freq(870);
    this.oo_3_band.freq(2250);
    this.e_1_band.freq(530);
    this.e_2_band.freq(1850);
    this.e_3_band.freq(2500);
    this.u_1_band.freq(640);
    this.u_2_band.freq(1200);
    this.u_3_band.freq(2400);
    this.i_1_band.freq(400);
    this.i_2_band.freq(2000);
    this.i_3_band.freq(2550);
    this.a_1_band.freq(660);
    this.a_2_band.freq(1700);
    this.a_3_band.freq(2400);
    
    SetupFilters(this);
this.randomize_vowels = function(){
    this.ee_amp = Math.random();
    this.oo_amp = Math.random();
    this.e_amp = Math.random();
    this.u_amp = Math.random();
    this.a_amp = Math.random();
    this.i_amp = Math.random();
}
this.randomize_worble = function(){
    this.voice_worble_rate = Math.random()*40;
    this.voice_worble_magnitude = Math.random*60;
}
    }

function SetupFilters(scream){
    scream.noise_seed= Math.floor(Math.random()*100);
    scream_components.forEach(function(component) {
       scream[component + "_band"].res(.01);
        scream[component + "_band"].gain(0);
        scream[component].disconnect(); 
        scream[component].connect(scream[component +"_band"]); 
        scream[component].start(); 
        scream[component].amp(0);
    })
}



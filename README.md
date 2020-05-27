# codeklavier-extensions
Codeklavier &amp; Friends (code output targeting specific languages or DSLs or systems)

### This repository is a collection of .ini files to boot the codeklavier to be able to interact with other platforms.

The .ini files allow to boot the Codeklavier with spacial mappings that allow it to interact with different systems. Currently, the following
extensions are being developed:

- Caffeine.js (by Craig Latta)
- Augmented Reality / Unity (by Patrick Borgeat)
- Yamaha Disklavier (by Narcode)
- Hybrid (by Narcode)
- Hydra (by Olivia Jack)
- Mercury (by Timo Hoogland)
- NieuwBallet (by Joana Chicau)
- Fokker Organ (by Narcode)

# How does it work
When booting the codeklavier through the command line use the option -i <name_of_the_ini_file> syntax. For example
`.\codeklavier -i ckar.ini`

Don't forget to specify teh path to the .ini file. So example is 

`codeklavier.py -p hybrid -i ~/codeklavier-extensions/nieuwballet.ini`

## Want to make your own extension?

Choose the empty.ini file as a starting point and save as with your extension name.
In the ini file you will see a number of sections. There are two key modes, direct typing (key to character), known as "hello world" and everything else, known as "motippets". "motippets" includes shortcuts, motif recognition to code snippets,   conditionals and tremolo recognition.

Here is a brief outline of what these sections do

`[midi]`
The midi settings of the system you are using. For external keyboard use, device id 144 is most common.

`[hello world]` - single key in midi number to single character
eg: `60: A`    -> this means when in hello world mode, upon playing middle c, an A will print

`[shortcuts]` -  key commands that should NOT be printed
eg: `pagedown: shift, down`
Please note, eval should ALWAYS be present!

`[shortcuts mapping]` - some mystery step that narcode put in. You must restate what the name for shortcut is
eg: `pagedown: pagedown`

`[motippets register division]`
For mini motifs, we have the register divided in 3 parts. Here you can choose the division of those parts

`[chordal main motifs midi]`
Section for chordal main motifs
eg: `motif_1: 60, 63, 67` --> when a c major chord will be played, motif_1 will be recognised

`[melodic main motifs midi]`
Section for melodic main motifs
eg: `motif_chromatic: 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72`  -> when a chromatic scale from middle c is played, it will register motif_chromatic


A similar method should be used to define the chordal and melodic mini motifs, conditional and conditional result motifs. Besides the main motifs, all other motifs are register specific and should fall into only one register. This allows the pianist to play other material at the same time as playing a motif. Only mini motifs can be used to map to tremolos (see below) and a main motif must first be announced before tremolo listening is activated.

`[snippets code output]`
This is where you define the code. The code will type wherever the cursor is focused.
eg: 
`motif_1: ~snippet1 = Ndef(\piano_fx, {|dec=40, amp=0.01, rate=1| GVerb.ar(HPF.ar(SoundIn.ar(2,2), 9), 109, dec)*LFTri.kr(rate)*amp}).play(0,2)` 

The CodeKlavier also has a conditional, result, parameter block setup. In order to use this, one needs to first call the motif for a conditional, then a conditional_result, and then define the parameter by means of a tremolo.

In the `[snippets code output]` section, you should define what the conditional motif should print 
eg: conditional_1: setting up a conditional: IF number of notes played is more than 100 in...
This should be matched by the `[conditionals settings]` where you define the actual condition
eg: 
`conditional_1: note_count, 0, 100` (here the 0 is for non perpetual conditionals)

Conditional_results also need three seperate comments. One for upon recognition of the conditional_result motif, and one for both passing and failing the condition.
eg:  
`conditional_result_1_comment: if true -> stop ~snippet1, if false -> nothing
 conditional_result_1_true: ~snippet1.stop(20);
 conditional_result_1_false: //nothing`


`[snippets code output callback]` - unknown to me what this is about

`[snippets special flags]` - when motif counters should be reset upon a condition

`[motif counter]` - how many times you want the main motifs to be called
playlimit: 1 -> in this case it's one, but it could be 1000 or any number. This is useful for if you want some motifs to only ever be called once.

`[snippets for tremolos]` - this is where you define which mini motifs can lead to live tremolo input. This very useful for changing parameters.
eg: `mini_motif1: speed(,,)` -> the value of the tremolo (number of steps in interval) will be printed between the two commas. It is also possible to scale
eg: `mini_motif_scaled: gain(,,)minmax(0.01-2)` -> this will print the scaled value of the tremolo in the code.

`[motippets display settings]` - this is required for when using the CK_socket display. It is currently also a prerequisite for filling in with the tremolos. If not using the display, this will not effect anything.
eg: mini_motif_scaled: 2

`[motippets random limits]` - this is primarily working with our own extensions. Only random has impact on the broader CK chord. The value for random determines the length of the perpetual conditionals loop

## Using OSC values for conditionals.
The Codeklavier can send osc messages to localhost (127.0.0.1) in port 57210.
In the `[snippets code output]` you can define the osc_address/endpoint and the value to be sent. Options of values to be sent are:

`grab_value` -> sends a value related to the conditional loop function. It changes every iteration depending on the piano playing.

`a value` -> a literal value, could be `100` or `'hello'`. Note that the osc function will convert it to a string before being sent.

`randomN` -> a random number from a range as defined in the random section at the ini.

For example:

`conditional_result_1_true: message, osc, eaxmple_endpoint, 1` 

will send a `'1'` to the osc address `\example_endpoint`. So you could write your own OSC responders to do something with the incoming messages.
Here's an example of an OSC function that receives the incoming OSC in SuperCollider

`OSCdef(\myoscResponder, {|msg, time, addr, recvPort|
	msg.postln;
	// the value in msg[1] can be used in your code
	// ... your code
	.. ...
}, '/example_endpoint');`

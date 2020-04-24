# Mercury Codeklavier Extension

## Performance Example Code

Example Mercury-code for the performance

[mercury-performance.txt](./mercury-performance.txt)

## Trillmap Table

A table with all the trills and there corresponding parameter value per method.

[trillmap-list.md](./trillmap-list.md)

## Trillmap Example and Documentation

The trillmaps in action with documentation. Load the file as external editor in Mercury or use as reference below.

[mercury-trillmap-example.txt](./mercury-trillmap-doc.txt)

```java
// 
// Mapping trill values to parameters in methods for Mercury
//
// | :means lower or higher constrained
// - :means lower value possible
// + :means higher value possible
// 

set volume 1.5

new sample tabla_hi name(tabla) 
// gain(amplitude)
// amplitude: |~1 to ~16+ => 0. to 2. @exp 1 : ~8 = 1
	set tabla gain(~8)

// time(triggering-division)
// division: |~1 to ~16| : ~9 = 1
// => 1/32 1/24 1/16 1/8 1/6 1/4 1/3 1/2 1 2 3 4 5 6 7 8
	set tabla time(~9)

// speed(playback-speeed)
// pb-speed: |~1 to ~16| => 0.25 to 2 to -2 to -0.25 @exp 1 : ~4 = 1
	set tabla speed(~4)

// fx(reverb amp length)
// amp:    |~1 to ~16+ => 0.5 to 2. @exp 2
// length: |~1 to ~16+ => 1 to 16 @exp 1
	set tabla fx(reverb 0.8 ~18)
	// set tabla fx(reverb ~8 ~18)

// fx(delay division fb)
// division: |~1 to ~16+ => 0.0626 to 1 @exp 2
// feedback: |~1 to ~16| => 0.2 to 0.99 @exp 1 @default 0.8
	set tabla fx(delay ~3)
	// set tabla fx(delay ~3 ~8)

// fx(lfo division wave)
// division: |~1 to ~16| => 1/16 to 16/16 @exp 1
// wave:     |~1 to ~5| => sine, down, up, square, triangle @default square
	set tabla fx(lfo ~2)
	// set tabla fx(lfo ~2 ~4)

new synth sine name(tone) time(~4) note(0 3) pan(random)
// shape(attack release)
// attack:  |~1 to ~16+ => 1 to 5000 ms @exp 3 : ~8 = 500
// release: |~1 to ~16+ => 1 to 5000 ms @exp 3 : ~8 = 500
	set tone shape(~2 ~5)
	set tone fx(delay ~5 ~6 ~7)
```
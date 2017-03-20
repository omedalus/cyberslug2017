

breed [Cslugs Cslug]
breed [probos proboscis]
breed [flabs flab]
breed [hermis hermi]
breed [fauxflabs fauxflab]
probos-own [parent phase]
Cslugs-own [sns-hermi reward reward-neg App_State_Switch sns-flab-left sns-flab-right sns-hermi-left sns-hermi-right sns-betaine-left sns-betaine-right speed turn-angle Nutrition Satiation
  app-state IncentSal SomaticMap Vf Vh alpha-hermi beta-hermi lambda-hermi alpha-flab beta-flab lambda-flab delta-Vh delta-Vf hermcount flabcount
fauxflabcount]
patches-own [odor-flab odor-hermi odor-betaine]

to startup
  setup

end

to setup
  clear-all

  create-Cslugs 1 [
    set shape "Cslug"
    set color orange - 2
    set size 16
    set heading 0

    set Nutrition 0.5
    set IncentSal 0
    set SomaticMap 0
    set Satiation 0.5

   ;initial Rescorla parameters for Hermissenda & Flabellina
    set Vf 0
    set Vh 0
    set alpha-hermi 0.5
    set beta-hermi 1
    set lambda-hermi 1
    set alpha-flab 0.5
    set beta-flab 1
    set lambda-flab 1


    hatch-probos 1 [
      set shape "airplane"
      set size size / 2
      set parent myself
    ]

    pen-down
  ]

 create-flabs flab-populate [
    set shape "circle"
    set size 1
    set color red + 2
    setxy random-xcor random-ycor
  ]

  create-hermis hermi-populate [
    set shape "circle"
    set size 1
    set color green + 2
    setxy random-xcor random-ycor
  ]

    create-fauxflabs fauxflab-populate [
    set shape "circle"
    set size 1
    set color blue
    setxy random-xcor random-ycor
  ]

  ;initialize odors
  repeat 10 [
    ask hermis [set odor-hermi 0.5]
    ask hermis [set odor-betaine 0.5]
    ask flabs [set odor-flab 0.5]
    ask flabs [set odor-betaine 0.5]
    ask fauxflabs [set odor-flab 0.5]
    ask fauxflabs [set odor-betaine 0.5]
    diffuse odor-hermi 0.5
    diffuse odor-flab 0.5
    diffuse odor-betaine 0.5
  ]

  ask patches [recolor-patches]

  reset-ticks

end

to go

  ;; allow user to drag things around
  if mouse-down? [
    ask Cslugs [
      if distancexy mouse-xcor mouse-ycor < 3 [setxy mouse-xcor mouse-ycor]
    ]
    ask flabs [
      if distancexy mouse-xcor mouse-ycor < 3 [setxy mouse-xcor mouse-ycor]
    ]
    ask hermis [
      if distancexy mouse-xcor mouse-ycor < 3 [setxy mouse-xcor mouse-ycor]
    ]
  ]

  ; deposit odors
  ask hermis [set odor-hermi 0.5]
  ask hermis [set odor-betaine 0.5]
  ask flabs [set odor-flab 0.5]
  ask flabs [set odor-betaine 0.5]
  ask fauxflabs [set odor-flab 0.5]
  ask fauxflabs [set odor-betaine 0.5]

  ;; diffuse odors
  diffuse odor-hermi 0.5
  diffuse odor-flab 0.5
  diffuse odor-betaine 0.5

  ;; evaporate odors
  ask patches [
    set odor-hermi 0.95 * odor-hermi
    set odor-flab 0.95 * odor-flab ; changed from 0.98 to 0.95
    set odor-betaine 0.95 * odor-betaine
    recolor-patches
  ]

 ;;;;;;;;;;;;;;;;;;;;; Cslugbranchaea controls

  ask Cslugs [

    update-sensors
    update-proboscis
    set speed 0.06
    set turn-angle -1 + random-float 2


    ;; hermissenda & flabellina approach/avoidance
    set sns-hermi (sns-hermi-left + sns-hermi-right ) / 2
    let sns-betaine (sns-betaine-left + sns-betaine-right) / 2
    let sns-flab (sns-flab-left + sns-flab-right ) / 2
    let H (sns-hermi - sns-flab)
    let F (sns-flab - sns-hermi)

    set reward sns-betaine / (1 + (0.5 * Vh * sns-hermi) - 0.008 / Satiation) + 1.32 * Vh * sns-hermi ; R
    set reward-neg 1.32 * Vf * sns-flab ; R-



    set Nutrition Nutrition - 0.0005 * Nutrition
    set Satiation 1 / ((1 + 0.7 * exp(-4 * Nutrition + 2)) ^ (2))
    set IncentSal reward - reward-neg; put motivation here?
    set SomaticMap (- ((sns-flab-left - sns-flab-right) / (1 + exp (-50 * F)) + (sns-hermi-left - sns-hermi-right) / (1 + exp (-50 * H))))
    set app-state 0.01 + (1 / (1 + exp(- (IncentSal * 0.6) + 10 * satiation)) + 0.1 * ((App_State_Switch - 1) * 0.5)); + 0.25
    set App_State_Switch (((-2 / (1 + exp(-100 * (app-state - 0.245)))) + 1))

    set turn-angle (2 * App_State_Switch) / (1 + exp (3 * SomaticMap)) - App_State_Switch

    set speed 0.1

    rt turn-angle
    fd speed

    ;; PREY CONSUMPTION AND ODOR LEARNING


    let hermitarget other (turtle-set hermis) in-cone (0.4 * size) 45
    if any? hermitarget [
      set Nutrition Nutrition + count hermitarget * 0.3
      set hermcount hermcount + 1
      ask hermitarget [setxy random-xcor random-ycor]
      set delta-Vh alpha-hermi * beta-hermi * (lambda-hermi - Vh)
      set Vh Vh + delta-Vh
    ]

    let flabtarget other (turtle-set flabs) in-cone (0.4 * size) 45
    if any? flabtarget [
      set Nutrition Nutrition + count flabtarget * 0.3;
      set flabcount flabcount + 1
      ask flabtarget [setxy random-xcor random-ycor]
      set delta-Vf alpha-flab * beta-flab * (lambda-flab - Vf)
      set Vf Vf + delta-Vf
    ]

    let fauxflabtarget other (turtle-set fauxflabs) in-cone (0.4 * size) 45
    if any? fauxflabtarget [
      set Nutrition Nutrition + count fauxflabtarget * 0.3
      set fauxflabcount fauxflabcount + 1
      ask fauxflabtarget [setxy random-xcor random-ycor]

      set delta-Vf alpha-flab * beta-flab * (0 - Vf)
      set Vf Vf + delta-Vf; Jeff's hot new extinction mechanism
    ]

  ]


;;;;;;;;;;;;;;;;;;;;;;;; Hermi and Flab Controls

  ask flabs [
    rt -1 + random-float 2
    fd 0.02
  ]

  ask hermis [
    rt -1 + random-float 2
    fd 0.02
  ]

  ask fauxflabs [
    rt -1 + random-float 2
    fd 0.02
  ]


  tick
  if ticks = 150000 [stop]
end

to update-proboscis
 ask probos [
    set heading [heading] of parent
    setxy ([xcor] of parent) ([ycor] of parent)
    ifelse ([sns-betaine-left] of parent > 5.5) or ([sns-betaine-right] of parent > 5.5)
      [set phase (phase + 1) mod 20]
      [set phase 0]
    fd (0.15 * size) + (0.1 * phase)
  ]
end


to update-sensors

  let odor-flab-left [odor-flab] of patch-left-and-ahead 40 (0.4 * size)
  ifelse odor-flab-left > 1e-7
    [set sns-flab-left 7 + (log odor-flab-left 10)]
    [set sns-flab-left 0]

  let odor-flab-right [odor-flab] of patch-right-and-ahead 40 (0.4 * size)
  ifelse odor-flab-right > 1e-7
    [set sns-flab-right 7 + (log odor-flab-right 10)]
    [set sns-flab-right 0]

  let odor-hermi-left [odor-hermi] of patch-left-and-ahead 40 (0.4 * size)
  ifelse odor-hermi-left > 1e-7
    [set sns-hermi-left 7 + (log odor-hermi-left 10)]
    [set sns-hermi-left 0]

  let odor-hermi-right [odor-hermi] of patch-right-and-ahead 40 (0.4 * size)
  ifelse odor-hermi-right > 1e-7
    [set sns-hermi-right 7 + (log odor-hermi-right 10)]
    [set sns-hermi-right 0]

  let odor-betaine-left [odor-betaine] of patch-left-and-ahead 40 (0.4 * size)
  ifelse odor-betaine-left > 1e-7
    [set sns-betaine-left 7 + (log odor-betaine-left 10)]
    [set sns-betaine-left 0]

  let odor-betaine-right [odor-betaine] of patch-right-and-ahead 40 (0.4 * size)
  ifelse odor-betaine-right > 1e-7
    [set sns-betaine-right 7 + (log odor-betaine-right 10)]
    [set sns-betaine-right 0]

end

to recolor-patches
    ifelse odor-flab > odor-hermi [
      set pcolor scale-color red odor-flab 0 1
    ][
      set pcolor scale-color green odor-hermi 0 1
    ]
end


to show-sensors
  ask Cslugs [
    ask patch-left-and-ahead 40 (0.4 * size) [set pcolor yellow]
    ask patch-right-and-ahead 40 (0.4 * size) [set pcolor yellow]
  ]
end
@#$#@#$#@
GRAPHICS-WINDOW
205
10
730
546
51
50
5.0
1
10
1
1
1
0
1
1
1
-51
51
-50
50
1
1
1
ticks
30.0

BUTTON
39
43
102
76
NIL
setup
NIL
1
T
OBSERVER
NIL
NIL
NIL
NIL
1

BUTTON
113
44
176
77
NIL
go
T
1
T
OBSERVER
NIL
NIL
NIL
NIL
1

MONITOR
22
292
122
337
Hermi-L
[sns-hermi-left] of Cslug 0
2
1
11

MONITOR
91
292
193
337
Hermi-R
[sns-hermi-right] of Cslug 0
2
1
11

MONITOR
29
344
86
389
Flab-L
[sns-flab-left] of one-of Cslugs
2
1
11

MONITOR
100
344
157
389
Flab-R
[sns-flab-right] of one-of Cslugs
2
1
11

BUTTON
78
94
141
127
step
go
NIL
1
T
OBSERVER
NIL
NIL
NIL
NIL
1

BUTTON
48
500
156
533
NIL
show-sensors
NIL
1
T
OBSERVER
NIL
NIL
NIL
NIL
1

MONITOR
882
85
1007
130
Nutrition
[nutrition] of Cslug 0
3
1
11

MONITOR
884
141
950
186
Satiation
[satiation] of Cslug 0
3
1
11

MONITOR
51
446
138
491
sns-betaine
[(sns-betaine-left + sns-betaine-right) / 2] of Cslug 0
2
1
11

MONITOR
743
45
875
90
V_Hermi (Learning)
[Vh] of Cslug 0
3
1
11

MONITOR
740
245
853
290
Incentive Salience
[IncentSal] of Cslug 0
3
1
11

MONITOR
758
291
840
336
SomaticMap
[SomaticMap] of Cslug 0
3
1
11

MONITOR
746
103
866
148
V_Flab (Learning)
[Vf] of Cslug 0
3
1
11

MONITOR
743
362
862
407
Hermissenda eaten
[hermcount] of Cslug 0
0
1
11

MONITOR
744
421
861
466
Flabellina eaten
[flabcount] of Cslug 0
0
1
11

MONITOR
748
480
880
525
Faux-Flabellina eaten
[fauxflabcount] of Cslug 0
0
1
11

MONITOR
742
151
875
196
App-State
[App-State] of Cslug 0
3
1
11

MONITOR
740
201
841
246
AppStateSwitch
[App_State_Switch] of Cslug 0
3
1
11

MONITOR
881
191
938
236
Reward
[reward] of Cslug 0
3
1
11

MONITOR
868
308
934
353
sns-hermi
[sns-hermi] of Cslug 0
3
1
11

MONITOR
872
256
953
301
Reward-neg
[Reward-neg] of Cslug 0
3
1
11

MONITOR
30
390
87
435
Bet-L
[sns-betaine-left] of Cslug 0
3
1
11

MONITOR
108
390
165
435
Bet-R
[sns-betaine-right] of Cslug 0
3
1
11

SLIDER
13
172
185
205
flab-populate
flab-populate
0
15
10
1
1
NIL
HORIZONTAL

SLIDER
18
131
190
164
hermi-populate
hermi-populate
0
15
3
1
1
NIL
HORIZONTAL

SLIDER
17
209
189
242
fauxflab-populate
fauxflab-populate
0
15
0
1
1
NIL
HORIZONTAL

@#$#@#$#@
## ## WHAT IS IT?

This section could give a general understanding of what the model is trying to show or explain.

## ## HOW IT WORKS

This section could explain what rules the agents use to create the overall behavior of the model.

## ## HOW TO USE IT

This section could explain how to use the model, including a description of each of the items in the interface tab.

## ## THINGS TO NOTICE

This section could give some ideas of things for the user to notice while running the model.

## ## THINGS TO TRY

This section could give some ideas of things for the user to try to do (move sliders, switches, etc.) with the model.

## ## EXTENDING THE MODEL

This section could give some ideas of things to add or change in the procedures tab to make the model more complicated, detailed, accurate, etc.

## ## NETLOGO FEATURES

This section could point out any especially interesting or unusual features of NetLogo that the model makes use of, particularly in the Procedures tab.  It might also point out places where workarounds were needed because of missing features.

## ## RELATED MODELS

This section could give the names of models in the NetLogo Models Library or elsewhere which are of related interest.

## ## CREDITS AND REFERENCES

This section could contain a reference to the model's URL on the web if it has one, as well as any other necessary credits or references.
@#$#@#$#@
default
true
0
Polygon -7500403 true true 150 5 40 250 150 205 260 250

airplane
true
0
Polygon -7500403 true true 150 0 135 15 120 60 120 105 15 165 15 195 120 180 135 240 105 270 120 285 150 270 180 285 210 270 165 240 180 180 285 195 285 165 180 105 180 60 165 15

arrow
true
0
Polygon -7500403 true true 150 0 0 150 105 150 105 293 195 293 195 150 300 150

box
false
0
Polygon -7500403 true true 150 285 285 225 285 75 150 135
Polygon -7500403 true true 150 135 15 75 150 15 285 75
Polygon -7500403 true true 15 75 15 225 150 285 150 135
Line -16777216 false 150 285 150 135
Line -16777216 false 150 135 15 75
Line -16777216 false 150 135 285 75

bug
true
0
Circle -7500403 true true 96 182 108
Circle -7500403 true true 110 127 80
Circle -7500403 true true 110 75 80
Line -7500403 true 150 100 80 30
Line -7500403 true 150 100 220 30

butterfly
true
0
Polygon -7500403 true true 150 165 209 199 225 225 225 255 195 270 165 255 150 240
Polygon -7500403 true true 150 165 89 198 75 225 75 255 105 270 135 255 150 240
Polygon -7500403 true true 139 148 100 105 55 90 25 90 10 105 10 135 25 180 40 195 85 194 139 163
Polygon -7500403 true true 162 150 200 105 245 90 275 90 290 105 290 135 275 180 260 195 215 195 162 165
Polygon -16777216 true false 150 255 135 225 120 150 135 120 150 105 165 120 180 150 165 225
Circle -16777216 true false 135 90 30
Line -16777216 false 150 105 195 60
Line -16777216 false 150 105 105 60

car
false
0
Polygon -7500403 true true 300 180 279 164 261 144 240 135 226 132 213 106 203 84 185 63 159 50 135 50 75 60 0 150 0 165 0 225 300 225 300 180
Circle -16777216 true false 180 180 90
Circle -16777216 true false 30 180 90
Polygon -16777216 true false 162 80 132 78 134 135 209 135 194 105 189 96 180 89
Circle -7500403 true true 47 195 58
Circle -7500403 true true 195 195 58

circle
false
0
Circle -7500403 true true 0 0 300

circle 2
false
0
Circle -7500403 true true 0 0 300
Circle -16777216 true false 30 30 240

cow
false
0
Polygon -7500403 true true 200 193 197 249 179 249 177 196 166 187 140 189 93 191 78 179 72 211 49 209 48 181 37 149 25 120 25 89 45 72 103 84 179 75 198 76 252 64 272 81 293 103 285 121 255 121 242 118 224 167
Polygon -7500403 true true 73 210 86 251 62 249 48 208
Polygon -7500403 true true 25 114 16 195 9 204 23 213 25 200 39 123

cslug
true
0
Polygon -7500403 true true 135 285 165 285 210 240 240 165 225 105 210 90 195 75 105 75 90 90 75 105 60 165 90 240
Polygon -7500403 true true 150 60 240 60 210 105 90 105 60 60
Polygon -7500403 true true 195 120 255 90 195 90
Polygon -7500403 true true 105 120 45 90 105 90

cylinder
false
0
Circle -7500403 true true 0 0 300

dot
false
0
Circle -7500403 true true 90 90 120

face happy
false
0
Circle -7500403 true true 8 8 285
Circle -16777216 true false 60 75 60
Circle -16777216 true false 180 75 60
Polygon -16777216 true false 150 255 90 239 62 213 47 191 67 179 90 203 109 218 150 225 192 218 210 203 227 181 251 194 236 217 212 240

face neutral
false
0
Circle -7500403 true true 8 7 285
Circle -16777216 true false 60 75 60
Circle -16777216 true false 180 75 60
Rectangle -16777216 true false 60 195 240 225

face sad
false
0
Circle -7500403 true true 8 8 285
Circle -16777216 true false 60 75 60
Circle -16777216 true false 180 75 60
Polygon -16777216 true false 150 168 90 184 62 210 47 232 67 244 90 220 109 205 150 198 192 205 210 220 227 242 251 229 236 206 212 183

fish
false
0
Polygon -1 true false 44 131 21 87 15 86 0 120 15 150 0 180 13 214 20 212 45 166
Polygon -1 true false 135 195 119 235 95 218 76 210 46 204 60 165
Polygon -1 true false 75 45 83 77 71 103 86 114 166 78 135 60
Polygon -7500403 true true 30 136 151 77 226 81 280 119 292 146 292 160 287 170 270 195 195 210 151 212 30 166
Circle -16777216 true false 215 106 30

flag
false
0
Rectangle -7500403 true true 60 15 75 300
Polygon -7500403 true true 90 150 270 90 90 30
Line -7500403 true 75 135 90 135
Line -7500403 true 75 45 90 45

flower
false
0
Polygon -10899396 true false 135 120 165 165 180 210 180 240 150 300 165 300 195 240 195 195 165 135
Circle -7500403 true true 85 132 38
Circle -7500403 true true 130 147 38
Circle -7500403 true true 192 85 38
Circle -7500403 true true 85 40 38
Circle -7500403 true true 177 40 38
Circle -7500403 true true 177 132 38
Circle -7500403 true true 70 85 38
Circle -7500403 true true 130 25 38
Circle -7500403 true true 96 51 108
Circle -16777216 true false 113 68 74
Polygon -10899396 true false 189 233 219 188 249 173 279 188 234 218
Polygon -10899396 true false 180 255 150 210 105 210 75 240 135 240

house
false
0
Rectangle -7500403 true true 45 120 255 285
Rectangle -16777216 true false 120 210 180 285
Polygon -7500403 true true 15 120 150 15 285 120
Line -16777216 false 30 120 270 120

leaf
false
0
Polygon -7500403 true true 150 210 135 195 120 210 60 210 30 195 60 180 60 165 15 135 30 120 15 105 40 104 45 90 60 90 90 105 105 120 120 120 105 60 120 60 135 30 150 15 165 30 180 60 195 60 180 120 195 120 210 105 240 90 255 90 263 104 285 105 270 120 285 135 240 165 240 180 270 195 240 210 180 210 165 195
Polygon -7500403 true true 135 195 135 240 120 255 105 255 105 285 135 285 165 240 165 195

line
true
0
Line -7500403 true 150 0 150 300

line half
true
0
Line -7500403 true 150 0 150 150

pentagon
false
0
Polygon -7500403 true true 150 15 15 120 60 285 240 285 285 120

person
false
0
Circle -7500403 true true 110 5 80
Polygon -7500403 true true 105 90 120 195 90 285 105 300 135 300 150 225 165 300 195 300 210 285 180 195 195 90
Rectangle -7500403 true true 127 79 172 94
Polygon -7500403 true true 195 90 240 150 225 180 165 105
Polygon -7500403 true true 105 90 60 150 75 180 135 105

plant
false
0
Rectangle -7500403 true true 135 90 165 300
Polygon -7500403 true true 135 255 90 210 45 195 75 255 135 285
Polygon -7500403 true true 165 255 210 210 255 195 225 255 165 285
Polygon -7500403 true true 135 180 90 135 45 120 75 180 135 210
Polygon -7500403 true true 165 180 165 210 225 180 255 120 210 135
Polygon -7500403 true true 135 105 90 60 45 45 75 105 135 135
Polygon -7500403 true true 165 105 165 135 225 105 255 45 210 60
Polygon -7500403 true true 135 90 120 45 150 15 180 45 165 90

pleuro
true
0
Polygon -7500403 true true 135 285 165 285 210 240 240 165 225 105 210 90 195 75 105 75 90 90 75 105 60 165 90 240
Polygon -7500403 true true 150 60 240 60 210 105 90 105 60 60
Polygon -7500403 true true 195 120 255 90 195 90
Polygon -7500403 true true 105 120 45 90 105 90

square
false
0
Rectangle -7500403 true true 30 30 270 270

square 2
false
0
Rectangle -7500403 true true 30 30 270 270
Rectangle -16777216 true false 60 60 240 240

star
false
0
Polygon -7500403 true true 151 1 185 108 298 108 207 175 242 282 151 216 59 282 94 175 3 108 116 108

target
false
0
Circle -7500403 true true 0 0 300
Circle -16777216 true false 30 30 240
Circle -7500403 true true 60 60 180
Circle -16777216 true false 90 90 120
Circle -7500403 true true 120 120 60

tree
false
0
Circle -7500403 true true 118 3 94
Rectangle -6459832 true false 120 195 180 300
Circle -7500403 true true 65 21 108
Circle -7500403 true true 116 41 127
Circle -7500403 true true 45 90 120
Circle -7500403 true true 104 74 152

triangle
false
0
Polygon -7500403 true true 150 30 15 255 285 255

triangle 2
false
0
Polygon -7500403 true true 150 30 15 255 285 255
Polygon -16777216 true false 151 99 225 223 75 224

truck
false
0
Rectangle -7500403 true true 4 45 195 187
Polygon -7500403 true true 296 193 296 150 259 134 244 104 208 104 207 194
Rectangle -1 true false 195 60 195 105
Polygon -16777216 true false 238 112 252 141 219 141 218 112
Circle -16777216 true false 234 174 42
Rectangle -7500403 true true 181 185 214 194
Circle -16777216 true false 144 174 42
Circle -16777216 true false 24 174 42
Circle -7500403 false true 24 174 42
Circle -7500403 false true 144 174 42
Circle -7500403 false true 234 174 42

turtle
true
0
Polygon -10899396 true false 215 204 240 233 246 254 228 266 215 252 193 210
Polygon -10899396 true false 195 90 225 75 245 75 260 89 269 108 261 124 240 105 225 105 210 105
Polygon -10899396 true false 105 90 75 75 55 75 40 89 31 108 39 124 60 105 75 105 90 105
Polygon -10899396 true false 132 85 134 64 107 51 108 17 150 2 192 18 192 52 169 65 172 87
Polygon -10899396 true false 85 204 60 233 54 254 72 266 85 252 107 210
Polygon -7500403 true true 119 75 179 75 209 101 224 135 220 225 175 261 128 261 81 224 74 135 88 99

wheel
false
0
Circle -7500403 true true 3 3 294
Circle -16777216 true false 30 30 240
Line -7500403 true 150 285 150 15
Line -7500403 true 15 150 285 150
Circle -7500403 true true 120 120 60
Line -7500403 true 216 40 79 269
Line -7500403 true 40 84 269 221
Line -7500403 true 40 216 269 79
Line -7500403 true 84 40 221 269

x
false
0
Polygon -7500403 true true 270 75 225 30 30 225 75 270
Polygon -7500403 true true 30 75 75 30 270 225 225 270

@#$#@#$#@
NetLogo 5.3.1
@#$#@#$#@
@#$#@#$#@
@#$#@#$#@
@#$#@#$#@
@#$#@#$#@
default
0.0
-0.2 0 0.0 1.0
0.0 1 1.0 0.0
0.2 0 0.0 1.0
link direction
true
0
Line -7500403 true 150 150 90 180
Line -7500403 true 150 150 210 180

@#$#@#$#@
0
@#$#@#$#@

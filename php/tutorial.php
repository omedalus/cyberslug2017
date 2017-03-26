<div 
    data-cyberslug-tutorial=""
    data-mouseover-trigger="'#gamesurface'"
    id="tutorial-intro"
    class="tutorialoverlay rhanorside"
    data-appear-after-delay="750"
    data-only-show-once="true"
    >
  <header>Introduction</header>
  <div class="tutorialpage" data-tutorial-page="0">
    <p>
      Welcome to the lab!
    </p>
    <p>
      I'm <a href="https://mcb.illinois.edu/faculty/profile/rhanor/" target="_blank">Dr. Rhanor Gillette</a>,  
      Emeritus Professor of Molecular and Integrative 
      Physiology at the University of Illinois 
      at Urbana-Champaign.
    </p>
    <p>
      I'll be showing you around the equipment and 
      teaching you how everything works here.
    </p>
    <div class="buttonrow">
      <button data-ng-click="tutorialCtrl.nextPage()">
        Next
      </button>
    </div>
  </div> <!-- page 0 -->
  <div class="tutorialpage" data-tutorial-page="1">
    <p>
      Our research focuses on the brain of an animal called
      <em>Pleurobranchaea californica.</em>
    </p>
    <p>
      It's a 
      <a href="http://www.seaslugforum.net/find/pleucali" target="_blank">sea slug</a>, 
      about the size of a grapefruit. It lives in the Pacific
      Ocean, where it spends its time crawling along the ocean
      floor hunting tasty morsels. While it will try to eat 
      anything that moves, its most common prey is other smaller
      sea slugs like <em>Flabellina</em> and <em>Hermissenda</em>. 
    </p>
    <div class="buttonrow">
      <button data-ng-click="tutorialCtrl.nextPage()">
        Next
      </button>
    </div>
  </div> <!-- page 1 -->
  <div class="tutorialpage" data-tutorial-page="2">
    <p>
      Its brain is pretty small and simple &mdash; altogether, it's only 
      several thousand neurons. And yet with this tiny brain, the 
      <em>Pleurobranchaea</em> performs some relatively 
      nontrivial decision-making, and is even capable of 
      learning from experience! If we can crack exactly how it does this,
      we might learn a lot about how our own brains work &mdash;
      the human brain has over ten billion neurons, but 
      the principles of operation aren't necessarily all that different.
    </p>
    <div class="buttonrow">
      <button data-ng-click="tutorialCtrl.nextPage()">
        Next
      </button>
    </div>
  </div> <!-- page 2 --> 
  <div class="tutorialpage" data-tutorial-page="3">
    <p>
      We've charted enough of this creature's brain to build a 
      software simulation of some of its decision-making circuitry.
      That's what you're looking at right now.
    </p>
    <div class="buttonrow">
      <button data-ng-click="tutorialCtrl.nextPage()">
        Next
      </button>
    </div>
  </div> <!-- page 3 --> 
  <div class="tutorialpage" data-tutorial-page="4">
    <p>
      In this computer model, the <em>Pleurobranchaea</em>
      forages amongst three different kinds of prey.
    </p>
    <p>
      <span class="tutorialspan-morsel tutorialspan-hermi">
        Hermissenda
      </span>
      are nutritious and lack natural defenses, so they're 
      Cyberslug's favorite food.
    </p>
    <p>
      <span class="tutorialspan-morsel tutorialspan-flab">
        Flabellina
      </span>
      are just as nutritious, but have toxic spines.
      Cyberslug will only approach them if it's incredibly 
      hungry.
    </p>
    <p>
      <span class="tutorialspan-morsel tutorialspan-faux">
        Faux
      </span>
      is a Batesian mimic. It exudes a chemical odor signature
      (i.e. smells) like <em>Flabellina</em>,
      but doesn't have those toxic spines.
    </p>
    <div class="buttonrow">
      <button data-ng-click="tutorialCtrl.nextPage()">
        Next
      </button>
    </div>
  </div> <!-- page 4 -->
  <div class="tutorialpage" data-tutorial-page="5">
    <p>
      With only a handful of neurons controlling its actions,
      the <em>Pleurobranchaea</em> is able to strategize
      about what to eat and where to go. By making the right 
      choices, it's able to make optimal use of its food
      resources, acquiring enough nutrition to survive while
      generally avoiding harm as much as possible.
    </p>
    <div class="buttonrow">
      <button data-ng-click="tutorialCtrl.nextPage()">
        Next
      </button>
    </div>
  </div> <!-- page 5 -->
  <div class="tutorialpage" data-tutorial-page="6">
    <p>
      Cyberslug lets you watch this decision-making process in 
      real time. The equipment around you gives you an inside
      view into the slug's decision-making processes, opening
      a window into the neural pathways that make this 
      animal's behavior possible.
    </p>
    <p>
      In our lab, we think this is pretty interesting in its own right!
      But we also believe that a software simulation of the slug's 
      simple yet powerful neurocircuitry could yield applications
      in robotics and intelligent agent design.
    </p>
    <div class="buttonrow">
      <button data-ng-click="tutorialCtrl.nextPage()">
        Next
      </button>
    </div>
  </div> <!-- page 6 -->
  <div class="tutorialpage" data-tutorial-page="7">
    <p>
      Well I've certainly done enough talking for now! I'll let you
      play around for yourself.
    </p>
    <p>
      I'll stick around nearby. If you have any questions about 
      any of the equipment, simply <strong>hover over any control</strong>
      and I'll pop up and tell you all about it.
    </p>
    <p>
      Once you don't need me anymore, flip the "Info" switch below you 
      (the one with the <img class="inline-glyph" src="img/glyph-info-active.png" />
      icon), and I'll get out of your hair.
    </p>
    <p>
      Have a good science!
    </p>
    <div class="buttonrow">
      <button data-ng-click="tutorialCtrl.dismiss()">
        OK
      </button>
    </div>
    
    <div style="position:absolute;right:136px;top:432px;animation: bounce-up ease-in-out .5s infinite alternate;">
      <img src="img/downwards_glowing_green_arrow.png"></img>
    </div>
  </div> <!-- page 7 -->
</div> <!-- intro -->

<div 
    id="tutorial-dial-audio"
    data-cyberslug-tutorial=""
    data-mouseover-trigger="'#dial-audio'"
    class="tutorialoverlay"
    data-appear-after-delay="750"
    data-disappear-on-mouseout="true"
    >
  <header>Audio Control</header>
  <p>
    This dial adjusts the audio levels of the Cyberslug 2017 lab.
    It has four notches.
    <ul>
      <li><em>Max</em>: Background music, slug noises, and interface noises.</li>
      <li><em>No music</em>: Slug noises and interface noises only.</li>
      <li><em>Interface</em>: Only the equipment's controls make sounds.</li>
      <li><em>Silence</em>: No audio.</li>
    </ul>
  </p>
</div> <!-- dial-audio -->

<div 
    data-cyberslug-tutorial=""
    data-mouseover-trigger="'#canvasnameplate'"
    id="tutorial-canvasnameplate"
    class="tutorialoverlay rhanorside"
    data-appear-after-delay="750"
    >
  <header>About Cyberslug 2017</header>
  <p>
    This software presents studies conducted by 
    <a href="https://mcb.illinois.edu/faculty/profile/rhanor/" target="_blank">my lab</a>
    in the School of Molecular and Cellular Biology 
    at the University of Illinois at Urbana-Champaign. 
    My research team includes Graduate Research Assistant
    <a href="https://beckman.illinois.edu/directory/person/gribkov2" target="_blank">
      Ekaterina D. Gribkova
    </a>.
  </p>
  
  <p>
    Cyberslug was developed by Mikhail Voloshin,
    a computational neuroscience graduate student of mine from 
    back in 2000. He's since gone on to work at 
    Microsoft, Google, a few dot-coms, and 
    a couple of hedge funds. 
    
    <a href="https://www.amazon.com/dp/1533001731/" target="_blank">He's even written a novel!</a>
    It's called 
    <a href="https://www.amazon.com/dp/1533001731/" target="_blank"><em>Dopamine</em></a>. 
    You should go check it out!
  </p>
  <div class="buttonrow">
    <button data-ng-click="tutorialCtrl.dismiss()">
      I'll totally go read Mikhail's novel
    </button>
  </div>
</div> <!-- about -->

<div 
    data-cyberslug-tutorial=""
    data-mouseover-trigger="'#switch-info'"
    id="tutorial-switch-info"
    class="tutorialoverlay rhanorside"
    data-appear-after-delay="750"
    data-disappear-on-mouseout="true"
    >
  <header>Summon Dr. Rhanor Gillette</header>
  <p>
    Flip this switch if you don't want to keep seeing me 
    pop up here anymore. Dont worry, though &mdash; I won't be far!
    You can always flip it back on if you need me again.
  </p>
</div> <!-- switch-info -->

<div 
    data-cyberslug-tutorial=""
    data-mouseover-trigger="'#feedingrow .lamp'"
    id="tutorial-app-state"
    class="tutorialoverlay"
    data-appear-after-delay="750"
    >
  <header>Appetitive State Indicator</header>
  <div class="tutorialpage" data-tutorial-page="0">
    <p>
      Our research has shown that, like a very simple robot,
      the real-life <em>Pleurobranchaea</em> runs in 
      discrete modes of operation. Two of those modes are
      regulated by an internal "appetitive state switch".
      To put it simply, you can think of these modes as
      "Hungry" and "Not Hungry".
    </p>
    <div class="buttonrow">
      <button data-ng-click="tutorialCtrl.nextPage()">
        Next
      </button>
    </div>
  </div>
  <div class="tutorialpage" data-tutorial-page="1">
    <p>
      When the slug is sated, it actively avoids all food sources.
      Indeed, when this "Hungry" light is off, try
      picking up the slug and dragging it near a tasty green
      <span class="tutorialspan-morsel tutorialspan-hermi">
        Hermissenda
      </span>, which has no natural defenses and represents
      nothing but pure nutrients.
      Like            
      <a target="_blank" href="https://www.youtube.com/watch?v=FkpCP9R1Jjc">
        Ryan Gosling refusing to eat his cereal
      </a>, the slug will turn away from the delicious morsel.
    </p>
    <p>
      Strategically, there are several good reasons for this.
      One is that it's generally better to eat as few prey 
      animals as you need, in order to preserve the prey population
      for the future &mdash; predators that are too aggressive
      risk exterminating their entire food supply. Another is 
      for safety reasons &mdash; if the slug smells something
      yummy nearby, then it's possible that other predators smell
      it too, and if the slug is sated then it really doesn't 
      need to risk a potentially lethal fight over a completely
      superfluous pack of calories.
    </p>
    <div class="buttonrow">
      <button data-ng-click="tutorialCtrl.nextPage()">
        Next
      </button>
    </div>
  </div>
  <div class="tutorialpage" data-tutorial-page="2">
    <p>
      But, like <a target="_blank" href="https://www.youtube.com/watch?v=MixNh9L7G5M">
        Joe Pesci in a Snicker's commercial
      </a>,
      the slug acts different when it's hungry. When its stomach
      is growling (yes, it has a stomach; no, it doesn't really growl),
      it goes straight for the best meal it can find.
    </p>
    <p>
      "Best" is a 
      combination of primarily three factors: how far away the prey is,
      how nutritious the prey is, and how much of a fight the prey 
      is expected to put up (i.e. what kind of risks may be involved).
      Usually, the slug will choose the safest meal it can reach, so 
      it'll tend to prefer a distant 
      <span class="tutorialspan-morsel tutorialspan-hermi">
        Hermissenda
      </span>
      over a nearby 
      <span class="tutorialspan-morsel tutorialspan-flab">
        Flabellina
      </span>.
      But as it gets progressively hungrier, it starts to care less and
      less about the risk &mdash; it needs those calories <em>now</em>!
      Let it get hungry enough, and it'll devour Hermi and Flab 
      alike, spines be damned.
    </p>
    <p>
      We know that 
      <a target="_blank"
          href="https://www.psychologytoday.com/blog/neuronarrative/201405/youre-not-yourself-when-youre-hungry-and-thats-problem">
        humans act more or less the same way
      </a>. That's why we research these animals &mdash;
      because, for all our language and technology and culture and art 
      and ability to program JavaScript applications, 
      deep down we're really not all that different.
    </p>
    <div class="buttonrow">
      <button data-ng-click="tutorialCtrl.dismiss()">
        OK
      </button>
    </div>
  </div>
</div> <!-- app-state-indicator -->

<div 
    data-cyberslug-tutorial=""
    data-mouseover-trigger="'#feedinghistory'"
    class="tutorialoverlay"
    data-appear-after-delay="750"
    data-disappear-on-mouseout="true"
    >
  <header>Feeding History</header>
  <p>
    This readout shows how many organisms of each species
    the slug has eaten.
  </p>
  <p>
    You'll probably notice that, over time,
    the slug eats more 
    <span class="tutorialspan-morsel tutorialspan-hermi">
      Hermissenda
    </span>
    than any other prey type, even if Hermis are relative 
    rare and sparse in the environment. This is a rather
    big deal! It means that the slug is correctly avoiding
    <span class="tutorialspan-morsel tutorialspan-flab">Flabellina</span>, 
    seeing no point in risking its safety on 
    Flabellina's natural defenses except in extreme 
    caloric emergencies &mdash; which, if the slug is 
    doing its job of foraging correctly, should be rare.
  </p>
</div> <!-- feeding-history -->

<div 
    data-cyberslug-tutorial=""
    data-mouseover-trigger="'#buttonrow'"
    class="tutorialoverlay"
    data-appear-after-delay="750"
    data-disappear-on-mouseout="true"
    >
  <header>Simulation Run Controls</header>
  <p>
    This row of buttons allows you to start and stop the simulation.
    <ul>
      <li><strong>Stop</strong>: Stop and reset the simulation.
      The next time you hit any of the other buttons, the 
      simulation will restart with a new population of prey.
      This will make the Feeding History counters reset, too.</li>
      <li><strong>Play</strong>: Run the simulation at normal speed.</li>
      <li><strong>Fast Forward</strong>: Run the simulation at accelerated speed.</li>
      <li><strong>Step</strong>: Run the simulation one time-step at a time.
      This is useful when you want to keep a very close eye on the slug's 
      behavior and watch how it changes in relation to the gauges.</li>
      <li><strong>Pause</strong>: Stop the simulation, but don't reset it. 
      The next time you hit Play, Fast Forward, or Step, the simulation 
      will pick back up from where it left off.</li>
    </ul>
  </p>
</div> <!-- buttonrow -->

<div 
    data-cyberslug-tutorial=""
    data-mouseover-trigger="'#dialrow .dial'"
    class="tutorialoverlay"
    data-appear-after-delay="750"
    data-disappear-on-mouseout="true"
    >
  <header>Prey Population Controls</header>
  <p>
    These dials allow you to set the populations of 
    <span class="tutorialspan-morsel tutorialspan-hermi">
      Hermissenda</span>,
    <span class="tutorialspan-morsel tutorialspan-flab">
      Flabellina</span>,
    and 
    <span class="tutorialspan-morsel tutorialspan-faux">
      Faux Flabellina</span>. 
    Each species can have between 0 and 15 specimens.
  </p>
  <p>
    Specimens don't really die when they get eaten. They get 
    taken to a happier place. That happier place is somewhere 
    else in the environment far away from the Cyberslug.
    That is, their positions get randomly regenerated, effectively
    reincarnating each eaten animal. Therefore, the number of 
    specimens of each species stays the same throughout the 
    run of the simulation.
  </p>
  <p>
    Your changes will take effect after you hit the "Stop" button.
    You'll see your new prey populations the next time you 
    run the simulation.
  </p>
</div> <!-- dialrow -->          


<div 
    data-cyberslug-tutorial=""
    data-mouseover-trigger="'#displaycontrolsrow .dial'"
    class="tutorialoverlay"
    data-appear-after-delay="750"
    data-disappear-on-mouseout="true"
    >
  <header>Snail Trail Viewer</header>
  <p>
    This dial lets you see where the slug has traveled in the last
    few hundred turns. The higher you turn the dial, the more of the 
    slug's foraging history you can see.
  </p>
</div> <!-- trail dial -->


<div 
    data-cyberslug-tutorial=""
    data-mouseover-trigger="'#displaycontrolsrow .switch'"
    class="tutorialoverlay"
    data-appear-after-delay="750"
    >
  <header>Odor Viewers</header>
  <div class="tutorialpage" data-tutorial-page="0">
    <p>
      All living things exude a telltale chemical cocktail into their 
      environment. We humans recognize this as a "scent". And though 
      humans are primarily visual and auditory creatures, for most 
      organisms on Earth the olfactory sense is their foremost way 
      of sensing the world around them.
    </p>
    <p>
      Such is the case with the 
      <em>Pleurobranchaea</em>. It is, for all practical purposes, 
      deaf, dumb, and blind &mdash; it gets around purely by sense 
      of smell and touch. And though a sea slug is unlikely to 
      <a href="https://www.youtube.com/watch?v=H_r_dWenKhk" target="_blank">
        dethrone Elton John as the reigning pinball champion of Sussex
      </a>
      anytime soon, it can at least use its skills to keep itself
      from starving among the benthic fauna of the Pacific ocean floor.
    </p>
    <div class="buttonrow">
      <button data-ng-click="tutorialCtrl.nextPage()">
        Next
      </button>
    </div>
  </div>
  <div class="tutorialpage" data-tutorial-page="1">
    <p>
    The slug is able to home in on its prey by following
      the source of their respective odors.
      The way it does this is remarkably simple.
    </p>
    <p>
      See those two antenna-like 
      protrusions on the slug's front? Those are stalks of chemoreceptors
      &mdash; essentially, they're like our nostrils, only inside-out.
      The slug compares an odor signature from the chemoreceptors on its left,
      to the odor signature from the chemoreceptors on its right.
      Whichever side the odor signature is strongest on, that's the direction
      that the slug turns.
    </p>
    <p>
      This is partly why we chose this animal for research, and why it's 
      well-suited for software simulation. This compare-left-right-and-turn 
      algorithm is so straightforward, so easy to build with even 
      the most rudimentary components, that it's often
      <a href="http://www.drgraeme.net/DrGraeme-free-NXT-G-tutorials/Ch102/Ch102V1G/default.htm"
          target="_blank">
        given to middle-school children as a kid-friendly robotics project</a>.
      It should be no surprise, then, that we can find it in nature.
    </p>
    <div class="buttonrow">
      <button data-ng-click="tutorialCtrl.nextPage()">
        Next
      </button>
    </div>
  </div>
  <div class="tutorialpage" data-tutorial-page="2">
    <p>
      Though the actual odor signatures of real-world animals consist of 
      up to thousands of different peptide chains, this Cyberslug equipment
      simplifies them for easy visualization.
    </p>
    <p>
      The defenseless and nutritious 
      <span class="tutorialspan-morsel tutorialspan-hermi">
        Hermissenda</span>
      has an odor gradient depicted by a green diffusion.
      A hungry slug should move in the direction where the 
      green is denser.
    </p>
    <p>
      The spiny, well-defended
      <span class="tutorialspan-morsel tutorialspan-flab">
        Flabellina</span>
      has an odor gradient depicted by a red diffusion.
      A slug should move <em>away from</em> a direction in which the red 
      is denser. It can make exceptions, however, in situations
      when it's very low on nutrients and at risk of starving to death.
      Then, dealing with the Flab's defenses can be worth the cost.
    </p>
    <div class="buttonrow">
      <button data-ng-click="tutorialCtrl.nextPage()">
        Next
      </button>
    </div>
  </div>
  <div class="tutorialpage" data-tutorial-page="3">
    <p>
      The Batesian mimic 
      <span class="tutorialspan-morsel tutorialspan-faux">
        Faux Flabellina</span>
      doesn't have any defenses, but it tries to protect itself
      by exuding an odor that matches Flab's, i.e. a red 
      diffusion, thereby repelling all but the hungriest
      slugs.
    </p>
    <p>
      This is actually a form of parasitism &mdash;
      the Faux gains the protection of the Flab's spines without paying 
      the metabolic cost of having to grow any such structures itself.
      And, like most parasitic relationships, it's harmful to 
      the Flabellina. Every now and then, a hungry slug 
      will eat a Faux and realize it's harmless, which will 
      cause it to have less fear of things that smell "red" &mdash;
      which will result in several Flabs getting eaten while 
      the slug, getting stung, re-learns a sense of caution.
    </p>
    <div class="buttonrow">
      <button data-ng-click="tutorialCtrl.nextPage()">
        Next
      </button>
    </div>
  </div>
  <div class="tutorialpage" data-tutorial-page="4">
    <p>
      Lastly, betaine is worth mentioning only because 
      the <em>Pleurobranchaea</em>'s betaine receptors are 
      directly connected to its "attack" reflex. 
    </p>
    <p>
      Betaine
      is a simple organic compound exuded by a wide variety
      of invertebrate sea life. Some of this life is 
      prey, while some could be predators &mdash; larger
      sea slugs, for example, looking to make the 
      <em>Pleurobranchaea</em> their dinner. In either event,
      when the smell of betaine gets particularly strong,
      it can only mean one thing: There's something nearby,
      and it needs to be bitten immediately!
    </p>
    <p>
      Try picking up the Cyberslug and dragging it into a patch
      of betaine &mdash; that is, close to any prey. If it's not 
      hungry (see the tutorial about the "Hungry" light in the 
      lower right corner), it'll try to turn away. But if you force 
      it to get close against its will, you'll see the Cyberslug 
      retract its oral frond and extend its proboscis, viciously
      biting and rending with all its might! Which, granted,
      isn't much &mdash; the slug is a hydrostatic creature with 
      no solid parts, and its bite can't even damage human skin.
      But it still feels kind of gross, so I wouldn't recommend it.
    </p>
    <div class="buttonrow">
      <button data-ng-click="tutorialCtrl.dismiss()">
        OK
      </button>
    </div>
  </div>
</div> <!-- odor switches -->


<div 
    data-cyberslug-tutorial=""
    data-mouseover-trigger="'#gauge-nutrition'"
    class="tutorialoverlay"
    data-appear-after-delay="750"
    data-disappear-on-mouseout="true"
    >
  <header>Nutrition Gauge</header>
  <p>
    This gauge shows the slug's current nutrition levels,
    which is a rough approximation of the animal's net 
    available caloric reserves.
  </p>
  <p>
    In the real world, particularly in complex animals like 
    humans, this can't really be broken down into a single 
    number. Our "nutrient levels" include things 
    like blood glucose, adipose tissue, protein-vs-carbs 
    ratio, vitamins, and so on. There are entire fields of 
    biology and medicine revolving around how humans
    process food.
  </p>
  <p>
    Fortunately, the <em>Pleurobranchaea</em>'s metabolism 
    isn't nearly as complicated. It turns out that just
    having a single meter labeled "Nutrition", representing 
    a general abstraction of glucose and amino acid reserves,
    makes for a pretty adequate approximation.
  </p>
  <p>
    Naturally, the Nutrition gauge depletes as time passes. In theory,
    a slug with a completely depleted Nutrition gauge should slow down,
    weaken, and die of starvation. In practice, we don't implement
    that because we don't really learn a lot from it. Also, it's 
    depressing.
  </p>
</div> <!-- gauge-nutrition -->

<div 
    data-cyberslug-tutorial=""
    data-mouseover-trigger="'#gauge-satiation'"
    class="tutorialoverlay"
    data-appear-after-delay="750"
    data-disappear-on-mouseout="true"
    >
  <header>Satiation Gauge</header>
  <p>
    This gauge displays the slug's level of satiation
    &mdash; how "full" it feels, or how strongly its 
    "I'm good for now and don't need to go foraging
    at the moment" receptors are firing.
  </p>
  <p>
    Satiation is essentially redundant with Nutrition
    &mdash; while the Nutrition gauge moves linearly, 
    the Satiation gauge moves along a sigmoid function.
    The only reason to represent it separately is 
    to emphasize that Satiation is a utility function 
    on Nutrition &mdash; that is, while Nutrition is 
    more or less of a straight line, Satiation has 
    distinct positive and negative states. This is 
    especially relevant when computing whether
    or not the slug is in "Hungry" mode &mdash;
    which you can get more information about by
    hovering over the "Hungry" light in the lower
    right corner.
  </p>
</div> <!-- gauge-satiation -->


<div 
    data-cyberslug-tutorial=""
    data-mouseover-trigger="'#gauge-incentive'"
    class="tutorialoverlay"
    data-appear-after-delay="750"
    data-disappear-on-mouseout="true"
    >
  <header>Incentive Salience Gauge</header>
  <p>
    The slug's "Incentive Salience" gauge shows how strongly 
    the slug is compelled to turn toward or away from stimuli.
    The "Incentive Salience" calculation takes into account both 
    the input from the slug's chemoreceptors, and also its 
    current Satiation state. 
  </p>
  <p>
    A very hungry slug may be strongly incentivized to turn 
    toward anything edible.
    A very full slug, i.e. one that's just eaten, 
    will be strongly incentivized to turn <em>away</em> from new
    sources of food. (If you want an explanation as to why
    it would have evolved that behavior, hover over the "Hungry" light 
    in the lower right corner for a tutorial about the 
    slug's "appetitive state".) One that's only moderately hungry may
    feel some incentive to turn toward a Hermi, but away from a Flab.
  </p>
</div> <!-- gauge-incentive -->


<div 
    data-cyberslug-tutorial=""
    data-mouseover-trigger="'#gauge-somatic-map'"
    class="tutorialoverlay"
    data-appear-after-delay="750"
    data-disappear-on-mouseout="true"
    >
  <header>Somatic Map Gauge</header>
  <p>
    The "somatic map" is merely an indicator of which 
    direction the slug feels compelled to turn in. 
    A very negative value indicates that the slug is feeling 
    the intense urge to veer left; a very positive one 
    indicates a desire to turn right.
  </p>
  <p>
    The "somatic map" is computed by taking the slug's 
    "Incentive Salience" level, and applying it to the signals  
    being received by the 
    slug's left and 
    right chemoreceptor stalks respectively. (That's what those
    antenna-looking things on the slug's head are: they're its 
    nose. For more information, hover over the Hermi/Flab/&#x3b2;ine 
    switches above to learn about how the <em>Pleurobranchaea</em>
    navigates by scent.) Whichever side has the greater incentive, 
    that's the direction in which the slug turns.
  </p>
</div> <!-- gauge-somatic-map -->


<div 
    data-cyberslug-tutorial=""
    data-mouseover-trigger="'#gauge-v-hermi, #gauge-v-flab'"
    class="tutorialoverlay"
    data-appear-after-delay="750"
    >
  <header>Learning Gauges</header>
  <div class="tutorialpage" data-tutorial-page="0">
    <p>
      The V<sub>hermi</sub> and V<sub>flab</sub> gauges measure
      a pair of internal values that represent the slug's ability 
      to learn from experience. 
      V<sub>hermi</sub> tracks a reward signal, 
      and represents a slug's eagerness to veer <em>toward</em>
      the green-cloud odor signature of 
      a defenseless, nutritious
      <span class="tutorialspan-morsel tutorialspan-hermi">
        Hermissenda</span>. 
      V<sub>flab</sub> tracks a punishment signal, 
      and represents a slug's eagerness to veer <em>away from</em> 
      the red-cloud odor signature
      a spiny, aggressive
      <span class="tutorialspan-morsel tutorialspan-flab">
        Flabellina</span>. 
    </p>
    <p>
      In general, these gauges quickly both converge to 1 &mdash;
      the slug quickly learns the obvious conclusion: that Hermi 
      scent trails are good to follow, while Flab scent trails are 
      good to steer clear of.
    </p>
    <div class="buttonrow">
      <button data-ng-click="tutorialCtrl.nextPage()">
        Next
      </button>
    </div>
  </div>
  <div class="tutorialpage" data-tutorial-page="1">
    <p>
      A noteworthy temporary exception to this rule happens when
      a very hungry slug, out of desperation, tracks a red scent trail...
      and eats not a Flab but its Batesian mimic, a 
      <span class="tutorialspan-morsel tutorialspan-faux">
        Faux Flabellina</span>. 
    </p>
    <p>
      The Faux smells just like a Flab, but it lacks the Flab's 
      defensive spines. The Cyberslug expects to pay the price of 
      a certain punishment when it bites into the source of a "red"
      odor signature, but instead it receives nothing but pure 
      wholesome nutrition.
    </p>
    <p>
      This causes the Cyberslug to reduce its avoidance response from 
      the Flabellina (V<sub>flab</sub>), sometimes by dramatic margins. 
      If it happens multiple times, the Cyberslug may lose its fear 
      of Flabellina altogether.
    </p>
    <div class="buttonrow">
      <button data-ng-click="tutorialCtrl.nextPage()">
        Next
      </button>
    </div>
  </div>
  <div class="tutorialpage" data-tutorial-page="2">
    <p>
      From an ecological standpoint, this illustrates the tenuous balance
      that Batesian mimics must maintain with the creatures they're mimicking.
      The Faux is a weak, helpless thing whose sole protection is that 
      predators recognize that it "smells like"
      something else that's dangerous. If the Faux were to get too numerous, 
      then its predators would correctly "unlearn" the association between its odor 
      and danger. This, in turn, would not only be bad for the Faux, but for 
      the Flabellina as well. 
    </p>
    <p>
      After all, Batesian mimicry can be seen as a form 
      of parasitism; the Faux gains an "unfair" advantage over the Flabellina 
      by warding off predators with the Flabellina's scent but without paying 
      the metabolic cost of having to grow toxic spines. And, like most parasitic 
      relationships, it's harmful to the "host" &mdash; after all, if predators
      like <em>Pleurobranchaea</em> learn not to fear the Flabellina's scent
      because of the preponderance of Faux,
      then that not only undermines the whole point of Faux's mimicry, but it 
      also doesn't bode well for the Flabellina.
    </p>
    <div class="buttonrow">
      <button data-ng-click="tutorialCtrl.nextPage()">
        Next
      </button>
    </div>
  </div>
  <div class="tutorialpage" data-tutorial-page="3">
    <p>
      This effect is worth seeing for yourself. Go up to the row of dials 
      marked "Hermi/Flab/Faux", and adjust the populations of the various prey 
      species. Then reset the simulation by hitting "Stop" and then "Play". Watch the 
      "Eaten" counters down at the bottom. Notice how, when Faux
      are rare, the slug will prefer to eat Hermis, even if they're much less 
      common than anything else. But if the population of Faux is high, then 
      notice how V<sub>flab</sub> never gets particularly high, 
      and the prowling Cyberslug 
      devours Hermi, Flab, and Faux alike.
    </p>
    <div class="buttonrow">
      <button data-ng-click="tutorialCtrl.dismiss()">
        OK
      </button>
    </div>
  </div>
</div> <!-- gauge-somatic-map -->





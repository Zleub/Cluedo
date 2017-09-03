# Cluedo

[![Build Status](https://travis-ci.org/Zleub/Cluedo.svg?branch=master)](https://travis-ci.org/Zleub/Cluedo)

[MicroTalespin](http://lispm.de/source/misc/micro-talespin.lisp)

Inside Computer Understanding: Five Programs Plus Miniatures
	   -> [chap9 TaleSpin](https://classes.soe.ucsc.edu/cmps148/Winter10/readings/MeehanTaleSpin.pdf)

[Schank/Ableson](http://www.jimdavies.org/summaries/schank1977-2.html)

- [ClueGen](http://www.aaai.org/ocs/index.php/AIIDE/AIIDE16/paper/download/14070/13618)
- [MBTI](https://www.16personalities.com/personality-types)


- [Polymer](https://www.polymer-project.org)
- [TreeJS](http://threejs.org)
- [GraphQL](http://graphql.org)

### Todo - Micro-Talespin

- [X] Initial database.  It can be extended before running a story.
- [X] Initial database can be loaded from a file.

- [ ] `assert-fact` is one of the central control functions.  It starts with one fact, infers the consequences, infers the consequences of the consequences, etc.  Besides the simple result put in *conseqs* (e.g., ptrans changes locs), new states may lead to response actions (put in *actions*) or new plans (put in *plans*).  The plans are done after all the consequences are inferred.

- [ ] `demons` Stored under each character is a list of "demons."  A demon is a CD pattern plus an action.  Whenever the character learns something this list is checked to see if there is a response to make. Demons are set up by things like the mbuild in a bargain-plan.

- [ ] `goal-eval` executes each plan until one works and the goal can be removed, or until none do and the character fails to get the goal.  If the goal is already true (and the actor knows that), then return success immediately.  If the actor already has the goal, then he's in a loop and has failed.  Otherwise, set up the goal and go.
  - [ ] `run-plans`
  - [ ] `gen-plans` replicates the same plan with different objects

- [ ] Two S-goals
  - [ ] `thirst` To satisfy thirst, go to some water and drink it.
  - [ ] `hunger` To satisfy hunger, get some food and eat it.

- [ ] Three D-goals
  - [ ] `dcont` To get an object: if you know someone has it, persuade them to give it to you; otherwise try to find out where the object is, go there and take it.
  - [ ] `dknow` To find out something: find a friend to tell you
  - [ ] `dprox` To move an object (including yourself) to where some other person or object is: get the first object (if not yourself), then find out where the second object is and go there with the first object.  If this doesn't work, try persuading the object to go there itself.

- [ ] Subgoals and plans
  - [ ] `ask-plan` The success of asking something depends upon whether the other person is honest and likes you.
  - [ ] `bargain-plan` The success of bargaining with someone by giving them food depends on whether the other person is honest, you don't already have the goal of getting the food you're going to bargain with, and you can get the food to the other person.
  - [ ] `threat-plan` The success of threatening depends upon whether you dominate the other person.
  - [ ] `persuade` You can persuade someone to do something by either asking them, giving them food or threatening them.
  - [ ] `tell` To tell someone something, go there and say it.

- [ ] Consequences
  - [ ] `atrans` Consequences of an atrans: everyone in the area notices it and the resulting change of possesion, the object changes locations, and the from filler knows he no longer has it.
  - [ ] `grasp` Consequences of a grasp: everyone knows that the actor either has or (in the case of a tf (transition final or the end of an action) of the grasp)  doesn't have the object
  - [ ] `ingest` Consequences of an ingest: everyone knows that the actor is no longer hungry or thirsty.
  - [ ] `loc` Consequences of a loc change: everyone knows it.
  - [ ] `mbuild` Consequences of an mbuild: if the object is a causal then a demon is set up for the actor that will be triggered by the antecedent.
  - [ ] `mloc` Consequences of an mloc change: check the demons to see if the learned fact affects the learner.  Also check the reaction list for general responses to learning such facts.
  - [ ] `mtrans` Consequences of an mtrans: if there is a ques in the CD mtransed, and if it is a causal, then it is a bargaining promise; otherwise, it is a request (assuming the actors in the sub-CD are in the right places).  If there is no ques in the CD mtransed, then the hearer knows about the mtrans, and if he believes the speaker, then he believes what the speaker believes.
  - [ ] `promise` Consequences of y asking x to promise to do xdo if y does ydo: If x deceives y, then after ydo, x will call y stupid, but says that he will do xdo in return for ydo; else if x likes y, then x will do xdo after ydo and says so. Otherwise x says no.
  - [ ] `request` Consequences of x asking y to do z: If y doesn't like x or dominates x, then y will say no; otherwise y will do z.
  - [ ] `plan` Consequences of a plan: If the actor of the plan act is the actor of the object of the plan, then add the object to the list of actions.
  - [ ] `propel` Consequences of a propel: the object struck dies
  - [ ] `ptrans` Consequences of a ptrans: location change, for both actor and object.

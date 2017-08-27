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

- [ ] Initial database.  It can be extended before running a story.
- [ ] Initial database can be loaded from a file.


- [ ] `ask-plan` The success of asking something depends upon whether the other person is honest and likes you.
- [ ] `bargain-plan` The success of bargaining with someone by giving them food depends on whether the other person is honest, you don't already have the goal of getting the food you're going to bargain with, and you can get the food to the other person.
- [ ] `threat-plan` The success of threatening depends upon whether you dominate the other person.
- [ ] `goal-eval` executes each plan until one works and the goal can be removed, or until none do and the character fails to get the goal.  If the goal is already true (and the actor knows that), then return success immediately.  If the actor already has the goal, then he's in a loop and has failed.  Otherwise, set up the goal and go.
  - [ ] `run-plans`
  - [ ] `gen-plans` replicates the same plan with different objects

- [ ] Two S-goals
  - [ ] `thirst` To satisfy thirst, go to some water and drink it.
  - [ ] `hunger` To satisfy hunger, get some food and eat it.

- [ ] Three D-goals
  - [ ] `dcont` To get an object: if you know someone has it, persuade them to give it to you; otherwise try to find out where the object is, go there and take it.

---
up:
  - "[[Software Engineering]]"
related: 
modified: 2024-05-19
tags:
  - publish
---

Separation of concerns is a general saying in software development that each individual "piece" should only focus on its role (a.k.a. concern) within the [[Systems ♻️]]

It is roughly along the lines of "Write programs that do one thing and do it well" in [Unix philosophy](https://en.wikipedia.org/wiki/Unix_philosophy)

It is a trait also in a modern workforce in Economy, see [[notes/Currency is a generic medium of exchange that enables separation of concern|Currency is a generic medium of exchange that enables separation of concern]]

## Software

In code modules separation of concerns means loose [[Cohesion and Coupling#Coupling|coupling]] and high cohesion (i.e. business logic for the data it processes)

In micro services pattern, it's the similar idea, mainly to speed up stuff like deployment and divide up the SDE labors
- The line of separation is usually a place of contention though. We somehow keep moving back between monolith and microservice - [[Monolith vs Microservices]] - [Ref](https://nordicapis.com/back-to-the-monolith-why-did-amazon-dump-microservices/)


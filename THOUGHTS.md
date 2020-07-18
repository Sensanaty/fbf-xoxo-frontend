# Thoughts on the Project

There's a summary [here](#summary), or if link doesn't work, at the bottom of the page.

I came into the project having never seen a single line of Ember code before, and I was genuinely surprised by how difficult this actually was to pickup initially, especially in comparison to React and **especially** Vue. Those two frameworks are incredibly simple and straight forward, you just kind of plug in components where you need them, pass data where data needs to go, and you're more or less done and have a built app. Ember's a lot more particular about how it likes things laid out, and it was tricky at first for me to get used to it, both because I didn't know the language I was supposed to be using with Ember, but also because it hit this weird sweet spot of being sort of similar to Rails which really messed me up a bit, especially when I started trying to wrap my head around controllers and routes.

It's very obvious that Ember is an incredibly deep and powerful framework that scales amazingly well, especially compared to something like React or Vue that tends to get extremely messy and a bit of a pain if it ever grows in size, so it's pretty understandable that it has the infamously steep learning curve that it has.

## Struggles

A big struggle for me was actually just finding up-to-date information online. React, Vue and Rails all have extremely active communities on StackOverflow and various IRC, Discord and Slack channels, so even though they all move at a rapid pace with their updates, information online quickly gets caught up with whatever the latest version of those frameworks is. Ember was a bit of a struggle in that regard.

There were a *lot* of moments where I'd try to find some solution for some Ember-specific things, and the only things I could find anywhere online was very outdated articles or code snippets. Ember recently released Octane which from my understanding slimmed down the framework a lot, which means a lot of the old APIs and methods & the general way of doing things before Octane was completely revamped, which was a huge problem because I could never be sure that anything I looked at online would be relevant or reliable for the Ember 3.19 that this project utilizes.

One thing I have to say though is that the official Ember docs are *amazing*. There's this really good [tutorial](https://guides.emberjs.com/release/tutorial/part-1/) in the official docs (that's a bit hidden away at first) that gets you to setup a basic Ember app, and they take you through the whole process from scratch, including things like external API calls and using Ember Data etc. The first day, I was extremely lost with what I was supposed to be doing, since the Ember Getting Started guide is pretty unhelpful, especially in comparison to the 2 part tutorial.

One huge area I found myself struggling with was code organization. Since I wasn't sure what I could actually get away with in Ember, I sort of ended up sticking everything in more or less the same place. For example, the entirety of the game logic lives in the Glimmer Componenent under `app/components/board-tile.js`. Normally I'd split this into a few different files and helper functions to keep the component much skinnier, but I just wasn't sure how Ember would react to that kind of thing and felt like the safest option was to just make a big fat component that handled all the game logic in one place, including things like victory overlays and similar things. I tried to organize it as much as I could with detailed comments, but it's a bit of a mess even then. Definitely a lot of room for improvement there.

One other thing I had a small problem with was the `{{handlebar}}` syntax. I'm very used to `jsx` and `erb` formats where you can include complex logic on the spot which just isn't possible with `hsb` markup. To have any kind of non-trivial logic in the markup, you need to either specify a controller/`@glimmer` component which I'm just not used to having to do. It's also a bit harder to read, at least in the IDE I'm using (WebStorm) because there's no syntax highlighting like there is in `jsx` or `erb`.

There's a lot of magic happening behind Ember, in a very similar vein to Rails. It's pretty slow and difficult to pick up since there's a lot of background knowledge and experience you need to start making anything with it, but I can see myself becoming very productive with it once I gain a bit more of that knowledge.

## Non-Struggles

All that being said, I really liked Ember. It's definitely difficult at first, but it does some really cool and interesting things that I'm excited to learn to put to use better.

### Ember Data

I *really* enjoyed working with Ember Data, especially after struggling with Redux and Vuex in some personal projects of mine recently. It's very well thought-out and just makes a perfect amount of sense. I really like how the Ember router actually interacts with the rest of the app, it sort of blew my mind when I saw the docs and had to send it to a few friends of mine that have also never seen any Ember.

 It took some time to get used to the Ember router as it plays such a dramatically different role there than in a Rails app, but once it clicked I **really** liked the possibilities. Having the app intelligently make API requests behind the scenes with literally a single line of code, and having that response data available globally in the app through the store felt literally magical. I genuinely chuckled when I looked at some Redux boilerplate that was over 20 or 30 LOC to get a *single* item in the store, not to mention the code gymnastics you have to perform to actually do anything with the store once it's there.
 
### Components

I generally am not a huge fan of frontend stacks in general, I find them to be a bit of a chore to work with, but I do like React, Vue and now Ember a lot because of components. They make the apps I build feel a bit more exciting to mess around with, and there's a weird feeling of joy from passing down props to components and seeing it show up on the screen. And as an extra plus for Ember, the way data is handled and passed down - especially with Ember Data - is a lot better than both in React and Vue. It was always very obvious where data was coming from and where it was going, which can be hard to keep track of in React and Vue apps.
 
## What Took the Most Time & Tech Details

Initially, I kind of wasted the first two days because of the way I approached Ember originally. I was going into it as if it were React or Vue, which caused a lot of (unnecessary...) headaches, and when I wasn't trying to make a React app in Vue, I was trying to create Rails. I kept trying to do things in, with hindsight, obviously wrong ways which just made it so I was completely stuck on how to proceed. After a few dozen coffees at 3am the 2nd night however, things started to slowly make sense in my head and I made a lot more progress from then on.

The game logic itself, once I got my bearings, wasn't really too bad to figure out. I've never made something like Tic-Tac-Toe before, so it was definitely a very fun experience for me! At first I wasn't sure how to handle the logic for checking the game, but thinking about it, Tic-Tac-Toe is such a simple game with only 8 possible victory states that you could just compare the current state of the game to the possible combinations of wins, which is the route I decided to go with. A very clean-looking one-liner is all it took!

The local scoreboard is maintained using localStorage. One small problem is that localStorage can only hold strings, but this is pretty trivial to deal with if you're aware of it.

The Rails portion is a simple API with a single `/scores` endpoint. New scores are POSTed in after every round, and if the username already exists in the database, a `first_or_create` rails method gets called that will PATCH the relevant username's score, and if it doesn't it'll just create the new entry with whatever the score is.

As of the time of writing this (the evening before the deadline), I haven't gotten the chance at implementing the multiplayer portion. I've never used ActionCable or done anything with WebSockets before, so I'm pretty disappointed because I don't think I'll have the time to actually start working on the multiplayer functionality, especially with how messy the frontend is in the first place. As far as I know, ActionCable has really terrible documentation too, which doesn't help. I'll definitely give it a go in my own free time though! It seems like a very fun project to try and do.

## Summary

All in all, I had a really excellent time doing this challenge, and I'd like to thank Feedback Fruit for the chance and excuse to play around with some Ember! I feel like I learned a huge amount doing this, plus now I have an excuse to make more things in Ember.

The app is most definitely not perfect. There's a *lot* of things that I could have done better and just in general there's a lot of room for improvement. If I were to take another shot at a different app, I think things would go a lot smoother and would just in general be organized a lot better. As it is, my code's kind of a mess and in heavy need of restructuring and refactoring, but all things considered I'm quite happy with how it turned out in the end! 

Ember itself is *very* fun, once I got the hang of things. Ember Data is genuinely fun to work with, and I really like the way Ember handles things like data manipulation. With more projects and practice, I could definitely see Ember becoming a top pick for me close to Rails, especially since they share so many similarities.

Wow, that was a long read! Sorry about that.
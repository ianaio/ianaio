---
sidebar_position: 3
---

# Create a Blog Post

IanaIo creates a **page for each blog post**, but also a **blog index page**, a **tag system**, an **RSS** feed...

## Create your first Post

Create a file at `blog/2021-02-28-greetings.md`:

```md title="blog/2021-02-28-greetings.md"
---
slug: greetings
title: Greetings!
authors:
  - name: Jarek Cichon
    title: Co-creator of IanaIo 1
    url: https://github.com/cichy
    image_url: https://github.com/cichy.png
  - name: Sébastien Martin
    title: IanaIo maintainer
    url: https://sebastienmartin.com
    image_url: https://github.com/smartin.png
tags: [greetings]
---

Congratulations, you have made your first post!

Feel free to play around and edit this post as much you like.
```

A new blog post is now available at [http://localhost:3000/blog/greetings](http://localhost:3000/blog/greetings).

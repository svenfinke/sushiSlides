# SushiSlides
## Lightweight Slides with HTML + CSS + JS

I was frustrated with tools like reveal because these introduced a level of abstraction that you had to get a hold on. I wanted to have something that is as close as possible to default HTML + CSS and where JS would do as little as possible.

This is what I created. All the slides are visible from the get-go and could be traversed by simply scrolling along. Using arrow keys or clicking will get you to the next slide. By simply scrolling down with JS.

There is just one addition: data attributes can be used to trigger handlers when a slides gets into view (not by scrolling with the mousewheel). Right now there is only one handler: "hideFooter".

The layout of the slides is realized with css-grid. This way you can include new layouts if necessary and you can get pretty creative with organizing content.

# TODO

- turn data attributes into dynamic toggles that can be added as some kind of plugin that is toggled when the slide is being shown.
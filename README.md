# GalleryTask
A simple javascript gallery tool.

## Design Decisions
I made a list of requirements that I wanted out of the gallery in addition to the ones stipulated in the task:
* Items in the gallery should animate their movement in and out of view from left to right.
* The gallery could be placed in any size container and function properly (ie. nothing breaking the layout).
* You should be able to place any kind of content/element - <img>, <svg>, <iframe>, <video>, etc - and the slider should still function properly.
* It should only display one item at a time.
* Swiping should work on both mobile and desktop devices.
* The aesthetic should be simple and modern.

---

## Development decisions
I wanted to make something in plain JavaScript with no dependencies with a focus on using the latest ES6 syntax. To that end, I knew using the new Class syntax would be useful for the gallery. I also thought methods for going forward, backward, and going to a specific item in the gallery would be a good starting point for functionality. Finally, I needed some way to handle the swiping, whether that be a separate class or something attached to the existing Gallery class.

Further development requirements:
* Use semantic HTML with the bare minimum amount of elements required.
* Keep accessibility in mind - nothing is hidden from DOM and everything is traverse-able and action-able with a keyboard.
* Use `transform` and `translate` for CSS transitions, as opposed to `position` properties like `left`, `right`, `top`, or `bottom`. Transform has significantly better performance when animating.
* CSS should follow the [RSCSS guidelines](https://github.com/rstacruz/rscss).

---

## Future Improvement
One avenue of improvement I explored was having the gallery accept a settings object for use in the constructor. This is a common design pattern in JavaScript plugins that I think would provide a lot of flexibility.

The gestures could use a lot of improvement in how they feel, as my implementation is pretty rough. Checking for vertical movement and a distance or time threshold would be a good place to start.

Further improvements I made a note of while working:
* Optionally load the JSON file either via a file loader or external HTTP request and build the gallery elements using `document.createElement()` from the object.
* Pagination should be built in javascript and rendered using same method described above based on the amount of slides.
* Add SCSS support.
* Convert into a React or Vue component.
* I don't like how the gallery must shift the slides by 1 to work properly when initializing. I would probably refactor this code so this is unnecessary.

---

## Other Notes
* I included an example JSON file that could be used to create the gallery elements.
* The most difficult part was the gestures. In a real-world scenario, I would have likely used a library for the swiping gestures.
* Technically, the gallery supports an infinite amount of slides. There's probably a great deal of room for performance increases, mostly around rendering.
* I tested in Chrome, Firefox, and Safari, as well as the mobile emulation in the Chrome dev tools. I don't have access to a Windows machine at the moment, but I would test in IE and evergreen browsers there as well.

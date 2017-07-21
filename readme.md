# Fourier and Laplace transform properties table

**[See the table][demo-v1]**.

The idea is to group related properties and place them horizontally as well as vertically,
unlike a [typical table](https://en.wikipedia.org/wiki/Discrete-time_Fourier_transform#Properties) where all of the properties are listed one below another.
Another idea is to treat domains equally.
If there's a certain property like differentiation for time domain, attempt is made to provide similar property for frequency domain.

The notation mostly matches these books:

1. Alan V. Oppenheim, Alan S. Willsky with S. Hamid Nawab. *Signals and Systems (2nd Edition)*
2. Alan V. Oppenheim, Ronald W. Schafer with John R. Buck. *Discrete-Time Signal Processing (2nd Edition)*
3. Robert Sedgewick, Philippe Flajolet. *An Introduction to the Analysis of Algorithms (2nd Edition)*

## Reuse

The table is implemented as a jQuery plugin and requires [MathJax](https://www.mathjax.org/) and [jQuery](https://jquery.com/) libraries.

Currently there's no releases. Latest builds are available here:

* [css](https://antonkhorev.github.io/signals-transforms/lib/signals-transforms-table.css) ([optional source map](https://antonkhorev.github.io/signals-transforms/lib/signals-transforms-table.css.map))
* [javascript](https://antonkhorev.github.io/signals-transforms/lib/signals-transforms-table.js) ([optional source map](https://antonkhorev.github.io/signals-transforms/lib/signals-transforms-table.js.map))

See the html source of [the demo][demo-v1] for an usage example.
Some customization of the notation and selected transforms is possible although api may change, see the html source of [*function templates* demo][demo-templates].

[demo-v1]:https://antonkhorev.github.io/signals-transforms/v1/
[demo-templates]:https://antonkhorev.github.io/signals-transforms/templates/

## Additional references

1. Mrinal Mandal, Amir Asif. *Continuous and Discrete Time Signals and Systems*
2. Alexander D. Poularikas. *Transforms and Applications Primer for Engineers with Examples and MATLAB®*
3. *Fundamentals of Circuits and Filters* edited by Wai-Kai Chen
4. B. P. Lathi. *Signal Processing and Linear Systems*
5. [Transfer Functions and the Laplace Transform](https://www.edx.org/course/transfer-functions-laplace-transform-mitx-18-03lx) MOOC on edX

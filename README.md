# WIP - not stable package


# html-to-bem package
An Atom.io editor plugin package


## Roadmap
- Split code editor view and generate new block css file
- Settings: LESS & SASS FOrmat
- Settings: Insert below or new file option
- **DONE** |  Add notifications for better UX.

##Installation
Download package and install


## How to use

Select some Html BEM component from your file. For example:

``` html
<section class="hello hello--world">
  <h1 class="hello__heading">Hello World</h1>
  <p class="hello__paragraph">
    Hey <a class="hello__link" href="#">kids</a>.
  </p>
  <a class="hello__link hello__link--cta" href="#">Call to action</a>
</section>
```

And then type

``` yaml
html-to-bem:run
```

command and your BEM CSS stylesheets will be saved into your clipboard. You can paste them into new css file.

``` css

.hello {

}

.hello--world {

}

.hello__heading {

}

.hello__paragraph {

}

.hello__link {

}

.hello__link--cta {

}

```

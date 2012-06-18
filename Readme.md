PyCon India 2012 website
========================

The is a single page applcaition built using [HasGeek][]'s [baseframe][].

[HasGeek]: http://hasgeek.com/
[baseframe]: https://github.com/hasgeek/baseframe/

How to run
----------

Setup virtualenv.

    $ make venv

Get git-submodules.

    $ git submodule init
    $ git submodule update

Setup test database.

    $ make bootstrap

Install custom template and css modifications to funnel.

    $ make copy

And run the app.

    $ make run



# project-iss-lite 

# Starting off...
How to use: open [Home](./src/index.html)

# Directory Structre:
- ``src``: Contains all source files
  - ``src/media``: Contains all image files
	- ``src/media/artists``: Contains pictures of all artists
	- ``src/media/albums``: Contains all album covers
    - ``src/media/background``: Contains the background image
    - ``src/media/logos``: Contains various social media logos
    - ``src/media/songs``: Contains album arts of orphaned songs
  - ``src/artists``: Contains the HTML pages for artists
  - ``src/albums``: Contains the HTML pages for albums
  - ``src/templates``: Contains the templates used to populate the albums and artists pages
- ``spotify_to_html.py``: Used to scrape songs off Spotify and populate HTML pages

# Requirements for phase 1:
- [x] Choose a name 
- [x] Artists Page:
    - [x] Data contained:
        - [x] Name
        - [x] Image
    - [x] Each item should be clickable, and clicking on an artist should redirect to page containing albums
- [x] Albums page:
    - [x] Data contained:
        - [x] Name
        - [x] Image
        - [x] Year of Release
        - [x] Number of Songs
    - [x] Each item should be clickable and clicking on an album should redirect to page containing songs inside album
- [x] Songs page:
    - [x] Data contained:
        - [x] Name
        - [x] Duration
- [x] Home page
    - [x] Top Artists
        - [x] Upon clicking, should open artist page
    - [x] Top Albums
    	- [x] Upon clicking, should open album page
    - [x] Top songs
- [x] About page
    - [x] About creators
        - [x] Name
        - [x] Email
    - [x] Purpose
    - [x] Usage
- [x] Navigation Bar
    - [x] Always visible regardless of scroll position
    - [x] Should contain links to atleast:
        - [x] Home page
        - [x] Artists page
        - [x] Songs page
    - [x] Display visual indicators as to which page is the user on
- [x] Footer
    - [x] Should be consistent
    - [x] Should have link to about page
- [ ] Readme
    - [ ] project directory structure
    - [ ] how to open website for evals

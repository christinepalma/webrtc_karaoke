#WEBRTC VIDEO KARAOKE

##Summary

###VIDEO KARAOKE APP FOR TWO TO EIGHT PEOPLE

* WebRTC Video Karaoke will piggyback on webRTC and web sockets technology. It will use the Appear.in API to create a video chatroom for up to 8 people and the YouTube API to pull up videos of karaoke songs.

* To start a new shared video session, the initial user creates an account and logs in. They are given a link which they can share. "Guests" they share the link with will be able to join the video chat room hosted on a simple web page without having to install any plugins. What is unique about this, is that all of the video connections will be peer-to-peer without a server (after the initial signaling is done through web sockets). There will be full-duplex audio.

* Once inside the main dashboard, the video tiles of initial user/account holder and their guests auto populate as people access the web page.

* There is a section of the page where users can chat with each other through text.

* On one side of the screen is a tile which when clicked on gives the option for a YouTube search of karaoke songs. The YouTube video loads in the tile and plays.

* There may or may not be an option to mute the audio input for all the participants except the one whose turn it is to sing.

##Functional Requirements / Technologies

* Mongo 
* Express
* Angular
* Node.js
* Bootstrap (maybe)
* Socket.io (maybe)
* WebRTC via Appear.in API

##Schema
* User model
 
##Use Cases

* User visits site and is able to create an account.
* User can login if they have already created an account.
* User can create a link where video karaoke will take place and they can invite others to visit that link to join in karaoke.
* Users can engage in group chat from a text chat window.
* Users can search for a song from YouTube to sing along with.
* Users can sing solo or duets or as a group.


##User Stories

* When I visit the site, I want to be able to 	


##APIs

* Appear.in
* YouTube

##Design Requirements

* A clean contemporary design with tasteful fonts and graphics and colors.

* This will be a Single Page App with dynamically loading content. Everything will be displayed above the fold or within the browser window without scrolling. The design will be responsive. 

* There will be an account creation and a login section. This will have authentication. 

* There will be section for a text chat window.

* The main section will display dynamically loading tiles of the participants' video feeds.

* To the left or perhaps above the main section will be one tile for the YouTube search bar and video.

##WIREFRAMES

* Homepage:

![Alt text](http://www.christinepalma.com/images/video_karaoke_app/homepage.png)

##Look & Feel / A Few Design Ideas

![Alt text](http://www.christinepalma.com/images/video_karaoke_app/dashboard_01.png)


![Alt text](http://www.christinepalma.com/images/video_karaoke_app/dashboard_02.png)


![Alt text](http://www.christinepalma.com/images/video_karaoke_app/dashboard_03.png)


![Alt text](http://www.christinepalma.com/images/video_karaoke_app/dashboard_04.png)


![Alt text](http://www.christinepalma.com/images/video_karaoke_app/dashboard_05.png)


![Alt text](http://www.christinepalma.com/images/video_karaoke_app/dashboard_06.png)



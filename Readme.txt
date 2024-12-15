img-simulation
HTML, CSS, Vanilla JS 

About:

I decided I wanted to make a simulated tower PC from the 90s, complete with all the sounds and flashing lights you'd get from the early days of dial-up and broadband-capable PCs. This was my first hackathon submission, and it felt like an excellent opportunity to experiment and make something different from a traditional website.

Interaction:

The user can click the power, reset, and turbo buttons. The interface's state changes based on these interactions. Long-press the power button or refresh the page to ☠︎︎ kill ☠︎︎ the system! 

Project: 

The entire project revolved around a single screenshot of an old Micro-Tech computer viewed straight-on. I animated and redrew all the depressed buttons, flashing lights, and 'status' by editing the original photo and adding audio ripped from YouTube videos.  

The interface started as a feature of a larger project. As a new JS coder, coordinating the statuses and layers' behavior was challenging. I wanted the entire interface to look like a flat image and then become animated as the user interacted, primarily using their (modern) understanding of UI.  

I tried to make the features I implemented faithful to old tower PCs as best as I could remember. For instance, to turn the system off, the user must long-press the power button. The user can also press the 'reset' and 'turbo' buttons when the power is off, which will animate the depressions, but the reset will only flash the 'green' state for a second as the system is not receiving power. I also looped the audio once the system was initiated to simulate a constantly running fan, and the 'turbo' button increased the playback rate on the audio files. 

Lastly, there were a couple of features I wish I'd been able to implement. I wanted to animate the LED screen to have a clock cycle that simulated an old CPU or internal temperature reading determined by the user's mouse's x and y location or based on a small speed-test packet sent to the user and then simplified into a 2-digit number. I also wanted to animate the key but didn't arrive at an idea that felt like it fit the project for the function of a key. I also wanted the system to eventually play a video or take the user somewhere else and then play something.  

I'll keep working on it and finish it over the holidays. Enjoy! 
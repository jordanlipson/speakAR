# SpeakAR

## INSPIRATION
Language learning is a difficult, time-consuming, and sometimes costly process. And while mobile apps have made language learning more accessible, they often fall short in providing learners with the ability to communicate meaningfully. This is because language learning apps often lack the one feature that is essential for language learning: conversation.

Research has shown that conversation is critical to developing proficiency and communicative competence in a language. For many learners, the ideal solution would be to converse with a language teacher who speaks the language fluently and can tailor conversations to the appropriate level. However, financial and geographical situations can act as barriers that prevent equitable access to such education. So, our team wanted to figure out how we could bring a conversational language learning experience to the digital world.

## WHAT IT DOES
speakAR leverages powerful technologies like augmented reality and NLPs to simulate human conversations and enhance the language learning experience.

If the user makes a linguistic error (ex. grammatical, vocabulary) during the conversation, speakAR makes a note of this and provides suggestions for improvement.

speakAR implements an adaptive learning model to discuss contextually relevant topics that are uniquely personalized to users. The model helps users progressively improve their skill by introducing new vocabulary at periodic intervals based on the individual chosen proficiency level.

Our personalized approach and engaging mode of teaching keeps the user motivated leading to effective learning outcomes.

## HOW WE BUILT IT
The front end of the application was built using ReactJS. For the backend, we opted for Flask, a lightweight and flexible Python web framework. To enable dynamic and contextually relevant conversations, we leveraged the power of the Cohere API. We also used echo3D to implement the AR view.

## CHALLENGES WE FACED
One of the biggest challenges we faced while creating this project was prompt engineering for the Cohere API. It took a lot of trial and error to figure out how to structure prompts in a way that would generate natural and effective conversations for language learning. However, with persistence and collaboration, we were able to overcome this obstacle and create a product that we are proud of.

As well, attempting to deploy the Flask server on python everywhere presented a great challenge. Due to the unavailability of the required port, we were unable to deploy the backed to the cloud that prevented us from viewing the application on the mobile phone as we had originally planned to do.

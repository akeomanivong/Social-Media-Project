# Social Media Project
#### CSCI 4800 E01 Web Application Development
#### By Matthew Nguyen and Asia Keomanivong

## Note for Grader

Matthew and I (Asia) have both worked equally upon the project. The reason only Asia has committed is because we both worked on the same computer at the same time. Any contributions Matthew made was done through Asia's computer and thus all changes as a whole were committed on the same system.

## Overview
This is our social media project for CSCI 4800 E01: Web Application Development. The goal of this project is to create a social media page that implements the concepts we have learned in class.

## Implementation
This project is developed using HTML and Javascript. For CSS, we are using Bootstrap. It is edited through JetBrains Webstorm. For viewing, the user simply needs to click on the desired HTML file above. To view the raw code, the user may either view it through their browser settings or open the HTML files in their preferred IDE or text editor. No external applications or plug-ins need to be installed. The web application is deployed through Heroku. The link is above.

## Current Status
We currently have a [sign-in page](signin.html), [sign-up page](signup.html), and [homepage](homepage.html). Each has a basic layout in place to fulfill their respective purposes.

The sign-in page allows the user to input their credentials to gain access to their account on our social media page. It has a link that brings the user to the sign up page if they do not have an account.

The sign up page asks the user for their user information in order for them to create an account. It also contains a link for the user to return to the sign-in page.

The homepage contains a sidebar with several links the user may find useful. At the moment, it has no content. <br/>

__3/17/2021:__ Implemented form validation functions. This includes checking that "password" and "confirm password" match, no special characters (<, >, #, -, {, }, (), ', ", \`) are in any input fields, and the password contains a small letter, a capital letter, and a number. Any errors will prevent the form from submitting and the respective form boxes will be highlighted. An alert will show for invalid characters, while the password boxes will have an error message shown below them. In addition, the security question answer box will not appear until the user selects a question.

__5/13/2021 FINAL EDIT:__ We understand that the web application is not deployed properly and crashes upon clicking the link. The build succeeds but other errors result in the web application not deploying properly. The web app is connected to a MongoDB Cloud server. All code can be found in the repository. We both understand and acknowledge that we should have utilized office hours and the TA more than we have in order to make sure we submit a decent final project.



## Next Steps

This project is far from complete. The process of creating this project has been a learning experience for us both and there is much that can be done better. In addition to the future assigned tasks, there are things we plan on improving upon to the best of our abilities.

Learning can be a messy process and our code reflects that in some areas. As we progress, we will constantly be refactoring our code to make it more overall robust and readable and to ensure it follows standard coding practices.

This isn't the prettiest looking application right now. We will update the aesthetic as we obtain a better idea of the overall direction and feel of the page. Basic functionality is the main focus as we want the page to work before anything else. However, beautification is still a high priority, as we want our users to have a pleasant experience.

__5/13/2021 FINAL EDIT:__ Moving forward, we have learned to take better steps and initiative towards completing assignments and projects. We will learn from our mistakes and ensure that we become better students and programmers as we continue with our curriculum and careers.

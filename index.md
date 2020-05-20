## Welcome to Alexa Developers Hub
This page will help you create and develop Alexa Skills and side-by-side also explain the various concepts of coding which you can apply in other development projects too.

### What should I know?
You should have a Amazon Developer account, if you don't have one [sign up](https://developer.amazon.com/) for it.  
Excited?  
Let's get started!

## Install the Alexa Skills Kit CLI (ASK CLI)

CLI stands for **Command Line Interface**, upon installation of which you can easily control your workflow using the command prompt without going to the Alexa Console.

As you must have known Alexa development can be done in both NodeJS and Python so download them to your system.  
- [NodeJS](https://nodejs.org/en/) (download the one labelled as LTS)  
- [Python](https://www.python.org/downloads/release/python-360/) (This link opens Python 3.6, the most stable and compatible version)  

Once done, you can now begin to install the ASK CLI, open the Command Prompt (Windows) or Termial (Linux) and enter the following commands, also note, if any of the commands dosen't run, then open the terminal / CMD as an administrator on Windows or type sudo before your commands in Linux.

```npm install -g --production windows-build-tools@4.0.0```  
   The above step is required only for windows  
```npm install -g ask-cli```  
```ask configure```  
After the above steps you'll be prompted to enter your credentials in your browser, enter them and you've succesfully completed the installation process!

Congrats!  
*Let's create a new Skill using the CLI.*  

## Creating a new Skill using ASK CLI

To create new skill type tho following command in the CMD/Terminal:  
```ask new```

This then prompts for the programming language of your choice:
- NodeJS
- Python
- Java

Select any one of your choice, here I'll explain both NodeJs and Python.  

Next, choose the hosting provider for the backend code for your skill.
- Alexa Hosted (Go for this)
- AWS with CloudFormation	
- AWS Lambda	

Next choose a starter template for you skill.  
- Hello world (Alexa's hello world skill to send the greetings to the world!)
- Fact skill (Quick sample skill to manage a collection of voice data)
- High low game (Guess a number high or low using persistent attributes)

Finally, provide a name for your Alexa Skill (you can change this later from Alexa console) and a **folder_name** that will be created on your local system.

Now you will have a project directory (folder) created. Move into that folder by typing:
```cd folder_name```

Here you'll see the following files and folders:
- skill-package/ (folder)
- lambda/ (folder)
- ask-resources.json (file)

Let's nowe understand the skill folder structure.



Sources:
- [Alexa Skills Kit - Docs](https://developer.amazon.com/en-US/docs/alexa/smapi/quick-start-alexa-skills-kit-command-line-interface.html).


### Craeted by [Tarun](https://github.com/tarunnsingh).
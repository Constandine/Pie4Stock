#Read Me
=====
##How to use
1. Please open index.html to display the program.
2. THe web page will get the best effect in the 15 inch display screen.


===========
##Notice

1. This project is based on the web and please use it when you are in the Internet environment.
2. As we have load some static file in the project, the modern browser(such as safari and chrome) will stop the index.html loading local static film. If you cannot see the graph please follow the steps below to open it.
3. **The problem occurs because we want to create the tool and make it be used for others in the begining. All the project is based on the web and the website will soon be onlined and this problem will be solved.**

###Solution 1
For users in Mac or Windows with Chrome

1. For Mac OS: open chrome by type the command in the terminal:
		"open /Applications/Google\ Chrome.app/ --args --disable-web-security"
2. For Windows: Please follow: [link](http://blog.csdn.net/dandanzmc/article/details/31344267)
	
###Solution 2
For users in Mac or Windows without Chrome

1. Open the terminal or the cmd in the computer (for mac OS, Linux or windows). 
2. Cd (for Linux) or dir (for windows) to the directory where the index.html is in.
3. Run the code "python -m SimpleHTTPServer"
4. Open browser and go to [http://127.0.0.1:8000/index.html](http://127.0.0.1:8000/index.html)
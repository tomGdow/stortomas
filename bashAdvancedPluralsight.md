### Shell Scripting with Bash
#### Reindert-Jan Ekker (Pluralsight)

### A first look at shell scripts
Hello World 
Create file hw
echo Hello world
Not on path bash searhes for executables
Specify that the executable is in the current directory
    ./hw
    => permission denied
    chmod u+x hw
    ./hw
#Works!
#To revoke
chmod u-x hw

#A script is nothing more than a text-file containing code
#Usually run by interpreter
#bash interpreter here
#Reads every line in file
#Every line that contains a command is executed
#in order from top-to-bottom (well, not entirely true)

#To make a script executable for EVERYONE on the system, replace 'u' with 'a'
chmod u+x filename
chmod a+x filename		Make it executable for everyone
chmod a-x filename		Remove

#$1 variable holds first argument passed to script
$* variable holds all the arguments passed to a script

#To set path to /bin, use the following
PATH=$PATH:~/bin
#However, and inspection of .profile shows this now unnecessary
#/bin is added to path as long as /home/bin exits!

#See here for a good ref
# http://stackoverflow.com/q/11709374/499167
#Above good on need to EXPORT the PATH varialble

#eg add the folowing to  ~/.profile
PATH=$PATH:/home/me/play
export PATH
#To get to work, execute the following
 . ~/.profile

 #Tip make a folder to keep scripts
 #By convention this is /home/bin
 Start all scripts with shebang or hash-bang
 #! 
 #After these two characters, declare which interpreter should run code
 #Can also use this line to specify options with interpreter

 # Remember! Hash-bang slash-bin slash-bash 

 #Naming Scripts

 #if you give a script a name that is already taken, 
 #such as 'test' or 'if', you can only execute by
 #giving the full path. Avoid
 #To test name validity use type
 type test

 #Variables
 #Variables allow you to termporarily store data in memory
 #and then retrieve that data by name

 greeting="hello"
 echo $greeting

 ab=filname.txt
 vim $ab			a goodie
 rm $ab				removes		
 				!!Use with extreme care
 				file will also be removed

files="myfile1 myfile2"
touch $myfiles			Two commands are created

#bash does not give error if you use undefined variable
#instead it uses the empty string as value

#variable assinment must be a single word.
#soo ..
newgreeting="hello, $USER"
echo $newgreeging
#Do not put spaces around equals sign when doing assignments
#But be careful of this
dangerous="rm myfile.txt"
$dangerous			Removes the file!
echo $dangerous			Will SAFELY tell what is in there

#To get the value for a variable prefix with '$' sign
#and use 'echo' for safety reasons

#Variable names must be letters, numbers and underscores ONLY
#First character should be a letter or an underscore
#Cannot start variable name with a number
#Variable names are case-sensitive
#Use of UPPERCASE variable names is strongly discouraged
#Bash predefined variables are uppercase, and don't want to overright
#Good habit to only use lc names for variables

#Make the note-taking program interactive

#read command will take user input an put it in a variable
read hello

man builtins		#This is an extremely useful command
help			#help is a bash command
help read
-p 			Show a prompt to the user

#Good habit: surround your variables with quotes
#Use "$x" instead of $x
#Among other things, prevents surprises when data contains spaces
#Use double quotes, as this does not escape the dollar sign
#Double quotes keep special characters intact

#Another good habit
#Use braces to tell bash where a variable name ends
echo ${foo}bar		gets the name of var foo and appends string bar
			note that it is NOT {$foo}bar
eco $foobar		Gets the value of var foobar
#Good habit to use braces whereever there may be confusion

#Another very good tip
#In a script, use ${HOME} rather than ~  
#The tilde is not escaped in double-quotes

#Debugging
#The -x option
#!/bin/bash -x
#Prints out the contents of each evaluated line
#A real goodie

#But what  happens if you just want to debug a few lines
#In this case do not use -x on initial hash-bang line
#Use 
set -x 			On line above where you want debugging to start
set +x			On line below where you want debugging to end

#If Then Else
#From the command line
if mkdir a; then echo "ok"; else echo "error"; fi

#Most basic use of if statement
if testcode; then
	# Code here gets executed
	# when testcode succeeds
fi
#Most basic use of if-then-else
if testcode; then
	#code here gets executed
	#when testcode succeeds
else
	#code here is executed
	#when testcode fails
#Another example
if [[ $noteo ]]; then
	echo "Ok"
else
	echo "no note"
fi

# CAN put then on next line and leave out semi-colon
# but that is not common practice
# BUT 'else' and 'fi' are always on a new line
# because these keywords have to be the first word in command
# And also true, of course of 'if' and 'then'
# - these keywords must be the first in command

#On command line could write
# if testcode; then successcode; else failcode; fi

# In general, if, then, else and fi keywords
# need to be on a separate line
# or come after a semi-colon

#Return Codes
#When a Unix program finishes, it returns a number between 0 and 255
#called  a return code or exit status
#'0' means success
#All other values indicate an error

# Shell scripts return values with exit
exit 0 
#script will end and return success

#Good habit. Make sure your program exits with correct value
#Always call exit with a value

#if statement just looks at RETURN CODE for "testcode"

#Conditional Expressions

# A conditional expression
	# Tests on files and directories
	# Tests on string
	# Arithmetic tests

	[[ expression ]]

	#double-square-bracket
	#SPACE
	#expression
	#SPACE
	#double-square-brakcets

#Expression		True if
[[ $str ]]			str is  not empty
[[ $str = "something" ]]	str equals string "something"
				#note spaces around "equals-to"
[[ $str="something" ]]		always returns true!
[[ -e $filename ]]		file  $filename exists
[[ -d $dirname ]] 		$dirname is a directory

# Spaces around the expression are very important!
# Same for switches (-e) and equals sign

#create script ...

help test
#above pretty good on conditional expressions

#Conditional expressions
#Where does 'test' come from
#Historically, a classical command called 'test'
#Still remains for compatability
#aka as '['   (single square bracket) 
#since it is a normal shell command, it gets parsed normally
#everything you pass into it gets parsed like normal argument
#including expanding wildcards and command substitution
#hard to use, easier to make mistakes
#many pitfalls
#Advise DO NOT USE unless want to run program on non-bash shells

#[[...]] is a bash extension
#easier to use as two brackets are not actually a command
#but a special syntax
#everything that goes between the brackets gets parsed in special way
#NO QUOTES NEEDED AROUND VARIABLES
#Good habit: use [[...]] instead of [..]

#"help test" will give most important info
#"help [[" will tell you about the extension

#Arithmetic tests
#Can only compare numbers, as bash does not handle floating-points at all
#Syntax
#[[ arg1 OP arg2 ]]
#Where OP is
-eq		equal
-ne		not-equal
-lt		less-than
-gt		greater-than
others		see help

#Main Point: do not use 'normal' operators (=, <, >, etc) for numbers
#These work on STRINGS ONLY 

#Two special variables need to know about
$#		Contains the number of script arguments
$?		Exit status for the last command you ran
#In addition
#To get the length of the string in a variable, use:
${#var}
#The above is important, and a real goodie. 

# To count the number of files in directgory
ls -A1 | wc -l		# (-A is 'almost all (dot files excluded),
			# -1 is 'print one file per line")

#Can nest if statements
#But can also use elif

if [[ $count_1 -gt $count_2 ]];then
	echo "${dir1} has more files"
elif [[$count_1 -eq $count_2 ]];then
	echo "number of files is equal"
else
	echo "${dir2} has more files"
fi
# Can use Multiple elifs

if [[ $1 = "cat" ]]; then
	echo "meow"
elif [[ $1 = "dog" ]];then
	echo "wooof"
elif [[s1 = "co2 ]]; then
	echo "moo"
else
	echo "unknown animal"
fi

#each elif gets tried in turn

#And, Or, Not
#In a  conditional expression
#use ! to negate a test
[[ ! -e $file ]]
#use spaces around '!'

#Use && for "and"
[[ $# -eq && $1 = "foo" ]]
#true if exatcly one arg with the value "foo"

#Use || for "or"   (two pipe symbols)
[[ $a || $b ]]
#true if a or b contains a value (or both)

#Helpful advise from Reindert
#Don't use -a, -o for and, or
#EVEN THOUGH "helo test" says so
#
#Input and Output

#ECHO
#prints its arguments to std output, followed by newline
-n		suppresses new lin
-e		allows the use of escape sequences
		\t	tab
		\b	backspace
#These options are NOT portable to non-bash shells
#and are generally discouraged

#For more sophisticated formatting, use printf
#Printf
#uses a format string for first argument
#will not append a new line at end of output by default

printf "hello"
printf "hello\n"
#Print a variable
printf "hello %s, how are you?\n" $USER
printf "p%s\n" a e i o u
printf "%ss home is in %s" $USER $HOME
printf "|%20s | %20s | %20s |\n" $(ls)
#printf can save output to variable
printf -v greeting "Hello %s, How are you?\n" $USER
echo $greeting
#see here for more on printf
http://wiki.bash-hackers.org/commands/builtin/printf

#Remember, with printf
-v		puts output to variable

#Read Revisited
 #Read puts input into a variable
read x
 #set user input to x
 #CAN choose not to set a variable name
 #value will end up in variabl called REPLY
 #options
-n		read a specific number of characters
		where 'read' will stop when it
		encounters a new line
-N		read a specific number of characters
		and will keep reading until the
		exact number of characters is read
-s		suppress output (useful for passwords)
-r		disallows escape sequences
		RECOMMENDED to always use -r with read
		It gives the raw input
#Read can also split your input into multiple words
#and assign each to a variable
read x y 	reads first word into variabl 'x'
		everything else into y
#if, say input "1 2 3", then x =1, y = "2 3"
#use IFS - Input Field Separator - for delimiters
read; echo $REPLY
read x y
echo $x
echo $y
#BUT BETTER
read -r; echo $REPLY
#This allows backslashes to be part of input 
#where escaping is unnecessary

IFS=: read a b
1:2
echo $a
echo $b
#IFS changed just for single command

#Standard Streams
#whenever a shellscript starts, it automaticaly connects
#with three standard streams:
Standard input, standard output, standard error
#When running a script from an interactive
#command-line terminal, these streams will
#connect with the terminal
#input will be sent to std in
#output will be sent to std out
#In Unix, these three streams are identified
#either by a number (file descriptor)  or a special file

# 0: Standard Input (stdin)
/dev/stdin

# 1: Standard Output (stdout)
/dev/stdout

# 2: Standard Error (stderr)
/dev/stderr
#used for diagnostic or error messages
#Normally won't notice, but it makes it 
#possible for to treat errors differently from
#other output

#Another special file
/dev/null
#disgards all data sent to it
#handy to hide command output
#simply redirect to /dev/null
#and output disappears
#/dev/null is aka the bit-bucket

#Redirection 1

#Bash offers syntax for redirecting the streams so
#that their data flows to or from another place
#In other words, can take input from a file
#or another command and send our output to a file
#or another command 

<		input redirection
		grep milk < shoppingnotes.txt
>		output redirection
		ls > listing.txt
>>		append to end of file

#finally, pipes
ls | grep x

#Redirection 2
 N>		Redirect to a specific stream
#mostly used to redirect errors to a file
cmd 2> /dev/null 	disgards all error messages
#2 is the error stream
#so all error messages from command will be disgarded

#N defaults to 1, so do not need to specify a
#number if you are redirecting standard output

#Can also redirect a stream into another stream 
>&N	Redirect a strem to another stream
#Put an ampersand and a number after the greater-than
>&2	Sends std output to std err 
	(equivalent to 1>&2)
2>&1	Send std err to std output
	(this would all you to log errors and std output
	to a single file)
cmd > logfile 2>&1 		takes output of command
				saves in logfile
				also sends all errors to std out
				since stdout points to logfile
				errors end up in same file
#Don't do this
cmd >logfile 2> logfile 	Two streams will over-write 
				each other's data 
#Bash offers two additional ways to point both streams to same file
&> 
>&
#Don't use above two!  They are considered deprecated
#Stick to the first option only

#Redirection is allowed anywhere on the command line
cmd < inputfile > outputfile
>outputfile cmd < inputfile
#Above two commands are equivalent
#These two are different
cmd > logfile 2>&1 		sends errors to logfile
2>&1 > logfile cmd		sends errors to stdout

#Control Flow

#While Loop
while test; do
	;; code to be repeated
done
#until
until test; do
	;; code to be repeated
done

#The classic FOR loop
for VAR in WORDS; do
	;; code to be repeated
done
#assign each word in WORDS to var in turn
#start with for keyword
#followed by the name a variable
#Note that it is the NAME of a variable, 
#not it's value, do don't use '$' sign
#Then takes the 'in' keyword, with a list of words
#Note that the list should not be in inverted 
#commas, as this would signify just one word
#will stop when no words left
#This is one case where you do not want to quote
#a variable

for i in just a few words; do echo $i; done

#The C-Style FOR Loop
for (( INIT; TEST; UPDATE )); do
	;;loop code
done

#Use double parentheses
#which contain three expressions
#First expression: runs before loop starts
#initializes loop variable(s)
#Second expression: a test
#will run everytime loop runs
#and loop will run as long as second expr is true
#Third is update expresion: updates the loop variable(s)
#Expression use syntax for arithmetic evaluation

#BREAK and CONTINUE

break		quits the loop
continue	skips the rest of the current iteration
		continues with the next iteration
#both keywords may be used in any for, while until loop
#Now stripto program

#CASE
case WORD in 
    PATTERN1)
    	code for pattern 1 ;;
    PATTERN2)
    	code for pattern 2 ;;
    
    ...
    
    PATTERNn)
    	code for pattern n ;;
esac
#match words with patterns
*	mathches any string
?	any single character
[]	match a specific set of characters
#note that enter pattern with right parenthesis
#after that comes the code
#bash tests the word against every pattern
#from top to bottom
#CODE FOR FIRST MATCHING PATTERN IS EXECUTED 
#NOTE: end code with TWO semicolons
#so... you can use multiple statements separated by ';'
#MULTIPLE PATTERNS separated by pipes ('|') 

#Remember that DIAGNOSTIC MESSAGES should be printed to std err
#NOT std out
#(see Control Flow, 5.18 min) 

#COMMAND GROUPS
#Group commands with {}
	#Will group them into a single statement
	#Can use I/O redirection for the whole group
	#Can use the group in an if statement or while loop
	#Return status is that of last command in the group
	
{ cmd1;cmd2;cmd3; }

	#Separate commands with newlines or semicolons
	#Put space after first brace and before the last brace
	#In other words, braces need to be separated from commands
	#by whitespace
	#Ending semicolon or newline is NOT OPTIONAL 

#Besides semicolons and newlines, can also put '||' and '&&' between statements
#Informally called 'OR' and 'AND'
#Allow execution of command depending on the return status of previous command
#This now becomes a very nice shorthand for simple IF statement

&&	Similar to logical AND operator
	Will execute the next command only if previous one succeeded
mkdir newdir &&  cd newdir

|| 	Similar to logical OR operator
	Will execute the next command only if the previous one failed
[[$1]] || echo "missing argument">&2

#May combine as follows but DONT DO THIS
[[$1]] || echo "missing argument">&2 && exit 1
#will ALWAYS EXIT SCRIPT
#USE GROUPING INSTEAD
[[$1]] || {echo "missing argument">&2;  exit; }

#Variables 2
#Variables in bash have attributes
#can set with the declare command
#Can tell bash, for example, that a variable can only hold integers
#Can now use special expressions called arithmetic expressions
#Can also mark variable as Read Only - and cannot change value after its set
#Can also EXPORT variables
#Can store multiple values in a single variable in a special kind of 
#variable called an arrray

#Bash variables normally hold simple string values without a type
#It is possible to give var extra attributes
#Can turn on/off these attributes with declare
#Can also call declare by another name, "typeset", but this is deprecated

#Goodie:	Can print the attribute for a variable by giving declare
#		the -p option
declare -p var
tom="hello"
declare -p tom

#Integer variable
declare -i num		# num is the name of the variable
#Now $num may only hold integers

#BUT trying to set it to something else, such as a string value
#DOES NOT RESULT IN AN ERROR, but instead the 
#variable will be set to zero

delare -i tomnum
tomnum=4
echo $tomnum	# => 4
tomnum="hello"
echo $tomnum	# => 0

#GOODIE can UNSET an attribute using '+' instead of '-'
declare +i num		# Removes  integer attribute from variable 'num'

#When the integer attribute is set on a variable
#it triggers arithmetic evaluation

p="4+5"
echo $p		# => 4+5
declare -i p
p="4+5"
echo $p		# => 9
p="4 * 4"
echo $p		# => 16
p="hello"
echo $p		# => 0

# 	C-like Syntax for doing calculations
#Can tell bash you want expression evaluated in this way in several ways
 
#1 Can use the 'let' command
let n=100/2
echo $n		# => 50

#2 use double parentheses
(( ... ))
(( ++x ))	# Will increase the value of x by 1

(( p=x/100 )
(( u=100/6 ))
echo $u		# => 16

#GOODIE: can safely put spaces in such an expression
(( y = 100 / 5 ))
echo $y		# => 20
# Can also use command substitution
(( k = $(ls |wc -l) *10 )) 	# => 220

# 'let' command and double parentheses are exactly equivalent
# but because the parentheses method supports spaces among other things,
# it is oftern preferred (including by Reindert) 

#This is a similar construct, where we prefix the double parentheses with
#a dollar sign
$(( .. ))
#but.. this is not a command, but a substitution

p=$(( x / 100 ))

#bash will first divide x by 100, and then replace the whole exression by that value
#and then set that value equal to 50

#Bash will also assume an arithmetic expression whenever you set a value
#to a variable declared as an integer
declare -i num
num="30%8"	
echo $num	# => num is 6

#An example to show diffeence between command and a substitution
declare -i x
x=100/2
echo $x		# => x = 50
$(++x)		#51: command not found
(( ++ x)	# bash prints nothing
echo $x		# => 52

#Can also use the following
x=$((x+2)	
echo $x		# => 54

#Some Remarks about Arithmetic Evaluation
	# No need to quote variables
	# can use (( .. )) in constructs such as 'if' and 'while'
	# BUT BE AWARE IN THAT CASE THAT
	# zero is FALSE and everything else is true 
	# This is the opposite to expected behaviour  of a  'normal' shell command
(( 0 )) || echo "false"

#Potential Pitfall
#Bash will interpret numbers as OCTAL numbers, not decimal
declare -i my
my=010
echo $my	# => 8 (!!)

# In the FOR loop
(( ..;..;..; )) 
#is NOT an arithmetic expression, it is simply part of expression of the FOR loop
#but...
#the three expressions inside that are separed by semi-colons
#ARE evaluated as arithmetic expressions
#and within each can do any type of arithmetic calculation you want

#For a full list of operators see
http:/goo.gl/HnPkiq

#Read-only Variables
#make sure you set it to the value you want when declaring
declare -r constant="some value"
#if try to change after declared, bash will report an error

#Exporting a variable
#normallly  a declared variable is local to your script or 
#if you are on  a terminal in an interactive session,
#local to that session
#Sometimes want to make variables available to other commands you are running
#need to export them
#If you export a variable, you make it available to subproceses
#BUT DOES NOT WORK the other way round 
# - you cannot pass variable from subprocess to the command that called it
#  -you cannot pass a variable to the program that runs your script
# - You cannot pass a variable to a parent process - KEY


#Export a variable
export var="value"
#OR
declare -x var="value"
-x			#export option.
#Both methods exactly equivalent

#But Attributes are NOT exported

#Every process in bash has its own environment
#This includes current workin directory 
#
#Can pass variable values to subprocesses, but cannot pass
#variable attributes to subprocesses.  For example
#the READ ONLY attribute cannot be passed

#Arrays
#Apart from strings and integers, bash also supports one 
#other type of special variable - an array
#Can store multiple values. Store and retrived by index
 
#To store a value in an array
x[0]="some"		#A variable called "some" 
			#stored in an array 'x'
			#with an index '0'
x[1]="word"

#To retrieve
${x[0]}
#Also special syntax
${x[@]} 
#OR
${x[*]}
#Retrieve all values
#quoting also works

#To tell bash you want a variable to be an array
declare -a x
# OR simply declare as index as above
xx[0]="hello"

#There is also a special syntax for intializing a whole array in one go
arr=(a b c d 1 2 3)	# Note no commas!

#To Count the number of items in array
${#arr[@]}
echo ${#arr[@]}		# 7

To list all indices in array
${!arr[@]} 
#Note that there can be gaps in index list 
#Note: you cannot export an array
#
#Note: Since bash 4, bash supports associative arrays
declare -A x

#For more information on arrays
http://goo.gl//g6xtca

#Array Demo
ar=(this is an array)
declare -p ar 		# => declare -a ar='([0]="this" [1]="is" [2]="an" [3]="array")'
>echo ${#ar[@]}		# => 5
echo ${!ar[@]}		# => 0 1 2 3 15 

#Shell Functions
#In bash, a function will allow you to define your own command
name () {...}
#code you want to execute comes between braces
#You can run code between braces as new comand
#Other equivalent syntax (not recommended)
function name () {...}
function name {..}

#Can give a function arguments
#Can redirect that output and input
#Positional parameters ($1, $2, $2, ...) are available
#just like in a script
#Can think of  a function as a  tiny little shellscript inside a shellscript

#name functions correctly.  Same rules apply as when naming scripts
#- do not over-write existing commands

#In bash, the return value of a program is stored
#in a special variable called $?. 
#see here
#http://tldp.org/HOWTO/Bash-Prog-Intro-HOWTO-10.html
#!/bin/bash
sum () {
	return $(( $1 + $2))
	}
sum 4 5
echo $?
#Note that return value of function is stored in $?

#Bash variables are globally visible
#but CAN make variables local to that function
#Can do that by
declaring it inside the function
use the local keyword
#Can think of a function as a shell-script inside a shell-script

#Exit a function with 'return'
#returns a status code, like exit
#without a 'return' statement, function 
#returns the status code of the last statement
#status code is just a number
#sometimes want your function to return somethng else
#like a piece of text, for example
#To RETURN SOMETHING ELSE
#two basic ways ..
	#1	Use a global variable (declared outside function)
	#       -so that if change inside function the rest of the script
	#       can 'see' the change and react accordingly
	
	#2	Send the data to output (using, say echo or printf)  and use 
	#	command substitution 
		
#Can also think of a function as being a variable that points to a
#piece of code
#SO it is logical to EXPORT a function
export -f function
#Now functions available to sub-processes


#Advanced Bash features
# Here document
# example from 'count' script

cat <<END
	#text goes here
	
END

#The tag-word 'END' is arbitrary. Choose whatever you want
#As soon as bash sees the tag-word for a second time
#it interprets it as a signal that input has ended
#everything between the two occurences will be input of command

#PIPE Gotcha!
#A piped command runs inside a sub-shell,
#which means it runs inside a separate bash process
#See count script
#the $count variable is LOCAL to that subshell
#and will not be available to parent process
#Not an easy way around it 

#tput command
tput cols
tput lines
tput setaf 1
tput setaf 7

tput bold
tput sgr0

#du command
# du is disk usage
du -b		# -b bytes

#Miscellaneous

#1  Functions and Redirections
# Redirection IS ALLOWED immediately after functiond definition
# Will be executed when function is run
fun () {}>&2

#2  A command in a pipeline runs in a subshell
ls | while read -r; do ((++count));done
#basically a useless loop
du -d 0 */ |read_filesizes
#The above also won't work and instead a tempfile
#was used in the 'hist' script

#3 Here documents
#look like
<<Tag
Tag
# Tag (of own choosing) defines end of input
cat <<END
	Text to use as input goes here
END
#Whole line is then used as input for cat command
#Can use to send large amounts of text data to commands

#FUN WITH STRINGS

# 1 Parameter expansion

# Powerful string manipulation
# For example, we have already met:

${#var} 	# length of $var

#Removing a pattern
#Remove part of a string

${var#pattern} 		# Removes SHORTEST match from BEGINNING of string
${var##pattern}		# Removes LONGEST match from BEGINNING of string
${var%pattern}		# Removes SHORTEST mathc from END of string
${var%pattern}		# Removes LONGEST match from END of string

#Pattern matching is like pathname matching with *, ? and []

# Example
i="/Users/reindert/demo.txt"
echo $i			# => /User/reindert/demo.txt
echo ${i#*/}		# =>  User/reindert/demo.txt
			# (remove shortest match from beginning of string)
			# pattern is '*' (which will match anything),
			# followed by slash
			# '*' will also match an empty string
			# shortest possible match is simply the leading slash
echo ${i##*/}		# => demo.txt

# Say, for example, want to remove extension
echo ${%#.*}		# => /User/reindert/demo
echo ${i%/*}		# => /User/reindert

# Search and Replace
#Syntax
${var/pattern/string}	# Substitute FIRST match with string
${var//pattern/string}	# Substitute ALL matches with string
#Anchor a pattern
${var/#pattern/string}	# Matches BEGINNING of string
${var/%pattern/string}	# Matches END  of string

# Some examples
i="mytxt.txt"
echo ${i/txt/jpg}	# => myjpg.txt
echo ${i/%txt/jpg}	# => mytxt.jpg
echo ${i//txt/jpg}	# => myjpg.jpg
echo ${i//txt/}		# => my.  (remove all occurrences)
echo ${i/%txt/}		# => mytxt.
echo ${i%txt}		# => mytxt.  (same thing)
echo ${i//[yx]/n}	# => mntnt.tnt

# Default Values
${var:-value}		# will evaluate to "value" if var is empty or unset
${var-value}		# similar BUT ONLY IF VAR IS UNSET will it evaluate to default

# Assign a default value
${var:=value}		# If var was empty or unset,
			# this evaluates to "value"
			# AND ASSIGNS it to 'var'
${var=value}		# Similar, but only if var is unset

#There are several more useful Parameter expansions
http://goo.gl/xRHo3u
http://wiki.bash-hackers.org/syntax/pe#variable_name_expansion

# 2 Pattern matching in conditional expression
# '==', '!=' operators in [[ .. ]] do pattern matching
# We have already seen that.
# But they also do pattern matching
# Important tip
# '==' is the same operator as '='
[[ $var==pattern ]] 	# Returns true when $var mathches pattern
			# NOT a string comparison, 
			# but pattern matching
# Pattern matching is exactly like pathname matching
# with '*', '?' and '[]'
[[ $filename == *.txt ]] 	# Returns true whenever
				# the filename ends in .txt

# Use Quotes to force string matching
[[ $var == "[0-9]*" ]] 		# Matches the string "[0-9]*"
#For example
[[ hello = h*o ]] & echo yep  # yep
[[ hello == h*o ]] & echo yep # yep
[[ hello == " h*o" ]] && echo yep	# nothing returned
[[ hello == " h*o" ]] || echo yep	# yep

# Regular expressions in the Conditional Expression

# Conditional Expression Patterns
=~	# Does regular expression matching
# Regular expressions are different from normal pattern matching
# that Bash does.
# Very powerful
# Uses POSIX extended regular expresssions
# Almost a little programming language by themselves
# Some of the differences will be highlighted

#Character	
?		# REGEX:	Matches token before it 0 or 1 times
		# NORMAl:	Matches a single character
[0-9]?		# REGEX:	Will match a single digit or nothing at all
		# REGEX:	A question mark looks like (half) a
		# 		zero with a 1 attached!

*		# REGEX:	Matches the token before it any
		#		number of times
[a-z]*		# REGEX:	will match any lc text or
		#		nothing at all

+		# REGEX:	Matches token before it 1 or
		#		more times
		# REGEX		A plus looks like a '1' with
		# 		a stroke
[0-9]+		# REGEX		Will match 1 or more digits

^		# BOTH		Matches the start of string
$		# BOTH		Matches the end of string



# 3 End of Options
# Very important
--	# End of options is denoted by '--' (two dashes)
#not to be confused with long option, eg --help
# End of options is supported by just about any unix command
# arguments after '--' will not be interpreted as options

# Makes it safe when woring with data that start with a dash
# For example a file called '-l.txt' on filesystem
# Remove with rm -l.txt will not work
# Use this instead
rm -- -l.txt
#Another example
#touch (update timestamps) of all files ending in .txt
#even when the directory contains a file -a.txt
for i in *.txt; do touch $i; done
#Above is a goodie

# Good Habit
# When you use a variable as an argument for a command
# and the contents of the variable are not under your control
# use '--' with the commands you  call


# Many Ways to Run Your Scripts

# Last Module of Course
# Overview

	# 1 Run scripts from file
	# 2 Run scripts in background and nohup command
	# 3 exec and (global) redirection
	# 4 Run script another time
	# 5 set and shopt

#1 Rub scripts from file
# Up to now have been using hash-bang and running script as command
# In this case, bash will start script in separate sub-process
# And must set executable permission for script

# When script does NOT have a hash-bang
# and, say , you cannot edit because you do not have permissions
# can use

bash myscript

# ie give script as argument
# will NOT need to set executable permissions
# can also give bash extra options using this method
# FOR EXAMPLE

bash -x <your_script>

# Above is a real goodie

#create hw_no_permissions
myname="world"                                     
echo "Hello ${myname} " 
# now ...
create hw_no_permissions	# => Command not found
bash hw_no_permissions		# => Hello world
echo $myname			# =>  		(nothing)
. hw_no_permissions		# =>  Hellow world
echo $myname			# =>  world

# A very different way to run code it to IMPORT code in
# the current shell process
source  myscript
. myscript			# source has an alias, a single dot
# If call you script like this,
# it will be exectuted in CURRENT SHELL PROCESS
# This means that all the variables and functions defined in that code
# will be available in your script 
# you will not have to import anything
# see example above
# this is basically what happens when you read .bashrcd

# NB can remove functions from script and use source command to read them in
# from another file

# 2  Background and nohup

# Can put any command in background by ending with '&'
myscript &
# It wil be disconnected from the interactive session
# will not take user input
# if it tries to read from terminal, it will be suspended
# very useful if you want to get other stuff done
# and want to have long-running script run in background

# Also another use
# if have long-running script and want to keep script running 
# when you exit terminal session
# For example when you have a remove connection and you have
# to logout, but you don't want your script to exit
# To do this use nohup command

nohup myscript &

# 'nohup' is shorthand for 'no hang-up
# nohup sill disconnect your script from terminal and keep it running
# Usually will want to put script in background in that case

# Now, if you are doing this, you may want to run script
# with a lower priority to ensure it does not take
# too many resources

nice myscript

# If you say 'nice myscript' it will run with lower priority

# Can, of course, combine these commands

nohup nice myscript &

# nohup will run the command that comes after it,
# and so will nice
create_script stillhere
#add the following

#!/bin/bash

declare -i i=0

while true; do
  echo "still here $(( ++i )) "
    sleep 1
    done
    
# Now execute the following commands
hup stillhere > log &
tail -f log

#Also useful
jobs
kill %job_id

# 3 Redirecting with exec 

# One of uses of command is to redirect I/O for whole script
# Useful, for example, for logging
# For example, if have following in your script:
exec >logfile 2>errorlog
# redirecting all output that is sent to stdout to logfile,
# and all output to stderr goes to errorlog
# A great example  (Note this one)
create_script stillheretoo
#add the following
#!/bin/bash

if [[ $1 == "-l" ]]; then
        exec > logfile
fi

        declare -i i=0

        while true; do
          echo "still here $(( ++i )) "
            sleep 1
            done
# Same as 'stilhere' except with 'if' statement
stillheretoo -l &
tail -f logfile
jobs
kill %1 	# (or whatever)

# 4 Running  your script at another time
# Unix systems come with two standard utilities that allow
# you do exactly that
	# 1 At
	# 2 Cron
At		# Will run your script at a specific time
at -f myscript noon tomorrow
# note
man at  	# no entry for at on Ubuntu 14.04?


cron		# Will run your script according to a schedule
# schedule can be just about anything
# can be weekly or daily
launchd		# preferred way on MAC system
upstart		# new feature on ubuntu
		# designed to replace both 'at' and 'cron'

#5 Customize Bash's behaviour (set and shopt)

# Firstly there is 'set' 
set
# set has a LOT of options
# Just show a few.  (Most are not intended to show in production)
# Use when debugging, and then remove
-x 		# prints each command with its arguments 
		# as it is executed

-u		# gives an error when using an uninitialized
		# variable, and exits script
		# useful to guard against unset vars and typos
-n		# reads commands but do not execute
		# get bash to read script just to set if it is valid
		# but without execution
-v		# prints each command as it is read
#combine -n and -v to have bash print each command
#but not execute anything
-e		# Exits a script whenever a command fails
		# (but not with if, while, until, ||, &&)

# Secondly there is shopt
shopt
# Also sets bash bahaviour, but in a very different way
-s 		# Can set many options
-u		# Unset
#For example
shopt -s nocaseglob	# Ignore case with pathname expansion
shopt -s extglob	# Enable extended pattern matching
			# NOT the same as regular expressions
shop -s dotglob		# Inlude hidden files with pathname expansion
#unfortunately, there are some options set by 'set', not by shopt
set -o noclobber	# Don't overwrite files on redirection operations
# No real logic behind this, according to reindert
# Will need to consult documentation to determine if
# option is set by 'set' or 'shopt'

#  -- The End --


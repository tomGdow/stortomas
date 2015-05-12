#include <stdio.h>
/*Copy input to output; 1st version*/
main () {
	int c;
	c = getchar();
	while ((c = getchar()) != EOF) {
		putchar(c);
	}
}

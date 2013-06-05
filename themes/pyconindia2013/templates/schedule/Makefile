
SOURCES=day2.txt day3.txt
TARGETS=$(SOURCES:.txt=.html)

all: $(TARGETS)

%.html: %.txt schedule.py
	python schedule.py $< > $@

clean:
	-rm day?.html

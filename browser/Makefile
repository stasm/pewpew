ROLLUPS = game.rollup.js

all: $(ROLLUPS)
clean:
	rm -f *.js

.PRECIOUS: index.js
index.js: $(shell find .. -type f -name "*.ts")
	npx tsc

game.rollup.js: index.js
	npx rollup --format cjs $< --silent > $@
	wc $@

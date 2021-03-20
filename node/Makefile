ROLLUPS = \
	game_fake_canvas.rollup.js \
	game_node_canvas.rollup.js \
	game_noop_canvas.rollup.js

all: $(ROLLUPS)
clean:
	rm -f *.js

.PRECIOUS: index_%.js
index_%.js: $(shell find .. -type f -name "*.ts")
	npx tsc

game_%.rollup.js: index_%.js
	npx rollup --format cjs $< --silent > $@
	wc $@

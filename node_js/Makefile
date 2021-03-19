all: game.rollup.js
	@wc -l $<

index.js: $(shell find .. -type f -name "*.ts")
	@echo -n "Compiling project... "
	@npx tsc
	@echo "Done"

game.rollup.js: index.js
	@echo -n "Bundling files into one... "
	@npx rollup --format cjs $< --silent > $@
	@echo "Done"

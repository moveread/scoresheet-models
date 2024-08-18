dev:
  yarn dev --host

build:
  yarn run build

preview:
  yarn preview --host

build-preview: build preview

# PACKAGING

# Compile as package
compile:
  rm -dr build || :
  yarn run compile
  @just copy

publish: compile upload

# Build, increment patch number and publish
republish: patch compile upload

patch:
  yarn version --patch

# Publish to npm
upload:
  cd build && npm publish --access=public

copy:
  cp package.json build

# Build, increment patch number and publish
patch: build
  yarn version --patch
  @just publish

publish:
  @just copy
  cd dist && npm publish

build:
  rm -dr dist || :
  yarn run build

copy:
  cp -r src/images dist
  cp package.json dist
  cp tsconfig.json dist
  cp README.md dist

# Install a package as both --dev and --peer
extra PACKAGE:
  yarn add --peer {{PACKAGE}} && yarn add --dev {{PACKAGE}}
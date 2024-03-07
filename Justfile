# Build, increment patch number and publish
patch: build
  cd dist && yarn version --patch --no-git-tag-version
  cd dist && npm publish

# Use dnt to build
build:
  deno run -A build.ts
  rm -drf dist/node_modules dist/yarn.lock dist/.npmignore
  json -I -f dist/package.json -e "delete this._generatedBy"

# codefresh-playground

## Dockerfile
```bash
export image_name=order
export project_path=order
docker build \
  --target install \
  --cache-from "${image_name}-base:current" \
  --tag "${image_name}-base:current" \
  --build-arg PROJECT_PATH="${project_path}" \
  --build-arg GITHUB_TOKEN="$BONSAI_GITHUB_TOKEN" \
  --build-arg FONTAWESOME_TOKEN="$BONSAI_FONTAWESOME_TOKEN" \
  --build-arg SSH_PRIVATE_KEY="$(cat ~/.ssh/id_rsa)" \
  --file "./Dockerfile" .
  
  
docker build \
  --target runtime \
  --cache-from "${image_name}:current" \
  --cache-from "${image_name}-base:current" \
  --tag "${image_name}:current" \
  --build-arg PROJECT_PATH="${project_path}" \
  --build-arg GITHUB_TOKEN="$BONSAI_GITHUB_TOKEN" \
  --build-arg FONTAWESOME_TOKEN="$BONSAI_FONTAWESOME_TOKEN" \
  --build-arg SSH_PRIVATE_KEY="$(cat ~/.ssh/id_rsa)" \
  --file "Dockerfile" .
```

1. Docker install
   1. native deps
   2. yarn deps
   3. workspaces prepare

2. Docker build
   1. specific project build

3. Docker runtime
   1. copy application to new container
   2. run entrypoint

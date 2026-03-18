#!/usr/bin/env bash

set -euo pipefail

repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"

collect_changed_files() {
  {
    git diff --name-only --diff-filter=ACMRTUXB
    git diff --cached --name-only --diff-filter=ACMRTUXB
    git ls-files --others --exclude-standard
  } | sort -u
}

is_ignored_change() {
  case "$1" in
    products-backend/target/*|products-ui/node_modules/*|products-ui/build/*|*.log|.DS_Store)
      return 0
      ;;
    *)
      return 1
      ;;
  esac
}

backend_changed=false
frontend_changed=false
infra_changed=false
relevant_changes=()

while IFS= read -r file; do
  [[ -z "$file" ]] && continue

  if is_ignored_change "$file"; then
    continue
  fi

  relevant_changes+=("$file")

  case "$file" in
    products-backend/*)
      backend_changed=true
      ;;
    products-ui/*)
      frontend_changed=true
      ;;
    docker-compose.yml|database/*)
      infra_changed=true
      ;;
  esac
done < <(collect_changed_files)

build_services=()
$backend_changed && build_services+=("backend")
$frontend_changed && build_services+=("frontend")

if ((${#relevant_changes[@]} > 0)); then
  printf 'Relevant changes detected:\n'
  printf '  - %s\n' "${relevant_changes[@]}"
else
  printf 'No relevant local changes detected.\n'
fi

if ((${#build_services[@]} > 0)); then
  printf 'Building changed services: %s\n' "${build_services[*]}"
  docker compose build "${build_services[@]}"
else
  printf 'No image rebuild needed.\n'
fi

if $infra_changed; then
  printf 'Infrastructure changes detected; recreating the stack.\n'
fi

docker compose up

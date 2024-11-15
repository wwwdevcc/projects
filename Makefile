# Run a command in the app container
docker-exec = docker compose exec app /bin/bash -c "$1"

# Start containers
up:
	docker compose up -d
.PHONY: up

# Stop containers
stop:
	docker compose stop
.PHONY: stop

# Open a shell in the app container
shell:
	docker compose exec app /bin/bash
.PHONY: shell
